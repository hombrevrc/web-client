import "./wallet-balance.scss";

import { GVButton } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";

const WalletBalance = ({
  t,
  handleAddFunds,
  handleWithdraw,
  walletBalanceData,
  currentCurrency
}) => (
  <div className="wallet-balance">
    <h1 className="wallet-balance__heading">{t("wallet.title")}</h1>
    <div className="wallet-balance__statistic">
      <div className="wallet-balance__statistic-item">
        <div className="wallet-balance__statistic-heading">
          {t("wallet.total-balance")}
        </div>
        <div className="wallet-balance__total-balance-value">
          <NumberFormat
            value={walletBalanceData.totalBalanceGVT}
            thousandSeparator={" "}
            displayType="text"
            suffix={" GVT"}
          />
        </div>
        <div className="wallet-balance__statistic-equivalent">
          <NumberFormat
            value={walletBalanceData.totalBalanceCurrency}
            thousandSeparator={" "}
            displayType="text"
            suffix={" " + currentCurrency}
          />
        </div>
      </div>
      <div className="wallet-balance__statistic-item">
        <div className="wallet-balance__statistic-heading">
          {t("wallet.invested-value")}
        </div>
        <div className="wallet-balance__statistic-value">
          <NumberFormat
            value={walletBalanceData.investedGVT}
            thousandSeparator={" "}
            displayType="text"
            suffix={" GVT"}
          />
        </div>
        <div className="wallet-balance__statistic-equivalent">
          <NumberFormat
            value={walletBalanceData.investedCurrency}
            thousandSeparator={" "}
            displayType="text"
            suffix={" " + currentCurrency}
          />
        </div>
      </div>
      <div className="wallet-balance__statistic-item">
        <div className="wallet-balance__statistic-heading">
          {t("wallet.available")}
        </div>
        <div className="wallet-balance__statistic-value">
          <NumberFormat
            value={walletBalanceData.availableGVT}
            thousandSeparator={" "}
            displayType="text"
            suffix={" GVT"}
          />
        </div>
        <div className="wallet-balance__statistic-equivalent">
          <NumberFormat
            value={walletBalanceData.availableCurrency}
            thousandSeparator={" "}
            displayType="text"
            suffix={" " + currentCurrency}
          />
        </div>
      </div>
    </div>
    <div className="wallet-balance__footer">
      <GVButton className="wallet-balance__add-funds" onClick={handleAddFunds}>
        {t("wallet.add-funds")}
      </GVButton>
      <GVButton
        className="wallet-balance__withdraw"
        color="secondary"
        variant="outlined"
        onClick={handleWithdraw}
      >
        {t("wallet.withdraw")}
      </GVButton>
    </div>
  </div>
);

export default translate()(WalletBalance);
