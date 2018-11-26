import { notificationsToggle } from "pages/app/components/notifications/actions/notifications.actions";
import Notifications from "pages/app/components/notifications/components/notifications";
import {
  serviceClearNotifications,
  serviceGetNotifications
} from "pages/app/components/notifications/services/notifications.services";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Sidebar from "shared/components/sidebar/sidebar";

class NotificationsContainer extends Component {
  state = { isPending: false };

  fetchNotification = () => {
    if (this.state.isPending) return;
    this.setState({ isPending: true });
    this.props.service.serviceGetNotifications().then(() => {
      this.setState({ isPending: false });
    });
  };

  handleClose = () => {
    this.props.service.notificationsToggle();
    this.props.service.serviceClearNotifications();
  };

  render() {
    const { open, notifications, count, total } = this.props;
    return (
      <Sidebar
        open={open}
        position="right"
        onClose={this.handleClose}
        onOpen={this.fetchNotification}
      >
        <Notifications
          fetchNotifications={this.fetchNotification}
          isPending={this.state.isPending}
          count={count}
          total={total}
          notifications={notifications}
          closeNotifications={this.handleClose}
        />
      </Sidebar>
    );
  }
}

const mapStateToProps = ({ notifications, profileHeader }) => {
  let count = 0;
  if (profileHeader.info.data) {
    count = profileHeader.info.data.notificationsCount;
  }
  return {
    open: notifications.isOpen,
    notifications: notifications.notifications,
    total: notifications.total,
    count
  };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(
    {
      notificationsToggle,
      serviceGetNotifications,
      serviceClearNotifications
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsContainer);
