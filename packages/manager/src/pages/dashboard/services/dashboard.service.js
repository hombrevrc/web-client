import fundsApi from "shared/services/api-client/funds-api";
import managerApi from "shared/services/api-client/manager-api";
import programsApi from "shared/services/api-client/programs-api";
import authService from "shared/services/auth-service";

import * as actions from "../actions/dashboard.actions";

export const getPortfolioEvents = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();

  dispatch(actions.fetchPortfolioEvents(authorization, { take: 5 }));
};

export const getAssetChart = (assetId, assetTitle, assetType) => (
  dispatch,
  getState
) => {
  const { currency } = getState().accountSettings;
  const { period } = getState().dashboard;
  const chartFilter = {
    currency,
    dateFrom: period.start,
    dateTo: period.end,
    maxPointCount: 100
  };

  if (assetType === "Program") {
    programsApi
      .v10ProgramsByIdChartsProfitGet(assetId, chartFilter)
      .then(data => {
        dispatch(
          actions.dashboardChart({
            type: assetType,
            id: assetId,
            title: assetTitle,
            pnLChart: data.pnLChart,
            equityChart: data.equityChart
          })
        );
      });
  } else {
    fundsApi.v10FundsByIdChartsProfitGet(assetId, chartFilter).then(data => {
      dispatch(
        actions.dashboardChart({
          type: assetType,
          id: assetId,
          title: assetTitle,
          equityChart: data.equityChart
        })
      );
    });
  }
};

export const getAssets = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  managerApi.v10ManagerAssetsGet(authorization).then(data => {
    return dispatch(actions.fetchAssets(data));
  });
};

export const composeAssetChart = () => (dispatch, getState) => {
  const { assets } = getState().dashboard;
  let asset, assetType;
  if (assets.programs.length > 0) {
    asset = assets.programs[0];
    assetType = "Program";
  } else if (assets.funds.length > 0) {
    asset = assets.funds[0];
    assetType = "Fund";
  }

  if (asset !== undefined) {
    dispatch(getAssetChart(asset.id, asset.title, assetType));
  }
};

export const setPeriod = period => (dispatch, getState) => {
  dispatch(actions.setPeriod(period));
};

export const fetchAssetsCount = () => {
  const authorization = authService.getAuthArg();
  const filtering = { take: 0 };
  return Promise.all([
    managerApi.v10ManagerProgramsGet(authorization, filtering),
    managerApi.v10ManagerFundsGet(authorization, filtering)
  ]).then(([programsData, fundsData]) => ({
    programsCount: programsData.total,
    fundsCount: fundsData.total
  }));
};
