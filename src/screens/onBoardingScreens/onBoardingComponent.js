// import React, { Component } from "react";
// import { View, Text, ScrollView, Image,ImageBackground } from "react-native";
// import styles from "./onboardingStyles";
// import { Dimensions } from "react-native";
// const { width, height } = Dimensions.get("window");
// import scale, { verticalScale } from "../../helpers/scale";
// import CustomButton from "../../components/customComponents/CustomButton";
// import { colours } from "../../constants/ColorConst";
// import { getOnboardingData } from "../../utils/commonMethods";
// import Carousel, { Pagination } from "react-native-snap-carousel";
// import * as STRING_CONST from "../../constants/StringConst";
// import { isNotched } from "../../utils/commonMethods";
// import FastImage from "react-native-fast-image";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default class OnboardingComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activeSlideIndex: 0,
//     };
//   }

//   onButtonPress() {
//     const { activeSlideIndex } = this.state;
//     this.navigateToLogin();
//     // console.log("yes check her active Slide index - - - -  -",activeSlideIndex)
//     // if (activeSlideIndex < STRING_CONST.ONBOARDING_SLIDE_LIMIT) {
//     //   this.onSnap(activeSlideIndex + 1);
//     // } else {
//     //   this.navigateToLogin();
//     // }
//   }

//   renderButtonContainer() {
//     return (
//       <CustomButton
//         buttonStyle={styles.addButtonStyle}
//         buttonColor={colours.lightBlueTheme}
//         textColor={colours.white}
//         textSize={scale(18)}
//         textOnButton={STRING_CONST.SKIP}
//         onButtonPress={() => {
//           this.onButtonPress();
//         }}
//       />
//     );
//   }

//   onSnap(currentIndex) {
//     this.setState({
//       activeSlideIndex: currentIndex,
//     });
//   }
//   navigateToLogin = async() =>  {

//     this.props.navigation.navigate("SignIn");
 
//   }
//   onBoardingCard(item,index) {
//     return (
//       <View style={{ flex: 1 }}>
//           <FastImage
//             source={item.image}
//             resizeMode="contain"
//             style={{width: width, height: height,}}          
//           >
//            <View style={{marginBottom:scale(50),flex:1,justifyContent:"flex-end",marginStart:scale(20)}}>
//            <Text style={styles.headingStyle}>{item.heading}</Text>
//             {item.subHeading && (
//               <Text style={styles.subHeadingStyle}>{item.subHeading}</Text>
//             )}
//             <Text style={styles.subtextStyle}>{item.description}</Text>
//            </View>
//            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
//            {this.pagination}
//            {
//           //  index == 3 &&
//            this.renderButtonContainer()}
//            </View>
//           </FastImage>   
//       </View>
//     );
//   }
//   get pagination() {
//     const { activeSlideIndex } = this.state;
//     return (
//       <Pagination
//         dotsLength={getOnboardingData().length}
//         activeDotIndex={activeSlideIndex}
//         containerStyle={styles.paginationContainerStyle}
//         dotStyle={styles.paginationDotStyle}
//         inactiveDotStyle={{
//           backgroundColor: colours.darkBlueTheme,
//         }}
//         inactiveDotOpacity={0.4}
//         inactiveDotScale={0.4}
//       />
//     );
//   }

//   swiperComponent() {
//     return (
//       <Carousel
//         firstItem={this.state.activeSlideIndex}
//         removeClippedSubviews={false}
//         containerCustomStyle={{
//           height: height,
//         }}
//         ref={(c) => {
//           this._carousel = c;
//         }}
//         layout={'default'}
//         onSnapToItem={() => {
//           this.onSnap(this._carousel.currentIndex);
//         }}
//         animate={true}
//         data={getOnboardingData()}
//         sliderWidth={width}
//         itemWidth={width}
//         renderItem={({ item, index }) => this.onBoardingCard(item, index)}
//         apparitionDelay={0}
//         enableMomentum={true}
//         enableSnap={true}
//         lockScrollWhileSnapping={true}
//         scrollEnabled={true}
//         useScrollView={false}
//       />
//     );
//   }

//   render() {
//     return (
//     <View style={{flex:1}}>
//     <ScrollView  style={{ flex: 1 }}>{this.swiperComponent()}</ScrollView>
//     </View>
//     )
//   }
// }





import React, { Component,useState, useEffect } from "react";
import { BackHandler, View, Text, ScrollView, Image,PixelRatio,ImageBackground,SafeAreaView ,StyleSheet,StatusBar, Platform} from "react-native";
import styles from "./onboardingStyles";
import { Dimensions } from "react-native";
import scale, { verticalScale } from "../../helpers/scale";
import CustomButton from "../../components/customComponents/CustomButton";
import { colours } from "../../constants/ColorConst";
import { getOnboardingData } from "../../utils/commonMethods";
import Carousel, { Pagination } from "react-native-snap-carousel";
import * as STRING_CONST from "../../constants/StringConst";
import { isNotched } from "../../utils/commonMethods";
import FastImage from "react-native-fast-image";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as IMG_CONST from "../../constants/ImageConst";
import * as STR_CONST from "../../constants/StringConst";
const { width, height } = Dimensions.get('window');

import * as RootNavigation from '../../router/RouteNavigation';

const App = () => {
  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  
  const setSliderPage = (event: any) => {
    const { currentPage } = sliderState;

    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x/width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  useEffect(() => {
    const handleValidateClose = () => {
      console.log('comment useEffect');
      BackHandler.exitApp();
      return true;
    };

    const handler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleValidateClose,
    );

    return () => handler.remove();
  }, [0]);

  const handleValidateClose = () => {
    console.log('comment');
    return true;
  };

   function onButtonPress() {
    
    RootNavigation.navigationRef.navigate("SignIn")

  }

  function renderButtonContainer() {
    return (
      <CustomButton
        buttonStyle={styles.addButtonStyle}
        buttonColor={colours.lightBlueTheme}
        textColor={colours.white}
        textSize={scale(18)}
        textOnButton={STRING_CONST.SKIP}
        onButtonPress={() => {
          onButtonPress();
        }}
      />
    );
  }
  const { currentPage: pageIndex } = sliderState;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      {/* <SafeAreaView style={{ flex: 1 }}> */}
      <ScrollView
          style={{ flex: 1,paddingTop:scale(10)}}
          horizontal={true}
          // scrollEventThrottle={16}
          scrollEventThrottle={160}

          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={(event: any) => {
            setSliderPage(event);
          }}
        >
          <ImageBackground 
            source={require('../../assets/onboarding/Screen-1.png')}
            resizeMode="cover"
            style={{ width, height }}
          > 
            <View style={{marginBottom:Platform.OS == "android" ? scale(100) :scale(160),flex:1,justifyContent:"flex-end",marginStart:scale(20)}}>           
             <Text style={styles.headingStyle}>{STR_CONST.QUICKLY}</Text>
            <Text style={styles.subtextStyle}>{STR_CONST.QUICKLY_DES}</Text>
           </View>
          </ImageBackground>


          <ImageBackground 
            source={IMG_CONST.SCREEN2}
            resizeMode="cover"
            style={{ width, height }}
          > 
            <View style={{marginBottom:Platform.OS == "android" ? scale(100) :scale(160),flex:1,justifyContent:"flex-end",marginStart:scale(20)}}>           
             <Text style={styles.headingStyle}>{STR_CONST.DATES_NOT_AVAILABLE}</Text>
            <Text style={styles.subtextStyle}>{STR_CONST.DATES_NOT_AVAILABLE_DES}</Text>
           </View>
          </ImageBackground>




          <ImageBackground 
            source={IMG_CONST.SCREEN3}
            resizeMode="cover"
            style={{ width, height }}
          > 
            <View style={{marginBottom:Platform.OS == "android" ? scale(100) :scale(160),flex:1,justifyContent:"flex-end",marginStart:scale(20)}}>           
             <Text style={styles.headingStyle}>{STR_CONST.QUICKLY_TRAVLE}</Text>
            <Text style={styles.subtextStyle}>{STR_CONST.QUICKLY_TRAVLE_DES}</Text>
           </View>
          </ImageBackground>



          <ImageBackground 
             source={IMG_CONST.SCREEN4}
            resizeMode="cover"
            style={{ width, height }}
          > 
            <View style={{marginBottom:Platform.OS == "android" ? scale(100) :scale(160),flex:1,justifyContent:"flex-end",marginStart:scale(20)}}>           
             <Text style={styles.headingStyle}>{STR_CONST.GET_REWARDS}</Text>
            <Text style={styles.subtextStyle}>{STR_CONST.GET_REWARDS_DES}</Text>
           </View>
          </ImageBackground>
        </ScrollView>
        <View   >
          <View style={styles.paginationWrapper}> 
          {Array.from(Array(4).keys()).map((key, index) => (
            <View style={[styles.paginationDots, { opacity: pageIndex == index ? 1 : 0.2 }]}  key={index} />
          ))}
          </View>
            <View style={{position:"absolute",right:scale(15),bottom: scale(26)}}>
            {renderButtonContainer()}
            </View>
        </View>
      {/* </SafeAreaView> */}
    </>
  );
};



export default App