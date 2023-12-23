import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Day1 } from './Day1/Day1';
import { Day2Part1 } from './Day2/Day2Part1';
import { Day2Part2 } from './Day2/Day2Part2';
import { Day3Part1 } from './Day3/Day3Part1';
import { Day3Part2 } from './Day3/Day3Part2';
import { Day4Part1 } from './Day4/Day4Part1';
import { Day4Part2 } from './Day4/Day4Part2';

const root = createRoot(document.getElementById('app'));

root.render(
  <StrictMode>
    <Day4Part2 />
    <Day4Part1 />
    <hr />
    <Day3Part2 />
    <Day3Part1 />
    <hr />
    <Day2Part2 />
    <Day2Part1 />
    <hr />
    <Day1 />
  </StrictMode>
);
