import "./dashboard-portfolio-event.scss";

import * as moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import NumberFormat from "react-number-format";
import PortfolioEventLogo from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import Profitability from "shared/components/profitability/profitability";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatValue } from "shared/utils/formatter";

import { isUseProfitability } from "../../helpers/dashboard-portfolio.helpers";

const formatDate = date => {
  const now = moment(new Date());
  const eventCreationDate = moment(date);

  const dayDifference = moment(now).diff(eventCreationDate, "days");
  const isShowFullDate = dayDifference > 1;

  if (isShowFullDate) return eventCreationDate.format("DD MMM YYYY, HH:MM a");

  return eventCreationDate.fromNow();
};

const DashboardPortfolioEvent = ({ event }) => {
  const eventDescription = () => (
    <div className="portfolio-event__values-container">
      <div className="portfolio-event__description">{event.description}</div>
      <span className="portfolio-event__value">
        {isUseProfitability(event) ? (
          <Profitability value={event.value} prefix="sign">
            <NumberFormat
              value={formatValue(event.value)}
              displayType="text"
              allowNegative={false}
              suffix={` ${event.currency}`}
            />
          </Profitability>
        ) : (
          <NumberFormat
            value={formatValue(event.value)}
            displayType="text"
            suffix={` ${event.currency}`}
          />
        )}
      </span>
    </div>
  );

  return (
    <div className="portfolio-event">
      <PortfolioEventLogo
        type={event.type}
        logo={event.logo}
        color={event.color}
      />
      <div className="portfolio-event__info">
        <StatisticItem label={formatDate(event.date)}>
          {eventDescription()}
        </StatisticItem>
      </div>
    </div>
  );
};

export const DashboardPortfolioEventShape = PropTypes.shape({
  date: PropTypes.instanceOf(Date).isRequired,
  description: PropTypes.string,
  value: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  logo: PropTypes.string
});

DashboardPortfolioEvent.propTypes = {
  event: DashboardPortfolioEventShape
};

export default DashboardPortfolioEvent;
