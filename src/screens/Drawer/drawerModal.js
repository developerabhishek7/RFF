import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  ScrollView,
  Linking
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
import * as Config from "../../helpers/config";
import { getUserConfigDetails } from "../../actions/userActions";
import * as RootNavigation from '../../router/RouteNavigation';
let isAppReviewSuccess  = false
let buildVersion = 0
import DeviceInfo from "react-native-device-info";
class DrawerComponentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.image,
      userData: {},
      accesstoken:"",
      userId:"",
      userConfigDetails:this.props.userConfigDetails,
      // isAppReviewSuccess:false,
      // buildVersion:0,
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
      // console.log("yes check inside the identry seTTimout - - - - - - - -",userData)
      // console.log("yes check inside the identry seTTimout - - - - - - - -",this.props.isLoggedIn)
        if(this.props.isLoggedIn && Object.keys(userData).length !== 0){
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


    // console.log("yes insdie the did mount ######     ",this.state.userConfigDetails)
   
    const accesstoken = await getAccessToken();
    const userId = await getUserId()
    this.props.getUserConfigDetailsAction()

    let isNewSignUp =  await AsyncStorage.getItem("isNewSignUp");


  // setTimeout(async() => {
    //   if(isNewSignUp){
    //    await AsyncStorage.removeItem('isNewSignUp')
    //   }
    // }, 2000);

    this.setState({
      accesstoken,userId,
    })
  
    let userData = this.props.userData

    let deviceName = await DeviceInfo.getDeviceName()
    let deviecBrand = await DeviceInfo.getBrand()
    let isTablet = await DeviceInfo.isTablet()
    let isEmulator = await DeviceInfo.isEmulator()


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
    if (userData.gold_member) {
      member = STR_CONST.GOLD_MEMBER;
    } else if (userData.silver_member) {
      member = STR_CONST.SILVER_MEMBER;
    } else if(userData.bronze_member){
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
    let silver_member = userData.silver_member
    let gold_member = userData.gold_member
    let bronze_member = userData.bronze_member
    // let isAppReviewSuccess = ""

    return (
      <View >
      <View style={styles.profileView}>
          <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-start",marginStart:scale(10)}}>
            {this.state.userData.image ? (
              <View style={{borderColor:"#d7f3f8",borderWidth:scale(6),borderRadius:scale(100)}}>
              <FastImage
                style={styles.innerProfileImage}
                source={
                  isLoggedIn
                    ? {
                        uri: this.state.userData.image,
                        priority: FastImage.priority.normal,
                        cache: FastImage.cacheControl.immutable,
                      }
                    : IMAGE_CONST.PLANE_LOGO
                }
              />
               </View>
            ) : isLoggedIn ? (
              userData.first_name ? 
              <View style={{backgroundColor:"#cdf0f7",borderColor:"#d7f3f8",borderWidth:scale(6),borderRadius:scale(100),height:scale(80),width:scale(80),justifyContent:"center",alignItems:"center",  }}>
              <Text style={[styles.nameInitialsStyle,{
              }]}
                numberOfLines={1}
              >
                {this.state.userData.first_name &&
                  this.state.userData.first_name[0].toUpperCase()}
                {this.state.userData.last_name &&
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
          {/* <Text style={styles.nameStyle}>
            {isLoggedIn ? STR_CONST.HELLO : STR_CONST.RFF}
          </Text> */}
          <Text numberOfLines={1} style={[styles.nameStyle,{
            width:verticalScale(110)
          }]}>
            { `${this.getCapitalName(userData.first_name)} ${this.getCapitalName(userData.last_name)}`}
          </Text>
          {
            bronze_member || silver_member || gold_member  ?
            <View style={{backgroundColor:"#a5e5f1",padding:scale(2),borderRadius:scale(20),margin:scale(4),justifyContent:"center",marginStart:scale(-3)}}>
            <Text style={styles.membershipText}>
              { this.getMembershipText(userData)}
            </Text>
            </View>
            : null
          }
        </View>
        </View>
        {
            buildVersion  == 0  || isAppReviewSuccess == false ?
              <Fragment>
              {
              isLoggedIn ?
              <TouchableOpacity
                style={{marginBottom:scale(0),marginTop:isLoggedIn ? scale(20):scale(10),marginLeft:scale(20),alignSelf:"center"}}
                onPress={async()=>{
                  const accesstoken = await getAccessToken();
                  const userId = await getUserId()
                  let url = `${Config.WEB_BASE_URL}/${silver_member || gold_member ? "change-plan" :"pricing"}?token=${accesstoken}&id=${userId}&redirect=${APP_LINK}`
                  this.reloaderApp()
                  Linking.openURL(url)
                }}
              >
              <Text style={styles.membershipText1}>
              {isAppReviewSuccess == false || buildVersion == 0? "Change Membership" : ""}
              </Text>
              </TouchableOpacity>
              : null
            }              
            </Fragment>
            : null
           }
      </View>
      </View>
    );
  }

  bindLogoutAndSocialLogin = () => {
    let allKeys = ['guestId','socialLogin','NotificationDisbledFromPhone','Device_Token','userId','authorizationHeader','navigateToLogin','isNewSignUp']
    setTimeout(async() => {
      PostHog.reset()     
      this.props.logoutUserAction()     
      await AsyncStorage.multiRemove(allKeys) 
    }, 300);
  }

  confirmSignOut = () => {
    Alert.alert(
      STR_CONST.LOGOUT_MSG,
      null,
      [
        {
          text: "Log out",
          onPress: () => {
            this.setState({
              userData:{}
            })
            this.bindLogoutAndSocialLogin()
          },
        },
        { text: "Cancel", style: "cancel" },
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
        {/* <Image
          source={IMAGE_CONST.MENU_HEADER}
          style={{ height:isPad() ?  verticalScale(380) : verticalScale(320), width:isPad() ?  width - scale(90) : scale(310) }}
          resizeMode="stretch"
        /> */}
        {this.profileImage()}
        <ScrollView scrollEnabled={false} style={{ marginTop: isLoggedIn ? verticalScale(215) : verticalScale(200), marginLeft: scale(0),}}>
         
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
          {/* <TouchableOpacity
            style={styles.screenButtonStyle}
            onPress={() => {
              navigation.navigate(STR_CONST.PRICING_SCREEN);
              navigation.dispatch(DrawerActions.closeDrawer());
            }}
          >
            {this.getMenuOptionImage(IMAGE_CONST.PRICE_TAG)}      
            <Text style={styles.screenTitle}>
              {STR_CONST.PRICING_SCREEN_TITLE}
            </Text>
          </TouchableOpacity> */}
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
          <View  style={styles.lineStyle} />
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
              // this.props.navigation.navigate("SignIn");
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
              // const keys = await AsyncStorage.getAllKeys();
              // const result = await AsyncStorage.multiGet(keys);
              // let allKeys = ['guestId','NotificationDisbledFromPhone','Device_Token','userId','authorizationHeader','navigateToLogin']
              // if (isLoggedIn) {
              //   AsyncStorage.multiRemove(allKeys) 
              //   this.confirmSignOut();
              // } else {
              //   this.props.navigation.navigation.navigate("Anonymous");
              // }
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
  // console.log("yes check here user INgor on drawer screen  -   - - - - - -",userInfo.userConfigDetails)
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
