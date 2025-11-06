import cors from '@fastify/cors';
import fp from 'fastify-plugin';

async function corsPlugin(fastify) {
  const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };

  fastify.register(cors, corsOptions);
}

export default fp(corsPlugin);
