import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DB_CONNECTION_STRING ?? "";

const queryClient = postgres(connectionString);
const db = drizzle(queryClient);

export default db;
