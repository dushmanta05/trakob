import Job from '../models/Job.js';

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).send(jobs);
  } catch (error) {
    req.log.error(error);
    res.status(500).send({ error: 'Failed to fetch jobs' });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).send({ error: 'Job not found' });
    }
    res.status(200).send(job);
  } catch (error) {
    req.log.error(error);
    res.status(500).send({ error: 'Failed to fetch job' });
  }
};

export const createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    const savedJob = await job.save();
    res.status(201).send(savedJob);
  } catch (error) {
    req.log.error(error);
    res.status(400).send({ error: 'Failed to create job' });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) {
      return res.status(404).send({ error: 'Job not found' });
    }
    res.status(200).send(job);
  } catch (error) {
    req.log.error(error);
    res.status(400).send({ error: 'Failed to update job' });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).send({ error: 'Job not found' });
    }
    res.status(200).send({ message: 'Job deleted successfully' });
  } catch (error) {
    req.log.error(error);
    res.status(500).send({ error: 'Failed to delete job' });
  }
};
