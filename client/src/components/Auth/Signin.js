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
import { SIGN_IN_USER } from "../../queries/index";
import { Mutation } from "react-apollo";
import Error from "../../common/Error";
import { withRouter } from "react-router-dom";

const initialState = {
  username: "",
  password: ""
};

class Signin extends Component {
  state = {
    ...initialState
  };

  handleChanges = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, mt) => {
    event.preventDefault();
    console.log(this.state);
    mt()
      .then(async ({ data }) => {
        console.log(data);
        localStorage.setItem("token", data.signInUser.token);
        await this.props.refetch()
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  formIsValid = () => {
    const notEmpty = [this.state.username, this.state.password].every(
      i => i.length > 0
    );
    return notEmpty;
  };

  render() {
    const { username, password } = this.state;
    return (
      <Container>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <h1>Sign up</h1>
            <Mutation
              mutation={SIGN_IN_USER}
              variables={{
                username,
                password
              }}
            >
              {(signInUser, { data, loading, error }) => {
                if (loading) return <div>Loading...</div>;
                return (
                  <Form
                    onSubmit={event => this.handleSubmit(event, signInUser)}
                  >
                    <FormGroup>
                      <Label for="username">Username</Label>
                      <Input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={this.handleChanges}
                        placeholder="with a placeholder"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChanges}
                        id="password"
                        placeholder="password placeholder"
                      />
                    </FormGroup>
                    <Button
                      disabled={loading || !this.formIsValid()}
                      onClick={this.onSubmit}
                    >
                      Submit
                    </Button>
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

export default withRouter(Signin);
