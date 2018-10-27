import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

class Comment extends Component {
  formatCount(count) {
    return count === 1 ? "comment" : "comments";
  }
  render() {
    const comment = this.props.comment;
    return (
      <div>
        <div className="comment-container">
          <div className="comment-votes-btns">
            <span
              className={
                comment.votesUp.includes(this.props.userName) ? "active" : ""
              }
              onClick={() => {
                this.props.onVote(
                  this.props.comment.id,
                  true,
                  this.props.pathIndexes
                );
              }}
            >
              <i className="fa fa-arrow-up" />
            </span>
            <span> {comment.votesUp.length - comment.votesDown.length} </span>
            <span
              className={
                comment.votesDown.includes(this.props.userName) ? "active" : ""
              }
              onClick={() => {
                this.props.onVote(
                  this.props.comment.id,
                  false,
                  this.props.pathIndexes
                );
              }}
            >
              <i className="fa fa-arrow-down" />
            </span>
          </div>
          <div className="comment-content-wrapper">
            <p>{comment.text}</p>
            <div className="comment-data">
              <span>
                Submitted on{" "}
                {moment(comment.submittedOn).format("MMM DD, YYYY HH:mm")} by{" "}
                {comment.author}
              </span>
            </div>
            <div className="comment-comments">
              {comment.childComments} {this.formatCount(comment.childComments)}{" "}
              <button
                className="btn-sm"
                onClick={() => {
                  this.props.onAddComment(
                    this.props.postId,
                    this.props.pathIndexes
                  );
                }}
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
        <div className="child-comment-container">
          <div className="child-comment-wrapper">
            {comment.children.length > 0 &&
              comment.children.map((child, index) => {
                return (
                  <Comment
                    key={child.id}
                    comment={child}
                    postId={this.props.postId}
                    pathIndexes={this.props.pathIndexes + "_" + index}
                    onVote={this.props.onVote}
                    onAddComment={this.props.onAddComment}
                    userName={this.props.userName}
                  />
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.any.isRequired,
  onVote: PropTypes.func.isRequired,
  onAddComment: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired
};

export default Comment;
