import "./deposit.scss";

import DepositForm from "./deposit-form";
import DepositTop from "./deposit-top";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";

class DepositPopup extends Component {
  componentDidMount() {
    this.props.fetchInfo(this.props.id);
  }

  render() {
    const {
      info,
      type,
      submitInfo,
      currency,
      invest,
      entryFee,
      program
    } = this.props;
    return info ? (
      <Fragment>
        <DepositTop info={info} type={type} program={program} />
        <DepositForm
          entryFee={entryFee}
          program={program}
          errorMessage={submitInfo.errorMessage}
          currency={currency}
          info={info}
          disabled={submitInfo.isPending}
          onSubmit={invest}
        />
      </Fragment>
    ) : null;
  }
}

DepositPopup.propTypes = {
  fetchInfo: PropTypes.func,
  invest: PropTypes.func,
  currency: PropTypes.string,
  info: PropTypes.shape({
    availableInWallet: PropTypes.number,
    availableToInvest: PropTypes.number,
    entryFee: PropTypes.number,
    periodEnds: PropTypes.instanceOf(Date),
    rate: PropTypes.number,
    title: PropTypes.string
  })
};

export default DepositPopup;
