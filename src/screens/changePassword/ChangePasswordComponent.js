import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  BackHandler,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform
} from "react-native";
import ScreenHeader from "../../components/header/Header";
import * as STRING_CONST from "../../constants/StringConst";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import styles from "./ChangePasswordStyles";
import * as STR_CONST from "../../constants/StringConst";
import CustomButton from "../../components/customComponents/CustomButton";
import PasswordCheckView from '../../components/passwordPattern/PasswordPatternCheckView'
import * as Utils from '../../utils/commonMethods'
import * as IMG_CONST from "../../constants/ImageConst";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FastImage from 'react-native-fast-image'
import * as IMAGE_CONST from "../../constants/ImageConst";
import MyStatusBar from "../../components/statusbar";

export default class ChangePasswordComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      oldPswdEye: true,
      newPswdEye: true,
      cnfmPswdEye: true,
      isSubmitPasswordPressed: false,
    };
  }

  handleBackButton = (nav) => {
    if (!nav.isFocused()) {
      BackHandler.removeEventListener('hardwareBackPress', () =>
        this.handleBackButton(this.props.navigation),
      );
      return false;
    } else {
      nav.goBack();
      return true;
    }
  };



  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
  }


  async changePassword() {
    var passwordInfo = {};
    passwordInfo["current_password"] = this.state.oldPassword;
    passwordInfo["password"] = this.state.newPassword;
    passwordInfo["password_confirmation"] = this.state.confirmPassword;
    this.props.updatePasswordAction(passwordInfo);
    this.setState({
      isSubmitPasswordPressed: false,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.userData !== prevProps.userData) {
      }
    }
  }

  renderBottomButton(buttonText, onPressCallBack) {
    return (
      <View style={[styles.bottomButtonContainer]}>
        <CustomButton
          textSize={scale(17)}
          buttonColor={colours.lightBlueTheme}
          textColor={colours.white}
          textOnButton={buttonText}
          onButtonPress={() => onPressCallBack()}
        />
      </View>
    );
  }

  editPasswordView() {
    const {
      oldPassword,
      newPassword,
      confirmPassword,
      isSubmitPasswordPressed,
    } = this.state;
    return (
      <View style={{ margin: scale(20) }}>
        <View style={styles.modalInputView}>
          <View style={{ marginTop: verticalScale(10) }}>
            <Text
              style={[
                styles.textInputHeading,
                {
                  marginLeft: scale(24),
                  color:
                    isSubmitPasswordPressed && oldPassword == ""
                      ? colours.errorColor
                      : colours.black,
                },
              ]}
            >
              {STRING_CONST.OLD_PASSWORD}
              <Text style={{ color: "red" }}>*</Text>
            </Text>

            <View
              style={[
                styles.textInputView,
                {
                  marginLeft: scale(24),
                  backgroundColor: colours.transparentColor,
                  borderBottomColor:
                    isSubmitPasswordPressed && oldPassword == ""
                      ? colours.errorColor
                      : colours.borderBottomLineColor,
                },
              ]}
            >
              <TextInput
                style={styles.textInput}
                underlineColorAndroid="transparent"
                placeholder=""
                autoCapitalize={"none"}
                onChangeText={(value) => {
                  this.setState({ oldPassword: value });
                }}
                value={this.state.oldPassword}
                blurOnSubmit={false}
                secureTextEntry={this.state.oldPswdEye}
              />
              <TouchableOpacity
                onPress={() =>
                  this.setState({ oldPswdEye: !this.state.oldPswdEye })
                }
                style={styles.eyeContainer}
              >
                <Image
                  style={
                    this.state.oldPswdEye
                      ? styles.inVisibleEye
                      : styles.visibleEye
                  }
                  source={
                    this.state.oldPswdEye
                      ? IMG_CONST.EYE_INVISIBLE
                      : IMG_CONST.EYE_VISIBLE
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.modalInputView}>
          <View style={{ marginTop: verticalScale(10), marginBottom: verticalScale(-15) }}>
            <Text
              style={[
                styles.textInputHeading,
                {
                  marginLeft: scale(24),
                  color:
                    isSubmitPasswordPressed && newPassword == ""
                      ? colours.errorColor
                      : colours.black,
                },
              ]}
            >
              {STRING_CONST.NEW_PASSWORD}
              <Text style={{ color: colours.redColor }}>*</Text>
            </Text>
            <View
              style={[
                styles.textInputView,
                {
                  marginLeft: scale(24),
                  backgroundColor: colours.transparentColor,
                  borderBottomColor:
                    isSubmitPasswordPressed && newPassword == ""
                      ? colours.errorColor
                      : colours.borderBottomLineColor,
                },
              ]}
            >
              <TextInput
                style={styles.textInput}
                underlineColorAndroid="transparent"
                placeholder=""
                autoCapitalize={"none"}
                onChangeText={(value) => {
                  this.setState({ newPassword: value });
                }}
                value={this.state.newPassword}
                blurOnSubmit={false}
                secureTextEntry={this.state.newPswdEye}
              />
              <TouchableOpacity
                onPress={() =>
                  this.setState({ newPswdEye: !this.state.newPswdEye })
                }
                style={styles.eyeContainer}
              >
                <Image
                  style={
                    this.state.newPswdEye
                      ? styles.inVisibleEye
                      : styles.visibleEye
                  }
                  source={
                    this.state.newPswdEye
                      ? IMG_CONST.EYE_INVISIBLE
                      : IMG_CONST.EYE_VISIBLE
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <PasswordCheckView password={this.state.newPassword} />

        <View style={styles.modalInputView}>
          <View style={{ marginTop: verticalScale(10) }}>
            <Text
              style={[
                styles.textInputHeading,
                {
                  marginLeft: scale(24),
                  marginLeft: scale(24),
                  color:
                    isSubmitPasswordPressed && confirmPassword == ""
                      ? colours.errorColor
                      : colours.black,
                },
              ]}
            >
              {STRING_CONST.CONFIRM_PASSWORD}
              <Text style={{ color: colours.redColor }}>*</Text>
            </Text>
            <View
              style={[
                styles.textInputView,
                {
                  marginLeft: scale(24),
                  backgroundColor: colours.transparentColor,
                  borderBottomColor:
                    isSubmitPasswordPressed && confirmPassword == ""
                      ? colours.errorColor
                      : colours.borderBottomLineColor,
                },
              ]}
            >
              <TextInput
                style={styles.textInput}
                underlineColorAndroid="transparent"
                placeholder=""
                autoCapitalize={"none"}
                onChangeText={(value) => {
                  this.setState({ confirmPassword: value });
                }}
                value={this.state.confirmPassword}
                blurOnSubmit={false}
                secureTextEntry={this.state.cnfmPswdEye}
              />
              <TouchableOpacity
                onPress={() =>
                  this.setState({ cnfmPswdEye: !this.state.cnfmPswdEye })
                }
                style={styles.eyeContainer}
              >
                <Image
                  style={
                    this.state.cnfmPswdEye
                      ? styles.inVisibleEye
                      : styles.visibleEye
                  }
                  source={
                    this.state.cnfmPswdEye
                      ? IMG_CONST.EYE_INVISIBLE
                      : IMG_CONST.EYE_VISIBLE
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {isSubmitPasswordPressed && newPassword !== confirmPassword && (
          <Text
            style={[
              styles.errorMessage,
              {
                marginBottom: verticalScale(5),
              },
            ]}
          >
            {STR_CONST.PASSWORD_NOT_MATCH}
          </Text>
        )}
        {this.renderBottomButton(STR_CONST.SAVE_CHANGES, () => {
          this.setState(
            {
              isSubmitPasswordPressed: true,
            },
            () => {
              const { oldPassword, isSubmitPasswordPressed, newPassword, confirmPassword } = this.state
              if (
                isSubmitPasswordPressed &&
                oldPassword !== "" &&
                newPassword !== "" &&
                confirmPassword !== "" &&
                newPassword == confirmPassword &&
                newPassword.length >= 8 && Utils.hasLowerCase(newPassword) && Utils.hasUpperCase(newPassword) && Utils.hasNumber(newPassword)
              ) {
                this.changePassword();
                this.setState({
                  isSubmitPasswordPressed: false,
                });
              }
            }
          );
        })}
      </View>
    );
  }


  renderHeader(alertLength) {
    const { alertCount } = this.state;
    return (
      <View style={styles.headerMainView}>
        <View style={{ marginTop: Platform.OS == "android"? scale(16) : scale(40) }}>
          <ScreenHeader
            {...this.props}
            left
            title={STR_CONST.CHANGE_PASSWORD}
            notifCount={2}
            clickOnLeft={() =>
              this.props.navigation.navigate("ProfileScreen")
            }
          />
        </View>
      </View>
    )
  }




  renderButton(buttonText, onPress) {
    return (
      <CustomButton
        textOnButton={buttonText}
        textSize={scale(18)}
        onButtonPress={() => {
          onPress();
        }}
        buttonColor={colours.white}
        buttonStyle={[styles.buttonStyle]}
        textColor={colours.lightBlueTheme}
      />
    );
  }


  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <MyStatusBar />
        {this.renderHeader()}
        <KeyboardAwareScrollView enableOnAndroid={false} extraHeight={70} extraScrollHeight={70} showsVerticalScrollIndicator={false}  >
          <View style={{ flex: 1, justifyContent: STRING_CONST.CENTER, alignItems: STRING_CONST.CENTER}}>
            {this.editPasswordView()}
          </View>
          </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
