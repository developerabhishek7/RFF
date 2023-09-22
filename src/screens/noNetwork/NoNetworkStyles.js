import { StyleSheet } from "react-native";
import scale, { verticalScale } from "../../helpers/scale";
import * as CONST from "../../constants/StringConst";
import { colours } from "../../constants/ColorConst";

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.white,
  },
  viewContainer: {
    flex: 1,
    alignItems: CONST.CENTER,
    justifyContent: CONST.CENTER,
    backgroundColor: colours.white,
  },
  image: {
    height: scale(200),
    width: scale(241),
  },
  title: {
    fontSize: scale(16),
    lineHeight: scale(19),
    color: colours.darkBlueTheme,
    fontFamily: CONST.appFonts.INTER_REGULAR,
    marginTop: verticalScale(30),
    fontWeight: 'bold'
  },

  description: {
    fontSize: scale(15),
    lineHeight: scale(20),
    color: colours.darkBlueTheme,
    fontFamily: CONST.appFonts.INTER_REGULAR,
    opacity: 0.6,
    marginHorizontal: scale(50),
    textAlign: CONST.CENTER,
    marginTop: verticalScale(5)
  },

});