import { timestamp, varchar } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { boolean } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  room: varchar("room").notNull(),
  sender: varchar("sender_id").notNull(),
  admin: boolean("is_admin").notNull(),
  message: text("message").notNull(),
  date: timestamp("date", {
    mode: "string",
  }).defaultNow(),
});
