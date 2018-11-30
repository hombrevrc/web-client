import React, { Fragment } from "react";
import NumberFormat from "react-number-format";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatValue } from "shared/utils/formatter";

import FundBalanceChart from "./fund-balance-chart";

const ProgramBalanceChartSection = ({
  balanceChartData,
  period,
  onPeriodChange,
  currency
}) => {
  const { data: balanceChart } = balanceChartData;
  if (!balanceChart) return null;
  return (
    <Fragment>
      <div className="details-chart__value">
        <StatisticItem
          label={"Value"}
          equivalent={balanceChart.programCurrencyBalance}
          equivalentCurrency={balanceChart.programCurrency}
          big
          accent
        >
          <NumberFormat
            value={formatValue(balanceChart.gvtBalance)}
            thousandSeparator={" "}
            displayType="text"
            suffix={" GVT"}
          />
        </StatisticItem>
        {/* <StatisticItem
          heading={"Change"}
          value={changeValue}
          equivalent={"???"}
          currency={"???"}
          className="details-chart__stat-item"
        /> */}
      </div>
      <ChartPeriod onChange={onPeriodChange} period={period} />
      <div className="details-chart__profit">
        <FundBalanceChart
          balanceChart={balanceChart.balanceChart}
          currency={"BTC"}
        />
      </div>
    </Fragment>
  );
};

export default ProgramBalanceChartSection;
