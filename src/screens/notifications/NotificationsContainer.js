/**
 * Date: May 19, 2020
 * Description: Notifications Screen.
 *
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getNotifications,
  markNotificationAsRead,
  resetNotificationData,
  getAlertNotifications
} from "../../actions/notificationActions";
import NotificationsComponent from "./NotificationsComponent";
import { RECORDS_PER_PAGE } from "../../constants/StringConst";
import Utils from "../../utils/commonMethods";

class NotificationsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1,
      notificationData:null
    };
  }

  componentDidMount() {
    this.callGetNotifications(this.state.pageNo);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if(this.props.notificationData !== prevProps.notificationData){
        this.setState({
          notificationData: this.props.notificationData
        })
      }
    }
    if(this.props.alertNotifications !== prevProps.alertNotifications){
      this.setState({
        notificationData: this.props.alertNotifications
      })
    }
  }

  onRefresh() {
    this.callGetNotifications(1);
  }

  callGetNotifications(pageNo) {
    const { navigation,route } = this.props
    if(route.params.fromAlertScreen){
      this.props.getAlertNotifications(route.params.alertId,pageNo, RECORDS_PER_PAGE)
    }else{
      this.props.getNotifications(pageNo, RECORDS_PER_PAGE);
    }
  }

  markNotificationRead(item) {
    if (item.unread) {
      this.props.markNotificationAsRead(item.id);
    }
  }

  render() {
    return (
      <NotificationsComponent
        {...this.props}
        notificationList={this.state.notificationData}
        markNotificationRead={item => this.markNotificationRead(item)}
        onRefresh={() => this.onRefresh()}
        callGetNotifications={pageNo => this.callGetNotifications(pageNo)}
        totalPages = {this.props.totalPages}
        resetNotificationDataAction= {()=>this.props.resetNotificationDataAction()}
      />
    );
  }
}

const mapStateToProps = state => {
  const { notification } = state;
  return {
    notificationData: notification.notificationData,
    getNotifError: notification.getNotifError,
    totalPages: notification.totalPages,
    alertNotifications: notification.alertNotificationData,
    getAlertNotifError: notification.getAlertNotifError,
    alertNotifTotalPages: notification.alertNotifTotalPages,
  };
};

const mapDispatchToProps = dispatch => ({
  getNotifications: (pageNo, recordsPerPage) =>
    dispatch(getNotifications(pageNo, recordsPerPage)),
  markNotificationAsRead: notifID => dispatch(markNotificationAsRead(notifID)),
  resetNotificationDataAction: () => dispatch(resetNotificationData()),
  getAlertNotifications: (alertId, pageNo, recordsPerPage) =>
    dispatch(getAlertNotifications(alertId,pageNo, recordsPerPage)),
});

NotificationsContainer.propTypes = {
  navigation: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsContainer);
