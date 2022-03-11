import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const HelloSchema = new Schema({
  count: {
    type: Number,
    required: true,
  },
  lastDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('hello', HelloSchema);
