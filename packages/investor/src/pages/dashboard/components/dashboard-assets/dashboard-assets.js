import "./dashboard-assets.scss";

import Surface from "shared/components/surface/surface";
import { GVTab, GVTabs } from "gv-react-components";
import React, { Component } from "react";

import { DASHBOARD_FUNDS_COLUMNS } from "shared/components/dashboard/dashboard.constants";
import { getDashboardFunds } from "../../services/dashboard-funds.service";
import DashboardFunds from "shared/components/dashboard/dashboard-assets/dashboard-funds/dashboard-funds";
import DashboardPrograms from "./dashboard-programs/dashboard-programs";
import { bindActionCreators, compose } from "redux";
import { getDashboardPrograms } from "manager-web-portal/src/pages/dashboard/services/dashboard-programs.service";
import { translate } from "react-i18next";
import connect from "react-redux/es/connect/connect";

class DashboardAssets extends Component {
  state = {
    tab: "programs"
  };
  componentDidMount() {
    const { service } = this.props;
    service.getDashboardFunds();
    service.getDashboardPrograms();
  }

  fetchFunds = filters => {
    return getDashboardFunds(filters).then(({ data }) => {
      return { items: data.funds, total: data.total };
    });
  };

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  render() {
    const { tab } = this.state;
    const { title } = this.props;
    return (
      <Surface className="dashboard-assets">
        <div className="dashboard-assets__head">
          <div className="dashboard-assets__title">Assets</div>
          <div className="dashboard-assets__tabs">
            <GVTabs value={tab} onChange={this.handleTabChange}>
              <GVTab value={"programs"} label="Programs" />
              <GVTab value={"funds"} label="Funds" />
            </GVTabs>
          </div>
        </div>
        <div>
          {tab === "programs" && <DashboardPrograms title={title} />}
          {tab === "funds" && (
            <DashboardFunds
              DASHBOARD_FUNDS_COLUMNS={DASHBOARD_FUNDS_COLUMNS}
              getDashboardFunds={getDashboardFunds}
              title={title}
            />
          )}
        </div>
      </Surface>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(
    { getDashboardFunds, getDashboardPrograms },
    dispatch
  )
});

export default compose(
  connect(
    null,
    mapDispatchToProps
  )
)(DashboardAssets);
