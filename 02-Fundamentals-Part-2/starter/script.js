'use strict';
/*
function logger() {
    console.log('My name is Jonas');
}

// calling, running or invoking the function

logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
    const juice = `Juice with ${apples} and ${oranges} oranges.`
    return juice
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice)

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice)

//// Function declaration and function expression

// Function declaration
function calcAge1(birthYear) {
    return 2037 - birthYear;
}

const age1 = calcAge1(1991);


//Function expression
const calcAge2 = function (birthYear) {
    return 2037 - birthYear;
}

const age2 = calcAge2(1991)
console.log(age1, age2);



//// Arrow function ////

const calcAge3 = birthYear => 2037 - birthYear;
const age3 = calcAge3(1991);
console.log(age3);

const yearsUntilRetirement = (birthYear, firstName) => {
    const age = 2037 - birthYear
    const retirement = 65 - age
    return `${firstName} retires in ${retirement} years`
}

console.log(yearsUntilRetirement(1991, 'Jonas'));
console.log(yearsUntilRetirement(1980, 'Bob'));



/////   Functions calling other Functions ////

function cutFruitPieces(fruit) {
    return fruit * 4;
}
function fruitProcessor(apples, oranges) {
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges)

    const juice = `Juice with ${applePieces}  apple pieces and ${orangePieces} orange pieces.`
    return juice;
}
console.log(fruitProcessor(2, 3));



/// Reviewing functions ///
const calcAge = function (birthYear) {
    return 2037 - birthYear
}
const yearsUntilRetirement = function (birthYear, firstName) {
    const age = calcAge(birthYear)
    const retirement = 65 - age

    if (retirement > 0) {
        console.log(`${firstName} retires in ${retirement} years`);
        return retirement
    } else {
        console.log(`${firstName} is already retired 🎉`)
        return -1
    }
    // return `${firstName} retires in ${retirement} years`

}
console.log(yearsUntilRetirement(1991, 'Jonas'));
console.log(yearsUntilRetirement(1970, 'Mike'));
*/

/*
/// Challenge #1 //

const calcAverage = (score1, score2, score3) => {
    const averageScore = (score1 + score2 + score3) / 3
    return averageScore
}
console.log(calcAverage(44, 23, 71));
console.log(calcAverage(65, 54, 49));

// const dolphins = calcAverage(44, 23, 71)
// const koalas = calcAverage(65, 54, 49)

// console.log(dolphins)
// console.log(koalas)


const checkWinner = function (avgDolphins, avgKoalas) {

    if (avgDolphins > 2 * avgKoalas) {
        console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`)
    } else if (avgKoalas > 2 * avgDolphins) {
        console.log(`Koala win (${avgKoalas} vs. ${avgDolphins})`)
    } else {
        console.log('Nobody wins')
    }

}

// checkWinner(dolphins, koalas)

checkWinner(
    calcAverage(44, 23, 71),
    calcAverage(65, 54, 49)
)
checkWinner(calcAverage(85, 54, 41), calcAverage(23, 34, 27))



/// Jonas solution //
// 1
const calcAverage = (a, b, c) => (a + b + c) / 3;
console.log(calcAverage(3, 4, 5));

//2. Test data 1

let scoreDolphins = calcAverage(44, 23, 71);
let scoreKoalas = calcAverage(64, 54, 49);
console.log(scoreDolphins, scoreKoalas);

// 3
const checkWinner = function (avgDolphins, avgKoalas) {
    if (avgDolphins >= 2 * avgKoalas) {
        console.log(`Dolphins win 🏆 (${avgDolphins} vs ${avgKoalas})`);
    } else if (avgKoalas >= 2 * avgDolphins) {
        console.log(`Koalas win 🏆 (${avgDolphins} vs ${avgKoalas})`);
    } else {
        console.log('No team wins...');
    }
}
checkWinner(scoreDolphins, scoreKoalas);

// 4. Test data 2
scoreDolphins = calcAverage(85, 54, 41);
scoreKoalas = calcAverage(23, 34, 27);
console.log(scoreDolphins, scoreKoalas);
checkWinner(scoreDolphins, scoreKoalas);



// INTRODUCING TO ARRAYS //

const friend1 = "Michael";
const friend2 = "Steven";
const friend3 = "Peter";
//retrieve
const friends = ['Michael', 'Steven', 'Peter']; // Position starts at 0. Michael - 0, Steven - 1, Peter - 2,
console.log(friends);
const y = new Array(1991, 1984, 2008, 2020);
console.log(friends[0]);
console.log(friends[2]);

console.log(friends.length);
console.log(friends[friends.length - 1]);

//replace
friends[2] = 'Jay';
console.log(friends);

// can hold values of different types all on the same time //
const firstName = 'Jonas';
const jonas = [firstName, 'Schmedtmann', 2037 - 1991, 'teacher', friends];
console.log(jonas);

// Exercise
const calcAge = function (birthYear) {
    return 2037 - birthYear;
}
const years = [1990, 1967, 2002, 2010, 2018];   //we cannot do operations with arrays
const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[years.length - 1]);  // to retrive the last array, because the index of the array is 0 based
console.log(age1, age2, age3);

const ages = [calcAge(years[0]), calcAge(years[1]), calcAge(years[years.length - 1])];
console.log(ages);
*/

// BASIC ARRAYS OPERATIONS (METHODS) //

// Add elements // - Returns the length

//Push method is a function. Use for pass arguments(add argument to the array)
const friends = ['Michael', 'Steven', 'Peter'];
const newlength = friends.push('Jay');
console.log(friends);
console.log(newlength);

// Unshift method - add elements to the beginnig of the array
friends.unshift('John')
console.log(friends);

// Remove elements // - Returns the removed element

// Pop method - opposite of the push method. it will remove the last element of the array
friends.pop();
const popped = friends.pop();
console.log(friends);
console.log(popped);

// Shift method - removes the first element of the array
friends.shift();
console.log(friends);

// Index of - will return the index at which this element is located
console.log(friends.indexOf('Steven'));
console.log(friends.indexOf('Bob'));

// Includes mehthod - instead of returning the index of the element 
//will return true if the element is in the array and false is it's not
console.log(friends.includes('Steven'))
console.log(friends.includes('Bob'))

// * We can use the includes method to write conditionals

if (friends.includes('Steven')) {
    console.log('You have a friend called Steven')
}

