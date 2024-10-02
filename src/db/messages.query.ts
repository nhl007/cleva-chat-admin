import db from "@/config/db";
import { messages } from "./messages.schema";
import { asc, desc, eq } from "drizzle-orm";

export const insertMessage = async (params: typeof messages.$inferInsert) => {
  try {
    const data = await db.insert(messages).values(params).returning();
    return data[0];
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getMessages = async (room: string) => {
  try {
    const msgs = await db
      .select()
      .from(messages)
      .where(eq(messages.room, room))
      .orderBy(asc(messages.date));
    return msgs;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getChatHistory = async () => {
  try {
    const msgs = await db
      .select({
        room: messages.room,
      })
      .from(messages)
      .where(eq(messages.admin, false))
      .groupBy(messages.room)
      .then(async (users) => {
        const history = [];
        for await (const d of users) {
          const data = await db
            .select({
              message: messages.message,
              date: messages.date,
            })
            .from(messages)
            .where(eq(messages.room, d.room))
            .orderBy(desc(messages.date))
            .limit(1);

          history.push({
            room: d.room,
            lastMessage: data.length ? data[0].message : "",
            lastMessageDate: data.length ? data[0].date : "",
          });
        }
        return history;
      });
    return msgs;
  } catch (error) {
    console.log(error);
    return [];
  }
};
