import { combineReducers } from "redux";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

import {
  LEVELUP_SUMMARY,
  PROGRAMS_RATING,
  SELF_PROGRAMS_RATING
} from "../actions/programs-rating.actions";

const allProgramsRatingReducer = apiReducerFactory({
  apiType: PROGRAMS_RATING
});
const selfProgramsRatingReducer = apiReducerFactory({
  apiType: SELF_PROGRAMS_RATING
});
const levelupSummaryReducer = apiReducerFactory({
  apiType: LEVELUP_SUMMARY
});

const programsRatingReducer = combineReducers({
  programs: allProgramsRatingReducer,
  selfPrograms: selfProgramsRatingReducer,
  levelupSummary: levelupSummaryReducer
});

export default programsRatingReducer;
