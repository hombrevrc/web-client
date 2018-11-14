import "./dialog.scss";

import classnames from "classnames";
import { CloseIcon } from "shared/components/icon/close-icon";
import Modal from "shared/components/modal/modal";
import { GVButton } from "gv-react-components";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { translate } from "react-i18next";
import posed from "react-pose";

const DialogBox = posed.div({
  opened: {
    transform: "scale(1)",
    opacity: 1,
    transition: { duration: 300 }
  },
  closed: {
    transform: "scale(0)",
    opacity: 0,
    transition: { duration: 300 }
  }
});

class Dialog extends Component {
  state = {
    isOpen: false
  };
  handleOpen = () => {
    this.setState({ isOpen: true });
  };
  handleClose = () => {
    this.setState({ isOpen: false });
  };
  handlePoseComplete = event => {
    if (event === "closed") {
      this.props.onClose();
    }
  };
  render() {
    const { t } = this.props;
    return (
      <Modal
        open={this.props.open}
        fixed
        disableBackdropClick
        handleOpen={this.handleOpen}
      >
        <Scrollbars>
          <div className="dialog__content">
            <div className="dialog__background" />
            <div className="dialog__backdrop" onClick={this.handleClose} />
            <GVButton
              variant="text"
              color="secondary"
              className="dialog__close dialog__close--outside"
              onClick={this.handleClose}
            >
              <CloseIcon /> {t("buttons.close")}
            </GVButton>
            <DialogBox
              className={classnames("dialog", this.props.className)}
              pose={this.state.isOpen ? "opened" : "closed"}
              onPoseComplete={this.handlePoseComplete}
            >
              <GVButton
                variant="text"
                color="secondary"
                className="dialog__close dialog__close--inside"
                onClick={this.handleClose}
              >
                <CloseIcon />
              </GVButton>
              {this.props.top && (
                <div className="dialog__top">{this.props.top}</div>
              )}
              {this.props.children}
              {this.props.bottom && (
                <div className="dialog__bottom">{this.props.bottom}</div>
              )}
            </DialogBox>
          </div>
        </Scrollbars>
      </Modal>
    );
  }
}

Dialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  top: PropTypes.element,
  bottom: PropTypes.element,
  className: PropTypes.string
};

export default translate()(Dialog);
