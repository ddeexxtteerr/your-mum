const d3 = require('d3');
const fs = require('fs');

const categoryLookup = d3.csvParse(fs.readFileSync(`output/allcategories.csv`, 'utf-8'));
const runData = d3.csvParse(fs.readFileSync(`output/allRuns.csv`, 'utf-8'));

const addedCategories = runData.map(d => {
	const match = categoryLookup.find(c => c.id === d.category)
	return {
		...d,
		category_name: match ? match.name : null
	}
})

const csvData = d3.csvFormat(addedCategories);
fs.writeFileSync('output/allRuns_wCategories.csv', csvData);
