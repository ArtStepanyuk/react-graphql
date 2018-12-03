import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import withSession from "./components/withSession";
import Navbar from "./components/Navbar";
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

const Root = ({ refetch }) => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/signin" render={() => <Signin refetch={refetch} />} />
      <Route path="/signup" render={() => <Signup refetch={refetch} />} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById("root")
);
