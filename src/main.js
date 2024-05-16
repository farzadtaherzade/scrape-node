import puppeteer from "puppeteer";
import { Option, program } from "commander";
import { do_vigiato } from "./scrape.js";
import { print, save_to_csv } from "./utils.js";

program.version("0.0.1");
let data;

const websites = {
  vigiato: scrapeVigiato,
};
const choices = ["vigiato" /* "medium" */ /* "ign" */, ,];
const exportOption = ["mongodb", "csv", "console"];

program
  .addOption(
    new Option("-n, --name <name>", "website for query")
      .choices(choices)
      .default("vigiato")
  )
  .addOption(
    new Option("-e, --export <method>", "how to export the data")
      .choices(exportOption)
      .default("console")
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

const main = async () => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: false });

    data = await websites[options.name](browser, options.query);

    if (options.export == "csv") {
      await save_to_csv(data);
    } else if (options.export == "mongodb") {
      // save to mongodb database
    } else {
      // print the data in terminal
      print(data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    await browser.close();
  }
};

main();
