import { StyleSheet,Platform } from "react-native";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import { appFonts } from "../../constants/StringConst";
import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");
import * as STR_CONST from "../../constants/StringConst";

export default StyleSheet.create({
  infoTitle: {
    fontSize: scale(13),
    color: colours.lightBlueTheme,
    fontFamily: appFonts.INTER_REGULAR,
  },
  notificationTitle: {
    fontSize: scale(14),
    color: colours.darkBlueTheme,
    fontFamily: appFonts.INTER_REGULAR,
  },
  textInputHeading: {
    fontSize: scale(13),
    marginLeft: scale(40),
    fontFamily: appFonts.INTER_REGULAR,
    lineHeight: scale(15),
    color: colours.lightGreyish,
  },

  textInput: {
    alignItems: "center",
    fontSize: scale(15),
    color: colours.darkBlueTheme,
    fontWeight: Platform.OS ==="ios" ? "500" : "600",
    paddingLeft: scale(5),
    height: scale(41),
    width: scale(250),
    borderWidth:0,
  },
  innerProfileImage: {
    width: scale(115),
    height: scale(115),
    backgroundColor: colours.imageShadowColor,
    borderRadius: scale(57),
    alignSelf: "center",
  },
  innerProfileImage2: {
    width: scale(40),
    height: scale(40),
    alignSelf:"center",
    marginStart:scale(70),
    marginTop:scale(-40)
  },

  innerProfileImage1: {
    width: width*1.2,
    height: scale(400),
    backgroundColor: colours.imageShadowColor,
    borderRadius: scale(3),
    alignSelf: "center",
  },
  line: {
    alignSelf: "stretch",
    height: scale(1),
    backgroundColor: colours.borderBottomLineColor,
    marginTop: scale(4),
  },
  textInputView: {
    flexDirection: "row",
    // backgroundColor: colours.white,
    marginHorizontal: scale(36),
    justifyContent: "space-between",
    borderBottomWidth: scale(1),
    alignItems: "center",
    borderBottomColor: colours.borderBottomLineColor,
  },
  profileImage: {
    width: scale(115),
    height: scale(115),
    backgroundColor: colours.imageShadowColor,
    borderRadius: scale(57),
    alignSelf: "center",
    marginTop:scale(1),
  },
  cameraImage: {
    position: "absolute",
    left: 100,
    top: 105,
    height: 30,
    width: 30,
  },
  availabilityAlertView: {
    marginHorizontal: scale(35),
    marginTop: verticalScale(40),
    marginBottom: verticalScale(40),
  },
  availabilityAlertInnerView: {
    marginTop: verticalScale(22),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(5),
  },
  onOffText: {
    fontSize: scale(14),
    fontFamily: appFonts.INTER_REGULAR,
  },
  buttonStyle: {
    backgroundColor: colours.white,
    borderWidth: scale(1),
    borderColor: colours.lightBlueTheme,
    marginTop: verticalScale(30),
  },

  keepInTouchView: {
    marginHorizontal: scale(35),
    marginBottom: verticalScale(20),
  },
  keepInTouchViewSubText: {
    fontFamily: appFonts.INTER_REGULAR,
    fontSize: scale(12),
    color: colours.darkBlueTheme,
    marginTop: verticalScale(7),
  },
  editModalStyle: {
    backgroundColor: colours.white,
    bottom: 0,
    borderTopRightRadius: scale(30),
    borderTopLeftRadius: scale(30),
    width: width,
  },
  countryView: {
    flexDirection: "row",
    width: scale(302),
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: colours.white,
    paddingBottom: 10,
  },
  countryText: {
    alignItems: "center",
    fontSize: scale(15),
    color: colours.lightGreyish,
    paddingLeft: scale(4),
    marginTop: verticalScale(5),
  },
  countryDetailText: {
    alignItems: "center",
    fontSize: scale(15),
    color: colours.darkBlueTheme,
    fontWeight: Platform.OS ==="ios" ? "500" : "600",
    paddingLeft: scale(5),
    borderWidth:0,
    marginTop: verticalScale(5),
  },
  switchInnerCircle: {
    alignItems: "center",
    justifyContent: "center",
    padding: scale(5),
  },
  imageBackgroundStyle: {
    width: scale(150),
    height: scale(150),
    alignSelf: "center",
    alignItems: "center"
  },
  membershipText: {
    fontSize: scale(12),
    fontWeight: "bold",
    textAlign:"center",
    padding:scale(0),
    paddingStart:scale(10),
    paddingEnd:scale(10),
    paddingBottom:scale(3),
    color:"#ebd47a", 
    marginTop:verticalScale(5)
  },

  contentTxt:{
    fontSize: scale(14),
    fontWeight: "bold",
    padding:scale(0),
    paddingStart:scale(10),
    paddingEnd:scale(10),
    paddingBottom:scale(3),
    color:"#adb1b1", 
    marginTop:verticalScale(5)
  },

  membershipText1: {
    fontSize: scale(15),
    fontWeight: '600',
    // textAlign:"center",
    padding:scale(1),
    margin:scale(1),
    paddingStart:scale(15),
    paddingEnd:scale(10),
    paddingBottom:scale(3),
    color:"#000", 
    marginTop:verticalScale(5)
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
    flexWrap:"wrap"
  },

  informationContainer1: {
    flex:1,
    backgroundColor: "#f0fffd",
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(20),
    borderRadius: verticalScale(15),
    marginTop: verticalScale(10),
    borderWidth:1,
    elevation:1,borderColor:"#FFF",
    width:scale(160),
    shadowOffset: {width: -2, height: 4},  
    shadowColor: '#171717',  
    shadowOpacity: 0.2,  
    shadowRadius: 3,     
  },
  nameInitialsStyle: {
    fontSize: scale(50),
    fontFamily: appFonts.INTER_REGULAR,
    color: colours.lightBlueTheme,
    fontWeight: "bold",
  },

  editNameView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalTextHeading: {
    fontFamily: appFonts.INTER_BOLD,
    fontSize: scale(16),
    fontWeight: "bold",
    color: colours.darkBlueTheme,
  },
  modalInputView: {
    borderRadius: scale(15),
    paddingBottom: scale(24),
    marginTop: verticalScale(20),
  },
  errorMessage: {
    color: colours.redColor,
    fontSize: scale(12),
    fontFamily: appFonts.INTER_REGULAR,
    marginLeft: scale(20),
  },
  crossIconButton: {
    alignSelf: "flex-end",
    marginTop: verticalScale(10),
    marginHorizontal: scale(10),
    padding: scale(10),
  },
  crossIconImage: {
    justifyContent: "flex-end",
    height: scale(18),
    width: scale(18),
  },
  searchView: {
    marginTop: verticalScale(20),
    borderBottomWidth: 1,
    borderBottomColor: colours.borderBottomLineColor,
    marginHorizontal: scale(20),
  },
  searchTextInput: {
    fontWeight: "600",
    paddingVertical: verticalScale(15),
    fontSize: scale(14),
  },
  airwaysTile: {
    marginTop: verticalScale(10),
    borderRadius: scale(5),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(10),
  },
  airwaysText: {
    fontFamily: STR_CONST.appFonts.INTER_REGULAR,
    fontSize: scale(14),
    color: colours.darkBlueTheme,
    fontWeight: "bold",
  },
  noLocationView: {
    justifyContent: "center",
    alignItems: "center",
    height: height - scale(200),
  },
  noLocationImage: {
    justifyContent: "flex-end",
    height: scale(94),
    width: scale(106),
  },
  noLocationText: {
    color: colours.lightGreyish,
    fontSize: scale(14),
    fontFamily: appFonts.INTER_REGULAR,
    fontWeight: "500",
    marginTop: verticalScale(20),
  },
  countryListContainer: {
    paddingHorizontal: verticalScale(16),
    flex: 1,
    backgroundColor: colours.white,
  },
  checkUncheckButton: {
    marginRight: scale(18),
    height: scale(20),
    width: scale(20),
  },
  flexRowContainer: { 
    flexDirection: "row",
    alignItems: "center" 
  },
  editIcon: {
    height:scale(14), 
    width:scale(14)
  },
  profileScreenView:{
    justifyContent: 'center', alignItems: "center", width: "100%", height: "100%"
  },
  profileSubView:{
     alignSelf: "center", justifyContent: "center", alignItems: "center" 
  },
  firstNameView:{
     flexDirection: "row", padding: scale(3), 
  },
  firstLastNameStyle:{
     fontSize: scale(16), fontWeight: "700", color: "#FFFFFF" 
  },
  membershipTxtView:{
    backgroundColor: "#5bbfb4", padding: scale(2), borderRadius: scale(20), margin: scale(4), alignSelf: "center" 
  },
  airpotImgStyle:{
     height: scale(60), width: scale(60) 
  },
  preferrableStyle:{
      textAlign: "left",
      fontSize: scale(14),
      fontWeight: '500',
      paddingStart: scale(15),
      color: "#adb1b1",
  },
genderAgeView:{
   flexDirection: "row", justifyContent: "space-between", width: scale(340) 
},
ageImg:{
  height: scale(60), width: scale(60),
},
avgNoOfFlight:{
  textAlign: "left", fontSize: scale(14),
  fontWeight: '500',
  padding: scale(0),
  paddingStart: scale(15),
  color: "#adb1b1",
},
});
