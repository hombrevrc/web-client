import "./2fa.scss";

import classnames from "classnames";
import { GVTextField } from "gv-react-components";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { fetchTwoFactor } from "shared/actions/2fa-actions";
import Dialog from "shared/components/dialog/dialog";
import Select from "shared/components/select/select";

import DisableAuthContainer from "./disable-auth/disable-auth-container";
import GenerateRecoveryCode from "./google-auth/generate-recovery-codes/generate-recovery-codes";
import GoogleAuthContainer from "./google-auth/google-auth-container";

const components = {
  google: <GoogleAuthContainer />,
  disable: <DisableAuthContainer />
};

class TwoFactorAuthContainer extends Component {
  state = {
    isPending: false,
    component: null
  };

  handleChange = event => {
    this.setState({ component: components[event.target.value] });
  };

  handleClose = () => {
    this.setState({ component: null });
  };

  handleSubmit = () => {
    this.props.services.fetchTwoFactor();
  };

  render() {
    const { t, twoFactorAuth } = this.props;
    const { component } = this.state;

    if (!twoFactorAuth.data) return null;

    return (
      <div className="two-factor">
        <h3 className="two-factor__title">{t("2fa-page.title")}</h3>
        <GVTextField
          name="2fa"
          label={t("2fa-page.type")}
          value={twoFactorAuth.data.twoFactorEnabled ? "google" : "disable"}
          onChange={this.handleChange}
          InputComponent={Select}
          disabled={twoFactorAuth.isPending}
        >
          <option value={"disable"}>{t("2fa-page.none")}</option>
          <option value={"google"}>{t("2fa-page.google")}</option>
        </GVTextField>
        <GenerateRecoveryCode disabled={twoFactorAuth.data.twoFactorEnabled} />
        <Dialog
          className={classnames({
            "dialog--width-auto": !twoFactorAuth.data.twoFactorEnabled
          })}
          open={Boolean(this.state.component)}
          onClose={this.handleClose}
        >
          {component && <component.type onSubmit={this.handleSubmit} />}
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  twoFactorAuth: state.accountSettings.twoFactorAuth
});
const mapDispatchToProps = dispatch => ({
  services: bindActionCreators({ fetchTwoFactor }, dispatch)
});
export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TwoFactorAuthContainer);
