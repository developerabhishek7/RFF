import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
  BackHandler
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import FastImage from 'react-native-fast-image'
import ScreenHeader from "../../components/header/Header";
import * as IMAGE_CONST from "../../constants/ImageConst";
import * as STRING_CONST from "../../constants/StringConst";
import scale, { verticalScale } from "../../helpers/scale";
import styles from "./ProfileScreenStyles";
import * as STR_CONST from "../../constants/StringConst";
import { colours } from "../../constants/ColorConst";
import { Platform } from "react-native";

export default class ProfileScreenComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airlineSelected: this.props.userData.airline_memberships ? this.props.userData.airline_memberships[0].airline : this.props.airLinesMembershipDetailsObject[0],
      tierSelected: this.props.userData.airline_memberships ? this.props.userData.airline_memberships[0].membership : this.props.airLinesMembershipDetailsObject[0].memberships[0],
      socialLogin: false,
      emailId: this.props.userData.email
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

  async componentDidMount() {
    const { navigation, userData } = this.props;
    console.log("yes check here on the profile did update ####### ", this.state.emailId)
    let socialLogin = await AsyncStorage.getItem("socialLogin")
    this.setState({
      socialLogin: socialLogin
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

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.userData !== prevProps.userData) {
        this.setState({
          airlineSelected: this.props.userData.airline_memberships ? this.props.userData.airline_memberships[0].airline : this.props.airLinesMembershipDetailsObject[0],
          tierSelected: this.props.userData.airline_memberships ? this.props.userData.airline_memberships[0].membership : this.props.airLinesMembershipDetailsObject[0].memberships[0]
        })
      }
    }
  }

  goToNotifications() {
    const { navigation } = this.props;
    navigation.navigate(STRING_CONST.NOTIFICATIONS_SCREEN, {
      fromAlertScreen: false,
    });
  }

  // renderHeader() {
  //   return (
  //     <View style={{ marginHorizontal: scale(15) }}>
  //       <ScreenHeader
  //         {...this.props}
  //         left
  //         setting
  //         title={STRING_CONST.PROFILE_SCREEN_TITLE}
  //         right
  //         notifCount={2}
  //         clickOnRight={() => this.goToNotifications()}
  //       />
  //     </View>
  //   );
  // }


  renderHeader() {
    return (
      <View style={{ alignItems: "center", backgroundColor: "#03B2D8", height: scale(200), width: "100%", marginTop: Platform.OS == "android" ? scale(-20) : scale(-60), borderBottomLeftRadius: scale(30), borderBottomRightRadius: scale(30), marginBottom: scale(20) }}>
        <View style={{ marginTop: scale(40) }}>
          <ScreenHeader
            {...this.props}
            left
            setting
            title={STRING_CONST.PROFILE_SCREEN_TITLE}
            right
            notifCount={2}
            clickOnRight={() => this.goToNotifications()}
          />
        </View>
      </View>
    )
  }


  showAlert1() {
    Alert.alert(
      'Account Delete',
      'Are you sure you want to delete your account ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.props.deleteUserAccountAction(this.state.emailId) },
      ]
    );
  }
  renderListItem(itemObject, index) {
    return (
      <TouchableOpacity
        style={styles.profileOption}
        onPress={() => {
          if (itemObject.navigationScreen == STRING_CONST.AIRLINE_MEMBERSHIP_SCREEN) {
            this.props.navigation.navigate(itemObject.navigationScreen, {
              airLinesMembershipDetailsObject: this.props
                .airLinesMembershipDetailsObject,
              onMembershipSelected: (airlineSelected, tierSelected) => {
                this.setState({
                  airlineSelected: airlineSelected,
                  tierSelected: tierSelected,
                });
                var userInfo = {};
                userInfo["airline_name"] = airlineSelected.airline.replace(" ", "_").toLowerCase();
                userInfo["membership_type"] = tierSelected.value;
                userInfo["airline_code"] = "BA";
                this.props.updateAirlineTierAction(userInfo)

                // this.props.updateUserDataAction(userInfo);
              },
              airlineSelected: this.state.airlineSelected,
              tierSelected: this.state.tierSelected
            });
          }
          else if (itemObject.text == "Delete Your \nAccount" || itemObject.text ==  "Delete Account") {
            this.showAlert1()
            // this.props.deleteUserAccountAction(this.state.emailId)
            // Alert.alert("Account deleted successfully!")
          }
          else {
            this.props.navigation.navigate(itemObject.navigationScreen);
          }
        }}
      >
        <Image source={itemObject.icon} style={{ height: scale(50), width: scale(50) }} resizeMode="contain" />
        <Text style={styles.profileOptionText}>{itemObject.text}</Text>
      </TouchableOpacity>
    );
  }


  renderProfileOptions() {
    const { socialLogin } = this.state;
    const { userData } = this.props
    return (
      <FlatList
        style={{
          flex: 1,
        }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        keyboardShouldPersistTaps="always"
        data={socialLogin ? STR_CONST.profileScreenOptions1 : userData.buildVersion == 0 ? STR_CONST.profileScreenOptions : STR_CONST.profileScreenOptions3}
        renderItem={({ item, index }) => {
          return this.renderListItem(item, index);
        }}
        numColumns={2}
      />
    );
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {this.renderHeader()}
        <ScrollView style={{
          flex: 1, marginTop: scale(-100)
        }} keyboardShouldPersistTaps="always">
          <View style={{
            paddingLeft: scale(20),
            paddingRight: scale(20), overflow: 'visible'
          }}>
            {this.renderProfileOptions()}
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: scale(30) }}>
            <Text style={{ fontFamily: STRING_CONST.appFonts.INTER_SEMI_BOLD, fontWeight: Platform.OS === "android" ? "700" : "100", color: colours.darkBlueTheme }}>App version : 0.1.6</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
