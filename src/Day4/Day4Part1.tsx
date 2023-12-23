import { ChangeEvent, FC } from 'react';

export const Day4Part1: FC = () => {
  let cardPoints = [];
  function processCardsIntoPoints(scratchcards: string[]) {
    for (const card of scratchcards) {
      const cardContents = card.split(':')[1];
      let winningNumbers = [];
      let myNumbers = [];

      let matchingNumbers = [];

      getWinningNumbers(cardContents).forEach((sub) =>
        winningNumbers.push(Number(sub))
      );
      getMyNumbers(cardContents).forEach((sub) => myNumbers.push(Number(sub)));

      for (const number of winningNumbers) {
        if (myNumbers.includes(number)) {
          matchingNumbers.push(number);
        }
      }

      const points = matchingNumbers.length
        ? Math.pow(2, matchingNumbers.length - 1)
        : 0;
      cardPoints.push(points);
    }
  }

  const fileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    cardPoints = [];
    event.target.files[0].text().then((text) => {
      const scratchcards: string[] = text.split('\r\n');

      processCardsIntoPoints(scratchcards);

      let total = 0;
      for (const points of cardPoints) {
        total += points;
      }
      console.log(total);
    });
  };
  return (
    <div>
      <h1>Day 4 Part 1</h1>
      <input type="file" onChange={fileUpload} />
    </div>
  );
};

function getWinningNumbers(cardContents: string) {
  return cardContents
    .split('|')[0]
    .split(' ')
    .filter((sub) => sub.trim() !== '');
}
function getMyNumbers(cardContents: string) {
  return cardContents
    .split('|')[1]
    .split(' ')
    .filter((sub) => sub.trim() !== '');
}

function isNumber(character: string) {
  return character >= '0' && character <= '9';
}
