import {
  createResume,
  deleteResume,
  getAllResumes,
  getResumeById,
  updateResume,
} from '../controllers/resumeController.js';

export default async function resumeRoute(fastify, options) {
  fastify.get('/', options, getAllResumes);
  fastify.get('/:id', options, getResumeById);
  fastify.post('/', options, createResume);
  fastify.put('/:id', options, updateResume);
  fastify.delete('/:id', options, deleteResume);
}
