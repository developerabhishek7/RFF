import { StyleSheet } from "react-native";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import { appFonts } from "../../constants/StringConst";

export default StyleSheet.create({
  container: {
    flex: 1,  
    // borderWidth:7,borderColor:"green"
  },
  line: {
    alignSelf: "stretch",
    height: scale(1),
    backgroundColor: colours.borderBottomLineColor,
    marginTop: scale(4),
  },
  emailIdsInnerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: verticalScale(15),
  },

  memberText: {
    fontSize: scale(16),
    alignItems: "center",
    paddingVertical: verticalScale(5),
    color: colours.lightBlueTheme,
    fontFamily: appFonts.INTER_REGULAR,
    paddingLeft: scale(4),
    width:scale(200),
  },

  memberText1: {
    fontSize: scale(16),
    alignItems: "center",
    paddingVertical: verticalScale(5),
    color: colours.lightBlueTheme,
    fontFamily: appFonts.INTER_REGULAR,
    paddingLeft: scale(4),
    width:scale(300),
    borderWidth:0,
    paddingLeft:scale(4)
  },

  blueStripText: {
    fontFamily: appFonts.INTER_REGULAR,
    fontSize: scale(14),
    color: colours.darkBlueTheme,
  },

  subscriptionButtonStyle: {
    backgroundColor: colours.lightBlueTheme,
    width: scale(243),
    height: verticalScale(50),
    borderRadius: scale(11),
    marginTop: verticalScale(15),
  },

  descritionItemView: {
    flexDirection: "row",
    paddingVertical: verticalScale(10),
    alignItems: "center",
  },
  upgradeView: {
    backgroundColor: colours.dimLightBlueBackgroundColor,
    borderRadius: scale(15),
    marginTop: verticalScale(50),
    alignContent: "center",
    paddingHorizontal: scale(25),
    paddingVertical: scale(20),
  },
  menuStyle: {
    height: verticalScale(35),
    maxWidth: scale(200),
  },
  menuTextStyle: {
    color: colours.black,
    fontSize: scale(13),
    flexWrap: "wrap",
    width: scale(500),
  },
  tickMarkIcon: {
    marginRight: scale(11),
    width: scale(13),
    height: scale(11),
  },
  upgradeImage: {
    alignSelf: "center",
    marginLeft: scale(-10),
    width: scale(228),
    height: scale(120),
  },
});
