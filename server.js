const fastify = require('fastify')()

import db from './our-db-connector';
import router from './our-first-routes';

fastify.register(db, {
  url: 'mongodb://localhost:27017/test',
  useNewUrlParser: true
})

fastify.register(router);

fastify.listen(3000, function (err) {
  if (err) throw err
  fastify.log.info(`server listening on ${fastify.server.address().port}`)
})