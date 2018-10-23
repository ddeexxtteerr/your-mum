const d3 = require('d3');
const fs = require('fs');
const _ = require("lodash");

const lookup = {
	om1m3625: "Super Mario Bros.",
	pd05xl1e: "Mike Tyson's Punch-Out!!",
	'369p0g1l': "The Legend of Zelda",
	'46w22l6r': "Pokémon Red/Blue",
	'9d385g1l': "Donkey Kong 64",
	ok6q991g: "Half-Life 2"
};

const runFiles = fs.readdirSync('output').filter(d => d.includes('runs'));

const runData = runFiles.map(filename => {
	const path = `output/${filename}`;
	const contents = fs.readFileSync(path, 'utf-8');
	const parsed = JSON.parse(contents);
	return parsed.data;
});

//Creates full data
const runAll = [].concat(...runData).map(d => ({
	id: d.id,
	weblink: d.weblink,
	game: d.game,
	name: lookup[d.game],
	category: d.category,
	comment: d.comment,
	date: d.date,
	time: d.times.primary_t,
	player: d.players[0].id,
	status: d.status.status,
	system: d.system.platform,
	emulated: d.system.emulated,
	splits: splits(d.splits)
}));

function splits(input) {
	if (input !== null) {
		return input.uri
	}
}

const csvData = d3.csvFormat(runAll);
fs.writeFileSync('output/allRuns.csv', csvData);

//Creates seperate file for category lookup
const categoriesAll = [].concat(...runData).map(d => ({
	category: d.category,
}));

const uniqCategories = (_.uniqBy(categoriesAll, 'category'))
const csvCategories = d3.csvFormat(uniqCategories);
fs.writeFileSync('output/categories.csv', csvCategories);
