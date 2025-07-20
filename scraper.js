const { chromium } = require('playwright');

const seeds = Array.from({ length: 10 }, (_, i) => 6 + i);

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  let totalSum = 0;

  for (const seed of seeds) {
    const url = `https://exam.sanand.workers.dev/seed/${seed}`;
    await page.goto(url);
    const pageSum = await page.$$eval("table", tables =>
      tables.map(table =>
        Array.from(table.querySelectorAll("td"))
          .map(td => parseFloat(td.textContent.trim()))
          .filter(n => !isNaN(n))
          .reduce((a, b) => a + b, 0)
      ).reduce((a, b) => a + b, 0)
    );
    totalSum += pageSum;
  }

  console.log(`TOTAL_SUM=${totalSum}`);
  await browser.close();
})();
