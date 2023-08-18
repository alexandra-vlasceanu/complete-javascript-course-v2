'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-08-01T17:01:17.194Z',
    '2023-08-14T23:36:17.929Z',
    '2023-08-15T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovemetDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const now = new Date();
  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();

  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovemetDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

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
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

// FAKE ALWAYS LOGGED IN //
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time
    // Experimenting API //
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };
    const locale = navigator.language;
    console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';

    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
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

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Add loan date
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
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

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/*
// LECTURES

/// CONVERTING AND CHECKING NUMBERS ///
// All numbers are presented internally as floating point numbers. Always as decimals, no matter if we write them as integers
// or decimals
// Numbers are represented internally in a 64 base 2 format. Are always stored in a binary format, only composed of 0 and 1

console.log(23 === 23.0);
console.log(0.1 + 0.2);

// Convert strings to numbers
console.log(Number('23'));
console.log(+'23');

// Parsing
// we use it when we need to read a value out of a string
//  - we can parse a number from a string
// The parseInt function accepts a second argument, which is the so called: regex
// The regex is the base of the numeral system that we are using
// Base 10 number: 0 to 9

console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('e23', 10));

// ParseFloat
console.log(Number.parseFloat('2.5rem')); // 2.5
console.log(Number.parseInt('2.5rem')); // 2

// isNaN
// - we can use this one to check if a value is not a number
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20X'));
console.log(Number.isNaN(20 / 0));

//isFinite
// - is the best way of checking if a value is a number, not a string
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20X'));
console.log(Number.isFinite(20 / 0));

// isInteger
console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23 / 0));

*/ /////////////////////////////////////////// CLOSE ////////////////////////////////////////////////////////////

/*
/// MATH AND ROUNDING ///

// Math square root
// - does coersion but not parsing
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** 1 / 3);

// Maximum and min value
console.log(Math.max(5, 12, 23, 11, 2)); // 23
console.log(Math.max(5, 12, '23', 11, 2)); // 23
console.log(Math.max(5, 12, '23px', 11, 2)); // NaN

console.log(Math.min(5, 12, 23, 11, 2));

// Constants on the math object or math namespace
// Ex: If we want to calculate the radius of a circle with 10px :
console.log(Math.PI * Number.parseFloat('10px') ** 2);

// Dice rolls
//Math.trunc - removes decimal numbers
console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
// 0...1 -> 0...(max - min) -> min...max
// Math.random is between 0 and . If we multiply this by max and min,then we get a number between zero and max - min.
// and now if we add min to all of this ( the min value), then we get min to max - min + min. So we addem min in both sides and
// so then we can cancel  the -min +min and we end up with a range between the MIN and the MAX value that we specified
console.log(randomInt(10, 20));

// Rounding integers ///
// All these methods do type coercion

console.log(Math.round(23.3)); // 23
console.log(Math.round(23.9)); // 24

// Math.ceil - will round up
console.log(Math.ceil(23.3)); // 24
console.log(Math.round(23.9)); // 24

// Math.floor - will round down
console.log(Math.floor(23.9));
console.log(Math.floor(23.9));

console.log(Math.trunc(23.3)); // 23
// Math.floor is the same with Math.trunc when we deal with positive numbers

// With negative numbers: .floor is better than trunc
console.log(Math.trunc(-23.3)); // -23
console.log(Math.floor(-23.3)); // -24

// Floating point numbers: Rounding decimals ///

//.toFixed
// Will always return a string, not a number

console.log((2.7).toFixed(0)); // '3'
console.log((2.7).toFixed(3)); // '2.700'
console.log((2.345).toFixed(2)); // '2.35'
console.log(+(2.345).toFixed(2)); // 2.35

*/ /////////////////////////////////////////// CLOSE ////////////////////////////////////////////////////////////
/*
/// THE REMAINDER OPERATOR  % ///
// Simply returns the remainder of a division

console.log(5 % 2); // 1
console.log(5 / 2); // 2.5 // 5 = 2 * 2 + 1

console.log(8 % 3); // 2
console.log(8 / 3); // 2.6666666665 // 8 =2 * 3 + 2

console.log(6 % 2); // 0
console.log(6 / 2); // 3

console.log(7 % 2); // 1
console.log(7 / 2); // 3.5

const isEven = n => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    // 0, 2, 4, 6
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    // 0, 3, 6, 9
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});
*/ /////////////////////////////////////////// CLOSE ////////////////////////////////////////////////////////////

/*
/// NUMERIC SEPARATORS ///
const diameter = 287_460_000_000;
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

// Will not work
console.log(Number('230_000')); // NaN
console.log(parseInt('230_000')); // 230

/// BIGINT ///
// we use to store large numbers
// Biggest number in JS
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);

// not accurate
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

// we use n to tranform a regular number into BigInt number
console.log(436578239092309238450934580936803496803n);
console.log(BigInt(436578239092309));

// Operations
// All the usual operators works the same
console.log(10000n + 10000n); // 20000
console.log(289363637484839939239282n * 10000n); // 2893636374848399392392820000n

// Math operations does not work here:
// console.log(Math.sqrt(16n)); // error
// It is not possinle to mix BigInt with regular numbers
const huge = 23495475684939043n;
const num = 23;
// console.log(huge * num); //  Cannot mix BigInt and other types
console.log(huge * BigInt(num));

// Exceptions:
console.log(20n > 15); // true
console.log(20n === 15); //false - because triple operator does not do type coercion
console.log(typeof 20n); // BigInt

console.log(20n == 20); // true - because it does type coercion

// Divisions
console.log(10n / 3n); // 3n
console.log(10 / 3); // 3.333333

*/ /////////////////////////////////////////// CLOSE ////////////////////////////////////////////////////////////

/*
/// CREATING DATES ///
// dates are 0 based so 10 is actually month 11 (nov)
// Create a date
// 1. new Date()

const now = new Date();
console.log(now);
// parse a date from a date string
console.log(new Date('Aug 09 2023 10:28:06'));

console.log(new Date('December 24, 2015'));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5));
console.log(new Date(2037, 10, 31));

console.log(new Date(0));
// how to convert from days to miliseconds
// 3 days * 24h * 60 min in one hour * 60 number of seconds in one min * 1000 to convert in miliseconds
console.log(new Date(3 * 24 * 60 * 60 * 1000));

// Working with dates
const future = new Date(2037, 10, 19, 15, 23, 5);
console.log(future);
console.log(future.getFullYear()); // 2037
console.log(future.getMonth()); // 10
console.log(future.getDate()); // 19 (day date)
console.log(future.getDay()); // 4 ( day of the week)
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString()); // follows an international standard, useful when we want to convert a particular date object into a string that we can store somewhere

// We can get the timestamp for the date. Timestamp is the miliseconds which have passed since January 1, 1970
console.log(future.getTime()); // 2142253385000
console.log(new Date(2142253385000)); // Thu Nov 19 2037 15:23:05

console.log(Date.now());
future.setFullYear(2040);
console.log(future); // Mon Nov 19 2040

*/ /////////////////////////////////////////// CLOSE ////////////////////////////////////////////////////////////

/*
/// OPERATIONS WITH DATES ///
const future = new Date(2037, 10, 19, 15, 23, 5);
console.log(+future);

// Create a function that takes in 2 dates and it's going to return the number of days that passed between these 2 dates
const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
console.log(days1);

/// INTERNATIONALIZING NUMBERS ( INTL) ///
const num = 3884764.23;

const options = {
  style: 'currency', // unit, percent, currency
  unit: 'mile-per-hour',
  currency: 'EUR',
};

console.log('US:     ', new Intl.NumberFormat('en-US', options).format(num));
console.log('Germany:', new Intl.NumberFormat('de-DE', options).format(num));
console.log('Syria:   ', new Intl.NumberFormat('ar-SY', options).format(num));
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num)
);
*/ /////////////////////////////////////////// CLOSE ////////////////////////////////////////////////////////////

/// TIMERS:setTimeout and setInterval ///

setTimeout(() => console.log('Here is your pizza 🍕'), 3000);
