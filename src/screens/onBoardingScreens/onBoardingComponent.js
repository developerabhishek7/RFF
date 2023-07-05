import React, { Component } from "react";
import { View, Text, ScrollView, Image,ImageBackground } from "react-native";
import styles from "./onboardingStyles";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import scale, { verticalScale } from "../../helpers/scale";
import CustomButton from "../../components/customComponents/CustomButton";
import { colours } from "../../constants/ColorConst";
import { getOnboardingData } from "../../utils/commonMethods";
import Carousel, { Pagination } from "react-native-snap-carousel";
import * as STRING_CONST from "../../constants/StringConst";
import { isNotched } from "../../utils/commonMethods";
import FastImage from "react-native-fast-image";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class OnboardingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlideIndex: 0,
    };
  }

  onButtonPress() {
    const { activeSlideIndex } = this.state;
    if (activeSlideIndex < STRING_CONST.ONBOARDING_SLIDE_LIMIT) {
      this.onSnap(activeSlideIndex + 1);
    } else {
      this.navigateToLogin();
    }
  }

  renderButtonContainer() {
    return (
      <CustomButton
        buttonStyle={styles.addButtonStyle}
        buttonColor={colours.lightBlueTheme}
        textColor={colours.white}
        textSize={scale(18)}
        textOnButton={STRING_CONST.SKIP}
        onButtonPress={() => {
          this.onButtonPress();
        }}
      />
    );
  }

  onSnap(currentIndex) {
    this.setState({
      activeSlideIndex: currentIndex,
    });
  }
  navigateToLogin = async() =>  {

    this.props.navigation.navigate("SignIn");
 
  }
  onBoardingCard(item,index) {

    return (
      <View style={{ flex: 1 }}>

          <View style={{ flex: 1 }}>
          <FastImage
            source={item.image}
            // style={{
            //   marginTop: isNotched()
            //     ? verticalScale(80)
            //     : verticalScale(18),
            //     flex:1,
            //     height:"100%",
            //     width:"100%"
            // }}
          
            // resizeMode = 'contain'  
            resizeMode="contain"
            style={{width: '100%', height: '100%',}}          
          >
          
           <View style={{marginBottom:scale(100),flex:1,justifyContent:"flex-end",marginStart:scale(20)}}>

           <Text style={styles.headingStyle}>{item.heading}</Text>
            {item.subHeading && (
              <Text style={styles.subHeadingStyle}>{item.subHeading}</Text>
            )}
            <Text style={styles.subtextStyle}>{item.description}</Text>
          

           </View>

           <View style={{flexDirection:"row",justifyContent:"space-between"}}>
           {this.pagination}

           {
           index == 3 &&
           this.renderButtonContainer()}
           </View>
         
            
          
          {/* <View style={styles.textView}>
            <Text style={styles.headingStyle}>{item.heading}</Text>
            {item.subHeading && (
              <Text style={styles.subHeadingStyle}>{item.subHeading}</Text>
            )}
            <Text style={styles.subtextStyle}>{item.description}</Text>
            {index == 5 && this.renderButtonContainer()}
          </View> */}
          </FastImage>  
          </View>     
          
          {/* <View style={styles.textView}>
            <Text style={styles.headingStyle}>{item.heading}</Text>
            {item.subHeading && (
              <Text style={styles.subHeadingStyle}>{item.subHeading}</Text>
            )}
            <Text style={styles.subtextStyle}>{item.description}</Text>
            {index == 5 && this.renderButtonContainer()}
          </View> */}

      </View>
    );
  }
  get pagination() {
    const { activeSlideIndex } = this.state;
    return (
      <Pagination
        dotsLength={getOnboardingData().length}
        activeDotIndex={activeSlideIndex}
        containerStyle={styles.paginationContainerStyle}
        dotStyle={styles.paginationDotStyle}
        inactiveDotStyle={{
          backgroundColor: colours.darkBlueTheme,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.4}
      />
    );
  }

  swiperComponent() {
    return (
      <Carousel
        firstItem={this.state.activeSlideIndex}
        containerCustomStyle={{
          height: height,
        }}
        ref={(c) => {
          this._carousel = c;
        }}
        onSnapToItem={() => {
          this.onSnap(this._carousel.currentIndex);
        }}
        animate={true}
        data={getOnboardingData()}
        sliderWidth={width}
        itemWidth={width}
        renderItem={({ item, index }) => this.onBoardingCard(item, index)}
        removeClippedSubviews={false}
        inactiveSlideScale = {1}
      />
    );
  }

  render() {
    return <ScrollView style={{ flex: 1 }}>{this.swiperComponent()}</ScrollView>;
  }
}
