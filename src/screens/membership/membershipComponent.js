
import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  FlatList,
  Linking,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Platform
} from "react-native";
import ScreenHeader from "../../components/header/Header";
import styles from "./membershipStyles";
import * as STRING_CONST from "../../constants/StringConst";
import * as IMAGE_CONST from "../../constants/ImageConst";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import CustomButton from "../../components/customComponents/CustomButton";
import * as Config from "../../helpers/config";
import { isAndroid } from "../../utils/commonMethods";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import FontAwesome from "react-native-vector-icons/Feather";
import FastImage from 'react-native-fast-image'
import {
  getGoldFeatures,
  getSilverFeatures,
  getBronzeFeatures,
} from "../../utils/commonMethods";
import {APP_LINK} from '../../helpers/config'
import moment from "moment";
import RNRestart from 'react-native-restart'; 
import { getAccessToken ,getUserId} from "../../constants/DataConst";
let buildVersion = 0
let isAppReviewSuccess = false



class MembershipComponent extends Component{


    constructor(props) {
    super(props);
    this.state = {
      isYearly: true,
      featureArray: [],
      member: "",
      userConfigDetails:this.props.userConfigDetails,
    
    };
  }

  _menu = null;

  setMenuRef = (ref) => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };



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

 async componentDidMount() {
    let userData = this.props.userData;

    const accesstoken = await getAccessToken();
    const userId = await getUserId()

    this.setState({
      accesstoken,userId
    })
    setTimeout(() => {
      this.getBuildVersionData()
    }, 2000);

    let featureArray = [];
    let member = "";
    if (userData.gold_member) {
      featureArray = getGoldFeatures();
      // member = STRING_CONST.GOLD_MEMBER;
      member = "Gold";
    } else if (userData.silver_member) {
      featureArray = getSilverFeatures();
      member = "Silver"
      // member = STRING_CONST.SILVER_MEMBER;
    } else {
      featureArray = getBronzeFeatures();
      // member = STRING_CONST.BRONZE_MEMBER;
      member = "Bronze"
    }
    this.setState({
      featureArray,
      member,
    });

    BackHandler.addEventListener('hardwareBackPress', () =>
    this.handleBackButton(this.props.navigation),
  );

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


  goToNotifications() {
    const { navigation } = this.props;
    navigation.navigate(STRING_CONST.NOTIFICATIONS_SCREEN,{fromAlertScreen:false});
  }
  // renderHeader() {
  //   return (
  //     <View style={{ marginHorizontal: scale(15) }}>
  //       <ScreenHeader
  //         {...this.props}
  //         left
  //         setting
  //         title={STRING_CONST.MEMBERSHIP_TITLE}
  //         right
  //         notifCount={2}
  //         clickOnRight={() => this.goToNotifications()}
  //       />
  //     </View>
  //   );
  // }



  renderHeader(){
    return(
      <View style={{alignItems:"center",backgroundColor:"#03B2D8",height:scale(110),width:"100%",marginTop:Platform.OS == "android" ? scale(-20) : scale(-60),borderBottomLeftRadius:scale(30),borderBottomRightRadius:scale(30),marginBottom:scale(0)}}>
        <View style={{marginTop:scale(40)}}>
        <ScreenHeader
          {...this.props}
          left
          setting
          title={STRING_CONST.MEMBERSHIP_TITLE}
          right
          notifCount={2}
          clickOnRight={() => this.goToNotifications()}
        />
        </View>
      </View>
    )
  }
  

  renderButton(text, onPress) {
    return (
      <CustomButton
        textSize={scale(14)}
        textOnButton={text}
        onButtonPress={() => {
          onPress();
        }}
        buttonColor={colours.lightBlueTheme}
        buttonStyle={styles.subscriptionButtonStyle}
        textColor={colours.white}
      />
    );
  }
  getFreeTrialRemainingDays(expiryTime){
    const today = moment().format('DD-MM-YYYY')
    const todaysdate = moment(today, 'DD-MM-YYYY')
    const eventdate = moment.utc(expiryTime * 1000).format('DD-MM-YYYY')
    const datediff = moment(eventdate, 'DD-MM-YYYY')
    const daysLeft = datediff.diff(todaysdate, 'days')
    return daysLeft
  }




  membershipViewList(){
    const {userData} = this.props
    let currentPlan = ""
    let userId = ""
    let yearly = ""
    let bronze_member = ""
    let current_subscription_expiry = ""
    let cancelled_subscription = ""
    let gold_to_silver_downgrade = "" 
    let current_plan =  ""
    let txt = ""

     if(userData && Object.keys(userData).length !== 0){
       currentPlan = userData.current_plan;
       userId = userData.id;
       yearly = userData.current_plan.period_unit
       bronze_member = userData.bronze_member
       txt = ""
       current_subscription_expiry = userData.current_subscription_expiry
       current_plan = userData.current_plan.on_trial
       cancelled_subscription = userData.cancelled_subscription
       gold_to_silver_downgrade = userData.gold_to_silver_downgrade
     
    }

    const today = moment().format('DD-MM-YYYY')
    const todaysdate = moment(today, 'DD-MM-YYYY')
    const eventdate = moment.utc(current_subscription_expiry * 1000).format('DD-MM-YYYY')
    const datediff = moment(eventdate, 'DD-MM-YYYY')
    const daysLeft = datediff.diff(todaysdate, 'days')
 
    let expireTime =   moment.unix(current_subscription_expiry).format('MMMM Do, YYYY')
    if(current_subscription_expiry && current_plan){
      txt = `${daysLeft} days left of free trial`
    }
    if(cancelled_subscription && current_subscription_expiry) {
       txt = `Scheduled ${gold_to_silver_downgrade ? "Silver" :"Bronze (free plan)"} Downgrade on ${expireTime}`
    }
    let silver_member = userData.silver_member
    let gold_member = userData.gold_member
    const {member} = this.state;

    return(
      <View>
       <View style={styles.emailIdsInnerView}>
         {
          txt ?
          <View>

            <View style={{flexDirection:"row"}}>
          <Image     
            source={
              gold_member ?
              IMAGE_CONST.GOLD_IMAGE : silver_member == "silver" ?
              IMAGE_CONST.SILVER_IMAGE :  
              IMAGE_CONST.BRONZE_IMAGE 
            }
            style={{height:scale(20),width:scale(20),margin:scale(5)}}
          />
          <Text style={styles.memberText}>
            {
              !bronze_member || bronze_member == false || bronze_member == undefined || bronze_member == null ?
              <Fragment>
                
               {this.state.member}
              {
                yearly == "year" ? " Yearly" : " Monthly"
              }
              </Fragment>
              : "Bronze"
            }
          </Text>
          </View>
          <Text style={[styles.memberText1,{fontSize:scale(13),color:colours.darkBlueTheme}]}>  
            {txt ?  `(${txt})` :  ""}
          </Text>
          </View>
          : 
          <View>
          <Text style={styles.memberText}>
            {
              !bronze_member || bronze_member == false || bronze_member == undefined || bronze_member == null ?
              <Fragment>
               {this.state.member}
              {
                yearly == "year" ? " Yearly" : " Monthly"
              }
              </Fragment>
              : "Bronze"
            }
          </Text>
          </View>
        } 
          {              
            isAppReviewSuccess  == false|| buildVersion == 0 ?
             <Fragment>
           <Menu 
            visible={true}
            style={{ marginTop: verticalScale(25), width:scale(155) }}
            ref={this.setMenuRef}
            button={
              <TouchableOpacity
                style={{ paddingHorizontal: scale(15), marginTop: verticalScale(5) }}
                onPress={() => {
                  this.showMenu();
                }}
              >
              <FontAwesome name="more-vertical" 
                  color={colours.darkBlueTheme}
                  size={scale(22)} />
              </TouchableOpacity>
            }
          >
            <MenuItem
              onPress={async() => {
                this.hideMenu();
                this.reloaderApp()
                const accesstoken = await getAccessToken();
                const userId = await getUserId()
                let url = `${Config.WEB_BASE_URL}/${silver_member || gold_member ? "change-plan" :"pricing"}?token=${accesstoken}&id=${userId}&redirect=${APP_LINK}`
                Linking.openURL(
                  url
                );
            }}
              style={styles.menuStyle}
              textStyle={styles.menuTextStyle}
            >
              {currentPlan && currentPlan.chargebee_plan_id == "gold-free"
                ? STRING_CONST.CANCEL_TRIAL
                : STRING_CONST.CHANGE_PLAN}
            </MenuItem>
          </Menu>
          </Fragment> : null
        }  
      </View> 
       <View style={styles.line}
      /> 
    </View>
    )










  }


  reloaderApp(){
    setTimeout(() => {
      RNRestart.Restart()
    }, 3000);
  }

  renderListItem(item) {
    return (
      <View style={styles.descritionItemView}>
        <FastImage
          source={IMAGE_CONST.TICK_MARK}
          style={styles.tickMarkIcon}
        />
        <Text style={styles.blueStripText}>{item}</Text>
      </View>
    );
  }
  featureList() {
    return (
      <View style={{ marginTop: verticalScale(20) }}>
        <FlatList
          data={this.state.featureArray}
          renderItem={({ item }) => {
            return this.renderListItem(item);
          }}
        />
      </View>
    );
  }
  upgradeView() {

    const {userData} = this.props
    let currentPlan = ""
    let userId = ""
    let yearly = ""
    let bronze_member = ""
    let current_plan = ""
    let current_subscription_expiry = ""
    let cancelled_subscription = ""
    let gold_to_silver_downgrade = ""

    let txt = ""
    if(userData && Object.keys(userData).length !== 0){
       currentPlan = userData.current_plan;
       userId = userData.id;
      // let daysLeft = this.getFreeTrialRemainingDays(expiryTime)
       yearly = userData.current_plan.period_unit
       bronze_member = userData.bronze_member
  
      // code here for showing text after this.........
       txt = ""
       current_subscription_expiry = userData.current_subscription_expiry
       current_plan = userData.current_plan.on_trial
       cancelled_subscription = userData.cancelled_subscription
       gold_to_silver_downgrade = userData.gold_to_silver_downgrade
     
    }
    const today = moment().format('DD-MM-YYYY')
    const todaysdate = moment(today, 'DD-MM-YYYY')
    const eventdate = moment.utc(current_subscription_expiry * 1000).format('DD-MM-YYYY')
    const datediff = moment(eventdate, 'DD-MM-YYYY')
    const daysLeft = datediff.diff(todaysdate, 'days')
 

    let expireTime =   moment.unix(current_subscription_expiry).format('MMMM Do, YYYY')
      
   
    if(current_subscription_expiry && current_plan){
      txt = `${daysLeft} days left of free trial`
    }
    if(cancelled_subscription && current_subscription_expiry) {
       txt = `Scheduled ${gold_to_silver_downgrade ? "Silver" :"Bronze (free plan)"} Downgrade on ${expireTime}`
    }
    let silver_member = userData.silver_member
    let gold_member = userData.gold_member
    return (
      <Fragment>
        {isAppReviewSuccess == false || buildVersion == 0 ?

        <Fragment>
        <View style={styles.upgradeView}>
        <FastImage
          source={IMAGE_CONST.UPGRADE_IMAGE}
          style={styles.upgradeImage}
          resizeMode="contain"
        />
         <Text
          style={[
            styles.blueStripText,
            { textAlign: "center",fontWeight:"700",padding:scale(10), fontSize: scale(16),color:"#000"},
          ]}
        >
          {STRING_CONST.UPGRADE_MEMBERSHIP_TEXT}                          
        </Text>
        <Text
          style={[
            styles.blueStripText,
            { textAlign: "center", fontSize: scale(13)},
          ]}
        >
          {STRING_CONST.UPGRADE_PLAN}                          
        </Text>
        <CustomButton
          textSize={scale(14)}
          textOnButton={STRING_CONST.UPGRADE_PLAN_TEXT}
          onButtonPress={async() => {
            const accesstoken = await getAccessToken();
            const userId = await getUserId()
            this.reloaderApp()
            let url = `${Config.WEB_BASE_URL}/${silver_member || gold_member ? "change-plan" :"pricing"}?token=${accesstoken}&id=${userId}&redirect=${APP_LINK}`
            Linking.openURL(
              url
            );
            // console.log("yes update this after all the changes.")
            // this.props.navigation.navigate(STRING_CONST.PRICING_SCREEN)
          }}
          buttonColor={colours.lightBlueTheme}
          buttonStyle={styles.subscriptionButtonStyle}
          textColor={colours.white}
        />
      </View>
      </Fragment> : null
        }
      </Fragment>
  
    );
  }

  render(){
  let userData = this.props.userData;
      return (
        <SafeAreaView style={styles.container}>
          {this.renderHeader()}
          <ScrollView style={styles.container}>
            <View style={{ marginHorizontal: scale(20) }}>
              {this.membershipViewList()}
              {this.featureList()}
              {!userData.gold_member && this.upgradeView()}
              {/* {this.upgradeView()} */}
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }
}

export default MembershipComponent