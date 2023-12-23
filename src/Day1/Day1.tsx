import { ChangeEvent, FC } from 'react';

import '../style.css';

const numbersAsStrings = new Map<string, string>();
numbersAsStrings.set('one', '1');
numbersAsStrings.set('two', '2');
numbersAsStrings.set('three', '3');
numbersAsStrings.set('four', '4');
numbersAsStrings.set('five', '5');
numbersAsStrings.set('six', '6');
numbersAsStrings.set('seven', '7');
numbersAsStrings.set('eight', '8');
numbersAsStrings.set('nine', '9');
numbersAsStrings.set('1', '1');
numbersAsStrings.set('2', '2');
numbersAsStrings.set('3', '3');
numbersAsStrings.set('4', '4');
numbersAsStrings.set('5', '5');
numbersAsStrings.set('6', '6');
numbersAsStrings.set('7', '7');
numbersAsStrings.set('8', '8');
numbersAsStrings.set('9', '9');

function isNumber(char: string) {
  return char >= '0' && char <= '9';
}

export const Day1: FC = () => {
  const fileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.files[0].text().then((text) => {
      const lines: string[] = text.split('\r\n');
      const numbers: string[] = [];

      for (const line of lines) {
        let cleanedLine = line.slice();

        if (!isNumber(line[0])) {
          let first = line.length;
          let number = null;
          for (const [key, value] of numbersAsStrings.entries()) {
            const idx = line.indexOf(key);
            if (idx !== -1 && idx < first) {
              first = idx;
              number = key;
            }
          }
          if (number) {
            cleanedLine = cleanedLine.replace(
              number,
              numbersAsStrings.get(number)
            );
          }
        }

        if (!isNumber(line[line.length - 1])) {
          let last = -1;
          let number = null;
          for (const [key, value] of numbersAsStrings.entries()) {
            const idx = line.lastIndexOf(key);
            if (idx !== -1 && idx > last) {
              last = idx;
              number = key;
            }
          }
          if (number) {
            cleanedLine = cleanedLine.replaceAll(
              number,
              numbersAsStrings.get(number)
            );
          }
        }

        let digits = '';
        for (let i = 0; i < cleanedLine.length; i++) {
          const char = cleanedLine[i];
          if (isNumber(char)) {
            digits += char;
            break;
          }
        }
        for (let i = cleanedLine.length - 1; i >= 0; i--) {
          const char = cleanedLine[i];
          if (isNumber(char)) {
            digits += char;
            break;
          }
        }

        console.log(line, digits);
        numbers.push(digits);
      }

      let total = 0;
      for (const number of numbers) {
        total += Number(number);
      }
      console.log(total);
    });
  };

  return (
    <div>
      <h1>Day 1</h1>
      <input type="file" onChange={fileUpload} />
    </div>
  );
};
