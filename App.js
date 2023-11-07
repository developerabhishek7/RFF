import React from 'react';
import Appcontainer from './src/router/ADDNAV';
import 'react-native-gesture-handler'
import { Provider } from "react-redux";
import configureStore from "./src/store/index";
import { AppState, LogBox, View, SafeAreaView, Platform, Dimensions, StatusBar } from "react-native";
import { fcm } from "./src/utils/firebaseHelper";
import 'react-native-get-random-values'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Orientation from "react-native-orientation-locker";
import TransLoader from "./src/components/loader/index";
console.disableYellowBox = true;
import Dropdown from "./src/utils/dropdown";
import { NativeBaseProvider } from 'native-base';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs()
// import crashlytics from "@react-native-firebase/crashlytics";
import PostHog from 'posthog-react-native'
import { colours } from "./src/constants/ColorConst";
import NetInfo from "@react-native-community/netinfo";
import DropdownAlert from "react-native-dropdownalert";
import NoNetworkComponent from './src/screens/noNetwork/NoNetworkComponent';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: configureStore(() => {
        console.log("Store persisted !");
      }),
      networkState: true,
    };
  }

  componentDidMount = async () => {
    StatusBar.setHidden(false);
    console.disableYellowBox = true;
    Orientation.lockToPortrait();
    fcm.setStore(this.state.store);

    NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        this.setState({
          networkState: false
        })
      } else {
        this.setState({
          networkState: true
        })
      }
    });

    await PostHog.setup('phc_eux7zbMA88bDwvpdyQ76VMcoyVPahlnIPlYclrTekKv', {
      // app.posthog.com
      captureApplicationLifecycleEvents: true,
      ios: {
        captureInAppPurchases: true,
        capturePushNotifications: true
      },
      host: 'https://d29t15mip7grca.cloudfront.net',
      captureDeepLinks: true,
      recordScreenViews: true,
      flushInterval: 5,
      flushAt: 1,
    });
  }


  componentWillUnmount() {
    StatusBar.setHidden(false);
  }

  render() {
    return (
      <NativeBaseProvider>
        <View style={{ flex: 1 }}>
          <StatusBar />
          <Provider store={this.state.store}>
            {
              !this.state.networkState &&
              <NoNetworkComponent />
            }
            <Appcontainer />
            <TransLoader />
            <DropdownAlert
              inactiveStatusBarStyle="dark-content"
              inactiveStatusBarBackgroundColor={colours.white}
              translucent={false}
              ref={(ref) => Dropdown.setDropDown(ref)}
              containerStyle={{ backgroundColor: colours.darkBlueTheme }}
              onTap={() => {
                fcm.handleForegroundNotification();
              }}
            />
          </Provider>
        </View>
      </NativeBaseProvider>
    );
  }
}
export default App;

