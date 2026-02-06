import {
    pgTable,
    uuid,
    text,
    varchar,
    timestamp,
    boolean,
    integer,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const user = pgTable('user', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    
})