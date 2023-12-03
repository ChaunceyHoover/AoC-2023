import * as fs from 'fs';

// Read the day 1 text and split into an array by lines
const rawData = fs.readFileSync('data/day02.txt', 'utf8').replaceAll('\r', '');
const data = rawData.split('\n');

// Re-usable object to represent colors
type Cubes = {
    red: number,
    green: number,
    blue: number
}

// Parse a game into a set of Cubes
function ParseCubeSelection(gameResults: string): Cubes[] {
    // All rounds of the game results
    let cubes: Cubes[] = [];

    // Split the rounds into separate arrays
    let rounds: string[] = gameResults.split(';');

    // Loop through each round to parse
    for (const round of rounds) {
        const redMatch = round.match(/(\d+) red/),
              greenMatch = round.match(/(\d+) green/),
              blueMatch = round.match(/(\d+) blue/);
        
        // Helper to convert regex result into a number
        const matchOrZero = (regMatch: RegExpMatchArray | null): number => regMatch != null ? Number(regMatch[1]) : 0;
        cubes.push({
            red: matchOrZero(redMatch),
            green: matchOrZero(greenMatch),
            blue: matchOrZero(blueMatch)
        });
    }

    return cubes;
}

let totalIds = 0;

for (const row of data) {
    // Skip empty rows
    if (row.length === 0) continue;

    // Get game ID
    const gameIdRegex = row.match(/Game (\d+):/);
    const gameId = gameIdRegex != null ? Number(gameIdRegex[1]) : 0;

    // Parse rounds
    const results = ParseCubeSelection(row.substring(row.indexOf(':') + 2));

    // Check if it's possible to have only 12 red cubes, 13 green cubes, 14 blue cubes
    let possible = true;
    for (const result of results) {
        if (result.red > 12 || result.green > 13 || result.blue > 14) {
            possible = false;
        }
    }

    if (possible) totalIds += gameId;
}

console.log('sum of game IDs:', totalIds);