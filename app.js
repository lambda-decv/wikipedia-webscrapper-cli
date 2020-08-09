const puppeteer = require('puppeteer');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question(`Give me a link of wikipedia page `, (link) => {
    const wikipediaLink = 'fr.wikipedia.org'.split(/[^/]*$/g)    
    readline.close()
});
(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(link)
    const element = await page.$(".toc");
    const text = await page.evaluate(element => element.textContent, element);
    console.log(text)
    await browser.close()
})();