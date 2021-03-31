import { useState } from 'react';

const Report = ({ foundKeywords, generating, relatedSites, commonWords, job, siteLink }) => {

  return (
    <div className={ generating ? 'report' : 'hidden report'}>
      <h1>{ job }</h1>
      <h3>{ siteLink }</h3>
      <hr></hr>
      <ol className="ats-keys">
        <lh className="list-head">Top ATS Keywords</lh>
        {foundKeywords.map((word, index) => {
          return (
            <li key={ index }>{word}</li>
          )
        })}
      </ol>
      <br></br>
      <ul className="ext-links">
        <lh className="list-head">External Links</lh>
        {relatedSites.map((site, index) => {
          return (
            <li key={ index }><a href={ site } target="_blank" rel="noreferrer noopener">{site}</a></li>
          )
        })}
      </ul>

    </div>
  )
}

export default Report;