import { StyleSheet } from "react-native";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import * as STRING_CONST from "../../constants/StringConst";
import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#FFF"
    // backgroundColor:"#ecfdfd"
  },

  infoIcon: {
    height: scale(21),
    width: scale(21),
    marginStart:scale(20)
  },
  inputTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    // fontSize: scale(14),
    fontSize:scale(14),
    fontWeight: "bold",
    marginVertical: verticalScale(3),
    color: colours.darkBlueTheme,
    
  },

  infoIcon1: {
    height: scale(17),
    width: scale(17),
    marginStart:scale(20)
  },
  returnIcon: {
    height: scale(35),
    width: scale(35),
    alignSelf:"flex-end",
    marginTop:scale(-19),
    marginBottom:scale(-25)
  },
  outerViewStyle: {
    paddingHorizontal: verticalScale(16),
    flex: 1,
    // backgroundColor: colours.white,
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
    fontSize: scale(15),
    fontWeight:'bold'
  },

  // tabViewStyle: {
  //   width: width / 2 - 40,
  //   alignItems: "center",
  //   borderBottomWidth: 1,
  // },

  // tabTextStyle: {
  //   fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
  //   fontSize: scale(13),
  //   fontWeight: "bold",
  //   marginBottom: verticalScale(10),
  // },

  tabTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    // fontSize: scale(14),
    fontSize:scale(14),
    fontWeight: "bold",
    textAlign:'center',
    color:"#FFF"
    // marginBottom: verticalScale(10),
  },
  tickMark: {
    height: scale(15),
    width: scale(18),
    marginRight: scale(8)
  },
  classViewContainer: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: colours.borderBottomLineColor,
    justifyContent: "space-evenly",
    marginBottom:verticalScale(20),
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
    fontSize: scale(12),
    fontWeight: "bold",
    marginVertical: verticalScale(10),
    color: colours.lightGreyish,
    width:scale(100),
    borderWidth:0,
    flexWrap:'wrap'
  },

  informationContainer: {
    backgroundColor: "#f0fffd",
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(20),
    borderRadius: verticalScale(15),
    marginTop:verticalScale(10),
    borderWidth:1,
    elevation:1,borderColor:"#FFF",
    width:scale(340),
    shadowOffset: {width: -2, height: 4},  
    shadowColor: '#171717',  
    shadowOpacity: 0.2,  
    shadowRadius: 3, 
  },

  airlineMembershipTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontSize: scale(14),
    fontWeight: "bold",
    marginVertical: verticalScale(10),
    color: colours.lightGreyish,
  },

  classTextStyle: {
    fontSize: scale(11),
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
  airlineMembershipButton1: {
    flexDirection: "row",
    marginTop: verticalScale(20),
    alignItems: "center",
    width:scale(270),
    borderBottomWidth: 0.5,
    // borderBottomColor: colours.borderBottomLineColor,
  },

  getlocationStyle: {
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: colours.borderBottomLineColor,
    paddingHorizontal: scale(40),
    paddingBottom: verticalScale(8),
    // borderWidth:1,
    width:scale(140)
  },
  getLocationTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontSize: scale(18),
    fontWeight: "bold",
    color: colours.lightGreyish,
  },
  getLocationSubTextStyle: {
      fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
      fontSize: scale(10),
      marginVertical: verticalScale(4),
      color: colours.lightGreyish,
      width:width*0.3,
      borderWidth:0,textAlign:'center'
  },
  wheretoGoTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_BOLD,
    fontSize: scale(12),
    color: colours.darkBlueTheme,
    marginTop: verticalScale(60),
    alignSelf: "center",
    width:width*0.9,
    textAlign:'center',
    marginBottom:verticalScale(20),
    fontWeight:'bold'
  },
  membershipScreenCrossIconStyle: {
    alignSelf: "flex-start",
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
    fontSize: scale(12),
    color: colours.darkBlueTheme,
  },

  membershipListTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontWeight: "bold",
    fontSize: scale(13),
    color: colours.lightGreyish,
  },


  membershipListTextStyle1: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontWeight: "bold",
    fontSize: scale(12),
    padding:scale(7),
    paddingStart:scale(10),paddingEnd:scale(10),
    borderRadius:scale(10),
    color: colours.white,
    textTransform: 'capitalize'
  },

  travellersCountViewStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: scale(20),
    marginVertical: verticalScale(20),
    alignItems:'center',
    
  },
  yearsTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontSize: scale(10),
    color: colours.lightGreyish,
  },

  travellersCountButtonStyle: {
    height: verticalScale(25),
    width: scale(25),
  
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
    width:width*0.73,    
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
    fontSize: scale(15),
  },
  airlineInnerContainerView:{
    alignSelf: "stretch",
    height: scale(1.5),
    backgroundColor: colours.borderBottomLineColor,
    marginTop: scale(12),
  },
  confirmTierText:{
    color: colours.lightGreyish,
    fontSize: scale(13),
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
    fontSize: scale(13),
  },
  tabViewStyle: {
    width: width / 2 - 40,
    height:scale(40),
    borderRadius:scale(9),
    justifyContent:"center",
    alignItems:"center",
    marginStart:scale(5),marginEnd:scale(6),
    backgroundColor:"#ffffff"
    // borderBottomWidth: 1,
  },

  tabViewStyle1: {
    width: width / 2 - 40,
    alignItems: "center",
    height:scale(30),
    justifyContent:'center',
    // marginStart:scale(5),marginEnd:scale(6),
    // backgroundColor:colours.darkBlueTheme
    // borderBottomWidth: 1,
  },
});