const d3 = require("d3");
const fs = require("fs");
const _ = require("lodash");

const directoryArrayRuns = fs.readdirSync("output").filter(d => d.includes("runs"));

const loadedRuns = directoryArrayRuns.map(filename => {
  const path = `output/${filename}`;
  const contents = fs.readFileSync(path, 'utf-8');
  const json = contents.slice(1);
  return json;
})

const flatRuns = [].concat(...loadedRuns);

fs.writeFileSync(`output/allRuns.json`, flatRuns)
