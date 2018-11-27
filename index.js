const express = require('express');
const path = require('path');
const userService = require('./server/UserService');
const cacheDao = require('./server/dao/CacheDao');

const app = express();
const port = 3000;

app.set('view engine', 'pug');

app.set('views', path.join(__dirname, '/client'));

app.use('/js', express.static(path.join(__dirname,'client', 'js')));

app.use('/css', express.static(path.join(__dirname,'client', 'css')));

( () => userService.processUsers() )();

app.get('/', (req, res) => {
	res.render('topThirty', {title: "Top 30 users", data: cacheDao.get('topThirtyUsers')});
});

app.get('/histogram', (req, res) => {
	res.render('histogram', {title: "Histogram", data: JSON.stringify(cacheDao.get('histogram'))});
});

app.get('/users/:userid', (req, res) => {
	var userId = req.params.userid;
	res.render('user', {
		title: 'User ' + userId, 
		data: ( cacheDao.get('users')[userId] && 
				JSON.stringify(cacheDao.get('users')[userId].cummulativeUserData) ) || {} 
	});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));