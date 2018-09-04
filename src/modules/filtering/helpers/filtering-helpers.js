import { FilterType } from "../filtering.constants";

export const composeFilteringActionType = actionType =>
  `${actionType}_FILTERING`;

export const composeFilters = (allFilters, filtering) => {
  const composedFilters = allFilters.reduce((accum, cur) => {
    const { name, type, composeRequestValue } = cur;
    const processedFilterValue = processFilterValue({
      name,
      type,
      composeRequestValue,
      value: filtering[name]
    });
    if (processedFilterValue !== undefined) {
      accum = { ...accum, ...processedFilterValue };
    }

    return accum;
  }, {});
  return composedFilters;
};

const processFilterValue = filter => {
  let requestValue = undefined;
  switch (filter.type) {
    case FilterType.range:
      if (filter.value !== undefined) {
        requestValue = {
          [`${filter.name}Min`]: filter.value[0],
          [`${filter.name}Max`]: filter.value[1]
        };
      }
      break;
    case FilterType.custom:
      const requestValues = filter.composeRequestValue(filter.value);
      if (requestValues !== undefined) {
        requestValue = { ...requestValues };
      }
      break;
    case FilterType.general:
    default:
      if (filter.value !== undefined) {
        requestValue = filter.value;
      }
  }
  return requestValue;
};
