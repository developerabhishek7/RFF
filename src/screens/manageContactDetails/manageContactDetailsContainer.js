/**
 * Date: June 06, 2020
 * Description: User Profile Screen.
 *
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUserInfo, getUserInfo } from '../../actions/userActions'
import ManageContactDetails from "./manageContactDetailsComponent";
import { setPrimaryEmail,addContact,setSecondaryAsPrimaryEmail, resendSecondaryVerification, resendPrimaryVerification, createAlternateEmail, deleteEmail,deleteNumber, verifyOTP, sendOTP, resetManageContact } from '../../actions/manageContactDetailsAction'

class ManageContactDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo : this.props.userInfo
      };
  }

  render() {
    return <ManageContactDetails {...this.props} 
    userInfo = {this.props.userInfo}/>;
  }
}

const mapStateToProps = (state) => {
  const { userInfo, manageContactDetails } = state;

  return {
    userData: userInfo.userData,

    setSecondaryEmailPrimary:manageContactDetails.setSecondaryEmailPrimary,
    setSecondaryEmailPrimaryError:manageContactDetails.setSecondaryEmailPrimaryError,

    setPrimaryEmailSuccess: manageContactDetails.setPrimaryEmailSuccess,
    setPrimaryEmailError:manageContactDetails.setPrimaryEmailError ,

    secondaryVerificationSuccess: manageContactDetails.secondaryVerificationSuccess,
    secondaryVerificationError:manageContactDetails.secondaryVerificationError,

    primaryVerificationSuccess: manageContactDetails.primaryVerificationSuccess,
    primaryVerificationError:manageContactDetails.primaryVerificationError,

    createAlternateEmailSuccess: manageContactDetails.createAlternateEmailSuccess,
    createAlternateEmailError:manageContactDetails.createAlternateEmailError,

    deleteEmailSuccess: manageContactDetails.deleteEmailSuccess,
    deleteEmailError:manageContactDetails.deleteEmailError,

    deleteNumberSuccess: manageContactDetails.deleteNumberSuccess,
    deleteNumberError:manageContactDetails.deleteNumberError,

    verifyNumberSuccess: manageContactDetails.verifyNumberSuccess,
    verifyNumberError:manageContactDetails.verifyNumberError,

    resendOTPSuccess: manageContactDetails.resendOTPSuccess,
    resendOTPError: manageContactDetails.resendOTPError,

    addContactSuccess:manageContactDetails.addContactSuccess,
    addContactError:manageContactDetails.addContactError


  };
};

const mapDispatchToProps = dispatch => {return({
  updateUserDataAction: (userData) => dispatch(updateUserInfo(userData, false)),
  setPrimaryEmailAction:(emailId)=>dispatch(setPrimaryEmail(emailId)),
  addContactAction:(userInfo,metaData)=>dispatch(addContact(userInfo,metaData)),
  resendSecondaryVerificationAction:(emailId)=>dispatch(resendSecondaryVerification(emailId)),
  resendPrimaryVerificationAction:(emailId)=>dispatch(resendPrimaryVerification(emailId)),
  createAlternateEmailAction:(emailId)=>dispatch(createAlternateEmail(emailId)),
  deleteEmailAction:(emailId)=>dispatch(deleteEmail(emailId)),
  setSecondaryAsPrimaryEmailAction:(emailId)=>dispatch(setSecondaryAsPrimaryEmail(emailId)),
  deleteNumberAction:()=>dispatch(deleteNumber()),
  verifyOTPAction:(data,metaData)=>dispatch(verifyOTP(data,metaData)),
  sendOTPAction:()=>dispatch(sendOTP()),
  resetManageContactAction:()=>dispatch(resetManageContact()),
  getUserInfoAction: () => dispatch(getUserInfo()),
 
});};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageContactDetailsContainer)
