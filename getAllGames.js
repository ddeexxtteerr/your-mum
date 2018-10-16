const request = require("request");
//const d3 = require("d3");
const fs = require("fs");

const baseURL = `https://www.speedrun.com/api/v1/games?_bulk=yes`
const max = 1000
let offset = 0
let runData = []

//https://www.speedrun.com/api/v1

function download(offset, cb) {
	const gamesURL = `${baseURL}&max=${max}&offset=${offset}`
	request(gamesURL, function(error, response, body) {
		if (error) {
			console.log('error', error);
		}
		else {
			runData = JSON.parse(body)
			fs.writeFileSync(`output/games_${offset}.json`, body)
		}
		cb();
	});
}

function next() {
	download(offset, function() {
		console.log(offset, runData.pagination.size)
		offset +=1000
		if (runData.pagination.size === max) {
			next();
		}
	});
}

next();
