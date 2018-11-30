import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFoundPage from "shared/components/not-found/not-found.routes";
import { SLUG_URL_REGEXP } from "shared/utils/constants";

import PrivateRoute from "../private-route";
import ProgramDetailsPage from "./program-details/program-details.page";
import ProgramsFacetPage from "./programs-facet/programs-facet.page";
import ProgramsRatingPage from "./programs-rating/programs-rating.page";
import ProgramsPage from "./programs/programs.page";

export const PROGRAMS_FAVORITES_TAB_NAME = "favorites";
export const PROGRAMS_EXPLORE_TAB_NAME = "";
export const PROGRAM_SLUG_URL_PARAM_NAME = "programSlugUrl";

export const PROGRAMS_ROUTE = "/programs";
export const PROGRAM_ROUTE = `${PROGRAMS_ROUTE}/:programId`;
export const PROGRAM_DETAILS_ROUTE = `${PROGRAMS_ROUTE}/:${PROGRAM_SLUG_URL_PARAM_NAME}`;
export const PROGRAM_DETAILS_ROUTE_REGEX = `${PROGRAMS_ROUTE}/:${PROGRAM_SLUG_URL_PARAM_NAME}(${SLUG_URL_REGEXP})`;

export const FACETS = "facets";
export const PROGRAMS_FACET_ROUTE = `${PROGRAMS_ROUTE}/${FACETS}/:${PROGRAM_SLUG_URL_PARAM_NAME}`;
export const PROGRAMS_FACET_ROUTE_REGEX = `${PROGRAMS_ROUTE}/${FACETS}/:${PROGRAM_SLUG_URL_PARAM_NAME}(${SLUG_URL_REGEXP})`;
export const PROGRAMS_TAB_ROUTE = `${PROGRAMS_ROUTE}/:tab`;
export const PROGRAMS_EXPLORE_TAB_ROUTE = `${PROGRAMS_ROUTE}/:tab(${PROGRAMS_EXPLORE_TAB_NAME})`;
export const PROGRAMS_FAVORITES_TAB_ROUTE = `${PROGRAMS_ROUTE}/:tab(${PROGRAMS_FAVORITES_TAB_NAME})`;

export const PROGRAMS_RATING_ROUTE = `${PROGRAMS_ROUTE}/${FACETS}/new_levels`; // temp

const ProgramsRoutes = () => (
  <Switch>
    <Route exact path={PROGRAMS_ROUTE} component={ProgramsPage} />
    <PrivateRoute
      path={PROGRAMS_FAVORITES_TAB_ROUTE}
      component={ProgramsPage}
    />
    <Route path={PROGRAMS_RATING_ROUTE} component={ProgramsRatingPage} />
    <Route path={PROGRAMS_FACET_ROUTE_REGEX} component={ProgramsFacetPage} />
    <Route path={PROGRAM_DETAILS_ROUTE_REGEX} component={ProgramDetailsPage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default ProgramsRoutes;
