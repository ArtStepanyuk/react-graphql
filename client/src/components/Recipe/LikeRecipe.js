import React, { Component } from "react";
import withSession from "../HOCS/withSession";
import { Mutation } from "react-apollo";
import {
  LIKE_RECIPE,
  GET_ALL_RECIPES,
  GET_CURRENT_USER,
  UN_LIKE_RECIPE
} from "../../queries";
import { Button } from "reactstrap";

class LikeRecipe extends Component {
  constructor(props) {
    super(props);
    this.refetchQueries = [
      { query: GET_ALL_RECIPES },
      { query: GET_CURRENT_USER }
    ];

    this.queryArgs = {
      userId: this.props.session.getCurrentUser._id,
      recipeId: this.props.recipeId
    };
  }

  async handleRecipeLike(fn) {
    try {
      await fn({
        userId: this.props.session.getCurrentUser._id,
        recipeId: this.props.recipeId
      });
    } catch (error) {
      console.log(error);
    }
  }

  recipeLiked() {
    return this.props.likes.includes(this.props.session.getCurrentUser._id);
  }

  getButtonHandler(fn, liked) {
    return (
      <Button onClick={() => this.handleRecipeLike(fn)}>
        {!liked ? "Like Recipe" : "Unlike recipe"}
      </Button>
    );
  }

  render() {
    return (
      <div>
        {this.props.session && this.props.session.getCurrentUser && (
          <div>
            <Mutation
              mutation={!this.recipeLiked() ? LIKE_RECIPE : UN_LIKE_RECIPE}
              variables={this.queryArgs}
              refetchQueries={() => this.refetchQueries}
            >
              {(fn, { loading }) => {
                if (loading) return <div>Loading...</div>;
                return this.getButtonHandler(fn, this.recipeLiked());
              }}
            </Mutation>
          </div>
        )}
      </div>
    );
  }
}

export default withSession(LikeRecipe);
