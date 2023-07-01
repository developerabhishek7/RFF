// import React, { Component } from "react";
// import {
//   ScrollView,
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   Platform,
//   Alert,
//   AsyncStorage,
//   Linking,
//   BackHandler
// } from "react-native";
// import ScreenHeader from "../../components/header/Header";
// import * as STRING_CONST from "../../constants/StringConst";
// import { SafeAreaView } from "react-navigation";
// import scale from "../../helpers/scale";
// import { colours } from "../../constants/ColorConst";
// import styles from "./NotificationSettingsStyles";
// import * as IMG_CONST from "../../constants/ImageConst";
// import * as STR_CONST from "../../constants/StringConst";
// import { Switch } from "react-native-switch";
// import { getAccessToken } from "../../constants/DataConst";
// import DeviceInfo from "react-native-device-info";
// var uuid = require('react-native-uuid');
// import { DrawerActions } from "react-navigation-drawer";
// export default class NotificationSettingsComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       notificationSettings: this.props.notiifcationSettingsData,
//       sendSMS: this.props.userData.phone
//         ? this.props.userData.phone.enabled
//         : false,
//       sendEmail: this.props.userData.email_notifiable,
//       deviceName:"",
//       deviecBrand:"",
//       isEmulator:"",
//       isTablet:""
//     };
//   }

//   async componentDidMount() {
//     const { navigation } = this.props;


//     let deviceName = await DeviceInfo.getDeviceName()
//     let deviecBrand = await DeviceInfo.getBrand()
//     let isTablet = await DeviceInfo.isTablet()
//     let isEmulator = await DeviceInfo.isEmulator()


//     this.setState({
//       deviecBrand,deviceName,isTablet,isEmulator
//     })

//     const accesstoken = await getAccessToken();
//     this.setState({
//       accesstoken
//     })


//     this.willFocusSubscription = navigation.addListener(
//       "willFocus",
//       this.componentWillFocus.bind(this)



//     );  

//     BackHandler.addEventListener('hardwareBackPress', () =>
//     this.handleBackButton(this.props.navigation),
//   );

//   }

//   async componentWillFocus() {
//     this.props.getUserInfoAction();
//   }


//   handleBackButton = (nav) => {
//     if (!nav.isFocused()) {
//       BackHandler.removeEventListener('hardwareBackPress', () =>
//         this.handleBackButton(this.props.navigation),
//       );
//       return false;
//     } else {
//       nav.goBack();
//       return true;
//     }
//   };


//   componentWillUnmount() {   
//     BackHandler.removeEventListener('hardwareBackPress', () =>
//     this.handleBackButton(this.props.navigation),
//   );
//   }

//   componentDidUpdate(prevProps) {
//     if (this.props !== prevProps) {
//       if (this.props.userData !== prevProps.userData) {
//         let sendSMSEnabled = this.props.userData.phone
//           ? this.props.userData.phone.enabled
//           : false;
//         this.setState({
//           sendSMS: sendSMSEnabled,
//         });
//       }

//       if (
//         this.props.notiifcationSettingsData !==
//         prevProps.notiifcationSettingsData
//       ) {
//         this.setState({
//           notificationSettings: this.props.notiifcationSettingsData,
//         });
//       }
//     }
//   }

//   renderHeader() {
//     return (
//       <View style={{ marginHorizontal: scale(15) }}>
//         <ScreenHeader
//           {...this.props}
//           left
//           title={STR_CONST.NOTIFICATION_SETTINGS}
//           notifCount={2}
//           clickOnLeft={() => this.props.navigation.goBack()}
//         />
//       </View>
//     );
//   }


//   postHogAnalytics = (body) => {
//     if(this.props.isLoggedIn){
//       this.props.loggedinUserPostHogFun(body)
//     }
//     else{
//       this.props.guestUserPostHogFunc(body)
//     }
//   }

//   toggleSwitch(forSMS,isSms,) {


//     console.log("yes check here for SMS value  -  - - - - - ",forSMS ,  isSms)

//     if (isSms == "fromSMS") {
//       if (this.props.userData.phone.verified) {
//         this.setState(
//           {
//             sendSMS: !this.state.sendSMS,
//           },
//           () => {
            
//             if (this.props.isLoggedIn == true) {
//               let loggedInUserPostHog = {}
//               loggedInUserPostHog["user"] = {
//                 access_token: this.state.accesstoken
//               }
//               loggedInUserPostHog["event_name"] = "Turning Phone Number Notification Toggle"
//               loggedInUserPostHog["data"] = {
//                 "metaData" : {
//                           "deviecBrand":this.state.deviecBrand,
//                           "deviceName":this.state.deviceName,
//                           "isEmulator":this.state.isEmulator,
//                           "isTablet":this.state.isTablet,
//                           "plateform": "Mobile",
//                         }
//               }
//               this.postHogAnalytics(loggedInUserPostHog)
//             }
//             else {
//               let uuid_Key = uuid.v4()
//               let guestUserPostHog = {}
//               guestUserPostHog["sessionId"] = `${uuid_Key}`
//               guestUserPostHog["event_name"] = "Turning Phone Number Notification Toggle"
//               guestUserPostHog["data"] = {
//                 "metaData" : {
//                           "deviecBrand":this.state.deviecBrand,
//                           "deviceName":this.state.deviceName,
//                           "isEmulator":this.state.isEmulator,
//                           "isTablet":this.state.isTablet,
//                           "plateform": "Mobile",
//                         }
//               }
//               this.postHogAnalytics(guestUserPostHog)
//             }
//             this.props.SMSNotificationToggleAction(this.state.sendSMS);
//           }
//         );
//       } else {
//         alert(STRING_CONST.VERIFY_NUMBER);
//       }
//     } else {
//       this.setState(
//         {
//           sendEmail: !this.state.sendEmail,
//         },
//         () => {
//           this.props.emailNotificationToggleAction(this.state.sendEmail);
//         }
//       );
//     }
//   }

//   async onNotificationSettingsChange(val) {
//     if (!this.props.userData.bronze_member) {
//       this.selectproducts("push_notification");
//       let NotificationDisbledFromPhone = await AsyncStorage.getItem(
//         "NotificationDisbledFromPhone"
//       );
//       NotificationDisbledFromPhone = JSON.parse(NotificationDisbledFromPhone);
//       if (val && NotificationDisbledFromPhone.value) {
//         Alert.alert(STRING_CONST.NOTIFICATION_PERMISSION, null, [
//           {
//             text: STRING_CONST.OK,
//             onPress: () => {
//               Linking.openSettings();
//             },
//           },
//           {
//             text: STRING_CONST.IGNORE,
//             onPress: () => console.log("Ask me later pressed"),
//           },
//         ]);
//       }
//     } else {

//       console.log("yes update this after changes.")
//       // this.props.navigation.navigate(STRING_CONST.PRICING_SCREEN);
//     }
//   }

//   availabilityAlert() {
//     const { sendSMS, sendEmail, notificationSettings } = this.state;
//     let userData = this.props.userData;

//     // console.log("yes check here body for ongoing data #######  ",userData)
//     const {navigation} = this.props

//     let isEMail = "fromEMail"

//     return (
//       <View style={styles.availabilityAlertView}>
//         <Text
//           style={[
//             styles.infoTitle,
//             { fontWeight: Platform.OS == "ios" ? "600" : "bold" },
//           ]}
//         >
//           {STR_CONST.AVAILABILITY_ALERTS}
//         </Text>


//         <View style={styles.availabilityAlertInnerView}>
//           <Text style={[styles.notificationTitle, { fontWeight: "600" }]}>
//             {STR_CONST.EMAIL_ALERT_NOTIFICATION}
//           </Text>
//           <View style={styles.flexRowContainer}>
//             <Text
//               style={[
//                 styles.onOffText,
//                 {
//                   color: sendEmail ? colours.greyText : colours.lightBlueTheme,
//                   marginRight: scale(5),
//                 },
//               ]}
//             >
//               {STR_CONST.OFF}
//             </Text>
//             <Switch
//               value={sendEmail}
//               onValueChange={(val) => this.toggleSwitch(false,isEMail)}
//               disabled={false}
//               circleSize={scale(16)}
//               barHeight={scale(20)}
//               circleBorderWidth={0}
//               backgroundActive={colours.dimLightBlueTheme}
//               backgroundInactive={colours.backgroundInactive}
//               circleActiveColor={colours.lightBlueTheme}
//               circleInActiveColor={colours.lightGreyish}
//               changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
//               innerCircleStyle={styles.switchInnerCircle} // style for inner animated circle for what you (may) be rendering inside the circle
//               renderActiveText={false}
//               renderInActiveText={false}
//               switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
//               switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
//               switchWidthMultiplier={2.5} // multipled by the `circleSize` prop to calculate total width of the Switch
//               switchBorderRadius={scale(30)} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
//             />
//             <Text
//               style={[
//                 styles.onOffText,
//                 {
//                   color: !sendEmail ? colours.greyText : colours.lightBlueTheme,
//                   marginLeft: scale(5),
//                 },
//               ]}
//             >
//               {STR_CONST.ON}
//             </Text>
//           </View>
//         </View>
//         <Text style={[styles.notificationDetail, { fontWeight: "600" }]}>
//             {STR_CONST.EMAIL_NOTIFICATION_DETAILS}
//           </Text>
//         <View style={styles.line} />



//         <View style={styles.availabilityAlertInnerView}>
//           <Text style={[styles.notificationTitle, { fontWeight: "600" }]}>
//             {STR_CONST.SMS_ALERT_NOTIFICATION}
//           </Text>
//           <View style={styles.flexRowContainer}>
//             <Text
//               style={[
//                 styles.onOffText,
//                 {
//                   color: sendSMS ? colours.greyText : colours.lightBlueTheme,
//                   marginRight: scale(5),
//                 },
//               ]}
//             >
//               {STR_CONST.OFF}
//             </Text>
//             <Switch
//               value={sendSMS}
//               onValueChange={(val) => {
//                 let isSms = "fromSMS"
//                 console.log("yes check here -  - -  - - - -  -",val)

//                 if (!userData.gold_member) {
//                     this.props.navigation.navigate(
//                       STR_CONST.MANAGE_CONTACT_SCREEN,
//                       {
//                         userData: this.props.userData,
//                       }
//                     );
//                   // this.props.navigation.navigate(STRING_CONST.MANAGE_CONTACT_SCREEN);
//                   // this.props.navigation.navigate(STRING_CONST.PRICING_SCREEN);
//                 } else if (!userData.phone || !userData.phone.verified) {
//                   this.props.navigation.navigate(
//                     STR_CONST.MANAGE_CONTACT_SCREEN,
//                     {
//                       userData: this.props.userData,
//                     }
//                   );
//                 } else {
//                   this.toggleSwitch(val,isSms);
//                 }
//               }}
//               circleSize={scale(16)}
//               barHeight={scale(20)}
//               circleBorderWidth={0}
//               backgroundActive={colours.dimLightBlueTheme}
//               backgroundInactive={colours.backgroundInactive}
//               circleActiveColor={colours.lightBlueTheme}
//               circleInActiveColor={colours.lightGreyish}
//               changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
//               innerCircleStyle={styles.switchInnerCircle} // style for inner animated circle for what you (may) be rendering inside the circle
//               renderActiveText={false}
//               renderInActiveText={false}
//               switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
//               switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
//               switchWidthMultiplier={2.5} // multipled by the `circleSize` prop to calculate total width of the Switch
//               switchBorderRadius={scale(30)} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
//             />
//             <Text
//               style={[
//                 styles.onOffText,
//                 {
//                   color: !sendSMS ? colours.greyText : colours.lightBlueTheme,
//                   marginLeft: scale(5),
//                 },
//               ]}
//             >
//               {STR_CONST.ON}
//             </Text>
//           </View>
//         </View>
//         <Text style={[styles.notificationDetail, { fontWeight: "600" }]}>
//             {STR_CONST.SMS_NOTIFICATION_DETAILS}
//           </Text>


          
//         <View style={styles.line} />



//         <View style={styles.availabilityAlertInnerView}>
//           <Text style={[styles.notificationTitle, { fontWeight: "600" }]}>
//             {STR_CONST.PUSH_NOTIFICATION}
//           </Text>
//           <View style={styles.flexRowContainer}>
//             <Text
//               style={[
//                 styles.onOffText,
//                 {
//                   color: sendEmail ? colours.greyText : colours.lightBlueTheme,
//                   marginRight: scale(5),
//                 },
//               ]}
//             >
//               {STR_CONST.OFF}
//             </Text>
//             <Switch
//               value={
//                 notificationSettings && notificationSettings.push_notification
//               }
//               onValueChange={async (val) => {
//                 await this.onNotificationSettingsChange(val);
//               }}
//               disabled={false}
//               circleSize={scale(16)}
//               barHeight={scale(20)}
//               circleBorderWidth={0}
//               backgroundActive={colours.dimLightBlueTheme}
//               backgroundInactive={colours.backgroundInactive}
//               circleActiveColor={colours.lightBlueTheme}
//               circleInActiveColor={colours.lightGreyish}
//               changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
//               innerCircleStyle={styles.switchInnerCircle} // style for inner animated circle for what you (may) be rendering inside the circle
//               renderActiveText={false}
//               renderInActiveText={false}
//               switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
//               switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
//               switchWidthMultiplier={2.5} // multipled by the `circleSize` prop to calculate total width of the Switch
//               switchBorderRadius={scale(30)} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
//             />
//             <Text
//               style={[
//                 styles.onOffText,
//                 {
//                   color: !sendEmail ? colours.greyText : colours.lightBlueTheme,
//                   marginLeft: scale(5),
//                 },
//               ]}
//             >
//               {STR_CONST.ON}
//             </Text>
//           </View>
//         </View>
//         <Text style={[styles.notificationDetail, { fontWeight: "600" }]}>
//             {STR_CONST.PUSH_NOTIFICATION_DETAILS}
//           </Text>
//         <View style={styles.line} />
       
//       </View>
//     );
//   }
//   selectproducts(product) {
//     let newNotificationSettings = this.state.notificationSettings
//       ? this.state.notificationSettings
//       : {};
//     newNotificationSettings[product] = !newNotificationSettings[product];
//     this.setState({
//       notificationSettings: newNotificationSettings,
//     });
//     this.props.setNotificationSettingsAction(newNotificationSettings);
//   }
//   keepInTouchAlert() {
//     const { notificationSettings } = this.state;
//     return (
//       <View style={styles.keepInTouchView}>
//         <Text
//           style={[
//             styles.infoTitle,
//             { fontWeight: Platform.OS == "ios" ? "600" : "bold" },
//           ]}
//         >
//           {STR_CONST.KEEP_IN_TOUCH}
//         </Text>
//         <Text style={[styles.keepInTouchViewSubText, { fontWeight: "600" }]}>
//           {STR_CONST.KEEP_IN_TOUCH_SUBTEXT}
//         </Text>
//         <View style={styles.availabilityAlertInnerView}>
//           <Text style={[styles.notificationTitle, { fontWeight: "600" }]}>
//             {STR_CONST.NEWSLETTER}
//           </Text>
//           <View style={styles.flexRowContainer}>
//             <TouchableOpacity
//               onPress={() => {
//                 this.selectproducts("newsletters");
//               }}
//             >
//               <Image
//                 source={
//                   notificationSettings && notificationSettings.newsletters
//                     ? IMG_CONST.CHECK
//                     : IMG_CONST.UNCHECK
//                 }
//                 resizeMode="cover"
//                 style={styles.checkUncheckButton}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//         <View style={styles.line} />
//         <View style={styles.availabilityAlertInnerView}>
//           <Text style={[styles.notificationTitle, { fontWeight: "600" }]}>
//             {STR_CONST.OFFERS}
//           </Text>
//           <View style={styles.flexRowContainer}>
//             <TouchableOpacity
//               onPress={() => {
//                 this.selectproducts("offers");
//               }}
//             >
//               <Image
//                 source={
//                   notificationSettings && notificationSettings.offers
//                     ? IMG_CONST.CHECK
//                     : IMG_CONST.UNCHECK
//                 }
//                 resizeMode="cover"
//                 style={styles.checkUncheckButton}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//         <View style={styles.line} />
//         <View style={styles.availabilityAlertInnerView}>
//           <Text style={[styles.notificationTitle, { fontWeight: "600" }]}>
//             {STR_CONST.ASSOCIATE_OFFERS}
//           </Text>
//           <View style={styles.flexRowContainer}>
//             <TouchableOpacity
//               onPress={() => {
//                 this.selectproducts("associate_offers");
//               }}
//             >
//               <Image
//                 source={
//                   notificationSettings && notificationSettings.associate_offers
//                     ? IMG_CONST.CHECK
//                     : IMG_CONST.UNCHECK
//                 }
//                 resizeMode="cover"
//                 style={styles.checkUncheckButton}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//         <View style={styles.line} />
//       </View>
//     );
//   }

//   render() {
//     return (
//       <SafeAreaView style={{ flex: 1,}}>
//         <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="always">
//           {this.renderHeader()}

//           <View style={{ flex: 1,justifyContent:'center',alignItems:'center',alignSelf:'center' }}>
//             {this.availabilityAlert()}
//             {/* {this.keepInTouchAlert()} */}
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     );
//   }
// }
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
export default class NotificationSettingsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationSettings: this.props.notiifcationSettingsData,
      sendSMS: this.props.userData.phone
        ? this.props.userData.phone.enabled
        : false,
      sendEmail: this.props.userData.email_notifiable,
      deviceName:"",
      deviecBrand:"",
      isEmulator:"",
      isTablet:""
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;


    let deviceName = await DeviceInfo.getDeviceName()
    let deviecBrand = await DeviceInfo.getBrand()
    let isTablet = await DeviceInfo.isTablet()
    let isEmulator = await DeviceInfo.isEmulator()


    this.setState({
      deviecBrand,deviceName,isTablet,isEmulator
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

  renderHeader() {
    return (
      <View style={{ marginHorizontal: scale(15) }}>
        <ScreenHeader
          {...this.props}
          left
          title={STR_CONST.NOTIFICATION_SETTINGS}
          notifCount={2}
          clickOnLeft={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }


  postHogAnalytics = (body) => {
    if(this.props.isLoggedIn){
      this.props.loggedinUserPostHogFun(body)
    }
    else{
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
              guestUserPostHog["event_name"] = "Turning Phone Number Notification Toggle"
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


            this.props.SMSNotificationToggleAction(this.state.sendSMS);
          }
        );
      } else {
        alert(STRING_CONST.VERIFY_NUMBER);
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
    const {navigation} = this.props

    return (
      <View style={styles.availabilityAlertView}>
        <Text
          style={[
            styles.infoTitle,
            { fontWeight: Platform.OS == "ios" ? "600" : "bold" },
          ]}
        >
          {STR_CONST.AVAILABILITY_ALERTS}
        </Text>


        <View style={styles.availabilityAlertInnerView}>
          <Text style={[styles.notificationTitle, { fontWeight: "600" }]}>
            {STR_CONST.EMAIL_ALERT_NOTIFICATION}
          </Text>
          <View style={styles.flexRowContainer}>
            <Text
              style={[
                styles.onOffText,
                {
                  color: sendEmail ? colours.greyText : colours.lightBlueTheme,
                  marginRight: scale(5),
                },
              ]}
            >
              {STR_CONST.OFF}
            </Text>
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
            <Text
              style={[
                styles.onOffText,
                {
                  color: !sendEmail ? colours.greyText : colours.lightBlueTheme,
                  marginLeft: scale(5),
                },
              ]}
            >
              {STR_CONST.ON}
            </Text>
          </View>
        </View>
        <Text style={[styles.notificationDetail, { fontWeight: "600" }]}>
            {STR_CONST.EMAIL_NOTIFICATION_DETAILS}
          </Text>
        <View style={styles.line} />



        <View style={styles.availabilityAlertInnerView}>
          <Text style={[styles.notificationTitle, { fontWeight: "600" }]}>
            {STR_CONST.SMS_ALERT_NOTIFICATION}
          </Text>
          <View style={styles.flexRowContainer}>
            <Text
              style={[
                styles.onOffText,
                {
                  color: sendSMS ? colours.greyText : colours.lightBlueTheme,
                  marginRight: scale(5),
                },
              ]}
            >
              {STR_CONST.OFF}
            </Text>
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
            <Text
              style={[
                styles.onOffText,
                {
                  color: !sendSMS ? colours.greyText : colours.lightBlueTheme,
                  marginLeft: scale(5),
                },
              ]}
            >
              {STR_CONST.ON}
            </Text>
          </View>
        </View>
        <Text style={[styles.notificationDetail, { fontWeight: "600" }]}>
            {STR_CONST.SMS_NOTIFICATION_DETAILS}
          </Text>


          
        <View style={styles.line} />



        <View style={styles.availabilityAlertInnerView}>
          <Text style={[styles.notificationTitle, { fontWeight: "600" }]}>
            {STR_CONST.PUSH_NOTIFICATION}
          </Text>
          <View style={styles.flexRowContainer}>
            <Text
              style={[
                styles.onOffText,
                {
                  color: sendEmail ? colours.greyText : colours.lightBlueTheme,
                  marginRight: scale(5),
                },
              ]}
            >
              {STR_CONST.OFF}
            </Text>
            <Switch
              value={
                notificationSettings && notificationSettings.push_notification
              }
              onValueChange={async (val) => {
                await this.onNotificationSettingsChange(val);
              }}
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
            <Text
              style={[
                styles.onOffText,
                {
                  color: !sendEmail ? colours.greyText : colours.lightBlueTheme,
                  marginLeft: scale(5),
                },
              ]}
            >
              {STR_CONST.ON}
            </Text>
          </View>
        </View>
        <Text style={[styles.notificationDetail, { fontWeight: "600" }]}>
            {STR_CONST.PUSH_NOTIFICATION_DETAILS}
          </Text>
        <View style={styles.line} />
       
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
              <Image
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
              <Image
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
              <Image
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

  render() {
    return (
      <SafeAreaView style={{ flex: 1,}}>
        <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="always">
          {this.renderHeader()}

          <View style={{ flex: 1,justifyContent:'center',alignItems:'center',alignSelf:'center' }}>
            {this.availabilityAlert()}
            {/* {this.keepInTouchAlert()} */}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}