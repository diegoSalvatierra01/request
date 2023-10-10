import mongoose, { Schema } from 'mongoose';

const RackSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    firstValue: {
      type: Number,
    },
    secondValue: {
      type: Number,
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.models.Data || mongoose.model('Data', RackSchema);
