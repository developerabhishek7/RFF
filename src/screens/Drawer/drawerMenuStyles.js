import { StyleSheet, Dimensions } from "react-native";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import * as CONST from "../../constants/StringConst";
const { height, width } = Dimensions.get("window");
import {isPad} from '../../utils/commonMethods'

export default StyleSheet.create({
  mainView: {
      flex:1,
    backgroundColor: "#FFF",
    justifyContent:"center",alignItems:"center",

  },
  innerView: {
    margin: scale(20),
    justifyContent: "center",
    alignItems: "center",
  },
  infoIcon: {
    height:scale(18), 
    width:scale(18),
    marginRight: scale(18),
    marginLeft:scale(20),
    marginBottom:scale(10)
  },
  screenTitle: {
    fontFamily: CONST.appFonts.INTER_REGULAR,
    // fontWeight: "bold",
    fontWeight:"600",
    color:"gray",
    fontSize: scale(14),
    paddingBottom:scale(15),
    paddingTop:scale(5)
  },

  titleTextStyle: {
    fontFamily: CONST.appFonts.INTER_BOLD,
    fontSize: scale(16),
    color: colours.darkBlueTheme,
    fontWeight: "bold",
  },

  profileView: {
    position: "absolute",
    top: verticalScale(80),
    width:scale(240),
    alignSelf: "center",
    // flexDirection:"row",
  },
  profileImage: {
    width: scale(80),
    height: scale(80),
    backgroundColor: colours.imageShadowColor,
    borderRadius: scale(57),
    alignSelf: "center",
    marginTop: verticalScale(15),
  },
  innerProfileImage: {
    width: scale(80),
    height: scale(80),
    backgroundColor: "#d3f1f8",
    borderRadius: scale(57),
    alignSelf: "center",
    borderWidth:1,
    elevation:1,borderColor:"#d3f1f8",
    shadowOffset: {width: -2, height: 4},  
    shadowColor:"#d3f1f8",  
    shadowOpacity: 0.2,  
    shadowRadius: 3, 
  },
  RFFImage: {
    width: scale(70),
    height: scale(70),
    backgroundColor: "#d3f1f8",
    borderRadius: scale(57),
    alignSelf: "center",
    borderWidth:3,
    elevation:1,borderColor:"#d3f1f8",
    shadowOffset: {width: -2, height: 4},  
    shadowColor:"#d3f1f8",  
    shadowOpacity: 0.2,  
    shadowRadius: 3, 
  },

  logOutButton: {
    // width: isPad() ? width - scale(110) :width - scale(90),
    padding: scale(12),
    borderRadius: verticalScale(50),
    alignSelf: "stretch",
    // borderWidth: scale(1),
    marginLeft:scale(20),
    width:scale(230),marginTop:scale(50)
  },
  screenButtonStyle: {
    flexDirection: "row",
    marginBottom: verticalScale(1),
    alignItems:'center',
    width:scale(300),
    height:scale(60),
    padding:scale(3),
    paddingTop:scale(6)
  },

  rightButtonTextStyle: {
    fontFamily: CONST.appFonts.INTER_BOLD,
    fontSize: scale(16),
    color: "#49c4e1",
    textAlign: "center",
    fontWeight: "bold",
  },
  doubleButtonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginBottom: scale(20),
  },
  imageBackgroundStyle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colours.white,
    marginTop: isPad() ?  verticalScale(25) : verticalScale(15)
  },
  outerImageBackgroundStyle: {
    width: scale(110),
    height: scale(110),
    alignSelf: "center",
  },
  nameInitialsStyle: {
    fontSize: scale(30),
    fontFamily: CONST.appFonts.INTER_REGULAR,
    color: colours.lightBlueTheme,
    fontWeight: "bold",
    marginTop:scale(3)
  },
  nameStyle: {
    fontFamily: CONST.appFonts.INTER_REGULAR,
    fontSize: scale(16),
    color: "#b5b6b8",
    fontWeight: "500",
    marginTop:scale(-3)
  },
  greetingsView: {
    alignItems: "flex-start",
    marginStart:scale(10),
    marginTop: verticalScale(10),
  },
  membershipText: {
    fontFamily: CONST.appFonts.INTER_REGULAR,
    fontSize: scale(12),
    fontWeight: "bold",

    textAlign:"center",
    padding:scale(0),
    paddingStart:scale(5),
    paddingEnd:scale(5),
    paddingBottom:scale(3),
    // borderRadius:scale(10),
    color:colours.lightBlueTheme, 
    // backgroundColor:"#e9fcfc",
    marginTop:verticalScale(5)
  },
  membershipText1: {
    fontFamily: CONST.appFonts.INTER_REGULAR,
    fontSize: scale(13),
    fontWeight: "bold",
    color:colours.lightBlueTheme, 
    marginTop:verticalScale(-4),   
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: colours.lightBlueTheme, 
  },
  lineStyle:{
      borderWidth: scale(1),
      height:scale(1),
      width:"100%",
      borderColor: "#ecf3f1",
      margin:scale(3)
   
  }
});
