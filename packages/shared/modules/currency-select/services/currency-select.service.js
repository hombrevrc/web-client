import { updateAccountSettings } from "shared/actions/account-settings-actions";

export const updateCurrency = currency => dispatch => {
  dispatch(updateAccountSettings(currency));
};
