import { NOT_FOUND_PAGE_ROUTE } from "pages/not-found/not-found.routes";
import { PureComponent } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { replace } from "react-router-redux";
import { bindActionCreators, compose } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

import * as walletWithdrawConfirmService from "./services/wallet-withdraw-confirm.services";

class EmailConfirmContainer extends PureComponent {
  componentDidMount() {
    const { t, queryParams, service, showNotFoundPage } = this.props;
    if (queryParams.requestId && queryParams.code) {
      service
        .confirmWithdraw(queryParams.requestId, queryParams.code)
        .then(() => {
          service.notifySuccess(t("wallet-withdraw.confirmation.success"));
        })
        .catch(error => {
          service.notifyError(
            t("wallet-withdraw.confirmation.error") + error.errorMessage
          );
        });
    } else {
      showNotFoundPage();
    }
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(
    {
      ...walletWithdrawConfirmService,
      notifySuccess: alertMessageActions.success,
      notifyError: alertMessageActions.error
    },
    dispatch
  ),
  showNotFoundPage: () => dispatch(replace(NOT_FOUND_PAGE_ROUTE))
});

export default compose(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(EmailConfirmContainer);
