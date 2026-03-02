import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { db } from '../db/connection.ts';
import { users } from '../db/schema.ts';
import { hashPassword } from '../utils/password.ts';
import { generateToken } from '../utils/jwt.ts';

export const register = async (req:Request, res:Response) => {
  try {
    const { email, username, password, firstName, lastName } = req.body;
    const hashedPassword = await hashPassword(password);
    const [user] = await db.insert(users).values({
        ...req.body,
        password: hashedPassword,
    })
    .returning({
        id: users.id,
        email: users.email,
        username: users.username,
        firstName: users.firstName,
        lastName: users.lastName,
        createdAt: users.createdAt
    });


    const token = await generateToken({
        id: user.id,
        email: user.email,
        username: user.username,
    })

    return res.status(201).json({
        message: 'User registered successfully',
        user,
        token,
    })
  } catch (error) {
    console.error('Error during registration', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}