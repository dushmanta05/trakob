import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
  updateJob,
} from '../controllers/jobController.js';

export default async function jobRoutes(fastify, options) {
  fastify.get('/', options, getAllJobs);
  fastify.get('/:id', options, getJobById);
  fastify.post('/', options, createJob);
  fastify.put('/:id', options, updateJob);
  fastify.delete('/:id', options, deleteJob);
}
