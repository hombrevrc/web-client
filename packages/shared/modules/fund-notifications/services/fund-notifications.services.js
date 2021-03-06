import {
  addNotificationSetting,
  removeNotificationSetting
} from "shared/modules/notification-settings/actions/notification-settings.actions";

import {
  addErrorMessage,
  addFundNotifications,
  fetchFundNotifications,
  toggleFundNotifications
} from "../actions/fund-notifications.actions";

export const fetchFundNotificationsService = id => dispatch => {
  return dispatch(fetchFundNotifications(id)).then(data =>
    dispatch(addFundNotifications(data.value))
  );
};

export const addFundNotificationService = opts => dispatch => {
  const promise = dispatch(addNotificationSetting(opts));

  promise
    .then(() => dispatch(fetchFundNotificationsService(opts.assetId)))
    .catch(data => dispatch(addErrorMessage(data.errorMessage)));

  return promise;
};

export const removeFundNotificationService = ({ id, assetId }) => dispatch => {
  return dispatch(removeNotificationSetting(id)).then(() =>
    dispatch(fetchFundNotificationsService(assetId))
  );
};

export const toggleFundNotificationsService = ({
  id,
  enabled,
  assetId
}) => dispatch => {
  return dispatch(toggleFundNotifications(id, enabled)).then(() =>
    dispatch(fetchFundNotificationsService(assetId))
  );
};
