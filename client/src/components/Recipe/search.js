import React from "react";
import { SEARCH_RECIPES } from "../../queries";
import { ApolloConsumer } from "react-apollo";
import RecipeItem from "./RecipeItem";
import { Row, Col, InputGroup, Input } from "reactstrap";

export default class Search extends React.Component {
  state = {
    searchTerm: "",
    recipes: []
  };

  handleChange({ searchRecipes }) {
    this.setState(() => ({ recipes: searchRecipes }));
  }

  render() {
    const { recipes } = this.state;
    return (
      <ApolloConsumer>
        {client => (
          <div>
            <InputGroup size="lg" className="m-3">
              <Input
                type="search"
                placeholder="Type to search"
                onChange={async event => {
                  event.persist();
                  const { data } = await client.query({
                    query: SEARCH_RECIPES,
                    variables: { searchTerm: event.target.value }
                  });
                  this.handleChange(data);
                }}
              />
            </InputGroup>

            <Row>
              {recipes.map(recipe => (
                <Col sm="4" key={recipe._id}>
                  <RecipeItem {...recipe} />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}
