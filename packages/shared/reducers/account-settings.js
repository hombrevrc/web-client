import { combineReducers } from "redux";
import { UPDATE_ACCOUNT_SETTINGS } from "shared/actions/account-settings-actions";
import { ACCOUNT_CURRENCY_KEY } from "shared/middlewares/update-account-settings-middleware/update-account-settings-middleware";
import twoFactorReducer from "shared/reducers/2fa-reducer";
import { loadData } from "shared/utils/localstorage";

const initialCurrency = loadData(ACCOUNT_CURRENCY_KEY) || "BTC";

const accountCurrencyReducer = (currency = initialCurrency, action) => {
  if (action.type === UPDATE_ACCOUNT_SETTINGS) {
    return action.payload;
  }
  return currency;
};

export default combineReducers({
  currency: accountCurrencyReducer,
  twoFactorAuth: twoFactorReducer
});
