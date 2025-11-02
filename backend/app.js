import Fastify from 'fastify'

const fastify = Fastify({
  logger: true
})

fastify.get('/', function (request, reply) {
  reply.send({ message: 'Hello from Trackob!' })
})

fastify.listen({ port: 3005 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
