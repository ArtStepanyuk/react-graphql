import { gql } from "apollo-boost";

// Recipes Queries
export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      _id
      name
      category
      description
      instructions
      createdDate
      likes
    }
  }
`;

export const SEARCH_RECIPES = gql`
  query($searchTerm: String) {
    searchRecipes(searchTerm: $searchTerm) {
      _id
      name
      category
      description
      instructions
      createdDate
      likes
    }
  }
`;

export const GET_RECIPE = gql`
  query($_id: ID!) {
    getRecipe(_id: $_id) {
      _id
      likes
      name
      username
      instructions
      category
      username
    }
  }
`;
//Recipes mutations

export const CRETE_RECIPE = gql`
  mutation(
    $instructions: String!
    $name: String!
    $username: String!
    $category: String!
    $description: String!
  ) {
    addRecipe(
      name: $name
      username: $username
      instructions: $instructions
      category: $category
      description: $description
    ) {
      instructions
      _id
      likes
      name
      username
      instructions
      category
    }
  }
`;

// Users queries

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      email
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
