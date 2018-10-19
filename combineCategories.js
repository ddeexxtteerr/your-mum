const d3 = require('d3');
const fs = require('fs');

const categoryFiles = fs.readdirSync('output').filter(d => d.includes('categories_'));

const categoryData = categoryFiles.map(filename => {
	const path = `output/${filename}`;
	const contents = fs.readFileSync(path, 'utf-8');
	const parsed = JSON.parse(contents);
	return parsed.data;
});

const categoryAll = [].concat(...categoryData).map(d => ({
	id: d.id,
	name: d.name
}));

console.log(categoryAll)
const csvData = d3.csvFormat(categoryAll);
fs.writeFileSync('output/allCategories.csv', csvData);
