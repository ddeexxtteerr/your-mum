const d3 = require("d3");
const fs = require("fs");
const _ = require("lodash");

const directoryArrayGames = fs.readdirSync("output").filter(d => d.includes("games"));
console.log(directoryArrayGames)

const loadedGames = directoryArrayGames.map(filename => {
  const path = `output/${filename}`;
  const contents = fs.readFileSync(path, 'utf-8');
	//console.log(contents)
  const json = contents.slice(1);
  return json;
})

const flatGames = [].concat(...loadedGames);

fs.writeFileSync(`output/allGames.json`, flatGames)
