import { StyleSheet } from "react-native";
import * as STRING_CONST from "../../constants/StringConst";
import * as COLOR_CONST from "../../constants/ColorConst";
import scale, { verticalScale, isTablet } from "../../helpers/scale";
import {isNotched} from '../../utils/commonMethods'

module.exports = StyleSheet.create({
  container: {
    // backgroundColor: COLOR_CONST.colours.white, 
    flexDirection: STRING_CONST.ROW,
    justifyContent: STRING_CONST.SPACE_BETWEEN,
    alignItems: STRING_CONST.CENTER,
    height: scale(isTablet ? 45 : 50),
    // borderWidth:1,borderColor:"green",
    marginTop:isNotched ? scale(7):scale(3)
    ,width:scale(340)
  },
  menuIcon: {
    justifyContent: STRING_CONST.CENTER
  },
  menuIconDimension: {
    height:scale(17),
    width:scale(24)
  },
  backIconCon: {
    width: scale(65),
    justifyContent: STRING_CONST.CENTER
  },
  rightIconCon: {
    paddingLeft: scale(15),
    alignItems: STRING_CONST.CENTER,
  },
  emptyView: {
    height: scale(30),
    width: scale(70)
  },
  backIcon: {
    height:scale(20),
    width:scale(20)
  },
  title: {
    fontSize: scale(18),
    textAlign: STRING_CONST.CENTER,
    color: STRING_CONST.WHITE_COLOR,
    fontWeight: STRING_CONST.BOLD,
    fontFamily: STRING_CONST.appFonts.INTER_BOLD
  },
  emptyRight: {
    width: scale(70),
    paddingHorizontal: scale(15),
    height: scale(65)
  },
  LeftButtonText: {
    fontSize: scale(14),
    color: STRING_CONST.WHITE_COLOR
  },
  countView: {
    height: scale(18),
    width: scale(19),
    borderRadius: scale(9),
    backgroundColor: COLOR_CONST.colours.lightBlueTheme,
    alignItems: STRING_CONST.CENTER,
    justifyContent: STRING_CONST.CENTER,
    position: STRING_CONST.POSITION_ABSOLUTE,
    top: scale(-5),
    right: scale(-5),
    zIndex: 1000,
    borderWidth: scale(1),
    borderColor: COLOR_CONST.colours.white
  },
  countText: {
    fontSize: scale(10),
    textAlign: STRING_CONST.CENTER,
    color: COLOR_CONST.colours.white,
    fontWeight: STRING_CONST.BOLD,
    fontFamily: STRING_CONST.appFonts.INTER_BOLD,
    alignSelf: STRING_CONST.CENTER
  },
  bannerView: {
    // backgroundColor: COLOR_CONST.colours.dimLightBlueBackgroundColor,
    paddingVertical: verticalScale(15),
    alignSelf: STRING_CONST.STRETCH,
    borderRadius: scale(10),
    borderBottomColor:"white",
    borderBottomWidth:scale(1)
  },
  bannerText: {
    textAlign: STRING_CONST.CENTER,
    color: COLOR_CONST.colours.white,
    fontSize: verticalScale(18),
  },
});
