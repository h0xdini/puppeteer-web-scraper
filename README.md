# web-scraper

>> To run: `npm run dev`

## Solution Explanation:

The web application is dynamic and also loades data lazingly, so we have to scroll the entire view to make it fetch all the data, that's why while we open the Puppeteer browser, we need to scroll down to the bottom of the page so that we can read the entire html and not just the one we get at the initial render.
