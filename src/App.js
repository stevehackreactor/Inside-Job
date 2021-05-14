import './App.css';
import Crawler from './components/Crawler.js';
import Sidebar from './components/Sidebar.js';
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
        let newBList = {};
        response.data.forEach((word) => {
          newBList[word.word] = true;
        })
        setBList(newBList);
      })
  },[])

  const titleWord = 'INSIDE-JOB'.split('');

  return (
    <div className="App">
      <h1 id="main-title">
        {titleWord.map(letter => <span>{letter}</span>
        )}
      </h1>
      <Sidebar />
      <div id="crawl-meta">
        <textarea
          id="crawl-location"
          onChange={ handleSiteChange }
          placeholder="Job Website">
        </textarea>
        <textarea
          id="crawl-job"
          onChange={ handleJobChange }
          placeholder="Job Name">
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
