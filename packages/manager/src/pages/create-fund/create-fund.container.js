import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { goBack } from "react-router-redux";
import { bindActionCreators, compose } from "redux";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";

import CreateFundSettings from "./components/create-fund-settings/create-fund-settings";
import * as createFundService from "./services/create-fund.service";

class CreateFundContainer extends Component {
  state = {
    isPending: true,
    isNavigationDialogVisible: false,
    assets: null
  };

  componentDidMount() {
    createFundService
      .fetchAssets()
      .then(response => {
        this.setState({ assets: response.assets });
      })
      .then(() => {
        createFundService.fetchInvestmentAmount().then(response => {
          this.setState({
            deposit: response,
            isPending: false
          });
        });
      });
  }

  handleSubmit = (values, setSubmitting) => {
    this.props.service.createFund({ ...values }, setSubmitting);
  };

  handleValidateError = () => {
    this.props.service.showValidationError();
  };

  navigateBack = () => {
    this.setState({ isNavigationDialogVisible: true });
  };

  render() {
    const {
      isPending,
      isNavigationDialogVisible,
      assets,
      deposit
    } = this.state;
    const { navigateBack, handleSubmit } = this;
    const { t, author, service, platformSettings } = this.props;
    if (!platformSettings) return null;
    return (
      <div className="create-fund-container">
        <div>
          {!isPending && (
            <CreateFundSettings
              onValidateError={this.handleValidateError}
              navigateBack={navigateBack}
              updateBalance={service.fetchBalance}
              onSubmit={handleSubmit}
              author={author}
              assets={assets}
              deposit={deposit}
              programsInfo={platformSettings.programsInfo}
            />
          )}
          <ConfirmPopup
            open={isNavigationDialogVisible}
            onClose={() => this.setState({ isNavigationDialogVisible: false })}
            onApply={service.goBack}
            body={t("manager.create-fund-page.navigation-back-text")}
            applyButtonText={t("buttons.continue")}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const headerData = state.profileHeader.info.data;
  return {
    author: headerData ? headerData.name : "",
    platformSettings: state.platformData.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    service: bindActionCreators({ goBack, ...createFundService }, dispatch)
  };
};

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CreateFundContainer);
