const bcrypt = require('bcryptjs')

module.exports = {
	getUsers: (req, res) => {
		const db = req.app.get('db')
		db.getAllUsers().then(users => res.status(200).send(users))
	},

	register: async (req, res) => {
		const db = req.app.get('db')
		const {email, firstname, lastname, username, password} = req.body
		const {session} = req
		let emailTaken = await db.checkEmail(email)
		emailTaken = +emailTaken[0].count
		if (emailTaken) {
			return res.sendStatus(409)
		}
		const salt = bcrypt.genSaltSync(10)
		const hash = bcrypt.hashSync(password, salt)

	}
}