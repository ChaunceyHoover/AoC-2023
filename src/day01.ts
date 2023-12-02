import * as fs from 'fs';

const rawData = fs.readFileSync('data/day01.txt', 'utf8');
const data = rawData.split('\n');

let total = 0;

for (const line of data) {
	const numbers = [...line.matchAll(/\d/g)];
    
	if (numbers.length == 0) {
		console.log(`${line} has no numbers - skipping`);
		continue;
	}

	total += Number(numbers[0][0] + numbers[numbers.length - 1][0]);
}

console.log(total);