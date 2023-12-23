import { ChangeEvent, FC } from 'react';

export const Day4Part2: FC = () => {
  let cardNr2CountMap = new Map<number, number>();
  const fileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    cardNr2CountMap = new Map<number, number>();
    event.target.files[0].text().then((text) => {
      const scratchcards: string[] = text.split('\r\n');

      for (let nr = 1; nr <= scratchcards.length; nr++) {
        cardNr2CountMap.set(nr, 1);
      }
      for (const card of scratchcards) {
        const cardNumber = getCardNumber(card);
        const cardContents = card.split(':')[1];
        let winningNumbers = [];
        let myNumbers = [];

        getWinningNumbers(cardContents).forEach((sub) =>
          winningNumbers.push(Number(sub))
        );
        getMyNumbers(cardContents).forEach((sub) =>
          myNumbers.push(Number(sub))
        );

        const count = cardNr2CountMap.get(cardNumber);
        for (let i = 0; i < count; i++) {
          let nextCard = cardNumber + 1;
          for (let x = 0; x < winningNumbers.length; x++) {
            const number = winningNumbers[x];
            if (myNumbers.includes(number)) {
              const cur = cardNr2CountMap.get(nextCard);
              cardNr2CountMap.set(nextCard, cur + 1);
              nextCard++;
            }
          }
        }
      }

      let nofCards = 0;
      for (const count of cardNr2CountMap.values()) {
        nofCards += count;
      }
      console.log(nofCards);
    });
  };
  return (
    <div>
      <h1>Day 4 Part 2</h1>
      <input type="file" onChange={fileUpload} />
    </div>
  );
};

function getCardNumber(card: string) {
  return Number(card.split(':')[0].split('Card ')[1]);
}

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
