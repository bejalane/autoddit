import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { createComment } from "../actions/commentActions";
import { updatePostCommentsNumber } from "../actions/postActions";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      showValidationError: false
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if (!this.state.text) {
      this.setState({ showValidationError: true });
      return;
    } else {
      this.setState({ showValidationError: false });
    }
    const comment = {
      text: this.state.text,
      submittedOn: moment().format(),
      author: this.props.user,
      childComments: 0,
      votesUp: [],
      votesDown: [],
      postId: this.props.postId,
      children: []
    };

    const comments = [...this.props.comments];
    const commentsIdCounter = this.props.commentsIdCounter + 1;
    comment.id = commentsIdCounter;
    let commentBranch = comments.filter(c => c.postId === this.props.postId);
    let res = commentBranch;
    if (this.props.pathIndexes) {
      let path = this.props.pathIndexes.split("_");
      path = path.map(el => parseInt(el));
      for (let i = 0; i < path.length; i++) {
        res[path[i]].childComments++;
        res = res[path[i]].children;
      }
    }
    res.push(comment);
    this.props.createComment(commentBranch);
    const postData = {
      postId: this.props.postId,
      increment: true
    };
    this.props.updatePostCommentsNumber(postData);
    this.setState({ text: "" });
    this.props.onClose();
  };

  render() {
    return (
      <div>
        <h1 className="m-b">Add Comment</h1>
        <form onSubmit={this.onSubmit} className="comments-form">
          <div className="m-b">
            <label>Text: </label>
            <textarea
              type="body"
              name="text"
              value={this.state.text}
              onChange={this.onChange}
            />
            {this.state.showValidationError ? (
              <span className="validation-error">
                Comment text cannot be empty
              </span>
            ) : null}
          </div>
          <button type="submit" className="m-r">
            Submit
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => {
              this.setState({ text: "", showValidationError: false });
              this.props.onClose();
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

//export default Postform;
const mapStateToProps = state => ({
  comments: state.comments.items,
  commentsIdCounter: state.comments.commentsIdCounter,
  user: state.users.currentUser
});

CommentForm.propTypes = {
  createComment: PropTypes.func.isRequired,
  updatePostCommentsNumber: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
  commentsIdCounter: PropTypes.number.isRequired,
  user: PropTypes.string.isRequired
};

export default withRouter(
  connect(
    mapStateToProps,
    { createComment, updatePostCommentsNumber }
  )(CommentForm)
);
