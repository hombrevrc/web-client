import authActions from "shared/actions/auth-actions";
import { fetchProfileHeaderInfo } from "shared/components/header/actions/header-actions";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import authApi from "shared/services/api-client/auth-api";
import profileApi from "shared/services/api-client/profile-api";
import authService from "shared/services/auth-service";
import filesService from "shared/services/file-service";

export const updateProfileAvatar = ({
  croppedImage,
  submitCallback
}) => dispatch => {
  const authorization = authService.getAuthArg();
  let photoSrc = null;

  filesService
    .uploadFile(croppedImage, authorization)
    .then(logoId => {
      photoSrc = filesService.getFileUrl(logoId);
      return profileApi.v10ProfileAvatarUpdateByFileIdPost(
        logoId,
        authorization
      );
    })
    .then(() => dispatch(fetchProfileHeaderInfo()))
    .then(() => {
      dispatch(
        alertMessageActions.success(
          "profile-page.settings.image-success-save-message",
          true
        )
      );
      submitCallback(photoSrc);
    })
    .catch(error =>
      dispatch(alertMessageActions.error(error.errorMessage || error.message))
    );
};

export const removeProfileAvatar = ({ submitCallback }) => dispatch => {
  const authorization = authService.getAuthArg();

  profileApi
    .v10ProfileAvatarRemovePost(authorization)
    .then(() => dispatch(fetchProfileHeaderInfo()))
    .then(() => {
      dispatch(
        alertMessageActions.success(
          "profile-page.settings.image-success-save-message",
          true
        )
      );
      submitCallback();
    })
    .catch(error => alertMessageActions.error(error.errorMessage));
};

export const logoutFromDevices = () => dispatch => {
  return authApi
    .v10AuthTokenDevicesLogoutPost(authService.getAuthArg())
    .then(response => {
      authService.storeToken(response);
      dispatch(authActions.updateToken());
      dispatch(
        alertMessageActions.success(
          "auth.logout-from-another-devices.success-message",
          true
        )
      );
      return response;
    })
    .catch(error => {
      dispatch(alertMessageActions.error(error.errorMessage));
      return error;
    });
};
