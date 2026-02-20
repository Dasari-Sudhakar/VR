import mongoose from 'mongoose';

const hotspotSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    type: { type: String, enum: ['info', 'navigation', 'media'], default: 'info' },
    position: {
      type: [Number],
      validate: {
        validator: (value) => value.length === 3,
        message: 'Position requires [x,y,z] coordinates'
      }
    },
    content: String,
    mediaUrl: String,
    targetSceneId: { type: mongoose.Schema.Types.ObjectId }
  },
  { _id: true }
);

const sceneSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    hotspots: [hotspotSchema],
    voiceNarrationUrl: String,
    order: { type: Number, default: 0 }
  },
  { _id: true }
);

const analyticsSchema = new mongoose.Schema(
  {
    views: { type: Number, default: 0 },
    totalDurationSeconds: { type: Number, default: 0 }
  },
  { _id: false }
);

const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    thumbnailUrl: String,
    ambientAudioUrl: String,
    scenes: [sceneSchema],
    tags: [String],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    analytics: { type: analyticsSchema, default: () => ({}) }
  },
  { timestamps: true }
);

export default mongoose.model('Tour', tourSchema);
