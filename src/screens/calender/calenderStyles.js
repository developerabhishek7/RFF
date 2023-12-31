import { StyleSheet } from "react-native";
import scale, { verticalScale } from "../../helpers/scale";
import * as CONST from "../../constants/StringConst";
import { colours } from "../../constants/ColorConst";
import * as STRING_CONST from "../../constants/StringConst";
import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth:7,
    // borderColor:"green"
    backgroundColor: colours.white,
    // backgroundColor: 'rgba(52, 52, 52, 0.8)',  
  },
  headerContainer: {
    flexDirection: "row",
    backgroundColor: colours.white,
    alignItems: "center",
    paddingHorizontal: verticalScale(20),
    padding:scale(4),
    // overflow:"hidden",
    height:scale(80),
    borderBottomColor:"#FFFFFF",
    borderBottomWidth:3,
    // borderWidth:1,
    zIndex:30,
    elevation:0.1,
    
    paddingTop:scale(-15),
    paddingBottom:scale(-25)
  },
  cellContainer: {


    width:"90%",
    alignSelf:"center",
    marginVertical: verticalScale(10),
    borderWidth: scale(1),
    borderColor:colours.white,
    borderRadius:scale(4),
    paddingHorizontal:scale(15),
    paddingVertical:verticalScale(10),
    borderStyle:"dashed",
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  flightDetailText: {
    color: colours.white,
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
    borderColor:"#03B2D8"
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
  },
  calendarContainer: {
    //  marginTop: scale(200),
     
     flex: 1, 
     alignItems: "center" 
    
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
    // borderWidth:3,borderColor:"red",
    left: -2,
    right: -2,
    backgroundColor: colours.darkBlueTheme,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
  },
  detailLocationText:{
    width: width - scale(30),
    paddingHorizontal: verticalScale(10),
    color: colours.white,
    fontFamily: STRING_CONST.appFonts.INTER_BOLD,
    fontSize: scale(18),
    fontWeight: "bold",
    marginTop: scale(20),
  },
  timingContainer: {
    marginRight: scale(10),
    marginVertical: verticalScale(10),
    borderRadius:scale(4),
    paddingHorizontal:scale(15),
    paddingVertical:verticalScale(10),
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    alignSelf:"flex-start",
    marginHorizontal:scale(15),
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
    backgroundColor: colours.darkBlueTheme,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    paddingTop:verticalScale(7),
    zIndex: 5,    
 
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
    backgroundColor: colours.lightBlueTheme,
    marginTop: verticalScale(25),
    width: scale(100),
    padding: scale(10),
    borderRadius: verticalScale(11),
    marginBottom: verticalScale(20),
  },
  rightButtonTextStyle:{
    fontFamily: CONST.appFonts.INTER_BOLD,
    fontSize: scale(16),
    color: colours.white,
    textAlign: "center",
    fontWeight: "bold",
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
    color: colours.white,
    fontFamily: STRING_CONST.appFonts.INTER_SEMI_BOLD,
    fontSize: scale(15),
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
    zIndex: 99,
    opacity: 1,
  },
  header: {
    backgroundColor: colours.headerColor, // set the backgroundColor for header
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: verticalScale(39),
    marginLeft: scale(-20),
    marginRight: scale(-20),
  },
  calendarStyle: {
    // position:"absolute",
    borderWidth: scale(1),
    marginBottom: verticalScale(-10),
    borderRadius: verticalScale(10),
    // position:"relative",
    // borderWidth:1,
    borderColor: colours.offWhite,
  },
  calendarContainer: {
   
    flex: 1,
    paddingHorizontal: scale(16),
    backgroundColor: colours.offWhite,
    // borderColor:"green",borderWidth:1
  },
  fareViewContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: verticalScale(15),
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
    marginTop: verticalScale(0),
    marginLeft: scale(10),
  },
  ticketDetailText: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontSize: scale(13),
    color: colours.darkBlueTheme,
  },
  locationText: {
    width: width - scale(30),
    paddingHorizontal: verticalScale(10),
    color: colours.darkBlueTheme,
    fontFamily: STRING_CONST.appFonts.INTER_BOLD,
    fontSize: scale(17),
    fontWeight: "bold",
  },
  locationView: {
    marginLeft: scale(10),
    flexDirection: "row",
    marginHorizontal: scale(10),
  },
  ticketClassView: {
    flexDirection: "row",
    marginTop: verticalScale(17),
    paddingHorizontal: scale(16),
    // borderWidth:1,
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

  dateTextHeading: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontSize: scale(10),
    color: colours.lightGreyish,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(20),
  },
  dateText: {
    fontFamily: STRING_CONST.appFonts.INTER_BOLD,
    fontSize: scale(14),
    color: colours.darkBlueTheme,
    marginTop: verticalScale(5),
    fontWeight: "bold",
  },
  errorView: {
    borderWidth: 0.5,
    borderColor: colours.borderBottomLineColor,
    marginVertical: verticalScale(5),
    marginHorizontal: scale(50),
  },
  createAlertInnerContainer: {
    marginTop: verticalScale(20),
    backgroundColor: colours.dimLightBlueBackgroundColor,
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
    color: colours.white,
    marginTop: verticalScale(18),
    fontSize: scale(12),
    fontFamily:STRING_CONST.appFonts.INTER_SEMI_BOLD
  },
  seatNumberText1: {
    color: colours.lightGreyish,
    fontSize: scale(14),
    padding:scale(3),
    marginTop:-scale(20),
    marginBottom:scale(0),
    fontFamily:STRING_CONST.appFonts.INTER_SEMI_BOLD
  },

  seatNumberText3:{
    color: colours.lightGreyish,
    fontSize: scale(14),
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
    fontWeight: "900",
    fontSize: scale(14),
    zIndex: 99,
    opacity: 1,
  },
  peakText: {
    color: colours.darkGreyTextColor,
    fontSize: scale(12),
    marginRight: scale(10),
  },
  pointSeatsText: {
    color: colours.lightGreyish,
    fontSize: scale(13),
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
    height: scale(28),
    width: scale(28),
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
    color: colours.white,
    textAlign: "center",
    marginTop: verticalScale(10),
    // textDecorationLine:"underline"
  },
  aviosText2: {
    color: colours.white,
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
    fontWeight: "bold",
    fontSize: scale(14),
    color: colours.darkBlueTheme,
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
  }
});
