// src/controllers/authController.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "server/types";

// Temporary local "database"
const users: User[] = [];

export const register = async (req: Request, res: Response) => {
  console.log("Request Body:", req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Invalid data: missing fields" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: Date.now().toString(),
    email,
    password: hashedPassword,
  };
  users.push(newUser);

  res.status(201).json({ message: "User created" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Invalid data: missing fields" });
  }
  const user = users.find((u) => u.email === email);

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    return res.json({
      token,
      user: { id: user.id, email: user.email },
    });
  }
  res.status(401).json({ error: "Invalid credentials" });
};
