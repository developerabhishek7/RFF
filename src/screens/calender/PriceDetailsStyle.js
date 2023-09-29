import { StyleSheet } from 'react-native';
import scale , {verticalScale} from '../../helpers/scale';
import { colours } from '../../constants/ColorConst';
import * as CONST from '../../constants/StringConst';
import { appFonts } from '../../constants/StringConst';

export default StyleSheet.create({

  buttonViewContainer: {
    flexDirection: "row",
    width:scale(340),
    alignSelf:"center",
    marginTop:scale(50)
  },

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
    backgroundColor:colours.lightBlueCalendarBackground,
    width: scale(161),
    opacity:1,
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
    color:"#FFFFFF",
}
  ,
  buttonTextStyle1: {
    fontFamily: CONST.appFonts.INTER_BOLD,
    fontSize: scale(16),
    alignSelf: "center",
    fontWeight: "700",
    
    color:"#000000",
}
  ,

  travelCountContainer:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  countButtonStyle: {
    height: verticalScale(25),
    width: scale(25),
    backgroundColor: colours.lightBlueTheme,
    borderRadius: verticalScale(3),
    alignItems: "center",
    justifyContent: "center",
  },

  headingTextStyle: {
    fontFamily: appFonts.INTER_BOLD,
    fontSize: scale(13),
    color: colours.lightGreyish,
    
  },
  headingTextStyle1: {
    paddingBottom:scale(10),
    fontSize: scale(15),
    color: "#96ACB6",
    fontWeight:"400",

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
    backgroundColor: colours.offWhite,
    padding: scale(10),
    width: scale(150),
    borderRadius: scale(5),
    marginBottom:verticalScale(5),
    // borderWidth:1,
    margin:scale(8)
  },

  classTextStyle: {
    marginLeft: scale(5),
    fontSize: scale(13),
    // color: colours.darkBlueTheme,
    fontWeight: "400",
  },
  orginDestinationStyle:{
    width:scale(336),
    height:scale(40),
    paddingStart:scale(30),
    // borderWidth:1,
    marginTop:scale(-7),
  },
  getLocationSubTextStyle:{
    color:"#132C52",
    fontSize:scale(16),
    fontWeight:"600"
  },

  tripTypeTextStyle: {
    fontFamily: appFonts.INTER_REGULAR,
    fontSize: scale(16),
    marginLeft: scale(5),
    color: colours.darkBlueTheme,
    fontWeight:"600"
  },
  checkOnAirlineButton: {
    backgroundColor: colours.lightBlueTheme,
    // alignSelf: "stretch",
    padding: scale(15),
    borderRadius: scale(5),
    flexDirection: "row",
    alignItems: "center",
    width:scale(270),
    alignSelf:"center",
    justifyContent:'center',
    marginTop:verticalScale(20),
    marginBottom:scale(30),
  },

  saveButtonDisable:{
    paddingVertical: verticalScale(15),
    borderRadius: verticalScale(11),
    borderWidth: scale(1),
    borderColor: colours.lightBlueCalendarBackground,
    width:scale(340),
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#03B2D8",
    padding:scale(5),
    marginBottom:scale(20),
    marginRight:scale(20)
  },

  checkOnAirlineButton2: {
    backgroundColor: colours.lightBlueCalendarBackground,
    // alignSelf: "stretch",
    padding: scale(15),
    borderRadius: scale(5),
    flexDirection: "row",
    alignItems: "center",
    width:scale(270),
    alignSelf:"center",
    justifyContent:'center',
    marginTop:verticalScale(20),
    marginBottom:scale(30),
    borderColor: colours.lightBlueCalendarBackground,
  },
  
  
  
  bookOnBAText:{
    color: colours.white,
    marginLeft: scale(10),
    fontSize: scale(16),
    fontWeight:"600"
  }, 
   bookOnBAText2:{
    color: colours.darkBlueTheme,
    marginLeft: scale(10),
    fontSize: scale(13),
    fontWeight:"700"
  },
  headingContainerStyle: {
    borderBottomColor: colours.lightGreyish,
    borderBottomWidth: 0.5,
  }, 
   headingContainerStyle1: {
    borderColor: colours.lightGreyish,
    borderWidth: 0.5,
    borderRadius:scale(10)
  },

  locationTextStyle: {
    fontFamily: appFonts.INTER_REGULAR,
    fontWeight: "bold",
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
    color: colours.darkBlueTheme,
    marginTop: verticalScale(0),
    color:"#132C52",
    fontSize:scale(16),
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
    height:scale(17), 
    width:scale(17)
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
});
