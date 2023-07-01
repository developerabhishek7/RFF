/**
 * Date: May 19, 2020
 * Description: Custom Button
 *
 * */
import React, { Component } from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./CustomButtonStyles";
import _ from 'lodash';
export default class CustomButton extends Component {

  constructor(props){
    super(props);
    this.onCustomButtonPressed= _.debounce(props.onButtonPress, 500, { leading: true, trailing: false });

  }
  render() {
    return (
      <TouchableOpacity
        disabled={this.props.isdisabled}
        activeOpacity={0.6}
        style={[
          styles.container,
          this.props.buttonStyle,
          { backgroundColor: this.props.buttonColor }
        ]}
        onPress={()=>this.onCustomButtonPressed()}
      >
        <Text style={[styles.textOnButton, { color: this.props.textColor, fontSize:this.props.textSize }]}>
          {this.props.textOnButton}
        </Text>
      </TouchableOpacity>
    );
  }
}
