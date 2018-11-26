import "./notifications.scss";

import moment from "moment";
import NotificationsGroup from "pages/app/components/notifications/components/notification-group/notification-group";
import { notificationProps } from "pages/app/components/notifications/components/notification/notification";
import { NOTIFICATIONS_ROUTE } from "pages/notifications/notifications.routes";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import Chip from "shared/components/chip/chip";
import { ControlsIcon } from "shared/components/icon/icon";
import { RingIcon } from "shared/components/icon/ring-icon";
import InfinityScroll from "shared/components/infinity-scroll/inifinity-scroll";

class Notifications extends Component {
  getGroups = notifications => {
    const { t } = this.props;
    return notifications.reduce((acc, notification) => {
      const key = moment(notification.date)
        .calendar(null, {
          sameDay: `[${t("notifications-aside.today")}], DD MMMM`,
          lastDay: `[${t("notifications-aside.yesterday")}], DD MMMM`,
          lastWeek: "dddd, DD MMMM",
          sameElse: "dddd, DD MMMM"
        })
        .toUpperCase();
      if (!Array.isArray(acc[key])) {
        acc[key] = [];
      }
      acc[key].push(notification);
      return acc;
    }, {});
  };

  renderGroups = groups => group => (
    <NotificationsGroup
      key={group}
      title={group}
      notifications={groups[group]}
    />
  );

  sortGroups = (a, b) => b - a;

  render() {
    const { t } = this.props;
    const { notifications, total, count } = this.props;
    const groups = this.getGroups(notifications);
    const hasMore = total > notifications.length;
    const hasNotifications = count > 0;
    return (
      <div className="notifications">
        <InfinityScroll
          loadMore={this.props.fetchNotifications}
          hasMore={hasMore}
        >
          <div className="notifications__header">
            <div className="notifications__ring">
              <RingIcon />
            </div>
            {t("notifications-aside.header")}
            <div className="notifications__count">
              <Chip type={hasNotifications ? "negative" : null}>{count}</Chip>
            </div>
            <Link
              to={NOTIFICATIONS_ROUTE}
              onClick={this.props.closeNotifications}
            >
              <div className="profile-avatar notifications__link">
                <ControlsIcon />
              </div>
            </Link>
          </div>
          <div className="notifications__content">
            {Object.keys(groups)
              .sort(this.sortGroups)
              .map(this.renderGroups(groups))}
          </div>
        </InfinityScroll>
      </div>
    );
  }
}

Notifications.propTypes = {
  fetchNotifications: PropTypes.func.isRequired,
  clearNotifications: PropTypes.func.isRequired,
  count: PropTypes.number,
  notifications: PropTypes.arrayOf(PropTypes.shape(notificationProps)),
  total: PropTypes.number,
  closeNotifications: PropTypes.func
};

Notifications.defaultProps = {
  notifications: [],
  total: 0
};

export default translate()(Notifications);
