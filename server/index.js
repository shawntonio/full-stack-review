require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const app = express();

const Ctrl = require('./controller')

const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env

app.use(express.json())
app.use(session({
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24
	}
}))

massive(CONNECTION_STRING).then(db => {
	app.set('db', db)
	console.log('database set')
	app.listen(SERVER_PORT, console.log(`you've been served by port ${SERVER_PORT}`))
})

app.get('/api/users', Ctrl.getUsers)
app.post('/auth/register', Ctrl.register)
app.post('/auth/login', Ctrl.login)
app.get('/auth/details', Ctrl.getDetails)
app.delete('/auth/logout', Ctrl.logout)


