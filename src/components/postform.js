import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { createPost } from "../actions/postActions";

class Postform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      image: "",
      showValidationErrorTitle: false,
      showValidationErrorImage: false
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  checkImageExists(imageUrl, callBack) {
    var imageData = new Image();
    imageData.onload = () => {
      return callBack(true);
    };
    imageData.onerror = () => {
      return callBack(false);
    };
    imageData.src = imageUrl;
  }

  onSubmit = e => {
    e.preventDefault();
    if (!this.state.title) {
      this.setState({ showValidationErrorTitle: true });
      return;
    } else {
      this.setState({ showValidationErrorTitle: false });
    }

    if (!this.state.image) {
      this.setState({ showValidationErrorImage: false });
      this.createNewPost();
    } else {
      this.checkImageExists(this.state.image, existsImage => {
        if (existsImage === true) {
          this.setState({ showValidationErrorImage: false });
          this.createNewPost();
          return true;
        } else {
          this.setState({ showValidationErrorImage: true });
          return false;
        }
      });
    }
  };

  createNewPost = () => {
    const post = {
      title: this.state.title,
      image: this.state.image,
      submittedOn: moment().format(),
      author: this.props.user,
      commentsCount: 0,
      votesUp: [],
      votesDown: []
    };
    this.props.createPost(post);
    this.props.history.push("/");
  };

  cancel = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="main-container">
        <div className="post-form-container">
          <h1 className="m-b">Add Link</h1>
          <form onSubmit={this.onSubmit}>
            <div className="m-b">
              <label>Title</label>
              <br />
              <input
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.onChange}
              />
              {this.state.showValidationErrorTitle ? (
                <span className="validation-error">Title cannot be empty</span>
              ) : null}
            </div>
            <div className="m-b">
              <label>Image URL: </label>
              <br />
              <input
                type="text"
                name="image"
                value={this.state.image}
                onChange={this.onChange}
              />
              {this.state.showValidationErrorImage ? (
                <span className="validation-error">
                  Image on this link doesn't exist
                </span>
              ) : null}
            </div>
            <br />
            <button type="submit" className="m-r">
              Submit
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => {
                this.cancel();
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.currentUser
});

Postform.propTypes = {
  createPost: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired
};

export default withRouter(
  connect(
    mapStateToProps,
    { createPost }
  )(Postform)
);
