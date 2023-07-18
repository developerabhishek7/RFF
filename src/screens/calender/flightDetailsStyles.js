import { StyleSheet } from "react-native";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import * as STRING_CONST from "../../constants/StringConst";
import { Dimensions } from "react-native";
import { Platform } from "react-native";
const { height, width } = Dimensions.get("window");
import { appFonts } from '../../constants/StringConst';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.white,
  },
  infoIcon: {
    height: scale(28),
    width: scale(28),
  },
  returnIcon: {
    height: scale(49),
    width: scale(26),
  },
  outerViewStyle: {
    flex: 1,
    backgroundColor: colours.white,
  },

  buttonStyle: {
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
    fontFamily: STRING_CONST.appFonts.INTER_BOLD,
    fontSize: scale(16),
    fontWeight:'bold'
  },

  tabViewStyle: {
    width: width / 2 - 30,
    alignItems: "center",
    borderBottomWidth: 1,
  },

  tabTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontSize: scale(14),
    fontWeight: "bold",
    marginBottom: verticalScale(10),
  },

  classViewContainer: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: colours.borderBottomLineColor,
    justifyContent: "space-evenly",
    marginBottom:verticalScale(20)
  },

  classViewInnerContainer: {
    flexDirection: "row",
    marginTop: verticalScale(15),
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: colours.borderBottomLineColor,
    width: width / 2 - 40,
  },

  classViewTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontSize: scale(14),
    fontWeight: "bold",
    marginVertical: verticalScale(10),
    color: colours.lightGreyish,
    width:scale(100),
    flexWrap:'wrap'
  },

  informationContainer: {
    backgroundColor: colours.dimLightBlueBackgroundColor,
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(20),
    borderRadius: verticalScale(15),
    marginTop:verticalScale(10)
  },

  airlineMembershipTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontSize: scale(14),
    fontWeight: "bold",
    marginVertical: verticalScale(10),
    color: colours.lightGreyish,
  },
  radioButton:{
    height:scale(14), 
    width:scale(14)
  },

  tripTypeTextStyle: {
    fontFamily: appFonts.INTER_REGULAR,
    fontSize: scale(16),
    marginLeft: scale(5),
    color: colours.darkBlueTheme,
  },
  classTextStyle: {
    fontSize: scale(12),
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    marginHorizontal: scale(2),
    marginVertical: verticalScale(3.5),
    color: colours.darkBlueTheme,
  },
  airlineMembershipButton: {
    flexDirection: "row",
    marginTop: verticalScale(20),
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: colours.borderBottomLineColor,
  },

  getlocationStyle: {
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: colours.borderBottomLineColor,
    paddingHorizontal: scale(40),
    paddingBottom: verticalScale(8),
  },
  getLocationTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontSize: scale(20),
    fontWeight: "bold",
    color: colours.lightGreyish,
  },
  getLocationSubTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontSize: scale(10),
    marginVertical: verticalScale(6),
    color: colours.lightGreyish,
  },
  wheretoGoTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_BOLD,
    fontSize: scale(14),
    color: colours.darkBlueTheme,
    marginTop: verticalScale(60),
    alignSelf: "center",
    marginBottom:verticalScale(20),
    fontWeight:'bold'
  },
  membershipScreenCrossIconStyle: {
    alignSelf: "flex-end",
    marginTop: verticalScale(10),
    marginHorizontal: scale(10),
    padding:scale(10)
  },
  searchMembershipStyle: {
    marginTop: verticalScale(20),
    borderBottomWidth: 1,
    borderBottomColor: colours.borderBottomLineColor,
    marginHorizontal: scale(20),
  },

  membershipSubListTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontWeight: "bold",
    fontSize: scale(14),
    color: colours.darkBlueTheme,
  },

  membershipListTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontWeight: "bold",
    fontSize: scale(14),
    color: colours.lightGreyish,
  },

  travellersCountViewStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: scale(20),
    marginVertical: verticalScale(20),
    alignItems:'center'
  },
  yearsTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontSize: scale(10),
    color: colours.lightGreyish,
  },

  travellersCountButtonStyle: {
    height: verticalScale(25),
    width: scale(25),
    backgroundColor: colours.lightBlueTheme,
    borderRadius: verticalScale(3),
    alignItems: "center",
    justifyContent: "center",
  },

  classModalContainer: {
    backgroundColor: colours.white,
    bottom: 0,
    borderTopRightRadius: scale(30),
    borderTopLeftRadius: scale(30),
    width: width,
  },
  modalInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
  },

  getLocationContainer:{
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: verticalScale(20),
  },
  airportNameStyle: {
    fontSize:scale(12),
    color:colours.lightGreyish,
    marginTop:verticalScale(5),
    fontWeight:'bold'
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
  },
  passengerIcon:{
    height:scale(19),
    width:scale(16)
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
    fontFamily: STRING_CONST.appFonts.INTER_BOLD,
    color: colours.white,
  },
  airlineMessageText:{
    color: colours.darkBlueTheme,
    textAlign: "center",
    fontSize: scale(14),
  },
  locationView: {
    marginLeft: scale(1),
    flexDirection: "row",
    marginHorizontal: scale(10),
  },
  locationText: {
    width: width - scale(30),
    paddingHorizontal: verticalScale(10),
    color: colours.white,
    fontFamily: STRING_CONST.appFonts.INTER_BOLD,
    fontSize: scale(18),
    fontWeight: "bold",
  },
  headerContainer: {
    flexDirection: "row",
    // backgroundColor: colours.white,
    alignItems: "center",
    paddingHorizontal: verticalScale(20),
    marginTop: verticalScale(15),
  },
  titleText: {
    color: colours.darkBlueTheme,
    fontFamily: STRING_CONST.appFonts.INTER_SEMI_BOLD,
    fontSize: scale(14),
  },
  subTitleText: {
    color: colours.lightGreyish,
    fontFamily: STRING_CONST.appFonts.INTER_SEMI_BOLD,
    fontSize: scale(13),
    textAlign:'center'
  },

  noflight: {alignSelf:'center',fontSize:scale(13),color:"#696969",marginTop:scale(2),padding:scale(2)},

  subTitleText2: {
    color: colours.lightBlueTheme,
    fontFamily: STRING_CONST.appFonts.INTER_SEMI_BOLD,
    fontSize: scale(13),
  },
  subTitleText1: {
    color: colours.lightGreyish,
    fontFamily: STRING_CONST.appFonts.INTER_SEMI_BOLD,
    fontSize: scale(12),
    width:scale(270)
  },
  availabiltyView: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
    paddingBottom: verticalScale(10),
    // borderWidth:1,
    paddingHorizontal: verticalScale(20)
  },
  seatNumberText: {
    color: colours.darkBlueTheme,
    marginTop: verticalScale(18),
    fontSize: scale(12),
    paddingLeft:scale(10),
    fontFamily:STRING_CONST.appFonts.INTER_SEMI_BOLD
  },
  classText: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontSize: scale(12),
    marginTop: verticalScale(5),
    paddingStart:scale(16)
  },
  pointSeatsText: {
    color: colours.lightGreyish,
    fontSize: scale(13),
    paddingTop:scale(15)
  },
  pointSeatsText1: {
    color: colours.lightGreyish,
    fontSize: scale(13),
    paddingTop:scale(4)
  },

  cellContainer: {
    marginVertical: verticalScale(10),
    width:scale(270),
    backgroundColor:"#FFFFFF",
    alignSelf:'center',
    borderWidth: scale(1),
    borderColor:colours.lightBlueTheme,
    borderRadius:scale(4),
    paddingHorizontal:scale(15),
    paddingVertical:verticalScale(10),
    borderStyle:"dashed",
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  flightDetailText: {
    color: colours.darkBlueTheme,
    fontFamily: STRING_CONST.appFonts.INTER_SEMI_BOLD,
    fontSize: scale(14),
  },
  checkOnAirlineButton: {
    backgroundColor: colours.lightBlueTheme,
    // alignSelf: "stretch",
    padding: scale(15),
    borderRadius: scale(5),
    flexDirection: "row",
    alignItems: "center",
    width:scale(270),
    alignSelf:"center",
    justifyContent:'center',
    margin:scale(10),
  },
  checkOnAirlineButton1: {
    backgroundColor: colours.lightBlueTheme,
    // alignSelf: "stretch",
    padding: scale(15),
    borderRadius: scale(5),
    flexDirection: "row",
    alignItems: "center",
    width:scale(270),
    alignSelf:"center",
    justifyContent:'center',
    margin:scale(10),

  },
  upgrade: {
    backgroundColor: colours.lightBlueTheme,
    // alignSelf: "stretch",
    padding: scale(10),
    borderRadius: scale(5),
    flexDirection: "row",
    alignItems: "center",

    alignSelf:"center",
    justifyContent:'center',
    margin:scale(10),
  },
  animatedView: {
    position: "absolute",
    bottom: Platform.OS === "ios" ?-scale(36):-scale(3),
    left: 0,
    right: 0,
    backgroundColor: colours.white,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    paddingTop:verticalScale(15),
    zIndex: 1,



    borderWidth:0.6,
    elevation:0.8,borderColor:"#304668",
    // width:scale(340),
    shadowOffset: {width: -2, height: 2},  
    shadowColor: '#171717',  
    shadowOpacity: 0.2,  
    shadowRadius: 2, 
  },
  animatedInnerView: {
    // marginTop: verticalScale(10),
    alignItems: "center",

  },
  titleView: {
    flexDirection: "row",
    marginHorizontal: scale(20),
    alignSelf: "stretch",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLocationText:{
    width: width - scale(30),
    paddingHorizontal: verticalScale(10),
    color: "#7d8ba0",

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
  classTxt:{padding:scale(0),fontSize:scale(14),fontWeight:"700",alignSelf:"center",alignItems:'center',
  paddingTop:scale(1),paddingBottom:scale(6)
},
  bookOnBAText:{
    color: colours.white,
    marginLeft: scale(10),
    fontSize: scale(13),
    fontWeight:"700"
  },
  ticketClassView: {
    flexDirection: "row",
    marginTop: verticalScale(17),
    paddingHorizontal: scale(16),
    // borderWidth:1,
  },
  classButton: {
    backgroundColor: colours.offWhite,
    marginRight: scale(7),
    borderRadius: scale(5),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(5),
    paddingVertical: verticalScale(5),
    borderWidth:scale(0.3),
    borderColor:"#03B2D8"
  },
  bookOnBAButton:{
    // marginTop: verticalScale(30),
    // marginHorizontal:scale(20),
    backgroundColor:"#f4fafb",width:"100%",marginBottom:scale(30)
  },
  dateText:{
    color: colours.lightGreyish,
    marginTop: verticalScale(5),
    fontSize: scale(14),
  },
  innerContainer:{
    alignSelf: "stretch",
    alignItems: "center",
  }
});
