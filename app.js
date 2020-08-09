const puppeteer = require('puppeteer');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question(`Give me a link of wikipedia page `, (link) => {
    const wikipediaBaseLink = 'wikipedia.org';
    const linkWithoutPrefix = link.replace(/(^(.*?)\.)/, "");
    const linkWithoutSuffix = linkWithoutPrefix.replace(/(\/(.*)$)/, "");
    const baseLink = linkWithoutSuffix;
    if (baseLink == wikipediaBaseLink){
        (async () => {
            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            await page.goto(link)

            const titleOfPage = await page.$(".firstHeading")
            const textTitle = await page.evaluate(titleOfPage => titleOfPage.textContent, titleOfPage);
            console.log(textTitle)

            const summary = await page.$(".toc");
            const textSummary = await page.evaluate(summary => summary.textContent, summary);
            console.log(textSummary)
            
            await browser.close()
        })();
    }else{
        (async () => {
            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            await page.goto("https://fr.wikipedia.org/wiki/Sp%C3%A9cial:RandomRootpage")

            console.log("Le lien indiqué n'est pas valide, voici donc le lien d'une page aléatoire")

            const titleOfPage = await page.$(".firstHeading")
            const textTitle = await page.evaluate(titleOfPage => titleOfPage.textContent, titleOfPage);
            console.log(textTitle)
            
            const summary = await page.$(".toc");
            const textSummary = await page.evaluate(summary => summary.textContent, summary);
            console.log(textSummary)

            await browser.close()
        })();
    }
    readline.close()
});
