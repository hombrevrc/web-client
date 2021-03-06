import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";
import {
  calculateValueOfEntryFee,
  convertFromCurrency
} from "shared/utils/currency-converter";
import {
  formatCurrencyValue,
  formatValue,
  validateFraction
} from "shared/utils/formatter";
import { number, object } from "yup";

const DepositForm = ({
  t,
  program,
  entryFee,
  values,
  info,
  currency,
  disabled,
  handleSubmit,
  errorMessage
}) => {
  const fee = calculateValueOfEntryFee(values.amount, info.entryFee);
  const gvFee = calculateValueOfEntryFee(values.amount, info.gvCommission);
  const investAmount =
    parseFloat(values.amount || 0) -
    parseFloat(gvFee) -
    (entryFee ? parseFloat(fee) : 0);
  const isAllow = values => {
    const { floatValue, formattedValue } = values;
    const { availableInWallet } = info;
    const fee = calculateValueOfEntryFee(floatValue, info.entryFee);
    const gvFee = calculateValueOfEntryFee(floatValue, info.gvCommission);
    return (
      formattedValue === "" ||
      (validateFraction(formattedValue, "GVT") &&
        floatValue <=
          parseFloat(availableInWallet - gvFee - (entryFee ? fee : 0)))
    );
  };

  return (
    <form className="dialog__bottom" id="invest-form" onSubmit={handleSubmit}>
      <GVFormikField
        className="invest-field"
        name="amount"
        label={program ? t("deposit-asset.amount") : t("deposit-asset.amount")}
        component={GVTextField}
        adornment="GVT"
        autoComplete="off"
        autoFocus
        InputComponent={NumberFormat}
        allowNegative={false}
        isAllowed={isAllow}
      />
      <div className="invest-popup__currency">
        <NumberFormat
          value={formatCurrencyValue(
            convertFromCurrency(values.amount, info.rate),
            currency
          )}
          prefix="= "
          suffix={` ${currency}`}
          displayType="text"
        />
      </div>
      <ul className="dialog-list">
        {entryFee && (
          <li className="dialog-list__item">
            <span className="dialog-list__title">
              {program
                ? t("deposit-asset.entry-fee")
                : t("deposit-asset.entry-fee")}
            </span>
            <span className="dialog-list__value">
              {info.entryFee} %{" "}
              <NumberFormat
                value={formatValue(fee)}
                prefix=" ("
                suffix={" GVT)"}
                displayType="text"
              />
            </span>
          </li>
        )}
        <li className="dialog-list__item">
          <span className="dialog-list__title">
            {program
              ? t("deposit-asset.gv-commission")
              : t("deposit-asset.gv-commission")}
          </span>
          <span className="dialog-list__value">
            {info.gvCommission} %
            <NumberFormat
              value={formatValue(gvFee)}
              prefix={" ("}
              suffix={" GVT)"}
              displayType="text"
            />
          </span>
        </li>
        <li className="dialog-list__item">
          <span className="dialog-list__title">
            {program
              ? t("deposit-asset.investment-amount")
              : t("deposit-asset.investment-amount")}
          </span>
          <span className="dialog-list__value">
            <NumberFormat
              value={formatValue(investAmount)}
              suffix={" GVT"}
              displayType="text"
            />
          </span>
        </li>
      </ul>
      <div className="form-error">
        <FormError error={errorMessage} />
      </div>
      <div className="dialog__buttons">
        <GVButton
          type="submit"
          id="signUpFormSubmit"
          className="invest-form__submit-button"
          disabled={disabled}
        >
          {program ? t("deposit-asset.confirm") : t("deposit-asset.confirm")}
        </GVButton>
      </div>
    </form>
  );
};

export default compose(
  translate(),
  withFormik({
    displayName: "invest-form",
    mapPropsToValues: () => ({
      amount: ""
    }),
    validationSchema: ({ t, info }) =>
      object().shape({
        amount: number()
          .min(
            info.minInvestmentAmount,
            t("deposit-asset.validation.amount-min-value", {
              min: info.minInvestmentAmount
            })
          )
          .max(
            info.availableInWallet,
            t("deposit-asset.validation.amount-more-than-available")
          )
          .required(t("deposit-asset.validation.amount-is-required"))
      }),
    handleSubmit: (values, { props }) => {
      props.onSubmit(values.amount);
    }
  })
)(DepositForm);
