const request = require("request");
//const d3 = require("d3");
const fs = require("fs");

//https://www.speedrun.com/api/v1

function download(gameID) {
	const baseURL = `https://www.speedrun.com/api/v1/runs`
	request(baseURL, function(error, response, body) {
		if (error) {
			console.log('error', error);
		}
		else {
			//TO-DO Add in pagination so that more than 20 elements are collected
			// (https://github.com/speedruncomorg/api/blob/master/version1/pagination.md)
			//console.log(body.pagination.size);
			fs.writeFileSync(`output/runs.json`, body)
		}
	});
}

download();
