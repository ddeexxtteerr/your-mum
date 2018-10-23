const request = require("request");
const d3 = require("d3");
const fs = require("fs");

const baseURL = `https://www.speedrun.com/api/v1/categories/`
let categoryData = []

//https://www.speedrun.com/api/v1

const categories = d3.csvParse(fs.readFileSync(`output/categories.csv`, 'utf-8'));
console.log(categories)

function download(categoryID, cb) {
	const gamesURL = `${baseURL}${categoryID}`
	request(gamesURL, function(error, response, body) {
		if (error) {
			console.log('error', error);
		}
		else {
			categoryData = JSON.parse(body)
			fs.writeFileSync(`output/categories_${categoryID}.json`, body)
		}
		cb();
	});
}

let index = 0;
let len = categories.length;

function next() {
  download(categories[index].category, function() {
    console.log(categories[index].category);
    index += 1;
    if (index < len) {
      next();
    }
  });
}

next();
