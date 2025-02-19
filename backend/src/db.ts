import { DataSource } from "typeorm"
import { setTimeout } from "timers/promises";
import { User, Task } from "./models"
import { dbHost, dbPort, dbUser, dbPassword, dbName, MAX_RETRIES, RETRY_DELAY } from "./config"

console.log(dbHost, dbPort, dbUser, dbPassword, dbName)

export const AppDataSource = new DataSource({
    type: "postgres",
    host: dbHost,
    port: dbPort,
    username: dbUser,
    password: dbPassword,
    database: dbName,
    synchronize: true,
    logging: true,
    entities: [User, Task],
    poolSize: 10, // Maximum number of connections in the pool
});

export async function initializeDatabase(dataSource: DataSource): Promise<void> {
    let retries = MAX_RETRIES;

    while (retries > 0) {
        console.log(`⏳ Attempting to connect to the database... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
        try {
            await dataSource.initialize();
            console.log("✅ Database connection established successfully!");
            return;
        } catch (error) {
            console.error(`❌ Database connection failed (${MAX_RETRIES - retries + 1}/${MAX_RETRIES}):`, error);
            retries--;

            if (retries === 0) {
                console.error("❌ Max retry attempts reached. Exiting...");
                process.exit(1);
            }

            console.log(`⏳ Retrying database connection in ${RETRY_DELAY/1000} seconds...`);
            await setTimeout(RETRY_DELAY);
        }
    }
}