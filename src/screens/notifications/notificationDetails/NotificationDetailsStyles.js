import { StyleSheet, Dimensions } from "react-native";
import scale, { verticalScale } from "../../../helpers/scale";
import * as CONST from "../../../constants/StringConst";
import { colours } from "../../../constants/ColorConst";
const { width } = Dimensions.get("window");
const circleRadius = scale(1.4);

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.white,
  },

  cellContainer: {
    marginBottom: verticalScale(30),
  },

  notifTitle: {
    fontSize: scale(16),
    lineHeight: scale(19),
    color: colours.darkBlueTheme,
    fontWeight: CONST.BOLD,
    fontFamily: CONST.appFonts.INTER_SEMI_BOLD,
  },
  notifTitel: {
    fontSize: scale(16),
    lineHeight: scale(19),
    color: colours.darkBlueTheme,
    fontWeight: CONST.BOLD,
    fontFamily: CONST.appFonts.INTER_SEMI_BOLD,
    padding:scale(2),
    marginTop:scale(10),marginBottom:scale(5)
  },

  notifDiscription: {
    fontSize: scale(15),
    color: colours.darkBlueTheme,
    fontFamily: CONST.appFonts.INTER_REGULAR,
    marginTop: verticalScale(10),
  },

  notifDate: {
    fontSize: scale(11),
    color: colours.gray,
    fontFamily: CONST.appFonts.INTER_REGULAR,
    marginTop: verticalScale(10),
  },

  line: {
    alignSelf: CONST.STRETCH,
    height: verticalScale(1),
    backgroundColor: colours.darkBlueTheme,
    marginTop: verticalScale(15),
    opacity: 0.1,
  },

  emptyViewContainer: {
    flex: 1,
    alignItems: CONST.CENTER,
    marginTop: verticalScale(150),
  },

  emptyTitle: {
    fontSize: scale(16),
    lineHeight: scale(19),
    color: colours.darkBlueTheme,
    fontFamily: CONST.appFonts.INTER_REGULAR,
  },

  emptyDiscription: {
    fontSize: scale(15),
    lineHeight: scale(20),
    color: colours.darkBlueTheme,
    fontFamily: CONST.appFonts.INTER_REGULAR,
    opacity: 0.6,
    marginHorizontal: scale(50),
    textAlign: CONST.CENTER,
    marginTop: verticalScale(5),
  },

  textOnButton: {
    fontSize: scale(18),
    fontFamily: CONST.appFonts.INTER_BOLD,
    textAlign: CONST.CENTER,
    color: colours.white,
    fontWeight: CONST.BOLD,
    lineHeight: scale(22),
  },
  infoIcon: {
    height: scale(22),
    width: scale(28),
  },
  iconContainer: {
    borderRadius: scale(2),
    marginLeft: scale(2),
    marginRight:-scale(10),
    backgroundColor: colours.white,
    justifyContent: "center",
    alignItems: "center", 
  },
  alertDetailsView: {
    borderWidth: scale(1),
    borderColor: colours.lightBlueTheme,
    marginTop: verticalScale(20),
    borderRadius: scale(6),
    marginBottom: verticalScale(30),
  },
  alertHeadingView: {
    backgroundColor: colours.lightBlueTheme,
    flexDirection: CONST.ROW,
    alignItems:'center',
    justifyContent: CONST.SPACE_BETWEEN,
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
    borderTopLeftRadius:scale(4),
    borderTopRightRadius:scale(4),
    borderWidth:0,
  },
  alertHeadingText: {
    fontFamily: CONST.appFonts.INTER_BOLD,
    fontSize: scale(13),
    color: colours.white,


  },
  alertHeadingText1: {
    fontFamily: CONST.appFonts.INTER_BOLD,
    fontSize: scale(13),
    color: colours.white,
    borderWidth:0,
    paddingLeft:scale(15)
 
  },
  dateRangeText: {
    fontFamily: CONST.appFonts.INTER_SEMI_BOLD,
    fontSize: scale(13),
    color: colours.lightBlueTheme,
  },
  dateRangeValue: {
    fontFamily: CONST.appFonts.INTER_SEMI_BOLD,
    fontSize: scale(12),
    color: colours.darkBlueTheme,
  },
  buttonViewContainer: {
    flexDirection: CONST.ROW,
    justifyContent: CONST.CENTER,
    paddingTop: verticalScale(10),
    marginTop: verticalScale(40),
  },
  buttonStyle: {
    paddingVertical: verticalScale(10),
    borderRadius: verticalScale(11),
    borderWidth: scale(1),
    justifyContent: CONST.CENTER,
    paddingHorizontal: scale(15),
  },
  buttonTextStyle: {
    fontSize: scale(16),
    textAlign: CONST.CENTER,
    fontWeight: CONST.BOLD,
    fontFamily: CONST.appFonts.INTER_BOLD,
  },
  viewCalendarButton:{
    paddingVertical: verticalScale(10),
    borderRadius: verticalScale(11),
    borderWidth: scale(1),
    justifyContent: CONST.CENTER,
    paddingHorizontal: scale(15),
    backgroundColor: colours.lightBlueTheme,
    borderColor: colours.lightBlueTheme,
    width: scale(190),
    marginVertical: verticalScale(15),
    marginHorizontal: verticalScale(20),
  },
  availabilityNoticeView: {
    backgroundColor: colours.lightBlueColor,
    alignItems: CONST.CENTER,
    padding: verticalScale(20),
    marginTop: verticalScale(40),
    alignSelf:CONST.STRETCH,
  },
  availabilityNoticeHeading:{ 
    color: colours.lightBlueTheme, 
    fontSize: scale(14), 
    fontFamily:CONST.appFonts.INTER_SEMI_BOLD  
  },
  delayAlertText: {
    color: colours.lightBlueTheme,
    fontSize: scale(14),
    marginTop: verticalScale(5),
    textAlign: CONST.CENTER,
  },
  infoTextView: {
    flexDirection: CONST.ROW,
    alignItems: CONST.FLEX_START,
    paddingHorizontal: scale(5),
    marginTop: verticalScale(10),
  },
  infoTextStyle: {
    color: colours.darkGreyColor,
    fontSize: scale(14),
    lineHeight: verticalScale(20),
  },
  stepsTobook: {
    color: colours.lightBlueTheme,
    fontSize: scale(14),
    textAlign: CONST.CENTER,
    marginBottom: verticalScale(20),
    fontFamily: CONST.appFonts.INTER_BOLD,
  },
  classView: {
    flexDirection: CONST.ROW,
    flexWrap: "wrap",
    // width: width - 100,
    // borderWidth:1,
    marginBottom: verticalScale(20),
  },
  travelClassInnerView: {
    backgroundColor: colours.lightMilkyBlue,
    borderRadius: verticalScale(5),
    marginLeft: scale(10),
    marginTop: verticalScale(4),
    borderRadius: verticalScale(5),
    flexDirection: CONST.ROW,
    padding: scale(5),
    width:scale(150),
    justifyContent:"flex-start",
    borderWidth:scale(0.2),
    borderColor:"#03B2D8"
    // borderWidth:1,borderColor:"green"
  },
  cabinClasstext: {
    color: colours.darkBlueTheme,
    padding: scale(5),
    fontSize: scale(12),
  },
  travelDateView: {
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(20),
  },
  dateText: {
    fontSize: scale(20),
    color: colours.black,
    textAlign: CONST.CENTER,
    color: colours.darkBlueTheme,
    fontFamily: CONST.appFonts.INTER_BOLD,
  },
  monthText: {
    fontSize: scale(12),
    color: colours.black,
    textAlign:CONST.CENTER,
    color: colours.darkBlueTheme,
  },
  quadrantUpperView: {
    height: scale(20) * circleRadius,
    width: scale(20) * circleRadius,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  quadrantView: {
    position: "absolute",
    height: scale(40) * circleRadius,
    width: scale(40) * circleRadius,
    borderRadius: scale(20) * circleRadius,
    borderWidth: scale(4),
  },
  quadrantVerticalSpaceView: {
    position: "absolute",
    width: scale(4) * circleRadius,
    backgroundColor: colours.white,
    height: scale(40) * circleRadius,
    left: scale(18) * circleRadius,
  },
  quadrantHorizontalSpaceView: {
    position: "absolute",
    top: scale(18) * circleRadius,
    height: scale(4) * circleRadius,
    width: scale(40) * circleRadius,
    backgroundColor: colours.white,
  },
  textView: {
    position: "absolute",
    top: scale(5.5) * circleRadius,
    left: scale(5.2) * circleRadius,
    justifyContent: CONST.CENTER,
    alignItems: CONST.CENTER,
    borderRadius: scale(15) * circleRadius,
    height: scale(29) * circleRadius,
    width: scale(29) * circleRadius,
  },
  halfCircleUpperView: {
    height: scale(40) * circleRadius,
    width: scale(20) * circleRadius,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  halfCircleView: {
    position: "absolute",
    top: 0,
    height: scale(40) * circleRadius,
    width: scale(40) * circleRadius,
    borderRadius: scale(20) * circleRadius,
    borderWidth: scale(4),
  },
  fullCircleUpperView: {
    height: scale(40) * circleRadius,
    width: scale(40) * circleRadius,
    backgroundColor: "transparent",
  },
  fullCircleView: {
    position: "absolute",
    height: scale(40) * circleRadius,
    width: scale(40) * circleRadius,
    borderRadius: scale(20) * circleRadius,
    borderWidth: scale(4),
  },
  threePartCircleContainer:{
    height: scale(22) * circleRadius,
    width: scale(20) * circleRadius,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  threePartTopCircleContainer:{
    position: "absolute",
    top: 0,
    height: scale(40) * circleRadius,
    width: scale(40) * circleRadius,
    borderRadius: scale(20) * circleRadius,
    borderWidth: scale(4),
  },
  threePartBottomCircleContainer:{
    height: scale(17.3) * circleRadius,
    width: scale(40) * circleRadius,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  threePartBottomCircleView:{
    position: "absolute",
    bottom: 0,
    left: 0,
    height: scale(40) * circleRadius,
    width: scale(40) * circleRadius,
    borderRadius: scale(20) * circleRadius,
    borderWidth: scale(4),
    
  },
  threePartWhiteSpaceContainer:{
    position: "absolute",
    left: scale(18) * circleRadius,
    height: scale(3) * circleRadius,
    width: scale(4) * circleRadius,
    backgroundColor: colours.white
  },
  topWhiteSpaceView:{
    position: "absolute",
    height: scale(4) * circleRadius,
    top: scale(22) * circleRadius,
    width: scale(5) * circleRadius,
    backgroundColor: colours.white,
    transform: [{ rotate: "70deg" }],
  },
  leftWhiteSpaceView:{

  },
  rightWhiteSpaceView:{
    position: "absolute",
    height: scale(4) * circleRadius,
    top: scale(22) * circleRadius,
    left: scale(36) * circleRadius,
    width: scale(5) * circleRadius,
    backgroundColor: colours.white,
    transform: [{ rotate: "-70deg" }],
  },
  availableDatesViewSpace:{
     marginRight: scale(12)
  }
});