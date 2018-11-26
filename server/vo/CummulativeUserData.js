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
	this.weightedScore = 0;
	
	this.processUserRecord = function ( record )
	{
		addTotalMins( record.totalMins );
		addShoppingMins( record.shoppingMins );
		addSnackingMins( record.snackingMins );
		addSocialisingMins( record.socialisingMins );
		addPurchase( record.purchases );
		addSnack( record.snacks );
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
	
	const addPurchase = function ( purchaseArray )
	{
		purchaseArray.forEach( purchase => self.uniquePurchases.add( purchase ) );
	}
	
	const addSnack = function ( snackString )
	{
		if ( snackString )
		{
			snackString.split(",").forEach( snack => self.uniqueSnacks.add( snack ) );
		}
	}
	
	this.calculateWeightedScore = function ( minUserData, maxUserData )
	{
		if ( minUserData instanceof CummulativeUserData && maxUserData instanceof CummulativeUserData )
		{
			self.weightedScore = 
			5 * weightedScore(self.totalMins, minUserData.totalMins, maxUserData.totalMins) + 
			20 * weightedScore(self.shoppingMins, minUserData.shoppingMins, maxUserData.shoppingMins) + 
			20 * weightedScore(self.snackingMins, minUserData.snackingMins, maxUserData.snackingMins) +
			30 * weightedScore(self.socialisingMins, minUserData.socialisingMins, maxUserData.socialisingMins) +
			10 * weightedScore(self.uniquePurchases.size(), minUserData.uniquePurchases.size(), maxUserData.uniquePurchases.size()) +
			15 * weightedScore(self.uniqueSnacks.size(), minUserData.uniqueSnacks.size(), maxUserData.uniqueSnacks.size());
		}
	}
	
	function weightedScore ( value, min, max )
	{
		return ( value - min ) / ( max - min );
	}
}

module.exports = CummulativeUserData;