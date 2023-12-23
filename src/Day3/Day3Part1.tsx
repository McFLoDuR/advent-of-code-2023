import { ChangeEvent, FC } from 'react';

import '../style.css';

export const Day3Part1: FC = () => {
  let partNumbers: number[] = [];

  function process(lines: string[]) {
    let currentNumber = '';

    for (let i = 0; i < lines.length; i++) {
      // If there was a number at the end of the previous line
      if (currentNumber) {
        const prev = i - 1;
        const len = lines[prev].length;
        if (
          adjacentToSymbol(
            lines,
            prev,
            len - currentNumber.length,
            currentNumber.length
          )
        ) {
          addPartNumber(currentNumber);
        }
        currentNumber = '';
      }

      const line = lines[i];
      console.log(line);

      for (let j = 0; j < line.length; j++) {
        const character = line[j];

        if (isNumber(character)) {
          currentNumber += character;

          // If this is the very last character
          if (i === lines.length - 1 && j === line.length - 1) {
            if (
              adjacentToSymbol(
                lines,
                i,
                j - currentNumber.length,
                currentNumber.length
              )
            ) {
              addPartNumber(currentNumber);
            }
          }
        } else {
          if (currentNumber) {
            if (
              adjacentToSymbol(
                lines,
                i,
                j - currentNumber.length,
                currentNumber.length
              )
            ) {
              // console.log(currentNumber);
              addPartNumber(currentNumber);
            }
          }
          currentNumber = '';
        }
      }
    }
  }

  function addPartNumber(number: string) {
    partNumbers.push(Number(number));
  }

  const fileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.files[0].text().then((text) => {
      const lines: string[] = text.split('\r\n');
      process(lines);

      let total = 0;
      for (const number of partNumbers) {
        total += number;
      }
      console.log(total);
    });
  };
  return (
    <div>
      <h1>Day 3 Part 1</h1>
      <input type="file" onChange={fileUpload} />
    </div>
  );
};

function adjacentToSymbol(
  lines: string[],
  lineIdx: number,
  startIdx: number,
  length: number
) {
  const endIdx = startIdx + length - 1;
  const prevLine = lineIdx > 0 ? lines[lineIdx - 1] : null;
  const line = lines[lineIdx];
  const nextLine = lineIdx < lines.length - 1 ? lines[lineIdx + 1] : null;

  // console.log(startIdx, endIdx);

  for (let c = startIdx; c <= endIdx; c++) {
    if (c > 0 && c == startIdx && isSymbol(line[c - 1])) {
      return true;
    }
    if (c < line.length - 1 && c == endIdx && isSymbol(line[c + 1])) {
      return true;
    }
    if (prevLine && isSymbol(prevLine[c])) {
      return true;
    }
    if (nextLine && isSymbol(nextLine[c])) {
      return true;
    }
    if (prevLine && c > 0 && c == startIdx && isSymbol(prevLine[c - 1])) {
      return true;
    }
    if (nextLine && c > 0 && c == startIdx && isSymbol(nextLine[c - 1])) {
      return true;
    }
    if (
      prevLine &&
      c < line.length - 1 &&
      c == endIdx &&
      isSymbol(prevLine[c + 1])
    ) {
      return true;
    }
    if (
      nextLine &&
      c < line.length - 1 &&
      c == endIdx &&
      isSymbol(nextLine[c + 1])
    ) {
      return true;
    }
  }

  return false;
}

function isNumber(character: string) {
  return character >= '0' && character <= '9';
}

function isSymbol(character: string) {
  return !isNumber(character) && character !== '.';
}
