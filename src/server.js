// import './appsignal.js';
import 'dotenv/config';
import './inspector.js';
import Fastify from 'fastify';
import workerpool from 'workerpool';
import { Worker } from 'node:worker_threads';
import { calcFiboRecursive, calcFiboMatrix } from './fibonacci.js';
import * as url from 'node:url';
import path from 'node:path';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const pool = workerpool.pool(path.join(__dirname, 'worker-pool.js'));

const fastify = Fastify({
  logger: true,
  disableRequestLogging: true,
});

fastify.get('/', (_request, reply) => {
  reply.send({ msg: 'Hello world!' });
});

fastify.get('/fibonacci-recursive/:n', (request, reply) => {
  const n = parseInt(request.params.n, 10);

  const result = calcFiboRecursive(n);

  reply.send({ result });
});

fastify.get('/fibonacci-matrix/:n', (request, reply) => {
  const n = parseInt(request.params.n, 10);

  const result = calcFiboMatrix(n);

  reply.send({ result });
});

fastify.get('/fibonacci-worker-thread/:n', (request, reply) => {
  const n = parseInt(request.params.n, 10);

  const worker = new Worker(path.join(__dirname, 'worker.js'), {
    workerData: n,
  });

  worker.once('message', (result) => {
    reply.send({ result });
  });

  worker.on('error', (err) => {
    throw err;
  });
});

fastify.get('/fibonacci-worker-pool/:n', async (request, reply) => {
  const n = parseInt(request.params.n, 10);

  const result = await pool.exec('calcFiboRecursive', [n]);

  reply.send({ result });
});

fastify.get('/fibonacci-worker-matrix/:n', async (request, reply) => {
  const n = parseInt(request.params.n, 10);

  const result = await pool.exec('calcFiboMatrix', [n]);

  reply.send({ result });
});

const port = process.env.PORT || 3000;

fastify.listen({ port }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  fastify.log.info(`Fastify is listening on port: ${address}`);
});
