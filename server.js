const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const axios = require('axios');
const filters = require('./filterAlgos.js');
const mongoose = require('mongoose');
const keyWords = require('./assets/atsKeywords.js');

const whiteList = require('./schemas/whitelist.js');
const blackList = require('./schemas/blacklist.js');

const passport = require('passport');
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser');

require('./passport.setup.js');


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

// Create custom middleware and add this middleware to all authenticated routes
const isLoggedIn = (req, res, next) => {
	if (req.session && req.session.passport && req.session.passport.user) {
		next();
	} else {
		res.sendStatus(401);
	}
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

// ======================Google Oauth2.0+++++++++++++++++++++++++++++++
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieSession({
  name: 'blueberry-session',
  keys: ['key1', 'key2']
}))
// ======================Google Oauth2.0+++++++++++++++++++++++++++++++

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
  res.send('successfully updated');
})

app.post('/wiki/', (req, res) => {
  var wikiDef = (async() => {
    console.log(req.body.site);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://en.wikipedia.org/wiki/${req.body.site}`);

    const textContent = await page.evaluate(() => {

      var capturedText = document.querySelector('#mw-content-text').textContent;

      capturedText = capturedText.replace(/(\r\n|\n|\r)/gm, " ");
        return {
            wikiDef: capturedText
          };
        })
        await browser.close();

        return textContent;
      })();
      Promise.resolve(wikiDef)
        .then((def) => {
          res.json(def);
        })
})

app.get('/calendars', (req, res) => {
  axios
    .get('https://www.googleapis.com/calendar/v3/users/me/calendarList')
    .then((response) => {
      console.log(response);
      res.send(response);
    })
})

// ======================Google Oauth2.0+++++++++++++++++++++++++++++++
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email', 'openid', 'https://www.googleapis.com/auth/calendar.events', 'https://www.googleapis.com/auth/calendar.events.readonly', 'https://www.googleapis.com/auth/calendar.readonly'] })); // here we would add all the scopes we are looking to gain access too. See docs for further information.

app.get('/failed', (req, res) => {
  res.send('failed to login');
})

app.get('/success', isLoggedIn, (req, res) => {
  console.log('blueberry session: ', req.session.passport.user);

  res.send(`successful login: ${req.session}`);
})

app.get('/auth/google/callback',
passport.authenticate('google', { failureRedirect: '/failed' }), function(req, res) {
  // Successful authentication, redirect home.
  // console.log('inauth callback', req.query)
  console.log('req.user: ', req.user)
  res.session = req.user;
  res.redirect('/success');
});

app.get('/logout', (req, res) => {
	req.session = null;
	req.logout();
	res.send('you are now logged out');
})
// ======================Google Oauth2.0+++++++++++++++++++++++++++++++

app.post('/', (req, res) => {
  var words = (async() => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(req.body.site);

      const urlContent = await page.$$eval('a', (array) => {
        return array.map((el) => {
          let suffix = el.href.slice(-3);
          let ignore = ['img', 'png', 'svg', 'mp3', 'mp4', 'zip'];
          if (ignore.indexOf(suffix) === -1) {
            return el.href;
          }
          return null;
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