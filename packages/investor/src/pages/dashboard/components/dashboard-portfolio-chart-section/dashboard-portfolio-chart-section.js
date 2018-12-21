import "./dashboard-portfolio-chart-section.scss";

import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import connect from "react-redux/es/connect/connect";
import { compose } from "redux";
import DashboardInRequestsContainer from "shared/components/dashboard/dashboard-portfolio-chart-section/dashboard-in-requests/dashboard-in-requests-container";

import {
  cancelRequest,
  getInRequests
} from "../../services/dashboard-in-requests.service";
import DashboardPortfolioChartContainer from "./dashboard-chart/dashboard-portfolio-chart-container";
import DashboardGetStarted from "./dashboard-get-started";

class DashboardPortfolioChartSection extends Component {
  render() {
    const { t, isNewUser } = this.props;
    if (isNewUser) return <DashboardGetStarted />;

    return (
      <Fragment>
        <h3 className="dashboard-portfolio-chart-section__heading">
          {t("manager.dashboard-page.chart-section.header")}
        </h3>
        <DashboardInRequestsContainer
          cancelRequest={cancelRequest}
          getInRequests={getInRequests}
        />
        <DashboardPortfolioChartContainer />
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  const { info } = state.profileHeader;
  let isNewUser = null;
  if (info.data) {
    isNewUser = info.data.isNewUser;
  }
  return { isNewUser };
};

export default compose(
  translate(),
  connect(mapStateToProps)
)(DashboardPortfolioChartSection);
