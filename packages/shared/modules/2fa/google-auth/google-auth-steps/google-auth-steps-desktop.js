import React from "react";
import { translate } from "react-i18next";

import GoogleActivateStep from "./google-auth-activate-step";
import GoogleCodeStep from "./google-auth-code-step";
import GoogleDownloadStep from "./google-auth-download-step";

const GoogleAuth = ({
  authenticatorUri,
  sharedKey,
  t,
  onSubmit,
  disabled,
  errorMessage
}) => {
  return (
    <div className="google-auth google-auth--desktop">
      <div className="dialog__header">
        <h2>{t("2fa.title")}</h2>
        <p>{t("2fa.google")}</p>
      </div>

      <div className="google-auth__steps">
        <GoogleDownloadStep />
        <GoogleCodeStep
          className="google-auth__step--alt-color"
          t={t}
          authenticatorUri={authenticatorUri}
          sharedKey={sharedKey}
        />
        <GoogleActivateStep
          onSubmit={onSubmit}
          disabled={disabled}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
};

const GoogleAuthDesktop = translate()(GoogleAuth);

export default GoogleAuthDesktop;
