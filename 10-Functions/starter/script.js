'use strict';
/*
// 126. Default parameters //
const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5
  //   numPassengers = numPassengers || 1;
  //   price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);
// If we want to skip a parameter, we cand put undefinded
createBooking('LH123', undefined, 1000);

// 127. How passing arguments works: Value vs. Reference //
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr' + passenger.name;

  if (passenger.passport === 24739479284) {
    alert('Check in');
  } else {
    alert('Wrong passport');
  }
};
// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

/// Is the same as doing ...
// const flightNum = flight;
// const passenger = jonas;
// Passing a primitive type to a function is really just the same as creating a copy outside of the function
// When we pass an object to a function, it is really just like copying an object like this: const passenger = jonas;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000000);
};
newPassport(jonas);
checkIn(flight, jonas);

// There are 2 terms that are used when dealing with functions
// 1. Passing by Value
// 2. Passing by Reference - for objects we do pass in a reference - the memory address of the object,
// but that reference is still a value. It's simply a value that contains a memory address
// JavaScript does not have passing by reference, only passing by value
// So basically we pass a reference to the function, but we do not pass by reference - this is an important distinction

/// First class and higher order FUNCTIONS //
/*
Functions are simply values.
Functions are just another type of objects 
We can:
- Store functions in variables or properties
- Pass functions as arguments to other functions
- Return functions from functions
- Call methods on functions
HIGHER-ORDER FUNCTIONS:
- a function that receives another functions as an argument, that returns a new function, or both
- This is only possible because of first-class functions

FIRST CLASS FUNCTION - is just a feature that a progamming language either has or does not have. All it means that all functions 
are values. There are no first class functions in practice. 
There are however  HIGHER ORDER FUNCTIONS  in practice. 


// FUNCTIONS ACCEPTING CALLBACK FUNCTIONS //

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

const high5 = function () {
  console.log('👋');
};
document.body.addEventListener('click', high5);

['Jonas', 'Martha', 'Adam'].forEach(high5);
*/
/*
/// FUNCTIONS RETURNING FUNCTIONS ///
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');
greet('Hello')('Jonas');

// Write the function into an arrow function
const greetArr = greeting => name => console.log(`${greeting} ${name}`);
greetArr('Hi')('Alex');


// THE CALL AND APPLY METHODS ///

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  //book: function() {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({
      flight: `${this.iataCode}${flightNum}`,
      name,
    });
  },
};
lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(6635, 'John Smith');

const euroWings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;
//Does not work
// book(23, 'Sarah Williams');
book.call(euroWings, 23, 'Sarah Williams ');
console.log(euroWings);
book.call(lufthansa, 239, 'Mary Cooper ');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};
book.call(swiss, 583, 'Mary Cooper');

// Apply method - not so used anymore
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

// we can write like this :
book.call(swiss, ...flightData);

/// The BIND Method //
// Just like the CALL Method, Bind method allows us to manually set .this keyword for any function call.
// the difference is that BIND does not imediately call the function. Instead it return a new function where the
// .this keyword is bound.

// book.call(euroWings, 23, 'Steven Williams ');
const bookEW = book.bind(euroWings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
bookEW(23, 'Steven Williams');
bookLX(34, 'Alexandra Vlasceanu');

const bookEW23 = book.bind(euroWings, 23);
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value * 0.23
console.log(addVAT(100));
console.log(addVAT(23));

// another way of writing this
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);

console.log(addVAT(100));
console.log(addVAT(23));

/// IMEDIATELY INVOKED FUNCTION EXPRESSIONS (IIFE) //
const runOnce = function () {
  console.log('This will never run again');
};
runOnce();
// IIFE
(function () {
  console.log('This will never run again');
  const isPrivate = 23;
})();

(() => console.log('This will also never run again'))();
{
  const isPrivate = 23;
  var notPrivate = 46;
}
// console.log(isPrivate);
console.log(notPrivate);
*/
/// CLOSURES ///
const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};
const booker = secureBooking();
booker();
booker();
booker();
console.dir(booker);

// A function always has access to the variable environment(VE) of the execution context in which it was created
// CLOSURE VE attached to the function, exactly as it was at the time and place the function was created.
/// Because of CLOSURE a function does not lose connection to variables that existed at the function's birthplace
/// Example 1
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// Re-assigning f function

g();
f();
console.dir(f);
// Example 2

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    console.log(`We are boarding now all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};
const perGroup = 1000;
boardPassengers(180, 3);
/*
/// Parameter as value
let x = 5;

function addOne1(num) {
  num++;
}

addOne1(x);
console.log(x); // 6

// let y = {
//   value: 5,
// };

// function addOne2(num) {
//   num.value++;
// }

// addOne2(y);
// console.log(y.value); // 6

let y = {
  value: 5,
};

function addOne4(num) {
  num = {
    value: 6,
  };
}

addOne4(y);
console.log(y); // 5

// let z = [1, 2, 3, 4];

// function addOne5(num) {
//   num[0]++;
// }

// addOne5(z);
// console.log(z); // [1, 2, 3, 4]

let z = [1, 2, 3, 4];

function addOne6(num) {
  num = [2, 2, 3, 4];
}

addOne6(z);
console.log(z); // [1, 2, 3, 4]

let t = 5;

function addOne7(t) {
  return t++;
}

t = addOne7(t);
console.log(t); // 6
*/
