const d3 = require("d3");
const fs = require("fs");
const _ = require("lodash");

const directoryArrayRuns = fs.readdirSync("output").filter(d => d.includes("runs"));

const loadedRuns = directoryArrayRuns.map((filename, i) => {
  //console.log(i, directoryArrayRuns.length)
  const path = `output/${filename}`;
  const contents = fs.readFileSync(path, 'utf-8');
  const parsed = JSON.parse(contents)
  return parsed;
})

//console.log(loadedRuns)
//Currently loadedRuns contains several objects that all start the "data". Those objects need to be merged into one object.

const totalRuns = loadedRuns.map((d, i) => {
  //console.log(i, loadedRuns.length)
  return {
    id: d.data[i].id,
    weblink: d.data[i].weblink,
    game: d.data[i].game,
    category: d.data[i].category,
    comment: d.data[i].comment,
    date: d.data[i].date,
    time: d.data[i].times.primary_t,
    player: d.data[i].players[0].id,
    status: d.data[i].status.status,
    system: d.data[i].system.platform,
    emulated: d.data[i].system.emulated
  }
})

const csvData = d3.csvFormat(totalRuns)
fs.writeFileSync(`output/allRuns.csv`, csvData)
