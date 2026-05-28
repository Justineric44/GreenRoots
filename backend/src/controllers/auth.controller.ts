import type { Request, Response } from 'express';

export function registerUser(req: Request, res: Response) {
  res.status(501).json({ message: 'Register not implemented yet' });
}

export function loginUser(req: Request, res: Response) {
  res.status(501).json({ message: 'Login not implemented yet' });
}

export function logoutUser(req: Request, res: Response) {
  res.status(501).json({ message: 'Logout not implemented yet' });
}
