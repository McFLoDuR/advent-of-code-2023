import { ChangeEvent, FC } from 'react';

import '../style.css';

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

type Color = 'red' | 'green' | 'blue';

export const Day2Part1: FC = () => {
  const fileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.files[0].text().then((text) => {
      const lines: string[] = text.split('\r\n');
      const possibleGamesMap = new Map<number, boolean>();

      for (const line of lines) {
        const gameId = Number(line.split(':')[0].split('Game ')[1]);
        possibleGamesMap.set(gameId, true);

        for (const batches of line.split(':')[1].split(';')) {
          const handful = batches.split(',');
          for (const cubes of handful) {
            const count = Number(cubes.trim().split(' ')[0]);
            const color = cubes.trim().split(' ')[1] as Color;
            if (count > MAX_BLUE) {
              possibleGamesMap.set(gameId, false);
            }
            if (count > MAX_GREEN && color !== 'blue') {
              possibleGamesMap.set(gameId, false);
            }
            if (count > MAX_RED && color === 'red') {
              possibleGamesMap.set(gameId, false);
            }
          }
        }
      }

      let total = 0;
      for (const [id, possible] of possibleGamesMap.entries()) {
        if (possible) {
          total += id;
        }
      }
      console.log(total);
    });
  };
  return (
    <div>
      <h1>Day 2 Part 1</h1>
      <input type="file" onChange={fileUpload} />
    </div>
  );
};
