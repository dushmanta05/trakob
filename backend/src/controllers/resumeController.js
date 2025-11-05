import Resume from '../models/Resume.js';

export const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.status(200).send(resumes);
  } catch (error) {
    req.log.error(error);
    res.status(500).send({ error: 'Failed to fetch resumes' });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).send({ error: 'Resume not found' });
    }
    res.status(200).send(resume);
  } catch (error) {
    req.log.error(error);
    res.status(500).send({ error: 'Failed to fetch resume' });
  }
};

export const createResume = async (req, res) => {
  try {
    const resume = new Resume(req.body);
    const savedResume = await resume.save();
    res.status(201).send(savedResume);
  } catch (error) {
    req.log.error(error);
    res.status(400).send({ error: 'Failed to create resume' });
  }
};

export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!resume) {
      return res.status(404).send({ error: 'Resume not found' });
    }
    res.status(200).send(resume);
  } catch (error) {
    req.log.error(error);
    res.status(400).send({ error: 'Failed to update resume' });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);
    if (!resume) {
      return res.status(404).send({ error: 'Resume not found' });
    }
    res.status(200).send({ message: 'Resume deleted successfully' });
  } catch (error) {
    req.log.error(error);
    res.status(500).send({ error: 'Failed to delete resume' });
  }
};
