const express = require('express')
const mongose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const Recipe = require('./models/Recipe')
const User = require('./models/User')

const { typeDefs } = require('./schemas')
const { resolvers } = require('./resolvers')
// creates graphql schemas
const schema = makeExecutableSchema({
	typeDefs,
	resolvers
})

mongose
	.connect('mongodb://localhost/react')
	.then(() => console.log('connected'))
	.catch(err => console.log(err))

const app = express()
const corsOptions = {
	origin: 'http://localhost:3000',
	credetinals: true
}
app.use(cors(corsOptions))

// creates graphql app
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.use(
	'/graphql',
	bodyParser.json(),
	graphqlExpress({
		schema,
		context: {
			Recipe,
			User
		}
	})
)

const PORT = process.env.PORT || 4444

app.listen(PORT, () => {
	console.log(`running on${PORT}`)
})
