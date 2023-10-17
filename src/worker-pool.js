import workerpool from 'workerpool';
import { calcFiboRecursive, calcFiboMatrix } from './fibonacci.js';

workerpool.worker({
  calcFiboRecursive,
  calcFiboMatrix,
});
