import {
  clearDepositProgramInfo,
  clearInvestSubmit
} from "modules/program-deposit/actions/program-deposit.actions";
import {
  getDepositProgramInfoById,
  investServiceInvestById
} from "modules/program-deposit/services/program-deposit.services";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DepositPopup from "shared/components/deposit/deposit-popup";
import Dialog from "shared/components/dialog/dialog";

const ProgramDepositContainer = props => {
  const {
    service,
    id,
    type,
    onInvest,
    open,
    submitInfo,
    currency,
    info,
    onClose
  } = props;
  const handleClose = () => {
    onClose();
    service.clearDepositProgramInfo();
    service.clearInvestSubmit();
  };
  const handleInvest = amount => {
    service
      .investServiceInvestById({
        id,
        amount
      })
      .then(() => {
        handleClose();
        if (onInvest) {
          onInvest();
        }
      });
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DepositPopup
        program
        submitInfo={submitInfo}
        currency={currency}
        info={info.data}
        id={id}
        fetchInfo={service.getDepositProgramInfoById}
        invest={handleInvest}
        type={type}
      />
    </Dialog>
  );
};

ProgramDepositContainer.propTypes = {
  open: PropTypes.bool,
  id: PropTypes.string.isRequired,
  currency: PropTypes.string,
  onClose: PropTypes.func,
  onInvest: PropTypes.func,
  service: PropTypes.shape({
    getDepositProgramInfoById: PropTypes.func,
    getDepositFundInfoById: PropTypes.func,
    clearDepositProgramInfo: PropTypes.func,
    investServiceInvestById: PropTypes.func,
    clearInvestSubmit: PropTypes.func
  })
};

const mapStateToProps = state => ({
  info: state.programDeposit.info,
  submitInfo: state.programDeposit.submit
});

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(
    {
      getDepositProgramInfoById,
      clearDepositProgramInfo,
      investServiceInvestById,
      clearInvestSubmit
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramDepositContainer);
