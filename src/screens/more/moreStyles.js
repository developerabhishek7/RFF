import { StyleSheet } from "react-native";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import { appFonts } from "../../constants/StringConst";

export default StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth:3,borderColor:"red"
  },

  descritionItemView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(10),
  },
  screenTitle: {
    fontFamily: appFonts.INTER_REGULAR,
    fontWeight: "bold",
    color: colours.darkBlueTheme,
    fontSize: scale(14),
  },
  line: {
    alignSelf: "stretch",
    height: scale(0.5),
    backgroundColor: colours.borderBottomLineColor,
    marginBottom: verticalScale(20),
  },
});
