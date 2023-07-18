import { StyleSheet, Dimensions } from "react-native";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import * as CONST from "../../constants/StringConst";
const { height, width } = Dimensions.get("window");
import {isPad} from '../../utils/commonMethods'

export default StyleSheet.create({
  mainView: {
    backgroundColor: "#FFF",
    bottom: 0,
  flex:1
  },
  innerView: {
    margin: scale(20),
    justifyContent: "center",
    alignItems: "center",
  },
  infoIcon: {
    height:scale(15), 
    width:scale(15),
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
    // borderWidth:1,
    width:scale(240),
    alignSelf: "center",
    flexDirection:"row"
    // marginTop:scale(100)
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
    backgroundColor: colours.imageShadowColor,
    borderRadius: scale(57),
    alignSelf: "center",
  },
  RFFImage: {
    width: scale(70),
    height: scale(70),
    backgroundColor: colours.imageShadowColor,
    borderRadius: scale(57),
    alignSelf: "center",
  },

  logOutButton: {
    marginTop: verticalScale(25),
    // width: isPad() ? width - scale(110) :width - scale(90),
    padding: scale(15),
    borderRadius: verticalScale(50),
    alignSelf: "stretch",
    // borderWidth: scale(1),
    marginLeft:scale(20),
    width:scale(240)
  },
  screenButtonStyle: {
    flexDirection: "row",
    marginBottom: verticalScale(10),
    alignItems:'center',
    padding:scale(9),
    borderBottomWidth:0.3,
    width:scale(300),
    borderBottomColor:colours.darkGreyColor,
    
    // borderWidth:1
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
  },
  nameStyle: {
    fontFamily: CONST.appFonts.INTER_REGULAR,
    fontSize: scale(16),
    color: colours.darkBlueTheme,
    fontWeight: "500",
  },
  greetingsView: {
    alignItems: "flex-start",
    marginStart:scale(10),
    marginTop: verticalScale(7),
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
  }
});
