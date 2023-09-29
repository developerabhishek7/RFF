import { StyleSheet, Dimensions } from "react-native";
import scale, { verticalScale } from "../helpers/scale";
import { colours } from "../constants/ColorConst";
import * as CONST from "../constants/StringConst";
const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
  mainView: {
    backgroundColor: colours.white,
    bottom: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    width: width,
    borderWidth:0
  },
  innerView: {
    margin: scale(20),
    justifyContent: "center",
    alignItems: "center",
  },
  titleView: {
    flexDirection: "row",
    marginTop: 0,
  },

  titleTextStyle:{
    fontFamily: CONST.appFonts.INTER_BOLD,
    fontSize: scale(18),
    color: colours.darkBlueTheme,
    fontWeight: "600",
    marginTop:scale(10),marginBottom:scale(-10)
  },
  titleTextStyle1:{
    fontFamily: CONST.appFonts.INTER_BOLD,
    fontSize: scale(16),
    color: colours.darkBlueTheme,
    fontWeight: "bold",
  },
  messageStyle:{
    fontFamily: CONST.appFonts.INTER_REGULAR,
    fontSize: scale(14),
    color: colours.darkBlueTheme,
    textAlign: "center",
    marginTop: verticalScale(20),
    marginHorizontal: scale(30),
  },
  singleButtonStyle:{
    backgroundColor: colours.lightBlueTheme,
    marginTop: verticalScale(25),
    width: scale(243),
    padding: scale(18),
    borderRadius: verticalScale(11),
    marginBottom: verticalScale(20),
  },

  leftButtonStyle:{
    backgroundColor: colours.white,
    marginTop: verticalScale(25),
    width: scale(160),
    paddingVertical: verticalScale(15),
    borderRadius: verticalScale(11),
    borderWidth: 1,
    borderColor: colours.lightBlueTheme,
  },
  rightButtonStyle:{
    backgroundColor: colours.lightBlueTheme,
    marginTop: verticalScale(25),
    width: scale(160),
    paddingVertical: verticalScale(15),
    borderRadius: 20,
    borderRadius: verticalScale(11),
  },
  leftButtonTextStyle:{
    fontFamily: CONST.appFonts.INTER_BOLD,
    fontSize: scale(16),
    color: colours.lightBlueTheme,
    textAlign: "center",
    fontWeight: "bold",
  },
  rightButtonTextStyle:{
    fontFamily: CONST.appFonts.INTER_BOLD,
    fontSize: scale(16),
    color: colours.white,
    textAlign: "center",
    fontWeight: "bold",
  },
  doubleButtonView:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginBottom: verticalScale(20),
  }
});
