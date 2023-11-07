import React, { Component, Fragment } from "react";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  BackHandler,
  TextInput,
  Linking,
  Alert,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import FastImage from 'react-native-fast-image'
import * as IMAGE_CONST from "../../constants/ImageConst";
import { colours } from "../../constants/ColorConst";
import * as IMG_CONST from "../../constants/ImageConst";
import * as STR_CONST from "../../constants/StringConst";
import * as KEY_CONST from "../../helpers/config";
// import * as WebBrowser from "expo-web-browser";
import Validators from "../../../src/helpers/Validator";
import styles from "./SignUpComponent_Style";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import TransLoader from "trans-loader";
// import * as Facebook from "expo-facebook";
import createUser from "../../actions/signUpActions";
import { connect } from "react-redux";
import { socialLogin, signIn } from "../../actions/loginActions";
import { clearSignupError } from "../../actions/signUpActions";
// import { trackEventDetails } from "../../helpers/segmentMethods";
import * as CustomAlert from "../../utils/showAlert";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import * as Utils from "../../utils/commonMethods";
import { resetNetworkStatus } from "../../actions/commonActions";
import PasswordCheckView from "../../components/passwordPattern/PasswordPatternCheckView";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import jwt_decode from "jwt-decode";
import scale, { verticalScale } from "../../helpers/scale";
import * as CONFIG from "../../helpers/config";
import { Platform } from "react-native";
import { v4 as uuid } from 'uuid';
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
const FIRST = 1;
const LAST = 2;
const EMAIL = 3;
const PASSWORD = 4;
const CONFIRM_PASSWORD = 5;
class SignUpComponent extends Component {
  constructor(props) {

    super(props);
    GoogleSignin.configure({
      webClientId: KEY_CONST.WEB_CLIENT_URL,
      offlineAccess: true,
      hostedDomain: "",
      loginHint: "",
      forceConsentPrompt: true,
      accountName: "",
    });
    this.state = {
      loading: false,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      isHidePassword: true,
      isHideConfirmPassword: true,
      isSignUpPressed: false,
      showNetworkPopUp: false,
      isFocusName: false,
      isFocusLastName: false,
      isFocusEmail: false,
      isFocusPassword: false,
      isFocusConfirmPass: false,
    };
    this.validateArray = [];
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    };
  };

  componentDidMount() {


    GoogleSignin.configure()
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );
  }

  handleBackPress = async () => {
    this.props.navigation.navigate("SignIn");
    return true;
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  verifyValidation(item) {
    const index = this.validateArray.indexOf(item);
    if (index !== -1) return true;
    return false;
  }

  componentWillReceiveProps(nextProps) {

    const { navigation } = this.props;
    if (this.props.isLoggedIn !== nextProps.isLoggedIn) {
      let email = this.state.email;
      let password = this.state.password
      let sessionId = uuid.v4()
      const userData = {
        user: {
          email: email,
          password: password,
          sessionId: sessionId
        },
      };
      if (email && password) {
        this.props.signInAction(userData);
      }

      setTimeout(() => {
        this.setState({
          email:"",
          password:""
        })
      }, 1000);
        }
    if (
      nextProps.signUpError &&
      this.props.signUpError !== nextProps.signUpError
    ) {
      CustomAlert.showOkAlert(nextProps.signUpError, STR_CONST.ALERT, () =>
        this.clearSignupError()
      );
    }
    if (
      this.props.isNetworkFailed !== nextProps.isNetworkFailed &&
      nextProps.isNetworkFailed &&
      nextProps.noNetworkScreen == "SIGN_UP"
    ) {
      this.setState({
        showNetworkPopUp: true,
      });
    }
  }

  clearSignupError() {
    this.props.clearSignupError();
  }

  
  validation = () => {
    this.validateArray = [];
    this.setState({
      isSignUpPressed: true,
    });
    let firstName = this.state.firstName.trim();
    let lastName = this.state.lastName.trim();
    let email = this.state.email.trim();
    let password = this.state.password.trim();
    let confirmPassword = this.state.confirmPassword.trim();
    if (!this.validateName(firstName)) {
      this.validateArray.push(FIRST);
      return;
    } else if (!this.validateName(lastName)) {
      this.validateArray.push(LAST);
      return;
    } else
      if (!email || !Validators.validEmail(email)) {
        this.validateArray.push(EMAIL);
        return;
      } else if (
        !password ||
        password.length < 8 ||
        !Utils.hasLowerCase(password) ||
        !Utils.hasUpperCase(password) ||
        !Utils.hasNumber(password)
      ) {
        this.validateArray.push(PASSWORD);
        return;
      } else if (password !== confirmPassword) {
        this.validateArray.push(CONFIRM_PASSWORD);
        return;
      }
    // Method to send user details for sign up
    this.signUp();
  }


  //Sign Up Method
  signUp = async () => {
    // console.log("yes check inside the signup function ####### ")
    const { firstName, lastName, email, password } = this.state;
    const userInfo = {};
    userInfo["first_name"] = firstName;
    userInfo["last_name"] = lastName;
    userInfo["email"] = email;
    userInfo["password"] = password;
    userInfo["password_confirmation"] = password;
    userInfo["affiliate_id"] = "",
      userInfo["currency"] = "",
      userInfo["membership_type"] = "",
      userInfo["selected_plan"] = "",
      userInfo["no_trial"] = false
    userInfo["sessionId"] = uuid.v4()


    this.setState({ isLoading: true });









    // console.log("check here before user ",userInfo)
    this.props.createUserAction(
      { user: userInfo },
      (res) => this.createUserSuccessCallBack(res),
      (res) => this.createUserFailureCallBack(res)
    );

  };



  // Sign Up Success Call Back
  createUserSuccessCallBack() {
    const { navigation } = this.props;
    this.setState({ isLoading: false });
    navigation.navigate("FindFlightContainerScreen");
  }

  // Sign Up Failure Call Back
  createUserFailureCallBack(res) {
    this.setState({ isLoading: false });
    alert(res.error);
  }

  _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      alert("User is already signed in");
      //Get the User details as user is already signed in
      this._getCurrentUserInfo();
    } else {
      console.log("Please Login");
    }
    this.setState({ gettingLoginStatus: false });
  };
  _getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo: userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        Alert.alert("User has not signed in yet");
      } else {
        Alert.alert("Something went wrong. Unable to get user's info");
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo: userInfo });
    } catch (error) {
      console.log("Message", error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User Cancelled the Login Flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Signing In");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play Services Not Available or Outdated");
      } else {
        console.log("Some Other Error Happened");
      }
    }
  };


  handleFacebookLogin = async () => {
    try {
      if(AccessToken.getCurrentAccessToken() != null){
        LoginManager.logOut();
      }
      let behavior = Platform.OS === 'ios' ? 'Native' : 'NATIVE_ONLY';
      if (behavior === 'native') {
        LoginManager.setLoginBehavior(Platform.OS === 'ios' ? 'native' : 'NATIVE_ONLY');
      } else if (behavior === 'web') {
        LoginManager.setLoginBehavior(Platform.OS === 'ios' ? 'browser' : 'WEB_ONLY');
      }
      const PERMISSIONS = [ 'public_profile', 'email' ];
      const result = await LoginManager.logInWithPermissions(PERMISSIONS);
      if (result.isCancelled) {
        console.log('Facebook login was canceled.');
      } else {
        const tokenData = await AccessToken.getCurrentAccessToken();
        if (tokenData) {
          const accessToken = tokenData.accessToken.toString();
          console.log('Facebook login successful. Access Token:', accessToken);
          this.fetchUserProfile(accessToken);
        }else{
        }
      }
    } catch (error) {
      console.error('Facebook login error:', error);
    }
  };
  
  fbLoginAction = async (result, accessToken) => {

    console.log('fbLoginAction >>> ',' --------------- fbLoginAction');
    const { id, email, name, picture } = result;
    const userInfo = {};
    let imageObject = {};

    const image = await Utils.getImageInfo(picture.data.url);
            imageObject["uri"] = picture.data.url  ?  picture.data.url : 
            imageObject["type"] =  image._data.type.split("/")[1] ? image._data.type.split("/") : "jpg"
            imageObject["fileName"] = "RFFUser";

    let userName = name.split(" ");
    userInfo.auth_uid = id;
    userInfo.auth_token = accessToken;
    userInfo.provider = "facebook";
    userInfo.platform = "mobile";
    userInfo.email = email;
    userInfo.image = "";
    userInfo.first_name = userName[0];
    userInfo.last_name = userName[1];

    this.setState({ isLoading: true });
    await AsyncStorage.setItem("socialLogin", "true")
    this.props.socialLoginAction(
      { user: userInfo },
      (res) => this.socialLoginSuccessCallBack(res, STR_CONST.SIGN_IN_FB_EVENT),
      (res) => this.socialLoginFailureCallBack(res),
      imageObject ? imageObject : null,
      imageObject.type ? imageObject.type : null
    );
  }
  fetchUserProfile = async (accessToken) => {
    console.log('fetchUserProfile >>> ',' --------------- fetchUserProfile');
    const request = new GraphRequest(
      '/me',
      {
        parameters: {
          fields: {
            string: 'id,name,email,picture.type(large)',
          },
        },
      },
      (error, result) => {
        if (error) {
          CustomAlert.showOkAlert(STR_CONST.SOMETHING_WENT_WRONG);
        } else {
          console.log('Result >>> ',result);
          this.fbLoginAction(result, accessToken);
        }
      }
    );

    new GraphRequestManager().addRequest(request).start();
  };
  onPressGoogleSocialLogin = async () => {
    this.setState({ isLoading: true });
    try {
      try {
        let imageObject = {};
        await GoogleSignin.hasPlayServices({
          //Check if device has Google Play Services installed.
          //Always resolves to true on iOS.
          showPlayServicesUpdateDialog: true,
        });
        const userGoogleInfo = await GoogleSignin.signIn();
        const tokens = await GoogleSignin.getTokens();

        this.setState({ userInfo: userGoogleInfo });

        console.log("yes chekc here  - - - - - - ", userGoogleInfo.user.photo)

        const image = await Utils.getImageInfo(userGoogleInfo.user.photo);
           if (userGoogleInfo.user.photo && userGoogleInfo.user.photo !== undefined && userGoogleInfo.user.photo !== null) {
          imageObject["uri"] = userGoogleInfo.user.photo ? userGoogleInfo.user.photo : null
          imageObject["type"] = image ? image.type.split("/")[1] : null
          imageObject["fileName"] = "RFFUser";
        }

        let sessionId = uuid.v4()

        const userInfo = {};

        userInfo.membership_type = "month"
        userInfo.currency = "GBP"
        userInfo.referralCoupon = null
        userInfo.no_trial = false
        userInfo.affiliate_id = ""
        userInfo.utm_medium = ""
        userInfo.utm_source = ""
        userInfo.sessionId = sessionId
        userInfo.auth_uid = userGoogleInfo.user.id;
        userInfo.auth_token = tokens.accessToken;
        userInfo.provider = "google";
        userInfo.platform = "mobile";
        userInfo.email = userGoogleInfo.user.email;
        userInfo.image = userGoogleInfo.user.photo
          ? userGoogleInfo.user.photo
          : "";

        userInfo.first_name = userGoogleInfo.user.givenName;
        userInfo.last_name = userGoogleInfo.user.familyName;
        await AsyncStorage.setItem("socialLogin", "true")
        this.props.socialLoginAction(
          { user: userInfo },
          (res) => this.socialLoginSuccessCallBack(res, STR_CONST.SIGN_IN_GOOGLE_EVENT),
          (res) => this.socialLoginFailureCallBack(res),
          imageObject ? imageObject : null,
          imageObject.type ? imageObject.type : null
        );
      } catch (error) {
        console.log("Message", error.message);
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          console.log("User Cancelled the Login Flow");
        } else if (error.code === statusCodes.IN_PROGRESS) {
          console.log("Signing In");
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.log("Play Services Not Available or Outdated");
        } else {
          Alert.alert("Your Google Signing Key Expired.")
          console.log("Some Other Error Happened --------------");
        }
      }
    } catch (e) {
      this.setState({ isLoading: false });
      CustomAlert.showOkAlert(STR_CONST.GOOGLE_LOGIN_CANCELLED);
    }
  };



  async onAppleButtonPress() {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    var decoded = jwt_decode(appleAuthRequestResponse.identityToken);
    const userInfo = {};
    userInfo.auth_uid = appleAuthRequestResponse.user;
    userInfo.auth_token = appleAuthRequestResponse.identityToken;
    userInfo.provider = "apple";
    userInfo.platform = "mobile";
    userInfo.nonce = appleAuthRequestResponse.nonce
    userInfo.email = appleAuthRequestResponse.email
      ? appleAuthRequestResponse.email
      : decoded.email;
    userInfo.first_name = appleAuthRequestResponse.fullName.givenName ? appleAuthRequestResponse.fullName.givenName : "Test";
    userInfo.last_name = appleAuthRequestResponse.fullName.familyName ? appleAuthRequestResponse.fullName.familyName : "User";
    this.setState({ isLoading: true });
    await AsyncStorage.setItem("socialLogin", "true")
    this.props.socialLoginAction(
      { user: userInfo },
      (res) => this.socialLoginSuccessCallBack(res, STR_CONST.SIGN_IN_APPLE_EVENT),
      (res) => this.socialLoginFailureCallBack(res),
      null,
      null
    );
  }

  // Social Login Success Call Back
  socialLoginSuccessCallBack(res, eventText) {
    const { navigation } = this.props;
    this.setState({ isLoading: false });
    navigation.navigate("FindFlightContainerScreen");
    // trackEventDetails(eventText, null, this.props.userData);
  }

  // Social Login Failure Call Back
  socialLoginFailureCallBack(res) {
    this.setState({ isLoading: false });
    Alert.alert(res.error);
  }

  renderLogoContainer() {
    return (
      <View style={styles.logoContainer}>
        <FastImage resizeMode="contain" style={styles.rffLogo} source={IMG_CONST.RFF_LOGO} />
      </View>
    );
  }
  validateName(name) {
    if (name.length < 3 || !Validators.validName(name)) {
      return false;
    }
    return true;
  }

  renderInputFields() {
    const {
      isSignUpPressed,
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
      isHideConfirmPassword,
      isHidePassword,
    } = this.state;
    return (
      <View style={styles.inputFieldContainer}>
        <View style={styles.firstNameContainer} />

        <View style={styles.passContainer1}>
          <TextInput
            style={[
              styles.input,
              {
                borderBottomColor:
                  isSignUpPressed && Utils.isEmptyString(password)
                    ? colours.errorColor
                    : colours.borderBottomLineColor,
                    width:scale(240),borderWidth:0
              },
            ]}
            underlineColorAndroid={'#FFFFFF'}
            placeholder={STR_CONST.FIRST_NAME}
            onFocus={() => {
              this.setState({
                isFocusName: true
              })
            }}
            onBlur={() => {
              this.setState({
                isFocusName: false
              })
            }}
            placeholderTextColor={this.state.isFocusName ? colours.lightGreyPlaceholder : null}
            autoCapitalize={"words"}
            onChangeText={(firstName) => {
              this.setState({ firstName });
            }}
            value={firstName}
            onSubmitEditing={() => {
              this.secondTextInput.focus();
            }}
            blurOnSubmit={false}
            maxLength={20}
            returnKeyType="next"
          />
        </View>

        {isSignUpPressed && !this.validateName(firstName) && (
          <Text style={styles.errorMessageTextStyle}>
            {STR_CONST.PLEASE_ENTER_FIRST_NAME}
          </Text>
        )}
        <View style={styles.fieldContainer}>
          <View style={styles.passContainer1}>
            <TextInput
              ref={(input) => {
                this.secondTextInput = input;
              }}
              style={[
                styles.input,
                {
                  borderBottomColor:
                    isSignUpPressed && Utils.isEmptyString(password)
                      ? colours.errorColor
                      : colours.borderBottomLineColor,
                      width:scale(240),borderWidth:0
                },
              ]}
              placeholder={STR_CONST.LAST_NAME}
              onFocus={() => {
                this.setState({
                  isFocusLastName: true
                })
              }}
              onBlur={() => {
                this.setState({
                  isFocusLastName: false
                })
              }}
              placeholderTextColor={this.state.isFocusLastName ? colours.lightGreyPlaceholder : null}
              autoCapitalize={"words"}
              onChangeText={(lastName) => {
                this.setState({ lastName });
              }}
              value={lastName}
              onSubmitEditing={() => {
                this.thirdTextInput.focus();
              }}
              blurOnSubmit={false}
              maxLength={20}
              returnKeyType="next"
            />
          </View>
        </View>

        {isSignUpPressed && !this.validateName(lastName) && (
          <Text style={styles.errorMessageTextStyle}>
            {STR_CONST.PLEASE_ENTER_LAST_NAME}
          </Text>
        )}

        <View style={styles.fieldContainer}>

          <View style={styles.passContainer1}>

            <TextInput
              ref={(input) => {
                this.thirdTextInput = input;
              }}
              style={[
                styles.input,
                {
                  borderBottomColor:
                    isSignUpPressed && Utils.isEmptyString(password)
                      ? colours.errorColor
                      : colours.borderBottomLineColor,
                      width:scale(230),               
                },
              ]}
              placeholder={STR_CONST.EMAIL}
              onFocus={() => {
                this.setState({
                  isFocusEmail: true
                })
              }}
              onBlur={() => {
                this.setState({
                  isFocusEmail: false
                })
              }}
              placeholderTextColor={this.state.isFocusEmail ? colours.lightGreyPlaceholder : null}
              autoCapitalize="none"
              onChangeText={(email) => {
                this.setState({ email });
              }}
              keyboardType={"email-address"}
              value={this.state.email}
              onSubmitEditing={() => {
                this.fourthTextInput.focus();
              }}
              blurOnSubmit={false}
              returnKeyType="next"
              underlineColorAndroid={'#FFFFFF'}
            />
            <TouchableOpacity style={styles.emailContainer}>
              <FastImage
                style={
                  { height: scale(20), width: scale(20), marginBottom: scale(4), marginRight: scale(5) }
                }
                resizeMode="contain"
                source={IMG_CONST.EMAIL_LOGO
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        {isSignUpPressed && email !== "" && !Validators.validEmail(email) && (
          <Text style={styles.errorMessageTextStyle}>
            {STR_CONST.PLEASE_ENTER_VALID_EMAIL}
          </Text>
        )}

        <View style={styles.fieldContainer}>

          <View style={styles.passContainer1}>

            <TextInput
              ref={(input) => {
                this.fourthTextInput = input;
              }}
              style={[
                styles.input,
                {
                  borderBottomColor:
                    isSignUpPressed && Utils.isEmptyString(password)
                      ? colours.errorColor
                      : colours.borderBottomLineColor,
                      width:scale(240),borderWidth:0
                },
              ]}
              placeholder={STR_CONST.PASSWORD}
              onFocus={() => {
                this.setState({
                  isFocusPassword: true
                })
              }}
              onBlur={() => {
                this.setState({
                  isFocusPassword: false
                })
              }}
              placeholderTextColor={this.state.isFocusPassword ? colours.lightGreyPlaceholder : null}
              autoCapitalize="none"
              onChangeText={(password) => {
                this.setState({ password });
              }}
              maxLength={20}
              secureTextEntry={this.state.isHidePassword}
              value={this.state.password}
              underlineColorAndroid={'#FFFFFF'}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.fivethTextInput.focus()
              }}
            />
            <TouchableOpacity
              onPress={() =>
                this.setState({ isHidePassword: !this.state.isHidePassword })
              }
              style={styles.eyeContainer}
            >
              <FastImage
                style={
                  this.state.isHidePassword
                    ? styles.inVisibleEye
                    : styles.visibleEye
                }
                source={
                  this.state.isHidePassword
                    ? IMG_CONST.EYE_INVISIBLE
                    : IMG_CONST.EYE_VISIBLE
                }
              />
            </TouchableOpacity>
          </View>

        </View>

        <View style={{ marginStart: Platform.OS === "android" ? scale(10) : scale(0) }}>
          {password.length !== 0 && <PasswordCheckView password={password} />}
        </View>
        <View style={styles.fieldContainer}>

          <View style={styles.passContainer1}>
            <TextInput
              underlineColorAndroid='rgba(0,0,0,0)'
              ref={(input) => {
                this.fivethTextInput = input;
              }}
              style={[
                styles.input,
                {
                  borderBottomColor:
                    isSignUpPressed &&
                      (Utils.isEmptyString(confirmPassword) ||
                        this.verifyValidation(CONFIRM_PASSWORD))
                      ? colours.errorColor
                      : colours.borderBottomLineColor,
                      width:scale(240),borderWidth:0
                },
              ]}
              placeholder={STR_CONST.CONFIRM_PASSWORD}
              onFocus={() => {
                this.setState({
                  isFocusConfirmPass: true
                })
              }}
              onBlur={() => {
                this.setState({
                  isFocusConfirmPass: false
                })
              }}
              placeholderTextColor={this.state.isFocusConfirmPass ? colours.lightGreyPlaceholder : null}
              autoCapitalize={"none"}
              onChangeText={(confirmPassword) => {
                this.setState({ confirmPassword });
              }}
              textContentType={"password"}
              secureTextEntry={isHideConfirmPassword}
              value={confirmPassword}
              blurOnSubmit={false}
              maxLength={20}
              onSubmitEditing={() => {
                Keyboard.dismiss(), this.validation();
              }}
              returnKeyType="done"
            />
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  isHideConfirmPassword: !isHideConfirmPassword,
                })
              }
              style={styles.eyeContainer}
            >
              <FastImage
                style={
                  isHideConfirmPassword ? styles.visibleEye : styles.inVisibleEye
                }
                source={
                  isHideConfirmPassword
                    ? IMG_CONST.EYE_INVISIBLE
                    : IMG_CONST.EYE_VISIBLE
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        {isSignUpPressed &&
          confirmPassword !== "" &&
          confirmPassword !== password && (
            <Text style={styles.errorMessageTextStyle}>
              {STR_CONST.PASSWORD_NOT_MATCH} {" "}
            </Text>
          )}
      </View>
    );
  }

  renderButtonContainer = () => {
    const { firstName, lastName, email, password, confirmPassword } = this.state
    return (
      <Fragment>
        {
          firstName && lastName && email && password && confirmPassword ?
            <TouchableOpacity
              onPress={() => this.validation()}
              activeOpacity={0.7}
              style={[styles.signUpButton, {
                backgroundColor: colours.lightBlueTheme,
              }]}
            >
              <Text style={styles.signInText}>{STR_CONST.SIGN_UP_TEXT}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
              style={[styles.signUpButton, {
                backgroundColor: "gray"
              }]}
              activeOpacity={0.7}
            >
              <Text style={styles.signInText}>{STR_CONST.SIGN_UP_TEXT}</Text>
            </TouchableOpacity>
        }
      </Fragment>
    );
  }



  renderGoogleFBButtonContainer() {
    return (
      <View style={styles.googleFBContainer}>
        <Text style={styles.orSignInText}>{"Or sign-up with"}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.onPressGoogleSocialLogin()}
            style={styles.googleFb}
          >
            <FastImage style={styles.googleButton} resizeMode="contain" source={IMG_CONST.GOOGLE_ICON} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.handleFacebookLogin()}
            style={styles.googleFb}
          >
            <FastImage style={styles.googleButton} resizeMode="contain"  source={IMG_CONST.FB_ICON} />
          </TouchableOpacity>
          {!Utils.isAndroid() && (
            <TouchableOpacity
              onPress={() => this.onAppleButtonPress()}
              style={styles.googleFb}
            >
              <FastImage style={styles.googleButton} source={IMG_CONST.APPLE_ICON} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  renderBottomTextContainer() {
    return (
      <View style={styles.bottomContainer}>
        <Text style={styles.orSignInText}>
          {STR_CONST.ALREADY_HAVE_AN_ACCOUNT}
          <Text
            onPress={() => this.props.navigation.navigate("SignIn")}
            style={styles.signUpText}
          >
            {STR_CONST.SIGN_IN}
          </Text>
        </Text>
      </View>
    );
  }

  render() {
    return (
      <FastImage source={IMAGE_CONST.SIGN_UP_BG} resizeMode="cover" style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }}>
       <KeyboardAwareScrollView
          keyboardShouldPersistTaps={"handled"}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {this.renderLogoContainer()}
          {this.renderInputFields()}
          {this.renderButtonContainer()}
          <Text
            style={[
              styles.orSignInText,
              {
                width: scale(320),
                color: colours.darkBlueTheme,
                textAlign: 'center',
                marginTop: verticalScale(20),
              },
            ]}
          >
            {STR_CONST.SIGNING_INFO}
            <Text
              onPress={() => Linking.openURL(CONFIG.PRIVACY_POLICY_URL)}
              style={styles.linkText}
            >
              {STR_CONST.PRIVACY_POLICY}
            </Text>{" "}
            <Text>{"& "}</Text>
            <Text
              onPress={() => Linking.openURL(CONFIG.TERMS_CONDITIONS_URL)}
              style={styles.linkText}
            >
              {STR_CONST.TERMS_OF_USE}
            </Text>
          </Text>
          {this.renderGoogleFBButtonContainer()}
          {this.renderBottomTextContainer()}
        </KeyboardAwareScrollView>
        <TransLoader isLoading={this.state.isLoading} />
      </FastImage>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUserAction: (userData, successCallback, errorCallback) =>
      dispatch(createUser(userData, successCallback, errorCallback)),
    signInAction: (userData) => dispatch(signIn(userData)),
    socialLoginAction: (
      userData,
      successCallback,
      errorCallback,
      imageObject,
      extension
    ) =>
      dispatch(
        socialLogin(
          userData,
          successCallback,
          errorCallback,
          imageObject,
          extension
        )
      ),
    clearSignupError: () => dispatch(clearSignupError()),
    resetNetworkStatusAction: () => dispatch(resetNetworkStatus()),
  };
};

const mapStateToProps = (state) => {
  const { signUp, logIn, common, userInfo } = state;
  return {
    signUpSuccess: signUp.signUpSuccess,
    isLoggedIn: logIn.isLoggedIn,
    signUpError: signUp.signUpError,
    isNetworkFailed: common.isNetworkFailed,
    noNetworkScreen: common.noNetworkScreen,
    userData: userInfo.userData,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUpComponent);