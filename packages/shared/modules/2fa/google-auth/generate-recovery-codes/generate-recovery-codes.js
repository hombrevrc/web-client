import { GVButton } from "gv-react-components";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import Dialog from "shared/components/dialog/dialog";
import authApi from "shared/services/api-client/auth-api";
import authService from "shared/services/auth-service";

import GoogleAuthCodes from "../google-auth-codes";
import GenerateRecoveryWithFormik from "./generate-recovery-form";

class GenerateRecoveryCode extends Component {
  state = {
    isOpenPopup: false,
    isPending: false,
    data: null,
    errorMessage: null
  };
  handleClick = () => {
    this.setState({ isOpenPopup: true });
  };
  handleClose = () => {
    this.setState({ isOpenPopup: false, data: null });
  };
  handleSubmit = values => {
    this.setState({ isPending: true });
    authApi
      .v10Auth2faRecoverycodesNewPost(authService.getAuthArg(), {
        model: values
      })
      .then(data => this.setState({ data }))
      .catch(data => this.setState({ data }));
  };

  render() {
    if (!this.props.disabled) return null;
    return (
      <div className="generate-recovery-codes">
        <GVButton variant="text" type="button" onClick={this.handleClick}>
          {this.props.t("2fa-page.codes.generate-recovery-codes")}
        </GVButton>
        <Dialog open={this.state.isOpenPopup} onClose={this.handleClose}>
          {this.state.data ? (
            <GoogleAuthCodes codes={this.state.data.codes} />
          ) : (
            <GenerateRecoveryWithFormik
              onSubmit={this.handleSubmit}
              disabled={this.state.isPending}
              errorMessage={this.state.errorMessage}
            />
          )}
        </Dialog>
      </div>
    );
  }
}

GenerateRecoveryCode.propTypes = {
  disabled: PropTypes.bool
};

export default translate()(GenerateRecoveryCode);
