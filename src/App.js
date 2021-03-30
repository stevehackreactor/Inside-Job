import './App.css';
import Crawler from './components/Crawler.js';
import { useState } from 'react';
const puppeteer = require('puppeteer');

function App() {

  const [site, setSite] = useState('');

  const handleSiteChange = (e) => {
    setSite(e.target.value);
  }


  return (
    <div className="App">
      <div id="crawl-meta">
        <textarea id="crawl-location" onChange={ handleSiteChange }></textarea>
        <button id="crawl-button">Get Info</button>
        <Crawler site={ site }/>
      </div>
    </div>
  );
}

export default App;
