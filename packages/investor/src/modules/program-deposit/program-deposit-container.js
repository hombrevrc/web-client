import Dialog from "shared/components/dialog/dialog";
import {
  clearDepositProgramInfo,
  clearInvestSubmit
} from "modules/program-deposit/actions/program-deposit.actions";
import DepositPopup from "shared/components/deposit/deposit-popup";
import {
  getDepositFundInfoById,
  getDepositProgramInfoById,
  investServiceInvestById
} from "modules/program-deposit/services/program-deposit.services";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const ProgramDepositContainer = props => {
  const { service, id, onInvest } = props;
  const handleClose = () => {
    props.onClose();
    props.service.clearDepositProgramInfo();
    props.service.clearInvestSubmit();
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
  const handleOpen = () => {
    props.service.getDepositProgramInfoById(id);
  };
  return (
    <Dialog open={props.open} onClose={handleClose} onOpen={handleOpen}>
      {props.info.data ? (
        <DepositPopup
          program
          entryFee
          submitInfo={props.submitInfo}
          currency={props.currency}
          info={props.info.data}
          id={props.id}
          invest={handleInvest}
        />
      ) : null}
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
      getDepositFundInfoById,
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
