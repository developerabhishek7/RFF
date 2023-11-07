import React, {Component} from 'react';
import {View, Text, Animated, Easing, Image, StatusBar,Dimensions,Alert, ImageBackground} from 'react-native';
                

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
 class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    StatusBar.setHidden(false);

  setTimeout(async() => {
      this.props.navigation.navigate("Loading")
    }, 2000);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,         
        }}>
          <StatusBar hidden={false} />
        <FastImage
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
            justifyContent:'center'
          }}
          source={require('../../assets/splash.png')}
        > 
        </FastImage>
      </View>
    );
  }
}

export default Splash