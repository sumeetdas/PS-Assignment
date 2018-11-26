const CummulativeUserData = require('./CummulativeUserData');

function MinMaxData ()
{
	this.minData = {
		totalMins: Number.MAX_VALUE,
		shoppingMins: Number.MAX_VALUE,
		snackingMins: Number.MAX_VALUE,
		socialisingMins: Number.MAX_VALUE,
		numSnacks: Number.MAX_VALUE,
		numPurchases: Number.MAX_VALUE
	};
	
	this.maxData = {
		totalMins: Number.MIN_VALUE,
		shoppingMins: Number.MIN_VALUE,
		snackingMins: Number.MIN_VALUE,
		socialisingMins: Number.MIN_VALUE,
		numSnacks: Number.MIN_VALUE,
		numPurchases: Number.MIN_VALUE
	};
	
	const self = this;
	
	this.updateMinMaxData = function ( cummulativeUserData ) 
	{
		if ( cummulativeUserData instanceof CummulativeUserData )
		{
			// updating min data
			self.minData.totalMins = Math.min( self.minData.totalMins, cummulativeUserData.totalMins );
			self.minData.shoppingMins = Math.min( self.minData.shoppingMins, cummulativeUserData.shoppingMins );
			self.minData.snackingMins = Math.min( self.minData.snackingMins, cummulativeUserData.snackingMins );
			self.minData.socialisingMins = Math.min( self.minData.socialisingMins, cummulativeUserData.socialisingMins );
			self.minData.numSnacks = Math.min( self.minData.numSnacks, cummulativeUserData.uniqueSnacks.size );
			self.minData.numPurchases = Math.min( self.minData.numPurchases, cummulativeUserData.uniquePurchases.size );
			
			// updating max data
			self.maxData.totalMins = Math.max( self.maxData.totalMins, cummulativeUserData.totalMins );
			self.maxData.shoppingMins = Math.max( self.maxData.shoppingMins, cummulativeUserData.shoppingMins );
			self.maxData.snackingMins = Math.max( self.maxData.snackingMins, cummulativeUserData.snackingMins );
			self.maxData.socialisingMins = Math.max( self.maxData.socialisingMins, cummulativeUserData.socialisingMins );
			self.maxData.numSnacks = Math.max( self.maxData.numSnacks, cummulativeUserData.uniqueSnacks.size );
			self.maxData.numPurchases = Math.max( self.maxData.numPurchases, cummulativeUserData.uniquePurchases.size );
		}
	}
}

module.exports = MinMaxData;