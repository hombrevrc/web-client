import React from "react";
import { translate } from "react-i18next";
import PortfolioEventsTableContainer from "shared/components/portfolio-events-table/portfolio-events-table-container";

import { fetchPortfolioEvents } from "../../services/dashboard-events.services";

export const PORTFOLIO_EVENTS_ALL_PAGE_ROUTE = "portfolio-events";
const PortfolioEventsAllComponent = ({ t }) => {
  return (
    <PortfolioEventsTableContainer
      fetchPortfolioEvents={fetchPortfolioEvents}
      pageTitle={t(
        `${
          process.env.REACT_APP_PLATFORM
        }.dashboard-page.portfolio-events.title`
      )}
      tableTitle={t(
        `${
          process.env.REACT_APP_PLATFORM
        }.dashboard-page.portfolio-events.table-title`
      )}
      className="portfolio-events-all-table"
      dateRangeStartLabel={t("filters.date-range.account-creation")}
    />
  );
};

export default translate()(PortfolioEventsAllComponent);
