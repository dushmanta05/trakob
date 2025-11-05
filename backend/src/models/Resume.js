import mongoose from 'mongoose';
import { unixTimestampPlugin } from '../plugins/unixTimestampPlugin.js';

const ResumeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  templateType: {
    type: String,
    default: "default"
  },
  latexCode: {
    type: String,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  lastCompiledAt: Date,
  tags: [String]
}, {
  timestamps: true
});

ResumeSchema.plugin(unixTimestampPlugin);

export default mongoose.model('Resume', ResumeSchema);
