import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";

import validationSchema from "./recovery-code-form.validators";

const RecoveryCodeForm = ({ t, handleSubmit, isSubmitting, error }) => {
  return (
    <form
      id="recoveryForm"
      className="recovery-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <h3 className="recovery-form__header">
        {t("auth.login.recovery.title")}
      </h3>
      <p className="recovery-form__text">{t("auth.login.recovery.text")}</p>
      <GVFormikField
        name="recoveryCode"
        placeholder="Recovery code"
        component={GVTextField}
      />
      <FormError error={error} />
      <GVButton
        id="recoverySubmit"
        disabled={isSubmitting}
        type="submit"
        className="recovery-form__submit"
      >
        Verify
      </GVButton>
    </form>
  );
};

export default compose(
  translate(),
  withFormik({
    displayName: "recoveryForm",
    mapPropsToValues: () => ({
      recoveryCode: ""
    }),
    validationSchema: validationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values.recoveryCode, setSubmitting);
    }
  })
)(RecoveryCodeForm);
