/**
 * Date: June 06, 2020
 * Description: User Profile Screen.
 *
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateUserInfo,
  updatePassword,
  resetPasswordUpdate,
  getPresignedURL,
  deleteProfileImage,
  setPassword,
  getUserInfo,
  updateGuestUserPostHog,
  updateLoggedInUserPostHog,
  resetUserDataError
} from "../../actions/userActions";
import AsyncStorage from '@react-native-async-storage/async-storage'
import NotificationSettingsComponent from "./NotificationSettingsComponent";
import {
  setNotificationSettings,
  emailNotificationToggle,
  SMSNotificationToggle,
} from "../../actions/notificationActions";
import * as STR_CONST from "../../constants/StringConst";

class NotificationSettingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: this.props.userInfo,
    };
  }

  async componentDidMount() {
  }

  async componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.userData !== prevProps.userData) {
        this.setState({
          userData: this.props.userData,
        });
      } else if (this.props.userError  && this.props.userError !== prevProps.userError) {
        alert(this.props.userError);
        this.props.resetUserDataErrorAction()
      }
      if (
        this.props.presignedUrlError &&
        this.props.presignedUrlError !== prevProps.presignedUrlError
      ) {
        alert(STR_CONST.IMAGE_UPLOAD_FAILED);
      }
      if (
        this.props.uploadImageError &&
        this.props.uploadImageError !== prevProps.uploadImageError
      ) {
        alert(STR_CONST.IMAGE_UPLOAD_FAILED);
      }
      if (
        this.props.notiifcationSettingsData !==
        prevProps.notiifcationSettingsData
      ) {
        const NotificationDisbledFromPhone = await AsyncStorage.getItem(
          "NotificationDisbledFromPhone"
        );
      }
    }
  }

  render() {
    return (
      <NotificationSettingsComponent
        {...this.props}
        userInfo={this.props.userInfo}
        notiifcationSettingsData={this.props.notiifcationSettingsData}
        guestUserPostHogFunc = {(guestUserPostHog)=>{this.props.updateGuestUserPostHogAction(guestUserPostHog)}}
        loggedinUserPostHogFun = {(loggedInUserPostHog)=>{this.props.updateLoggedInUserPostHogAction(loggedInUserPostHog)}}

      />
    );
  }
}

const mapStateToProps = (state) => {
  const { userInfo, logIn,notification ,} = state;

  return {
    userData: userInfo.userData,
    isLoggedIn: logIn.isLoggedIn,
    passwordError: userInfo.passwordError,
    passwordUpdated: userInfo.passwordUpdated,
    userError: userInfo.userError,
    presignedUrlError: userInfo.presignedUrlError,
    presignedUrl: userInfo.presignedUrl,
    uploadImageError: userInfo.uploadImageError,
    notiifcationSettingsData: notification.notiifcationSettingsData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateGuestUserPostHogAction: (guestUserPostHog) => dispatch(updateGuestUserPostHog(guestUserPostHog)),
    updateLoggedInUserPostHogAction: (loggedInUserPostHog) => dispatch(updateLoggedInUserPostHog(loggedInUserPostHog)),
    
    updateUserDataAction: (userData) => dispatch(updateUserInfo(userData, false)),
    updatePasswordAction: (passData) => dispatch(updatePassword(passData)),
    resetPasswordUpdateAction: () => dispatch(resetPasswordUpdate()),
    getPresignedURLAction: (data, imageOject) =>
      dispatch(getPresignedURL(data, imageOject)),
    deleteProfileImageAction: () => dispatch(deleteProfileImage()),
    setNotificationSettingsAction: (isEnabled) =>
      dispatch(setNotificationSettings(isEnabled)),
    emailNotificationToggleAction: (isEnabled) =>
      dispatch(emailNotificationToggle(isEnabled)),
    SMSNotificationToggleAction: (isEnabled) =>
      dispatch(SMSNotificationToggle(isEnabled)),
    setPasswordAction: (password) => dispatch(setPassword(password)),
    getUserInfoAction: () => dispatch(getUserInfo()),
    resetUserDataErrorAction: () => dispatch(resetUserDataError()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationSettingsContainer);
