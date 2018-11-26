import "./wallet-add-funds-form.scss";

import React, { Component } from "react";
import { connect } from "react-redux";
import Dialog from "shared/components/dialog/dialog";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { walletApiProxy } from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";

import WalletAddFundsForm from "./wallet-add-funds-form";

class WalletAddFundsContainer extends Component {
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

const mapDispatchToProps = dispatch => ({
  notifySuccess: text => dispatch(alertMessageActions.success(text)),
  notifyError: text => dispatch(alertMessageActions.error(text))
});

export default connect(
  null,
  mapDispatchToProps
)(WalletAddFundsContainer);
