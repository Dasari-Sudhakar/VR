import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const token = bearer.split(' ')[1];
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }
    next();
  } catch (_error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  return next();
};
