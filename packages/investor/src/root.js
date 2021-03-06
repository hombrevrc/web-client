import AppRoutes from "pages/app/app.routes";
import { AUTH_ROUTES_REGEX } from "pages/auth/auth.routes";
import AuthRoutes from "pages/auth/auth.routes";
import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import GVScroll from "shared/components/scroll/gvscroll";
import AlertMessageList from "shared/modules/alert-message/components/alert-message-list/alert-message-list";
import history from "shared/utils/history";

import { HOME_ROUTE } from "./pages/app/app.routes";
import store from "./store";

const Root = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <GVScroll>
          <Switch>
            <Route path={AUTH_ROUTES_REGEX} component={AuthRoutes} />
            <Route path={HOME_ROUTE} component={AppRoutes} />
          </Switch>
          <AlertMessageList />
        </GVScroll>
      </ConnectedRouter>
    </Provider>
  );
};

export default Root;
