import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import scale, { verticalScale } from "../helpers/scale";
import Modal from "react-native-modal";
import  Entypo from "react-native-vector-icons/Entypo";
import styles from "./popUpComponentStyles";
import FastImage from 'react-native-fast-image'

export default class PopUpComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSingleButton: this.props.isSingleButton,
      title: this.props.title,
      message: this.props.message,
      image: this.props.image,
      haveCrossIcon: false,
      rightButtonText: this.props.rightButtonText,
      leftButtonText: this.props.leftButtonText,
    };
  }
  singleButtonView() {
    return (
      <TouchableOpacity
        style={styles.singleButtonStyle}
        onPress={() => {
          this.props.onRightButtonPress();
        }}
      >
        <Text style={styles.rightButtonTextStyle}>
          {this.state.rightButtonText}
        </Text>
      </TouchableOpacity>
    );
  }

  doubleButtonView() {
    return (
      <View style={styles.doubleButtonView}>
        <TouchableOpacity
          style={styles.leftButtonStyle}
          onPress={() => {
            this.props.onLeftButtonPress();
          }}
        >
          <Text style={styles.leftButtonTextStyle}>
            {this.state.leftButtonText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rightButtonStyle}
          onPress={() => {
            this.props.onRightButtonPress();
          }}
        >
          <Text style={styles.rightButtonTextStyle}>
            {this.state.rightButtonText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View>
        <Modal
          isVisible={true}
          style={{ margin: 0, justifyContent: "flex-end" }}
        >
          <View style={styles.mainView}>
            <View style={styles.innerView}>
              <View
                style={[
                  styles.titleView,
                  {
                    justifyContent: this.state.haveCrossIcon
                      ? "space-between"
                      : "center",
                  },
                ]}
              >
                <Text style={styles.titleTextStyle}>{this.state.title}</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ showCreateAlertModal: false });
                  }}
                >
                  {this.state.haveCrossIcon && (
                    <Entypo name="cross" size={24} color={colours.lightGreyish} />
                  )}
                </TouchableOpacity>
              </View>
              <FastImage
                source={this.state.image}
                resizeMode="contain"
                style={{ marginTop: verticalScale(35), width:scale(106), height:scale(94) }}
              />
              <Text style={[styles.messageStyle,{fontWeight: "500",}]}>{this.state.message}</Text>
              {this.state.isSingleButton
                ? this.singleButtonView()
                : this.doubleButtonView()}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
