import { useState } from 'react';

const WordsList = ({ parsedWords }) => {

  let buttonTuples = [];
  // write an algorithm that sorts the array as you add to it


  for (var key in parsedWords) {
    if (key !== '') {
      buttonTuples.push([key, parsedWords[key]]);
    }
  }

  buttonTuples.sort((a, b) => {
    return b[1] - a[1];
  })

  const handleClick = (e) => {
    e.target.classList.add('hidden');
    console.log('this: ', this);
    console.log('e: ', e);
  }

  return (
    <div>
      {buttonTuples.map((buttonInfo, index) => {
        return (
          <button
            onClick={ handleClick }
            key={ index }
            className="word-button">{ buttonInfo[0] } : { buttonInfo[1] }
          </button>
        );
      })}
    </div>
  );
}

export default WordsList;