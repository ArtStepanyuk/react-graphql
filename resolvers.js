const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SECRET } = require("./config/constants");
const mongoose = require("mongoose");
const { uniq } = require("lodash");

const createToken = (user, secret, expiresIn = "1h") => {
  const { username, email } = user;
  return jwt.sign(
    {
      username,
      email
    },
    secret,
    { expiresIn }
  );
};

exports.resolvers = {
  Query: {
    getAllRecipes: async (root, args, { Recipe }) =>
      Recipe.find().sort({ createdDate: "desc" }),
    getUserRecipes: async (root, { username }, { Recipe }) =>
      Recipe.find({ username }).sort({ createdDate: "desc" }),
    getRecipe: async (root, { _id }, { Recipe }) => Recipe.findOne({ _id }),
    searchRecipes: async (root, { searchTerm }, { Recipe }) => {
      console.log("ebaaaa");
      if (searchTerm) {
        return await Recipe.find(
          {
            $text: {
              $search: searchTerm
            }
          },
          {
            score: { $meta: "textScore" } // creates new fields for optimization of sorting
          }
        ).sort({
          score: { $meta: "textScore" }
        });
      } else {
        return await Recipe.find().sort({ likes: "desc", createdDate: "desc" });
      }
    },
    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }
      return await User.findOne({ username: currentUser.username }).populate({
        path: "favorites",
        model: "Recipe"
      });
    }
  },
  Mutation: {
    /**
     * @param  {} root // always passed
     * @param  {} args // can be
     * @param  {} {Recipe} // context
     */
    addRecipe: async (
      root,
      { name, category, description, instructions, username, imageUrl },
      { Recipe }
    ) => {
      const newRecipe = await new Recipe({
        name,
        category,
        description,
        instructions,
        username,
        imageUrl
      }).save();
      console.log(newRecipe);
      return newRecipe;
    },
    deleteRecipe: async (root, { _id }, { Recipe }) =>
      Recipe.findOneAndRemove({ _id: mongoose.Types.ObjectId(_id) }),
    signInUser: async (root, userObj, { User }) => {
      const user = await User.findOne({ username: userObj.username });
      if (!user) {
        throw new Error("User not found");
      } else {
        const isValidPassword = await bcrypt.compare(
          userObj.password,
          user.password
        );
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }
        return { token: createToken(user, SECRET) };
      }
    },
    signUpUser: async (root, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("Already exists in system");
      } else {
        const newUser = await new User({
          username,
          email,
          password
        }).save();
        return { token: createToken(newUser, SECRET) };
      }
    },
    likeRecipe: async (root, { userId, recipeId }, { Recipe }) => {
      const recipe = await Recipe.findOne({ _id: recipeId });
      const likesItems = new Set([...recipe.likes]);
      likesItems.add(userId);
      recipe.likes = [...likesItems];
      return recipe.save();
    },
    unLikeRecipe: async (root, { userId, recipeId }, { Recipe }) => {
      const recipe = await Recipe.findOne({ _id: recipeId });
      recipe.likes = recipe.likes.filter(
        currentUserIds => currentUserIds !== userId
      );
      return recipe.save();
    }
  }
};
