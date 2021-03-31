import { useState } from 'react';
const axios = require('axios');

const WordsList = ({ parsedWords, bList }) => {

  var [hiddenWords, setHiddenWords] = useState({});

  let buttonTuples = [];

  for (var key in parsedWords) {
    if (key !== '' && !bList[key]) {
      buttonTuples.push([key, parsedWords[key]]);
    }
  }

  buttonTuples.sort((a, b) => {
    return b[1] - a[1];
  })

  const handleClick = (e) => {
    e.target.classList.add('hidden');
    var wordToHide = e.target.innerHTML.split(' : ')[0]
    console.log('wordToHide: ', wordToHide);
    // updating the list of hidden words
    var newHidden = hiddenWords;
    newHidden[wordToHide] = true;
    setHiddenWords(newHidden);
    console.log('hiddenWords: ', hiddenWords);
  }

  const updateIgnoredWords = (e) => {
    console.log('updating the database with new ignored words');
    axios
      .post('http://localhost:3003/updateblacklist', {
        blackListItems: hiddenWords
      })
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const updateFavoredWords = (e) => {
    console.log('updating the database with new favored words');
    axios
      .post('http://localhost:3003/updatewhitelist', {
        whiteListItems: hiddenWords // <= this will be some other way to saver favored items
      })
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div>
      {/* <button id="update-ignored-words" onClick={ updateIgnoredWords }>Update Ignored Words</button>
      {buttonTuples.map((buttonInfo, index) => {
        return (
          <button
            onClick={ handleClick }
            key={ index }
            className="word-button">{ buttonInfo[0] } : { buttonInfo[1] }
          </button>
        );
      })} */}
    </div>
  );
}

export default WordsList;