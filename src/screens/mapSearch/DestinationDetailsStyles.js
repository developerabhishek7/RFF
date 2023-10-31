import { StyleSheet } from "react-native";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import * as CONST from "../../constants/StringConst";
import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");
import { appFonts } from "../../constants/StringConst";
import { Platform } from "react-native";
const circleRadius = scale(1.3);
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colours.white,
    },
    infoIcon: {
        height: scale(28),
        width: scale(28)
    },
    infoIcon1: {
        height: scale(20),
        width: scale(20),marginStart:scale(10)
    },
    outerViewStyle: {
        paddingHorizontal: verticalScale(16),
        flex: 1,
        backgroundColor: colours.white,
    },
    buttonStyleMap: {
        flexDirection: "row",
        width: scale(301),
        borderRadius: verticalScale(11),
        alignItems: "center",
        padding: verticalScale(13),
        alignSelf: "center",
        justifyContent: "center",
        height: verticalScale(60),
    },
    buttonTextStyle: {
        marginLeft: scale(10),
        color: colours.white,
        fontSize: scale(16),
        fontWeight: "600",
    },
    headerView: {
        backgroundColor:"#3ab2d8",height:Platform.OS == "android" ? scale(100) : scale(120),width:scale(380),
        marginTop:Platform.OS == "ios" ? scale(-60) :scale(-20),
        borderBottomLeftRadius:scale(30),borderBottomRightRadius:scale(30)
    },
    headerCity: { fontSize: scale(20), paddingStart: scale(15), fontFamily: appFonts.INTER_BOLD, textAlign: 'center', color: "#FFF",fontWeight:"600" },
    headerCountry: { fontSize: scale(14), padding: scale(1), paddingTop: scale(6), fontFamily: appFonts.INTER_REGULAR, paddingStart: scale(10), textAlign: 'center', color: "#FFF",fontWeight:"700" },
    airportName: { fontSize: scale(15), padding: scale(2),paddingStart:scale(1), marginTop:scale(4), fontFamily: appFonts.INTER_REGULAR, marginStart: scale(56), textAlign: 'left', color: "#FFF",fontWeight:"500",marginTop:scale(-3),},
    peakFairMainView: { 
      marginBottom:scale(0),alignSelf:"center",borderWidth:0,
      flexDirection: "row", justifyContent: "space-around", alignItems: 'center',
    backgroundColor:"#FFF"
  },
    peakFairSubHeaderView: { flexDirection: "row", justifyContent: 'center', alignItems: 'center',
    // padding:scale(1),paddingStart:scale(5),paddingEnd:scale(5),
    borderWidth:0,
    backgroundColor:"#FFF",
    borderTopLeftRadius:scale(10),
    borderTopRightRadius:scale(10)
  },
    peakFairImg: { height: scale(60), width: scale(60), margin: scale(1), justifyContent: 'center', alignItems: 'center' },
    peakFairTxt: { fontSize: scale(15), padding: scale(1), marginRight:scale(7),paddingTop: scale(2), fontFamily: appFonts.INTER_SEMI_BOLD, textAlign: 'left', color: "#132C52" },
    showClassDataView: { flexDirection: "row", justifyContent: "space-around", width: "96%", marginStart: scale(10), marginEnd: scale(10), marginTop: scale(10), marginBottom: -scale(7) },
    outboundMainView: { flexDirection: "column",borderWidth:0,flexWrap:"wrap"},
    outboundbgImg: { height: scale(50), width: scale(60), justifyContent: 'center', alignItems: 'center',padding:scale(2), },
    outBoundTxt: { fontSize: scale(13), width: scale(21), height: scale(21), textAlign: 'center', color: "#132C52", fontFamily: appFonts.INTER_SEMI_BOLD, padding: scale(2),paddingRight:scale(3) },
    offpeakbg:{
      backgroundColor: "#B5D8EC", borderRadius: scale(60),
      height:scale(37)
      ,width:scale(37),
      margin:scale(2),
      justifyContent:'center',
      alignItems:'center'
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
        width: width - 100,
        marginBottom: verticalScale(20),
      },
      travelClassInnerView: {
        backgroundColor: colours.lightMilkyBlue,
        borderRadius: verticalScale(5),
        marginLeft: scale(10),
        marginTop: verticalScale(3),
        borderRadius: verticalScale(5),
        flexDirection: CONST.ROW,
        padding: scale(5),
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
        fontSize:Platform.OS==="ios" ? scale(14) : scale(12),
        color: colours.black,
        textAlign: CONST.CENTER,
        color: colours.darkBlueTheme,
        // marginRight:scale(3),
        marginTop:scale(3),
        fontFamily: CONST.appFonts.INTER_BOLD,
        fontWeight:"700"
      },
      monthText: {
        fontSize:Platform.OS==="ios" ? scale(12) : scale(10),
        color: colours.black,
        textAlign:CONST.CENTER,
        // marginRight:scale(2),
        marginBottom:scale(6),
        marginTop:-scale(2),
        color: colours.darkBlueTheme,
        fontFamily: CONST.appFonts.INTER_BOLD,
        fontWeight:"900"
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





