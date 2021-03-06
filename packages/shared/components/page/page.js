import PropTypes from "prop-types";
import React, { Fragment } from "react";
import DocumentTitle from "react-document-title";
import { translate } from "react-i18next";
import BackButton from "shared/components/back-button/back-button";

const Page = ({ t, title, children }) => {
  return (
    <DocumentTitle
      title={t(`${process.env.REACT_APP_PLATFORM}.app.title`) + title}
    >
      <Fragment>
        <BackButton />
        {children}
      </Fragment>
    </DocumentTitle>
  );
};

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  title: PropTypes.string.isRequired
};

export default translate()(Page);
