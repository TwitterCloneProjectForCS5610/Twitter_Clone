import * as mongoose from 'mongoose';

mongoose.model(
  'User',
  new mongoose.Schema({
    nickname: String,
    profile: String,
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  }),
);
