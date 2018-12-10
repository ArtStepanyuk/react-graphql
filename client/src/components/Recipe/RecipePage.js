import React from "react";
import { withRouter } from "react-router-dom";
import { GET_RECIPE } from "../../queries";
import { Query } from "react-apollo";
import LikeRecipe from "../Recipe/LikeRecipe";
import Spinner from "../Spinner";
import { Media, Row, Col, Container } from "reactstrap";

const RecipePage = ({ match }) => {
  const { id: _id } = match.params;
  const onLike = () => {
    console.log("liked");
  };
  return (
    <Query query={GET_RECIPE} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <Spinner />;
        if (error) return <div>error</div>;
        console.log(data);
        return (
          <Container className="m-2" fluid>
            <Row>
              <Col>
                <p>name: {data.getRecipe.name}</p>
                <p>createdDate: {data.getRecipe.createdDate}</p>
                <p>Category: {data.getRecipe.category}</p>
                <p>description: {data.getRecipe.description}</p>
                <p>instructions: {data.getRecipe.instructions}</p>
                <p>likes: {data.getRecipe.likes.length}</p>
                <p>username: {data.getRecipe.username}</p>
              </Col>
              <Col>
                <Media
                  object
                  src={data.getRecipe.imageUrl}
                  alt="Generic placeholder image"
                />
              </Col>
            </Row>
          </Container>
        );
      }}
    </Query>
  );
};

export default withRouter(RecipePage);
