import React from "react";
import { withRouter } from "react-router-dom";
import { GET_RECIPE } from "../../queries";
import { Query } from "react-apollo";

const RecipePage = ({ match }) => {
  const { id: _id } = match.params;
  const onLike = () => {
    console.log("liked");
  };
  return (
    <Query query={GET_RECIPE} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <div>error</div>;
        console.log(data);
        return (
          <div className="text-center">
            <p>name: {data.getRecipe.name}</p>
            <p>Category: {data.getRecipe.category}</p>
            <p>description: {data.getRecipe.description}</p>
            <p>instructions: {data.getRecipe.instructions}</p>
            <p>createdDate: {data.getRecipe.createdDate}</p>
            <p>likes: {data.getRecipe.likes}</p>
            <p>username: {data.getRecipe.username}</p>
            <button onClick={onLike}>Like</button>
          </div>
        );
      }}
    </Query>
  );
};

export default withRouter(RecipePage);
