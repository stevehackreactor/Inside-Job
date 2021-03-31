const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const fs = require('fs');
const filters = require('./filterAlgos.js');
const mongoose = require('mongoose');
const keyWords = require('./assets/atsKeywords.js');

const whiteList = require('./schemas/whitelist.js');
const blackList = require('./schemas/blacklist.js');


const app = express()
const port = 3003;

mongoose.connect('mongodb://localhost:27017/insideJob', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error:'));
db.once('open', () => {
  // connected
})

const WListItem = mongoose.model('WListItem', whiteList);
const BListItem = mongoose.model('BListItem', blackList);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/blacklist/', (req, res) => {
  BListItem.find((err, blistitems) => {
    if (err) {
      res.sendStatus(500).send('error', err);
    } else {
      res.json(blistitems);
    }
  })
})

app.post('/updatewhitelist/', (req, res) => {
  console.log(req.body)
  for (var key in req.body.whiteListItems) {
    let word = new WListItem({ word: key});
    word.save((err) => {
      if (err) {
        return console.error(err)
      }
    })
  }
  // for each item, create a new WListItem and save it to the db
  res.send('successfully updated');
})

app.post('/updateblacklist/', (req, res) => {
  console.log(req.body)
  for (var key in req.body.blackListItems) {
    let word = new BListItem({ word: key});
    word.save((err) => {
      if (err) {
        return console.error(err)
      }
    })
  }
  // for each item, create a new WListItem and save it to the db
  res.send('successfully updated');
})

// keyWords.ATSKeywords = keyWords.ATSKeywords.bind(keyWords);

app.post('/', (req, res) => {
  var words = (async() => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(req.body.site);

      const urlContent = await page.$$eval('a', (array) => {
        return array.map((el) => {
          return el.href;
        });
      })

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

          return [textContent, urlContent];
        })();
        Promise.resolve(words)
        .then((value) => {
          let foundKeywords = [];
          keyWords.ATSKeywords.forEach((keyword) => {
            if (value[0].text.indexOf(keyword) > -1) {
              foundKeywords.push(keyword);
            }
          })

          let wordSort = {};
          value[0].text.split(' ').forEach((word) => {
            filters.allWordFilter(word, wordSort);
          })

          value[0].foundKeywords = foundKeywords;
          value[0].sorted = wordSort;
          value[0].hrefs = value[1];
          res.json(value[0])
        })
})





app.listen(port, () => {
  console.log(`listening on port ${port}`);
})