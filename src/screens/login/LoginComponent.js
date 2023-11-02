import React, { Component, Fragment } from "react";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
  TextInput,
  Keyboard,
  Alert,
  Linking,
  Platform,
  ImageBackground
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'

// import * as WebBrowser from "expo-web-browser";
import scale, { verticalScale } from "../../helpers/scale";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import TransLoader from "trans-loader";
// import * as Facebook from "expo-facebook";
import Validators from "../../helpers/Validator";
import styles from "./LoginComponent_Style";
import * as STR_CONST from "../../constants/StringConst";
import * as IMG_CONST from "../../constants/ImageConst";
import * as KEY_CONST from "../../helpers/config";
import 'react-native-get-random-values'
import FastImage from 'react-native-fast-image'
import { v4 as uuid } from 'uuid'
// import { trackEventDetails } from "../../helpers/segmentMethods";
// import { CheckoutCart, CBCheckoutParams, CBCheckoutProps } from "@chargebee/react-native-chargebee";
import {
  socialLogin,
  signIn,
  clearLoginError,
  setLoginStatus
} from "../../actions/loginActions";
import * as CustomAlert from "../../utils/showAlert";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { colours } from "../../constants/ColorConst";
import * as Utils from "../../utils/commonMethods";
import { resetNetworkStatus } from "../../actions/commonActions";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import jwt_decode from "jwt-decode";
import { getCountryList } from "../../actions/userActions";
import SvgUri from 'react-native-svg-uri';
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import { GenerateUUID } from "react-native-uuid"
// import crashlytics from "@react-native-firebase/crashlytics";
class LoginComponent extends Component {
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
      isLoading: false,
      email: "",
      password: "",
      isHidePassword: true,
      isLoginPressed: false,
      isInvalidEmail: false,
      showNetworkPopUp: false,
      isOnFocus: false,
      isOnFocusPassword: false,
      // emailProps:this.props.route.params.email ? this.props.route.params.email : "",
      // passwordProps:this.props.route.params.password ? this.props.route.params.password : ""
    };
  }

  static navigationOptions = ({ navigation }) => ({
    header: null,
  });

  async componentDidMount() {
    // console.log("yes check here uuid  - - - - -",uuid())

    // crashlytics().log("App mounted.............................");
    await GoogleSignin.configure()
    this.props.getCountryListAction()
    await this.componentWillFocus();

    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      this.componentWillFocus.bind(this)
    );
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );
    await AsyncStorage.setItem("navigateToLogin", "true");

    // console.log("check param on did mount #########",this.props.navigation.getParam("email"))
    // if(this.props.route.params && this.props.route.params.email != undefined && this.props.route.params.email != "" && this.props.route.params.email != null){
    //   console.log("check param on did mount 111111 #########",this.props.route.params.email)    
    // }




  }

  async componentWillFocus() {
    await AsyncStorage.removeItem("authorizationHeader");
    AsyncStorage.removeItem("searchDetails");
    await AsyncStorage.removeItem("userId");
    await this.props.setLoginStatusAction(false)
  }

  _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      Alert.alert("User is already signed in");
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
    //Prompts a modal to let the user sign in into your application.
    try {
      await GoogleSignin.hasPlayServices({
        //Check if device has Google Play Services installed.
        //Always resolves to true on iOS.
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


  // checkPaymentWithChargebee()  {

  //   console.log("yes inside the chargebee payment fucntion - - - ")

  //   let hostedPageId = "1212"
  //   let stepName = "detailsView"

  //   Chargebee.configure({
  //     site: "SITE_NAME",
  //     publishableApiKey: "API-KEY",
  //     androidSdkKey: "Android SDK Key",
  //     iOsSdkKey: "iOS SDK Key",
  //   });


  //   return (
  //     <CheckoutCart
  //       onSuccess={(hostedPageId) => console.log("yes hostedPageId -   - -")}
  //       onEachStep={(stepName) => 
  //         console.log("yes on step name - - - - - - ")
  //        }
  //       site={"https://rewardflightfinder-test.chargebee.com"}
  //       planId={"gold-plan-gbp-yearly"}
  //       couponIds={"couponIds"}
  //       addons={"addons"}
  //       customer={"customer"}
  //       subscription={"subscription"}
  //       billingAddress={"billingAddress"}
  //     // items={"gold-plan-gbp-yearly"} // Only for V2
  //     />
  //   )
  // }





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


  componentWillReceiveProps(nextProps) {
    if (this.props.isLoggedIn !== nextProps.isLoggedIn && nextProps.userData) {

      let userDetails = nextProps.userData;
      // this.props.navigation.navigate("Authenticated");
      // ------------- Commented for now only------------------
      if (
        userDetails &&
        userDetails.first_name &&
        userDetails.last_name &&
        userDetails.country &&
        userDetails.address &&
        userDetails.age_band &&
        userDetails.flights_taken_annually
      ) {
        this.props.navigation.navigate("FindFlightContainerScreen");
      } else {

        let email = ""
        let password = ""
        if (this.props.route.params) {
          email = this.props.route.params.email
          password = this.props.route.params.password
        }

        const userData = {
          user: {
            email: email,
            password: password,
          },
        };

        this.setState({
          email:"",
          password:""
        })
        // this.props.signInAction(userData)                   
        // this.props.navigation.navigate("UpdateProfileScreen");      
        this.props.navigation.navigate("FindFlightContainerScreen");
      }
      // trackEventDetails(STR_CONST.SIGN_IN_EVENT, null, userDetails)
    }
    if (
      nextProps.loginError &&
      this.props.loginError !== nextProps.loginError
    ) {
      CustomAlert.showOkAlert(nextProps.loginError, STR_CONST.ALERT, () =>
        this.clearLoginError()
      );
    }
    if (
      this.props.isNetworkFailed !== nextProps.isNetworkFailed &&
      nextProps.isNetworkFailed &&
      nextProps.noNetworkScreen == "LOG_IN"
    ) {
      this.setState({
        showNetworkPopUp: true,
      });
    }
  }

  /**
   * clearLoginError will clean last login error
   */
  clearLoginError() {
    this.props.clearLoginError();
  }

  handleBackPress = async () => true;

  componentWillUnmount() {
    // this.backHandler.remove();
  }

  validation() {
    Keyboard.dismiss();
    this.setState({
      isLoginPressed: true,
    });
    const email = this.state.email.trim();
    let sessionId = uuid.v4()
    const password = this.state.password.trim();
    if (!Utils.isEmptyString(email) && !Utils.isEmptyString(password)) {
      if (!email || !Validators.validEmail(email)) {
        this.setState({
          isInvalidEmail: true,
        });
        return;
      }
      const userData = {
        user: {
          email,
          password,
          sessionId: sessionId
        },
      };
      console.log("yes pring here email and password - - - - - -",email)
      console.log("yes pring here email and password - - - - - -",password)
      
      if(email && password){
        this.props.signInAction(userData);
      }
    }
  }

  openResetPasswordPage = () => {
    // WebBrowser.openBrowserAsync(KEY_CONST.FORGET_PASSWORD_URL);
    Linking.openURL(KEY_CONST.FORGET_PASSWORD_URL)
  };

  // onPressFBSocialLogin = async () => {
  //   try {
  //     let imageObject = {};
  //     await Facebook.initializeAsync(KEY_CONST.FACEBOOK_APP_ID);
  //     const { type, token } = await Facebook.logInWithReadPermissionsAsync({
  //       permissions: ["public_profile", "email"],
  //       behavior: "standalone",
  //     });
  //     if (type === "success") {
  //       // Get the user's name using Facebook's Graph API
  //       const response = await fetch(`${KEY_CONST.FACEBOOK_URL}${token}`);
  //       const responseBody = await response.json();
  //       const { id, email, name, picture } = responseBody;
  //       let userName = name.split(" ");

  //       const image = await Utils.getImageInfo(picture.data.url);
  //         imageObject["uri"] = picture.data.url  ?  picture.data.url : 
  //         imageObject["type"] =  image._data.type.split("/")[1] ? image._data.type.split("/") : "jpg"
  //         imageObject["fileName"] = "RFFUser";

  //       const userInfo = {};
  //       userInfo.auth_uid = id;
  //       userInfo.auth_token = token;
  //       userInfo.provider = "facebook";
  //       userInfo.platform = "mobile";
  //       userInfo.email = email;
  //       userInfo.image = "";
  //       userInfo.first_name = userName[0];
  //       userInfo.last_name = userName[1];

  //       this.setState({ isLoading: true });
  //       await AsyncStorage.setItem("socialLogin", "true")
  //       this.props.socialLoginAction(
  //         { user: userInfo },
  //         (res) => this.socialLoginSuccessCallBack(res, STR_CONST.SIGN_IN_FB_EVENT),
  //         (res) => this.socialLoginFailureCallBack(res),
  //         imageObject,
  //         imageObject.type
  //       );
  //     } else if (type === "cancel") {
  //       CustomAlert.showOkAlert(STR_CONST.FACEBOOK_LOGIN_CANCELLED);
  //       this.setState({ isLoading: false });
  //     } else {
  //       CustomAlert.showOkAlert(STR_CONST.SOMETHING_WENT_WRONG);
  //     }
  //   } catch ({ message }) {
  //     this.setState({ isLoading: false });
  //     CustomAlert.showOkAlert(STR_CONST.SOMETHING_WENT_WRONG);
  //   }
  // };

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
        // imageObject["uri"] = userGoogleInfo.user.photo;
        // imageObject["type"] = image._data.type.split("/")[1];
        // imageObject["fileName"] = "RFFUser";

        // console.log("yes check here iomag ##### ",image)

        if (userGoogleInfo.user.photo && userGoogleInfo.user.photo !== undefined && userGoogleInfo.user.photo !== null) {
          imageObject["uri"] = userGoogleInfo.user.photo ? userGoogleInfo.user.photo : null
          imageObject["type"] = image ? image.type.split("/")[1] : null
          imageObject["fileName"] = "RFFUser";
        }

        let sessionId = uuid.v4()
        console.log("yes chek here session id - - - - -", sessionId)
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

  // Social Login Success Call Back
  socialLoginSuccessCallBack(res, eventText) {
    const { navigation } = this.props;
    this.setState({ isLoading: false });
    navigation.navigate("FindFlightContainerScreen");
  }

  // Social Login Failure Call Back
  socialLoginFailureCallBack(res) {
    this.setState({ isLoading: false });
    Alert.alert(res.error);
  }

  renderLogoContainer() {
    return (
      <View style={styles.logoContainer}>
        <FastImage style={styles.rffLogo} source={IMG_CONST.RFF_LOGO} />
      </View>
    );
  }

  renderInputFields() {
    const { isLoginPressed, password, email, isInvalidEmail } = this.state;
    return (
      <View style={styles.inputFieldContainer}>
        <View style={styles.passContainer1}>
          <TextInput
            numberOfLines={1}
            ref={(input) => {
              this.secondTextInput = input;
            }}
            style={[
              styles.input,
              {
                borderBottomColor:
                  isLoginPressed && Utils.isEmptyString(password)
                    ? colours.errorColor
                    : colours.borderBottomLineColor,
                    width:scale(240),
              },
            ]}
            placeholder={STR_CONST.EMAIL}
            onFocus={() => {
              this.setState({
                isOnFocus: true
              })
            }}
            onBlur={() => {
              this.setState({
                isOnFocus: false
              })
            }}
            placeholderTextColor={this.state.isOnFocus ? colours.lightGreyPlaceholder : null}
            autoCapitalize="none"
            onChangeText={(email) => {
              this.setState({ email });
            }}
            keyboardType={"email-address"}
            value={this.state.email}
            onSubmitEditing={() => {
              this.secondTextInput.focus();
            }}
            blurOnSubmit={false}
            returnKeyType="next"
            underlineColorAndroid={'#FFFFFF'}
          />
          <TouchableOpacity
            style={styles.emailContainer}
          >
            <FastImage
              style={
                { height: scale(20), width: scale(20), marginBottom: scale(4), marginRight: scale(5) }
              }
              resizeMode="contain"
              source={IMG_CONST.EMAIL_LOGO}
            />
          </TouchableOpacity>
        </View>

        {isInvalidEmail && !Validators.validEmail(email) && (
          <Text style={styles.errorText}>
            {STR_CONST.PLEASE_ENTER_VALID_EMAIL}
          </Text>
        )}

        <View style={styles.passContainer}>

          <TextInput
            ref={(input) => {
              this.secondTextInput = input;
            }}
            style={[
              styles.input,
              {
                borderBottomColor:
                  isLoginPressed && Utils.isEmptyString(password)
                    ? colours.errorColor
                    : colours.borderBottomLineColor,
              },
            ]}
            placeholder={STR_CONST.PASSWORD}
            onFocus={() => {
              this.setState({
                isOnFocusPassword: true
              })
            }}
            onBlur={() => {
              this.setState({
                isOnFocusPassword: false
              })
            }}
            placeholderTextColor={this.state.isOnFocusPassword ? colours.lightGreyPlaceholder : null}
            autoCapitalize="none"
            onChangeText={(password) => {
              this.setState({ password });
            }}
            secureTextEntry={this.state.isHidePassword}
            value={this.state.password}
            returnKeyType="done"
            underlineColorAndroid={'#FFFFFF'}
            maxLength={20}
            onSubmitEditing={() => {
              this.validation();
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
        <Text
          onPress={() => this.openResetPasswordPage()}
          style={styles.forgotPasswordText}
        >
          {STR_CONST.FORGOT_PASSWORD}
        </Text>
      </View>
    );
  }

  renderButtonContainer() {
    const { email, password } = this.state;
    return (
      <Fragment>
        {
          email && password ?
            <TouchableOpacity
              onPress={() => this.validation()}
              style={[styles.signInButton, {
                backgroundColor: colours.lightBlueTheme,
              }]}
              activeOpacity={0.7}
            >
              <Text style={styles.signInText}>{STR_CONST.SIGN_IN}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
              onPress={() => this.validation()}
              style={[styles.signInButton, {
                backgroundColor: !email || !password ? colours.gray : colours.lightBlueTheme,
              }]}
              activeOpacity={0.7}
            >
              <Text style={styles.signInText}>{STR_CONST.SIGN_IN}</Text>
            </TouchableOpacity>
        }
      </Fragment>
    );
  }

  renderGoogleFBButtonContainer() {
    return (
      <View style={styles.googleFBContainer}>
        <Text style={styles.orSignInText}>{STR_CONST.OR_SIGN_IN}</Text>
        <View style={styles.buttonContainer}>

          <TouchableOpacity
            onPress={() => this.onPressGoogleSocialLogin()}
            style={styles.googleFb}
          >
            <FastImage style={styles.googleButton} resizeMode="contain" source={IMG_CONST.GOOGLE_ICON} />
            {/* <Text
            style={styles.iconTxt}
          > Google</Text> */}

          </TouchableOpacity>


          <TouchableOpacity
           onPress={() => this.handleFacebookLogin()}
            style={styles.googleFb}
          >
            <FastImage style={styles.fbButton} resizeMode="contain"  source={IMG_CONST.FB_ICON} />
            {/* <Text
            style={styles.iconTxt}
          > Facebook</Text>
           */}
         
          </TouchableOpacity>

          {!Utils.isAndroid() && (
            <TouchableOpacity
              onPress={() => this.onAppleButtonPress()}
              style={styles.fb}
            >
              <FastImage style={styles.fbButton} source={IMG_CONST.APPLE_ICON} />
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
          {STR_CONST.DONT_HAVE_ACCOUNT}
          <Text
            onPress={() => this.props.navigation.navigate("SignUp")}
            style={styles.signUpText}
          >
            {" "}
            {STR_CONST.SIGN_UP}
          </Text>
        </Text>
      </View>
    );
  }
  skipButton() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("FindFlightContainerScreen")
        }}
        style={styles.skipButton1}
      >
        <Text style={styles.skipText1}>{STR_CONST.SKIP}</Text>
      </TouchableOpacity>
    );
  }

  renderLogoContainer() {
    return (
      <View style={styles.logoContainer}>
        <FastImage resizeMode="contain" style={styles.rffLogo} source={IMG_CONST.RFF_LOGO} />
      </View>
    );
  }

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
      // LoginManager.setLoginBehavior(behavior);
      const PERMISSIONS = [ 'public_profile', 'email' ];
      const result = await LoginManager.logInWithPermissions(PERMISSIONS);
  
      if (result.isCancelled) {
        console.log('Facebook login was canceled.');
      } else {
        const tokenData = await AccessToken.getCurrentAccessToken();
        if (tokenData) {
          const accessToken = tokenData.accessToken.toString();
          // You can use the access token for making Facebook Graph API requests.
          console.log('Facebook login successful. Access Token:', accessToken);
          this.fetchUserProfile(accessToken);
        }else{
          console.log('Facebook login Token Null ', ' -------- ');
        }
      }
    } catch (error) {
      console.error('Facebook login error:', error);
    }
  };

  render() {
    return (
      <View style={{ height: "100%", width: "100%", backgroundColor: colours.lightBlueBackground }}>
        {this.renderLogoContainer()}

        <FastImage
          source={IMG_CONST.Login_img}
          style={{ height: scale(180), width: scale(180), alignSelf: 'center' }}
          resizeMode={FastImage.resizeMode.contain}
        />

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {/* <KeyboardAwareScrollView keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}        
         > */}
          {/* {this.renderLogoContainer()} */}
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps={"handled"}
            showsVerticalScrollIndicator={false}
          >
            {this.renderInputFields()}
            {this.renderButtonContainer()}
            {this.renderGoogleFBButtonContainer()}
          </KeyboardAwareScrollView>
          <View style={{
            width: scale(320),
            flexDirection: "row", borderWidth: 0, justifyContent: "space-around", alignItems: "center", marginTop: scale(1), marginBottom: scale(20)
          }}>
            {this.renderBottomTextContainer()}
            {this.skipButton()}
          </View>
          {/* </KeyboardAwareScrollView> */}
          {/* <TransLoader isLoading={this.state.isLoading} /> */}
        </View>
      </View>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
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
  signInAction: (userData) => dispatch(signIn(userData)),
  clearLoginError: () => dispatch(clearLoginError()),
  resetNetworkStatusAction: () => dispatch(resetNetworkStatus()),
  setLoginStatusAction: (loginStatus) => dispatch(setLoginStatus(loginStatus)),
  getCountryListAction: () => dispatch(getCountryList()),
});

const mapStateToProps = (state) => {
  const { logIn, common, userInfo } = state;
  return {
    isLoggedIn: logIn.isLoggedIn,
    loginError: logIn.loginError,
    isNetworkFailed: common.isNetworkFailed,
    noNetworkScreen: common.noNetworkScreen,
    userData: userInfo.userData,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
