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
import { SIGN_UP_USER } from "../../queries/index";
import { Mutation } from "react-apollo";
import Error from "../../common/Error";
import { withRouter } from "react-router-dom";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: ""
};

class Signup extends Component {
  state = {
    ...initialState
  };

  handleChanges = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  clearState() {
    this.setState({ ...initialState });
  }

  handleSubmit = (event, mt) => {
    event.preventDefault();
    console.log(this.state);
    mt()
      .then(async ({ data }) => {
        console.log(data);
        localStorage.setItem("token", data.signUpUser.token);
        this.clearState();
        await this.props.refetch()
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  formIsValid = () => {
    const isPasswordSame = this.state.password === this.state.confirmPassword;
    const notEmpty = [
      this.state.username,
      this.state.password,
      this.state.confirmPassword,
      this.state.email
    ].every(i => i.length > 0);
    return isPasswordSame && notEmpty;
  };

  render() {
    const { username, password, confirmPassword, email } = this.state;
    return (
      <Container>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <h1>Sign up</h1>
            <Mutation
              mutation={SIGN_UP_USER}
              variables={{
                username,
                email,
                password
              }}
            >
              {(signUpUser, { data, loading, error }) => {
                if (loading) return <div>Loading...</div>;
                return (
                  <Form
                    onSubmit={event => this.handleSubmit(event, signUpUser)}
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
                      <Label for="email">Email</Label>
                      <Input
                        type="email"
                        value={email}
                        onChange={this.handleChanges}
                        name="email"
                        id="email"
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
                    <FormGroup>
                      <Label for="confirmPassword">Password</Label>
                      <Input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={this.handleChanges}
                        id="confirmPassword"
                        placeholder="confirm password placeholder"
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

export default withRouter(Signup);
