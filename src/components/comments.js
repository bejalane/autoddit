import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Comment from "./comment";
import { vote } from "../actions/commentActions";
import { showModal } from "../actions/modalActions";

class Comments extends Component {
  handleVote = (id, increment, pathIndexes) => {
    const comments = [...this.props.comments];
    let commentBranch = comments.filter(c => c.postId === this.props.postId);
    let res = commentBranch;
    if (pathIndexes) {
      let path = pathIndexes.split("_");
      path = path.map(el => parseInt(el));
      for (let i = 0; i < path.length; i++) {
        if (i < path.length - 1) {
          res = res[path[i]].children;
        } else {
          res = res[path[i]];
        }
      }
    }
    let votedComment = res;
    let userName = this.props.user;
    const indexVoteUp = votedComment.votesUp.indexOf(userName);
    const indexVoteDown = votedComment.votesDown.indexOf(userName);
    if (increment) {
      if (indexVoteDown !== -1) votedComment.votesDown.splice(indexVoteDown, 1);
      if (indexVoteUp === -1) votedComment.votesUp.push(userName);
    } else {
      if (indexVoteDown === -1) votedComment.votesDown.push(userName);
      if (indexVoteUp !== -1) votedComment.votesUp.splice(indexVoteUp, 1);
    }
    this.props.vote(commentBranch);
  };

  handleAddComment = (id, path) => {
    this.props.showModal({ id: id, path: path });
  };

  render() {
    const comments = this.props.comments.filter(
      c => c.postId === this.props.postId
    );

    return (
      <div>
        {comments.map((comment, index) => {
          return (
            <Comment
              key={comment.id}
              comment={comment}
              postId={this.props.postId}
              pathIndexes={this.props.pathIndexes + index}
              onVote={this.handleVote}
              onAddComment={this.handleAddComment}
              userName={this.props.user}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  comments: state.comments.items,
  user: state.users.currentUser
});

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  vote: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  postId: PropTypes.any.isRequired
};

export default connect(
  mapStateToProps,
  { vote, showModal }
)(Comments);
