const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	joinDate: {
		type: Date,
		default: new Date()
	},
	favorites: {
		type: [Schema.Types.Object.id],
		ref: 'Recipe'
	}
})

module.exports = mongoose.model('User', UserSchema)
