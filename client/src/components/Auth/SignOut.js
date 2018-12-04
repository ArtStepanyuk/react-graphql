import React from "react";
import { Button } from "reactstrap";
import { ApolloConsumer } from "react-apollo";
import { withRouter } from "react-router-dom";

const handleLogOut = (client, context) => {
  localStorage.removeItem("token");
  client.resetStore();
  context.history.push("/");
};

const SignOut = context => {
  return (
    <ApolloConsumer>
      {client => {
        return (
          <Button color="primary" onClick={() => handleLogOut(client, context)}>
            Sign out
          </Button>
        );
      }}
    </ApolloConsumer>
  );
};

export default withRouter(SignOut);
