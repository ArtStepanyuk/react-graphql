const express = require("express");
const mongose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { graphiqlExpress, graphqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const Recipe = require("./models/Recipe");
const User = require("./models/User");
const { typeDefs } = require("./schemas");
const { resolvers } = require("./resolvers");
const jwt = require("jsonwebtoken");
const { DB_URI, SECRET } = require("./config/constants");
// creates graphql schemas
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

mongose
  .connect(DB_URI)
  .then(() => console.log("connected"))
  .catch(err => console.log(err));

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credential: true
};
app.use(cors(corsOptions));

// Set ip Jwt
app.use(async (req, res, next) => {
  const token = req.headers["authorization"];
  console.log(token);
  if (token !== "null") {
    try {
      const currentUser = await jwt.verify(token, SECRET);
      req.currentUser = currentUser;
    } catch (error) {
      console.log(error);
    }
  }
  next();
});

// creates graphql app
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress(({ currentUser }) => ({
    schema,
    context: {
      Recipe,
      User,
      currentUser
    }
  }))
);

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`running on${PORT}`);
});
