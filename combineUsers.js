const d3 = require('d3');
const fs = require('fs');

const usersFiles = fs.readdirSync('output').filter(d => d.includes('users_'));

const usersData = usersFiles.map(filename => {
	const path = `output/${filename}`;
	const contents = fs.readFileSync(path, 'utf-8');
	const parsed = JSON.parse(contents);
	return parsed.data;
});

const usersAll = [].concat(...usersData).map(d => ({
	id: d.id,
	player_name: d.names.international
}));

console.log(usersAll)
const csvData = d3.csvFormat(usersAll);
fs.writeFileSync('output/allUsers.csv', csvData);
