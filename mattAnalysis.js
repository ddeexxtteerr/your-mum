const d3 = require("d3");
const fs = require("fs");

const runs = d3.csvParse(fs.readFileSync(`output/allRuns_wAdds.csv`, 'utf-8'));
var parseTime = d3.timeParse("%Y-%m-%d");

var gameNest = d3.nest()
  .key(function(d){
    return d["name"]
  })
  .key(function(d){
    return d["category_name"]
  })
  .sortValues(function(a,b){
    return parseTime(a["date"]) - parseTime(b["date"]);
  })
  .entries(runs);

var runArray = [];

for (var game in gameNest){
  // console.log(gameNest[game].key);

  for (var category in gameNest[game].values){
    // console.log(gameNest[game].values[category].key);

    var categoryGameRecord = 1000000000000000000000000000000000000000000;

    for (var run in gameNest[game].values[category].values){
      var worldRecord = false;
      var runTime = gameNest[game].values[category].values[run]["time"];
      gameNest[game].values[category].values[run]["world_record"] = false;

      if(+runTime < +categoryGameRecord){
        worldRecord = true;
        categoryGameRecord = runTime;
        gameNest[game].values[category].values[run]["world_record"] = true;
      }

      if(gameNest[game].key == "The Legend of Zelda" && gameNest[game].values[category].key == "Swordless"){
        console.log(gameNest[game].values[category].values[run]["world_record"],gameNest[game].values[category].values[run]["date"],gameNest[game].values[category].values[run]["time"]);
      }
      // console.log(categoryGameRecord,runTime,gameNest[game].values[category].values[run]["world_record"],gameNest[game].values[category].values[run]["date"]);
      runArray.push(gameNest[game].values[category].values[run])
    }

  }

}

const csvData = d3.csvFormat(runArray);
fs.writeFileSync('output/runArray.csv', csvData);
