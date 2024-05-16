const puppeteer = require("puppeteer");
const { program, Option } = require("commander");
program.version("0.0.1");

const do_vigiato = async (browser, query) => {
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);

  await page.goto("https://vigiato.net/");
};
const websites = {
  vigiato: do_vigiato,
};
const choices = ["vigiato", "medium", "ign"];

program
  .addOption(
    new Option("-n, --name <name>", "website for query")
      .choices(choices)
      .default("vigiato")
  )
  .addOption(
    new Option("-r, --record <length>", "how many record to return")
      .preset("10")
      .argParser(parseInt)
  )
  .addOption(
    new Option("-q, --query <query>", "query search").makeOptionMandatory(true)
  )
  .addOption(new Option("-d, --debug", "output extra debugging"));

program.parse(process.argv);

const options = program.opts();
if (options.debug) console.log(options);

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await websites[options.name](browser);
  } catch (error) {
    console.log(error);
  } finally {
    await browser.close();
  }
})();
