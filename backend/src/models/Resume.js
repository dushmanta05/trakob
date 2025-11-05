import mongoose from 'mongoose';

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

export default mongoose.model('Resume', ResumeSchema);
