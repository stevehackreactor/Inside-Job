# Inside-Job: your connection to the values and technologies of a future employer

## Table of Contents

1. [In-Action](#In-Action)
2. [User-Stories](#User-Stories)
3. [Stack](#Stack)
4. [Front-End](#Front-End)
5. [Back-End](#Back-End)
6. [Deployment](#Deployment)
7. [Work-Flow](#Work-Flow)
8. [Lessons-Learned](#Lessons-Learned)
9. [Contributors](#Contributors)


## In-Action

![Demo of Inside Job]()

## User-Stories
Here are some of the User Stories I used for direction on this project:

## Implemented
- As a user, I want to know what values a company has and what tech stack they talk about the most.
- As a user, I want to quickly gather information about a potential employer.
- As a user, I want to see the links to external sites if those sites would be useful to review (Twitter, Linkedin, Facebook).
- As a user, I don't want to have information from other domains poluting the information that I am presented.
- As a user, I want to be presented a straight forward report of the the information Inside-Job gets.
- As a user, if I am not familiar with a tech or personality trait definition, I want to be able to look it up without leaving the app.
- As a user, I want to be able save a version of the report for future reference.
- As a user, I want some sort of visual indicator that the scraping, crawling, and analyzing is happening (if possible, distinct indicators).
- As a user, I want to be able to define custom words/techs to ignore/include in my report.

## Coming Soon
- As a user, I would like some sort of high level analysis of the data resulting in a description of the tone, formality, and verboseness which is typical for the company.
- As a user, I would like to save reports from a particular domain so I can look the same report up more quickly subsequent times.
- As a user, I want to be able to access this site from the web without downloading the repo.
- As a user, I would like to have subsequent crawling requests to remove the previous report and run a fresh report.
- As a user, I would like the option to have a dark mode.

## Stack

<table>
  <tr>
    <td>Languages</td>
    <td><img alt="JavaScript" src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
    <img alt="NodeJS" src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/>
    <img alt="HTML5" src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/>
    <img alt="CSS3" src="https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/></td>
  </tr>
  <tr>
    <td>Frameworks & Libraries</td>
    <td><img alt="React" src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
    <img alt="Express.js" src="https://img.shields.io/badge/express.js%20-%23404d59.svg?&style=for-the-badge"/></td>
  </tr>
  <tr>
    <td>APIs</td>
    <td><img alt="Puppeteer" src="https://img.shields.io/badge/-Puppeteer-%2340B5A4?&style=for-the-badge&logo=puppeteer&logoColor=%2361DAFB"/>
  </tr>
  <tr>
    <td>Databases</td>
    <td><img alt="MongoDB" src="https://img.shields.io/badge/-MongoDB-%2347A248?&style=for-the-badge&logo=MongoDB&logoColor=white"/></td>
  </tr>
  <tr>
    <td>Testing</td>
    <td><img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-%233178C6?&style=for-the-badge&logo=TypeScript&logoColor=white"/></td>
  </tr>
</table>

## Front-End

- Since the primary visual feature of this Web App is the report generated after running the crawler/scraper, I wanted a visually simple UI. Reports are generally written black on white and this is what I stuck to.
- I also took a Brand-Forward approach to the landing experience. This presents well on searches and thumbnails.
- Several simple React components and minimal CSS styling was used.

## Back-End

- The back end was build in a Nodejs environment using Express
- Puppeteer ran on the server-side for all headless browsing
- All filtering algorithms were also performed server side to reduce the burden on the client
- MongoDB was selected as the DB. The size and number of fields of each report varied greatly which is why I believe a non-relational db was a better fit for storage of information.


## Deployment

This site is currently being rewritten in Typescript prior to deployment. Plans for deployment are to use Heroku or an EC2 instance on AWS.

## Work-Flow

## Git Workflow
![Gif showing Git History](https://thumbs.gfycat.com/GrippingLazyGannet-size_restricted.gif)

This project was built in one day by just myself. There are two branches, the main and a Typescript branch where I am working on rewriting the app in Typescipt.

## Lessons-Learned
This project is the result of a fun idea and almost no planning and thrown together in 24 hours. Needless to say, there are many things I learned and plan on changin for future iterations of this project. Here is some of what we learned:

## Challenges
- This was my first project using Headless browsing. Initially, I attempted to use a library called cheerio. This library is able to perform headless browsing to websites and from there I was able to scrape the info I was interested in. Except, cheerio did not allow me to interact with dynamically loaded content whatsoever. So, for almost all sites, I was left with almost nothing except the most basic static information. Not at all what I wanted.
- While trying to create a PDF download option for the user, I struggled to get the PDF correctly rendered in the print window. The particular PDF printing library I was using also had very little support.
- Runtime, writing algorithms to filter huge amounts of language and hrefs for specific combinations of words or domains takes time. Lots of time.

## Learnings
- After deciding Cheerio was not the way to get the information I wanted from websites, I looked into Puppeteer. Puppeteer allows for headless browsing of dynamically loaded content. Bingo! Just what I wanted.
- Although I didn't have time in my initial window of opportunity, I would like to switch from using htmltopdf to using Puppeteer's PDF creation API. I believe it will allow me to more accurately capture the portion of the generated report that I am interested in.
- Writing Dynamic Programming versions of the filtering algorithms are one way to save significant amounts of time when it comes to scraping and presenting information.

## Potential Improvements
- Rewrite file in TS
- Memoize requests as these operations are expensive and storing the reports in a DB would be simple and take up minimal space
- Add a dark mode
- Running subsequent requests should clear out the data from the previous request
- Allow users to sign in and view all the reports they recently ran

## Contributors

[Steve Gackstetter](https://github.com/stevehackreactor)