import React from "react";
import { Query } from "react-apollo";
import { GET_ALL_RECIPES } from "../queries/index";
import RecipeItem from "./Recipe/RecipeItem.js";
import "./App.css";
import { Card, Row, Col } from "reactstrap";
// ToDo: recipe item component

const App = ({session}) => (
  <div className="App">
    <h1>Home</h1>
    <Query query={GET_ALL_RECIPES}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error...</div>;
        console.log(data.getAllRecipes);
        if (data && data.getAllRecipes) {
          return (
            <Row>
              {data.getAllRecipes.map(recipe => (
                <Col sm="4"  key={recipe._id}>
                  <RecipeItem {...recipe}/>
                </Col>
              ))}
            </Row>
          );
        }
      }}
    </Query>
  </div>
);

export default App;
