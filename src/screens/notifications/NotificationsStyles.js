import { StyleSheet,Platform } from "react-native";
import scale, { verticalScale } from "../../helpers/scale";
import * as CONST from "../../constants/StringConst";
import { colours } from "../../constants/ColorConst";

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.white,

  },

  cellContainer: {
    margin: scale(20),
    marginBottom: 0
  },
  notificaitonView:{
    alignItems:"center",backgroundColor:"#03B2D8",height:Platform.OS == "android" ? scale(80) : scale(110),width:"100%",marginTop:Platform.OS == "ios" ?  scale(-60) : scale(-20),borderBottomLeftRadius:scale(30),borderBottomRightRadius:scale(30),marginBottom:scale(20)
  },

  notifTitle: {
    fontSize: scale(16),
    lineHeight: scale(19),
    paddingStart:scale(0),
    borderWidth:0,width:scale(260),
    color: colours.darkBlueTheme,
    fontFamily: CONST.appFonts.INTER_SEMI_BOLD
  },

  notifDiscription: {
    fontSize: scale(15),
    color: colours.darkBlueTheme,
    fontFamily: CONST.appFonts.INTER_REGULAR,
    marginTop: verticalScale(10)
  },

  notifDate: {
    fontSize: scale(12),
    color: colours.lightBlueTheme,
    fontWeight:"700",
    fontFamily: CONST.appFonts.INTER_REGULAR,
    marginTop: verticalScale(10),
    paddingStart:scale(70)
  },

  line: {
    alignSelf: CONST.STRETCH,
    height: verticalScale(1),
    backgroundColor: colours.darkBlueTheme,
    marginTop: verticalScale(15),
    opacity: 0.1
  },

  emptyViewContainer: {
    flex: 1,
    alignItems: CONST.CENTER,
    marginTop: verticalScale(150)
  },

  emptyTitle: {
    fontSize: scale(16),
    lineHeight: scale(19),
    color: colours.darkBlueTheme,
    fontFamily: CONST.appFonts.INTER_REGULAR,
    marginTop:verticalScale(30),
    fontWeight:'bold'
  },

  emptyDiscription: {
    fontSize: scale(15),
    lineHeight: scale(20),
    color: colours.darkBlueTheme,
    fontFamily: CONST.appFonts.INTER_REGULAR,
    opacity: 0.6,
    marginHorizontal: scale(50),
    textAlign: CONST.CENTER,
    marginTop: verticalScale(5)
  },

  textOnButton: {
    fontSize: scale(18),
    fontFamily: CONST.appFonts.INTER_BOLD,
    textAlign: CONST.CENTER,
    color: colours.white,
    fontWeight: CONST.BOLD,
    lineHeight: scale(22)
  },
  emptyImage: {
    height: scale(200),
    width: scale(241),
  },
});