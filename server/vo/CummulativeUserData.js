const _ = require('lodash');

function CummulativeUserData ( userId )
{
	const self = this;
	
	this.userId = userId;
	this.totalMins = 0;
	this.shoppingMins = 0;
	this.snackingMins = 0;
	this.socialisingMins = 0;
	this.uniquePurchases = new Set();
	this.uniqueSnacks = new Set();
	this.numUniquePurchases = 0;
	this.numUniqueSnacks = 0;
	this.weightedScore = 0;
	
	this.processUserRecord = function ( record )
	{
		addTotalMins( record.totalMins );
		addShoppingMins( record.shoppingMins );
		addSnackingMins( record.snackingMins );
		addSocialisingMins( record.socialisingMins );
		addPurchases( record.purchases );
		addSnacks( record.snacks );
	}
	
	const addTotalMins = function ( totalMins )
	{
		if( totalMins )
		{
			self.totalMins += totalMins;
		}
	}
	
	const addShoppingMins = function ( shoppingMins )
	{
		if( shoppingMins )
		{
			self.shoppingMins += shoppingMins;
		}
	}
	
	const addSnackingMins = function ( snackingMins )
	{
		if( snackingMins )
		{
			self.snackingMins += snackingMins;
		}
	}
	
	const addSocialisingMins = function ( socialisingMins )
	{
		if ( socialisingMins )
		{
			self.socialisingMins += socialisingMins;
		}
	}
	
	const addPurchases = function ( purchaseArray )
	{
		purchaseArray.forEach( purchase => self.uniquePurchases.add( purchase ) );
		
		self.numUniquePurchases = self.uniquePurchases.size;
	}
	
	const addSnacks = function ( snackString )
	{
		if ( snackString )
		{
			snackString.split(",").forEach( snack => self.uniqueSnacks.add( snack ) );
		}
		
		self.numUniqueSnacks = self.uniqueSnacks.size;
	}
	
	this.calculateWeightedScore = function ( minUserData, maxUserData )
	{
		self.weightedScore = 
			5 * subWeightedScore(self.totalMins, minUserData.totalMins, maxUserData.totalMins) + 
			20 * subWeightedScore(self.shoppingMins, minUserData.shoppingMins, maxUserData.shoppingMins) + 
			20 * subWeightedScore(self.snackingMins, minUserData.snackingMins, maxUserData.snackingMins) +
			30 * subWeightedScore(self.socialisingMins, minUserData.socialisingMins, maxUserData.socialisingMins) +
			10 * subWeightedScore(self.uniquePurchases.size, minUserData.numPurchases, maxUserData.numPurchases) +
			15 * subWeightedScore(self.uniqueSnacks.size, minUserData.numSnacks, maxUserData.numSnacks);
			
		self.weightedScore = _.round(self.weightedScore, 3);
	}
	
	function subWeightedScore ( value, min, max )
	{
		if ( min === max )
		{
			return 1;
		}
		
		return ( value - min ) / ( max - min );
	}
}

module.exports = CummulativeUserData;