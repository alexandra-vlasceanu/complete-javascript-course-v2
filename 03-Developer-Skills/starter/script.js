// Remember, we're gonna use strict mode in all scripts now!
'use strict';
/*
// Problem 1:
// We work for a company building a smart home thermometer.
// Our most recent task is this: Given an array of temperatures of one day,
// calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error.

const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

// 1. Understanding the problem
// - What is temperature amplitude? Answer: difference between highest and lowest temp.
// - How to compute max and min temperatures?
// - What is a sonsor error? And what to do?

// 2. Breaking up into sub-problems
// - How to ignore errors?
// - Find min value in temp array
// - Find max value in temp array
// - Substract min from max (amplitude) and then return it

const calcTempAmplitude = function (temps) {
  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;
    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};
const amplitude = calcTempAmplitude(temperatures);
console.log(amplitude);
*/
// Problem 2:
// Function should now receive 2 arrays of temperatures`
// 1. Understanding the problem
// - With 2 arrays, should we implement the functionality twice?
// NO. Just merge 2 arrays

// 2. Breaking up into sub-problems
// Merge 2 arrays ?
/*
const calcTempAmplitudeNew = function (t1, t2) {
  const temps = t1.concat(t2);
  console.log(temps);
  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;
    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};
const amplitudeNew = calcTempAmplitudeNew([3, 5, 1], [9, 0, 5]);
console.log(amplitudeNew);
*/

const measureKelvin = function () {
  const measurement = {
    type: 'temp',
    unit: 'celsius',
    // C. Fix the bug
    value: Number(prompt('Degrees celsius:')),
  };
  // B. Find the bug
  console.table(measurement);
  //   console.log(measurement.value);
  //   console.warn(measurement.value);
  //   console.error(measurement.value);

  const kelvin = measurement.value + 273;
  return kelvin;
};
// A. Identify the bug
console.log(measureKelvin());
