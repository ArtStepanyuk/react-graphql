import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
import {
  CRETE_RECIPE,
  GET_ALL_RECIPES,
  GET_CURRENT_USER
} from "../../queries/index";
import { Mutation } from "react-apollo";
import Error from "../../common/Error";
import Spinner from "../Spinner";
import { withRouter } from "react-router-dom";

const initialState = {
  name: "",
  username: "",
  instructions: "",
  category: "",
  description: "",
  imageUrl: ""
};

class AddRecipe extends Component {
  state = {
    ...initialState
  };

  componentDidMount() {
    console.log(this.props.session.getCurrentUser.username);
    this.setState(() => ({
      username: this.props.session.getCurrentUser.username
    }));
  }

  handleChanges = event => {
    const { name, value } = event.target;
    this.setState(() => ({ [name]: value }));
  };

  handleSubmit = (event, mt) => {
    event.preventDefault();
    console.log(this.state);
    mt()
      .then(async ({ data }) => this.props.history.push("/"))
      .catch(err => console.log(err));
  };

  cancel = () => {
    this.setState(() => ({ ...initialState }));
  };

  formIsValid = () => {
    const notEmpty = [...Object.keys(this.state)].every(
      i => this.state[i].length > 0
    );
    return notEmpty;
  };

  updateCache = (cache, { data: { addRecipe } }) => {
    const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });
    console.log(getAllRecipes);
    // debugger;
    cache.writeQuery({
      query: GET_ALL_RECIPES,
      data: {
        getAllRecipes: [addRecipe, ...getAllRecipes]
      }
    });
  };

  render() {
    const {
      name,
      username,
      instructions,
      description,
      category,
      imageUrl
    } = this.state;
    return (
      <Container className="mt-5">
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <h1>Create recipe</h1>
            <Mutation
              mutation={CRETE_RECIPE}
              variables={{
                name,
                username,
                instructions,
                category,
                description,
                imageUrl
              }}
              refetchQueries={() => [{ query: GET_CURRENT_USER }]}
              update={this.updateCache}
            >
              {(addRecipe, { data, loading, error }) => {
                if (loading) return <Spinner />;
                return (
                  <Form onSubmit={event => this.handleSubmit(event, addRecipe)}>
                    <FormGroup>
                      <Label for="name">name</Label>
                      <Input
                        type="text"
                        name="name"
                        value={name}
                        onChange={this.handleChanges}
                        id="name"
                        placeholder="name placeholder"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="instructions">instructions</Label>
                      <Input
                        type="text"
                        name="instructions"
                        value={instructions}
                        onChange={this.handleChanges}
                        id="instructions"
                        placeholder="instructions placeholder"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="imageUrl">image url</Label>
                      <Input
                        type="text"
                        name="imageUrl"
                        value={imageUrl}
                        onChange={this.handleChanges}
                        id="instructions"
                        placeholder="imageUrl url"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="description">description</Label>
                      <Input
                        type="text"
                        name="description"
                        value={description}
                        onChange={this.handleChanges}
                        id="description"
                        placeholder="description placeholder"
                      />
                    </FormGroup>
                    <FormGroup tag="fieldset">
                      <legend className="col-form-label">Category</legend>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            value="potatoes"
                            name="category"
                            onChange={this.handleChanges}
                          />
                          potatoes
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            value="meat"
                            name="category"
                            onChange={this.handleChanges}
                          />
                          meat
                        </Label>
                      </FormGroup>
                    </FormGroup>
                    <Row>
                      <Col>
                        <Button
                          block
                          disabled={loading || !this.formIsValid()}
                          onClick={this.onSubmit}
                        >
                          Submit
                        </Button>{" "}
                      </Col>
                      <Col>
                        <Button block disabled={loading} onClick={this.cancel}>
                          Clear
                        </Button>
                      </Col>
                    </Row>
                    {error && (
                      <div>
                        <Error error={error} />
                      </div>
                    )}
                  </Form>
                );
              }}
            </Mutation>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(AddRecipe);
