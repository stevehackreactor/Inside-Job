import { useState } from 'react';
import WordsList from './WordsList';
import Report from './Report';
const axios = require('axios');


const Crawler = ({ site, job, bList }) => {


  const [parsedWords, setParsedWords] = useState({});
  const [foundKeywords, setFoundKeywords] = useState([])
  const [generating, setGenerating] = useState(false);
  const [relatedSites, setRelatedSites] = useState([]);
  const [commonWords, setCommonWords] = useState({});
  const [loading, setLoading] = useState(false);

  const crawl = () => {
    setLoading(true);

    axios.post(`http://localhost:3003`, {
      site: site,
      job: job
    })
      .then((response) => {
        setFoundKeywords(response.data.foundKeywords);
        setParsedWords(response.data.sorted);
        setRelatedSites(response.data.hrefs);
        setCommonWords(response.data.sorted);
        setGenerating(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log('error: ', err);
      })
  };

  return (
    <div id="crawl-button">
      <button onClick={ crawl }>Get Deets</button>
      <WordsList
        parsedWords={ parsedWords }
        bList={ bList } />
      <img
        className={ loading ? '' : 'hidden'}
        src="https://media.giphy.com/media/52qtwCtj9OLTi/giphy.gif"
        alt="loading icon">
      </img>
      <Report
        generating={ generating }
        foundKeywords={ foundKeywords }
        relatedSites={ relatedSites }
        commonWords={ commonWords }
        job={ job }
        siteLink={ site }
        bList={ bList }
        parsedWords={ parsedWords } />
    </div>
  )
}

export default Crawler;
