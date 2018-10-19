const d3 = require('d3');
const fs = require('fs');

const lookup = {
	om1m3625: 'SuperMarioBros',
	pd05xl1e: 'TysonPunchOut',
	'369p0g1l': 'LegendOfZelda',
	'46w22l6r': 'Pokemon',
	'9d385g1l': 'DonkeyKong64',
	ok6q991g: 'HalfLife2'
};

const runFiles = fs.readdirSync('output').filter(d => d.includes('runs'));

const runData = runFiles.map(filename => {
	const path = `output/${filename}`;
	const contents = fs.readFileSync(path, 'utf-8');
	const parsed = JSON.parse(contents);
	return parsed.data;
});

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
	emulated: d.system.emulated
}));

const csvData = d3.csvFormat(runAll);
fs.writeFileSync('output/allRuns.csv', csvData);
