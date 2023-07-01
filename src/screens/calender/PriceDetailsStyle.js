import { StyleSheet } from 'react-native';
import scale , {verticalScale} from '../../helpers/scale';
import { colours } from '../../constants/ColorConst';
import * as CONST from '../../constants/StringConst';
import { appFonts } from '../../constants/StringConst';

export default StyleSheet.create({

  buttonViewContainer: {
    flexDirection: "row",
    width:scale(300),
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    paddingTop: verticalScale(10),
    paddingHorizontal:scale(20),
    marginBottom:verticalScale(20)
  
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
    color: colours.greyText,
    fontWeight:"700",

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
    width: scale(156),
    borderRadius: scale(5),
    marginBottom:verticalScale(5),
    borderWidth:1
  },

  classTextStyle: {
    marginLeft: scale(5),
    fontSize: scale(13),
    // color: colours.darkBlueTheme,
    fontWeight: "500",
  },
  orginDestinationStyle:{borderWidth:1,borderColor:"#000000",borderRadius:10,width:scale(336),height:scale(40),flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingStart:scale(10)},
  getLocationSubTextStyle:{
    color:"#000000",
    fontSize:scale(14),

  },

  tripTypeTextStyle: {
    fontFamily: appFonts.INTER_REGULAR,
    fontSize: scale(16),
    marginLeft: scale(5),
    color: colours.darkBlueTheme,
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
    width:scale(270)
    ,flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:colours.lightBlueCalendarBackground,
    padding:scale(15),
    marginBottom:scale(30),
    
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
    fontSize: scale(13),
    fontWeight:"700"
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
    fontSize: scale(14),
    color: colours.darkBlueTheme,
    marginTop: verticalScale(5),
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
