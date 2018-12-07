import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { Mutation } from "react-apollo";

import {
  DELETE_RECIPE,
  GET_ALL_RECIPES,
  GET_CURRENT_USER
} from "../../queries";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Button,
  CardHeader,
  CardFooter
} from "reactstrap";

const RecipeItem = function({
  _id,
  name,
  category,
  likes,
  instructions,
  history,
  username,
  currentUser,
  onUpdateList
}) {
  const gotToDetails = () => {
    history.push(`/recipe/${_id}`);
  };

  const handleDelete = fn =>
    fn(_id)
      .then(res => console.log(res))
      .catch(err => console.log(err));

  return (
    <Card className="m-3">
      <CardHeader>{name}</CardHeader>
      <CardBody>
        <CardTitle>Category : {category}</CardTitle>
        <CardText>instructions: {instructions}</CardText>
        <Button onClick={gotToDetails}>Go to details</Button>
        {currentUser === username && (
          //ToDo brake to separate component
          <Mutation
            mutation={DELETE_RECIPE}
            variables={{
              _id
            }}
            refetchQueries={() => [
              { query: GET_ALL_RECIPES },
              { query: GET_CURRENT_USER }
            ]}
            update={onUpdateList}
          >
            {(deleteRecipe, { loading }) => {
              if (loading) return <div>Loading...</div>;
              return (
                <Button onClick={() => handleDelete(deleteRecipe)}>
                  Delete item
                </Button>
              );
            }}
          </Mutation>
        )}
      </CardBody>
    </Card>
  );
};

export default compose(withRouter)(RecipeItem);
