import "./dashboard-portfolio-events.scss";

import { GVButton } from "gv-react-components";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

import DashboardPortfolioEvent, {
  DashboardPortfolioEventShape
} from "./dashboard-portfolio-event/dashboard-portfolio-event";
import { compose } from "redux";
import connect from "react-redux/es/connect/connect";

const DashboardPortfolioEvents = ({ t, events, fullEventsUrl, pathname }) => (
  <Fragment>
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      style={{ height: "541px", paddingRight: "10px" }}
      className="dashboard-portfolio-events__scroll-container"
    >
      <div className="dashboard-portfolio-events__list">
        {events.map((event, idx) => (
          <DashboardPortfolioEvent event={event} key={idx} />
        ))}
      </div>
    </Scrollbars>
    <Link
      className="dashboard-portfolio-events__see-all"
      to={{
        pathname: fullEventsUrl,
        state: pathname
      }}
    >
      <GVButton variant="text" color="secondary">
        {t("dashboard.portfolio-events.see-all-button")} &#8250;
      </GVButton>
    </Link>
  </Fragment>
);

DashboardPortfolioEvents.propTypes = {
  events: PropTypes.arrayOf(DashboardPortfolioEventShape).isRequired,
  fullEventsUrl: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  const { pathname } = state.routing.location;
  return { pathname };
};

export default compose(
  translate(),
  connect(mapStateToProps)
)(DashboardPortfolioEvents);
