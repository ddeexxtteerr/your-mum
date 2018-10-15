const request = require("request");
//const d3 = require("d3");
const fs = require("fs");

//https://www.speedrun.com/api/v1
const SuperMarioBros = 'smb1'
const TysonPunchOut = 'mtpo'
const LegendOfZelda = 'The_Legend_of_Zelda'
const Pokemon = 'pkmnredblue'
const DonkeyKong64 = 'dk64'
const HalfLife2 = 'hl2'
const gameArray = [SuperMarioBros, TysonPunchOut, LegendOfZelda, Pokemon, DonkeyKong64, HalfLife2]

function download(gameID, cb) {
	const baseURL = `https://www.speedrun.com/api/v1/runs`
	const gameURL = `${baseURL}?game=${gameID}`
	request(baseURL, function(error, response, body) {
		if (error) {
			console.log('error', error);
		}
		else {
			//TO-DO Add in pagination so that more than 20 elements are collected
			// (https://github.com/speedruncomorg/api/blob/master/version1/pagination.md)
			//console.log(body.pagination.size);
			fs.writeFileSync(`output/runs_${gameID}.json`, body)
		}
		cb();
	});
}

let index = 0;
let len = gameArray.length;

function next() {
	download(gameArray[index], function() {
		console.log(index)
		index +=1
		if (index < len) {
			next();
		}
	});
}

next();
