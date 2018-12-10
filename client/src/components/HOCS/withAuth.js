import React from "react";
import { Query } from "react-apollo";
import { GET_CURRENT_USER } from "../../queries";
import { Redirect } from "react-router-dom";
import Spinner from '../Spinner'
const withAuth = fn => Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading }, a) => {
      if (loading) return <Spinner/>
      return fn(data) ? (
        <Component {...props} session={data} />
      ) : (
        <Redirect to="/" />
      );
    }}
  </Query>
);

export default withAuth;
