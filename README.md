# web-scraper

## Note
- If after running the script and the browser doesn't scroll to the bottom (it will take like 10s os scrolling) then just re-run the server
- After the script reaches the bottom of the browser, it will take a few seconds to display the JSON array in the terminal (estimated time of 3 seconds)

>> To run: `npm run dev`

## Solution Explanation:

The web application is dynamic and also loades data lazingly, so we have to scroll the entire view to make it fetch all the data, that's why while we open the Puppeteer browser, we need to scroll down to the bottom of the page so that we can read the entire html and not just the one we get at the initial render.
