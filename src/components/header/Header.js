/**
 * Date: May 19, 2020
 * Description: Custom Header
 *
 */
import React, { Component, Fragment, useDebugValue } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styles from "./HeaderStyles";
import * as COLOR_CONST from "../../constants/ColorConst";
import * as IMAGE_CONST from "../../constants/ImageConst";
import scale from "../../helpers/scale";
import * as STR_CONST from "../../constants/StringConst";
import { getUserInfo } from "../../actions/userActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FastImage from 'react-native-fast-image'

import {DrawerActions,NavigationContainer} from '@react-navigation/native';
class ScreenHeader extends Component {
  state = {
    badgeCount: this.props.badgeCount,
  };
  _goBack() {
    const { navigation } = this.props;
    navigation.goBack();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.badgeCount !== nextProps.badgeCount) {
      this.props.getUserInfoAction()
      this.setState({
        badgeCount: nextProps.badgeCount,
      });
    }
  }

  _renderLeftIcon() {
    const {  setting } = this.props;
    if (setting) {
      return (
        <TouchableOpacity
          style={styles.menuIcon}
          // onPress={() => 
          //   this.props.navigation.dispatch(DrawerActions.openDrawer())
          // }

          onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}

                
        >
          {IMAGE_CONST.MENU}
        </TouchableOpacity>
      );
    }

    componentDidMount = async () => {

      this.props.getUserInfoAction()
      Alert.alert("YES ON HEADER!")
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
    }
 
     componentWillUnmount =  async() => {
      Alert.alert("YES ON HEADER!!!")
    }
 

    return (
      <TouchableOpacity
        style={styles.backIconCon}
        onPress={() => {
          this.props.clickOnLeft();
        }}
      >
        {IMAGE_CONST.IOS_BACK_ARROW}
      </TouchableOpacity>
    );
  }

  renderCountView() {
    return (
      <View style={styles.countView}>
        <Text style={styles.countText}>{this.state.badgeCount}</Text>
      </View>
    );
  }

  _renderRightIcon() {


    let isLoggedIn = this.props.isLoggedIn;
    const { badgeCount } = this.state;
    return (
      <TouchableOpacity
        disabled={!isLoggedIn}
        style={styles.rightIconCon}
        onPress={() => {
          this.props.clickOnRight();
        }}
      >
        <View>
         {
          isLoggedIn ?
            <Fragment>
              { badgeCount > 0 ? this.renderCountView() : null}
            </Fragment>
          : null
         } 
          <FastImage
            style={styles.backIcon}
            source={
              isLoggedIn
                ? IMAGE_CONST.DARK_NOTIFICATION_BELL_ICON
                : IMAGE_CONST.BELL_IMAGE
            }
          />
        </View>
      </TouchableOpacity>
    );
  }

  filterIcon() {
    let isLoggedIn = this.props.isLoggedIn;
    const { badgeCount } = this.state;
    return (
      <TouchableOpacity
        disabled={!isLoggedIn}
        style={{
          paddingLeft: scale(15),
          alignItems: "center",
        }}
        onPress={() => {
          this.props.clickOnSort();
        }}
      >
        <View>
          <FastImage
            style={styles.backIcon}
            source={
              isLoggedIn ? IMAGE_CONST.SORTING_ICON : IMAGE_CONST.BELL_IMAGE
            }
          />
        </View>
      </TouchableOpacity>
    );
  }

  _renderTitle(title) {
    return (
      <Text
        style={[
          styles.title,
          { color: COLOR_CONST.colours.white, marginLeft: scale(15) },
        ]}
      >
        {title}
      </Text>
    );
  }

  render() {
    // const routeName = this.props.route.params.routeName;
    const userData = this.props.userData;
    const isLoggedIn = this.props.isLoggedIn
  return (
      <View>
        <View
          style={[
            styles.container,
            // { backgroundColor: COLOR_CONST.colours.white },
          ]}
        >
          {this.props.left ? (
            this._renderLeftIcon()
          ) : (
            <View style={[styles.backIconCon, styles.emptyView]} />
          )}
          {this.props.title
            ? this._renderTitle(this.props.title)
            : this._renderTitle("")}
          <View style={{ flexDirection: "row" }}>
            {this.props.showSort ? this.filterIcon() : null}
            {this.props.right ? (
              this._renderRightIcon()
            ) : (
              <View style={styles.emptyRight} />
            )}
          </View>
        </View>
       
        {/* {
          userData && Object.keys(userData).length != 0 && isLoggedIn ?
          <Fragment>
          {STR_CONST.MANAGE_CONTACT_SCREEN && STR_CONST.UPDATE_PROFILE_SCREEN &&
            userData &&
            !userData.email_verified && (
              <TouchableOpacity
                style={styles.bannerView}
                onPress={() => {
                  this.props.navigation.navigate(STR_CONST.MANAGE_CONTACT_SCREEN);
                }}
              >                
                <Text style={styles.bannerText}>
                  {STR_CONST.VERIFY_EMAIL_MESSAGE}
                </Text>
              </TouchableOpacity>
            )}
             </Fragment>
             : null
        }        */}
      </View>      
    );
  }
}

const mapStateToProps = (state) => {
  const { notification, logIn, userInfo } = state;

  return {
    notiifcationSettingsData: notification.notiifcationSettingsData,
    badgeCount: notification.badgeCount,
    isLoggedIn: logIn.isLoggedIn,
    userData: userInfo.userData,
  };
};

// const mapDispatchToProps = (dispatch) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfoAction: () => dispatch(getUserInfo()),

  };
};

ScreenHeader.propTypes = {
  navigation: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenHeader);
