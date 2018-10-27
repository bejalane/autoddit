import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CommentForm from "./commentForm";
import { hideModal } from "../actions/modalActions";

class Modal extends Component {
  onDialogClick(event) {
    event.stopPropagation();
  }

  handleClose = () => {
    this.props.hideModal();
  };

  render() {
    return (
      <div
        className={
          this.props.modalProps.showModal ? "modal-open" : "modal-closed"
        }
      >
        <div className="modal-overlay-div" />
        <div className="modal-content-div" onClick={this.handleClose}>
          <div className="modal-dialog-div" onClick={this.onDialogClick}>
            <CommentForm
              postId={this.props.modalProps.settings.id}
              pathIndexes={this.props.modalProps.settings.path}
              onClose={this.handleClose}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  modalProps: state.modal
});

Modal.propTypes = {
  hideModal: PropTypes.func.isRequired
};

Modal.propTypes = {
  hideModal: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { hideModal }
)(Modal);
