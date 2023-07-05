import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./masSearchStyles";
import * as IMAGE_CONST from "../../constants/ImageConst";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import { FlatList } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { Dimensions } from "react-native";
import * as STRING_CONST from "../../constants/StringConst";
import MaterialIcon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import CustomButton from "../../components/customComponents/CustomButton";
import FastImage from 'react-native-fast-image'

export default class TravellersAndClassModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      travellersCount:
        this.props.travellersCount !== 0 ? this.props.travellersCount : 1,
      classTypeArray: this.props.selectedClassObject ? this.props.selectedClassObject :  [
        {
          class: "Economy",
          isSelected: true,
        },
        {
          class: "Premium Economy",
          isSelected: true,
        },
        {
          class: "Business",
          isSelected: true,
        },
        {
          class: "First",
          isSelected: true,
        },
      ], //Temperory
    };
  }

  // getTravellersCountView() {
  //   return (
  //     <View style={{ flexDirection: "row", alignItems: "center" }}>
  //       <TouchableOpacity
  //         style={styles.travellersCountButtonStyle}
  //         onPress={() => {
  //           if(this.state.travellersCount>1){
  //           this.setState({
  //             travellersCount: this.state.travellersCount - 1,
  //           });}
  //         }}
  //       >
  //         {IMAGE_CONST.MINUS_ICON}
  //       </TouchableOpacity>
  //       <Text
  //         style={[
  //           styles.membershipSubListTextStyle,
  //           { marginHorizontal: scale(12) },
  //         ]}
  //       >
  //         {this.state.travellersCount}
  //       </Text>
  //       <TouchableOpacity
  //         style={styles.travellersCountButtonStyle}
  //         onPress={() => {
  //           if(this.state.travellersCount<6){
  //           this.setState({
  //             travellersCount: this.state.travellersCount + 1,
  //           });
  //         }
  //         }}
  //       >
  //         {IMAGE_CONST.PLUS_ICON}
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }
  onDonePressed() {
    let classTypeArray = this.state.classTypeArray;
    let classSelected = [];
    for (let index = 0; index < classTypeArray.length; index++) {
      classSelected.push(classTypeArray[index].isSelected);
    }
    this.props.onDonePressed(
      classTypeArray,
      classSelected,
      this.state.travellersCount
    );
  }

  onClassTypeSelected(item, index) {
    let classTypeArray = this.state.classTypeArray;
    for(i=0; i<classTypeArray.length; i++){
      if(classTypeArray[i].class == item.class){
        classTypeArray[i].isSelected = true
      }else{
        classTypeArray[i].isSelected = false
      }
    }
    this.setState({
      classTypeArray: classTypeArray,
    });
  }

  renderListItem(item, index) {
    return (
      <TouchableOpacity
        style={{ flexDirection: "row", marginVertical: verticalScale(15) }}
        onPress={() => {this.onClassTypeSelected(item, index);}}
      >
        <TouchableOpacity
          onPress={() => {this.onClassTypeSelected(item, index);}}
        >
          <MaterialIcon
            name={
              item.isSelected ? "radiobox-marked" : "radiobox-blank"
            }
            size={verticalScale(22)}
            color={
              item.isSelected ? colours.lightBlueTheme : colours.lightGreyish
            }
          />
        </TouchableOpacity>
        <Text
          style={[styles.membershipSubListTextStyle, { marginLeft: scale(12) }]}
        >
          {item.class}
        </Text>
      </TouchableOpacity>
    );
  }

  getClassType() {
    return (
      <View>
        <FlatList
          data={this.state.classTypeArray}
          renderItem={({ item, index }) => {
            return this.renderListItem(item, index);
          }}
        />
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
          <View style={styles.classModalContainer}>
            <View style={{ margin: scale(20) }}>
              <View
                style={styles.modalInnerContainer}
              >
                <Text
                  style={{
                    fontFamily: STRING_CONST.appFonts.INTER_BOLD,
                    fontSize: scale(16),
                    color: colours.darkBlueTheme,
                    fontWeight:'bold'
                  }}
                >
                  {STRING_CONST.PASSENGERS} | {STRING_CONST.CABIN_CLASS}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.props.onCrossPressed();
                  }}
                >
                  <FastImage
                    style={{
                      justifyContent: "flex-end",
                      height:verticalScale(28), width:scale(28)
                    }}
                    source={IMAGE_CONST.CROSS_ICON}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.travellersCountViewStyle}>
              <FastImage
                source={IMAGE_CONST.LIGHT_BLUE_USER}
                resizeMode="cover"
                style={styles.passengerIcon}
              />
                {this.getTravellersCountView()}
              </View>
              <View
                style={{
                  borderBottomWidth: 0.6,
                  borderBottomColor: colours.borderBottomLineColor,
                }}
              />
              {this.getClassType()}

              <CustomButton
                textSize={scale(18)}
                buttonColor={colours.lightBlueTheme}
                textColor={colours.white}
                textOnButton={"Done"}
                onButtonPress={() => this.onDonePressed()}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
