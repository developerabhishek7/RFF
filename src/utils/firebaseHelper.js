
import messaging, { firebase } from "@react-native-firebase/messaging";
import AsyncStorage from '@react-native-async-storage/async-storage'
import NavigationService from "./NavigationService";

import Dropdown from "./dropdown";
import { SET_BADGE_COUNT } from "../constants/ActionConst";
import { Platform } from "react-native";
import * as RootNavigation from '../router/RouteNavigation';
import {Alert} from 'react-native'
class FcmService {
  constructor() {
    this._initialized = false;
    this._fcmToken = null;
    this._unsubscriptionCallbacks = [];
    this._unsubscribeOnTokenRefresh = null;
    this.currentNotification = null;
    this.messageId = null;
    this.store = null
    this.foreGroundRemoteMessage = {}
  }

  setStore(store){
    this.store = store
  }

  /**
   * General initialization logic. This is called on app startup.
   * It should not perform long remote calls and should finish quickly.
   *
   * @returns {Promise}
   */
  async initAlways() {
    // Prevent double initialization
    // if (this._initialized) {
    //   console.log("in init twice++", )

    //   console.warn('Double initialization of the FcmService')
    //   return Promise.resolve()
    // }
    // this._initialized = true
    await this._requestPermission();

    if (await this._requestPermission()) {
      await messaging().registerDeviceForRemoteMessages();
      const fcmToken = await messaging().getToken();
      console.log("fcmToken++++", fcmToken);
      await AsyncStorage.setItem("Device_Token", fcmToken);
      await AsyncStorage.setItem(
        "NotificationDisbledFromPhone",
        JSON.stringify({ value: false })
      );

      this._registerMessageHandlers();
      this._registerTokenRefresh();
      return true;
    } else {
      return false;
    }
  }

  async deinitializeOnDestroy() {
    await this._unsubscribeFromLoggedOutTopics();
    this._unregisterMessageHandlers();
    this._unregisterTokenRefresh();
    this._initialized = false;
    this._fcmToken = null;
  }

  /**
   * @returns {Promise<boolean>} Return true if permission is granted.
   * @private
   */
  async _requestPermission() {
    const permissionStatus = await messaging().hasPermission();
    if (permissionStatus == 0) {
      await AsyncStorage.setItem(
        "NotificationDisbledFromPhone",
        JSON.stringify({ value: true })
      );
    }
    let result = false;
    if (
      permissionStatus === firebase.messaging.AuthorizationStatus.NOT_DETERMINED
    ) {
      console.log("firebase.messaging.AuthorizationStatus.NOT_DETERMINED");
      try {
        const newStatus = await messaging().requestPermission();
        switch (newStatus) {
          case firebase.messaging.AuthorizationStatus.DENIED:
            Alert.alert("You will not receive push notifications.");
            result = false;
            break;
          case firebase.messaging.AuthorizationStatus.AUTHORIZED:
            {
              console.log(
                "firebase.messaging.AuthorizationStatus.NOT_DETERMINED"
              );
              result = true;
            }
            break;
          case firebase.messaging.AuthorizationStatus.PROVISIONAL:
            Alert.alert("You will receive notifications silently.");
            result = true;
            break;
        }
      } catch (error) {
        console.error("Error while requesting notification permissions", error);
        result = false;
      }
    } else if (
      permissionStatus === firebase.messaging.AuthorizationStatus.AUTHORIZED
    ) {
       result = true;
    }
    return result;
  }

  _registerMessageHandlers() {
    this._unsubscriptionCallbacks.push(
      messaging().onNotificationOpenedApp((remoteMessage) => {
        console.warn(
          "*** Notification caused app to open from background state:",
          remoteMessage.notification
        );
      })
    );

    // Invokes when the app is in foreground.
    this._unsubscriptionCallbacks.push(
      messaging().onNotificationOpenedApp((remoteMessage) => {
        console.warn(
          "*** Notification caused app to open from background state:",
          remoteMessage.notification
        );
      })
    );

    // Invokes when the app is in foreground.
    this._unsubscriptionCallbacks.push(
      messaging().onMessage((remoteMessage) => {
       this.foreGroundRemoteMessage = remoteMessage
        let isAndroid = Platform.OS == "android"
      if (this.messageId !== remoteMessage.data.notification_id) {
        if(isAndroid){
        Dropdown.getDropDown().alertWithType(
          "Custom",
          `${remoteMessage.notification.title}`
        );}else{
          Dropdown.getDropDown().alertWithType(
            "Custom",
            `${remoteMessage.notification.title}`,
          )
        }
      } 
      this.messageId = remoteMessage.data.notification_id;
        this.store.dispatch({
          type: SET_BADGE_COUNT,
          badgeCount: remoteMessage.data.badge,
        });

        // Handle in app notifications
        // this.handleNotification(remoteMessage)
      }
      )
    );

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.warn("*** Message handled in the background!", remoteMessage);
      // this.handleNotification(remoteMessage);
    });

    // Check whether an initial notification is available
    const getInitialNotification = messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.warn(
            "*** Notification caused app to open from quit state:",
            remoteMessage.notification
          );
          this.handleNotification(remoteMessage);
          // this.removeOldNotificationFromCenter()
        }
      });
  }

  handleForegroundNotification() {
  this.handleNotification(this.foreGroundRemoteMessage)
}

  handleNotification(remoteMessage) {
    console.log("remoteMessage++++ - - - - - - - -  - - --", remoteMessage);
    let isAndroid = Platform.OS == "android"
    console.log("*** Notification on message",Platform.OS, remoteMessage,isAndroid );

    let notifData = {
      id: remoteMessage.data.notification_id,
      title: Platform.OS === 'android' ? remoteMessage.notification.title : remoteMessage.notification.title,
      message: Platform.OS === 'android' ? remoteMessage.notification.body : remoteMessage.notification.body,
      unread: false,
      created_at: Platform.OS === 'android' ?  remoteMessage.sentTime : new Date().getTime(),
    };
    RootNavigation.navigationRef.navigate("NotificationDetailScreen", {
      notifData,
      notification_id: remoteMessage.data.notification_id,
    })
  }

  /**
   * @private
   */

  //   removeOldNotificationFromCenter () {
  //     Notifications.removeAllDeliveredNotifications()
  //   }

  _unregisterMessageHandlers() {
    this._unsubscriptionCallbacks.forEach((callback) => callback && callback());
    this._unsubscriptionCallbacks = [];
  }

  _registerTokenRefresh() {
    if (this._unsubscribeOnTokenRefresh) return;

    this._unsubscribeOnTokenRefresh = messaging().onTokenRefresh(
      async (newToken) => {
        console.warn("FCM token got refreshed", newToken);
        await AsyncStorage.setItem("Device_Token", newToken);
      }
    );
  }

  _unregisterTokenRefresh() {
    if (this._unsubscribeOnTokenRefresh) {
      this._unsubscribeOnTokenRefresh();
      this._unsubscribeOnTokenRefresh = null;
    }
  }

  async _saveFCMToken(fcmToken) {
    this._fcmToken = fcmToken;
    // I don't see a need to persist the token in the local storage. Let's retrieve it from FCM on every startup for now
    // await AsyncStorage.setItem(FCM_TOKEN_KEY, fcmToken)
  }

  async getFCMToken() {
    return this._fcmToken;
    // return AsyncStorage.getItem(FCM_TOKEN_KEY)
  }

  getCurrentNotification() {
    return this.currentNotification;
  }

  removeCurrentNotification() {
    this.currentNotification = null;
  }
}

export const fcm = new FcmService();