const jwt = require('jsonwebtoken')

const createToken = (user, secret, expiresIn) => {
	const {username, email} = user
	return jwt.sign({
		username,
		email
	}, 
	secret,
	{expiresIn})
}

exports.resolvers = {
	Query: {
		getAllRecipes: async (root, args, { Recipe }) => Recipe.find()
	},
	Mutation: {
		/**
		 * @param  {} root // always passed
		 * @param  {} args // can be
		 * @param  {} {Recipe} // context
		 */
		addRecipe: async (
			root,
			{ name, category, description, instructions, username },
			{ Recipe }
		) => {
			console.log('what1')
			const newRecipe = await new Recipe({
				name,
				category,
				description,
				instructions,
				username
			}).save()
			console.log(newRecipe)
			return newRecipe
		},
		singupUser: async(root, {username,  email, password}, {User}) => {
			const user = await User.findOne({username})
			if(user) {
				throw new Error('Alread exists in system')
			} else {
				const newUser = await new User({
					username,
					email,
					password
				}).save()
				return { token : createToken(newUser, 'secret', '1hr')}
			}
		}
	}
}
