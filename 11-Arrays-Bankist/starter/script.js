'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawl';
    const html = `  
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov} €</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account1.movements);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} € `;
};

// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)} €`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}`;
};
// calcDisplaySummary(account1.movements);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

/// Event handler
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});
// some method. Bank will only grant a loan if there is at least one deposit with at least 10% of the requested loan ammount
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement (money)
    currentAccount.movements.push(amount);

    // Update the UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    // Delete account
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/// FINDINDEX method ///
// Both FIND and FINDINDEX methods get access to also the current index and the current entire array

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*  LESSON 1 
let arr = ['a', 'b', 'c', 'd', 'e'];

/// SLICE method // - we can extract part without changing the array

console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1)); // this is how you get the last element of the array
console.log(arr.slice(1, -2));
// we ca use the slice method to create a shallow copy of the array
console.log(arr.slice());
console.log([...arr]); // is the same

/// SPLICE method
// - almost the same way as slice, but it change the original array
// console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);
arr.splice(1, 2);
console.log(arr);

/// REVERSE method  - also mutates/ changes the original array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());

// CONCAT method - does not mutate the original array
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]); // (spread operator) this method does not mutate the original array

/// JOIN method
console.log(letters.join('-'));
        */

/*   LESSON 2
/// AT method

const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

// if we want to get the last element of the array
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

// AT method also works on strings
console.log('jonas'.at(0));
console.log('jonas'.at(-1));
*/

/* LESSON 3 
// LOOPING ARRAYS - FOREACH
// will always loop aver the entire array
// if we need to break up a loop, we use a for of loop

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// for (const movement of movements)
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}
console.log('-------- FOREACH ------------------');
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});

// 0:function(200)
// 1: function(450)
// 2: function(-400)
// ...
// FOREACH passes in: The current element, The index and the entire array that we are looping
*/

/*LESSON 4
// forEach with Maps and Sets
// MAPS
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// SETS
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});
*/

//////////// CHALLENGE 1 /////////
/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into 
an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. 
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! 
So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice 
to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") 
or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

/*
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice(1, -2);

  const dogs = dogsJuliaCorrected.concat(dogsKate);
  console.log(dogs);
  //const dogs1 = [...dogsJuliaCorrected, ...dogsKate];
  //console.log(dogs1);

  // for (let i = 0; i < dogs.length; i++) {
  //   if (dogs[i] > 3) {
  //     console.log(
  //       `Dog number ${i + 1} is an adult, and is ${dogs[i]} years old`
  //     );
  //   } else {
  //     console.log(`Dog number ${i + 1} is still a puppy 🐶`);
  //   }
  // }
  console.log('-------------FOREACH--------------');
  dogs.forEach(function (dog, i) {
    if (dog > 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};

// checkDogs([3, 5, 2, 12, 7], [10, 5, 6, 1, 4]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);


// There are 3 array methods:
// 1. MAP - is a method that we ca use to loop over arrays. Is similar to forEach, but it creates a brand new array
// based in the original array
// 2. FILTER - is used to filter for elements in the original array which satisfy a certain condition
// 3 REDUCE - is used to boil down  all the elements of the original array into one single value

/// THE MAP METHOD
const eurToUsd = 1.1;
// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

const movementsUSD = movements.map(mov => mov * eurToUsd);
console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

console.log(movementsDescriptions);


/// The FILTER method
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const despositsFor = [];
for (const mov of movements) if (mov > 0) despositsFor.push(mov);
console.log(despositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);


/// THE REDUCED method
// acc - accumulator ( adds all the values - is like a snowball)
console.log(movements);
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);

const balance = movements.reduce((acc, cur) => acc + cur, 0);

console.log(balance);

/// the same thing with the for loop
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// how to get the maximum value of the movements array

const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);

console.log(max);

*/

// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate 
the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: 
if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀

const calcAverageHumanAge = function (ages) {
  // const humanYears1 = ages.map(function (age) {
  //   if (age <= 2) {
  //     return 2 * age;
  //   } else {
  //     return 16 + age * 4;
  //   }
  // });

  // console.log(humanYears1);
  // console.log('----------'); // the same as below

  const humanYears = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  console.log(humanYears);

  // const adultDogs1 = humanYears.filter(function (age) {
  //   if (age >= 18) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // });
  // console.log(adultDogs1);   /// same as below
  const adultDogs = humanYears.filter(age => age >= 18);
  console.log(adultDogs);

  const totalAge = adultDogs.reduce((total, age) => total + age, 0);
  const averageAge = totalAge / adultDogs.length;
  // console.log(averageAge);
  return averageAge;
};

// let humanAge = []; /// asta face MAP in spate
// const calcAverageHumanAge = function (ages) {
//   for (let i = 0; i < ages.length; i++) {
//     if (ages[i] <= 2) {
//       humanAge.push(ages[i] * 2); /// asta face map in spate
//     } else {
//       humanAge.push(16 + ages[i] * 4);
//     }
//   }
// };
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));


const calcAverageHumanAgeShort = function (ages) {
  return ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((total, age, i, arr) => total + age / arr.length, 0);
};

console.log(calcAverageHumanAgeShort([5, 2, 4, 1, 15, 8, 3]));

//// THE MAGIC OF CHAINING METHODS

const eurToUsd = 1.1;
// PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    return mov * eurToUsd;
  })
  // .map(mov=> mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

//// CHALLENGE 3 /////

// Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!
const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((total, age, i, arr) => total + age / arr.length, 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));


// THE FIND METHOD
// We can use the FIND method to retrieve one element of an array based on a condition
// also accepts a condition - a callback function which will then be called as the method loops ove the array
// it will not return a new array, only the element that we specify
// is simmilar to the FILTER method, but there are a few fundamental differences:
// 1. FIlter returns all the elements that match the condition, while the FIND method only returns the first one
// 2. The FILTER method returns a new array while FIND only returns the element itself and not an array

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);


/// SOME and EVERY Methods ///

/// Some method //
console.log(movements);
// Checks only for equality
console.log(movements.includes(-130));

// We can specify a condition
const anyDeposits = movements.some(mov => mov > 1500);
console.log(anyDeposits);

/// Every method //
// Is simmilar to SOME method the difference between them is that EVERY only returns TRUE if all the elements in the array
// satisfy the condition that we pass in

console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));


// The FLAT and

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// if we want to take all and put in one array
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [[4, 5], 6], 7, 8];
console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);

// we can write that like this :

const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

/// first we map and then we flat that result

// FLATMAP METHOD

// This method combines a map and a flat method into just one method which is better for performance
// Only goes one level deep and we cannot change it. If we need to go deeper, we need to use Flat method

const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);


/// SORTING ARRAYS ///
// .sort - mutates the original array
// The .SORT method does the sort based on strings. Converts everything to strings and the does the sorting itself

// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());

// Numbers
console.log(movements); // [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(movements.sort()); // [-130, -400, -650, 1300, 200, 3000, 450, 70] - sorted as strings
// we can fix this by passing in a compare callback function into the sort method
// a, b - two consecutive numbers in the array

// return < 0 - A, B (keep order)
// return > 0 - B, A (switch order)

// Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });

movements.sort((a, b) => a - b);
console.log(movements);
// Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });

movements.sort((a, b) => b - a);
console.log(movements);
*/

/// MORE WAYS OF CREATING AND FILLING ARRAYS ///

const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// We can generate arrays programatically, without having to define all the items maually
// Whenever we only pass in one argument, then it creates a new empty argument with that length

// Empty arrays + fill method ///
const x = new Array(7);
console.log(x);
// we cannot call any other method like:
console.log(x.map(() => 5)); // nothing happens

// we can only call the FILL method
// x.fill(1); // this mutates the underlying array

// er can also specify where we want it to start to fill and when to end (3, 5):
x.fill(1, 3, 5);

console.log(x);

arr.fill(23, 2, 6);
console.log(arr);

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

// we get access to the current element (cur) and the index (i)
const z = Array.from({ length: 7 }, (cur, i) => i + 1);

// With Array.from we can create arrays from other things
// querySelectorAll returns a NodeList, which is something like an array, which contains all the selected elements, but is not a
// real array and so it doesn't have methods like: map() or reduce(). if we want to use a real array method on a nodeList,
// we would first need to convert the NodeList to an array and for that, Array.from() is perfect.

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);
});
/*
WHICH ARRAY METHOD TO USE?

/// 1. TO MUTATE ORIGINAL ARRAY ///

Add to original:
  .push (end)
  .unshift (start)

Remove from original:
  .pop (end)
  .shift (start)
. splice (any)

Others:
  .reverse
  .sort
  .fill

/// 2. A NEW ARRAY ///

Computed from original:
  .map (loop) - loops over the original array and creates a new one based on that

Filtered using condition:
  .filter

Portion of original:
  .slice

Adding origianl to other:
  .concat - concat 2 arrays and create a new array based on that 

Flattening to original:
  .flat
  .flatMap
  
/// 3. AN ARRAY INDEX ///

Based on value:
  .indexof

Based on test condition:
  .findIndex
* The difference between them is that findIndex can basically search for an element in the array, based on a test condition that
we provide in the callback function

/// 4. AN ARRAY ELEMENT ///

Based on test condition: if we actually need the array element itself:
  .find

/// 5. KNOW IF ARRAY INCLUDES ///
All return boolean values. Very helpful in an IF/ELSE statement

Based on value: we can test if contains a single value
  .includes

Based on test condition: we can specify a condition based on a callback function
  .some  - returns true if al least one of the elements in the array  satisfies the condition
  .every - only returns true if all of the elements satisfy the condition

/// 6. TRANSFORM AN ARRAY INTO A STRING ///

Based on separator string:
  .join 

/// 7. TO TRANSFORM TO VALUE 

Based on accumulator:
  .reduce - reduce the array into a single value. That value can be of any type (number, string, boolean, array or an object)

/// 8. TO JUST LOOP OVER AN ARRAY ///

Based on callback:
  .forEach  - does not create a new array or a new value, just loops over it
*/
