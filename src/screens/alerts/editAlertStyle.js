import { StyleSheet,Platform } from 'react-native';
import scale , {verticalScale} from '../../helpers/scale';
import { colours } from '../../constants/ColorConst';
import * as CONST from '../../constants/StringConst';
import { appFonts } from '../../constants/StringConst';

export default StyleSheet.create({

  buttonViewContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: verticalScale(10),
    paddingHorizontal:scale(20),
    marginBottom:verticalScale(20)

  },
  editAlertHeader:{alignItems:"center",backgroundColor:"#03B2D8",height:Platform.OS == "android" ? scale(80) : scale(110),width:"100%",marginTop:
  Platform.OS == "ios" ? scale(-60) : scale(-20),borderBottomLeftRadius:scale(30),borderBottomRightRadius:scale(30),marginBottom:scale(20)},

  deleteButtonStyle: {
    backgroundColor: colours.white,
    width: scale(161),
    paddingVertical: verticalScale(10),
    borderRadius: verticalScale(11),
    borderWidth: scale(1),
    borderColor: colours.lightBlueTheme,
  },

  saveButtonStyle: {
    backgroundColor: colours.lightBlueTheme,
    width: scale(161),
    paddingVertical: verticalScale(10),
    borderRadius: verticalScale(11),
    borderWidth: scale(1),
    borderColor: colours.lightBlueTheme,
  },
  saveButtonStyle1: {
    backgroundColor: colours.lightBlueCalendarBackground,
    width: scale(161),
    opacity:0.9,
    paddingVertical: verticalScale(10),
    borderRadius: verticalScale(11),
    borderWidth: scale(1),
    borderColor: colours.lightBlueCalendarBackground,
  },

  buttonTextStyle: {
    fontFamily: CONST.appFonts.INTER_BOLD,
    fontSize: scale(16),
    alignSelf: "center",
    fontWeight: "bold",
}
  ,
  buttonTextStyle1: {
    fontFamily: CONST.appFonts.INTER_BOLD,
    fontSize: scale(16),
    alignSelf: "center",
    fontWeight: "600",
}
  ,

  travelCountContainer:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    // borderWidth:1,
  },

  countButtonStyle: {
    height: verticalScale(25),
    width: scale(25),

    borderRadius: verticalScale(3),
    alignItems: "center",
    justifyContent: "center",
  },

  headingTextStyle: {
    fontFamily: appFonts.INTER_REGULAR,
    fontSize: scale(15),
    color: colours.lightGreyish,
  },

  travelClassContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginTop: verticalScale(10),
  },

  classCheckboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: colours.offWhite,
    padding: scale(10),
    width: scale(156),
    borderRadius: scale(5),
    marginBottom:verticalScale(5)
  },

  classTextStyle: {
    marginLeft: scale(5),
    fontSize: scale(13),
    color: colours.darkBlueTheme,
    fontWeight: "500",
  },

  tripTypeTextStyle: {
    fontFamily: appFonts.INTER_REGULAR,
    fontSize: scale(16),
    marginLeft: scale(5),
    color: colours.darkBlueTheme,
  },

  headingContainerStyle: {
    borderBottomColor: colours.lightGreyish,
    borderBottomWidth: 0.5,

  },

  locationTextStyle: {
    fontFamily: appFonts.INTER_REGULAR,
    fontWeight: "600",
    color: colours.lightBlueTheme,
    fontSize: scale(20),
  },

  lineStyle:{
    alignSelf: "stretch",
    height: scale(1.5),
    backgroundColor: colours.borderBottomLineColor,
    marginTop: scale(12),
  },

  dateTextStyle:{
    fontFamily: CONST.appFonts.INTER_REGULAR,
    fontSize: scale(15),
    color: colours.darkBlueTheme,
    marginTop: verticalScale(5),
    // borderWidth:1,
    fontWeight:"600"
  },

  nextRowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: scale(5),
  },

  iconContainer: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    marginLeft: scale(25),
    backgroundColor: colours.white,
    justifyContent: 'center',
    alignItems: 'center'
  },

  economyIcon: {
    width: scale(14),
    height: scale(15),
  },

  rightValueText: {
    fontSize: scale(14),
    fontFamily: appFonts.INTER_REGULAR,
    color: colours.darkBlueTheme,
    marginLeft: scale(8),
  },

  line: {
      alignSelf: 'stretch',
      height: scale(0.5),
      backgroundColor: colours.borderBottomLineColor,
      marginTop: scale(4),
      marginHorizontal: scale(26)
  },

  bottomButtonContainer: {
    height: verticalScale(90),
    width: CONST.CURRENT_SCREEN_WIDTH,
    alignItems: CONST.CENTER,
    justifyContent: CONST.CENTER,
    backgroundColor: colours.white,
    alignSelf: CONST.FLEX_END,
    marginBottom:scale(10)
  },
  radioButton:{
    height:scale(14), 
    width:scale(14)
  },
  deptIconStyle:{height:scale(20),width:scale(20),marginStart:scale(1),marginEnd:scale(6)},
  bodyStyle:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(20),
  },
  radioBtnView:{
      flexDirection: "row",
      alignItems: "center",
      marginLeft: scale(20),
  },
});
