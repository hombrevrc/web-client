import { UPDATE_TOKEN } from "shared/actions/auth-actions";
import authService from "shared/services/auth-service";

const initialState = {
  isAuthenticated: authService.isAuthenticated(),
  username: authService.getUserName()
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TOKEN:
      return {
        isAuthenticated: action.isAuthenticated,
        username: authService.username
      };
    default:
      return state;
  }
};

export default authReducer;
