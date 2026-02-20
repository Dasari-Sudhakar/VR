import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import { signToken } from '../services/tokenService.js';

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) {
    res.status(409);
    throw new Error('Email already registered');
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  return res.status(201).json({
    token: signToken(user),
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  return res.json({
    token: signToken(user),
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
});
