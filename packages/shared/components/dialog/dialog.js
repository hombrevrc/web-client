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

const ContentBox = posed.div({
  enter: {
    opacity: 1,
    transition: { duration: 150 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 150 }
  }
});

class Dialog extends Component {
  state = {
    isOpen: false
  };

  handleOpen = () => {
    this.setState({ isOpen: true });
    this.props.onOpen && this.props.onOpen();
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handlePoseComplete = event => {
    if (event === "exit") {
      this.props.onClose && this.props.onClose();
    }
  };

  render() {
    const { t } = this.props;
    return (
      <Modal
        open={this.props.open}
        fixed
        disableBackdropClick
        onOpen={this.handleOpen}
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
            <ContentBox
              pose={this.props.children && this.state.isOpen ? "enter" : "exit"}
              className={classnames("dialog", this.props.className)}
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
            </ContentBox>
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
