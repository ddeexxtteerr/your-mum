# Speedrun data

Collects data in video game speedruns from [Speedrun.com](https://www.speedrun.com/) using the [Speedrun API](https://github.com/speedruncomorg/api/tree/master/version1)

## Setup

#### Dependencies

- [node](https://nodejs.org/en/)

#### Install

Clone the repo and run `npm i`

## Reproduce

#### `npm run getAllGames`

Download game names into paginated JSON files

#### `npm run combineAllGames`

Combine games into single JSON file

#### `npm run getGameRuns`

Download runs from Super Mario Bros., Mike Tyson Punch Out, Pokemon Red/Blue, Donkey Kong 64, Half-Life 2, and The Legend of Zelda as separate paginated JSON files

#### `npm run combineGameRuns`

Combine game runs into a single csv file. Creates separate category csv file for lookup.

#### `npm run getCategories`

Download category data into paginated JSON files

#### `npm run combineCategories`

Combine categories into single csv file

#### `npm run addCategories`

Adds category names with lookups to run data 
