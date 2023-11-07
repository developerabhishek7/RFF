import { StyleSheet, Dimensions, Platform } from "react-native";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import * as CONST from "../../constants/StringConst";
const { height, width } = Dimensions.get("window");
import {isPad} from '../../utils/commonMethods'

export default StyleSheet.create({
  mainView: {
    flex:1,
    backgroundColor: colours.white,
    justifyContent:"center",
    alignItems:"center",
    marginTop: Platform.OS == 'android' ? scale(25) : scale(0),
    borderTopRightRadius:scale(40),
    borderBottomRightRadius:scale(40)
    // borderWidth:1,
    // borderTopRightRadius:scale(20),borderBottomRightRadius:scale(20)
  },
  profileSubView:{flexDirection:"column",alignItems:"center",justifyContent:"flex-start",marginStart:scale(10)},
  profileImgView:{borderColor:"#d7f3f8",borderWidth:scale(6),borderRadius:scale(100)},
  profileNameView:{backgroundColor:"#cdf0f7",borderColor:"#d7f3f8",borderWidth:scale(6),borderRadius:scale(100),height:scale(80),width:scale(80),justifyContent:"center",alignItems:"center",  },
  membershipView:{backgroundColor:"#a5e5f1",padding:scale(2),borderRadius:scale(20),margin:scale(4),justifyContent:"center",marginStart:scale(-3)},
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
    fontWeight:"500",
    color:"#4E5658",
    fontSize: scale(14),
    paddingBottom:scale(12),
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
    top: Platform.OS == 'android' ? verticalScale(40) : verticalScale(50),
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
    width: scale(80),
    height: scale(80),
    backgroundColor: "#d3f1f8",
    borderRadius: scale(80),
    alignSelf: "center",
    borderWidth:3,
    elevation:1,borderColor:"#d3f1f8",
    shadowOffset: {width: -2, height: 4},  
    shadowColor:"#d3f1f8",  
    shadowOpacity: 0.2,  
    shadowRadius: 3, 
  },

  logOutButton: {
    padding: scale(12),
    borderRadius: verticalScale(50),
    alignSelf: "stretch",
    // borderWidth: scale(1),
    marginLeft:scale(20),
    width:scale(210),marginTop:scale(20)
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
    color: "#191F32",
    fontWeight: "bold",
    marginTop:scale(3),
    // borderWidth:1
  },
  nameStyle: {
    fontFamily: CONST.appFonts.INTER_REGULAR,
    fontSize: scale(18),
    color: "#191F32",
    fontWeight: "500",
    marginTop:scale(-3),
    // borderWidth:1
  },
  greetingsView: {
    alignItems: "center",
    justifyContent:"center",
    marginStart:scale(15),
    marginTop: verticalScale(10),
  },
  membershipText: {
    fontFamily: CONST.appFonts.INTER_REGULAR,
    fontSize: scale(12),
    fontWeight: "bold",

    textAlign:"center",
    padding:scale(0),
    paddingStart:scale(10),
    paddingEnd:scale(10),
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
    marginTop: Platform.OS =='android' ? verticalScale(15) : verticalScale(-4),   
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: colours.lightBlueTheme, 
  },
  lineStyle:{
      borderWidth: scale(0.9),
      height:scale(1),
      width:"100%",
      borderColor: "#CCDFD9",
      margin:scale(3)
   
  }
});
