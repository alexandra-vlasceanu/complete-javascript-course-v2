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
*/


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

