import { useState } from 'react';
import html2canvas from 'html2canvas'
import jsPdf from 'jspdf'

const axios = require('axios');


const Report = ({ foundKeywords, generating, relatedSites, commonWords, job, siteLink, parsedWords, bList }) => {

  const [def, setDef] = useState('');

  let filteredSites = relatedSites.filter(site => site !== null);
  let linkedIn = filteredSites.filter(site => site.includes('linkedin'));
  let twitter = filteredSites.filter(site => site.includes('twitter'));
  let facebook = filteredSites.filter(site => site.includes('facebook'));
  let otherSites = filteredSites.filter(site => linkedIn.indexOf(site) === -1 && twitter.indexOf(site) === -1 && facebook.indexOf(site) === -1);

  let date = JSON.stringify(new Date());
  date = date.slice(1, -1);
  if (job === '') {
    job = `Some Job ${ date }`;
  }

  let buttonTuples = [];

  for (var key in parsedWords) {
    if (key !== '' && !bList[key]) {
      buttonTuples.push([key, parsedWords[key]]);
    }
  }

  buttonTuples.sort((a, b) => {
    return b[1] - a[1];
  })
  let firstTenWords = buttonTuples.slice(0, 10);

  const generatePDF = () => {
    const element = document.getElementById('pdf');
    html2canvas(element, { onclone: (document) => {
    }})
    .then((canvas) => {
        const img = canvas.toDataURL('image/png', 0.3)
        const pdf = new jsPdf('l', 'mm', 'a4')
        pdf.addImage(img, 'JPEG', 10, 10, 130, 150)
        pdf.save(`${job}.pdf`)
  })}

  const definition = (e) => {
    console.log(e.target.innerText);
    axios
      .post('http://localhost:3003/wiki', {
        site: e.target.innerText
      })
      .then((response) => {
        console.log(response.data.wikiDef.trim());
        setDef(response.data.wikiDef.trim());
      })
  }


  return (
    <div className={ generating ? 'report' : 'hidden report'}>
      <div id='wiki' className={def === '' ? 'hidden' : ''}>
        {def}
      </div>
      <div id='pdf'>
        <h1>{ job }</h1>
        <h3>{ siteLink }</h3>
        <hr></hr>
      <div className="left-side">
        <ol className="ats-keys">
          <lh className="list-head">Top ATS Keywords</lh>
          <hr></hr>
          {foundKeywords.map((word, index) => {
            return (
              <li key={ index } onClick={ definition }>{word}</li>
            )
          })}
          <lh className="list-head">Top Ten Other Words</lh>
          <hr></hr>
          {firstTenWords.map((word, index) => {
            return (
              <li key={ index }>{word[0]} => {word[1]} occurrences</li>
            )
          })}
        </ol>
      </div>
      <div className="right-side">
        <ul className="ext-links">
          <lh className="list-head">LinkedIn Links</lh>
          <hr></hr>
          {linkedIn.map((site, index) => {
            return (
              <li key={ index }><a href={ site } target="_blank" rel="noreferrer noopener">{site}</a></li>
            )
          })}
          <lh className="list-head">Twitter Links</lh>
          <hr></hr>
          {twitter.map((site, index) => {
            return (
              <li key={ index }><a href={ site } target="_blank" rel="noreferrer noopener">{site}</a></li>
            )
          })}
          <lh className="list-head">Facebook Links</lh>
          <hr></hr>
          {facebook.map((site, index) => {
            return (
              <li key={ index }><a href={ site } target="_blank" rel="noreferrer noopener">{site}</a></li>
            )
          })}
          <lh className="list-head">External Links</lh>
          <hr></hr>
          {otherSites.map((site, index) => {
            return (
              <li key={ index }><a href={ site } target="_blank" rel="noreferrer noopener">{site}</a></li>
            )
          })}
        </ul>
      </div>
      <div>
        <span>Report Generated on { date }</span>
      </div>
      <button onClick={ generatePDF } id="pdf-button">Download as PDF</button>
      </div>
    </div>
  )
}

export default Report;