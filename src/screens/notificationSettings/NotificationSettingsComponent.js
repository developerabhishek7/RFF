
import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
  Linking,
  BackHandler,
  SafeAreaView
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'

import ScreenHeader from "../../components/header/Header";
import * as STRING_CONST from "../../constants/StringConst";
import scale from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import styles from "./NotificationSettingsStyles";
import * as IMG_CONST from "../../constants/ImageConst";
import * as STR_CONST from "../../constants/StringConst";
import { Switch } from "react-native-switch";
import { getAccessToken } from "../../constants/DataConst";
import DeviceInfo from "react-native-device-info";
var uuid = require('react-native-uuid');
import { DrawerActions } from "@react-navigation/drawer";
import FastImage from 'react-native-fast-image'
import MyStatusBar from "../../components/statusbar";


export default class NotificationSettingsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationSettings: this.props.notiifcationSettingsData,
      sendSMS: this.props.userData.phone
        ? this.props.userData.phone.enabled
        : false,
      sendEmail: this.props.userData.email_notifiable,
      deviceName: "",
      deviecBrand: "",
      isEmulator: "",
      isTablet: ""
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;


    let deviceName = await DeviceInfo.getDeviceName()
    let deviecBrand = await DeviceInfo.getBrand()
    let isTablet = await DeviceInfo.isTablet()
    let isEmulator = await DeviceInfo.isEmulator()


    this.setState({
      deviecBrand, deviceName, isTablet, isEmulator
    })

    const accesstoken = await getAccessToken();
    this.setState({
      accesstoken
    })


    this.willFocusSubscription = navigation.addListener(
      "willFocus",
      this.componentWillFocus.bind(this)



    );

    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );

  }

  async componentWillFocus() {
    this.props.getUserInfoAction();
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

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.userData !== prevProps.userData) {
        let sendSMSEnabled = this.props.userData.phone
          ? this.props.userData.phone.enabled
          : false;
        this.setState({
          sendSMS: sendSMSEnabled,
        });
      }

      if (
        this.props.notiifcationSettingsData !==
        prevProps.notiifcationSettingsData
      ) {
        this.setState({
          notificationSettings: this.props.notiifcationSettingsData,
        });
      }
    }
  }

  // renderHeader() {
  //   return (
  //     <View style={{ marginHorizontal: scale(15) }}>
  //       <ScreenHeader
  //         {...this.props}
  //         left
  //         title={STR_CONST.NOTIFICATION_SETTINGS}
  //         notifCount={2}
  //         clickOnLeft={() => this.props.navigation.goBack()}
  //       />
  //     </View>
  //   );
  // }

  renderHeader() {
    return (
      <View style={{
        alignItems: "center", backgroundColor: "#03B2D8",
        height: Platform.OS == 'ios' ? scale(110) : scale(80),
        width: "100%", marginTop: Platform.OS == "android" ? scale(-20) : scale(-60),
        borderBottomLeftRadius: scale(30), borderBottomRightRadius: scale(30), marginBottom: scale(20)
      }}>
        <View style={{ marginTop: Platform.OS == "android" ? scale(16) :scale(40) }}>
          <ScreenHeader
            {...this.props}
            left
            title={STR_CONST.NOTIFICATION_SETTINGS}
            notifCount={2}
            clickOnLeft={() => this.props.navigation.goBack()}
          />
        </View>
      </View>
    )
  }


  postHogAnalytics = (body) => {
    if (this.props.isLoggedIn) {
      this.props.loggedinUserPostHogFun(body)
    }
    else {
      this.props.guestUserPostHogFunc(body)
    }
  }

  toggleSwitch(forSMS) {
    if (forSMS) {
      if (this.props.userData.phone.verified) {
        this.setState(
          {
            sendSMS: !this.state.sendSMS,
          },
          () => {

            if (this.props.isLoggedIn == true) {
              let loggedInUserPostHog = {}
              loggedInUserPostHog["user"] = {
                access_token: this.state.accesstoken
              }
              loggedInUserPostHog["event_name"] = "Turning Phone Number Notification Toggle"
              loggedInUserPostHog["data"] = {
                "metaData": {
                  "deviecBrand": this.state.deviecBrand,
                  "deviceName": this.state.deviceName,
                  "isEmulator": this.state.isEmulator,
                  "isTablet": this.state.isTablet,
                  "plateform": "Mobile",
                }
              }
            }
            else {
              let uuid_Key = uuid.v4()
              let guestUserPostHog = {}
              guestUserPostHog["sessionId"] = `${uuid_Key}`
              guestUserPostHog["event_name"] = "Turning Phone Number Notification Toggle"
              guestUserPostHog["data"] = {
                "metaData": {
                  "deviecBrand": this.state.deviecBrand,
                  "deviceName": this.state.deviceName,
                  "isEmulator": this.state.isEmulator,
                  "isTablet": this.state.isTablet,
                  "plateform": "Mobile",
                }
              }
            }
            this.props.SMSNotificationToggleAction(this.state.sendSMS);
          }
        );
      } else {
        Alert.alert(STRING_CONST.VERIFY_NUMBER);
      }
    } else {
      this.setState(
        {
          sendEmail: !this.state.sendEmail,
        },
        () => {
          this.props.emailNotificationToggleAction(this.state.sendEmail);
        }
      );
    }
  }

  async onNotificationSettingsChange(val) {
    if (!this.props.userData.bronze_member) {
      this.selectproducts("push_notification");
      let NotificationDisbledFromPhone = await AsyncStorage.getItem(
        "NotificationDisbledFromPhone"
      );
      NotificationDisbledFromPhone = JSON.parse(NotificationDisbledFromPhone);
      if (val && NotificationDisbledFromPhone.value) {
        Alert.alert(STRING_CONST.NOTIFICATION_PERMISSION, null, [
          {
            text: STRING_CONST.OK,
            onPress: () => {
              Linking.openSettings();
            },
          },
          {
            text: STRING_CONST.IGNORE,
            onPress: () => console.log("Ask me later pressed"),
          },
        ]);
      }
    } else {

      console.log("yes update this after changes.")
      // this.props.navigation.navigate(STRING_CONST.PRICING_SCREEN);
    }
  }

  availabilityAlert() {
    const { sendSMS, sendEmail, notificationSettings } = this.state;
    let userData = this.props.userData;
    const { navigation } = this.props

    return (
      <View>



        <View style={[styles.containerView, { marginTop: scale(6) }]}>
          <View style={styles.availabilityAlertInnerView}>
            <Image source={IMG_CONST.MSG}
              resizeMode="contain"
              style={{ height: scale(30), width: scale(30), marginStart: scale(20), marginRight: scale(5) }}
            />
            <Text style={[styles.notificationTitle, { fontWeight: "700" }]}>
              {STR_CONST.SMS_ALERT_NOTIFICATION}
            </Text>
            <View style={styles.flexRowContainer}>
              {/* <Text
              style={[
                styles.onOffText,
                {
                  color: sendSMS ? colours.greyText : colours.lightBlueTheme,
                  marginRight: scale(5),
                },
              ]}
            >
              {STR_CONST.OFF}
            </Text> */}
              <Switch
                value={sendSMS}
                onValueChange={(val) => {
                  if (!userData.gold_member) {

                    // userData.isAppReviewSuccess 
                    // this.props.navigation.dispatch(DrawerActions.openDrawer())

                    this.props.navigation.navigate(
                      STR_CONST.MANAGE_CONTACT_SCREEN,
                      {
                        userData: this.props.userData,
                      }
                    );
                    // this.props.navigation.navigate(STRING_CONST.MANAGE_CONTACT_SCREEN);
                    // this.props.navigation.navigate(STRING_CONST.PRICING_SCREEN);
                  } else if (!userData.phone || !userData.phone.verified) {
                    this.props.navigation.navigate(
                      STR_CONST.MANAGE_CONTACT_SCREEN,
                      {
                        userData: this.props.userData,
                      }
                    );
                  } else {
                    this.toggleSwitch(true);
                  }
                }}
                circleSize={scale(16)}
                barHeight={scale(20)}
                circleBorderWidth={0}
                backgroundActive={colours.dimLightBlueTheme}
                backgroundInactive={colours.backgroundInactive}
                circleActiveColor={colours.lightBlueTheme}
                circleInActiveColor={colours.lightGreyish}
                changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                innerCircleStyle={styles.switchInnerCircle} // style for inner animated circle for what you (may) be rendering inside the circle
                renderActiveText={false}
                renderInActiveText={false}
                switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                switchWidthMultiplier={2.5} // multipled by the `circleSize` prop to calculate total width of the Switch
                switchBorderRadius={scale(30)} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
              />
            </View>
          </View>
          <Text style={styles.notificationDetail}>
            {STR_CONST.SMS_NOTIFICATION_DETAILS}
          </Text>

        </View>


        <View style={styles.containerView}>
          <View style={styles.availabilityAlertInnerView}>
            <Image source={IMG_CONST.EMAIL}
              resizeMode="contain"
              style={{ height: scale(30), width: scale(30), marginStart: scale(20), marginRight: scale(5) }}
            />
            <Text style={[styles.notificationTitle, { fontWeight: "700" }]}>
              {STR_CONST.EMAIL_ALERT_NOTIFICATION}
            </Text>
            <View style={styles.flexRowContainer}>

              <Switch
                value={sendEmail}
                onValueChange={(val) => this.toggleSwitch(false)}
                disabled={false}
                circleSize={scale(16)}
                barHeight={scale(20)}
                circleBorderWidth={0}
                backgroundActive={colours.dimLightBlueTheme}
                backgroundInactive={colours.backgroundInactive}
                circleActiveColor={colours.lightBlueTheme}
                circleInActiveColor={colours.lightGreyish}
                changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                innerCircleStyle={styles.switchInnerCircle} // style for inner animated circle for what you (may) be rendering inside the circle
                renderActiveText={false}
                renderInActiveText={false}
                switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                switchWidthMultiplier={2.5} // multipled by the `circleSize` prop to calculate total width of the Switch
                switchBorderRadius={scale(30)} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
              />
            </View>
          </View>

          <Text style={styles.notificationDetail}>
            {STR_CONST.EMAIL_NOTIFICATION_DETAILS}
          </Text>
        </View>
        <View style={styles.containerView}>
          <View style={styles.availabilityAlertInnerView}>
            <Image source={IMG_CONST.LOGO}
              resizeMode="contain"
              style={{ height: scale(30), width: scale(30), marginStart: scale(20), marginRight: scale(5) }}
            />
            <Text style={[styles.notificationTitle, { fontWeight: "700" }]}>
              {STR_CONST.PUSH_NOTIFICATION}
            </Text>
            <View style={styles.flexRowContainer}>
              <Switch
                value={
                  userData && userData.gold_member ?
                  notificationSettings && notificationSettings.push_notification : false
                }
                onValueChange={async (val) => {
                  if(userData && userData.gold_member){
                  await this.onNotificationSettingsChange(val);
                  }else{
                    Alert.alert(
                      '',
                      'Upgrade to Gold membership to get App Alert Notifications',
                      [
                        {  
                          text: 'Cancel',  
                          onPress: () =>  this.setState({isLoader:false}),  
                          style: 'Cancel',  
                      }, 
                        {text: 'Upgrade',onPress: ()=>{ 
                        this.gotoMembershipScreen()
                      }}
                    ],
                      {cancelable: false},
                    );
                  }
                }}
                 circleSize={scale(16)}
                barHeight={scale(20)}
                circleBorderWidth={0}
                backgroundActive={colours.dimLightBlueTheme}
                backgroundInactive={colours.backgroundInactive}
                circleActiveColor={colours.lightBlueTheme}
                circleInActiveColor={colours.lightGreyish}
                changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                innerCircleStyle={styles.switchInnerCircle} // style for inner animated circle for what you (may) be rendering inside the circle
                renderActiveText={false}
                renderInActiveText={false}
                switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                switchWidthMultiplier={2.5} // multipled by the `circleSize` prop to calculate total width of the Switch
                switchBorderRadius={scale(30)} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
              />
             
            </View>
          </View>
          <Text style={styles.notificationDetail}>
            {STR_CONST.PUSH_NOTIFICATION_DETAILS}
          </Text>
        </View>

      </View>
    );
  }
  selectproducts(product) {
    let newNotificationSettings = this.state.notificationSettings
      ? this.state.notificationSettings
      : {};
    newNotificationSettings[product] = !newNotificationSettings[product];
    this.setState({
      notificationSettings: newNotificationSettings,
    });
    this.props.setNotificationSettingsAction(newNotificationSettings);
  }
  keepInTouchAlert() {
    const { notificationSettings } = this.state;
    return (
      <View style={styles.keepInTouchView}>
        <Text
          style={[
            styles.infoTitle,
            { fontWeight: Platform.OS == "ios" ? "600" : "bold" },
          ]}
        >
          {STR_CONST.KEEP_IN_TOUCH}
        </Text>
        <Text style={[styles.keepInTouchViewSubText, { fontWeight: "600" }]}>
          {STR_CONST.KEEP_IN_TOUCH_SUBTEXT}
        </Text>
        <View style={styles.availabilityAlertInnerView}>
          <Text style={[styles.notificationTitle, { fontWeight: "600" }]}>
            {STR_CONST.NEWSLETTER}
          </Text>
          <View style={styles.flexRowContainer}>
            <TouchableOpacity
              onPress={() => {
                this.selectproducts("newsletters");
              }}
            >
              <FastImage
                source={
                  notificationSettings && notificationSettings.newsletters
                    ? IMG_CONST.CHECK
                    : IMG_CONST.UNCHECK
                }
                resizeMode="cover"
                style={styles.checkUncheckButton}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.availabilityAlertInnerView}>
          <Text style={[styles.notificationTitle, { fontWeight: "600" }]}>
            {STR_CONST.OFFERS}
          </Text>
          <View style={styles.flexRowContainer}>
            <TouchableOpacity
              onPress={() => {
                this.selectproducts("offers");
              }}
            >
              <FastImage
                source={
                  notificationSettings && notificationSettings.offers
                    ? IMG_CONST.CHECK
                    : IMG_CONST.UNCHECK
                }
                resizeMode="cover"
                style={styles.checkUncheckButton}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.availabilityAlertInnerView}>
          <Text style={[styles.notificationTitle, { fontWeight: "600" }]}>
            {STR_CONST.ASSOCIATE_OFFERS}
          </Text>
          <View style={styles.flexRowContainer}>
            <TouchableOpacity
              onPress={() => {
                this.selectproducts("associate_offers");
              }}
            >
              <FastImage
                source={
                  notificationSettings && notificationSettings.associate_offers
                    ? IMG_CONST.CHECK
                    : IMG_CONST.UNCHECK
                }
                resizeMode="cover"
                style={styles.checkUncheckButton}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.line} />
      </View>
    );
  }

  gotoMembershipScreen = () => {
    this.props.navigation.navigate("MembershipContainerScreen")
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <MyStatusBar />
        {this.renderHeader()}
        <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="always">
          <View style={{ alignSelf: 'center' }}>
            {this.availabilityAlert()}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}