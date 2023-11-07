
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