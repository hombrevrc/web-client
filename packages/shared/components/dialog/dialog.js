import { CloseIcon } from "shared/components/icon/close-icon";
import { GVButton } from "gv-react-components";
import { Scrollbars } from "react-custom-scrollbars";
import { translate } from "react-i18next";
import classnames from "classnames";
import EventListener from "react-event-listener";
import Modal from "shared/components/modal/modal";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./dialog.scss";

class Dialog extends Component {
  componentDidMount() {
    this.myRef = ReactDOM.findDOMNode(this);
  }

  handleKeyPress = event => {
    const { onClose } = this.props;

    //Esc
    if (event.keyCode === 27) {
      onClose(event);
    }
  };
  render() {
    const { t, open, onClose, className, children, wider } = this.props;
    return (
      <Modal open={open} fixed disableBackdropClick>
        <EventListener target={document} onKeyUp={this.handleKeyPress} />
        <Scrollbars>
          <div className="dialog__content">
            <div className="dialog__background" />
            <div className="dialog__backdrop" onClick={onClose} />
            <GVButton
              variant="text"
              color="secondary"
              className={classnames("dialog__close dialog__close--outside", {
                "dialog__close--wider": wider
              })}
              onClick={onClose}
            >
              <CloseIcon /> {t("buttons.close")}
            </GVButton>
            <div className={classnames("dialog", className)} ref={this.myRef}>
              <GVButton
                variant="text"
                color="secondary"
                className="dialog__close dialog__close--inside"
                onClick={onClose}
              >
                <CloseIcon />
              </GVButton>
              {children}
            </div>
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
