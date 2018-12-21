import copy from "copy-to-clipboard";
import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import GVqr from "shared/components/gv-qr/gv-qr";
import CopyIcon from "shared/components/icon/copy-icon";
import Select from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { convertToCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue, validateFraction } from "shared/utils/formatter";

const MAX_AMOUNT_GVT = 4436644;
const MAX_AMOUNT_DEFAULT = 1000000;

class WalletAddFundsForm extends Component {
  state = {
    currentAmount: ""
  };

  onCopy = () => {
    const { t, notifySuccess, notifyError } = this.props;
    try {
      copy(address);
      notifySuccess(t("wallet-add-funds.copy-to-clipboard-success"));
    } catch (error) {
      notifyError(t("wallet-add-funds.copy-to-clipboard-error"));
    }
  };

  isAllow = (values, currency) => {
    const { formattedValue } = values;
    const maxAmount = currency === "GVT" ? MAX_AMOUNT_GVT : MAX_AMOUNT_DEFAULT;
    return formattedValue === "" ||
      validateFraction(formattedValue, currency) &&
      formattedValue <= maxAmount;
  };

  onChangeCurrency = (name, target) => {
    const { setFieldValue } = this.props;
    setFieldValue("currency", target.props.value);
    this.setState({ currentAmount: "" });
  };

  onChangeAmount = (event) => {
    this.setState({ currentAmount: event.target.value });
  };

  render() {
    const { t, values, wallets } = this.props;
    const { currentAmount } = this.state;
    const selected = wallets.find(w => w.currency === values.currency) || {};
    const { address = "", currency = null, rateToGVT = null } = selected;
    return (
      <form id="add-funds" className="wallet-add-funds-popup">
        <div className="dialog__top">
          <div className="dialog__header">
            <h2>{t("wallet-add-funds.title")}</h2>
          </div>
          <div className="dialog-field">
            <GVFormikField
              name="currency"
              component={GVTextField}
              label={t("wallet-add-funds.select-currency")}
              InputComponent={Select}
              onChange={this.onChangeCurrency}
            >
              {wallets.map(wallet => {
                const { description, currency } = wallet;
                return (
                  <option
                    value={currency}
                    key={currency}
                  >{`${description} | ${currency}`}</option>
                );
              })}
            </GVFormikField>
          </div>
          <GVFormikField
            name="amount"
            label={t("wallet-add-funds.will-send")}
            component={GVTextField}
            adornment={currency}
            autoComplete="off"
            autoFocus
            InputComponent={NumberFormat}
            allowNegative={false}
            isAllowed={this.isAllow}
            onChange={this.onChangeAmount}
            value={currentAmount}
          />
          {currency !== "GVT" && (
            <div className="gv-text-field__wrapper">
            <StatisticItem
              big
              label={t("wallet-add-funds.will-get")}
            >
              <NumberFormat
                value={formatCurrencyValue(
                  convertToCurrency(currentAmount, rateToGVT),
                  "GVT"
                )}
                suffix=" GVT"
                displayType="text"
              />
            </StatisticItem>
          </div>)}
        </div>
        <div className="dialog__bottom wallet-add-funds-popup__bottom">
          <GVqr className="wallet-add-funds-popup__qr" value={address} />
          <StatisticItem
            className="wallet-add-funds-popup__address"
            label={t("wallet-add-funds.deposit-address")}
          >
            {address}
          </StatisticItem>
          <GVButton color="secondary" onClick={this.onCopy} disabled={!address}>
            <CopyIcon />
            &nbsp;
            {t("buttons.copy")}
          </GVButton>
          {currency !== "GVT" && currency !== null && (
            <div className="dialog__info">
              {t("wallet-add-funds.disclaimer", { currency })}
            </div>
          )}
        </div>
      </form>
    );
  }
}

WalletAddFundsForm.propTypes = {
  wallets: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.string,
      currency: PropTypes.string,
      rateToGVT: PropTypes.number,
      description: PropTypes.string,
      logo: PropTypes.string
    })
  ),
  t: PropTypes.func
};

export default compose(
  translate(),
  withFormik({
    displayName: "add-funds",
    mapPropsToValues: props => {
      let currency = "GVT";
      if (!props.wallets.find(wallet => wallet.currency === currency)) {
        currency = props.wallets[0] ? props.wallets[0].currency : "";
      }
      return {
        currency,
        amount: ""
      };
    }
  })
)(WalletAddFundsForm);
