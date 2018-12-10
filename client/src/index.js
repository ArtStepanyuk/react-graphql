import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import withSession from "./components/HOCS/withSession";
import Navbar from "./common/Navbar";
import Search from "./components/Recipe/Search";
import AddRecipe from "./components/Recipe/AddRecipe";
import RecipePage from "./components/Recipe/RecipePage";
import Profile from "./components/Profile/Profile";
import "bootstrap/dist/css/bootstrap.min.css";


const uri = "http://localhost:4444/graphql";
const client = new ApolloClient({
  uri,
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log(networkError);
      if (networkError.statusCode === 401) {
        localStorage.removeItem("token");
      }
    }
  }
});

const Root = ({ refetch, session }) => (
  <BrowserRouter>
    <Fragment>
      <Navbar session={session} />
      <Switch>
        <Route path="/" exact render={() => <App session={session} />} />
        <Route path="/search" exact component={Search} />
        <Route
          path="/recipe/add"
          exact
          render={() => <AddRecipe session={session} />}
        />
        <Route path="/recipe/:id" exact component={RecipePage} />
        <Route path="/profile" render={() => <Profile session={session} />} />
        <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </BrowserRouter>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById("root")
);
