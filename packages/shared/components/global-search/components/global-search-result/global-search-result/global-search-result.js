import { GVTab, GVTabs } from "gv-react-components";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import Surface from "shared/components/surface/surface";

import FundsTable from "./funds-table";
import ManagersTable from "./managers-table";
import ProgramsTable from "./programs-table";

const PROGRAMS_TABLE_TAB = "investors";
const FUNDS_TABLE_TAB = "funds";
const MANAGERS_TABLE_TAB = "manages";

class GlobalSearchResult extends PureComponent {
  state = {
    tab: PROGRAMS_TABLE_TAB
  };

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  renderTab = () => {
    const { data, title, t } = this.props;
    const { tab } = this.state;
    switch (tab) {
      case MANAGERS_TABLE_TAB:
        return (
          <SearchResultTable t={t} data={data.managers}>
            <ManagersTable title={title} data={data.managers} />
          </SearchResultTable>
        );
      case FUNDS_TABLE_TAB:
        return (
          <SearchResultTable t={t} data={data.funds}>
            <FundsTable title={title} data={data.funds} />
          </SearchResultTable>
        );
      case PROGRAMS_TABLE_TAB:
        return (
          <SearchResultTable t={t} data={data.programs}>
            <ProgramsTable title={title} data={data.programs} />
          </SearchResultTable>
        );
      default:
        return null;
    }
  };

  render() {
    const { t, data } = this.props;
    const { tab } = this.state;
    return (
      <Surface className="global-search-result">
        <h3 className="global-search-result__heading">
          {t("global-search-page.heading")}
        </h3>
        <div className="global-search-result__tabs">
          <GVTabs value={tab} onChange={this.handleTabChange}>
            <GVTab
              value={PROGRAMS_TABLE_TAB}
              label={t("global-search-page.programs")}
              count={data.programs && data.programs.total}
            />
            <GVTab
              value={FUNDS_TABLE_TAB}
              label={t("global-search-page.funds")}
              count={data.funds && data.funds.total}
            />
            <GVTab
              value={MANAGERS_TABLE_TAB}
              label={t("global-search-page.managers")}
              count={data.managers && data.managers.total}
            />
          </GVTabs>
        </div>
        {this.renderTab()}
      </Surface>
    );
  }
}

const SearchResultTable = ({ data, children, t }) =>
  data ? (
    children
  ) : (
    <div className="global-search-result__loading">{t("table.loading")}</div>
  );

export default translate()(GlobalSearchResult);
