const d3 = require('d3');
const fs = require('fs');

const categoryLookup = d3.csvParse(fs.readFileSync(`output/allcategories.csv`, 'utf-8'));
const usersLookup = d3.csvParse(fs.readFileSync(`output/allusers.csv`, 'utf-8'));
const runData = d3.csvParse(fs.readFileSync(`output/allRuns.csv`, 'utf-8'));

const addedData = runData.map(d => {
	const match = categoryLookup.find(c => c.id === d.category)
	return {
		...d,
		category_name: match ? match.name : null
	}
}).map(d => {
	const match = usersLookup.find(c => c.id === d.player)
	return {
		...d,
		player_name: match ? match.player_name : null
	}
})

const csvData = d3.csvFormat(addedData);
fs.writeFileSync('output/allRuns_wAdds.csv', csvData);
