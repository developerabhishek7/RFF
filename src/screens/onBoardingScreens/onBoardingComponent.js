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
          <FastImage
            source={item.image}
            resizeMode="contain"
            style={{width: width, height: height,}}          
          >
           <View style={{marginBottom:scale(50),flex:1,justifyContent:"flex-end",marginStart:scale(20)}}>
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
          </FastImage>   
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
        removeClippedSubviews={false}
        containerCustomStyle={{
          height: height,
        }}
        ref={(c) => {
          this._carousel = c;
        }}
        layout={'tinder'}
        onSnapToItem={() => {
          this.onSnap(this._carousel.currentIndex);
        }}
        animate={false}
        data={getOnboardingData()}
        sliderWidth={width}
        itemWidth={width}
        renderItem={({ item, index }) => this.onBoardingCard(item, index)}
        apparitionDelay={0}
        enableMomentum={true}
        enableSnap={true}
        lockScrollWhileSnapping={true}
        scrollEnabled={true}
        useScrollView={false}
      />
    );
  }

  render() {
    return (
    <View style={{flex:1}}>
    <ScrollView  style={{ flex: 1 }}>{this.swiperComponent()}</ScrollView>
    </View>
    )
  }
}
