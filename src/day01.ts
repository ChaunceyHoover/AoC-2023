import * as fs from 'fs';

// Read the day 1 text and split into an array by lines
const rawData = fs.readFileSync('data/day01.txt', 'utf8').replaceAll('\r', '');
const data = rawData.split('\n');

let total = 0;

/**
 * Converts the given name of a number to its value
 * @param num The spelling of a single digit number
 * @returns The value of a single digit number
 */
const nameToNumber = (num: string) => {
    switch (num) {
        case 'one':
            return 1;
        case 'two':
            return 2;
        case 'three':
            return 3;
        case 'four':
            return 4;
        case 'five':
            return 5;
        case 'six':
            return 6
        case 'seven':
            return 7;
        case 'eight':
            return 8;
        case 'nine':
            return 9;
        default:
            return 0;
    }
}

for (const line of data) {
    // Find first index of either a numeric value or the spelling of a number
	const rawFirstNumber = line.match(/(one|two|three|four|five|six|seven|eight|nine|zero|\d)/);

    // Reverse the string and do the same thing again, but using the reversed spelling of each number name
    const rawLastNumber = line.split('').reverse().join('').match(/eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|orez|\d/);
    
    // Pretty sure this won't happen, but TypeScript says to check for it
	if (rawFirstNumber == null || rawLastNumber == null) {
		console.log(`${line} has no numbers - skipping`);
		continue;
	}
	
    // if Number(firstNumber) == NaN, then it's a string match and needs to convert its name to its numeric value. Otherwise, use numeric value.
	const firstNumber = isNaN(Number(rawFirstNumber[0])) ? nameToNumber(rawFirstNumber[0]) : Number(rawFirstNumber[0]),

    // Same thing with last number, except everything is in reverse. So, flip the name before converting it.
		  lastNumber = isNaN(Number(rawLastNumber[0])) ? nameToNumber(rawLastNumber[0].split('').reverse().join('')) : Number(rawLastNumber[0]);

    total += (firstNumber * 10) + lastNumber;
}

console.log('calibration value:', total);