require('dotenv').config();

// environment variables
export const dbHost: string = process.env.DB_HOST || 'localhost';
export const dbPort: number = parseInt(process.env.DB_PORT || '5432');
export const dbUser: string = process.env.DB_USER || 'user';
export const dbPassword: string = process.env.DB_PASSWORD || 'password';
export const dbName: string = process.env.DB_NAME || 'db';
export const SECRET_KEY: string = process.env.SECRET_KEY || "";
if (!SECRET_KEY || SECRET_KEY === "") {
    console.error("No secret key provided, authentication will not work!");
    throw new Error("No secret key provided, please add SECRET_KEY to .env file");
}
export const appPort: number = parseInt(process.env.PORT || '3000');

// other variables
export const MAX_RETRIES: number = 5;
export const RETRY_DELAY: number = 5000; // 5 seconds