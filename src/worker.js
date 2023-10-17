import { parentPort, workerData } from 'node:worker_threads';
import { calcFiboRecursive } from './fibonacci.js';

const result = calcFiboRecursive(workerData);
parentPort.postMessage(result);
