import { StyleSheet } from "react-native";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import * as STRING_CONST from "../../constants/StringConst";
import { Dimensions,Platform } from "react-native";
const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#FFF"
  },
  sourceDestinationView:{flexDirection:"row",justifyContent:"center",height:scale(46),borderBottomWidth:0.9,borderBottomColor:"#DDDDDD",margin:scale(0)},
citiesWithMultipleAirpots:{
  color: "#132C52", fontSize: scale(15), marginStart: scale(30), fontFamily: STRING_CONST.appFonts.INTER_SEMI_BOLD,
  alignSelf: 'flex-start', marginTop: verticalScale(9), marginBottom: verticalScale(1),
},
citiesWithSingleAirpots:{
  color: "#132C52", fontSize: scale(15), marginStart: scale(30), fontFamily: STRING_CONST.appFonts.INTER_SEMI_BOLD,
  alignSelf: 'flex-start', marginTop: verticalScale(15), marginBottom: verticalScale(1),
},
sourceDestinationHeader:{backgroundColor:"#03B2D8",borderBottomLeftRadius:scale(25),borderBottomRightRadius:scale(25),width:"100%",
marginTop:Platform.OS=="ios"?scale(-60):scale(-50)
},
headerSubView:{justifyContent:"space-between",alignSelf:"center",width:"92%",flexDirection:"row",marginTop:scale(50)},
  baIMGStyle:{ marginRight: scale(10), height: scale(20), width: scale(40) },
  infoIcon: {
    height: scale(22),
    width: scale(22),
    marginStart:scale(18)
  },
  sourceHeaderSubView:{marginTop: scale(10), backgroundColor:"#42c5e2",width:scale(330),alignSelf:"center",flexDirection:"row",borderWidth:0,borderRadius:scale(10)},
  renderListStyle:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchHeader:{height:scale(17),width:scale(17),margin:scale(10)},
  sourceHeaderInput:{height:scale(40),paddingStart:scale(0),color:"#FFF",width:scale(210),borderRadius:scale(10),fontWeight:"500",fontSize:scale(14)},
  noAirlineAvailable:{
    color: colours.lightGreyish,
    fontSize: scale(14),
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontWeight: '500',
    marginTop: verticalScale(20)
  },
  noAirlineAvailableIMG:{
    justifyContent: "flex-end",
    height: scale(94), width: scale(106)
  },
  membershipView:{
    justifyContent: 'center', alignItems: 'center',borderWidth:0,
    margin: scale(9), marginTop: scale(21), marginBottom: -scale(9),
  },membershipText:{ color: "gray", fontFamily: STRING_CONST.appFonts.INTER_SEMI_BOLD, fontSize: scale(13), alignSelf: "flex-start", paddingStart: scale(42) },
  inputTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    // fontSize: scale(14),
    fontSize:scale(14),
    fontWeight: "600",
    marginVertical: verticalScale(3),
    color: colours.darkBlueTheme,
    
  },
headerMainView:{ alignItems: "center", backgroundColor: "#03B2D8", height: Platform.OS == "android" ?  scale(80) : scale(110), width: "100%", marginTop: Platform.OS == "android" ? scale(-20) : scale(-60), borderBottomLeftRadius: scale(30), borderBottomRightRadius: scale(30), marginBottom: scale(20) },
  infoIcon1: {
    height: scale(17),
    width: scale(17),
    marginStart:scale(20)
  },
  returnIcon: {
    height: scale(35),
    width: scale(35),
    alignSelf:"flex-end",
    marginTop:scale(-19),
    marginBottom:scale(-25)
  },
  outerViewStyle: {
    // paddingHorizontal: verticalScale(16),
    flex: 1,
    // backgroundColor: colours.white,
  },

  buttonStyle: {
    flexDirection: "row",
    width: scale(301),
    borderRadius: verticalScale(11),
    alignItems: "center",
    padding: verticalScale(13),
    alignSelf: "center",
    justifyContent: "center",
    height: verticalScale(50),
  },

  buttonTextStyle: {
    marginLeft: scale(10),
    color: colours.white,
    fontFamily: STRING_CONST.appFonts.INTER_BOLD,
    fontSize: scale(15),
    fontWeight:'bold'
  },
  tabTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    // fontSize: scale(14),
    fontSize:scale(16),
    fontWeight: "bold",
    textAlign:'center',
    color:"#FFF"

  },
  tickMark: {
    height: scale(18),
    width: scale(20),
    marginRight: scale(8)
  },
  classViewContainer: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: colours.borderBottomLineColor,
    justifyContent: "space-evenly",
    marginBottom:verticalScale(20),
  },

  classViewInnerContainer: {
    flexDirection: "row",
    marginTop: verticalScale(15),
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: colours.borderBottomLineColor,
    width: width / 2 - 40,
    paddingBottom: scale(1),
  },

  classViewTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontSize: scale(12),
    fontWeight: "bold",
    marginVertical: verticalScale(10),
    color: colours.lightGreyish,
    width:scale(100),
    borderWidth:0,
    flexWrap:'wrap'
  },

  informationContainer: {
    backgroundColor: "#f0fffd",
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(15),
    borderRadius: verticalScale(15),
    marginTop:verticalScale(10),
    borderWidth:1,
    elevation:1,borderColor:"#FFF",
    width:scale(340),
    shadowOffset: {width: -2, height: 4},  
    shadowColor: '#171717',  
    shadowOpacity: 0.2,  
    shadowRadius: 3, 
  },

  airlineMembershipTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontSize: scale(14),
    fontWeight: "400",
    marginVertical: verticalScale(6),
    color: colours.lightGreyish,
  },

  classTextStyle: {
    fontSize: scale(11),
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    marginHorizontal: scale(2),
    marginVertical: verticalScale(3.5),
    color: colours.darkBlueTheme,
  },
  airlineMembershipButton: {
    flexDirection: "row",
    marginTop: verticalScale(20),
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: colours.borderBottomLineColor,
  },
  airlineMembershipButton1: {
    flexDirection: "row",
    marginTop: verticalScale(20),
    alignItems: "center",
    width:scale(270),
    borderBottomWidth: 0.5,
    // borderBottomColor: colours.borderBottomLineColor,
  },

  getlocationStyle: {
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: colours.borderBottomLineColor,
    paddingHorizontal: scale(40),
    paddingBottom: verticalScale(8),
    // borderWidth:1,
    width:scale(140)
  },
  getLocationTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontSize: scale(18),
    fontWeight: "bold",
    color: colours.lightGreyish,
  },
  bannerView: {
    // backgroundColor: COLOR_CONST.colours.dimLightBlueBackgroundColor,
    paddingVertical: verticalScale(15),
    alignSelf: STRING_CONST.STRETCH,
    borderRadius: scale(10),
    borderBottomColor:"white",
    borderBottomWidth:scale(1)
    ,marginBottom:scale(10)
  },
  bannerText: {
    textAlign: STRING_CONST.CENTER,
    color: colours.white,
    fontSize: verticalScale(18),
  },
  getLocationSubTextStyle: {
      fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
      fontSize: scale(12),
      marginVertical: verticalScale(4),
      color: colours.lightGreyish,
      width:width*0.3,
      borderWidth:0,textAlign:'center'
      
  },
  wheretoGoTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_SEMI_BOLD,
    fontSize: scale(20),
    color: colours.darkBlueTheme,
    marginTop: verticalScale(30),
    alignSelf: "center",
    width:width*0.6,
    textAlign:'center',
    marginBottom:verticalScale(20),
    fontWeight:'600'
  },
  membershipScreenCrossIconStyle: {
    alignSelf: "flex-start",
    marginTop: verticalScale(10),
    marginHorizontal: scale(10),
    padding:scale(10)
  },
  searchMembershipStyle: {
    marginTop: verticalScale(20),
    borderBottomWidth: 1,
    borderBottomColor: colours.borderBottomLineColor,
    marginHorizontal: scale(20),
  },

  membershipSubListTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontSize: scale(15),
    fontWeight:"500",
    textAlign:"left",
    paddingStart:scale(7),
    color: "#3D4859"
  },

  membershipListTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontWeight: "bold",
    fontSize: scale(13),
    color: colours.lightGreyish,
  },


  membershipListTextStyle1: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontWeight: "bold",
    fontSize: scale(12),
    padding:scale(7),
    paddingStart:scale(10),paddingEnd:scale(10),
    borderRadius:scale(10),
    color: colours.white,
    textTransform: 'capitalize'
  },

  travellersCountViewStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: scale(11),
    marginVertical: verticalScale(11),
    alignItems:'center',
    // width:scale(330)
    
  },
  yearsTextStyle: {
    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
    fontSize: scale(10),
    color: colours.lightGreyish,
  },

  travellersCountButtonStyle: {
    height: verticalScale(25),
    width: scale(25),
    
    borderRadius: verticalScale(3),
    alignItems: "center",
    justifyContent: "center",
  },

  classModalContainer: {
    backgroundColor: colours.white,
    bottom: 0,
    borderTopRightRadius: scale(30),
    borderTopLeftRadius: scale(30),
    width: width,
  },
  modalInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
    // marginStart:scale(22)
    
  },

  getLocationContainer:{
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: verticalScale(20),
  },
  airportNameStyle: {
    fontSize:scale(12),
    color:colours.lightGreyish,
    marginTop:verticalScale(5),
    fontWeight:'bold'
  },
  airlineContainer:{
    flexDirection:'row', 
    alignItems:'center',
    borderWidth:scale(0.5), 
    borderColor:colours.lightBlueTheme,
    padding:scale(10),
    borderRadius:scale(6),
    width:width*0.73,    
    justifyContent:"space-between",
  },
  passengerIcon:{
    height:scale(19),
    width:scale(16)
  },
  airlineContainerView:{
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: scale(15),
    borderRadius:scale(10)
  },
  airlineViewHeader:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  airlineHeaderText:{
    color: colours.lightBlueTheme,
    fontSize: scale(15),
  },
  airlineInnerContainerView:{
    alignSelf: "stretch",
    height: scale(1.5),
    backgroundColor: colours.borderBottomLineColor,
    marginTop: scale(12),
  },
  confirmTierText:{
    color: colours.lightGreyish,
    fontSize: scale(13),
    marginTop: verticalScale(10),
    alignSelf:"flex-start"
  },
  okButton:{
    width: scale(145),
    paddingVertical: verticalScale(10),
    borderRadius: verticalScale(11),
    justifyContent: "center",
    backgroundColor: colours.lightBlueTheme,
    borderColor: colours.lightBlueTheme,
    marginVertical: verticalScale(10),
  },
  okText:{
    fontSize: scale(16),
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: STRING_CONST.appFonts.INTER_BOLD,
    color: colours.white,
  },
  airlineMessageText:{
    color: colours.darkBlueTheme,
    textAlign: "center",
    fontSize: scale(13),
  },
  tabViewStyle: {
    width: width / 2 - 60,
    height:scale(40),
    borderRadius:scale(9),
    justifyContent:"center",
    alignItems:"center",
    marginStart:scale(10),
    marginEnd:scale(10),
    backgroundColor:"#ffffff"
    // borderBottomWidth: 1,
  },

  tabViewStyle1: {
    width: width / 2 - 60,
    height:scale(40),
    borderRadius:scale(9),
    justifyContent:"center",
    alignItems:"center",
    marginStart:scale(10),
    marginEnd:scale(10),
  },
  doneButton:{
    marginTop: verticalScale(9),
    height: scale(50),
    alignSelf: STRING_CONST.CENTER,
    width: scale(320),
    backgroundColor: colours.lightBlueTheme,
    alignItems: STRING_CONST.CENTER,
    justifyContent: STRING_CONST.CENTER,
    borderRadius: scale(10),
    // borderWidth:1
  },
  doneTxt:{
    fontWeight:"700",
    color:"white",
    alignSelf:"center",
    fontSize:scale(15),
    textAlign:"center"
  }
});