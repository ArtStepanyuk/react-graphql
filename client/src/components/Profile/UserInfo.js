import RecipeItem from "../Recipe/RecipeItem";
import UserRecipes from "./UserRecipes";
import { Row, Col, Jumbotron } from "reactstrap";
import React, { Fragment } from "react";

export default function UserInfo({
  session: {
    getCurrentUser: { username, joinDate, email, favorites }
  }
}) {
  return (
    <Fragment>
      <Jumbotron>
        <h1 className="display-3">{username}</h1>
        <p className="lead">{joinDate}</p>
        <hr className="my-2" />
        <p>{email}</p>
      </Jumbotron>
      <div className="ml-3">Favorites </div>
      {favorites.length > 0 ? (
        <Row>
          {favorites.map(recipe => (
            <Col sm="4" key={recipe._id}>
              <RecipeItem recipe={recipe} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="ml-3">
          <b>Go add some</b>
        </div>
      )}
      <UserRecipes username={username} />
    </Fragment>
  );
}
