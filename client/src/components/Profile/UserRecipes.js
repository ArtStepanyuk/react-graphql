import { Query } from "react-apollo";
import { GET_USER_RECIPES } from "../../queries";
import React, { Fragment } from "react";
import RecipeItem from "../Recipe/RecipeItem";
import { Row, Col } from "reactstrap";

const UserRecipes = function({ username }) {
  return (
    <Query query={GET_USER_RECIPES} variables={{ username }}>
      {({ loading, data, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error...</div>;
        console.log(data.getUserRecipes);
        return (
          <Fragment>
            <Row>
              {data.getUserRecipes.map(recipe => (
                <Col sm="4" key={recipe._id}>
                  <RecipeItem {...recipe} currentUser={username} />
                </Col>
              ))}
            </Row>
          </Fragment>
        );
      }}
    </Query>
  );
};

export default UserRecipes;
