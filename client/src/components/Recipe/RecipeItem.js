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
  CardImg,
  Col,
  Row
} from "reactstrap";
import Spinner from "../Spinner";

const RecipeItem = function({
  _id,
  name,
  category,
  instructions,
  history,
  username,
  currentUser,
  onUpdateList,
  imageUrl
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
      <CardImg top width="100%" src={imageUrl} alt="Recipe imageUrl" />
      <CardHeader>{name}</CardHeader>
      <CardBody>
        <CardTitle>Category : {category}</CardTitle>
        <CardText>instructions: {instructions}</CardText>
        <Row>
          <Col>
            <Button onClick={gotToDetails} block>
              Go to details
            </Button>
          </Col>
          <Col>
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
                  if (loading) return <Spinner />;
                  return (
                    <Button onClick={() => handleDelete(deleteRecipe)} block>
                      Delete item
                    </Button>
                  );
                }}
              </Mutation>
            )}
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default compose(withRouter)(RecipeItem);
