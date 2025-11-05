import fp from 'fastify-plugin';
import mongoose from 'mongoose';

async function mongoPlugin(fastify) {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/trakob';

  try {
    await mongoose.connect(uri);

    fastify.log.info('MongoDB connected');
    fastify.decorate('mongoose', mongoose);
    fastify.addHook('onClose', async () => {
      await mongoose.connection.close();
    });

  } catch (err) {
    fastify.log.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

export default fp(mongoPlugin);
