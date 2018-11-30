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
		}
	}
}
