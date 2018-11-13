import Dialog from "shared/components/dialog/dialog";
import WalletAddFundsPopup from "modules/wallet-add-funds/components/wallet-add-funds-container";
import PropTypes from "prop-types";
import React, { Component } from "react";

class WalletAddFundsContainer extends Component {
  handleClose = () => {
    this.props.onClose();
  };
  render() {
    return (
      <WalletAddFundsPopup
        open={this.props.open}
        onClose={this.props.onClose}
      />
    );
  }
}

WalletAddFundsContainer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

export default WalletAddFundsContainer;
