import { StyleSheet, Dimensions,Platform } from "react-native";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import * as CONST from "../../constants/StringConst";
import { appFonts } from "../../constants/StringConst";
const { height, width } = Dimensions.get("window");

import * as IMG_CONST from "../../constants/ImageConst";
import * as STR_CONST from "../../constants/StringConst";
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  infoIcon: {
    height: scale(28),
    width: scale(28),
  },
  sortIcon: {
    height: scale(15),
    width: scale(8),
    marginRight:scale(20)
  },

  alertBoxContainer: {
    width: scale(335),
    borderRadius: scale(15),
    marginTop: verticalScale(16),
    backgroundColor: colours.lightGreyBackground,
    alignSelf: "center",
    marginBottom: verticalScale(30),
    paddingBottom: verticalScale(10),
  },

  mailHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(23),
  },

  mailIcon: {
    width: scale(24),
    height: scale(24),
    marginLeft: scale(22),
  },

  wantYourText: {
    fontSize: scale(16),
    marginLeft: scale(12),
    fontFamily: appFonts.INTER_SEMI_BOLD,
    lineHeight: scale(19),
    color: colours.darkBlueTheme,
  },

  turnOnNotificationText: {
    fontSize: scale(15),
    marginLeft: scale(15),
    marginTop: verticalScale(10),
    fontFamily: appFonts.INTER_REGULAR,
    lineHeight: scale(19),
    alignSelf: "flex-start",
    textAlign: "center",
    color: colours.darkBlueTheme,
  },

  turnOnNotificationButton: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: verticalScale(9),
    width: scale(305),
    height: scale(60),
    backgroundColor: colours.lightBlueTheme,
    borderRadius: scale(15),
  },

  turnOnText: {
    fontSize: scale(18),
    fontFamily: appFonts.INTER_BOLD,
    lineHeight: scale(22),
    color: colours.white,
  },

  cellContainer: {
    marginBottom: verticalScale(10),
    // height: width - scale(70),
    width:width*0.9
  },

  cellContainer1: {
    marginBottom: verticalScale(10),
    // height: width - scale(20),
    height:scale(230),
    borderWidth:1,
  },
  loaderStyle:{
    flex:1,justifyContent:'center',  
        backgroundColor: 'rgba(52, 52, 52, 0.4)',
        alignItems:'center',
        width:width+36,height:height,
        marginStart:-scale(38),
        marginEnd:-scale(27),
        marginTop:Platform.OS == "ios"?  scale(-20) :scale(-40),
        marginBottom:-scale(20),
  },
  loaderSubStyle:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',    
  },
  loaderImg:{
    height: verticalScale(130), width: verticalScale(130), backgroundColor: "#FFF", justifyContent: 'center', alignItems: 'center', borderRadius: verticalScale(10), overflow: 'hidden'
  },
  loaderIMG1:{
    height: verticalScale(200), width: verticalScale(200)
  },

  alertCountView:{
    width:scale(200),height:Platform.OS == "ios" ? scale(40) : scale(20),marginTop:scale(-200),marginBottom:scale(-10)
  },alertCountTxt:{
    fontSize:scale(16),fontWeight:"700",paddingTop:Platform.OS == "ios" ? scale(20) : scale(1),padding:scale(1),marginStart:scale(20),color:"#FFFFFF"
  },
  errortxt:
    {
      color: colours.white,
      fontSize: 16,
      backgroundColor: "#ff3860",
      padding: "5%",
      margin: "5%",
    
  },
  cellHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cellHeaderText: {
    fontSize: scale(14),
    fontFamily: appFonts.INTER_REGULAR,
    lineHeight: scale(17),
    color: colours.lightBlueTheme,
    marginLeft: scale(25),
    fontWeight: "bold",
    width:scale(260)
  },

  crossIcon: {
    marginTop: verticalScale(10),
    marginRight: scale(20),
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",   
    marginTop: verticalScale(1),
    padding:verticalScale(1),
  },

  nextRowContainer: {
    flexDirection: "row",
    marginTop: scale(9),
  },

  iconContainer: {
    borderRadius: scale(14),
    marginLeft: scale(25),
    backgroundColor: colours.white,
    justifyContent: "center",
    alignItems: "center",  
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
    // marginTop:scale(5)
  },

  line: {
    alignSelf: "stretch",
    height: scale(0.5),
    backgroundColor: colours.borderBottomLineColor,
    marginTop: scale(4),
    marginHorizontal: scale(26),
  },

  bottomButtonContainer: {
    height: verticalScale(90),
    width: CONST.CURRENT_SCREEN_WIDTH,
    alignItems: CONST.CENTER,
    justifyContent: CONST.CENTER,
    backgroundColor: colours.white,
    alignSelf: CONST.FLEX_END,
    marginBottom: scale(10),
  },
  travelClassView: {
    flexDirection: "row",
    flexWrap: "wrap",
    // borderWidth:1,
    width:scale(335),
    alignSelf:"center",
    justifyContent:"center",
    alignItems:"center",
    marginTop:Platform.OS === "android" ? -scale(2): -scale(0),

  },
  traveClass:{
    height:scale(20),width:scale(20),marginTop:scale(6)
  },
  travelClassInnerView: {
    borderRadius: verticalScale(5),
    marginLeft: scale(5),
    marginTop: verticalScale(3),
  },
  travelClassText: {
    padding: 5,
    fontSize: scale(12),
  },
noAlertImage:{
  height: scale(190), width: scale(190)
},
noAlertTxt:{
  alignSelf: STR_CONST.CENTER,fontSize:scale(20),fontWeight:"600",color:"#132C52",margin:scale(10),marginTop:scale(25)
},
createAlertView:{
  justifyContent:"center",alignItems:"center",backgroundColor:"#03B2D8",borderRadius:scale(10),width:scale(160),height:scale(45)
},
createAlertTxt:{
  color:"#FFFFFF",textAlign:"center",fontSize:scale(14),fontWeight:"700"
},
  buttonViewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width:"90%",
    alignSelf:'center',
    paddingTop: verticalScale(3),
    paddingHorizontal: scale(9),
    borderWidth:0,
  },
  buttonStyle: {
    width: scale(290),
    paddingVertical: verticalScale(10),
    borderRadius: verticalScale(11),
    borderWidth: scale(1),
    margin:scale(1),
    marginStart:scale(-3),
    alignSelf:"center",
    justifyContent:'center',

  },
  alertCardView:{
    flex:1,backgroundColor:"#FFF",
        borderWidth:scale(1.3),borderStyle:"dashed",borderColor: "#45a7b5",borderRadius:scale(20),
        width:width*0.9,alignSelf:"center",margin:scale(10),alignSelf:"center",

  },
  alertImgView:{
    alignSelf:"flex-end",marginRight:scale(10),padding:scale(1),
  },
  alertImg:{
    height:scale(40),width:scale(40),margin:scale(4)
  },
  editImg:{
    position:"absolute",
    height:scale(40),width:scale(30),
    right:scale(30),top:scale(6)
    
  },
  renderHeaderStyles:{
    alignItems:"center",backgroundColor:"#03B2D8",
  width:"100%",marginTop:
      Platform.OS == "ios"? scale(-60) : scale(-20),borderBottomLeftRadius:scale(30),borderBottomRightRadius:scale(30)
  },
  buttonTextStyle: {
    fontSize: scale(15),
    textAlign: "center",
    fontWeight: "bold",
    fontFamily:appFonts.INTER_BOLD,
  },
  createAlertButton:{
    backgroundColor: colours.darkBlueTheme,
    height: verticalScale(60),
    width: verticalScale(60),
    borderRadius: verticalScale(30),
    position: "absolute",
    right: scale(20),
    bottom: verticalScale(20),
    justifyContent: "center",
    alignItems: "center",
  },
  alertHeaderContainer:{
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center',
    marginTop:scale(5),
    // borderWidth:1,borderColor:"red",
    height:scale(35)
  },
  menuStyle: {
    height: verticalScale(35),
    maxWidth: scale(200),
  },
  button:{

    backgroundColor : 'orange',
    marginTop : 10
  },
  menu:{
    marginTop : 10
  },
  menuTextStyle: {
    color: colours.black,
    fontSize: scale(13),
    flexWrap: "wrap",
    width: scale(500),
  },
  notificationIconButton:{
    flexDirection:'row', 
    marginRight:scale(15), 
    marginTop:verticalScale(10)
  },
  unreadCountContainer:{
    backgroundColor:colours.darkBlueTheme, 
    borderRadius:scale(5), 
    justifyContent:'center', 
    alignItems:'center'
  },
  unreadCountText:{
    color:colours.white, 
    marginHorizontal:scale(5), 
    marginVertical:scale(0)
  },
  createAlertModalContainer: {
    backgroundColor: colours.white,
    bottom: 0,
    borderTopRightRadius: scale(30),
    borderTopLeftRadius: scale(30),
    width: width,
  },
  createAlertText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
  },
  createAlertInnerContainer: {
    marginTop: verticalScale(20),
    backgroundColor: colours.dimLightBlueBackgroundColor,
    paddingVertical: verticalScale(17),
    borderRadius: verticalScale(10),
  },
  createAlertTakeOffIcon: {
    marginRight: scale(7),
    height: scale(28),
    width: scale(28),
  },
  sortView:{
    fontFamily: STR_CONST.appFonts.INTER_BOLD,
    fontSize: scale(16),
    color: colours.darkBlueTheme,
    fontWeight: "bold",
  }
  
});
