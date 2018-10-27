import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Comments from "./comments";
import { showModal } from "../actions/modalActions";
import moment from "moment";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandComments: false
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps &&
      prevProps.post.commentsCount !== this.props.post.commentsCount
    ) {
      this.setState({ expandComments: true });
    }
  }

  toggleCommentSection = () => {
    let expand = this.state.expandComments;
    this.setState({ expandComments: !expand });
  };

  render() {
    const post = this.props.post;
    return (
      <div>
        <div className="post-container">
          <div className="post-votes-btns">
            <span
              className={
                post.votesUp.includes(this.props.userName) ? "active" : ""
              }
              onClick={() => {
                this.props.onVote(this.props.post.id, true);
              }}
            >
              <i className="fa fa-arrow-up" />
            </span>
            <span> {post.votesUp.length - post.votesDown.length} </span>
            <span
              className={
                post.votesDown.includes(this.props.userName) ? "active" : ""
              }
              onClick={() => {
                this.props.onVote(this.props.post.id, false);
              }}
            >
              <i className="fa fa-arrow-down" />
            </span>
          </div>
          <div className="post-image-wrapper">
            <img
              src={post.image}
              alt={post.title}
              className={post.image ? "show-section" : "hide-section"}
            />
          </div>
          <div className="post-content-wrapper">
            <h3>{post.title}</h3>
            <div className="post-data">
              <span>
                Submitted on{" "}
                {moment(post.submittedOn).format("MMM DD, YYYY HH:mm")}
              </span>{" "}
              by {post.author}
            </div>
            <div className="post-comments">
              <span
                onClick={() => {
                  return post.commentsCount
                    ? this.toggleCommentSection()
                    : null;
                }}
              >
                {post.commentsCount} comments{" "}
              </span>
              <button
                className="btn-sm"
                onClick={() => {
                  this.props.showModal({ id: post.id, path: "" });
                }}
              >
                Add Comment {this.onAddPostComment}
              </button>
            </div>
          </div>
        </div>
        <div
          className={
            this.state.expandComments ? "show-section" : "hide-section"
          }
        >
          <div className="comments-container">
            <Comments
              postId={post.id}
              pathIndexes={""}
              onAddPostComment={this.onAddPostComment}
            />
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  onVote: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  userName: PropTypes.string.isRequired
};

export default connect(
  null,
  { showModal }
)(Post);
