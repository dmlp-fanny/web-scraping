import express from "express";
import cors from "cors";
import { launch } from "puppeteer";


const PORT = 8080;
const app = express();

app.use(cors());

const url = "https://www.sreality.cz/hledani/prodej/byty";

app.get("/", async (req, res) => {

        const browser = await launch();
      
        const page = await browser.newPage();
      
        await page.goto(url);

        const adsArray = []

        while (adsArray.length < 40) {

            // 1. scraping whats on the page
            
            const pageScraperData = await page.evaluate(() => {

                const adCards = document.querySelectorAll(".property.ng-scope");

                return Array.from(adCards).map((ad) => {
                  const scrapedObj = {}

                  scrapedObj['id'] = ad.getAttribute('data-dot-data')
                  scrapedObj['title'] = ad.querySelector('.locality.ng-binding').innerText
                  scrapedObj['type'] = ad.querySelector('h2').innerText
                  scrapedObj['img'] = ad.querySelector('img').getAttribute('src')

                  return scrapedObj
                });
            });
            
            // 2. adding it into the array  
            adsArray.push(...pageScraperData);

            // 3. going to the next page
            const buttonNext = 'a.btn-paging-pn';
            await page.waitForSelector(buttonNext);
            await page.click(buttonNext); 
        }

        res.send(adsArray);
        console.log(adsArray);
        
        await browser.close();

});

app.listen(PORT, function () {
  console.log(`server running on PORT ${PORT}`);
});
