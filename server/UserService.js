const jsonDao = require('./dao/JSONDao');
const cacheDao = require('./dao/CacheDao');
const MinMaxData = require('./vo/MinMaxData');

const processUsers = function()
{
	const users = jsonDao.createRecordsByUserIdMap();
	
	const minMaxData = new MinMaxData();
	
	Object.keys(users).forEach( userId => {
		users['' + userId].generateCummulativeUserData();
		minMaxData.updateMinMaxData( users['' + userId].cummulativeUserData );
	} );
	
	const cummulateUserDataList = [];
	
	Object.keys(users).forEach( userId => {
		users['' + userId].cummulativeUserData.calculateWeightedScore( minMaxData.minData, minMaxData.maxData );
		
		cummulateUserDataList.push( users['' + userId].cummulativeUserData );
	});
	
	cacheDao.set("users", users);
	
	const topThirtyUsers = cummulateUserDataList.sort( (c1, c2) => c2.weightedScore - c1.weightedScore ).slice(0, 30);
	
	cacheDao.set("topThirtyUsers", topThirtyUsers); 
	
	const histogram = new Array(20).fill(0);
	
	cummulateUserDataList.forEach( cummulativeUserData => {
		const group = Math.floor ( (cummulativeUserData.weightedScore || 0) / 5 );
		histogram[group] += 1;
	});
	
	cacheDao.set("histogram", histogram);
}

module.exports = {
	processUsers: processUsers
};