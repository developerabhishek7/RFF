import { StyleSheet } from "react-native";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import * as STRING_CONST from "../../constants/StringConst";
import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

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
    marginLeft: scale(24),
    flexDirection: "row",
    marginHorizontal: scale(10),
  },
  locationText: {
    width: width - scale(30),
    paddingHorizontal: verticalScale(10),
    color: colours.darkBlueTheme,
    fontFamily: STRING_CONST.appFonts.INTER_BOLD,
    fontSize: scale(18),
    fontWeight: "bold",
  },
  headerContainer: {
    flexDirection: "row",
    backgroundColor: colours.white,
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
    fontSize: scale(12),
  },
  availabiltyView: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
    paddingBottom: verticalScale(10),
    paddingHorizontal: verticalScale(20)
  },
  seatNumberText: {
    color: colours.darkBlueTheme,
    marginTop: verticalScale(18),
    fontSize: scale(12),
    fontFamily:STRING_CONST.appFonts.INTER_SEMI_BOLD
  },
  classText: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontSize: scale(12),
    marginTop: verticalScale(5),
  },
  pointSeatsText: {
    color: colours.lightGreyish,
    fontSize: scale(13),
    
  },
  cellContainer: {
    marginVertical: verticalScale(10),
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
    fontSize: scale(12),
  },
  checkOnAirlineButton: {
    backgroundColor: colours.lightBlueTheme,
    alignSelf: "stretch",
    padding: scale(15),
    borderRadius: scale(5),
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'center',
    marginTop:verticalScale(20)
  },
  animatedView: {
    position: "absolute",
    bottom: -10,
    left: 0,
    right: 0,
    backgroundColor: colours.darkBlueTheme,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    paddingTop:verticalScale(15),
    zIndex: 5
  },
  animatedInnerView: {
    marginTop: verticalScale(10),
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
  bookOnBAText:{
    color: colours.white,
    marginLeft: scale(10),
    fontSize: scale(13),
  },
  bookOnBAButton:{
    marginTop: verticalScale(13),
    marginHorizontal:scale(20),
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
