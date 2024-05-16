export const scrapeVigiato = async (browser, query) => {
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  await page.goto(
    `https://vigiato.net/?s=${query}&category=news-reports%2Cbest-of&order=desc`
  );

  const articles = await page.evaluate(() => {
    const elems = document.querySelectorAll(".rowCard");
    const articles = [];
    for (const elem of elems) {
      const title = elem.querySelector(".rowCard__title").textContent;
      const url = elem.querySelector(".rowCard__title").href;
      const desc = elem.querySelector(".rowCard__description").textContent;
      const category = elem.querySelector(".rowCard__category").textContent;
      const date = elem.querySelector(".rowCard__date").textContent;
      articles.push({
        title,
        desc,
        category,
        date,
        url,
      });
    }
    return articles;
  });
  return articles;
};
