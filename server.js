const express = require('express');
const path = require('path');
const puppeteer = require('puppeteer');

const app = express()
const port = 3003;

app.post('/', (req, res) => {
  (async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(site);

    const dimensions = await page.evaluate(() => {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        deviceScaleFactor: window.devicePixelRatio,
      };
    })
    res.send('Dimensions: ', dimensions);

    await browser.close();

  })();
})





app.listen(port, () => {
  console.log(`listening on port ${port}`);
})