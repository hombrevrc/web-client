import React, { Fragment, PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { formartChartMinValue } from "shared/components/chart/chart-components/chart-components.helpers";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import { DEFAULT_PERIOD } from "shared/components/chart/chart-period/chart-period.helpers";
import DashboardChartLoader from "shared/components/dashboard/dashboard-chart-loader/dashboard-chart-loader";
import DashboardChartStatsLoader from "shared/components/dashboard/dashboard-chart-loader/dashboard-chart-stats-loader";

import { getPortfolioChart } from "../../../services/dashboard-chart.service";
import DashboardPortfolioChart from "./dashboard-portfolio-chart";
import DashboardPortfolioChartStat from "./dashboard-portfolio-chart-stat";

const composeBalanceChartData = balanceChart => {
  const balance = balanceChart.map(x => ({
    date: x.date.getTime(),
    balance: formartChartMinValue(x.value)
  }));
  return balance;
};

const composeAssetsChartData = assetsChart => {
  const assets = assetsChart.map(x => {
    let assetsCount = 0;
    const newAsset = {
      date: x.date.getTime(),
      value: formartChartMinValue(x.value)
    };
    x.topAssets.forEach(asset => {
      newAsset[`asset${assetsCount++}`] = {
        value: formartChartMinValue(asset.value),
        asset
      };
    });
    if (x.otherAssetsValue) {
      newAsset[`asset${assetsCount}`] = {
        value: x.otherAssetsValue.value,
        asset: {
          title: "Others",
          value: formartChartMinValue(x.otherAssetsValue.value),
          changePercent: x.otherAssetsValue.changePercent,
          changeValue: x.otherAssetsValue.changeValue
        }
      };
    }

    return newAsset;
  });

  return assets;
};

class DashboardPortfolioChartContainer extends PureComponent {
  state = {
    period: DEFAULT_PERIOD
  };

  componentDidMount() {
    const { period } = this.state;
    this.props.service.getPortfolioChart(period.start, period.end);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currency !== this.props.currency) {
      this.props.service.getPortfolioChart(
        this.state.period.start,
        this.state.period.end
      );
    }
  }

  handleChangePeriod = period => {
    this.props.service.getPortfolioChart(period.start, period.end);
    this.setState({ period });
  };

  render() {
    const { data, currency, isPending } = this.props;
    const { period } = this.state;
    if (isPending || !data)
      return (
        <Fragment>
          <DashboardChartStatsLoader />
          <DashboardChartLoader />
        </Fragment>
      );
    return (
      <Fragment>
        <DashboardPortfolioChartStat
          currency={currency}
          value={data.value}
          valueCurrency={data.valueCurrency}
          changePercent={data.changePercent}
          changeValue={data.changeValue}
          changeValueCurrency={data.changeValueCurrency}
        />
        {!!data.balanceChart.length && (
          <ChartPeriod period={period} onChange={this.handleChangePeriod} />
        )}
        <div className="dashboard-portfolio-chart-section__chart">
          <DashboardPortfolioChart
            assets={composeAssetsChartData(data.investedProgramsInfo)}
            balance={composeBalanceChartData(data.balanceChart)}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { data, isPending } = state.dashboard.portfolioChartData;
  const { currency } = state.accountSettings;
  return { data, isPending, currency };
};

const mapDispatchToProps = dispatch => {
  return {
    service: bindActionCreators({ getPortfolioChart }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPortfolioChartContainer);
