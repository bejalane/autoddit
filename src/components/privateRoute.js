import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";

class PrivateRoute extends Component {
  render() {
    if (this.props.user) {
      return (
        <Route exact path={this.props.path} component={this.props.component} />
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.users.currentUser
});

PrivateRoute.propTypes = {
  user: PropTypes.string.isRequired
};

export default withRouter(connect(mapStateToProps)(PrivateRoute));
