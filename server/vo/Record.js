function Record ( record )
{
	record = record || {};
	
	if ( typeof record.userId === "number" )
	{
		this.userId = record.userId;
	}
	
	if ( typeof record.totalMins === "number" )
	{
		this.totalMins = record.totalMins;
	}
	
	if ( typeof record.shoppingMins === "number" )
	{
		this.shoppingMins = record.shoppingMins;
	}		
	
	if ( typeof record.snackingMins === "number" )
	{
		this.snackingMins = record.snackingMins;
	}
	
	if ( typeof record.socialisingMins === "number" )
	{
		this.socialisingMins = record.socialisingMins;
	}
	
	if ( typeof record.snacks === "string" )
	{
		this.snacks = record.snacks;
	}
	
	if ( record.purchases instanceof Array )
	{
		this.purchases = record.purchases;
	}
	else 
	{
		this.purchases = [];
	}
}

module.exports = Record;