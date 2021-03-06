import React from "react";
import { Icon } from "shared/components/icon/icon";

import { ReactComponent as Fund } from "./funds.svg";

export const FundsIcon = props => {
  return (
    <Icon type={"funds"} {...props}>
      <Fund />
    </Icon>
  );
};
