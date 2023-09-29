import { StyleSheet } from "react-native";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import * as STRING_CONST from "../../constants/StringConst";
import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

import * as CONST from "../../constants/StringConst";

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:"#75cff0"
    // backgroundColor: "#fff",
  },
  infoIcon: {
    height:scale(24), 
    width:scale(24)
  },
  infoIcon1: {
    height:scale(19), 
    width:scale(19),
    marginLeft:scale(1)
  },
  outerViewStyle: {
    paddingHorizontal: verticalScale(16),
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
    height: verticalScale(50),
  },

  buttonStyleMap: {
    flexDirection: "row",
    width: scale(301),
    borderRadius: verticalScale(11),
    alignItems: "center",
    padding: verticalScale(13),
    alignSelf: "center",
    justifyContent: "center",
    height: verticalScale(50),
  },

  buttonTextStyle: {
    marginLeft: scale(10),
    color: colours.white,
    fontFamily: STRING_CONST.appFonts.INTER_BOLD,
    // fontSize: scale(16),
    fontSize:scale(16),
    fontWeight: "bold",
  },
  tabViewStyle: {
    width: width / 2 - 60,
    height:scale(40),
    borderRadius:scale(9),
    justifyContent:"center",
    alignItems:"center",
    marginStart:scale(10),
    marginEnd:scale(10),
    backgroundColor:"#ffffff"
    // borderBottomWidth: 1,
  },

  tabViewStyle1: {
    // width: width / 2 - 40,
    // alignItems: "center",
    // height:scale(30),
    // justifyContent:'center',
    width: width / 2 - 60,
    height:scale(40),
    borderRadius:scale(9),
    justifyContent:"center",
    alignItems:"center",
    marginStart:scale(10),
    marginEnd:scale(10),
    // marginStart:scale(5),marginEnd:scale(6),
    // backgroundColor:colours.darkBlueTheme
    // borderBottomWidth: 1,
  },

  tabTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    // fontSize: scale(14),
    fontSize:scale(14),
    fontWeight: "bold",
    textAlign:'center',
    color:"#FFF"
    // marginBottom: verticalScale(10),
  },

  classViewContainer: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: colours.borderBottomLineColor,
    justifyContent: "space-between",
    marginBottom: verticalScale(20),
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
    // fontSize: scale(14),
    fontSize:scale(14),
    fontWeight: "bold",
    marginVertical: verticalScale(10),
    color: colours.lightGreyish,
  },

  informationContainer: {
    backgroundColor: "#f0fffd",
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(20),
    borderRadius: verticalScale(15),
    marginTop: verticalScale(10),
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
    // fontSize: scale(10),
    fontSize:scale(10),
    fontWeight: "bold",
    marginTop: verticalScale(3),
    color: colours.lightGreyish,
  },

  classTextStyle: {
    // fontSize: scale(12),
    fontSize:scale(12),
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
    // fontSize: scale(20),
    fontSize:scale(20),
    fontWeight: "bold",
    color: colours.lightGreyish,
  },
  getLocationSubTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    // fontSize: scale(10),
    fontSize:scale(10),
    marginVertical: verticalScale(6),
    color: colours.lightGreyish,
  },
  wheretoGoTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_BOLD,
    // fontSize: scale(14),
    fontSize:scale(20),
    color: colours.darkBlueTheme,
    marginTop: verticalScale(30),
    alignSelf: "center",
    marginBottom: verticalScale(20),
    fontWeight: "600",
  },
  membershipScreenCrossIconStyle: {
    alignSelf: "flex-end",
    marginTop: verticalScale(10),
    marginHorizontal: scale(10),
  },
  searchMembershipStyle: {
    marginTop: verticalScale(30),
    borderBottomWidth: 1,
    borderBottomColor: colours.borderBottomLineColor,
    paddingVertical: verticalScale(15),
    marginHorizontal: scale(20),
  },

  membershipSubListTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontWeight: "bold",
    // fontSize: scale(14),
    fontSize:scale(14),
    color: colours.darkBlueTheme,
  },

  membershipListTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontWeight: "bold",
    // fontSize: scale(14),
    fontSize:scale(14),
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
    // fontSize: scale(10),
    fontSize:scale(10),
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
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    width: width,
  },
  modalInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
  },
  inputTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    // fontSize: scale(14),
    fontSize:scale(14),
    fontWeight: "bold",
    marginVertical: verticalScale(3),
    color: colours.darkBlueTheme,
    
  },
  errorMessage: {
    color: colours.redColor,
    alignSelf: "center",
    marginBottom: verticalScale(5),
    // fontSize: scale(12),
    fontSize:scale(12),
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
  },
  passengerIcon:{
    height:scale(19),
    width:scale(16)
  },
  container1: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
      },
    mapStyle: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
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
    
  },
  titleView: {
    flexDirection: "row",
    marginTop: 0,
    justifyContent:'space-between',
  },

  titleTextStyle:{
    fontFamily: CONST.appFonts.INTER_BOLD,
    fontSize: scale(16),
    color: colours.darkBlueTheme,
    fontWeight: "bold",
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
