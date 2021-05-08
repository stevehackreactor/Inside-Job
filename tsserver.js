"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const app = express();
const port = 3003;
mongoose.connect('mongodb://localhost:27017/insideJob', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error:'));
db.once('open', () => {
    // connected
});
const WListItem = mongoose.model('WListItem', whiteList);
const BListItem = mongoose.model('BListItem', blackList);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/blacklist/', (req, res) => {
    BListItem.find((err, blistitems) => {
        if (err) {
            res.sendStatus(500).send('error', err);
        }
        else {
            res.json(blistitems);
        }
    });
});
app.post('/updatewhitelist/', (req, res) => {
    for (var key in req.body.whiteListItems) {
        let word = new WListItem({ word: key });
        word.save((err) => {
            if (err) {
                return console.error(err);
            }
        });
    }
    res.send('successfully updated whitelist');
});
app.post('/updateblacklist/', (req, res) => {
    for (var key in req.body.blackListItems) {
        let word = new BListItem({ word: key });
        word.save((err) => {
            if (err) {
                return console.error(err);
            }
        });
    }
    res.send('successfully updated blacklist');
});
app.post('/wiki/', (req, res) => {
    var wikiDef = (() => __awaiter(void 0, void 0, void 0, function* () {
        const browser = yield puppeteer.launch();
        const page = yield browser.newPage();
        yield page.goto(`https://en.wikipedia.org/wiki/${req.body.site}`);
        const textContent = yield page.evaluate(() => {
            let capturedText;
            if (document && document.querySelector('#mw-content-text') && document.querySelector('#mw-content-text').textContent) {
                capturedText = document.querySelector('#mw-content-text').textContent;
            }
            capturedText = capturedText.replace(/(\r\n|\n|\r)/gm, " ");
            return {
                wikiDef: capturedText
            };
        });
        yield browser.close();
        return textContent;
    }))();
    Promise.resolve(wikiDef)
        .then((def) => {
        res.json(def);
    });
});
