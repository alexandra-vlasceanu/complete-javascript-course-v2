'use strict';
/*
/// Scope chain ///
function calcAge(birthyear) {
  const age = 2037 - birthyear;

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthyear}`;
    console.log(output);

    if (birthyear >= 1991 && birthyear <= 1996) {
      //  Creating NEW veriable with the same name as outer scope's variable
      var millenial = true;
      const firstName = 'Steven';
      // Reassigning outer scope's variable
      output = 'NEW OUTPUT!';

      const str = `Oh, and you are a millenial, ${firstName}`;
      console.log(str);
      function add(a, b) {
        return a + b;
      }
      //   console.log(add(2, 2));
    }
    // console.log(str);
    console.log(millenial);
    // console.log(add(2, 3));
    console.log(output);
  }

  printAge();
  return age;
}
const firstName = 'Jonas';
calcAge(1991);


// Hoisting and TDZ /// Temporal Dead Zone
// - Makes some types of variables accessible/ usable in the code before they are actually declared.
// Variables lifted to the top of their scope

//Variables
console.log(me);
// console.log(job);
// console.log(age);

var me = 'Jonas';
let job = 'teacher';
const age = 1991;

// Functions
console.log(addDecl(2, 3));
// console.log(addExpr(1, 2));
console.log(addArrow);
// console.log(addArrow(2, 2));
function addDecl(a, b) {
  return a + b;
}
const addExpr = function (a, b) {
  return a + b;
};
var addArrow = (a, b) => a + b;

// Example
if (!numProducts) deleteShoppingCart();
var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted!');
}

// Don't use 'var' to declare your variables
// You should declare your variables at the top of each scope
// Allways declare all your functions first and use them only after the declaration



// The this Keyword
// - the this Keyword or this variable is a special variable that is created for every execution context and any function
// - will always take the value of the owner ofthe function in which this keyword is used
// it points to the owner of that funcion
// the value is not always the same. It depends on how the function is actually called and
// it's value is only assigned when the function is called
// arrow functions don't have .this keyword
// console.log(this);
const calcAge = function (birthyear) {
  console.log(2037 - birthyear);
//   console.log(this);
};
calcAge(1991);

const calcAgeArrow = birthyear => {
  console.log(2037 - birthyear);
//   console.log(this);
};
calcAgeArrow(1980);

const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },
};
jonas.calcAge();

const matilda = {
    year: 2017;
}
// Method borrowing
matilda.calcAge = jonas.calcAge;
matilda.calcAge();


/// Regular Function vs. Arrow Function

const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);

    // Solution 1
    // const self = this; // self / that
    // const isMillenial = function () {
    //   console.log(self);
    //   console.log(self.year >= 1980 && self.year <= 1996);
    //   //   console.log(this.year >= 1980 && this.year <= 1996);
    // };
    // Solution 2

    const isMillenial = () => {
      console.log(this);
      console.log(this.year >= 1980 && this.year <= 1996);
    };
    isMillenial();
  },
  greet: () => console.log(`Hey ${this.firstName}`),
};
jonas.greet();
jonas.calcAge();

// Arguments keyword
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(2, 5);
addExpr(2, 5, 7, 9);
var addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};
addArrow(2, 5, 8);


// Primitives vs Objects
let age = 30;
let oldage = age;
age = 31;
console.log(age);
console.log(oldage);

const me = {
  name: 'Jonas',
  age: 30,
};
const friend = me;
friend.age = 27;
console.log('Friend:', friend);
console.log('Me:', me);
*/
/// Primitive types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);
// Reference types
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log('Before marriage:', jessica);
console.log('After marriage:', marriedJessica);

// Copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};
const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

console.log('Before marriage:', jessica2);
console.log('After marriage:', jessicaCopy);
