import "./fund-details-statistics.scss";

import moment from "moment";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";

import { ChartPeriodType } from "shared/components/chart/chart-period/chart-period.helpers";
import Surface from "shared/components/surface/surface";
import DetailsStatisticItem from "../../../../details-statistic-item/details-statistic-item";

const FundDetailsStatistics = ({ t, statisticData, period }) => {
  const { data: statistic, isPending } = statisticData;
  if (!statistic || isPending) return null;
  return (
    <Surface className="fund-details-statistics">
      <div className="fund-details-statistics__heading">
        {t("fund-details-page.statistics.heading")}
      </div>
      <div className="fund-details-statistics__subheading">
        {t("fund-details-page.statistics.current")}
      </div>
      <div className="fund-details-statistics__particular-information">
        <div className="fund-details-statistics__vertical-info-block">
          <DetailsStatisticItem
            label={t("fund-details-page.statistics.balance")}
            accent
          >
            <NumberFormat
              value={statistic.balance}
              thousandSeparator={" "}
              displayType="text"
              decimalScale={2}
              suffix={" GVT"}
            />
          </DetailsStatisticItem>
          <DetailsStatisticItem
            label={t("fund-details-page.statistics.start-day")}
          >
            {moment(statistic.creationDate).format("D MMM YYYY")}
          </DetailsStatisticItem>
        </div>
        <div className="fund-details-statistics__vertical-info-block">
          <DetailsStatisticItem
            label={t("fund-details-page.statistics.investors")}
          >
            <NumberFormat
              value={statistic.investors}
              thousandSeparator={" "}
              displayType="text"
            />
          </DetailsStatisticItem>
        </div>
      </div>
      <div className="fund-details-statistics__subheading">
        {t("fund-details-page.statistics.for")}{" "}
        {t(`chart-period.${ChartPeriodType[period.type]}`)}
      </div>
      <div className="fund-details-statistics__particular-information">
        <div className="fund-details-statistics__column">
          <DetailsStatisticItem
            label={t("fund-details-page.statistics.calmarRatio")}
            half
          >
            <NumberFormat
              value={
                statistic.calmarRatio !== null ? statistic.calmarRatio : "-"
              }
              displayType="text"
              decimalScale={2}
            />
          </DetailsStatisticItem>
          <DetailsStatisticItem
            label={t("fund-details-page.statistics.profit-change")}
            half
          >
            <NumberFormat
              value={
                statistic.profitChangePercent !== null
                  ? statistic.profitChangePercent
                  : "-"
              }
              displayType="text"
              suffix="%"
              decimalScale={2}
            />
          </DetailsStatisticItem>
          <DetailsStatisticItem
            label={t("fund-details-page.statistics.max-drawdown")}
            half
          >
            <NumberFormat
              value={
                statistic.maxDrawdown !== null ? statistic.maxDrawdown : "-"
              }
              displayType="text"
              suffix="%"
              decimalScale={2}
            />
          </DetailsStatisticItem>
        </div>
        <div className="fund-details-statistics__column">
          <DetailsStatisticItem
            label={t("fund-details-page.statistics.sharpe-ratio")}
            half
          >
            <NumberFormat
              value={
                statistic.sharpeRatio !== null ? statistic.sharpeRatio : "-"
              }
              displayType="text"
              decimalScale={2}
            />
          </DetailsStatisticItem>

          <DetailsStatisticItem
            label={t("fund-details-page.statistics.sortino-ratio")}
            half
          >
            <NumberFormat
              value={
                statistic.sortinoRatio !== null ? statistic.sortinoRatio : "-"
              }
              displayType="text"
              decimalScale={2}
            />
          </DetailsStatisticItem>
        </div>
      </div>
    </Surface>
  );
};

export default translate()(FundDetailsStatistics);