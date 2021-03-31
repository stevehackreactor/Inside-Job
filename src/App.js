import './App.css';
import Crawler from './components/Crawler.js';
import { useState, useEffect } from 'react';
const axios = require('axios');

function App() {

  const [site, setSite] = useState('');
  const [job, setJob] = useState('');
  const [bList, setBList] = useState({});

  const handleSiteChange = (e) => {
    setSite(e.target.value);
  }
  const handleJobChange = (e) => {
    setJob(e.target.value);
  }
  useEffect(() => {
    axios
      .get('http://localhost:3003/blacklist/')
      .then((response) => {
        console.log('initial blist find: ', response.data);
        let newBList = {};
        response.data.forEach((word) => {
          newBList[word.word] = true;
        })
        setBList(newBList);
      })
  },[])

  return (
    <div className="App">
      <div id="crawl-meta">
        <textarea
          id="crawl-location"
          onChange={ handleSiteChange }
          placeholder="Job Website">
        </textarea>
        <textarea
          id="crawl-job"
          onChange={ handleJobChange }
          placeholder="JobName(nospaces)">
        </textarea>
        <Crawler
          site={ site }
          job={ job }
          bList={ bList } />
      </div>
    </div>
  );
}

export default App;
