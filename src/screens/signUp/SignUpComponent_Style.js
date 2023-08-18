import { StyleSheet } from "react-native";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import { appFonts } from "../../constants/StringConst";

export default StyleSheet.create({
  errorMessageTextStyle: {
    color: colours.redColor,
    marginBottom: verticalScale(5),
    fontSize: scale(12),
    fontFamily: appFonts.INTER_REGULAR,
    // marginLeft: scale(40),
    margin:scale(5),
  marginTop: verticalScale(5),
  },
  container: {
    flexGrow: 1,
  },
  logoContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  
  passContainer1: {
    width:scale(300),
    height:scale(45),
    borderRadius:scale(10),
    backgroundColor:colours.white,
    marginTop: verticalScale(3),
  },
  rffLogo: {
    marginTop: verticalScale(40),
    width: scale(60),
    height: scale(60),
    marginStart:scale(5)
  },

  firstNameContainer: {
    marginTop: verticalScale(32),
  },

  fieldContainer: {
    marginTop: verticalScale(23),
  },

  emailText: {
    fontSize: scale(13),
    marginLeft: scale(0),
    margin:scale(0),
    padding:scale(3),
    fontFamily: appFonts.INTER_REGULAR,
    lineHeight: scale(15),
    color: colours.lightGreyish,
  },

  passContainer1: {
    width:scale(300),
    height:scale(45),
    borderRadius:scale(10),
    backgroundColor:colours.white,
    marginTop: verticalScale(3),
  },
  input: {
    // borderBottomWidth: scale(1),
    alignItems: "center",
    // borderBottomColor: colours.borderBottomLineColor,
    fontSize: scale(16),
    color: colours.darkBlueTheme,
    fontWeight: "500",
    paddingLeft: scale(4),
    height: scale(41),
    marginHorizontal: scale(6),
  },

  eyeContainer: {
    position: "absolute",
    right: scale(18.12),
    bottom: scale(7.75),
  },

  visibleEye: {
    width: scale(35),
    height: scale(35),
  },

  inVisibleEye: {
    width: scale(35),
    height: scale(35),
  },

  forgotPasswordText: {
    fontSize: scale(15),
    alignSelf: "flex-end",
    marginTop: verticalScale(15),
    marginRight: scale(36),
    fontFamily: appFonts.INTER_REGULAR,
    color: colours.lightBlueTheme,
  },

  signUpButton: {
    alignSelf: "center",
    width: scale(302),
    height: scale(60),
    marginTop: verticalScale(30),
    borderRadius: scale(15),
    justifyContent: "center",
    alignItems: "center",
  
  },

  signInText: {
    fontSize: scale(18),
    fontFamily: appFonts.INTER_BOLD,
    lineHeight: scale(22),
    color: colours.white,
    fontWeight:'bold'
  },

  orSignInText: {
    fontSize: scale(14),
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
  
  googleFBContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: verticalScale(27),
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: verticalScale(14),
  },

  google: {
    marginRight: scale(10),
  },

  fb: {
    marginHorizontal: scale(10),
  },

  googleButton: {
    width: scale(60),
    height: scale(60),
  },

  fbButton: {
    width: scale(62),
    height: scale(60),
  },

  bottomContainer: {
    marginTop: verticalScale(22),
    marginBottom: verticalScale(40),
    alignSelf: "center",
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
    margin:scale(1),marginStart:scale(-3),
  },
});
