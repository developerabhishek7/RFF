import React from "react";
import {
  ActivityIndicator,
  StatusBar,
  View,
  StyleSheet,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'

import PropTypes from "prop-types";
import SplashScreen from 'react-native-splash-screen'
import {fcm} from '../../utils/firebaseHelper';
import { colours } from "../../constants/ColorConst";
import {getStoreData} from '../../constants/DataConst'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.black,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToCorrectScreen();
  }

  navigateToCorrectScreen = async () => {
    const { navigation } = this.props;
    const authorizationHeader = await getStoreData("authorizationHeader")
    const navigateToLogin = await getStoreData("navigateToLogin") 
    navigation.navigate(authorizationHeader ? "FindFlightContainerScreen" : navigateToLogin ?  "SignIn" :"Onboard");
    SplashScreen.hide();
    await fcm.initAlways()
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />
          <ActivityIndicator />
      </View>
    );
  }
}

LoadingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
