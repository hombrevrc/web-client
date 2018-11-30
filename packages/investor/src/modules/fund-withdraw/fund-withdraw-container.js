import {
  alert,
  getFundWithdrawInfo,
  withdrawFundById
} from "modules/fund-withdraw/servives/fund-withdraw.services";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { bindActionCreators } from "redux";
import Dialog from "shared/components/dialog/dialog";
import FundWithdrawPopup from "shared/components/fund-withdraw/fund-withdraw-popup";
import { investorApiProxy } from "shared/services/api-client/investor-api";
import authService from "shared/services/auth-service";

class FundWithdrawContainer extends PureComponent {
  handleWithdraw = (id, percent) => {
    return investorApiProxy
      .v10InvestorFundsByIdWithdrawByPercentPost(
        id,
        percent,
        authService.getAuthArg()
      )
      .then(res => {
        this.props.onClose();
        this.props.services.alert(
          "success",
          "withdraw-fund.success-alert-message",
          true
        );
        return res;
      });
  };

  render() {
    const {
      open,
      onClose,
      services,
      id,
      assetCurrency,
      accountCurrency
    } = this.props;
    return (
      <Dialog open={open} onClose={onClose}>
        <FundWithdrawPopup
          fundCurrency={assetCurrency}
          accountCurrency={accountCurrency}
          fetchInfo={() => services.getFundWithdrawInfo(id)}
          withdraw={percent => this.handleWithdraw(id, percent)}
        />
      </Dialog>
    );
  }
}

FundWithdrawContainer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  id: PropTypes.string
};

const mapStateToProps = state => ({
  accountCurrency: state.accountSettings.currency
});

const mapDispathToProps = dispatch => ({
  services: bindActionCreators(
    {
      getFundWithdrawInfo,
      withdrawFundById,
      alert
    },
    dispatch
  )
});

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispathToProps
  )
)(FundWithdrawContainer);
