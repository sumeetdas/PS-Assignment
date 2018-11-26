const express = require('express');
const path = require('path');
const userService = require('./server/UserService');
const cacheDao = require('./server/dao/CacheDao');

const app = express();
const port = 3000;

app.set('view engine', 'pug');

app.set('views', path.join(__dirname, '/client'));

( () => userService.processUsers() )();

app.get('/', (req, res) => {
	res.render('topThirty', {title: "Top 30 users", data: cacheDao.get('topThirtyUsers')});
});

app.get('/histogram', (req, res) => {
	res.render('histogram', {title: "Histogram", data: cacheDao.get('histogram')});
});

app.get('/users/:userid', (req, res) => {
	var userId = req.params.userid;
	res.render('user', {title: 'User ' + userId, data: cacheDao.get('users')[userId]});
});

app.get('/topThirty', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
    res.send(cacheDao.get('topThirtyUsers'));
});

app.get('/users', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(cacheDao.get('users'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));