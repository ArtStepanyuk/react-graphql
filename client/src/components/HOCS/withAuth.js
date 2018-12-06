import React from "react";
import { Query } from "react-apollo";
import { GET_CURRENT_USER } from "../../queries";
import { Redirect } from "react-router-dom";
const withAuth = fn => Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading }, a) => {
      if (loading) return null;
      console.log(a);
      return fn(data) ? (
        <Component {...props} session={data} />
      ) : (
        <Redirect to="/" />
      );
    }}
  </Query>
);

export default withAuth;
