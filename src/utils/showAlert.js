import { Alert } from "react-native";

let isAlertShowing = false;

export default function showOkCancelAlert(
  title,
  msg,
  okButtonText,
  okCallBack,
  cancelButtonText,
  cancelCallBack
) {
  Alert.alert(
    title || "ALERT",
    msg || "",
    [
      {
        text: okButtonText || "OK",
        onPress: () => (okCallBack ? okCallBack() : {})
      },
      {
        text: cancelButtonText || "Cancel",
        onPress: () => (cancelCallBack ? cancelCallBack() : {}),
        style: "cancel"
      }
    ],
    { cancelable: false }
  );
}

/**
 * ### Error Alert
 */
export function showOkAlert(message, title, okCallBack) {
  if (!isAlertShowing) {
    isAlertShowing = true;
    Alert.alert(title || "Alert", message, [
      {
        text: "Ok",
        onPress: () => {
          isAlertShowing = false;
          okCallBack ? okCallBack() : {};
        }
      }
    ]);
  }
}
