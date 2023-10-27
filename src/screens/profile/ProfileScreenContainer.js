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
  resetUserDataError,
  deleteAccount
} from "../../actions/userActions";
import { updateAirlineTier} from '../../actions/userActions'
import ProfileScreenComponent from "./ProfileScreenComponent";
import {
  setNotificationSettings,
  emailNotificationToggle,
  SMSNotificationToggle,
} from "../../actions/notificationActions";
// import {resetCreateAlertData,resetFindFlightData} from '../../actions/findFlightActions'
import * as STR_CONST from "../../constants/StringConst";
// import {resetCalendarData} from '../../actions/calendarActions'
import {Alert} from 'react-native'
class ProfileScreenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: this.props.userInfo,
    };
  }

   async componentDidMount() {
    // this.props.resetFindFlightDataAction()
   }

  async componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.userData !== prevProps.userData) {
        this.setState({
          userData: this.props.userData,
        });
      } else if (this.props.userError  && this.props.userError !== prevProps.userError) {
        Alert.alert(this.props.userError);
        this.props.resetUserDataErrorAction()
      }
      if (
        this.props.passwordUpdated !== prevProps.passwordUpdated &&
        this.props.passwordUpdated
      ) {
        Alert.alert(STR_CONST.PASSWORD_CHANGE);
        this.props.resetPasswordUpdateAction();
      } else if (this.props.passwordError) {
        Alert.alert(this.props.passwordError);
        this.props.resetPasswordUpdateAction();
      }

      if (
        this.props.presignedUrlError &&
        this.props.presignedUrlError !== prevProps.presignedUrlError
      ) {
        Alert.alert(STR_CONST.IMAGE_UPLOAD_FAILED);
      }
      if (
        this.props.uploadImageError &&
        this.props.uploadImageError !== prevProps.uploadImageError
      ) {
        Alert.alert(STR_CONST.IMAGE_UPLOAD_FAILED);
      }
    }
  }

  render() {
    return (
      <ProfileScreenComponent
        {...this.props}
        userInfo={this.props.userInfo}
        notiifcationSettingsData={this.props.notiifcationSettingsData}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { userInfo, notification, findFlight } = state;
  return {
    userData: userInfo.userData,
    passwordError: userInfo.passwordError,
    passwordUpdated: userInfo.passwordUpdated,
    userError: userInfo.userError,
    presignedUrlError: userInfo.presignedUrlError,
    presignedUrl: userInfo.presignedUrl,
    uploadImageError: userInfo.uploadImageError,
    notiifcationSettingsData: notification.notiifcationSettingsData,
    airLinesMembershipDetailsObject: findFlight.airlinesMembershipDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAirlineTierAction:(userInfo) => dispatch(updateAirlineTier(userInfo)),
    deleteUserAccountAction:(emailId)=>dispatch(deleteAccount(emailId)),
    updateUserDataAction: (userData) => dispatch(updateUserInfo(userData, false)),
    updatePasswordAction: (passData) => dispatch(updatePassword(passData)),
    resetPasswordUpdateAction: () => dispatch(resetPasswordUpdate()),
    // getPresignedURLAction: (data, imageOject) =>
    //   dispatch(getPresignedURL(data, imageOject)),
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
    // resetCalendarDataAction:()=>dispatch(resetCalendarData()),
    // resetFindFlightDataAction:()=>dispatch(resetFindFlightData())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreenContainer);
