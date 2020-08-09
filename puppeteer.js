const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://fr.wikipedia.org/wiki/Sp%C3%A9cial:RandomRootpage')
    const element = await page.$(".toc");
    const text = await page.evaluate(element => element.textContent, element);
    console.log(text)
    await browser.close()
  })();