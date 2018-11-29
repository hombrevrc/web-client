import React from "react";
import { translate } from "react-i18next";
import Page from "shared/components/page/page";

export const NOT_FOUND_PAGE_ROUTE = "/404";

const NotFoundPage = ({ t }) => (
  <Page title={t("not-found-page.title")}>{t("not-found-page.body")}</Page>
);

export default translate()(NotFoundPage);
