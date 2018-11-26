function Cache ()
{
	this.cache = {};
	
	const self = this;
	
	this.set = function ( key, value )
	{
		self.cache['' + key] = value;
	}
	
	this.get = function ( key )
	{
		return self.cache['' + key];
	}
}

const cacheInstance = new Cache();

module.exports = cacheInstance;