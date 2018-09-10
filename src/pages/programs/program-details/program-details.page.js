import "./program-details.scss";

import Page from "components/page/page";
import React from "react";
import { translate } from "react-i18next";

import ProgramDetailsChartContainer from "./components/program-details-chart/program-details-chart-container";
import ProgramDetailsDescriptionContainer from "./components/program-details-description/program-details-description-container";
import ProgramDetailsHistoryContainer from "./components/program-details-history/program-details-history-container";

const ProgramDetailsPage = ({ t }) => {
  return (
    <Page title={t("program-details-page.title")}>
      <div className="program-details">
        <div className="program-details__description">
          <ProgramDetailsDescriptionContainer />
        </div>
        <div className="program-details__chart">
          <ProgramDetailsChartContainer />
        </div>
        <div className="program-details__history">
          <ProgramDetailsHistoryContainer />
        </div>
      </div>
    </Page>
  );
};

export default translate()(ProgramDetailsPage);
