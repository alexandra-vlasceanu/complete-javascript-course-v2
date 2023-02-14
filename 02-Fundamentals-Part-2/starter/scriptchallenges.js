'use strict'
/*
Coding Challenge #2
Steven is still building his tip calculator, using the same rules as before: Tip 15 % of the bill if the bill value is between 50
and 300, and if the value is different, the tip is 20 %.
Your tasks:
1. Write a function'calcTip'that takes any bill value as an input and returns the corresponding tip, calculated based on the rules
above(you can check out the code from first tip calculator challenge if you need to). Use the function type you like the most.
Test the function using a bill value of 100
2. And now let's use arrays!So create an array 'bills' containing the test data below
3. Create an array'tips'containing the tip value for each bill, calculated from the function you created before
4. Bonus:Create an array 'total' containing the total values, so the bill + tip Test data: 125, 555 and 44

TEST DATA: 125, 555 and 44
*/

// 1.
// let bill = 100
// const calcTip = function (bill) {
//     if (bill <= 300 && bill >= 50) {
//         return bill * 0.15
//     } else {
//         return bill * 0.2
//     }
//}
/*
const calcTip = function (bill) {
    return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

}
// const calcTip = bill => bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
// 2.
const bills = [125, 555, 44];

// 3. 
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];

// 4. Bonus
const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];

console.log(bills, tips, totals)


//Coding Challenge #3 ////
// Let's go back to Mark and John comparing their BMIs! This time, let's use objects to implement the calculations! 
// Remember: BMI = mass / height ** 2 = mass / (height * height) (mass in kg and height in meter)
// Your tasks:
// 1. For each of them,create an object with properties for their full name,mass,and height (Mark Miller and John Smith)
// 2. Create a'calcBMI'method on each object to calculate the BMI (the same method on both objects). Store the BMI value to a 
// property, and also return it from the method
// 3. Log to the console who has the higher BMI,together with the full name and the respective BMI. 
// Example: "John's BMI (28.3) is higher than Mark's (23.9)!"

// Test data: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.

const mark = {
    fullName: 'Mark Miller',
    mass: 78,
    height: 1.69,

    calcBMI: function () {
        this.bmi = this.mass / this.height ** 2;
        return this.bmi;
    }
}

const john = {
    fullName: 'John Smith',
    mass: 92,
    height: 1.95,

    calcBMI: function () {
        this.bmi = this.mass / this.height ** 2;
        return this.bmi;
    }
}
mark.calcBMI();
john.calcBMI();

if (mark.bmi > john.bmi) {
    console.log(`${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s (${john.bmi})`)
} else if (john.bmi > mark.bmi) {
    console.log(`${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s (${mark.bmi})`)
}

*/

//Coding Challenge # 4
// Let's improve Steven's tip calculator even more, this time using loops!
// Your tasks:
// 1. Create an array 'bills' containing all 10 test bill values
// 2. Create empty arrays for the tips and the totals ('tips' and 'totals')
// 3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate tips and total values (bill + tip) for
//  every bill value in the bills array. Use a for loop to perform the 10 calculations!

// Test data: 22, 295, 176, 440, 37, 105, 10, 1100, 86 and 52
// Hints: Call ‘calcTip ‘in the loop and use the push method to add values to the
// tips and totals arrays 😉

// Bonus:
// 4. Bonus:Write a function'calcAverage'which takes an array called'arr'as an argument. 
// This function calculates the average of all numbers in the given array. This is a difficult challenge 
// (we haven't done this before)! Here is how to solve it:
// 4.1. First, you will need to add up all values in the array. To do the addition, start by creating a 
// variable 'sum' that starts at 0. Then loop over the array using a for loop. 
// In each iteration, add the current value to the 'sum' variable. This way, by the end of the loop, 
// you have all values added together
// 4.2. To calculate the average, divide the sum you calculated before by the length of the array 
// (because that's the number of elements)
// 4.3. Call the function with the 'totals' array



const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

const calcTip = bill => bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

for (let i = 0; i < bills.length; i++) {
    calcTip(bills[i]);
    tips.push(calcTip(bills[i]));
    totals.push(bills[i] + tips[i]);

    /// jonas solution
    // const tip = calcTip(bills[i]);
    // tips.push(tip);
    // totals.push(tip + bills[i])
}
console.log(bills, tips, totals);
// console.log(bills);
// console.log(tips);
// console.log(totals);

//BONUS
/*
this function calculates the average
@param arr - list of numbers
*/
const calcAverage = function (arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        //sum = sum + arr[i];
        sum += arr[i]
        // console.log(sum);
    }
    // let avg = sum / arr.length;
    // return avg;
    return sum / arr.length;
}


//console.log(calcAverage([2, 3, 7]));
console.log(`Average is ${calcAverage(totals)}`);