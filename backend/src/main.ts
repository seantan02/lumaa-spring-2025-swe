import express from "express";
import { Request, Response, NextFunction } from "express";
import { initializeDatabase, AppDataSource  } from "./db";
import { User, Task } from "./models";
import { SECRET_KEY, appPort } from "./config";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

// because we only have 2 schemas for now, we will keep it simple and keep it in main.ts, when we scale the applicatioin up
// we can move it to a separate module

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  isComplete: z.boolean().optional()
});

const authSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),  // I put this in place as an example
  password: z.string().min(6, "Password must be at least 6 characters")  // as an extra example
});

function validateRequest(schema: z.ZodSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      const errorTyped = error as Error;
      res.status(400).json({ error: errorTyped.message });
    }
  };
}

// interfaces for request and payload
interface AuthRequest extends Request {
    userId?: number;
}

interface JwtPayload {
    userId: number;
}

// function to verify token to protect routes
function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Access denied. Invalid token format.' });
        return;
    }

    const token = authHeader.split(' ')[1];

    if (!token){
        res.status(401).json({ error: 'Access denied' });
        return;
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
        return;
    }
};

// establish database connection
initializeDatabase(AppDataSource).catch((error) => {
    console.error("Fatal error during database initialization:", error);
    process.exit(1);
});

// create and setup express app
const app = express();
app.use(express.json());

// create router
const router = express.Router();

// API routes start here
// User registration
router.post('/auth/register', validateRequest(authSchema), async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);  // recommended salt round value is 10
        let user = { username: username, password: hashedPassword };
        
        try{
            const newUser = await AppDataSource.getRepository(User).create(user);
            const results = await AppDataSource.getRepository(User).save(newUser);
            res.status(201).json({ message: 'User registered successfully' });

        }catch(error){
            console.log("Error during user registration:", error);
            res.status(500).json({ error: 'User registration failed' });
        }

    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

router.post('/auth/login', validateRequest(authSchema), async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const existingUser = await AppDataSource.getRepository(User).findOneBy({
            username: username,
        });

        if (!existingUser) {
            res.status(401).json({ error: 'Authentication failed 1' });
            return;
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) {
            res.status(401).json({ error: 'Authentication failed 2' });
            return;
        }

        const token = jwt.sign({ userId: existingUser.id }, SECRET_KEY, {
            expiresIn: '24h',
        });
        res.status(201).json({ token });

    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// tasks

router.get('/tasks', verifyToken, validateRequest(taskSchema), async (req: AuthRequest, res: Response) => {
    try {
        const user = await AppDataSource.getRepository(User).findOneOrFail({
            where: { id: req.userId },
        });
        const tasks = await user.tasks;
        res.status(200).json(tasks);
        return;

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

router.post('/tasks', verifyToken, validateRequest(taskSchema), async (req: AuthRequest, res: Response) => {
    try{
        const { title, description, isComplete } = req.body;
        const user = await AppDataSource.getRepository(User).findOneBy({
            id: req.userId,
        });
        if(!user){
            res.status(401).json({ error: 'Access denied' });
            return;
        }

        const task = {
            title: title,
            description: description ?? "",
            isComplete: isComplete ?? false,
            user: user
        };
        const newTask = AppDataSource.getRepository(Task).create(task);
        const result = await AppDataSource.getRepository(Task).save(newTask);
        res.status(201).json(result);

    }catch(error){
        console.log("Error during task creation:", error);
        res.status(500).json({ error: 'Failed to create task' });
    }
});

router.put('/tasks/:id', verifyToken, validateRequest(taskSchema), async (req: AuthRequest, res: Response) => {
    try {
        const taskId = parseInt(req.params.id);
        console.log("1");
        const task = await AppDataSource.getRepository(Task).findOneOrFail({
            where: { id: taskId },
            relations: {
                user: true
            },
        });

        if(task.user.id !== req.userId){  // check if the task belongs to the user
            res.status(401).json({ error: 'Access denied' });
            return;
        }
        // Validate required fields
        if (!req.body.title) {
            res.status(400).json({ error: 'Title is required' });
            return;
        }
        // update task
        task.title = req.body.title;
        task.description = req.body.description ?? task.description;
        task.isComplete = req.body.isComplete ?? task.isComplete;
        await AppDataSource.getRepository(Task).save(task);
        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({ error: "Failed to update tasks" });
    }
});

router.delete('/tasks/:id', verifyToken, validateRequest(taskSchema), async (req: AuthRequest, res: Response) => {
    try {
        const taskId = parseInt(req.params.id);
        const task = await AppDataSource.getRepository(Task).findOneOrFail({
            where: { id: taskId },
            relations: {
                user: true
            },
        });

        if(task.user.id !== req.userId){  // check if the task belongs to the user
            res.status(401).json({ error: 'Access denied' });
            return;
        }

        await AppDataSource.getRepository(Task).delete({ id: taskId });
        res.status(202).json(task);

    } catch (error) {
        res.status(500).json({ error: 'Failed to delete tasks' });
    }
});

// Mount the router - THIS IS THE CRUCIAL PART YOU WERE MISSING
app.use('', router);

// start express server
console.log(`Server started at http://localhost:${appPort}`);
app.listen(appPort);