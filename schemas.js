exports.typeDefs = `
type Recipe {
    _id: ID
    name: String!
    category: String!
    description: String!
    instructions: String!
    createdDate: String
    imageUrl: String
    likes: [ID!]
    username: String
}

type User {
  _id: ID
  username: String! @unique
  password: String!
  email: String!
  joinDate: String
  favorites: [Recipe]
}

type Token {
    token: String!
}

type Query {
    getAllRecipes: [Recipe]
    getUserRecipes(username: String!): [Recipe]
    getRecipe(_id: ID!): Recipe
    searchRecipes(searchTerm: String): [Recipe]
    getCurrentUser: User
}

type Mutation {
    addRecipe(
        name: String!
        category: String!
        description: String!
        instructions: String!
        username: String!
        imageUrl: String!
    ): Recipe

    signInUser(
        username: String!
        password: String!
    ): Token

    signUpUser(
        username: String!
        email: String!
        password: String!
    ): Token

    likeRecipe(
        recipeId: ID!
        userId: ID!
    ): Recipe

    unLikeRecipe(
        recipeId: ID!
        userId: ID!
    ): Recipe

    deleteRecipe(
        _id: ID!
    ): Recipe
}
`;
