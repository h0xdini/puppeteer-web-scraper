const puppeteer = require('puppeteer');
const cheerio = require('cheerio')

console.log('[+] Welcome to 0xhexa Web Scraper [+]')

async function scrollToBottom(page){
  await page.evaluate(async () => {
      await new Promise((resolve) => {
          var totalHeight = 0;
          var distance = 100;
          var timer = setInterval(() => {
              var scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;

              if(totalHeight >= scrollHeight - window.innerHeight){
                  clearInterval(timer);
                  resolve();
              }
          }, 100);
      });
  });
}

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });

    const page = await browser.newPage();

    await page.authenticate({username: 'gdg_algiers', password: 'devfest2022'})

    await page.goto('https://devfest22-recipes-heaven.gdgalgiers.com/');
    
    await page.setViewport({
        width: 1200,
        height: 800
    });

    await scrollToBottom(page);

    const data = await page.content()
    
    const $ = cheerio.load(data)
    // console.log(data);

    let id = 1

    const recipes = []

    $('.LazyLoad', data).each(function() {
      const thumbnail_url = $(this).find('img').attr('src')
      const keywords = $(this).find('h3').text()
      const name = $(this).find('h2').text()
      const description = $(this).find('p').text()
      const slug = $(this).find('.js-recipe-container').find('div').attr('data-url').split('/')[2]
      const info = $(this).find('.js-recipe-container').find('div').find('div.flex').text()
      const infoo = []
      const spans = $(this).find('.js-recipe-container').find('div').find('div.flex span').each(function() {
          infoo.push($(this).text())
      })
      const cook_time = infoo[0].replace('m', '')
      const score = infoo[1]
      const ratings_positive = infoo[2]
      const ratings_negative = infoo[3]
      
      recipes.push({
        id,
        name,
        slug,
        keywords,
        description,
        thumbnail_url,
        cook_time,
        ratings_positive,
        ratings_negative,
        score,
      })

      id++
    })

    await page.screenshot({
        path: 'screenshot.png',
        fullPage: true
    });

    console.log(recipes)

    await browser.close();
})();