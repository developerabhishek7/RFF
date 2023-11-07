import { StyleSheet, Dimensions,Platform} from "react-native";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import { appFonts } from "../../constants/StringConst";
const { height, width } = Dimensions.get("window");

const OPTION_CONTAINER_HEIGHT = scale(400);

export default StyleSheet.create({
  infoTitle: {
    fontSize: scale(16),
    color: colours.lightBlueTheme,
    fontFamily: appFonts.INTER_REGULAR,
  },
  line: {
    alignSelf: "stretch",
    height: scale(1),
    backgroundColor: colours.borderBottomLineColor,
    marginTop: scale(4),
  },
  headerStyleView:{ alignItems: "center", backgroundColor: "#03B2D8", height: Platform.OS == "android" ? scale(80) : scale(110), width: "100%", marginTop: Platform.OS == "android" ? scale(-20) : scale(-60), borderBottomLeftRadius: scale(30), borderBottomRightRadius: scale(30), marginBottom: scale(20) },
  addButtonStyle: {
    backgroundColor: colours.lightBlueTheme,
    width: scale(99),
    height: verticalScale(34),
    borderRadius: scale(11),
    marginTop: verticalScale(15),
  },
  addButtonStyle1: {
    backgroundColor: colours.lightBlueTheme,
    width: scale(93),
    height: verticalScale(36),
    borderRadius: scale(10),
    marginTop: verticalScale(15),
    marginLeft:scale(7),
    marginRight:scale(5)
  },
  emailIdsView: {
    marginTop: verticalScale(30),
  },
  input: {
    alignItems: "center",
    fontSize: scale(16),
    color: colours.darkBlueTheme,
    fontFamily: appFonts.INTER_REGULAR,
    paddingLeft: scale(1),
    height: scale(40),
    width: scale(200),
  },
  emailIdsInnerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: verticalScale(15),  
    borderWidth:0,
  },
  statusStyle: {
    borderRadius: verticalScale(12),
    justifyContent: "center",
    paddingVertical: verticalScale(1.5),
    paddingHorizontal: verticalScale(6),
    marginLeft: scale(1),
  
  },
  statusStyle1: {
    borderRadius: verticalScale(12),
    justifyContent: "center",
    paddingVertical: verticalScale(1.5),
    paddingHorizontal: verticalScale(6),
    marginLeft: scale(10),
  
  },
  statuTextStyle: {
    color: colours.white,
    fontSize: scale(9),
    alignSelf: "center",
    fontFamily: appFonts.INTER_REGULAR,
  },
  infoSubText: {
    fontFamily: appFonts.INTER_REGULAR,
    fontSize: scale(12),
    color: colours.darkBlueTheme,
    marginTop: verticalScale(10),
  },
  otpView: {
    flexDirection: "row",
    alignItems: "center",
  },
  errorMessageTextStyle: {
    color: colours.redColor,
    marginBottom: verticalScale(5),
    fontSize: scale(12),
    fontFamily: appFonts.INTER_REGULAR,
    marginTop: verticalScale(5),
  },
  dropdownTextStyle: {
    color: colours.darkBlueTheme,
    alignItems: "center",
    fontSize: scale(16),
    color: colours.darkBlueTheme,
    fontWeight: "bold",
    paddingLeft: scale(4),
    height: scale(41),
  },
  countryView: {
    flexDirection: "row",
    width: scale(60),
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colours.white,
    borderWidth: scale(0.5),
    borderBottomWidth: scale(0.2),
    padding: scale(2),
    borderTopWidth: scale(0.5),
  },
  statusCodeText: {
    alignItems: "center",
    fontSize: scale(16),
    color: colours.darkBlueTheme,
    fontWeight: "bold",
    marginTop: verticalScale(5),
  },
  sendOTPView: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: scale(1),
    paddingHorizontal: scale(5),
  },
  innerContainer: {
    flex: 1,
    marginHorizontal: scale(35),
    marginTop: verticalScale(15),
  },
  addEmailViewTextInput: {
    borderBottomWidth: scale(1),
    width: scale(300),
    marginTop: verticalScale(20),
  },
  resendOTPButton: {
    width: scale(100),
    marginLeft: scale(23),
    marginTop: verticalScale(12),
    height: verticalScale(45),
    borderWidth: scale(1),
    height: verticalScale(30),
    borderRadius: scale(8),
  },
  verifyButton: {
    width: scale(100),
    marginLeft: scale(23),
    marginTop: verticalScale(15),
    height: verticalScale(45),
  },
  textInput: {
    alignItems: "center",
    fontSize: scale(16),
    color: colours.darkBlueTheme,
    fontWeight: "bold",
    paddingLeft: scale(4),
    height: scale(41),
    width: scale(250),
  },
  singleEmailView: {
    fontSize: scale(16),
    alignItems: "center",
    paddingVertical: verticalScale(5),
    color: colours.gray,
    fontFamily: appFonts.INTER_REGULAR,
    paddingLeft: scale(4),
    width: scale(210),
    opacity:0.7,
    // borderWidth:1,
    // borderColor:"red"
  },
  upgradetxtView:{alignSelf:"center",marginTop:scale(20),borderColor:colours.lightGreyish,borderWidth:scale(1),borderRadius:scale(10),padding:scale(10),borderStyle:"dashed",width:scale(320)},
  upgradTxt:{borderColor:colours.lightGreyBackground,color:colours.lightGreyish,borderRadius:scale(6),textDecorationStyle:"dashed",fontSize:scale(14),fontWeight:"700"},
  singleEmailView1: {
    fontSize: scale(16),
    alignItems: "center",
    paddingVertical: verticalScale(5),
    color: colours.darkBlueTheme,
    // color:"gray",
    fontFamily: appFonts.INTER_REGULAR,
    paddingLeft: scale(1),
    width: scale(230),
    // borderWidth:1
  },
  singleEmailView2: {
    fontSize: scale(16),
    alignItems: "center",
    paddingVertical: verticalScale(5),
    // color: colours.darkBlueTheme,
    color:"gray",
    fontFamily: appFonts.INTER_REGULAR,
    paddingLeft: scale(1),
    width: scale(230),
    // borderWidth:1,
    // borderColor:"red"
  },
  overlayStyle: {
    width: width,
    height: height,
    backgroundColor: colours.overlayColor,
  },

  optionContainer: {
    borderRadius: scale(5),
    width: width * 0.8,
    height: OPTION_CONTAINER_HEIGHT,
    backgroundColor: colours.offWhiteColor,
    left: width * 0.1,
    top: (height - OPTION_CONTAINER_HEIGHT) / 2,
    paddingTop: verticalScale(20),
  
  },

  cancelContainer: {
    left: width * 0.1,
    top: (height - OPTION_CONTAINER_HEIGHT) / 2 + scale(10),
  },

  cancelStyle: {
    borderRadius: scale(5),
    width: width * 0.8,
    backgroundColor: colours.offWhiteColor,
    padding: scale(8),
  },

  cancelTextStyle: {
    textAlign: "center",
    color: colours.black,
    fontSize: scale(16),
  },

  optionStyle: {
    padding: scale(8),
    borderBottomWidth: scale(1),
    borderBottomColor: colours.greyBorderColor,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  optionTextStyle: {
    textAlign: "center",
    fontSize: scale(14),
    color: colours.greyText,
    borderWidth:0
  },

  sectionStyle: {
    padding: scale(18),
    borderBottomWidth: scale(1),
    borderBottomColor: colours.greyBorderColor,
  },

  sectionTextStyle: {
    textAlign: "center",
    fontSize: scale(16),
  },
  searchTextInput: {
    height: verticalScale(60),
    position: "absolute",
    top: (height - OPTION_CONTAINER_HEIGHT) / 2 - verticalScale(70),
    alignSelf: "center",
    backgroundColor: colours.offWhiteColor,
    borderRadius: scale(5),
    width: width * 0.8,
    left: width * 0.1,
    zIndex: 99,
    justifyContent: "center",
  },
  phoneInput: {
    minWidth: scale(80),
    height: verticalScale(40),
    backgroundColor: colours.white,    
    borderWidth:0,
    marginStart:scale(1)
  },
  phoneInput1: {
    minWidth: scale(80),
    height: verticalScale(40),
    backgroundColor: colours.white,   
    borderWidth:0 ,
    marginStart:scale(1) 
  },
  phoneInputText: {
    color: colours.darkBlueTheme,
    fontSize: scale(16), 
    borderWidth:0
  },
});
