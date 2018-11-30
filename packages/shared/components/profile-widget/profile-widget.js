import "./profile-widget.scss";

import classnames from "classnames";
import { GVButton } from "gv-react-components";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import ProfileAvatar from "shared/components/avatar/profile-avatar/profile-avatar";
import { DetailsIcon } from "shared/components/icon/details-icon";
import { LogoutIcon } from "shared/components/icon/logout-icon";
import { SettingsIcon } from "shared/components/icon/settings-icon";
import Popover from "shared/components/popover/popover";
import {
  PROFILE_ROUTE,
  SETTINGS_ROUTE
} from "shared/components/profile/profile.constants";
import FilterArrowIcon from "shared/components/table/components/filtering/filter-arrow-icon";

class ProfileWidget extends Component {
  state = {
    anchor: null
  };

  handleOpen = event => this.setState({ anchor: event.currentTarget });

  handleClose = () => this.setState({ anchor: null });

  render() {
    const { t, avatar, email, logout, className } = this.props;
    return (
      <div className={classnames("profile-widget", className)}>
        <div className="profile-widget__content" onClick={this.handleOpen}>
          <ProfileAvatar
            url={avatar}
            alt={email}
            className="profile-widget__avatar"
            imageClassName="profile-widget__image"
          />
          <FilterArrowIcon isOpen={Boolean(this.state.anchor)} />
        </div>
        <Popover
          anchorEl={this.state.anchor}
          onClose={this.handleClose}
          horizontal={"right"}
        >
          <div className="profile-menu">
            <div className="profile-menu__header">{email}</div>
            <div className="profile-menu__container">
              <div className="profile-menu__item profile-menu__item--details">
                <Link to={PROFILE_ROUTE} onClick={this.handleClose}>
                  <DetailsIcon />
                  {t("profile-widget.personal-details")}
                </Link>
              </div>
              <div className="profile-menu__item profile-menu__item--settings">
                <Link to={SETTINGS_ROUTE} onClick={this.handleClose}>
                  <SettingsIcon />
                  {t("profile-widget.settings")}
                </Link>
              </div>
              <div className="profile-menu__item profile-menu__item--logout">
                <GVButton variant="text" onClick={logout}>
                  <LogoutIcon />
                  {t("profile-widget.logout")}
                </GVButton>
              </div>
            </div>
          </div>
        </Popover>
      </div>
    );
  }
}

ProfileWidget.propTypes = {
  avatar: PropTypes.string,
  logout: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  className: PropTypes.string
};

ProfileWidget.defaultProps = {
  email: ""
};

export default translate()(ProfileWidget);
