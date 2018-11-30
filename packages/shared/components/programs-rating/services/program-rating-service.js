import {
  fetchProgramsRating,
  fetchSelfProgramsRating,
  fetchLevelUpSummary
} from "../actions/programs-rating.actions";
import { LEVELS } from "../programs-rating-table";
import authService from "shared/services/auth-service";

export const getProgramsRating = filters => dispatch => {
  const { tab, managerId, itemsOnPage, currentPage } = filters;
  const requestFilters = {
    managerId,
    levelUpFrom: tab,
    take: itemsOnPage,
    skip: itemsOnPage * (currentPage - 1)
  };
  return dispatch(
    managerId
      ? fetchSelfProgramsRating(requestFilters)
      : fetchProgramsRating(requestFilters)
  );
};

export const getLevelUpSummary = () => dispatch => {
  const authorization = authService.getAuthArg();
  return dispatch(fetchLevelUpSummary({ authorization }));
};
