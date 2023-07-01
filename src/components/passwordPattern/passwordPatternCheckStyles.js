import { StyleSheet } from "react-native";
import * as STRING_CONST from "../../constants/StringConst";
import scale, { verticalScale } from "../../helpers/scale";

export default StyleSheet.create({
  container: {
    marginLeft: scale(24),
    marginTop: scale(10),
    borderWidth:0,
  },
  conditionView: {
    alignItems: STRING_CONST.CENTER,
    flexDirection: "row",
    fontFamily: STRING_CONST.appFonts.INTER_BOLD,
    borderWidth:0,
    marginLeft:-scale(6)
    
    // marginRight:scale(20)
  },

  textStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,

  },
  headingText:{
    fontFamily:STRING_CONST.appFonts.INTER_SEMI_BOLD,
    fontSize:scale(14),
    marginBottom:verticalScale(5)
  }
});
