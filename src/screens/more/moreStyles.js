import { StyleSheet,Platform } from "react-native";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import { appFonts } from "../../constants/StringConst";

export default StyleSheet.create({
  container: {
    flex: 1,
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
  moreHeaderView:{alignItems:"center",backgroundColor:"#03B2D8",height:Platform.OS == "android" ? scale(80) : scale(100),width:"100%",marginTop:Platform.OS == "android" ? scale(-20):scale(-60),borderBottomLeftRadius:scale(30),borderBottomRightRadius:scale(30),marginBottom:scale(20)},
});
