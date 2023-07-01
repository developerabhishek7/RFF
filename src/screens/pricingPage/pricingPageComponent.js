import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  FlatList,
  Linking,
  Image,
  SafeAreaView,
  ScrollView,
  BackHandler,
  // Switch
} from "react-native";
import ScreenHeader from "../../components/header/Header";
import styles from "./pricingPageStyles";
import * as STRING_CONST from "../../constants/StringConst";
import * as IMAGE_CONST from "../../constants/ImageConst";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import CustomButton from "../../components/customComponents/CustomButton";
import { Switch } from "react-native-switch";
import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");
import Carousel, { Pagination } from "react-native-snap-carousel";
import * as Config from "../../helpers/config";
// import DropShadow from "react-native-drop-shadow";
import { isAndroid } from "../../utils/commonMethods";
import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";
// import Purchases from "react-native-purchases";

// import Purchases, { PurchaserInfo, PurchasesOfferings } from 'react-native-purchases';

// import Purchases from "react-native-purchases";
// import { CheckoutCart, CBCheckoutParams, CBCheckoutProps } from "@chargebee/react-native-chargebee";
import RNRestart from 'react-native-restart'; 
import DeviceInfo from "react-native-device-info";
var uuid = require('react-native-uuid');
import { getAccessToken ,getUserId} from "../../constants/DataConst";
export default class PricingPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isYearly: false,
      activeSlide: 0,
      isGoldSwitch: true,
      isSilverSwitch: true,
      isMonthlyActive: true,
      isYearlyActive: false,
      accesstoken:"",
      userId:"",
      deviceName:"",
      deviecBrand:"",
      isEmulator:"",
      isTablet:""
    };
  }

  goToNotifications() {
    const { navigation } = this.props;
    navigation.navigate(STRING_CONST.NOTIFICATIONS_SCREEN, {
      fromAlertScreen: false,
    });
  }


  // checkSucessStatus = async () => {
  //   const getProducts = await Purchases.getPurchaserInfo()

  // }

//   makePurchaseForSilver = async() => {
//     // setanimating(true)
//    let data =   await Purchases.purchaseProduct("silver_monthly_plan", null, Purchases.PURCHASE_TYPE.INAPP);
//     console.log("checking what actually getting after result #######   ",JSON.stringify(data))
//     // if(data && data!== null && data !== undefined){
//     //     setanimating(false)
//     //     let subscriptionPlanId = 2
//     //     props.updateUserTierActions(subscriptionId,subscriptionPlanId)
//     // }
                         
// }

  async componentDidMount() {

    const accesstoken = await getAccessToken();
    const userId = await getUserId()

    console.log("yes check here userId details here  - - - - -  - -",userId)


    let deviceName = await DeviceInfo.getDeviceName()
    let deviecBrand = await DeviceInfo.getBrand()
    let isTablet = await DeviceInfo.isTablet()
    let isEmulator = await DeviceInfo.isEmulator()



    // const purchaserInfo = await Purchases.getPurchaserInfo();

    // console.log("purchase Info Object ######   ",purchaserInfo)

    // const appUserID = await Purchases.getAppUserID();
    // console.log("yes check here app userId #######   ",appUserID)
    // const isAnonymous = await Purchases.isAnonymous();
    // console.log("yes check here isAnonymous obj #######   ",isAnonymous)

    // const offerings = await Purchases.getOfferings();

    // console.log("yes check here offering details ####### ",offerings)

   

    this.setState({
      deviecBrand,deviceName,isTablet,isEmulator
    })
    this.setState({
      accesstoken,userId
    })

    // let currentSubscription = await Purchases.getPurchaserInfo()
       
    if (this.props.isLoggedIn == true) {
      let loggedInUserPostHog = {}
      loggedInUserPostHog["user"] = {
        access_token: accesstoken
      }
      loggedInUserPostHog["event_name"] = "User lands on Pricing Page"
      loggedInUserPostHog["data"] = {
       "metaData" : {
                          "deviecBrand":this.state.deviecBrand,
                          "deviceName":this.state.deviceName,
                          "isEmulator":this.state.isEmulator,
                          "isTablet":this.state.isTablet,
                          "plateform": "Mobile",
                        }
      }
      // this.postHogAnalytics(loggedInUserPostHog)
    }
    else {
      let uuid_Key = uuid.v4()
      let guestUserPostHog = {}
      guestUserPostHog["sessionId"] = `${uuid_Key}`
      guestUserPostHog["event_name"] = "User lands on Pricing Page"
      guestUserPostHog["data"] = {
       "metaData" : {
                          "deviecBrand":this.state.deviecBrand,
                          "deviceName":this.state.deviceName,
                          "isEmulator":this.state.isEmulator,
                          "isTablet":this.state.isTablet,
                          "plateform": "Mobile",
                        }
      }
      // this.postHogAnalytics(guestUserPostHog)
    }

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

  renderHeader() {
    return (
      <View style={{ marginHorizontal: scale(15) }}>
        <ScreenHeader
          {...this.props}
          left
          setting
          title={STRING_CONST.PRICING_SCREEN_TITLE}
          right
          notifCount={2}
          clickOnRight={() => this.goToNotifications()}
        />
      </View>
    );
  }
  switchView() {
    const { isYearly } = this.state;
    return (
      <View style={styles.switchViewContainer}>
        <TouchableOpacity
          style={{
            backgroundColor: !isYearly
              ? colours.lightBlueTheme
              : colours.dimLightBlueTheme,
            padding: scale(13),
            borderTopLeftRadius: scale(40),
            borderBottomLeftRadius: scale(40),
            paddingHorizontal: scale(20),
          }}
          onPress={() => {
            this.setState({
              isYearly: false,
            })
          }}
        >
          <Text
            style={[
              styles.onOffText,
              {
                color: !isYearly ? colours.white : 'rgba(19, 44, 82, 0.7)',
              },
            ]}
          >
            {STRING_CONST.MONTHLY_TEXT}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: isYearly
              ? colours.lightBlueTheme
              : colours.dimLightBlueTheme,
            padding: scale(13),
            borderTopRightRadius: scale(40),
            borderBottomRightRadius: scale(40),
            paddingHorizontal: scale(20),
          }}
          onPress={() => {
            this.setState({
              isYearly: true,
            })
          }}
        >
          <Text
            style={[
              styles.onOffText,
              {
                color: isYearly ? colours.white : 'rgba(19, 44, 82, 0.7)',
              },
            ]}
          >
            Yearly (2 Months Free)
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  mapSearchView(isBronze) {
    return (
      <View style={[styles.descriptionSubView]}>
        <View style={styles.basicRowStyle}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={
                isBronze ? IMAGE_CONST.RED_CROSS : IMAGE_CONST.ACTIVE_BLUE_TICK
              }
              style={styles.tickMark}
            />
            <Text
              style={[
                styles.blueStripText,
                {
                  color: isBronze
                    ? colours.lightGreyish
                    : colours.darkBlueTheme,
                },
              ]}
            >
              <Text style={{ fontWeight: "bold" }}>
                {STRING_CONST.WHERE_CAN_I_GO_TEXT}{" "}
              </Text>{" "}
              {STRING_CONST.MAP_SEARCH_TITLE}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  alertsAtOnceView(limit) {
    return (
      <View
        style={[
          styles.descriptionSubView,
          {
            backgroundColor:
              limit == STRING_CONST.BRONZE_ALERT_LIMIT
                ? colours.featureListBackgroundColor
                : colours.white,
          },
        ]}
      >
        <View style={styles.basicRowStyle}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={
                limit == STRING_CONST.BRONZE_ALERT_LIMIT
                  ? IMAGE_CONST.ACTIVE_BLUE_TICK
                  : IMAGE_CONST.DARK_ACTIVE_INFO
              }
              style={styles.tickMark}
            />
            <Text style={styles.blueStripText}>
              <Text style={{ fontWeight: "bold" }}>{limit} </Text>
              {STRING_CONST.ACTIVE_ALERTS}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  alertNotificationView(text) {
    return (
      <View style={styles.descriptionSubView}>
        <View style={styles.basicRowStyle}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={IMAGE_CONST.ACTIVE_BLUE_TICK}
              style={styles.tickMark}
            />
            <Text style={styles.blueStripText}>
              <Text style={{ fontWeight: "bold" }}>{text} </Text>
              {STRING_CONST.DAILY_ALERTS}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  airlineSearchesView() {
    return (
      <View
        style={[styles.descriptionSubView, { backgroundColor: colours.white }]}
      >
        <View style={styles.basicRowStyle}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={IMAGE_CONST.DARK_ACTIVE_INFO}
              style={styles.tickMark}
            />
            <Text style={styles.blueStripText}>
              <Text style={{ fontWeight: "bold" }}>
                {STRING_CONST.UNLIMITED}{" "}
              </Text>
              {STRING_CONST.AIRLINE_SERACHES}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  commonFacilities(member) {
    return (
      <View>
        <View
          style={[
            styles.descriptionSubView,
            {
              backgroundColor:
                member !== STRING_CONST.BRONZE_MEMBER
                  ? colours.featureListBackgroundColor
                  : colours.white,
            },
          ]}
        >
          <View style={styles.basicRowStyle}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={
                  member == STRING_CONST.BRONZE_MEMBER
                    ? IMAGE_CONST.DARK_ACTIVE_INFO
                    : IMAGE_CONST.ACTIVE_BLUE_TICK
                }
                style={styles.tickMark}
              />
              <Text style={styles.blueStripText}>
                {STRING_CONST.IOS_ANDROID}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.descriptionSubView,
            {
              backgroundColor:
                member == STRING_CONST.BRONZE_MEMBER
                  ? colours.featureListBackgroundColor
                  : colours.white,
            },
          ]}
        >
          <View style={styles.basicRowStyle}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={
                  member == STRING_CONST.BRONZE_MEMBER
                    ? IMAGE_CONST.ACTIVE_BLUE_TICK
                    : IMAGE_CONST.DARK_ACTIVE_INFO
                }
                style={styles.tickMark}
              />
              <Text style={styles.blueStripText}>
                {STRING_CONST.EMAIL_ALERTS}
              </Text>
            </View>
          </View>
        </View>

        {member == STRING_CONST.GOLD_MEMBER && (
          <View style={[styles.descriptionSubView]}>
            <View style={styles.basicRowStyle}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={IMAGE_CONST.ACTIVE_BLUE_TICK}
                  style={styles.tickMark}
                />
                <Text style={[styles.blueStripText]}>
                  {STRING_CONST.SMS_ALERTS}
                </Text>
              </View>
            </View>
          </View>
        )}

        <View
          style={[
            styles.descriptionSubView,
            {
              backgroundColor:
                member == STRING_CONST.SILVER_MEMBER
                  ? colours.featureListBackgroundColor
                  : colours.white,
            },
          ]}
        >
          {member !== STRING_CONST.BRONZE_MEMBER && (
            <View style={styles.basicRowStyle}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={
                    member == STRING_CONST.SILVER_MEMBER
                      ? IMAGE_CONST.ACTIVE_BLUE_TICK
                      : IMAGE_CONST.DARK_ACTIVE_INFO
                  }
                  style={styles.tickMark}
                />
                <Text style={styles.blueStripText}>
                  {STRING_CONST.PUSH_NOTIF_ALERTS}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
  bronzePage(index) {
    let userData = this.props.userData;
    const { plansArray } = this.props;
    let itemIndex = plansArray
      .map(function (x) {
        return x.chargebee_plan_id;
      })
      .indexOf(STRING_CONST.BRONZE_PLAN_ID);
    return (
      <DropShadow
        style={[
          styles.shadowStyle,
          {
            shadowOpacity:
              index == 2 ? STRING_CONST.PRICING_CARD_SHADOW_OPACITY : 0,
          },
        ]}
      >
        <View elevation={5} style={[styles.slide1]}>
          <View style={styles.headingView}>
            <Image
              source={IMAGE_CONST.PAPER_PLANE}
              style={styles.membershipIcon}
            />
            <Text style={styles.text}>{STRING_CONST.BRONZE_TEXT}</Text>
          </View>
          {plansArray.length > 0 && (
            <Text style={styles.priceStyle}>
              {plansArray[itemIndex].price
                ? `£${plansArray[itemIndex].price}`
                : STRING_CONST.FREE_TEXT}
            </Text>
          )}
          <View style={styles.descriptionContainerView}>
            {this.alertNotificationView(STRING_CONST.DAILY_TEXT)}
            {this.airlineSearchesView()}
            {this.alertsAtOnceView(STRING_CONST.BRONZE_ALERT_LIMIT)}
            {this.commonFacilities(STRING_CONST.BRONZE_MEMBER)}
          </View>
          {/* {isAndroid() &&
            this.renderButton(
              userData.bronze_member
                ? STRING_CONST.CURRENT_PLAN
                : "Start 7 Day Free Trial",
              this.props.isLoggedIn,
              () => {
                this.onSubscribePressed();
              }
            )} */}
        </View>
      </DropShadow>
    );
  }
  silverPage(index) {
    const { isYearly, isSilverSwitch, isMonthlyActive } = this.state;
    let userData = this.props.userData;
    let chargebee_plan_id = Object.keys(userData).length != 0
      ? userData.current_plan.chargebee_plan_id
      : "bronze-trial-plan";
    let monthlySubscription =
      !isYearly && chargebee_plan_id == STRING_CONST.SILVER_MONTHLY;
    let yearlySubscription =
      isYearly && chargebee_plan_id == STRING_CONST.SILVER_YEARLY;
    const { plansArray } = this.props;

    let expireTime = userData.current_subscription_expiry

    let period_unit = Object.keys(userData).length != 0 ? userData.current_plan.period_unit : ""
    let on_trial = Object.keys(userData).length != 0 ? userData.current_plan.on_trial : ""
    let opted_free_trial = Object.keys(userData).length != 0 ? userData.opted_free_trial : ""

    let silver_member = userData.silver_member

    let gold_member = userData.gold_member
    let itemIndex;
    if (isYearly) {
      itemIndex = plansArray
        .map(function (x) {
          return x.chargebee_plan_id;
        })
        .indexOf(STRING_CONST.SILVER_YEARLY_PLAN_ID);
    } else {
      itemIndex = plansArray
        .map(function (x) {
          return x.chargebee_plan_id;
        })
        .indexOf(STRING_CONST.SILVER_MONTHLY_PLAN_ID);
    }
    return (
      <DropShadow
        style={[
          styles.shadowStyle,
          {
            shadowOpacity:
              index == 1 ? STRING_CONST.PRICING_CARD_SHADOW_OPACITY : 0,
          },
        ]}
      >
        <View style={[styles.slide1]}>
          <View style={styles.headingView}>
            <Image
              source={IMAGE_CONST.AIRPLANE}
              style={styles.membershipIcon}
            />
            <Text style={styles.text}>{STRING_CONST.SILVER_TEXT}</Text>
          </View>
          {plansArray.length > 0 && (
            // <Text style={styles.priceStyle}>
            //   {`£${plansArray[itemIndex].price}`}
            //   <Text style={{ fontSize: scale(12) }}>
            //     {!isYearly ? STRING_CONST.PER_MONTH : STRING_CONST.YEARLY_TEXT}
            //   </Text>
            // </Text>

            <Text style={styles.priceStyle}>
              {
                isSilverSwitch ?
                  <Fragment>
                    {/* {`£${plansArray[itemIndex].original_price}`} */}
                    {
                      isMonthlyActive ?
                        <Fragment>
                          {`£${'3.99'}`}
                        </Fragment>
                        :
                        <Fragment>
                          {`£${'3.33'}`}
                        </Fragment>
                    }
                  </Fragment>
                  :
                  <Fragment>
                    {`£${plansArray[itemIndex].price}`}
                  </Fragment>
              }
              {/* {`£${plansArray[itemIndex].original_price}`} */}
              <Text style={{ fontSize: scale(12) }}>
                {STRING_CONST.PER_MONTH}
              </Text>
            </Text>
          )}
          {/* <Text
            style={[
              styles.priceStyle,
              { fontSize: scale(12), marginTop: verticalScale(10) },
            ]}
          >
            {isYearly
              ? STRING_CONST.BILLED_YEARLY
              : STRING_CONST.BILLED_MONTHLY}
          </Text> */}

          {
            isSilverSwitch ?
              <View style={{ flexDirection: 'row', justifyContent: 'center', margin: scale(7) }}>
                {
                  !isMonthlyActive ?
                    <Text style={{ fontSize: scale(12), color: colours.darkBlueTheme, fontWeight: "700" }}>billed annually</Text>
                    :
                    null
                }
                {/* <Text style={{ fontSize: scale(12), color: "skyblue", fontWeight: "700" }}> 2 Month Free</Text> */}
              </View>
              :
              null
          }

          {/* <View style={{ flexDirection: "row", justifyContent: "space-evenly", margin: scale(10) }}>
            <Switch
             
              style={{ width: scale(7), height: scale(5) }}
              // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              // ios_backgroundColor="skyblue"
              backgroundActive={'skyblue'}
              activeText={''}
              inActiveText={''}
              changeValueImmediately={true}
              onValueChange={() => this.setState({ isSilverSwitch: !this.state.isSilverSwitch })}
              value={this.state.isSilverSwitch}
            />

            {
              this.state.isSilverSwitch ?
                <Text style={{ fontSize: scale(12), color: colours.darkBlueTheme, fontWeight: "700", padding: scale(7), marginStart: scale(10) }}>Yearly Plan</Text> :
                <Text style={{ fontSize: scale(12), color: colours.darkBlueTheme, fontWeight: "700", padding: scale(7), marginStart: scale(10) }}>Monthy Plan</Text>
            }
          </View> */}

          <View style={styles.descriptionContainerView}>
            {this.alertNotificationView(STRING_CONST.HOURLY_TEXT)}
            {this.airlineSearchesView()}
            {this.mapSearchView(false)}
            {this.alertsAtOnceView(STRING_CONST.SILVER_ALERT_LIMIT)}
            {this.commonFacilities(STRING_CONST.SILVER_MEMBER)}
          </View>
          {/* {
            this.renderButton(
              yearlySubscription || monthlySubscription 
                ? STRING_CONST.CURRENT_PLAN
                : "Start 7 Day Free Trial",
              yearlySubscription || monthlySubscription || userData.gold_member,
              () => {
                this.onSubscribePressed();
              }
            )} */}

            {
              this.renderButton(
                userData.silver_member && period_unit == "year" && !isMonthlyActive
                ? STRING_CONST.CURRENT_PLAN
                : userData.opted_free_trial == true ?
                 STRING_CONST.SUBSCRIBE
                : STRING_CONST.TRIAL_TEXT,
                // userData.silver_member && isMonthlyActive && period_unit == "year" ? true : false,
                false,
                () => {

                  if (this.props.isLoggedIn == true) {
                    let loggedInUserPostHog = {}
                    loggedInUserPostHog["user"] = {
                      access_token: this.state.accesstoken
                    }
                    loggedInUserPostHog["event_name"] = "Silver subscribe button click"
                    loggedInUserPostHog["data"] = {
                      "planType":"silver",
                      "planId": isMonthlyActive?"silver-plan-gbp-monthly-launch" : "silver-plan-gbp-yearly-launch",
                      "couponId":"",
                      "optedFreeTrial": userData.opted_free_trial,
                     "metaData" : {
                          "deviecBrand":this.state.deviecBrand,
                          "deviceName":this.state.deviceName,
                          "isEmulator":this.state.isEmulator,
                          "isTablet":this.state.isTablet,
                          "plateform": "Mobile",
                        }
                    }
                    // this.postHogAnalytics(loggedInUserPostHog)
                  }
                  else {
                    let uuid_Key = uuid.v4()
                    let guestUserPostHog = {}
                    guestUserPostHog["sessionId"] = `${uuid_Key}`
                    guestUserPostHog["event_name"] = "Silver subscribe button click"
                    guestUserPostHog["data"] = {
                      "planType":"silver",
                      "planId": "",
                      "couponId":"",
                      "optedFreeTrial": "",
                      "metaData" : {
                          "deviecBrand":this.state.deviecBrand,
                          "deviceName":this.state.deviceName,
                          "isEmulator":this.state.isEmulator,
                          "isTablet":this.state.isTablet,
                          "plateform": "Mobile",
                        }
                    }
                    // this.postHogAnalytics(guestUserPostHog)
                  }
                  // this.makePurchaseForSilver()
                  let url = `${Config.WEB_BASE_URL}/${silver_member || gold_member ? "change-plan" :"pricing"}?token=${this.state.accesstoken}&id=${this.state.userId}&redirect=${'https://rewardflightfinder.app.link/hNWhSC7mzxb'}`
                  // console.log("yes print url #######   ",url)
                  
                  Linking.openURL(url)
                  // this.onSubscribePressed();
                }
              )
            }
        </View>
      </DropShadow>
    );
  }

  reloaderApp(){
    setTimeout(() => {
      RNRestart.Restart()
    }, 3000);
  }

  // checkPaymentWithChargebee = () => {

  //   return (
  //     <CheckoutCart
  //       onSuccess={(hostedPageId: string) => successfulPurchase(hostedPageId)}
  //       onEachStep={(stepName: string) => handleStep(stepName)}
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

  goldPage(index) {
    // let userData = this.props.userData;
    // const { isYearly, isGoldSwitch, isMonthlyActive } = this.state;
    // const { plansArray } = this.props;

    // let period_unit = ""
    // let on_trial  = ""
    // let opted_free_trial = ""
    // if(userData && Object.keys(userData).length !== 0) {
    //    period_unit = userData.current_plan.period_unit
    //    on_trial = userData.current_plan.on_trial
    //    opted_free_trial = userData.opted_free_trial
  
    // }

    const { isYearly, isGoldSwitch, isMonthlyActive } = this.state;
    let userData = this.props.userData;

    let chargebee_plan_id = Object.keys(userData).length != 0
      ? userData.current_plan.chargebee_plan_id
      : "bronze-trial-plan";
    let monthlySubscription =
      !isYearly && chargebee_plan_id == STRING_CONST.SILVER_MONTHLY;
    let yearlySubscription =
      isYearly && chargebee_plan_id == STRING_CONST.SILVER_YEARLY;
    const { plansArray } = this.props;

    let expireTime = userData.current_subscription_expiry

    let period_unit = Object.keys(userData).length != 0 ? userData.current_plan.period_unit : ""
    let on_trial = Object.keys(userData).length != 0 ? userData.current_plan.on_trial : ""
    let opted_free_trial = Object.keys(userData).length != 0 ? userData.opted_free_trial : ""

    let silver_member = userData.silver_member

    let gold_member = userData.gold_member

   
   

    let itemIndex;
    if (isYearly) {
      itemIndex = plansArray
        .map(function (x) {
          return x.chargebee_plan_id;
        })
        .indexOf(STRING_CONST.GOLD_YEARLY_PLAN_ID);
    } else {
      itemIndex = plansArray
        .map(function (x) {
          return x.chargebee_plan_id;
        })
        .indexOf(STRING_CONST.GOLD_MONTHLY_PLAN_ID);
    }
    return (
      <DropShadow
        style={[
          styles.shadowStyle,
          {
            shadowOpacity:
              index == 0 ? STRING_CONST.PRICING_CARD_SHADOW_OPACITY : 0,
          },
        ]}
      >
        <View style={[styles.slide1]}>
          <View style={styles.headingView}>
            <Image source={IMAGE_CONST.ROCKET} style={styles.membershipIcon} />
            <Text style={styles.text}>{STRING_CONST.GOLD_TEXT}</Text>
          </View>
          {isYearly && plansArray.length > 0 ? (
            <Text style={styles.priceStyle}>
              {`£${plansArray[itemIndex].price}`}
              <Text style={{ fontSize: scale(12) }}>
                {STRING_CONST.YEARLY_TEXT}
              </Text>
            </Text>
          ) : (
            plansArray.length > 0 && (
              <View>
                <Text style={styles.priceStyle}>
                  {
                    isGoldSwitch ?
                      <Fragment>
                        {/* {`£${plansArray[itemIndex].original_price}`} */}
                        {
                          isMonthlyActive ?
                            <Fragment>
                              {`£${'6.99'}`}
                            </Fragment>
                            :
                            <Fragment>
                              {`£${'5.83'}`}
                            </Fragment>
                        }
                      </Fragment>
                      :
                      <Fragment>
                        {`£${plansArray[itemIndex].original_price}`}
                      </Fragment>
                  }
                  {/* {`£${plansArray[itemIndex].original_price}`} */}
                  <Text style={{ fontSize: scale(12) }}>
                    {STRING_CONST.PER_MONTH}
                  </Text>
                </Text>
                {/* <Image source={IMAGE_CONST.RED_LINE} style={styles.cutMark} /> */}
              </View>
            )
          )}
          {
            isGoldSwitch ?
              <View style={{ flexDirection: 'row', justifyContent: 'center', margin: scale(7) }}>
                {
                  !isMonthlyActive ?
                    <Text style={{ fontSize: scale(12), color: colours.darkBlueTheme, fontWeight: "700" }}>billed annually</Text>
                    :
                    null
                }
                {/* <Text style={{ fontSize: scale(12), color: "skyblue", fontWeight: "700" }}> 2 Month Free</Text> */}
              </View>
              :
              null
          }
          {/* <Text
            style={[
              styles.priceStyle,
              { fontSize: scale(12), marginTop: verticalScale(10) },
            ]}
          >
            {STRING_CONST.BILLED_MONTHLY}
          </Text> */}
          {/* <View style={{ flexDirection: "row", justifyContent: "space-evenly", margin: scale(10) }}>
            <Switch
             
              style={{ width: scale(7), height: scale(5) }}
              // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              // ios_backgroundColor="skyblue"
              backgroundActive={'skyblue'}
              activeText={''}
              inActiveText={''}
              circleBorderWidth={1}
              onValueChange={() => this.setState({ isGoldSwitch: !this.state.isGoldSwitch })}
              value={this.state.isGoldSwitch}
            />
            {
              this.state.isGoldSwitch ?
                <Text style={{ fontSize: scale(12), color: colours.darkBlueTheme, fontWeight: "700", padding: scale(7), marginStart: scale(10) }}>Yearly Plan</Text> :
                <Text style={{ fontSize: scale(12), color: colours.darkBlueTheme, fontWeight: "700", padding: scale(7), marginStart: scale(10) }}>Monthy Plan</Text>
            }
          </View> */}

          <View style={styles.descriptionContainerView}>
            {this.alertNotificationView(STRING_CONST.INSTANTLY)}
            {this.airlineSearchesView()}
            {this.mapSearchView(false)}
            {this.alertsAtOnceView(STRING_CONST.GOLD_ALERT_LIMIT)}
            {this.commonFacilities(STRING_CONST.GOLD_MEMBER)}
          </View>
          {
          // isAndroid() &&    
            this.renderButton(
              userData.gold_member && period_unit == "year" && !isMonthlyActive
                ? STRING_CONST.CURRENT_PLAN
                : userData.opted_free_trial == true ?
                 STRING_CONST.SUBSCRIBE
                : STRING_CONST.TRIAL_TEXT,
                false,
                () => {
                  if (this.props.isLoggedIn == true) {
                    let loggedInUserPostHog = {}
                    loggedInUserPostHog["user"] = {
                      access_token: this.state.accesstoken
                    }
                    loggedInUserPostHog["event_name"] = "Gold subscribe button click"
                    loggedInUserPostHog["data"] = {
                      "planType":"gold",
                      "planId": isMonthlyActive?"gold-plan-gbp-monthly-launch" : "gold-plan-gbp-yearly-launch",
                      "couponId":"",
                      "optedFreeTrial": userData.opted_free_trial,
                      "metaData" : {
                          "deviecBrand":this.state.deviecBrand,
                          "deviceName":this.state.deviceName,
                          "isEmulator":this.state.isEmulator,
                          "isTablet":this.state.isTablet,
                          "plateform": "Mobile",
                        }
                    }
                    // this.postHogAnalytics(loggedInUserPostHog)
                  }
                  else {
                    let uuid_Key = uuid.v4()
                    let guestUserPostHog = {}
                    guestUserPostHog["sessionId"] = `${uuid_Key}`
                    guestUserPostHog["event_name"] = "Gold subscribe button click"
                    guestUserPostHog["data"] = {
                      "planType":"gold",
                      "planId": "",
                      "couponId":"",
                      "optedFreeTrial": "",
                      "metaData" : {
                          "deviecBrand":this.state.deviecBrand,
                          "deviceName":this.state.deviceName,
                          "isEmulator":this.state.isEmulator,
                          "isTablet":this.state.isTablet,
                          "plateform": "Mobile",
                        }
                    }
                    // this.postHogAnalytics(guestUserPostHog)
                  }
                // this.onSubscribePressed();
                let url = `${Config.WEB_BASE_URL}/${silver_member || gold_member ? "change-plan" :"pricing"}?token=${this.state.accesstoken}&id=${this.state.userId}&redirect=${'https://rewardflightfinder.app.link/hNWhSC7mzxb'}`
             
                this.reloaderApp()
                Linking.openURL(url)

                // this.makePurchaseForGold()
              }
            )}
          {/* <TouchableOpacity onPress={()=>{this.makePurchaseForGold()}}>
              <Text>Make Purchase</Text>
            </TouchableOpacity> */}

          {/* <Image
            source={IMAGE_CONST.OFFER}
            style={{
              marginRight: scale(8),
              position: "absolute",
              top: scale(-20),
              height: scale(40),
              width: scale(181),
            }}
          /> */}
        </View>
      </DropShadow>
    );
  }

  // membershipCard(index) {
  //   let currentIndex = this._carousel.currentIndex;
  //   switch (index) {
  //     case 0: {
  //       return this.goldPage(currentIndex);
  //     }
  //     case 1: {
  //       return this.silverPage(currentIndex);
  //     }
  //     case 2: {
  //       return this.bronzePage(currentIndex);
  //     }
  //   }
  // }
  get pagination() {
    const { activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={3}
        activeDotIndex={activeSlide}
        dotContainerStyle={{ backgroundColor: colours.white }}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }
  swiperComponent() {
    return (
      <View style={styles.wrapper}>
          
        <Carousel
          containerCustomStyle={{ marginBottom: verticalScale(-30) }}
          dotsLength={2}
          
          ref={(c) => {
            this._carousel = c;
          }}
          onSnapToItem={() => {
            this.setState({
              activeSlide: this._carousel.currentIndex,
            });
          }}
          animate={false}
          data={[1, 2, 3]}
          sliderWidth={width}
          itemWidth={width - scale(110)}
          renderItem={({ item, index }) => this.membershipCard(index)}
          removeClippedSubviews={false}
         
        />
      {this.pagination}
      </View>
    );
  }
  lockDownPromotion() {
    return (
      <View style={styles.lockDownPromotion}>
        <Text style={[styles.lockDownPromotionText]}>
          {STRING_CONST.LOCAKDOWN_PROMOTION_HEADING}
        </Text>
        <Text style={[styles.lockDownPromotionSubText]}>
          {STRING_CONST.LOCAKDOWN_PROMOTION_DESCRIPTION}
        </Text>
      </View>
    );
  }
  renderListItem(item, index) {
    return (
      <View
        style={[
          styles.descriptionCell,
          {
            backgroundColor:
              index % 2 == 0
                ? colours.descriptionBackgroundColor
                : colours.white,
          },
        ]}
      >
        <View style={styles.descritionCellInnerView}>
          <Image
            source={item.icon}
            style={[styles.featureIcon, { marginRight: scale(8) }]}
          />
          <Text style={styles.lockDownPromotionText}>{item.title}</Text>
        </View>
        {index == 2 ? (
          <View>
            <Text style={styles.descriptionText}>
              <Text style={{ fontWeight: "bold" }}>{STRING_CONST.EMAIL}: </Text>{" "}
              {item.emailText}
            </Text>
            <Text
              style={[styles.descriptionText, { marginTop: verticalScale(5) }]}
            >
              <Text style={{ fontWeight: "bold" }}>
                {STRING_CONST.PUSH_NOTIFICATION_TEXT}:{" "}
              </Text>{" "}
              {item.notificationText}
            </Text>
            <Text
              style={[styles.descriptionText, { marginTop: verticalScale(5) }]}
            >
              <Text style={{ fontWeight: "bold" }}>
                {STRING_CONST.SMS_TEXT}:{" "}
              </Text>{" "}
              {item.smsText}
            </Text>
          </View>
        ) : (
          <Text style={styles.descriptionText}>{item.text}</Text>
        )}
      </View>
    );
  }
  featureList() {
    const features = STRING_CONST.PRICING_OBJECT;
    return (
      <FlatList
        style={{ marginTop: verticalScale(25) }}
        data={features}
        renderItem={({ item, index }) => {
          return this.renderListItem(item, index);
        }}
      />
    );
  }
  renderButton(text, disabled, onPress) {
      return (
      <CustomButton
        isdisabled={disabled}
        textSize={scale(14)}
        textOnButton={text}

        onButtonPress={() => {
          text !== "Current Plan" ? onPress() : null
        }}
        buttonColor={
          !disabled && text !== "Current Plan"  ? colours.lightBlueTheme : colours.dimLightBlueTheme
        }
        buttonStyle={styles.subscriptionButtonStyle}
        textColor={colours.white}
      />
    );
  }
  onSubscribePressed() {
    Linking.canOpenURL(Config.UPGRADE_MEMBERSHIP_URL).then((supported) => {
      if (supported) {
        Linking.openURL(Config.UPGRADE_MEMBERSHIP_URL);
      } else {
        console.log("Can not open URI: " + Config.UPGRADE_MEMBERSHIP_URL);
      }
    });
  }

  // makePurchaseForGold = async () => {
  //   let data = await Purchases.purchaseProduct("gold_monthly_plan")
  //   // return false

  //   // Alert.prompt(
  //   //   "Purchase Product",
  //   //   "Enter Product ID for purchasing",
  //   //   [
  //   //     {
  //   //       text: "Cancel",
  //   //       onPress: () => {
  //   //         console.log("Cancel")
  //   //       },
  //   //       style: "cancel"
  //   //     },
  //   //     {
  //   //       text: "OK",
  //   //       onPress: async (text) => {
  //   //         if (text && text.length > 0) {
  //   //           await Purchases.purchaseProduct(text)
  //   //         }
  //   //       }
  //   //     }
  //   //   ]
  //   // );
  // }
  isMonthlyActiveFunction = () => {
    this.setState({
      isYearlyActive: true,
      isMonthlyActive: false
    })
  }


  isYearlyActiveFunction = () => {
    this.setState({
      isMonthlyActive: true,
      isYearlyActive: false
    })
  }



  buttonView() {
    const { isMonthlyActive, isYearlyActive } = this.state
    return (
      <View style={{ flex: 1, margin: scale(7), marginTop: scale(4), flexDirection: "row", justifyContent: 'space-evenly', alignItems: 'center', }}>

        {
          isMonthlyActive ?
            <TouchableOpacity
              // onPress={()=>{this.setState({isMonthlyActive:!this.state.isMonthlyActive})}}
              // onPress={()=>{this.isMonthlyActiveFunction()}}
              style={{
                backgroundColor: "#03B2D8", borderRadius: scale(20), shadowColor: "#03B2D8", shadowOpacity: scale(4),
                shadowColor: '#000',
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.4,
                shadowRadius: 3,
                elevation: 5,

              }}>
              <Text style={{
                paddingStart: scale(30), fontWeight: "700", color: '#FFF', paddingEnd: scale(30), padding: scale(13), fontSize: scale(16),
              }}>Monthly</Text>
            </TouchableOpacity>

            :
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  isMonthlyActive: !this.state.isMonthlyActive,
                  isYearlyActive: !this.state.isYearlyActive
                })
              }}
              // onPress={()=>{this.isMonthlyActiveFunction()}}
              style={{
                backgroundColor: "#EBEFF0", borderRadius: scale(20), shadowColor: "#EBEFF0", shadowOpacity: scale(4),

                shadowColor: '#000',
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.4,
                shadowRadius: 3,
                elevation: 5,
              }}>
              <Text style={{ paddingStart: scale(30), fontWeight: "700", color: 'gray', paddingEnd: scale(30), padding: scale(10), fontSize: scale(16) }}>Monthly</Text>
            </TouchableOpacity>
        }

        {
          isYearlyActive == true ?
            <TouchableOpacity
              // onPress={()=>{this.setState({isYearlyActive:!this.state.isYearlyActive})}}
              // onPress={()=>{this.isYearlyActiveFunction}}
              style={{
                backgroundColor: "#03B2D8", borderRadius: scale(20), shadowColor: "#03B2D8", shadowOpacity: scale(4), flexDirection: "row", justifyContent: "center", alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.4,
                shadowRadius: 3,
                elevation: 5,
              }}>
              <Text style={{ paddingStart: scale(10), textAlign: "center", fontWeight: "700", color: "#FFF", fontSize: scale(16), paddingTop: scale(12), paddingBottom: scale(12) }}>Yearly  </Text>
              <View style={{ backgroundColor: "#FDC127", borderRadius: scale(30), justifyContent: 'center', alignItems: 'center', marginEnd: scale(10) }}>
                <Text style={{ fontWeight: "700", color: "#000", textAlign: "center", fontSize: scale(13), padding: scale(4), marginEnd: scale(0) }}> 2 Months Free</Text>
              </View>
            </TouchableOpacity>
            :

            <TouchableOpacity
              onPress={() => {
                this.setState({
                  isYearlyActive: !this.state.isYearlyActive,
                  isMonthlyActive: !this.state.isMonthlyActive
                })
              }}
              // onPress={()=>{this.isYearlyActiveFunction()}}
              style={{
                backgroundColor: "#EBEFF0", borderRadius: scale(20), shadowColor: "#EBEFF0", shadowOpacity: scale(4), flexDirection: "row", justifyContent: "center", alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.4,
                shadowRadius: 3,
                elevation: 5,
              }}>
              <Text style={{ paddingStart: scale(10), textAlign: "center", fontWeight: "700", color: "grey", fontSize: scale(16), paddingTop: scale(12), paddingBottom: scale(12) }}>Yearly  </Text>
              <View style={{ backgroundColor: "#FDC127", borderRadius: scale(30), justifyContent: 'center', alignItems: 'center', marginEnd: scale(10) }}>
                <Text style={{ fontWeight: "700", color: "#000", textAlign: "center", fontSize: scale(13), padding: scale(4), marginEnd: scale(0) }}> 2 Months Free</Text>
              </View>
            </TouchableOpacity>
        }
      </View>
    )
  }
 postHogAnalytics = (body) => {
    if(this.props.isLoggedIn){
      this.props.loggedinUserPostHogFun(body)
    }
    else{
      this.props.guestUserPostHogFunc(body)
    }
  }

  // makePurchaseForSilver = async () => {
  //   let data = await Purchases.purchaseProduct("silver_monthly_plan")
  //   return false

  //   // Alert.prompt(
  //   //   "Purchase Product",
  //   //   "Enter Product ID for purchasing",
  //   //   [
  //   //     {
  //   //       text: "Cancel",
  //   //       onPress: () => {
  //   //         console.log("Cancel")
  //   //       },
  //   //       style: "cancel"
  //   //     },
  //   //     {
  //   //       text: "OK",
  //   //       onPress: async (text) => {
  //   //         if (text && text.length > 0) {
  //   //           await Purchases.purchaseProduct(text)
  //   //         }
  //   //       }
  //   //     }
  //   //   ]
  //   // );
  // }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.renderHeader()}
        <ScrollView style={styles.container} ref="_scrollView">
          {/* {this.switchView()}    -------->       Removed Just for now, will be added later   */}

          {this.buttonView()}
          {/* {this.swiperComponent()} */}
          {this.lockDownPromotion()}
          {this.featureList()}
          <View style={{ marginBottom: verticalScale(20) }}>
            {this.renderButton(STRING_CONST.GO_TO_TOP, false, () => {
              this.refs._scrollView.scrollTo(0);
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
