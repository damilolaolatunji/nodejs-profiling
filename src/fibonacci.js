function calcFiboRecursive(n) {
  if (n <= 1) return n;
  return calcFiboRecursive(n - 1) + calcFiboRecursive(n - 2);
}

function multiplyMatrix(matrix1, matrix2) {
  const a = matrix1[0][0];
  const b = matrix1[0][1];
  const c = matrix1[1][0];
  const d = matrix1[1][1];
  const e = matrix2[0][0];
  const f = matrix2[0][1];
  const g = matrix2[1][0];
  const h = matrix2[1][1];
  const result = [
    [a * e + b * g, a * f + b * h],
    [c * e + d * g, c * f + d * h],
  ];
  return result;
}

function power(matrix, n) {
  if (n === 1) {
    return matrix;
  }
  if (n % 2 === 0) {
    const halfPower = power(matrix, n / 2);
    return multiplyMatrix(halfPower, halfPower);
  } else {
    const halfPower = power(matrix, Math.floor(n / 2));
    const multiplied = multiplyMatrix(halfPower, halfPower);
    return multiplyMatrix(matrix, multiplied);
  }
}

function calcFiboMatrix(n) {
  if (n === 0) {
    return 0;
  }
  const baseMatrix = [
    [1, 1],
    [1, 0],
  ];
  const resultMatrix = power(baseMatrix, n - 1);
  return resultMatrix[0][0];
}

export { calcFiboRecursive, calcFiboMatrix };
