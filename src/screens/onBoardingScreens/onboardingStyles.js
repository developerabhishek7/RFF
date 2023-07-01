import { StyleSheet } from "react-native";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import { appFonts } from "../../constants/StringConst";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headingStyle: {
    fontWeight: "bold",
    fontSize: scale(30),
    color: "#2B3F5E",
    width:scale(200),
    // textAlign: "center",
    fontFamily: appFonts.INTER_REGULAR,
  },
  subtextStyle: {
    fontSize: scale(13),
    color: "#2B3F5E",
    paddingBottom:scale(14),
    width:scale(200),
    marginTop:scale(10),
  
    // marginTop: verticalScale(5),
    fontFamily: appFonts.INTER_SEMI_BOLD,
  },
  subHeadingStyle: {
    fontWeight: "bold",
    fontSize: scale(22),
    color: colours.darkBlueTheme,
    textAlign: "center",
    fontFamily: appFonts.INTER_REGULAR,
  },

  addButtonStyle: {
    backgroundColor: colours.skyBlueColor,
    width: scale(60),
    height: verticalScale(60),
    borderRadius: scale(50),
    marginRight:scale(20),
    marginBottom: verticalScale(30),
  },
  textView: {
    width: width,
    backgroundColor: colours.lightBlueTheme,
    borderTopLeftRadius: scale(40),
    borderTopRightRadius: scale(40),
    paddingTop: verticalScale(20),
    paddingHorizontal: scale(20),
    paddingBottom:verticalScale(10),
    justifyContent:'center',
    height:verticalScale(200),
  },
  navigationButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: verticalScale(20),
  },
  navigationButtonIcon: {
    height: scale(40),
    width: scale(40),
  },
  // onBoardingContainer:{
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   paddingHorizontal: scale(20),
  //   flex: 1,
  // },
  paginationContainerStyle:{
    // backgroundColor: colours.white,
    width: scale(190),
    alignSelf: "center",
    paddingVertical: verticalScale(10),
    height:verticalScale(30),
    marginBottom:scale(30)
  },
  paginationDotStyle:{
    width: scale(10),
    borderRadius: scale(5),
    height: scale(10),
    backgroundColor: colours.darkBlueTheme,
  }
});
