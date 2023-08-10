import { StyleSheet,PixelRatio } from "react-native";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import { appFonts } from "../../constants/StringConst";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headingStyle: {
    fontWeight: "bold",
    fontSize: scale(30),
    color: "#2B3F5E",
    width:scale(200),
    marginBottom:scale(10),
    // textAlign: "center",
    fontFamily: appFonts.INTER_REGULAR,
  },
  subtextStyle: {
    fontSize: scale(15),
    color: "#2B3F5E",
    paddingBottom:scale(14),
    width:scale(260),
    marginTop:scale(10),
    fontWeight:"800",
    // marginTop: verticalScale(5),
    fontFamily: appFonts.INTER_SEMI_BOLD,
  },
  subHeadingStyle: {
    fontWeight: "bold",
    fontSize: scale(22),
    color: colours.darkBlueTheme,
    textAlign: "center",
    fontFamily: appFonts.INTER_REGULAR,
  },

  addButtonStyle: {
    backgroundColor: colours.skyBlueColor,
    width: scale(55),
    height: verticalScale(55),
    borderRadius: scale(100),
    marginRight:scale(20),
    marginBottom: verticalScale(0),
  },
  textView: {
    width: width,
    backgroundColor: colours.lightBlueTheme,
    borderTopLeftRadius: scale(40),
    borderTopRightRadius: scale(40),
    paddingTop: verticalScale(20),
    paddingHorizontal: scale(20),
    paddingBottom:verticalScale(10),
    justifyContent:'center',
    height:verticalScale(200),
  },
  navigationButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: verticalScale(20),
  },
  navigationButtonIcon: {
    height: scale(40),
    width: scale(40),
  },
  // onBoardingContainer:{
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   paddingHorizontal: scale(20),
  //   flex: 1,
  // },
  paginationContainerStyle:{
    // backgroundColor: colours.white,
    width: scale(190),
    alignSelf: "center",
    paddingVertical: verticalScale(10),
    height:verticalScale(30),
    marginBottom:scale(30)
  },
  paginationDotStyle:{
    width: scale(10),
    borderRadius: scale(5),
    height: scale(10),
    backgroundColor: colours.darkBlueTheme,
  },



  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(135),
    width: '100%',
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 17,
  },
  paginationWrapper: {
    position: 'absolute',
    bottom: scale(50),
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#0898A0',
    marginLeft: 10,
  },
});
