import { ChangeEvent, FC } from 'react';

import '../style.css';

type Color = 'red' | 'green' | 'blue';

export const Day2Part2: FC = () => {
  const fileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.files[0].text().then((text) => {
      const lines: string[] = text.split('\r\n');
      const powers: number[] = [];

      for (const line of lines) {
        const gameId = Number(line.split(':')[0].split('Game ')[1]);
        let max = new Map<Color, number>();
        max.set('red', 0);
        max.set('green', 0);
        max.set('blue', 0);

        for (const batches of line.split(':')[1].split(';')) {
          const handful = batches.split(',');
          for (const cubes of handful) {
            const count = Number(cubes.trim().split(' ')[0]);
            const color = cubes.trim().split(' ')[1] as Color;
            if (max.get(color) != 0 && max.get(color) < count) {
              max.set(color, count);
            }
            if (max.get(color) === 0) {
              max.set(color, count);
            }
          }
        }
        powers.push(max.get('red') * max.get('green') * max.get('blue'));
      }

      const total = powers.reduce((sum, cur) => sum + cur, 0);
      console.log(total);
    });
  };
  return (
    <div>
      <h1>Day 2 Part 2</h1>
      <input type="file" onChange={fileUpload} />
    </div>
  );
};
