import { Platform, StyleSheet } from "react-native";
import scale, { verticalScale } from "../../helpers/scale";
import * as CONST from "../../constants/StringConst";
import { colours } from "../../constants/ColorConst";
import * as STRING_CONST from "../../constants/StringConst";
import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.white,
  },
  subContainer: {
    backgroundColor: "#FFF",
    flex: 1
  },
  scrollViewStyle:{
    flex: 1,
  },
  calendarList: {
    backgroundColor:"#E4E4E4",
    marginBottom:scale(35),
  },
  listFooter:{
    height: verticalScale(70),
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor:"#03B2D8",
    paddingHorizontal: verticalScale(20),
    padding:scale(4),
    height:Platform.OS == "ios" ? scale(110) : scale(80),
    borderBottomColor:"#03B2D8",
    marginTop:Platform.OS == "ios" ? scale(-60) : scale(-5),
    paddingTop:Platform.OS == "ios" ? scale(35) : scale(1),
    borderBottomLeftRadius:scale(20),borderBottomRightRadius:scale(20)
  },
  cellContainer: {
    width:"90%",
    alignSelf:"center",
    marginVertical: verticalScale(10),
    borderWidth: scale(1),
    borderColor:"#3db5db",
    borderRadius:scale(4),
    paddingHorizontal:scale(15),
    paddingVertical:verticalScale(10),
    borderStyle:"dashed",
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  flightDetailText: {
    color: "#505050",
    fontFamily: STRING_CONST.appFonts.INTER_SEMI_BOLD,
    fontSize: scale(12),
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
    // alignSelf: CONST.STRETCH,
    // height: verticalScale(1),
    // backgroundColor: colours.darkBlueTheme,
    // marginTop: verticalScale(15),
    // opacity: 0.1,
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
  classButton: {
    backgroundColor: colours.offWhite,
    marginRight: scale(7),
    borderRadius: scale(5),
    padding:scale(3),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(5),
    paddingVertical: verticalScale(5),
    borderWidth:scale(0.3),
    borderColor:"#03B2D8",
    // marginStart:scale(10),marginEnd:scale(10)
  },
  classTextStyle: {
    fontSize: scale(10.4),
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    marginHorizontal: scale(2),
    marginVertical: verticalScale(3.5),
    color: colours.darkBlueTheme,
  },
  createAlertContainer: {
    paddingHorizontal: verticalScale(16),
    flex: 1,
    backgroundColor: colours.white,
    // marginTop:scale(30)
  },
  calendarContainer: {
     alignItems: "center" ,
     
    },
  buttonTextStyle: {
    marginLeft: scale(10),
    color: colours.white,
    fontFamily: STRING_CONST.appFonts.INTER_BOLD,
    fontSize: scale(16),
    fontWeight: "bold",
  },
  headingContainerStyle: {
    flexDirection: "row",
    marginTop: verticalScale(28),
    justifyContent: "center",
    alignItems: "center",
  },
  headingTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_BOLD,
    fontSize: scale(14),
    color: colours.darkBlueTheme,
    fontWeight: "bold",
  },
  borderView: {
    flexDirection: "row",
    marginTop: verticalScale(13),
    justifyContent: "center",
    alignItems: "center",
  },
  greyBorderStyle: {
    borderWidth: 0.5,
    borderColor: colours.greyBorderColor,
    width: width / 3 - 20,
  },
  darkBorderStyle: {
    borderWidth: 1,
    borderColor: colours.lightBlueTheme,
    width: width / 3 + 10,
  },

  animatedView: {
    position: "absolute",
    bottom: -scale(50),
    left: -2,
    right: -2,
    backgroundColor: colours.white,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
  
    // borderTopColor:"#304668",
    // borderTopWidth:scale(1),

    borderWidth:1,
    elevation:1,borderColor:"#EFEFEF",
    // width:scale(340),
    shadowOffset: {width: -2, height: 4},  
    shadowColor: '#171717',  
    shadowOpacity: 0.2,  
    shadowRadius: 3, 
  
  },
  detailLocationText:{
    width: width - scale(30),
    paddingHorizontal: verticalScale(10),
    color: "#132C52",
    fontFamily: STRING_CONST.appFonts.INTER_BOLD,
    fontSize: scale(18),
    fontWeight: "bold",
    marginTop: scale(10),
  },
  timingContainer: {
    marginRight: scale(10),
    marginVertical: verticalScale(10),
    borderRadius:scale(4),
    flexDirection:'row',
    justifyContent:'space-between',
    alignSelf:"flex-start",
    marginStart:scale(17)
  },
  animatedView1: {
    position: "absolute",
    bottom: -scale(2),
    left: -scale(2),
    right: -scale(2),
    backgroundColor: colours.darkBlueTheme,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    paddingTop:verticalScale(15),
    zIndex: 5,    
  },
  animatedView2: {
    position: "absolute",
    bottom: -scale(20),
    left: -scale(20),
    right: -scale(20),
    backgroundColor: 'transparent',
    backgroundColor: colours.white,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    paddingTop:verticalScale(7),
    zIndex: 5,    
    borderWidth:scale(2),
    elevation:1,
    borderColor:"#EFEFEF",
    shadowOffset: {width: -2, height: 4},  
    shadowColor: '#171717',  
    shadowOpacity: 0.2,  
    shadowRadius: 3, 

 
  },
  titleTextStyle:{
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
    backgroundColor: colours.white,
    marginTop: verticalScale(25),
    width: scale(147),
    paddingVertical: verticalScale(15),
    borderRadius: verticalScale(11),
    borderWidth: 1,
    borderColor: colours.lightBlueTheme,
  },
  rightButtonTextStyle:{
    fontFamily: CONST.appFonts.INTER_BOLD,
    fontSize: scale(16),
    color: colours.lightBlueTheme,
    textAlign: "center",
    fontWeight: "bold",
    paddingStart:scale(5),
    paddingEnd:scale(5),
  },
  animatedInnerView: {
    marginTop: verticalScale(10),
    alignItems: "center",
    marginHorizontal: scale(10),
    borderWidth:0,
  },
  titleView: {
    flexDirection: "row",
    marginTop: 0,
  },
  titleView: {
    flexDirection: "row",
    marginHorizontal: scale(10),
    alignSelf: "stretch",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    fontFamily: STRING_CONST.appFonts.INTER_SEMI_BOLD,
    fontSize: scale(15),
    fontWeight:"700",
  },
  titleText1: {
    fontFamily: STRING_CONST.appFonts.INTER_SEMI_BOLD,
    fontSize: scale(15),
    fontWeight:"700",
    color:"#132C52",
  },
  classText: {
    fontFamily: STRING_CONST.appFonts.INTER_SEMI_BOLD,
    fontSize: scale(14),
    marginTop: verticalScale(5),
  },
  createAlertModalContainer: {
    backgroundColor: colours.white,
    bottom: 0,
    borderTopRightRadius: scale(30),
    borderTopLeftRadius: scale(30),
    width: width,
  },
  createAlertText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
  },
  monthText: {
    color: colours.lightBlueTheme,
    fontWeight: "bold",
    fontSize: scale(14),
    // zIndex: 99,
    opacity: 1,
  },
  header: {
    backgroundColor: colours.headerColor, // set the backgroundColor for header
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: scale(7),
    borderTopRightRadius: scale(7),
    height: verticalScale(39),
    marginLeft: scale(-15),
    marginRight: scale(-15),
  },
  calendarStyle: {
    // borderWidth: scale(1),
    // // marginBottom: verticalScale(-40),
    // borderRadius: verticalScale(10),
    // borderColor: colours.greenColor,
    // borderWidth:1,
    // height:scale(200),
    // // borderColor:"green",
    // alignSelf:"center",
    // // margin:scale(10),
    backgroundColor:"#E4E4E4",
 
    flex:1,
    borderRadius:scale(10),
    margin:scale(10),
  },

  calendarContainer: {
    flex: 1, 
    alignItems: "center" ,
    marginTop: verticalScale(10),
    paddingHorizontal: scale(16),
    backgroundColor: colours.offWhite,
    paddingBottom:scale(20),
    // borderWidth:1
  },
  fareViewContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: verticalScale(10),
    marginTop:scale(7),
    paddingHorizontal: verticalScale(16),
  },
  fareViewButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(6),
    borderRadius: scale(45),
    borderWidth: scale(1),
    borderColor: colours.greyHighlightColor,
  },
  peakImageStyle: {
    height: scale(16),
    width: scale(16),
  },
  mainView: {
    backgroundColor: colours.white,
    bottom: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    width: width,
    borderWidth:scale(1),
    borderColor:colours.lightBlueCalendarBackground
  },

  mainView1: {
    flex:1,
    backgroundColor: colours.white,
    position:"absolute",
    right:scale(-1),
    left:scale(-1),
    bottom: -scale(1),
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    width: width,
    borderWidth:scale(1),
    borderColor:colours.lightBlueCalendarBackground
  },
  innerView: {
    margin: scale(20),
    justifyContent: "center",
    alignItems: "center",
  },
  tripTypeView: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    marginHorizontal: scale(10),
    paddingVertical: verticalScale(3),
    alignItems: "center",
    justifyContent: "center",
  },
  singleTabView: {
    flexDirection: "row",
    borderBottomColor: colours.lightBlueTheme,
    borderBottomWidth: 1,
    marginHorizontal: scale(110),
    paddingVertical: verticalScale(3),
    alignItems: "center",
    justifyContent: "center",
  },
  ticketDetailView: {
    flexDirection: "row",
    marginTop: verticalScale(5),
    marginLeft: scale(10),
  },
  ticketDetailText: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontSize: scale(13),
    color: "#FFF",
  },
  locationText: {
    width: width - scale(30),
    paddingHorizontal: verticalScale(10),
    color: "#FFF",
    fontFamily: STRING_CONST.appFonts.INTER_BOLD,
    fontSize: scale(17),
    fontWeight: "bold",
  },
  locationView: {
    marginLeft: scale(10),
    flexDirection: "row",
    marginHorizontal: scale(10),
    marginTop:scale(10)
  },
  ticketClassView: {
    flexDirection: "row",
    marginTop: verticalScale(17),
    paddingHorizontal: scale(16),
    borderWidth:1,
    borderColor:"#FFF",
    margin:scale(10),
    // paddingTop:scale(-20)
  },
  submitAlertView: {
    flexDirection: "row",
    marginTop: verticalScale(20),
    backgroundColor: colours.lightBlueTheme,
    width: scale(243),
    borderRadius: verticalScale(11),
    alignItems: "center",
    padding: verticalScale(13),
    paddingVertical: verticalScale(10),
    alignSelf: "center",
    justifyContent: "center",
  },

  submitAlertView1: {
    flexDirection: "row",
    marginTop: verticalScale(20),
    backgroundColor: colours.lightBlueTheme,
    width: scale(320),
    borderRadius: verticalScale(10),
    alignItems: "center",
    padding: verticalScale(10),
    paddingVertical: verticalScale(10),
    alignSelf: "center",
    justifyContent: "center",
  },

  dateTextHeading: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontSize: scale(15),
    color: "#919293",
    // marginTop:scale(25)
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(20),
  },
  dateText: {
    fontFamily: STRING_CONST.appFonts.INTER_BOLD,
    fontSize: scale(14),
    color: "#132C52",
    marginTop: verticalScale(2),
    marginBottom:scale(4),
    fontWeight: "600",
  },
  errorView: {
    borderWidth: 0.5,
    borderColor: colours.borderBottomLineColor,
    // marginTop:scale(-6),
    // marginVertical: verticalScale(5),
    alignSelf:"center",marginStart:scale(10),
    // marginHorizontal: scale(50),
    width:scale(320)
  },
  createAlertInnerContainer: {
    marginTop: verticalScale(-10),
    // backgroundColor: colours.dimLightBlueBackgroundColor,
    paddingVertical: verticalScale(17),
    borderRadius: verticalScale(10),
  },
  availabiltyView: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-evenly",
    paddingBottom: verticalScale(1),
    // borderWidth:1,borderColor:"red",
    marginTop:scale(-10)
  },
  seatNumberText: {
    color: "#5b5b5b",
    marginTop: verticalScale(18),
    fontSize: scale(12),
    fontWeight:"700",
    fontFamily:STRING_CONST.appFonts.INTER_SEMI_BOLD
  },
  seatNumberText1: {
    color: "#3ab2d8",
    fontSize: scale(14),
    padding:scale(3),
    marginTop:-scale(20),
    marginBottom:scale(0),
    fontFamily:STRING_CONST.appFonts.INTER_SEMI_BOLD
  },

  seatNumberText3:{
    color: "#41454b",
    fontSize: scale(14),
    fontWeight:"600",
    fontFamily:STRING_CONST.appFonts.INTER_SEMI_BOLD
  },
  createCalendarHeader: {
    alignSelf: "flex-end",
    paddingVertical: verticalScale(10),
    paddingHorizontal: verticalScale(15),
  },
  alertCalendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopLeftRadius: scale(8),
    borderTopRightRadius: scale(8),
    height: verticalScale(39),
    borderBottomWidth: scale(1),
    borderBottomColor: colours.calendarBorderColor,
  },
  alertCalendarMonthText: {
    color: colours.lightBlueTheme,
    fontWeight: "600",
    fontSize: scale(16),
    zIndex: 99,
    opacity: 1,
  },
  peakText: {
    color: colours.darkGreyTextColor,
    fontSize: scale(12),
    marginRight: scale(10),
  },
  pointSeatsText: {
    color: "#464748",
    fontSize: scale(13),
    fontWeight:"500",
    fontFamily:STRING_CONST.appFonts.INTER_SEMI_BOLD
  },
  takeOffIcon: {
    marginRight: scale(7),
    height: scale(14),
    width: scale(14),
  },
  errorTextStyle: {
    color: colours.redColor,
    marginLeft: scale(50),
    fontSize: scale(12),
  },
  bellIconStyle: {
    height: scale(17),
    width: scale(17),
  },
  buttonStyle: {
    flexDirection: "row",
    marginTop: verticalScale(20),
    position: "absolute",
    backgroundColor: colours.lightBlueTheme,
    width: scale(243),
    borderRadius: verticalScale(11),
    alignItems: "center",
    padding: verticalScale(13),
    bottom: verticalScale(20),
    alignSelf: "center",
    justifyContent: "center",
  },
  createAlertTakeOffIcon: {
    marginRight: scale(7),
    height: scale(19),
    width: scale(18),
  },
  checkOnAirlineView: {
    alignSelf: "center",
    alignItems: "center",
    width: scale(300),
    marginBottom: verticalScale(50),
    marginTop: verticalScale(5),
  },
  baModelContainer:{

  },
  checkOnAirlineButton: {
    backgroundColor: colours.lightBlueTheme,
    alignSelf: "center",
    padding: scale(12),
    borderRadius: scale(5),
    flexDirection: "row",
    alignItems: "center",
    width:scale(337),
    justifyContent:'center',
    marginBottom:scale(10),
    // marginTop:scale(15)
  },classTxt:{
    padding:scale(0),
    fontSize:scale(14),
    fontWeight:"700",
    margin:scale(3),
    textAlign:'center',
    paddingBottom:scale(4),
    paddingTop:scale(1),
},
  checkOnAirlineButton1: {
    backgroundColor: colours.lightBlueTheme,
    alignSelf: "center",
    padding: scale(12),
    borderRadius: scale(5),
    flexDirection: "row",
    alignItems: "center",
    width:scale(337),
    justifyContent:'center',
    marginBottom:scale(10),
    marginTop:scale(10)
  },
  aviosText: {
    color: colours.lightBlueTheme,
    textAlign: "center",
    marginTop: verticalScale(10),
    textDecorationLine:"underline"
  },
  aviosText1: {
    color: "#464748",
    textAlign: "center",
    marginTop: verticalScale(10),
    fontWeight:"500"
    // textDecorationLine:"underline"
  },
  aviosText2: {
    color: "#464748",
    fontWeight:"500",
    textAlign: "center",
    marginTop: verticalScale(3),
    textDecorationLine:"underline"
  },
  airlineContainer:{
    flexDirection:'row', 
    alignItems:'center',
    borderWidth:scale(0.5), 
    borderColor:colours.lightBlueTheme,
    padding:scale(10),
    borderRadius:scale(6),
    width:scale(300),
    justifyContent:"space-between",
    marginTop:verticalScale(5)
  },
  membershipListTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontWeight: "bold",
    fontSize: scale(14),
    color: colours.darkBlueTheme,
  },
  membershipSubListTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontWeight: "500",
    marginTop:scale(15),
    fontSize: scale(14),
    color: "#383F4B",
  },

  airlineContainerView:{
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: scale(15),
    borderRadius:scale(10)
  },
  airlineViewHeader:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  airlineHeaderText:{
    color: colours.lightBlueTheme,
    fontSize: scale(16),
  },
  airlineInnerContainerView:{
    alignSelf: "stretch",
    height: scale(1.5),
    backgroundColor: colours.borderBottomLineColor,
    marginTop: scale(12),
  },
  confirmTierText:{
    color: colours.lightGreyish,
    fontSize: scale(14),
    marginTop: verticalScale(10),
    alignSelf:"flex-start"
  },
  okButton:{
    width: scale(145),
    paddingVertical: verticalScale(10),
    borderRadius: verticalScale(11),
    justifyContent: "center",
    backgroundColor: colours.lightBlueTheme,
    borderColor: colours.lightBlueTheme,
    marginVertical: verticalScale(10),
  },
  okText:{
    fontSize: scale(16),
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: CONST.appFonts.INTER_BOLD,
    color: colours.white,
  },
  airlineMessageText:{
    color: colours.darkBlueTheme,
    textAlign: "center",
    fontSize: scale(14),
  },
  popupMainView:{
    alignItems: "center",marginBottom:scale(-10)
  },
  popupClassView:{ alignItems: "center", marginTop: verticalScale(13),marginBottom:scale(-10) },
  popupDateStyle:{
    color: colours.lightGreyish,
    marginTop: verticalScale(5),
    fontSize: scale(13),
  },
  crossstyleView:{ alignSelf: "flex-end",
  marginTop: scale(-7), marginBottom: scale(9)},
  singleFlightStyles:{
    width: scale(340), flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignSelf: "center", margin: scale(1), marginBottom: scale(20), marginRight: scale(10)
  },
  singleFlightSubStyles:{
    backgroundColor: "#E9F8FB", margin: scale(10), justifyContent: "center", alignSelf: "center", alignItems: "center", borderWidth: scale(1), borderRadius: scale(10), borderColor: "#03B2D8", width: scale(155), height: scale(110)
  },
  createAlertTxt:{
    
      fontFamily: STRING_CONST.appFonts.INTER_BOLD,
      fontSize: scale(18),
      color: colours.darkBlueTheme,
      fontWeight: "600", marginStart: scale(8)
    
  },
  modelViewStyle:{
    flex: 1, justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    alignItems: 'center',
    width: width + scale(30),
    height: height,
    marginStart: -scale(20),
    marginEnd: -scale(7),
    marginTop: Platform.OS == "ios" ? scale(-20) : scale(-40),
    marginBottom: -scale(20),
  },
  modelSubView:{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
  },
  modelStyleSubView:{
     marginEnd: scale(25), height: verticalScale(130), width: verticalScale(130), backgroundColor: "#FFF", justifyContent: 'center', alignItems: 'center', borderRadius: verticalScale(10), overflow: 'hidden' 
  }

});
