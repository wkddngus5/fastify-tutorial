async function routes (fastify, options) {
  const collection = fastify.mongo.db('test').collection('test')

  const opts = {
    schema: {
      body: {
        type: 'object',
        properties: {
          someKey: { type: 'string' },
          someOtherKey: { type: 'number' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            hello: { type: 'string' }
          }
        }
      }
    }
  }

  fastify.get('/', opts, async (request, reply) => {
    return { hello: 'world' }
  })

  fastify.get('/search/:id', async (request, reply) => {
    try {
      return await collection.findOne({ id: parseInt(request.params.id) })
    } catch (err) {
      reg.log.error(err)
      return new Error('Something went wrong')
    }
  })
}


export default routes
