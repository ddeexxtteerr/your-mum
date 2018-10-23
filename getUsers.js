const request = require("request");
//const d3 = require("d3");
const fs = require("fs");

const baseURL = `https://www.speedrun.com/api/v1/users?_bulk=yes`
const max = 200
let offset = 0
let userData = []

//https://www.speedrun.com/api/v1

function download(offset, cb) {
	const usersURL = `${baseURL}&max=${max}&offset=${offset}`
	request(usersURL, function(error, response, body) {
		if (error) {
			console.log('error', error);
		}
		else {
			userData = JSON.parse(body)
			fs.writeFileSync(`output/users_${offset}.json`, body)
		}
		cb();
	});
}

function next() {
	download(offset, function() {
		console.log(offset, userData.pagination.size)
		offset +=max
		if (userData.pagination.size === max) {
			next();
		}
	});
}

next();
