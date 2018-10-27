import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Post from "./post";
import { vote } from "../actions/postActions";

class Posts extends Component {
  handleVote = (id, increment) => {
    const postItems = this.props.posts;
    let votedPost = postItems.filter(p => p.id === id)[0];
    let userName = this.props.user;
    const indexVoteUp = votedPost.votesUp.indexOf(userName);
    const indexVoteDown = votedPost.votesDown.indexOf(userName);
    if (increment) {
      if (indexVoteDown !== -1) votedPost.votesDown.splice(indexVoteDown, 1);
      if (indexVoteUp === -1) votedPost.votesUp.push(userName);
    } else {
      if (indexVoteDown === -1) votedPost.votesDown.push(userName);
      if (indexVoteUp !== -1) votedPost.votesUp.splice(indexVoteUp, 1);
    }
    this.props.vote(votedPost);
  };

  render() {
    const postItems = this.props.posts.map(post => (
      <Post
        key={post.id}
        post={post}
        onVote={this.handleVote}
        userName={this.props.user}
      />
    ));
    return (
      <div className="posts-container">
        <div className="posts-inner-container">
          <h1>
            Autoddit Links
            <span>
              <NavLink to="/add-new-post">
                <button>Create Link</button>
              </NavLink>
            </span>
          </h1>

          {postItems}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
  user: state.users.currentUser
});

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  user: PropTypes.string.isRequired,
  vote: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { vote }
)(Posts);
