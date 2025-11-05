import Fastify from 'fastify';
import mongoPlugin from './src/plugins/mongo.js';
import jobRoutes from './src/routes/job.js';
import resumeRoutes from './src/routes/resume.js';

const fastify = Fastify({
  logger: true
});

await fastify.register(mongoPlugin);

fastify.register(jobRoutes, { prefix: '/api/jobs' });
fastify.register(resumeRoutes, { prefix: '/api/resumes' });

fastify.get('/', async (_, reply) => {
  reply.send({ message: 'Hello from Trackob!' });
});

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

fastify.listen({ port: PORT, host: HOST })
  .then(() => fastify.log.info(`Server running on port ${PORT}`))
  .catch(err => {
    fastify.log.error(err);
    process.exit(1);
  });
