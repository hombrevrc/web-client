import React, { Fragment } from "react";
import ChartTooltip from "shared/components/chart/chart-tooltip/chart-tooltip";
import { formatValue } from "shared/utils/formatter";

const TooltipBody = ({ managersFunds, investorsFunds, profit }) => {
  return (
    <Fragment>
      <div className="details-tooltip__statistic">
        <div className="details-tooltip__title">Profit</div>
        <div className="details-tooltip__value">{profit}</div>
      </div>
      <div className="details-tooltip__statistic">
        <div className="details-tooltip__title">Investors Funds</div>
        <div className="details-tooltip__value">{investorsFunds}</div>
      </div>
      <div className="details-tooltip__statistic">
        <div className="details-tooltip__title">Managers Funds</div>
        <div className="details-tooltip__value">{managersFunds}</div>
      </div>
    </Fragment>
  );
};
const ProgramBalanceTooltip = ({
  active,
  label,
  payload,
  heading,
  body,
  date
}) => {
  if (!active || !payload[0]) return null;

  const managersFunds = `${formatValue(payload[0].payload.managerFunds)} ${
    payload[0].unit
  }`;
  const investorsFunds = `${formatValue(payload[0].payload.investorsFunds)} ${
    payload[0].unit
  }`;
  const profit = `${formatValue(payload[0].payload.profit)} ${payload[0].unit}`;

  return (
    <ChartTooltip
      heading="Balance"
      body={
        <TooltipBody
          managersFunds={managersFunds}
          investorsFunds={investorsFunds}
          profit={profit}
        />
      }
      date={new Date(label)}
      className="details-tooltip"
    />
  );
};
export default ProgramBalanceTooltip;
