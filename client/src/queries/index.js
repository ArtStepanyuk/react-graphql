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
//Recipes mutations

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
