import "./about-level.scss";

import React, { Component } from "react";
import { CURRENCY_VALUES } from "shared/modules/currency-select/currency-select.constants";
import rateApi from "shared/services/api-client/rate-api";

import platformApi from "../../services/api-client/platform-api";
import AboutLevelsComponent from "./about-levels";

class AboutLevelsContainerComponent extends Component {
  state = {
    levels: null,
    currency: CURRENCY_VALUES.GVT,
    rate: 1
  };
  componentDidMount() {
    platformApi
      .v10PlatformLevelsGet()
      .then(levels => this.setState({ levels }));
  }

  handlerCurrencyChange = e => {
    this.setState({ currency: e.target.value });
    rateApi
      .v10RateByFromByToGet(e.target.value, CURRENCY_VALUES.GVT)
      .then(value => {
        this.setState({ rate: value });
      });
  };
  render() {
    const { open, onClose } = this.props;
    const { rate, levels, currency } = this.state;
    return (
      <AboutLevelsComponent
        open={open}
        onClose={onClose}
        className="about-levels__dialog"
        rate={rate}
        currency={currency}
        currencyChange={this.handlerCurrencyChange}
        levels={levels}
      />
    );
  }
}
export default AboutLevelsContainerComponent;
