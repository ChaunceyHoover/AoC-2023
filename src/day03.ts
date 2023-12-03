import * as fs from 'fs';

// Read the day 1 text and split into an array by lines
const rawData: string = fs.readFileSync('data/day03.txt', 'utf8').replaceAll('\r', '');

// I'm just assuming these symbols idk what else they want
const symbols = "!@#$%^&*()-=_+";

// build xy coordinate system
const data = rawData.split('\n');
const width = data[0].length;
const height = data.length;

type Point = {
    x: number;
    y: number;
}

const xyToPos = (x: number, y: number): number => (x % width) + y * height;
const posToXy = (pos: number): Point => {
    return {
        x: pos % width,
        y: Math.floor(pos / width)
    }
}

for (let y = 1; y < height - 2; y++) {
    for (let x = 1; x < width - 2; x++) {
        const char = rawData[xyToPos(x, y)];
        const isSymbol = symbols.indexOf(char) !== -1;
        if (isSymbol) {
            console.log(`${char} is symbol at ${xyToPos(x, y)}`)
            const symbolIndex = xyToPos(x, y);
            const startOfRow = Math.floor(symbolIndex / width),
                  endOfRow = Math.floor(symbolIndex / width) + width - 1;

            console.log('top', rawData.substring(startOfRow - width, endOfRow - width));
            console.log('left', rawData.substring(startOfRow, symbolIndex));
            console.log('right', rawData.substring(symbolIndex + 1, endOfRow));
            break;
        }
    }
    break;
}