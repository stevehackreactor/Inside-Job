# Inside-Job: your connection to the values and technologies of a future employer

## Table of Contents

1. [In-Action](#In-Action)
2. [User-Stories](#User-Stories)
3. [Stack](#Stack)
4. [Front-End](#Front-End)
5. [Deployment](#Deployment)
6. [Work-Flow](#Work-Flow)
7. [Lessons-Learned](#Lessons-Learned)
8. [Contributors](#Contributors)
9. [Installation](#Installation)

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

- We designed our website to have a fun, primary color scheme which catches the eye and stands out from the crowd.
- We developed smooth transitions between different views and products resulting in an enjoyable, and consistent user experience. Similar to modern social media sites, we designed our site to be composed of many small, modular components.
- Whether it be buttons, reveiw ratings, or thumbnail components, re-usability was a primary focus and contributes to the scalability of Pop Shop

## Deployment

This site is currently being dockerized for deployment to an AWS EC2 instance.

## Work-Flow

## Git Workflow
![Gif showing Git History](https://thumbs.gfycat.com/GrippingLazyGannet-size_restricted.gif)

We have one main branch that branches out to staging. Our staging branch is where we merge our features until we have a batch of tested, functioning features in staging at which point we will merge staging to main.

## Lessons-Learned
This project is the result of four, ambitous software engineers all eager to create a viable product and learn from the experience. As hungry developers, we learned a lot throughout this process. Here is some of what we learned:

## Challenges
- Each of us selected new technologies to use during this project. Among them, React Hooks, Material UI, Bootstrap, and JCarousel. We gained insight on assessing new technologies prior to using them in addition to practical experience with these libraries.
- Creating the various carousels on the site led us towards the JCarousel library which is a JQuery plug-in. Unfortunately, the use of JQuery caused some longer load times than we wanted on our site. Currently we are writing our own carousel library in order to avoid having to use JQuery as a library.
- Whilst working on this project, we used CSS for styling beyond standard Bootstrap and Material UI styles. Although we adhered to our agreed upon naming conventions for components and styles related to those components, we did end up running into some styling collisions. To fix this, we plan on using individual stylesheets for each component. Alternatively, we could use Tailwind.

## Learnings
- The importance of start-of-project planning was very apparent by day 3 of this project when our file structure began to gain complexity. Naming, file structure, and library use conventions had not been a part of our initial planning portion of this project.  It will definitely be a big part of the day 1 planning process for each of us from now on.
- Time-Boxing became more and more important as we began to travel into uncharted territory. Being unable to decisively predict the time to implement some feature created speedbumps in our development process.
- After reflecting on this, our team decided to make hard cutoffs for certain functionality/features that were not a part of the core functionality of the site in order to keep us on track for our deadline.

## Potential Improvements
- Make this page a multi-page site using React Router. Enabling the user to navigate between products via the back and forward buttons on their browser.
- Create a log in functionality.
- Store user's cart information in a visually available location
- Improve accessibility of the page by following accessibility guidelines in lighthouse
- Continue to build out unit tests, end-to-end testing, and CCID testing.

## Contributors

[Steve Gackstetter](https://github.com/stevehackreactor)