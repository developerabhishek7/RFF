import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "./passwordPatternCheckStyles";
import * as IMAGE_CONST from "../../constants/ImageConst";
import * as STR_CONST from "../../constants/StringConst";
import {hasLowerCase,hasUpperCase, hasNumber } from "../../utils/commonMethods";

export default class PasswordPatternCheckComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headingText}>{STR_CONST.PASSWORD_INSTRUCTION}</Text>
        <View style={styles.conditionView}>
          {hasLowerCase(this.props.password)
            ? IMAGE_CONST.GREEN_CHECK
            : IMAGE_CONST.RED_CROSS_ICON}
          <Text style={styles.textStyle}>{STR_CONST.ONE_LOWERCASE_TEXT}</Text>
        </View>
        <View style={styles.conditionView}>
          {hasUpperCase(this.props.password)
            ? IMAGE_CONST.GREEN_CHECK
            : IMAGE_CONST.RED_CROSS_ICON}
          <Text style={styles.textStyle}>{STR_CONST.ONE_UPPERCASE_TEXT}</Text>
        </View>
        <View style={styles.conditionView}>
          {hasNumber(this.props.password)
            ? IMAGE_CONST.GREEN_CHECK
            : IMAGE_CONST.RED_CROSS_ICON}
          <Text style={styles.textStyle}>{STR_CONST.ONE_NUMERIC_TEXT}</Text>
        </View>
        <View style={styles.conditionView}>
        {this.props.password.length >= 8
            ? IMAGE_CONST.GREEN_CHECK
            : IMAGE_CONST.RED_CROSS_ICON}
          <Text style={styles.textStyle}>
            {STR_CONST.ATLEAST_EIGHT_CHARCHTERS}
          </Text>
        </View>
      </View>
    );
  }
}
