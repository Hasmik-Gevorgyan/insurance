import { inv } from 'mathjs';

const F_Table = 4.38;

export function regression(data: number[][]) {
  let average = getAverage(data);
  let correlationMatrix = getCorrelationMatrix(data, average);
  let combinationMatrixes = getCombinationMatrixes(correlationMatrix);

  return getFishersValues(combinationMatrixes, data.length);
}

function getAverage(data: number[][]) {
  let average: number[] = [];

  for (let i = 0; i < data[0].length; i++) {
    average[i] = 0;
  }

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      average[j] += data[i][j];
    }
  }

  for (let i = 0; i < data[0].length; i++) {
    average[i] = average[i] / data.length;
  }

  return average;
}

function getstandardDeviation(data: number[][]) {
  let standardDeviation: number[] = [];
  let average = getAverage(data);

  for (let i = 0; i < data[0].length; i++) {
    standardDeviation[i] = 0;
  }

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      standardDeviation[j] += Math.pow(data[i][j] - average[j], 2);
    }
  }

  for (let i = 0; i < standardDeviation.length; i++) {
    standardDeviation[i] = Math.sqrt(standardDeviation[i] / (data.length - 1));
  }

  return standardDeviation;
}

function getCorrelationMatrix(data: number[][], average: number[]) {
  let correlationMatrix: number[][] = [];

  for (let i = 0; i < data[0].length; i++) {
    correlationMatrix[i] = [];
  }

  for (let i = 0; i < data[0].length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      if (i === j) {
        correlationMatrix[i][j] = 1;
      } else {
        let numerator = 0;
        let denominator1 = 0;
        let denominator2 = 0;
        for (let k = 0; k < data.length; k++) {
          numerator += (data[k][i] - average[i]) * (data[k][j] - average[j]);
          denominator1 += Math.pow(data[k][i] - average[i], 2);
          denominator2 += Math.pow(data[k][j] - average[j], 2);
        }

        denominator1 = Math.sqrt(denominator1);
        denominator2 = Math.sqrt(denominator2);
        correlationMatrix[i][j] = numerator / (denominator1 * denominator2);
      }
    }
  }

  return correlationMatrix;
}

function getCombinationMatrixes(correlationMatrix: number[][]) {
  let length = correlationMatrix[0].length - 1;
  let combinations = Math.pow(2, length);
  var temp = [];
  let combinationMatrixes: any = [];

  for (let i = 0; i < combinations; i++) {
    temp = [];
    for (var j = 0; j < length; j++) {
      if (i & Math.pow(2, j)) {
        temp.push(j + 1);
      }
    }

    if (temp.length > 0) {
      temp.unshift(0);
      let newcomb: number[][] = [];

      for (let k = 0; k < temp.length; k++) {
        newcomb[k] = [];
        for (let l = 0; l < temp.length; l++) {
          newcomb[k][l] = correlationMatrix[temp[k]][temp[l]];
        }
      }
      const qInv = inv(newcomb);
      combinationMatrixes.push({
        r: newcomb,
        q: qInv,
        r2: 1 - 1 / qInv[0][0],
        members: temp,
      });
    }
  }
  combinationMatrixes.sort((a: any, b: any) => a.r.length - b.r.length);

  return combinationMatrixes;
}

function getFishersValues(combinationMatrixes: any, length: number) {
  let data = groupData(combinationMatrixes);
  let keys = Object.keys(data);
  let selected = {};

  for (let i = Number(keys[keys.length - 1]); i > 1; i--) {
    let F;
    if (i === 2) {
      F = getFisher(data[i].r2, 0, data[i].members.length - 1, length);
    } else {
      F = getFisher(data[i].r2, data[i - 1].r2, data[i].members.length - 1, length);
    }

    if (F > F_Table) {
      data[i].f = F;
      selected = data[i];
      break;
    }
  }

  return { selected, data };
}

function groupData(combinationMatrixes: any) {
  const grouped: any = {}; // locations
  combinationMatrixes.forEach((combination: any) => {
    let currentItem = grouped[combination.members.length];
    if (currentItem) {
      if (combination.r2 > grouped[combination.members.length].r2) {
        grouped[combination.members.length] = combination;
      }
    } else {
      grouped[combination.members.length] = combination;
    }
  });
  // console.log(grouped)

  return grouped;
}

function getFisher(rm: number, rm_1: number, m: number, n: number) {
  return ((rm - rm_1) * (n - m - 1)) / (1 - rm);
}
