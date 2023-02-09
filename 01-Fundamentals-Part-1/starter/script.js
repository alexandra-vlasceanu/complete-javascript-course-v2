/* let js = 'amazing';
console.log(40 + 8 + 23 - 10);

console.log('Jonas');
console.log(23);


let firstName = "Matilda"
console.log(firstName);
console.log(firstName);
console.log(firstName);


let javascriptIsFun = true;
console.log(javascriptIsFun)

//console.log(typeof true);
console.log(typeof javascriptIsFun);
//console.log(typeof 23);
//console.log(typeof 'Jonas');

javascriptIsFun = "YES!"
console.log(typeof javascriptIsFun);

year = 1991
console.log(year);
console.log(typeof year);

const now = 2037
const ageJonas = now - 1991;
const ageSarah = now - 2018;
console.log(ageJonas, ageSarah)

console.log(ageJonas * 2, ageJonas / 2)

const firstName = 'Jonas';
const lastName = 'Schmedmann'
console.log(firstName + ' ' + lastName)


//Assignment operators //
let x = 10 + 5; // 15
x += 10; // x = x + 10 = 25
x *= 4 // x = x * 4 = 100
x++
x--
x--
console.log(x)


// Comparoson operators //
console.log(ageJonas > ageSarah);
console.log(ageSarah >= 18);
const isFullAge = ageSarah >= 18;

console.log(now - 1991 > now - 2018);


const now = 2037
const ageJonas = now - 1991;
const ageSarah = now - 2018;

console.log(now - 1991 > now - 2018);

console.log(25 - 10 - 5);
let x, y;
x = y = 25 - 10 - 5;
console.log(x, y);

const averageAge = (ageJonas + ageSarah) / 2;
console.log(ageJonas, ageSarah, averageAge)


//Challenge 1
const johnMass = 92;
const markMass = 78;
const johnHeight = 1.95;
const markHeight = 1.69;

bmiJohn = johnMass / johnHeight ** 2;
bmiMark = markMass / markHeight ** 2;


markHigherBmi = bmiMark > bmiJohn;
console.log(bmiJohn, bmiMark, markHigherBmi)



const firstName = 'Jonas';
const job = 'teacher';
const birthYear = 1991;
const year = 2037;


const jonas = "I'm " + firstName + ", a " + (year - birthYear) + " " + "years old" + " " + job;


const jonasNew = `I'm ${firstName}, a ${year - birthYear} years old ${job}`

console.log(jonas, jonasNew)



const age = 15;
if (age >= 18) {
    console.log(`Sarah can start driving license 🚗`)
} else {
    const yearsLeft = 18 - age;
    console.log(`Sarah is too young. Wait another ${yearsLeft} years :)`)
}

const birthYear = 1998;
let century;
if (birthYear <= 2000) {
    century = 20;
} else {
    century = 21;
}
console.log(century);


// Challenge 2

//const johnMass = 92;
//const markMass = 78;
//const johnHeight = 1.95;
//const markHeight = 1.69;

const johnMass = 85;
const markMass = 95;
const johnHeight = 1.76;
const markHeight = 1.88;

bmiJohn = johnMass / johnHeight ** 2;
bmiMark = markMass / markHeight ** 2;
markHigherBmi = bmiMark > bmiJohn;


if (bmiJohn > bmiMark) {
    console.log(` John's BMI ( ${bmiJohn}) is higher than Mark's ${bmiMark}`)
} else {
    console.log(` Mark's BMI (${bmiMark} is higher than John's (${bmiJohn})`)
}

// type conversion
const imputYear = '1991';
console.log(Number(imputYear), imputYear)
console.log(Number(imputYear) + 18);

console.log(Number('Jonas'));

console.log(typeof NaN);


console.log(String(23), 23)

// type coercion
console.log("I'am " + 23 + " years old")
console.log('23' - '10' - 3);



// 5 falsy values 0, "", undefined, null, NaN
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean("Jonas"));
console.log(Boolean({}));

const money = 100;
if (money) {
    console.log("Don't spend it all! :)")
} else {
    console.log("You should get a job! :D")
}
let height;
if (height) {
    console.log("YAY height is defined")
} else {
    console.log("Height is undefined")
}


const age = '18';
if (age === 18) console.log("You just became an adult (Strict)");
if (age == 18) console.log("You just became an adult(Loose)");

const favourite = Number(prompt("What's your favourite number?"));
console.log(favourite);
console.log(typeof favourite);

if (favourite === 23) {
    console.log("Cool! 23 is an amazing number!")
} else if (favourite === 7) {
    console.log("7 is also a cool number!")
} else {
    console.log(" Number is not 23 or 7")
}

if (favourite !== 23) console.log("Why not 23?")


const hasDriversLicense = true; // A
const hasGoodVision = true; // B
console.log(hasDriversLicense && hasGoodVision)
console.log(hasDriversLicense || hasGoodVision)
console.log(!hasDriversLicense)


/*
if (hasDriversLicense && hasGoodVision) {
    console.log("Sarah is able to drive")
} else {
    console.log("Someone else should drive")
}

const isTired = false; // C
console.log(hasDriversLicense && hasGoodVision && isTired)

if (hasDriversLicense && hasGoodVision && !isTired) {
    console.log("Sarah is able to drive")
} else {
    console.log("Someone else should drive")
}
*/

/*
// Challenge # 3

const averageScoreDolphins = (96 + 108 + 89) / 3;
const averageScoreKoalas = (88 + 91 + 110) / 3;
console.log(averageScoreDolphins, averageScoreKoalas)



const averageScoreDolphins1 = (97 + 112 + 101) / 3;
const averageScoreKoalas1 = (109 + 95 + 123) / 3;
console.log(averageScoreDolphins1, averageScoreKoalas1)

const averageScoreDolphins2 = (97 + 112 + 101) / 3;
const averageScoreKoalas2 = (109 + 95 + 106) / 3
console.log(averageScoreDolphins2, averageScoreKoalas2)


if (averageScoreDolphins > averageScoreKoalas) {
    console.log(`Team Dolphin wins with score ${averageScoreDolphins}`)
} else if (averageScoreDolphins === averageScoreKoalas) {
    console.log("It's a draw")
} else {
    console.log(`Team Koala wins with score ${averageScoreKoalas}`)
}


// Bonus 1

if (averageScoreDolphins1 > averageScoreKoalas1 && averageScoreDolphins1 > 100) {
    console.log("Team Dolphins wins")
} else if (averageScoreKoalas1 > averageScoreDolphins1 && averageScoreKoalas1 > 100) {
    console.log("Team Koalas wins")
} else if (averageScoreDolphins1 === averageScoreKoalas1) {
    console.log("It's a draw")

} else { console.log("Nobody wins") }

// Bonus 2
if (averageScoreDolphins2 > averageScoreKoalas2 && averageScoreDolphins2 > 100) {
    console.log("Team Dolphins wins")
} else if (averageScoreKoalas2 > averageScoreDolphins2 && averageScoreKoalas2 > 100) {
    console.log("Team Koalas wins")
} else if (averageScoreDolphins2 === averageScoreKoalas2 && averageScoreDolphins2 > 100) {
    console.log("It's a draw")

} else { console.log("Nobody wins") }



// The switch statement

const day = 'wednesday';
switch (day) {
    case 'monday':
        console.log("Plan course structure");
        console.log('Go to coding meetup');
        break;
    case 'tuesday':
        console.log('Prepare theory videos');
        break;
    case 'wednesday':
    case 'thursday':
        console.log('Write code examples');
        break;
    case 'friday':
        console.log("Record videos");
        break;
    case 'saturday':
    case 'sunday':
        console.log('Enjoy the weekend :D');
        break;
}
///*
if (day === 'monday') {
    console.log("Plan course structure");
    console.log('Go to coding meetup');
} else if (day === 'tuesday') {
    console.log('Prepare theory videos');
} else if (day === 'wednesday' || day === 'thursday') {
    console.log('Write code examples');
} else if (day === 'friday') {
    console.log('Record videos');
} else if (day === 'saturday' || day === 'sunday') {
    console.log("Enjoy the weekend")
} else {
    console.log("Not a day")
}



//  The conditional operator
const age = 23;
age >= 18 ? console.log('I like to drink wine 🍷') : console.log('I like to drink water 💧')
const drink = age >= 18 ? "wine 🍷" : "water 💧"
console.log(drink)

let drink2;
if (age >= 18) {
    drink2 = 'wine 🍷'
} else {
    drink2 = 'water 💧'
}
console.log(drink2);
console.log(`I like to drink ${age >= 18 ? "wine 🍷" : "water 💧"}`)
*/


//Coding challenge #4

let bill = 30
const tip = bill <= 300 && bill >= 50 ? bill * 0.15 : bill * 0.2
console.log(` The bill was ${bill}, the tip was ${tip} and the total value was ${bill + tip}`)