import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

import alertMessagesReducer from './alertMessagesReducer/alertMessagesReducer'
import authReducer from './authReducer'
import investorProfitReducer from './investorProfitReducer'
import loginReducer from './loginReducer'
import registerReducer from './registerReducer/registerReducer'
import traderReducer from './traderReducer'
import tradersReducer from './tradersReducer'

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  loadingBar: loadingBarReducer,
  tradersInfo: tradersReducer,
  traderData: traderReducer,
  investorProfit: investorProfitReducer,
  loginData: loginReducer,
  registerData: registerReducer,
  authData: authReducer,
  alertMessages: alertMessagesReducer
})
