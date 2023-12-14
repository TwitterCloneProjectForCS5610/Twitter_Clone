import * as mongoose from 'mongoose';

mongoose.model(
  'Status',
  new mongoose.Schema({
    text: String,
    image: String,
    created_at: {
      type: Date,
      default: Date.now,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }),
);
