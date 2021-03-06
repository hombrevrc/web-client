import React from "react";
import { translate } from "react-i18next";
import FacetContainer from "shared/components/facet-container/facet-container";
import Page from "shared/components/page/page";
import { getCurrentFacet } from "shared/components/programs/programs-facet/services/programs-facet.service";
import ProgramsContainer from "shared/modules/programs-table/components/programs-table/programs-table-container";

const ProgramsFacetPage = ({ t }) => (
  <Page title={t("programs-page.title")}>
    <FacetContainer
      asset={"programsFacets"}
      TableContainer={ProgramsContainer}
      getCurrentFacet={getCurrentFacet}
    />
  </Page>
);
export default translate()(ProgramsFacetPage);
