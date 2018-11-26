import PropTypes from "prop-types";
import React, { Component } from "react";
import Dialog from "shared/components/dialog/dialog";
import { walletApiProxy } from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";

import WalletAddFundsForm from "./components/wallet-add-funds-form";

class WalletAddFundsPopup extends Component {
  handleClose = () => {
    this.props.onClose();
  };

  state = {
    isPending: false,
    data: null
  };

  componentDidMount() {
    this.setState({ isPending: true });
    walletApiProxy
      .v10WalletAddressesGet(authService.getAuthArg())
      .then(data => this.setState({ ...data }));
  }

  render() {
    if (!this.state.data) return null;
    const { wallets } = this.state.data;
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <WalletAddFundsForm
          wallets={wallets}
          notifySuccess={this.props.notifySuccess}
          notifyError={this.props.notifyError}
        />
      </Dialog>
    );
  }
}

WalletAddFundsPopup.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

export default WalletAddFundsPopup;
