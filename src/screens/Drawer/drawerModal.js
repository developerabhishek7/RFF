import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  ScrollView,
  Linking,
  Platform,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import FastImage from 'react-native-fast-image'
import PostHog from 'posthog-react-native';
import { connect } from "react-redux";
import styles from "./drawerMenuStyles";
import {isPad} from '../../utils/commonMethods'
import RNRestart from 'react-native-restart'; 
import * as IMAGE_CONST from "../../constants/ImageConst";
import * as STR_CONST from "../../constants/StringConst";
import { colours } from "../../constants/ColorConst";
import scale, { verticalScale } from "../../helpers/scale";
import { logoutUser } from "../../actions/loginActions";
import { resetSession } from "../../actions/commonActions";
import {APP_LINK} from '../../helpers/config'
import {DrawerActions,NavigationContainer} from '@react-navigation/native';
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
import { getAccessToken ,getUserId} from "../../constants/DataConst";
import { getUserConfigDetails,getUserInfo } from "../../actions/userActions";
import * as RootNavigation from '../../router/RouteNavigation';
let isAppReviewSuccess  = false
let buildVersion = 0
import DeviceInfo from "react-native-device-info";
import {fcm} from '../../utils/firebaseHelper';
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
class DrawerComponentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.image,
      userData: {},
      accesstoken:"",
      userId:"",
      userConfigDetails:this.props.userConfigDetails,
    };
  }

  resetData() {
    const { navigation } = this.props;
    AsyncStorage.removeItem("authorizationHeader");
    AsyncStorage.removeItem("userId");
    AsyncStorage.removeItem("searchDetails");
    navigation.navigation.navigate("SignIn");
  }


  renderIdentifierForPosthog = async()=> {

    let deviceName = await DeviceInfo.getDeviceName()
    let deviecBrand = await DeviceInfo.getBrand()
    let isTablet = await DeviceInfo.isTablet()
    let isEmulator = await DeviceInfo.isEmulator()

    let userData = this.state.userData
    setTimeout(async() => {
       if(this.props.isLoggedIn && userData && Object.keys(userData).length !== 0){
         await PostHog.identify(this.props.userData.email, {
            email: this.props.userData.email,
            deviceName: deviceName,
            deviecBrand:deviecBrand,
            isTablet:isTablet,
            isEmulator:isEmulator,
            Plateform:"Mobile",
            userType:"Logged-in user"
          });
        }
    }, 1500);
  }


   componentDidMount = async() => {
    const accesstoken = await getAccessToken();
    const userId = await getUserId()
    this.props.getUserConfigDetailsAction()

    let isNewSignUp =  await AsyncStorage.getItem("isNewSignUp");
    this.setState({
      accesstoken,userId,
    })
    setTimeout(() => {
      this.renderIdentifierForPosthog()
    }, 1500);

  setTimeout(async() => {
    if(isNewSignUp){
         await AsyncStorage.removeItem('isNewSignUp')
        }
      this.getBuildVersionData()
  }, 2000);
   
  }


  getBuildVersionData = () => {

    const {userConfigDetails} = this.state
      if(userConfigDetails && userConfigDetails.length > 0 ){
       userConfigDetails.map((singleMap)=>{
              if(singleMap.ConfigTypeGUID == "isAppReviewed"){
                isAppReviewSuccess = singleMap.ConfigTypeValue
              }
              if(singleMap.ConfigTypeGUID == "appBuildVersion"){
                buildVersion = singleMap.ConfigTypeValue
              }
            })
      }
  }




  componentDidUpdate(prevProps) {
    if (this.props.userData !== prevProps.userData)
      this.setState({
        userData: this.props.userData,
      });
    if (this.props.sessionExpired !== prevProps.sessionExpired) {
      this.resetData();
      this.props.resetSessionAction();
    }
    if (
      this.props.isLoggedIn !== prevProps.isLoggedIn &&
      !this.props.isLoggedIn
    ) {
      this.resetData();
      this.props.resetSessionAction();
      this.props.navigation.navigation.navigate("SignIn");
    }
  }
  getMembershipText(userData){
    let member = ''
    if (userData && userData.gold_member) {
      member = STR_CONST.GOLD_MEMBER;
    } else if (userData && userData.silver_member) {
      member = STR_CONST.SILVER_MEMBER;
    } else if(userData && userData.bronze_member){
      member = STR_CONST.BRONZE_MEMBER;
    }
    else {
      member = ''
    }
    return member
  }


  reloaderApp(){
    setTimeout(() => {
      RNRestart.Restart()
    }, 3000);
  }


  profileImage() {
    let isLoggedIn = this.props.isLoggedIn;
    const { userData } = this.state;
    let silver_member 
    let gold_member 
    let bronze_member 
    if(userData && userData!== undefined && userData !== null && userData !== ""){
         silver_member = userData.silver_member
       gold_member = userData.gold_member
       bronze_member = userData.bronze_member
    } 
    return (
      <View >
      <View style={styles.profileView}>
          <View style={styles.profileSubView}>
            {this.state.userData && this.state.userData.image ? (
              <View style={styles.profileImgView}>
              <FastImage
                style={styles.innerProfileImage}
                source={
                  isLoggedIn
                    ? {
                        uri: this.state.userData && this.state.userData.image,
                        priority: FastImage.priority.normal,
                        cache: FastImage.cacheControl.immutable,
                      }
                    : IMAGE_CONST.PLANE_LOGO
                }
              />
               </View>
            ) : isLoggedIn ? (
              userData && userData.first_name ? 
              <View style={styles.profileNameView}>
              <Text style={[styles.nameInitialsStyle,{
              }]}
                numberOfLines={1}
              >
                {userData &&  this.state.userData.first_name &&
                  this.state.userData.first_name[0].toUpperCase()}
                { userData && this.state.userData.last_name &&
                  this.state.userData.last_name[0].toUpperCase()}
              </Text> 
              </View>
              :
              <FastImage style={[styles.RFFImage,{ backgroundColor: colours.white}]} source={IMAGE_CONST.PLANE_LOGO} />
            ) : (
              <FastImage
                style={[styles.RFFImage, { backgroundColor: colours.white}]}
                source={IMAGE_CONST.PLANE_LOGO}
              />
            )}
        <View style={styles.greetingsView}>
           <Text numberOfLines={1} style={[styles.nameStyle,{
            width:verticalScale(210),borderWidth:0,textAlign:STR_CONST.CENTER,alignSelf:STR_CONST.CENTER
          }]}>
            { `${userData && this.getCapitalName(userData.first_name)} ${userData && this.getCapitalName(userData.last_name)}`} 
          </Text>
          {
            bronze_member || silver_member || gold_member  ?
            <View style={styles.membershipView}>
            <Text style={styles.membershipText}>
              {this.getMembershipText(userData)}
            </Text>
            </View>
            : null
          }
        </View>
        </View>
      </View>
      </View>
    );
  }

  bindLogoutAndSocialLogin = () => {
    let allKeys = ['guestId','socialLogin','NotificationDisbledFromPhone','Device_Token','userId','authorizationHeader','navigateToLogin','isNewSignUp']
    setTimeout(async() => {
      PostHog.reset()        
      if(AccessToken.getCurrentAccessToken() != null){
        await LoginManager.logOut();
      }
      this.props.logoutUserAction()     
      await AsyncStorage.multiRemove(allKeys) 
    }, 300);
    setTimeout(async() => {
      await fcm.initAlways();
    }, 2000);
  }

  confirmSignOut = () => {
    Alert.alert(
      STR_CONST.LOGOUT_MSG,
      null,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log out",
          onPress: () => {
            this.setState({
              userData:{}
            })
            this.bindLogoutAndSocialLogin()
          },
        },
      
      ],
      { cancelable: false }
    );
  };
  getCapitalName(text) {
    if(text){
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
    return ""
  }
  getMenuOptionImage(image){
    return (
      <FastImage
        source={image}
        resizeMode="contain"
        style={styles.infoIcon}
      />
    )
  }

  render() {
    const { navigation } = this.props.navigation;
    let isLoggedIn = this.props.isLoggedIn;
    return (
      <View style={styles.mainView}>
      
        {this.profileImage()}
        <ScrollView scrollEnabled={false} style={{ 
          marginTop: isLoggedIn ? verticalScale(215) : verticalScale(200), marginLeft: scale(0),}}>
         
          <View  style={styles.lineStyle} />
          <TouchableOpacity
            style={styles.screenButtonStyle}
            onPress={() => {
              navigation.navigate(STR_CONST.FIND_FLIGHT_SCREEN);
              navigation.dispatch(DrawerActions.closeDrawer());
            }}
          >
            {this.getMenuOptionImage(IMAGE_CONST.SEARCH_FF)}
            <Text style={styles.screenTitle}>{STR_CONST.SEARCH_REWARD}</Text>
           
          </TouchableOpacity>

          <View  style={styles.lineStyle} />

         
          {isLoggedIn && (
            <TouchableOpacity
              style={styles.screenButtonStyle}
              onPress={() => {
                navigation.navigate(STR_CONST.ALERT_SCREEN);
                navigation.dispatch(DrawerActions.closeDrawer());
              }}
            >
              {this.getMenuOptionImage(IMAGE_CONST.MY_ALERT)}
              <Text style={styles.screenTitle}>
                {STR_CONST.ALERT_SCREEN_TITLE}
              </Text>
            </TouchableOpacity>
          )}

           {isLoggedIn && <View  style={styles.lineStyle} /> }


          {isLoggedIn && (
            <TouchableOpacity
              style={styles.screenButtonStyle}
              onPress={() => {
                navigation.navigate(STR_CONST.PROFILE_SCREEN);
                navigation.dispatch(DrawerActions.closeDrawer());
              }}
            >
            {this.getMenuOptionImage(IMAGE_CONST.PROFILE_IMG)}
              <Text style={styles.screenTitle}>
                {STR_CONST.PROFILE_SCREEN_TITLE}
              </Text>
            </TouchableOpacity>
          )}

          {isLoggedIn && <View  style={styles.lineStyle} /> }


          {isLoggedIn && (
            <TouchableOpacity
              style={styles.screenButtonStyle}
              onPress={() => {
                navigation.navigate(STR_CONST.MEMBERSHIP_SCREEN);
                navigation.dispatch(DrawerActions.closeDrawer());
              }}
            >
            {this.getMenuOptionImage(IMAGE_CONST.SUBSCRIPTION)}      

              <Text style={styles.screenTitle}>
                {STR_CONST.MEMBERSHIP_TITLE}
              </Text>
            </TouchableOpacity>
          )}
          {isLoggedIn && <View  style={styles.lineStyle} /> }
          <TouchableOpacity
            style={styles.screenButtonStyle}
            onPress={() => {
              navigation.navigate("MoreOptions");
              navigation.dispatch(DrawerActions.closeDrawer());
            }}
          >
            {this.getMenuOptionImage(IMAGE_CONST.MORE_ICON)}      
            <Text style={styles.screenTitle}>
              {STR_CONST.MORE_TITLE}
            </Text>
          </TouchableOpacity>
          <View style={styles.lineStyle} />
          {
            isLoggedIn &&
            <TouchableOpacity
              style={styles.screenButtonStyle}
              onPress={() => {
                navigation.navigate(STR_CONST.HELP_SCREEN);
                navigation.dispatch(DrawerActions.closeDrawer());
              }}
            >
              {this.getMenuOptionImage(IMAGE_CONST.HELP_ICON)}
              <Text style={styles.screenTitle}>
                {STR_CONST.HELP}
              </Text>
            </TouchableOpacity>
          }
          {isLoggedIn && this.state.userData && this.state.userData.gold_member  && <View  style={styles.lineStyle} /> }
          <View style={{ marginTop:scale(20),alignSelf:'stretch',width:isPad() ? width - scale(90) :scale(310) }}>
          <TouchableOpacity
          style={[
            styles.logOutButton,
            {
              borderColor: isLoggedIn
                ? colours.darkBlueTheme
                : colours.lightBlueTheme,
              backgroundColor: isLoggedIn
                ? "#cdf2f7"
                : "#cdf0f7",
            },
          ]}
          onPress={async() => {
            const keys = await AsyncStorage.getAllKeys();
            const result = await AsyncStorage.multiGet(keys);
            if (isLoggedIn) {
              this.confirmSignOut();
            } else {
              RootNavigation.navigationRef.navigate("SignIn")  
            }
          }}
        >
          <Text
            style={[ styles.rightButtonTextStyle,
              {color: isLoggedIn ? "#49c4e1" : "#4eb2d8"},
            ]}
          >
            {isLoggedIn ? STR_CONST.LOGOUT : STR_CONST.SIGN_IN}
          </Text>
        </TouchableOpacity>
        {
          !isLoggedIn ?
            <TouchableOpacity
            style={[
              styles.logOutButton,
              {
                borderColor: isLoggedIn
                  ? colours.darkBlueTheme
                  : colours.lightBlueTheme,
                backgroundColor: isLoggedIn
                  ? colours.white
                  : colours.lightBlueTheme,
              },
            ]}
            onPress={() => {
                this.props.navigation.navigation.navigate("SignUp");
            }}
          >
            <Text
              style={[ styles.rightButtonTextStyle,
                {color: isLoggedIn ? colours.darkBlueTheme : colours.white},
              ]}
            >
              {STR_CONST.SIGN_UP}
            </Text>
          </TouchableOpacity>
            : null
          }
        </View>
        </ScrollView>       
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const { userInfo, logIn, common, } = state;
  return {
    userData: userInfo.userData,
    isLoggedIn: logIn.isLoggedIn,
    sessionExpired: common.sessionExpired,
    userConfigDetails: userInfo.userConfigDetails
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfoAction: () => dispatch(getUserInfo()),
    getUserConfigDetailsAction:() => dispatch(getUserConfigDetails()),
    logoutUserAction: () => dispatch(logoutUser()),
    resetSessionAction: () => {
      dispatch(resetSession());
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerComponentComponent);
