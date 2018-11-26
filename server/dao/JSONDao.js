const fs = require('fs');
const path = require('path');
const User = require('../vo/User');

function getJsonData ()
{
	const jsonData = fs.readFileSync(path.join(__dirname, '../data/data.js'));
	
	return JSON.parse(jsonData);
}

function createRecordsByUserIdMap ()
{
	const map = {};
	
	//console.log(new User(120));
	
	getJsonData().forEach( record => {
		if ( typeof record.userId === "number" )
		{
			if ( !(map[record.userId] instanceof User) )
			{
				map[record.userId] = new User( record.userId );
			}
			
			map[record.userId].addRecord( record );
		}
	} );
	
	return map;
}

module.exports = {
	createRecordsByUserIdMap: createRecordsByUserIdMap
}