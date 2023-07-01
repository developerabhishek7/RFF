import { StyleSheet } from "react-native";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import { appFonts } from "../../constants/StringConst";
import {isPad} from '../../utils/commonMethods'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  tickMark: {
    height: scale(17),
    width: scale(17),
    marginRight: scale(8)
  },
  featureIcon: {
    height: scale(30),
    width: scale(30),
  },

  membershipIcon: {
    marginRight: scale(8),
    height: scale(17),
    width: scale(17),
  },

  switchViewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop:verticalScale(20)
  },
  onOffText: {
    fontSize: scale(16),
    fontFamily: appFonts.INTER_REGULAR,
    fontWeight: "bold",
  },
  selectYearlyPlanText: {
    alignSelf: "center",
    color: colours.darkBlueTheme,
    fontSize: scale(12),
    fontFamily: appFonts.INTER_REGULAR,
    marginTop: verticalScale(12),
  },
  wrapper: {
    marginTop: verticalScale(-10),
  },
  slide1: {
    flex: 1,
    borderWidth: scale(1),
    borderColor: colours.featureListBorderColor,
    borderRadius: verticalScale(10),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colours.white,
    alignSelf: "center",
    width: scale(260),
    shadowColor: colours.lightBlueTheme,
    marginVertical: verticalScale(30),
    paddingBottom: verticalScale(20),
    
  },
  text: {
    color: colours.lightBlueTheme,
    fontSize: scale(20),
    fontWeight: "bold",
  },
  headingView: {
    flexDirection: "row",
    marginTop: verticalScale(35),
    alignItems: "center",
  },
  priceStyle: {
    color: colours.darkBlueTheme,
    fontSize: scale(30),
    fontWeight: "bold",
    marginTop: verticalScale(10),
    fontFamily: appFonts.INTER_SEMI_BOLD,
  },
  blueStripText: {
    fontFamily: appFonts.INTER_REGULAR,
    fontSize: scale(12),
    color: colours.darkBlueTheme,
  },
  descriptionContainerView: {
    alignSelf: "stretch",
    marginHorizontal: scale(10),
    marginTop: verticalScale(45),
  },
  descriptionSubView: {
    backgroundColor: colours.featureListBackgroundColor,
    padding: verticalScale(6),
    paddingVertical: verticalScale(10),
    alignSelf: "stretch",
  },
  subscriptionButtonStyle: {
    backgroundColor: colours.lightBlueTheme,
    width: scale(200),
    height: verticalScale(50),
    borderRadius: scale(11),
    marginTop: verticalScale(15),
  },

  cutMark: {
    position: "absolute",
    top:0,
    left: 0,
    width: scale(90),
    height:scale(50)
  },
  lockDownPromotion: {
    backgroundColor: colours.skyBlueColor,
    paddingVertical: verticalScale(30),
    paddingHorizontal: scale(20),
    marginHorizontal: scale(20),
    borderRadius: scale(10),
    justifyContent: "center",
    alignItems: "center",
  },
  lockDownPromotionText: {
    fontFamily: appFonts.INTER_REGULAR,
    fontSize: scale(16),
    color: colours.darkBlueTheme,
    fontWeight: "bold",
  },
  lockDownPromotionSubText: {
    fontFamily: appFonts.INTER_REGULAR,
    fontSize: scale(12),
    color: colours.descriptionColor,
    textAlign: "center",
    marginTop: verticalScale(10),
  },
  descriptionText: {
    fontFamily: appFonts.INTER_REGULAR,
    fontSize: scale(12),
    color: colours.descriptionColor,
  },
  descriptionCell: {
    marginBottom: verticalScale(10),
    paddingHorizontal: scale(30),
    paddingVertical: verticalScale(35),
  },
  descritionCellInnerView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(12),
  },
  dotStyle: {
    width: scale(10),
    height: scale(10),
    borderRadius: scale(5),
    marginHorizontal: isPad() ?scale(-1) : scale(-5),
    backgroundColor: colours.lightBlueTheme,
    marginTop:scale(-5)
  },
  inactiveDotStyle: {
    width: scale(15),
    height: scale(15),
    borderRadius: scale(7.5),
    marginHorizontal:isPad() ?scale(-1) :  scale(-5),
    backgroundColor: colours.black,
  },
  basicRowStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shadowStyle: {
    shadowColor: colours.lightBlueTheme,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 15,
  },
});
