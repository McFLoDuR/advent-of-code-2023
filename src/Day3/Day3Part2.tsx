import { ChangeEvent, FC } from 'react';

import '../style.css';

export const Day3Part2: FC = () => {
  function process(lines: string[]) {
    let currentNumber = '';

    for (let i = 0; i < lines.length; i++) {
      // If there was a number at the end of the previous line
      if (currentNumber) {
        const length = currentNumber.length;
        const start = lines[i - 1].length - length;
        const coords = adjacentToGear(lines, i - 1, start, length);
        if (coords) {
          addPartNumberToGearMap(coords, Number(currentNumber));
        }
        currentNumber = '';
      }

      const line = lines[i];
      // console.log(line);

      for (let j = 0; j < line.length; j++) {
        const character = line[j];

        if (isNumber(character)) {
          currentNumber += character;

          // If this is the very last character
          if (i === lines.length - 1 && j === line.length - 1) {
            const length = currentNumber.length;
            const start = j - length;
            const coords = adjacentToGear(lines, i, start, length);
            if (coords) {
              addPartNumberToGearMap(coords, Number(currentNumber));
            }
          }
        } else {
          if (currentNumber) {
            const length = currentNumber.length;
            const start = j - length;
            const coords = adjacentToGear(lines, i, start, length);
            if (coords) {
              // console.log(currentNumber);
              addPartNumberToGearMap(coords, Number(currentNumber));
            }
          }
          currentNumber = '';
        }
      }
    }
  }

  function addPartNumberToGearMap(coords: number[], currentNumber: number) {
    const gear = '' + coords[0] + coords[1];
    const partNumbers = gearToNumbersMap.get(gear) ?? [];
    gearToNumbersMap.set(gear, [...partNumbers, currentNumber]);
  }

  function addGearRatio(number: number) {
    gearRatio.push(number);
  }

  let gearRatio: number[] = [];
  const gearToNumbersMap = new Map<string, number[]>();
  const fileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.files[0].text().then((text) => {
      const lines: string[] = text.split('\r\n');
      gearRatio = [];
      process(lines);

      for (const [gear, numbers] of gearToNumbersMap.entries()) {
        if (numbers.length === 2) {
          addGearRatio(numbers[0] * numbers[1]);
        }
      }

      let total = 0;
      for (const number of gearRatio) {
        total += number;
      }
      console.log(total);
    });
  };
  return (
    <div>
      <h1>Day 3 Part 2</h1>
      <input type="file" onChange={fileUpload} />
    </div>
  );
};

function adjacentToGear(
  lines: string[],
  lineIdx: number,
  startIdx: number,
  length: number
): number[] | null {
  const endIdx = startIdx + length - 1;
  const prevLine = lineIdx > 0 ? lines[lineIdx - 1] : null;
  const line = lines[lineIdx];
  const nextLine = lineIdx < lines.length - 1 ? lines[lineIdx + 1] : null;

  // console.log(startIdx, endIdx);

  for (let c = startIdx; c <= endIdx; c++) {
    if (c > 0 && c == startIdx && isGear(line[c - 1])) {
      return [lineIdx, c - 1];
    }
    if (c < line.length - 1 && c == endIdx && isGear(line[c + 1])) {
      return [lineIdx, c + 1];
    }
    if (prevLine && isGear(prevLine[c])) {
      return [lineIdx - 1, c];
    }
    if (nextLine && isGear(nextLine[c])) {
      return [lineIdx + 1, c];
    }
    if (prevLine && c > 0 && c == startIdx && isGear(prevLine[c - 1])) {
      return [lineIdx - 1, c - 1];
    }
    if (nextLine && c > 0 && c == startIdx && isGear(nextLine[c - 1])) {
      return [lineIdx + 1, c - 1];
    }
    if (
      prevLine &&
      c < line.length - 1 &&
      c == endIdx &&
      isGear(prevLine[c + 1])
    ) {
      return [lineIdx - 1, c + 1];
    }
    if (
      nextLine &&
      c < line.length - 1 &&
      c == endIdx &&
      isGear(nextLine[c + 1])
    ) {
      return [lineIdx + 1, c + 1];
    }
  }

  return null;
}

function isNumber(character: string) {
  return character >= '0' && character <= '9';
}

function isGear(character: string) {
  return character === '*';
}
