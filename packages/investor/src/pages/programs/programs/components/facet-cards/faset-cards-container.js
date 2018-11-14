import FacetCards from "shared/components/facet-cards/facet-cards";
import FacetCardsStub from "shared/components/facet-cards/facet-cards-stub";
import React, { Component } from "react";
import { connect } from "react-redux";
import replaceParams from "shared/utils/replace-params";

import {
  PROGRAMS_FACET_ROUTE,
  PROGRAM_SLUG_URL_PARAM_NAME
} from "../../../programs.routes";

class FacetCardsContainer extends Component {
  composeFacetUrl = url => {
    return replaceParams(PROGRAMS_FACET_ROUTE, {
      [`:${PROGRAM_SLUG_URL_PARAM_NAME}`]: url
    });
  };
  render() {
    const { isPending, facets, title } = this.props;
    if (!facets || isPending) return <FacetCardsStub />;
    return (
      <FacetCards
        title={title}
        facets={facets}
        composeFacetUrl={this.composeFacetUrl}
      />
    );
  }
}

const mapStateToProps = state => {
  const { isPending, data } = state.platformData;
  let facets = null;
  if (data) facets = data.programsFacets;
  return { isPending, facets };
};

export default connect(mapStateToProps)(FacetCardsContainer);