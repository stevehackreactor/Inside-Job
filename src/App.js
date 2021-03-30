import './App.css';
import Crawler from './components/Crawler.js';
import { useState } from 'react';

function App() {

  const [site, setSite] = useState('');
  const [job, setJob] = useState('');

  const handleSiteChange = (e) => {
    setSite(e.target.value);
  }
  const handleJobChange = (e) => {
    setJob(e.target.value);
  }

  const clearSite = (e) => {
    e.target.val = '';
  }

  const clearJob = (e) => {
    e.target.val = '';
  }


  return (
    <div className="App">
      <div id="crawl-meta">
        <textarea id="crawl-location" onChange={ handleSiteChange } onClick={ clearSite } placeholder="Job Website"></textarea>
        <textarea id="crawl-job" onChange={ handleJobChange } onClick={ clearJob } placeholder="JobName(nospaces)"></textarea>
        <Crawler site={ site } job={ job }/>
      </div>
    </div>
  );
}

export default App;
