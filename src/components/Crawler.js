import { useState } from 'react';
import WordsList from './WordsList';
const axios = require('axios');


const Crawler = ({ site, job }) => {


  const [parsedWords, setParsedWords] = useState({});

  const crawl = () => {
    axios.post(`http://localhost:3003`, {
      site: site,
      job: job
    })
      .then((response) => {
        console.log('response in front end allwords: ', response.data.text)
        console.log('response in front end sites: ', response.data.sites)
        console.log('response in front end sorted: ', response.data.sorted)
        setParsedWords(response.data.sorted);
      })
      .catch((err) => {
        console.log('error: ', err);
      })
  };

  return (
    <div id="crawl-button">
      <button onClick={ crawl }>Get Deets</button>
      <WordsList parsedWords={ parsedWords }/>
    </div>
  )
}

export default Crawler;
