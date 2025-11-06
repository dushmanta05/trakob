import Fastify from 'fastify';
import mongoPlugin from './src/plugins/mongo.js';
import jobRoute from './src/routes/job.js';
import resumeRoute from './src/routes/resume.js';

const fastify = Fastify({
  logger: true
});

await fastify.register(mongoPlugin);

fastify.register(jobRoute, { prefix: '/api/job' });
fastify.register(resumeRoute, { prefix: '/api/resume' });

fastify.get('/', async (_, reply) => {
  reply.send({ message: 'Hello from Trackob!' });
});

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3005;

fastify.listen({ port: PORT, host: HOST })
  .then(() => fastify.log.info(`Server running on port ${PORT}`))
  .catch(err => {
    fastify.log.error(err);
    process.exit(1);
  });
