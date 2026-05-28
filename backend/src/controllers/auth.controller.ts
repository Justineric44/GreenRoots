import type { Request, Response } from 'express';
import argon2 from 'argon2';
import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
import { ConflictError, UnauthorizedError } from '../lib/errors.js';
import {
  loginBodySchema,
  registerBodySchema,
} from '../validators/auth.validator.js';

export async function registerUser(req: Request, res: Response) {
  const data = registerBodySchema.parse(req.body);

  // Vérifie si un utilisateur existe déjà avec cet email.
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  // Si un utilisateur existe déjà :
  if (existingUser) {
    throw new ConflictError('User already exists');
  }

  // Hashage du mot de passe
  const hashedPassword = await argon2.hash(data.password);

  // Création de l'utilisateur dans la base de données
  const user = await prisma.user.create({
    data: {
      lastName: data.lastName,
      firstName: data.firstName,
      email: data.email,
      password: hashedPassword,
      address: data.address,
      postalCode: data.postalCode,
      city: data.city,
      type: data.type,

      // Ajoute les champs optionnels uniquement s'ils sont définis.
      // Cela évite d'envoyer des valeurs undefined à Prisma.
      ...(data.siret && { siret: data.siret }),
      ...(data.companyName && { companyName: data.companyName }),
      ...(data.phone && { phone: data.phone }),
    },

    // Permet de limiter les données renvoyées au frontend.
    select: {
      id: true,
      lastName: true,
      firstName: true,
      email: true,
      role: true,
      type: true,
      createdAt: true,
    },
  });

  return res
    .status(201)
    .json({ message: 'Account created successfully', user });
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = loginBodySchema.parse(req.body);

  // Recherche de l'utilisateur par email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const isPasswordValid = await argon2.verify(user.password, password);

  if (!isPasswordValid) {
    throw new UnauthorizedError('Invalid email or password');
  }

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  // Génération du token JWT
  const jwtSecret = process.env.JWT_SECRET as Secret;

  const jwtExpiresIn = (process.env.JWT_EXPIRES_IN || '1d') as NonNullable<
    SignOptions['expiresIn']
  >;

  const token = jwt.sign({ userId: user.id, role: user.role }, jwtSecret, {
    expiresIn: jwtExpiresIn,
  });

  return res.status(200).json({
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName,
      email: user.email,
      role: user.role,
      type: user.type,
    },
  });
}

export async function logoutUser(_req: Request, res: Response) {
  // Comme nous utilisons des tokens JWT, il n’y a pas de session à détruire côté serveur.
  // Le frontend doit simplement supprimer le token stocké (ex: localStorage).
  return res.status(200).json({ message: 'Logout successful' });
}
