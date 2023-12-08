import * as fs from 'fs';

// Read the day 1 text and split into an array by lines
const rawData: string = fs.readFileSync('data/day04.txt', 'utf8').replaceAll('\r', '');
const rows: string[] = rawData.split('\n');

// Create a consistent data type to map results
type Data = {
    cardId: number;
    winningNumbers: number[];
    givenNumbers: number[];
}

// Parsed rows of data from text file
let parsedData: Data[] = [];

// Total score
let totalPoints: number = 0;

// step 1: parse each row into a usable type
for (const row of rows) {
    // skip new lines
    if (row.length === 0) continue;

    // Get card #
    const rowId = row.match(/Card[ ]+(\d+)/);
    if (rowId == null) continue;

    // Get important positions in the consistently formatted string
    const startOfWinningNumbers = row.indexOf(':') + 1,
          endOfWinningNumbers = row.indexOf('|') - 1,
          startOfMyNumbers = row.indexOf('|') + 1;
    
    // Convert strings into number arrays
    const winningNumbers = row.substring(startOfWinningNumbers, endOfWinningNumbers)
            .replaceAll('  ', ' ')
            .trim()
            .split(' ')
            .map((num) => Number(num)),
          myNumbers = row.substring(startOfMyNumbers)
            .replaceAll('  ', ' ')
            .trim()
            .split(' ')
            .map((num) => Number(num));
    
    // Add parsed data to stack
    parsedData.push({
        cardId: Number(rowId[1]),
        winningNumbers,
        givenNumbers: myNumbers
    });
}

// step 2: Process the data
for (const data of parsedData) {
    let winningMatches = 0;
    data.winningNumbers.forEach(winner => {
        data.givenNumbers.forEach(given => {
            if (winner == given)
                winningMatches++;
        })
    })
    
    if (winningMatches > 0)
        totalPoints += Math.pow(2, winningMatches - 1);
}

console.log('total', totalPoints);