const Record = require('./Record');
const CummulativeUserData = require('./CummulativeUserData');

function User ( userId )
{
	this.userId = userId;
	
	this.records = [];
	
	const self = this;
	
	this.addRecord = function ( record )
	{
		self.records.push( new Record( record ) );
	}
	
	this.cummulativeUserData = new CummulativeUserData( userId );
	
	this.generateCummulativeUserData = function ()
	{
		self.records.forEach( record => self.cummulativeUserData.processUserRecord( record ) );
	}
}

module.exports = User;