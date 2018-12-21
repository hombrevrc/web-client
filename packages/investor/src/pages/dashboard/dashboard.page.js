import "shared/components/dashboard/dashboard.scss";

import React from "react";
import { translate } from "react-i18next";
import Page from "shared/components/page/page";
import Surface from "shared/components/surface/surface";

import DashboardAssetsContainer from "./components/dashboard-assets/dashboard-assets-container";
import DashboardChartSection from "./components/dashboard-portfolio-chart-section/dashboard-portfolio-chart-section";
import DashboardPortfolioEventsSection from "./components/dashboard-portfolio-events/dashboard-portfolio-events-section";

const DashboardPage = ({ t }) => {
  const title = t(`${process.env.REACT_APP_PLATFORM}.dashboard-page.title`);
  return (
    <Page title={title}>
      <div className="dashboard">
        <div className="dashboard__row">
          <div className="dashboard__chart">
            <Surface className="dashboard-portfolio-chart-section">
              <DashboardChartSection />
            </Surface>
          </div>
          <div className="dashboard__portfolio-events-aside">
            <DashboardPortfolioEventsSection title={title} />
          </div>
        </div>
        <div className="dashboard__assets">
          <DashboardAssetsContainer title={title} />
        </div>
      </div>
    </Page>
  );
};

export default translate()(DashboardPage);
