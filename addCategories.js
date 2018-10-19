const d3 = require('d3');
const fs = require('fs');

const categoryLookup = d3.csvParse(fs.readFileSync(`output/allcategories.csv`, 'utf-8'));
const runData = d3.csvParse(fs.readFileSync(`output/allRuns.csv`, 'utf-8'));

console.log(categoryLookup)

const addedCategories = runData.map(d => ({
	...d,
	category_name: categoryLookup[d.category],
}));

console.log(addedCategories)
