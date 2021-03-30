const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const fs = require('fs');
const filters = require('./filterAlgos.js');

const app = express()
const port = 3003;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// need to get our filters functions into the app.post


app.post('/', (req, res) => {
  // req.body is the {site: 'url'} obj
  console.log(req.body);
  var words = (async() => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(req.body.site);

      const textContent = await page.evaluate(() => {

        var websiteFilter = (string) => {
          var match = string.toLowerCase().match(/http.*com/);
          if (match) {
            return match[0];
          }
          return null;
        }


        var capturedText = document.querySelector('body').textContent;
        capturedText = capturedText.replace(/(\r\n|\n|\r)/gm, " ");
        var filtered = capturedText.split(' ');
        var nextSites = [];
        filtered.forEach((word) => {
          if (websiteFilter(word)) {
            nextSites.push(websiteFilter(word))
          }
        })
          return {
              text: capturedText,
              sites: nextSites
            };
          })
          // await fs.appendFile(`./job-files/${req.body.job}.txt`, textContent.text, (err) => {
          //   if (err) {
          //     console.log('error: ', err);
          //   } else {
          //     console.log('Saved!');
          //   }
          // });
          // await fs.appendFile(`./job-files/${req.body.job}.sites.txt`, textContent.sites[0], (err) => {
          //   if (err) {
          //     console.log('error: ', err);
          //   } else {
          //     console.log('Saved!');
          //   }
          // });
          // res.json(textContent);

          await browser.close();

          return textContent;
        })();
        Promise.resolve(words)
        .then((value) => {
          let wordSort = {};
          value.text.split(' ').forEach((word) => {
            filters.allWordFilter(word, wordSort);
          })
          value.sorted = wordSort;
          res.json(value)
        })
})





app.listen(port, () => {
  console.log(`listening on port ${port}`);
})