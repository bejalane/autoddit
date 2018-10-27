import React, { Component } from "react";
import { signIn } from "../actions/userActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      showValidationError: false
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if (!this.state.userName) {
      this.setState({ showValidationError: true });
      return;
    } else {
      this.setState({ showValidationError: false });
    }
    const user = {
      userName: this.state.userName
    };
    this.props.signIn(user);
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="signin-container">
        <div className="signin-inner-container">
          <h1>Sign In to use Autoddit</h1>
          <form onSubmit={this.onSubmit}>
            <div>
              <label htmlFor="userName">Name:</label>
              <div className="signin-form-container">
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  value={this.state.userName}
                  onChange={this.onChange}
                />

                <button className="btn btn-submit" type="submit">
                  Submit
                </button>
              </div>
              {this.state.showValidationError ? (
                <span className="validation-error">Name cannot be empty</span>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired
};

export default withRouter(
  connect(
    null,
    { signIn }
  )(SignIn)
);
