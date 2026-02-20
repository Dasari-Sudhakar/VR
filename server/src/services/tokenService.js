import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role, name: user.name }, env.jwtSecret, { expiresIn: '7d' });
