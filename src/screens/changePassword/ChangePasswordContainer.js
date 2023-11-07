/**
 * Date: Sept 27, 2020
 * Description: Change Password Screen.
 *
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updatePassword,
  resetPasswordUpdate,
} from "../../actions/userActions";
import ChangePasswordComponent from "./ChangePasswordComponent";
import {Alert} from 'react-native'
class ChangePasswordContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: this.props.userInfo,
    };
  }

  async componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (
        this.props.passwordUpdated !== prevProps.passwordUpdated &&
        this.props.passwordUpdated
      ) {
        this.props.navigation.navigate("ProfileScreen")
        this.props.resetPasswordUpdateAction();
      } else if (this.props.passwordError) {
        Alert.alert(this.props.passwordError);
        this.props.resetPasswordUpdateAction();
      }
    }
  }

  render() {
    return (
      <ChangePasswordComponent
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { userInfo } = state;
  return {
    passwordError: userInfo.passwordError,
    passwordUpdated: userInfo.passwordUpdated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePasswordAction: (passData) => dispatch(updatePassword(passData)),
    resetPasswordUpdateAction: () => dispatch(resetPasswordUpdate()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordContainer);
