import React from 'react';
import Appcontainer from './src/router/ADDNAV';
import 'react-native-gesture-handler'
import { Provider } from "react-redux";
import configureStore from "./src/store/index";
import { AppState, View, SafeAreaView,Platform,Dimensions ,StatusBar } from "react-native";
import { fcm } from "./src/utils/firebaseHelper";
import 'react-native-get-random-values'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Orientation from "react-native-orientation-locker";
import TransLoader from "./src/components/loader/index";
console.disableYellowBox = true;
import PostHog from 'posthog-react-native'
import { NativeBaseProvider } from 'native-base';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      store: configureStore(() => {
        console.log("Store persisted !");
      }),
    };
  }


   componentDidMount = async() => {
    console.disableYellowBox = true;
    // crashlytics().log("App mounted.-------------");
    // this.logCrashlytics()
    Orientation.lockToPortrait();
    fcm.setStore(this.state.store);
    PostHog.initAsync('phc_eux7zbMA88bDwvpdyQ76VMcoyVPahlnIPlYclrTekKv',{
      host:'https://d29t15mip7grca.cloudfront.net',      
    })
    //  PostHog.setup('phc_eux7zbMA88bDwvpdyQ76VMcoyVPahlnIPlYclrTekKv', {
    //   // app.posthog.com
    //   captureApplicationLifecycleEvents: true,
    //   ios:{
    //     captureInAppPurchases:true,
    //     capturePushNotifications:true
    //   },
    //   host:'https://d29t15mip7grca.cloudfront.net',
    //   captureDeepLinks: true,
    //   recordScreenViews: true,
    //   flushInterval: 5,
    //   flushAt: 1,
    // });


  }

  //  logCrashlytics = async () => {
  //   crashlytics().log("Dummy Details Added");
  //   await Promise.all([
  //     crashlytics().setUserId("101"),
  //     crashlytics().setAttribute("credits", String(50)),
  //     crashlytics().setAttributes({
  //       email: "aboutreact11@gmail.com",
  //       username: "aboutreact11",
  //     }),
  //   ]);
  // };

  //  logCrash = async (user) => {
  //   crashlytics().crash();
  // };

  //  logError = async (user) => {
  //   crashlytics().log("Updating user count.");
  //   try {
  //     if (users) {
  //       // An empty array is truthy, but not actually true.
  //       // Therefore the array was never initialised.
  //       setUserCounts(userCounts.push(users.length));
  //     }
  //   } catch (error) {
  //     crashlytics().recordError(error);
  //     console.log(error);
  //   }
  // };

  _handleAppStateChange = async (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      await fcm.initAlways();
    }
    this.setState({ appState: nextAppState });
  };

  // componentWillUnmount() {
  //   AppState.removeEventListener("change", this._handleAppStateChange);
  // }



  render() {
    return (
      <NativeBaseProvider>
      <View style={{ flex:1}}>
        <Provider store={this.state.store}>
            <Appcontainer />
               <TransLoader />
        </Provider>
    </View>
    </NativeBaseProvider>
    );
  }
}
export default App;


