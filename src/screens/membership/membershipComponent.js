
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
import MyStatusBar from "../../components/statusbar";
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



    if (userData && userData.gold_member) {
      featureArray = getGoldFeatures();
      member = STRING_CONST.GOLD;
    } else if (userData && userData.silver_member) {
      featureArray = getSilverFeatures();
      member = STRING_CONST.SILVER;
    } else {
      featureArray = getBronzeFeatures();
      member = STRING_CONST.BRONZE;
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



  renderHeader(){
    return(
      <View style={styles.headerStyleView}>
        <View style={{marginTop:Platform.OS == "android" ? scale(16) : scale(40)}}>
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




  membershipViewList = () => {
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
    let PeriodUnit = ""

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
      //  PeriodUnit = userData.future_plan && userData.future_plan.plan.period_unit
     
    }
    if(userData && Object.keys(userData.future_plan).length !== 0){
      PeriodUnit = userData.future_plan && userData.future_plan.plan.period_unit
     
    }

    let silver_member = userData && userData.silver_member
    let gold_member = userData && userData.gold_member

    const {member} = this.state;
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
        txt = ` Scheduled  ${gold_member ?  "Gold" : silver_member ? "Silver" : userData && userData.bronze_member ? "Bronze" : null} ${PeriodUnit && PeriodUnit == "month" ? "Monthly":"Yerly"} Downgrade on ${expireTime} `
    }
  

    return(
      <View>
       <View style={styles.emailIdsInnerView}>
         {
          txt ?
          <View>

            <View style={{flexDirection:"row"}}>
          {
            gold_member || silver_member || bronze_member ?
            <Image     
            source={
              gold_member ?
              IMAGE_CONST.GOLD_IMAGE : silver_member == "silver" ?
              IMAGE_CONST.SILVER_IMAGE :  
              IMAGE_CONST.BRONZE_IMAGE 
            }
            style={{height:scale(20),width:scale(20),margin:scale(5)}}
          />
          :
          <Image     
          source={IMAGE_CONST.BRONZE_IMAGE}
          style={{height:scale(20),width:scale(20),margin:scale(5)}}
        />
          }
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
        <View style={{flexDirection:"row"}}>
          <Image     
            source={IMAGE_CONST.BRONZE_IMAGE}
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
          </View>
        } 
          {              
            isAppReviewSuccess  == false|| buildVersion == 0 ?
          <View>
           <Menu 
            visible={true}
            style={{ marginTop: verticalScale(7),marginStart:scale(-25),width:scale(140) }}
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
          </View> : null
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

    console.log("yes check the featureArray - - - - - ",this.state.featureArray)

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
    let silver_member = userData && userData.silver_member
    let gold_member = userData && userData.gold_member
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
            { textAlign: "center",fontWeight:"600",padding:scale(10), fontSize: scale(16),color:"#000"},
          ]}
        >
          {STRING_CONST.UPGRADE_MEMBERSHIP_TEXT}                          
        </Text>
        <Text
          style={[
            styles.blueStripText,
            { textAlign: "center", fontSize: scale(13),alignSelf:'center',width:scale(310)},
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
          <MyStatusBar />
          {this.renderHeader()}
          <ScrollView style={styles.container}>
            <View style={{ marginHorizontal: scale(20) }}>
              {this.membershipViewList()}
              {this.featureList()}
              {userData && !userData.gold_member && this.upgradeView()}
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }
}

export default MembershipComponent