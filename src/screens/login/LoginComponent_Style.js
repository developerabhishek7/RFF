import { StyleSheet, Dimensions,Platform } from "react-native";
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
  loginContainer:{ height: "100%", width: "100%", backgroundColor: colours.lightBlueBackground },
  inputFieldContainer:{
    marginTop:scale(25),
  },
  loginImgLogo:{ height: scale(180), width: scale(180), alignSelf: 'center' },
  logoContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop:scale(12),
  },
  butoonView:{
    width: scale(320),
    flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginTop: scale(1), marginBottom: scale(20)
  },
  rffLogo: {
    marginTop: verticalScale(40),
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
    width:scale(320),
    height:scale(45),
    borderRadius:scale(10),
    backgroundColor:colours.white,
    marginTop: verticalScale(30),
    justifyContent:'center',
  },

  passContainer1: {
    width:scale(320),
    height:scale(45),
    borderRadius:scale(10),
    backgroundColor:colours.white,
    marginTop: verticalScale(30),
    justifyContent:'center',
  },

  input: {
    // borderBottomWidth: scale(1),
    alignItems: "center",
    // borderBottomColor: colours.borderBottomLineColor,
    fontSize: scale(16),
    fontWeight:'400',
    color: colours.darkBlueTheme,
    fontFamily: appFonts.INTER_SEMI_BOLD,
    height: scale(41),
    textAlign:"left",
    marginHorizontal: scale(12),
  },

  emailContainer: {
    position: "absolute",
    right: scale(18),
  },

  eyeContainer: {
    position: "absolute",
    right: scale(16),
    bottom: scale(6),
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
    width: scale(320),
    height: scale(50),
    marginTop: verticalScale(25),
    borderRadius: scale(15),
    justifyContent: "center",
    alignItems: "center",
 
  },

  skipButton1: {
    alignSelf: "center",
    width: scale(50),
    height: scale(50),
    marginTop: verticalScale(2),
    borderRadius: scale(30),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d9f3f8",
   
  },
  rffLogo: {
    marginTop: verticalScale(40),
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
    flex:1,
    marginTop: verticalScale(20),
    alignSelf: "center",
    justifyContent:"center",
    alignContent:'flex-start',
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
