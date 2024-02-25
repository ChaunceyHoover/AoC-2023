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

function getFullNumber(data: string, index: number): number {
    let fullNumber = data.charAt(index);

    let startIndex = index;
    while (true) {
        const leftChar = data.charAt(--startIndex);
        if (leftChar.match('\d') == null) break;

        fullNumber = leftChar + fullNumber;
    }

    startIndex = index
    while (true) {
        const rightChar = data.charAt(++startIndex);
        if (rightChar.match('\d') == null) break;

        fullNumber += rightChar;
    }

    return Number(fullNumber);
}

for (let y = 1; y < height - 2; y++) {
    for (let x = 1; x < width - 2; x++) {
        const char = rawData[xyToPos(x, y)];
        const isSymbol = symbols.indexOf(char) !== -1;
        if (isSymbol) {
            const symbolIndex = xyToPos(x, y);
            const startOfRow = y * width,
                  endOfRow = ((y + 1) * width) - 1;

            const aboveData = rawData.substring(startOfRow - width, endOfRow - width);
                //   leftData = rawData.substring(startOfRow, symbolIndex),
                //   belowData = rawData.substring(startOfRow + width, endOfRow + width),
                //   rightData = rawData.substring(symbolIndex + 1, endOfRow);

            console.log(rawData[xyToPos(x, y - 1)]);
            const aboveNumber = getFullNumber(aboveData, xyToPos(x, y - 1));
                //   leftNumber = getFullNumber(leftData, xyToPos(x - 1, y)),
                //   belowNumber = getFullNumber(belowData, xyToPos(x, y + 1)),
                //   rightNumber = getFullNumber(rightData, xyToPos(x + 1, y));
            
            console.log('above', aboveNumber);
            // console.log('left', leftNumber);
            // console.log('below', belowNumber);
            // console.log('right', rightNumber);
            break;
        }
    }
    break;
}