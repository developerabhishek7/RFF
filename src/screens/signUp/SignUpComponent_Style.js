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
    marginLeft: scale(40),
    marginTop: verticalScale(5),
  },
  container: {
    flexGrow: 1,
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

  firstNameContainer: {
    marginTop: verticalScale(32),
  },

  fieldContainer: {
    marginTop: verticalScale(23),
  },

  emailText: {
    fontSize: scale(13),
    marginLeft: scale(40),
    fontFamily: appFonts.INTER_REGULAR,
    lineHeight: scale(15),
    color: colours.lightGreyish,
  },

  input: {
    borderBottomWidth: scale(1),
    alignItems: "center",
    borderBottomColor: colours.borderBottomLineColor,
    fontSize: scale(16),
    color: colours.darkBlueTheme,
    fontWeight: "bold",
    paddingLeft: scale(4),
    height: scale(41),
    marginHorizontal: scale(36),
  },

  eyeContainer: {
    position: "absolute",
    right: scale(55.12),
    bottom: scale(14.75),
  },

  visibleEye: {
    width: scale(30),
    height: scale(30),
  },

  inVisibleEye: {
    width: scale(30),
    height: scale(30),
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
    backgroundColor: colours.lightBlueTheme,
  },

  signInText: {
    fontSize: scale(18),
    fontFamily: appFonts.INTER_BOLD,
    lineHeight: scale(22),
    color: colours.white,
    fontWeight:'bold'
  },

  orSignInText: {
    fontSize: scale(15),
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
});
