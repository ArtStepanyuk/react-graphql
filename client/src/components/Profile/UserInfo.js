import React from "react";
import RecipeItem from "../Recipe/RecipeItem";
import UserRecipes from "./UserRecipes";
import { Row, Col } from "reactstrap";

export default function UserInfo({
  session: {
    getCurrentUser: { username, joinDate, email, favorites }
  }
}) {
  return (
    <div>
      <div>{username}</div>
      <div>{joinDate}</div>
      <div>{email}</div>
      <div>Favorites </div>
      {favorites.length > 0 ? (
        <Row>
          {favorites.map(recipe => (
            <Col sm="4" key={recipe._id}>
              <RecipeItem recipe={recipe}/>
            </Col>
          ))}
        </Row>
      ) : (
        <div>
          <b>Go add some</b>
        </div>
      )}
      <UserRecipes username={username} />
    </div>
  );
}
