import "shared/components/details/details-description-section/details-statistic-section/details-chart-section/details-chart-section.scss";

import { GVTab, GVTabs } from "gv-react-components";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import Surface from "shared/components/surface/surface";

import ProgramBalanceChartSection from "./program-balance-chart-section/program-profit-chart-section";
import ProgramProfitChartSection from "./program-profit-chart-section/program-profit-chart-section";

const PROFIT_TAB = "profit";
const BALANCE_TAB = "balance";
class ProgramDetailsChartSection extends PureComponent {
  state = {
    tab: PROFIT_TAB
  };

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };
  render() {
    const {
      t,
      period,
      onPeriodChange,
      profitChartData,
      balanceChartData
    } = this.props;

    const { tab } = this.state;

    return (
      <Surface className="surface--horizontal-paddings details-chart">
        <h3>{t("program-details-page.chart.heading")}</h3>
        <GVTabs value={tab} onChange={this.handleTabChange}>
          <GVTab
            value={PROFIT_TAB}
            label={t("program-details-page.chart.tabs.profit")}
          />
          <GVTab
            value={BALANCE_TAB}
            label={t("program-details-page.chart.tabs.balance")}
          />
        </GVTabs>
        {tab === PROFIT_TAB && (
          <ProgramProfitChartSection
            profitChartData={profitChartData}
            period={period}
            onPeriodChange={onPeriodChange}
          />
        )}
        {tab === BALANCE_TAB && (
          <ProgramBalanceChartSection
            balanceChartData={balanceChartData}
            period={period}
            onPeriodChange={onPeriodChange}
          />
        )}
      </Surface>
    );
  }
}

export default translate()(ProgramDetailsChartSection);
