import { StyleSheet } from "react-native";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import { appFonts } from "../../constants/StringConst";
import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");
import * as STR_CONST from "../../constants/StringConst";
import { Platform } from "react-native";

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
    fontSize: scale(16),
    color: colours.darkBlueTheme,
    fontWeight: "bold",
    paddingLeft: scale(4),
    height: scale(41),
    width: scale(250),
  },
  innerProfileImage: {
    width: scale(115),
    height: scale(115),
    backgroundColor: colours.imageShadowColor,
    borderRadius: scale(57),
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
    backgroundColor: colours.white,
    marginHorizontal: scale(36),
    justifyContent: "space-between",
    borderBottomWidth: scale(1),
    alignItems: "center",
    borderBottomColor: colours.borderBottomLineColor,
    paddingRight: scale(10),
  },
  profileImage: {
    width: scale(115),
    height: scale(115),
    backgroundColor: colours.imageShadowColor,
    borderRadius: scale(57),
    alignSelf: "center",
    marginTop: scale(18),
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
    backgroundColor: colours.white,
    borderWidth: 0.5,
    borderBottomWidth: 1,

    borderTopWidth: 1,
    paddingBottom: 10,
  },
  countryText: {
    alignItems: "center",
    fontSize: scale(16),
    color: colours.darkBlueTheme,
    fontWeight: "bold",
    paddingLeft: scale(4),
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
    alignItems: "center",
  },
  editIcon: {
    height: scale(14),
    width: scale(14),
  },

  profileOption: {
    backgroundColor: "#FFF",
    borderRadius: scale(8),
    paddingVertical: verticalScale(20),
    paddingHorizontal: verticalScale(15),
    alignItems: "center",
    justifyContent:"center",
    marginBottom: verticalScale(20),
    width: scale(160),
    height:scale(150)
  },
  profileOptionText: {
    textAlign: "center",
    marginTop: verticalScale(12),
    fontSize: scale(14),
    color: colours.gray,
    fontFamily:appFonts.INTER_SEMI_BOLD,
    fontWeight:Platform.OS === "android" ? "600" : "500"
  },
});
