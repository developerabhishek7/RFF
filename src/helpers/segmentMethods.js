// import analytics from "@segment/analytics-react-native";
// import moment from "moment";
// export const trackEventDetails = async (eventName, trackData, userDetails) => {
//   const userId = userDetails?.id;
//   analytics.track(eventName, {
//     ...trackData,
//     userId: userId ? userId : null,
//     timeStamp: moment().format("MMMM Do YYYY, h:mm:ss a"),
//   });
// };

// export const trackIdentifyDetails = (eventName, trackData) => {
//   const userDetails = JSON.parse(retrieveFromLocalStorage("userDetails"));
//   const userId = userDetails?.id;
//   const email = userDetails?.email;
//   analytics.identify(eventName, userId, {
//     ...trackData,
//     userId: userId,
//     email: email,
//     timeStamp: moment().format("MMMM Do YYYY, h:mm:ss a"),
//   });
// };
