import React, {Component} from 'react';
import {View, Text, Animated, Easing, Image, StatusBar,Dimensions,Alert, ImageBackground} from 'react-native';
                

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import { connect } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
 class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: this.props.userInfo,
    };
  }

  componentDidMount() {

    const {userInfo} = this.state;
    const onBoardProps = AsyncStorage.getItem("onBoardProps")
  setTimeout(async() => {
      // if(this.props.isLoggedIn == true){
      //   this.props.navigation.navigate('FindFlightContainerScreen');
      // }else {
      //   this.props.navigation.navigate("SignIn")
      // }

      this.props.navigation.navigate("Loading")
    }, 2000);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
        //   backgroundColor: '#fff',          
        }}>
          <StatusBar hidden={true} />
        <ImageBackground
          resizeMode="stretch"
          style={{
            width: '100%',
            height: '100%',
            justifyContent:'center'
          }}
          source={require('../../assets/splash.png')}
          // source={require('../../assets/splash.png')}
        > 
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { userInfo,logIn } = state;
  // console.log("yes check here userInfo - - - -  - - -",userInfo.userData,   logIn)
  return {
    userData: userInfo.userData,
    isLoggedIn: logIn.isLoggedIn,
  };
};

export default connect(
  mapStateToProps,
  null
)(Splash);