import { gql } from "apollo-boost";
import { recipeFragments } from "./fragments";
// Recipes Queries
export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      ...CompleteRecipe
    }
  }
  ${recipeFragments.recipe}
`;

export const GET_USER_RECIPES = gql`
  query($username: String!) {
    getUserRecipes(username: $username) {
      ...CompleteRecipe
    }
  }
  ${recipeFragments.recipe}
`;

export const SEARCH_RECIPES = gql`
  query($searchTerm: String) {
    searchRecipes(searchTerm: $searchTerm) {
      ...CompleteRecipe
    }
  }
  ${recipeFragments.recipe}
`;

export const GET_RECIPE = gql`
  query($_id: ID!) {
    getRecipe(_id: $_id) {
      ...CompleteRecipe
    }
  }
  ${recipeFragments.recipe}
`;
//Recipes mutations

export const DELETE_RECIPE = gql`
  mutation($_id: ID!) {
    deleteRecipe(_id: $_id) {
      _id
    }
  }
`;

export const LIKE_RECIPE = gql`
  mutation($recipeId: ID!, $userId: ID!) {
    likeRecipe(recipeId: $recipeId, userId: $userId) {
      _id
    }
  }
`;

export const UN_LIKE_RECIPE = gql`
  mutation($recipeId: ID!, $userId: ID!) {
    unLikeRecipe(recipeId: $recipeId, userId: $userId) {
      _id
    }
  }
`;

export const CRETE_RECIPE = gql`
  mutation(
    $instructions: String!
    $name: String!
    $username: String!
    $category: String!
    $description: String!
    $imageUrl: String!
  ) {
    addRecipe(
      name: $name
      imageUrl: $imageUrl
      username: $username
      instructions: $instructions
      category: $category
      description: $description
    ) {
      ...CompleteRecipe
    }
  }
  ${recipeFragments.recipe}
`;

// Users queries

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      username
      email
      joinDate
      favorites {
        _id
        name
      }
    }
  }
`;

// User mutations

export const SIGN_IN_USER = gql`
  mutation($username: String!, $password: String!) {
    signInUser(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGN_UP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signUpUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;
