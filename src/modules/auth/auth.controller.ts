import { Request, Response } from 'express';
import { registerUser } from './usecases/register';
import { loginUser } from './usecases/login';

export const registerController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    await registerUser({ name, email, password });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.status(200).json({ token });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};
