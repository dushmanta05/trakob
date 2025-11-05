import mongoose from 'mongoose';
import JOB_STATUS from '../enums/jobStatus.js';
import { unixTimestampPlugin } from '../plugins/unixTimestampPlugin.js';

const JobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  appliedDate: Date,
  package: String,
  rounds: Number,
  currentRound: {
    type: Number,
    default: 0
  },
  lastFollowUp: Date,
  status: {
    type: String,
    enum: JOB_STATUS,
    default: 'ongoing'
  },
  notes: String,
  source: String,
  jobLink: String
}, {
  timestamps: true
});

JobSchema.plugin(unixTimestampPlugin);

export default mongoose.model('Job', JobSchema);
