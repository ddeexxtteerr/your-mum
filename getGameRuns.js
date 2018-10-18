const request = require("request");
//const d3 = require("d3");
const fs = require("fs");

//https://www.speedrun.com/api/v1
const SuperMarioBros = 'om1m3625'
const TysonPunchOut = 'pd05xl1e'
const LegendOfZelda = '369p0g1l'
const Pokemon = '46w22l6r'
const DonkeyKong64 = '9d385g1l'
const HalfLife2 = 'ok6q991g'
const gameArray = [SuperMarioBros, TysonPunchOut, LegendOfZelda, Pokemon, DonkeyKong64, HalfLife2]
const baseURL = `https://www.speedrun.com/api/v1/runs`
const max = 200
let offset = 0
let runData = []

function download(gameID, offset, cb) {
	const gameURL = `${baseURL}?game=${gameID}&max=${max}&offset=${offset}`
	request(gameURL, function(error, response, body) {
		if (error) {
			console.log('error', error);
		}
		else {
			runData = JSON.parse(body)
			console.log(runData.data)
			fs.writeFileSync(`output/runs_${gameID}_${offset}.json`, body)
		}
		cb();
	});
}

let index = 0;
let len = gameArray.length;

function moreRuns() {
	download(gameArray[index], offset, function() {
		console.log(index, offset)
		offset += 200
		console.log(index, offset)
		if (runData.pagination.size === max) {
			moreRuns();
		} else {
			index +=1
			offset = 0
			if (index < len) {
				console.log(index, offset)
				moreRuns();
			}
		}
	});
}

moreRuns();
