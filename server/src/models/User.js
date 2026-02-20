import mongoose from 'mongoose';

const userProgressSchema = new mongoose.Schema(
  {
    tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour' },
    completedScenes: [{ type: mongoose.Schema.Types.ObjectId }],
    lastSceneId: { type: mongoose.Schema.Types.ObjectId },
    durationSeconds: { type: Number, default: 0 }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tour' }],
    progress: [userProgressSchema]
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
