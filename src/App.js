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
        let newBList = {};
        response.data.forEach((word) => {
          newBList[word.word] = true;
        })
        setBList(newBList);
      })
  },[])

  let title = 'INSIDE-JOB'.split('');

  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log(profile);
    console.log('logged in');
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  const getProfileInfo = () => {
    window.location.href = 'http://localhost:3003/auth/google'
    // window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=72049321950-g74m0on7j8eelik9su5ia0njqf19io16.apps.googleusercontent.com&response_type=code&scope=https://www.googleapis.com/auth/gmail.send&redirect_uri=http://localhost:5000&access_type=offline';
    // axios
    //   .get('https://accounts.google.com/o/oauth2/v2/auth?client_id=72049321950-g74m0on7j8eelik9su5ia0njqf19io16.apps.googleusercontent.com&response_type=code&scope=https://www.googleapis.com/auth/gmail.send&redirect_uri=http://localhost&access_type=offline')
    //   .then((response) => {
    //     window.location(response.data)
    //   })
  }

  const getCalendars = () => {
    axios
      .get(('http://localhost:3003/calendars'))
      .then((response) => {
        console.log('calendars: ', response);
      })
  }

  const getLogout = () => {
    axios
      .get(('http://localhost:3003/logout'))
      .then((response) => {
        console.log(response);
      })
  }

  return (
    <div className="App">
      <h1 id="main-title">
        {title.map((letter) => {
          return (
            <span>{letter}</span>
          )
        })}
        </h1>
        {/* <div class="g-signin2" data-onsuccess="onSignIn"></div> */}
        <button onClick={ getProfileInfo }>Sign In</button>
        <button onClick={ getLogout }>Logout</button>
        <button onClick={ getCalendars }>Get Calendars</button>
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
            job={ job }
          site={ site }
          bList={ bList } />
      </div>
    </div>
  );
}

export default App;
