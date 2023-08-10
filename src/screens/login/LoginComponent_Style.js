import { StyleSheet, Dimensions } from "react-native";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import * as CONST from "../../constants/StringConst";
import { appFonts } from "../../constants/StringConst";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center"
  },
  inputFieldContainer:{
    marginTop:scale(130),
  },

  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  rffLogo: {
    marginTop: verticalScale(75),
    width: scale(214),
    height: scale(102),
  },

  emailContainer: {
    width:scale(300),
    height:scale(45),
    borderRadius:scale(10),
    backgroundColor:colours.white,
    // marginTop: verticalScale(32),
  },

  passContainer: {
    width:scale(300),
    height:scale(45),
    borderRadius:scale(10),
    backgroundColor:colours.white,
    marginTop: verticalScale(33),
  },

  passContainer1: {
    width:scale(300),
    height:scale(45),
    borderRadius:scale(10),
    backgroundColor:colours.white,
    marginTop: verticalScale(3),
  },

  emailText: {
    fontSize: scale(13),
    margin:scale(7),
    marginLeft:scale(6),
    fontFamily:appFonts.INTER_SEMI_BOLD,
    // lineHeight: scale(15),
    color: colours.lightGreyish,
  },

  input: {
    // borderBottomWidth: scale(1),
    alignItems: "center",
    // borderBottomColor: colours.borderBottomLineColor,
    fontSize: scale(16),
    color: colours.darkBlueTheme,
    fontFamily: appFonts.INTER_SEMI_BOLD,
    fontWeight: "bold",
    paddingLeft: scale(4),
    height: scale(41),
    textAlign:"left",

    marginHorizontal: scale(7),
  },

  eyeContainer: {
    position: "absolute",
    right: scale(15.12),
    bottom: scale(6.75),
  },

  visibleEye: {
    width: scale(36),
    height: scale(36),
  },

  inVisibleEye: {
    width: scale(36),
    height: scale(36),
  },

  forgotPasswordText: {
    fontSize: scale(15),
    alignSelf: "flex-end",
    marginTop: verticalScale(10),
    marginRight: scale(6),
    fontFamily: appFonts.INTER_SEMI_BOLD,
    color: colours.lightBlueTheme,
  },


  
  signInButton: {
    alignSelf: "center",
    width: scale(302),
    height: scale(50),
    marginTop: verticalScale(25),
    borderRadius: scale(15),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colours.lightBlueTheme,
  },

  skipButton1: {
    alignSelf: "center",
    width: scale(50),
    height: scale(50),
    marginTop: verticalScale(2),
    borderRadius: scale(30),
    justifyContent: "center",
    alignItems: "center",
    marginStart:scale(20),
    backgroundColor: "#d9f3f8",
   
  },
  rffLogo: {
    marginTop: verticalScale(60),
    width: scale(60),
    height: scale(60),
    alignSelf:"flex-start",
    marginStart:scale(30),
    marginBottom:scale(0)
  },

  signInText: {
    fontSize: scale(18),
    fontFamily: appFonts.INTER_BOLD,
    lineHeight: scale(22),
    color: colours.white,
    fontWeight:'bold'
  },

  skipText1: {
    fontSize: scale(16),
    fontFamily: appFonts.INTER_BOLD,
    lineHeight: scale(22),
    color: "#03B2D8",
    fontWeight:'bold'
  },

  orSignInText: {
    fontSize: scale(15),
    marginTop:scale(-9),
    fontFamily: appFonts.INTER_REGULAR,
    lineHeight: scale(22),
    color: colours.lightGreyish,
  },

  signUpText: {
    fontSize: scale(15),
    fontFamily: appFonts.INTER_REGULAR,
    lineHeight: scale(22),
    color: colours.lightBlueTheme,
    // textDecorationLine : 'underline', 
  },

  iconTxt: {
    fontSize: scale(15),
    fontFamily: appFonts.INTER_SEMI_BOLD,
    // lineHeight: scale(22),
    marginStart:scale(6),
    color: colours.lightGreyish,
    marginEnd:scale(10)
    // textDecorationLine : 'underline', 
  },

  googleFBContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: verticalScale(24),
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: verticalScale(6),
  },

  googleFb: {
    marginRight: scale(10),
    flexDirection:"row",justifyContent:"center",alignItems:"center",
    padding:scale(7)
  },

  fb: {
    marginHorizontal: scale(10),
  },

  googleButton: {
    width: scale(46),
    height: scale(46),
    margin:scale(1),marginStart:scale(15),
  },

  fbButton: {
    width: scale(46),
    height: scale(46),
    // margin:scale(1),marginStart:scale(10),
  },
  appleButton: {
    width: scale(46),
    height: scale(46),
  },
  bottomContainer: {
    marginTop: verticalScale(20),
    alignSelf: "center",
    justifyContent:"center",
    marginBottom:verticalScale(10)
  },
  skipText: {
    fontSize: scale(16),
    fontFamily: CONST.appFonts.INTER_REGULAR,
    textAlign: CONST.CENTER,
    color: colours.lightBlueTheme,
    lineHeight: scale(22),
    // textDecorationLine: "underline",
  },
  skipButton: {
    paddingHorizontal: scale(20),
    alignSelf: "center",
    paddingVertical: scale(10),
    marginTop: verticalScale(10),
  },
  errorText:{
    color: colours.redColor,
    marginBottom: verticalScale(5),
    fontSize: scale(12),
    fontFamily: CONST.appFonts.INTER_REGULAR,
    marginLeft: scale(10),
    marginTop:scale(9)
  }
});
