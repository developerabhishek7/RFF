import { StyleSheet } from "react-native";
import scale, { verticalScale } from "../../helpers/scale";
import * as CONST from "../../constants/StringConst";
import { colours } from "../../constants/ColorConst";

module.exports = StyleSheet.create({
  container: {
    marginTop: verticalScale(9),
    height: scale(50),
    alignSelf: CONST.CENTER,
    width: scale(305),
    backgroundColor: colours.lightBlueTheme,
    alignItems: CONST.CENTER,
    justifyContent: CONST.CENTER,
    borderRadius: scale(10)
  },

  textOnButton: {
    fontSize: scale(18),
    fontFamily: CONST.appFonts.INTER_BOLD,
    textAlign: CONST.CENTER,
    color: colours.white,
    fontWeight: CONST.BOLD,
    lineHeight: scale(22)
  }
});
