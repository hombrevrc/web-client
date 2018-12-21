import { GVTab, GVTabs } from "gv-react-components";
import React, { Component } from "react";
import Scrollbars from "react-custom-scrollbars";
import { translate } from "react-i18next";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

class TabsContainer extends Component {
  render() {
    const { tabs, tab, handleTabChange } = this.props;
    return (
      <Scrollbars autoHeight autoHeightMax={40}>
        <GVTabs value={tab.name} onChange={handleTabChange}>
          {tabs.map(tab => (
            <GVTab
              key={tab.name}
              value={tab.name}
              label={tab.label}
              count={tab.count}
            />
          ))}
        </GVTabs>
      </Scrollbars>
    );
  }
}

export default compose(
  translate(),
  withRouter
)(TabsContainer);
