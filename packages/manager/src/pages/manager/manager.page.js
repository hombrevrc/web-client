import "./manager.page.scss";

import Page from "shared/components/page/page";
import React, { Component } from "react";
import { translate } from "react-i18next";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";

import { SLUG_URL_REGEXP } from "shared/utils/constants";
import ManagerDescription from "shared/components/manager/manager-description/manager-description";
import ManagerHistorySection from "shared/components/manager/manager-history/manager-history-section";
import * as managerService from "./services/manager.service";

export const MANAGER_SLUG_URL_PARAM_NAME = "managerSlugUrl";

export const MANAGERS_ROUTE = "/managers";
export const MANAGER_DETAILS_ROUTE = `${MANAGERS_ROUTE}/:${MANAGER_SLUG_URL_PARAM_NAME}`;
export const MANAGER_DETAILS_ROUTE_REGEXP = `${MANAGERS_ROUTE}/:${MANAGER_SLUG_URL_PARAM_NAME}(${SLUG_URL_REGEXP})`;

class ManagerPage extends Component {
  state = {
    managerProfile: {},
    funds: null,
    programs: null,
    isPending: true
  };

  componentDidMount() {
    const { service } = this.props;
    service
      .fetchManagerProfile()
      .then(profile => {
        this.setState({ managerProfile: profile, isPending: false });
        return this.getFunds();
      })
      .then(funds => {
        this.setState({ funds: funds });
        return this.getPrograms();
      })
      .then(programs => {
        this.setState({ programs: programs, isPending: false });
      });
  }

  getFunds = filters => {
    return managerService.getFunds(this.props.managerId, filters);
  };

  getPrograms = filters => {
    return managerService.getPrograms(this.props.managerId, filters);
  };

  render() {
    const { t } = this.props;
    const { managerProfile, isPending, funds, programs } = this.state;
    return (
      !isPending && (
        <Page title={`${t("manager.title")} ${managerProfile.username}`}>
          <div className="manager">
            <div className="manager__description">
              <ManagerDescription managerProfile={managerProfile} />
            </div>
            <div className="manager__history">
              <ManagerHistorySection
                programs={programs}
                funds={funds}
                getPrograms={this.getPrograms}
                getFunds={this.getFunds}
                managerId={managerProfile.id}
                title={managerProfile.username}
              />
            </div>
          </div>
        </Page>
      )
    );
  }
}
const mapStateToProps = state => {
  return {
    managerProfile: state.manager.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    service: bindActionCreators({ ...managerService }, dispatch)
  };
};

export default translate()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ManagerPage)
);
