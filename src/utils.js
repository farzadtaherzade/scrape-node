import { mkConfig, generateCsv, asString } from "export-to-csv";
import { writeFile } from "node:fs";
import { Buffer } from "node:buffer";

const csvConfig = mkConfig({
  useKeysAsHeaders: true,
  columnHeaders: ["title", "description", "date", "category", "url"],
});

export const save_to_csv = async (data) => {
  console.log("start save into csv");
  const csv = generateCsv(csvConfig)(data);
  const filename = "data.csv";
  const csvBuffer = new Uint8Array(Buffer.from(asString(csv)));

  writeFile(filename, csvBuffer, (err) => {
    if (err) throw err;
    console.log("file saved: ", filename);
  });
  console.log("...Done");
};

export const print = (data = []) => {
  // data.forEach((item) => {
  //   Object.entries(item).forEach(([value, key], index) => {
  //     console.log(`${value}, ${key}`);
  //   });
  // });
  data.forEach((value) => {
    console.table(value);
  });
};

print();
