import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./findFlightStyles";
import * as IMAGE_CONST from "../../constants/ImageConst";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import { FlatList } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import * as STRING_CONST from "../../constants/StringConst";
import MaterialIcon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import CustomButton from "../../components/customComponents/CustomButton";

export default class TravellersAndClassModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      travellersCount:
        this.props.travellersCount !== 0 ? this.props.travellersCount : 1,
      classTypeArray: this.props.selectedClassObject ? this.props.selectedClassObject : [
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




  getTravellersCountView() {
    const {travellersCount} = this.state
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
           style={[styles.travellersCountButtonStyle,{
            backgroundColor:travellersCount > 1 ? colours.lightBlueTheme : colours.lightGreyish,
          }]}
          onPress={() => {
            if (this.state.travellersCount > 1) {
              this.setState({
                travellersCount: this.state.travellersCount - 1,
              });
            }
          }}
        >
          {IMAGE_CONST.MINUS_ICON}
        </TouchableOpacity>
        <Text
          style={[
            styles.membershipSubListTextStyle,
            { marginHorizontal: scale(12) },
          ]}
        >
          {this.state.travellersCount}
        </Text>
        <TouchableOpacity
          style={[styles.travellersCountButtonStyle,{
            backgroundColor:travellersCount < 6 ? colours.lightBlueTheme : colours.lightGreyish,
          }]}
          onPress={() => {
            if (this.state.travellersCount < 6) {
              this.setState({
                travellersCount: this.state.travellersCount + 1,
              });
            }
          }}
        >
          {IMAGE_CONST.PLUS_ICON}
        </TouchableOpacity>
      </View>
    );
  }
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
    classTypeArray[index].isSelected = !classTypeArray[index].isSelected;
    this.setState({
      classTypeArray: classTypeArray,
    });
  }

  renderListItem(item, index) {
    return (
      <TouchableOpacity
        style={{ flexDirection: "row", marginVertical: verticalScale(15) }}
        onPress={() => {
          this.onClassTypeSelected(item, index);
        }}
      >
        <TouchableOpacity
          onPress={() => { this.onClassTypeSelected(item, index); }}
        >
          <MaterialIcon
            name={
              item.isSelected ? "checkbox-marked" : "checkbox-blank-outline"
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

    let economy = this.state.classTypeArray[0].class
    let isEconomySelected = this.state.classTypeArray[0].isSelected

    let premium = this.state.classTypeArray[1].class
    let isPremiumSelected = this.state.classTypeArray[1].isSelected

    let business = this.state.classTypeArray[2].class
    let isBusinessSelected = this.state.classTypeArray[2].isSelected

    let first = this.state.classTypeArray[3].class
    let isFirstSelected = this.state.classTypeArray[3].isSelected


    const {userData}  = this.props;



    let goldMember = userData.gold_member
    let silverMember = userData.silver_member
    let bronzeMember = userData.bronze_member



    return (
      <View>
        {/* <FlatList
          data={this.state.classTypeArray}
          renderItem={({ item, index }) => {
            return this.renderListItem(item, index);
          }}
        /> */}
        {
          this.state.classTypeArray.map((item, index) => {   
              return (
                <View>
                  <TouchableOpacity
                    style={{ flexDirection: "row", marginVertical: verticalScale(15),alignItems:"center",borderWidth:0,borderColor:"gray",width:scale(130) }}
                    onPress={() => {
                      if(item.class == "Economy") { 
                        if(isPremiumSelected || isBusinessSelected || isFirstSelected) { 
                          this.onClassTypeSelected(item, index);
                        }
                      }
                      else if(item.class == "Premium Economy") { 
                        if(!bronzeMember){
                          if(isEconomySelected || isBusinessSelected || isFirstSelected) { 
                            this.onClassTypeSelected(item, index);
                          }
                        }
                      }
                      else if(item.class == "Business"){
                        if(!bronzeMember){
                          if(isEconomySelected || isPremiumSelected || isFirstSelected) { 
                            this.onClassTypeSelected(item, index);
                          }
                        }
                      
                      }
                      else if(item.class == "First"){
                        if(!bronzeMember){
                          if(isEconomySelected || isPremiumSelected || isBusinessSelected) { 
                            this.onClassTypeSelected(item, index);
                          }
                        }
                      }
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        if(item.class == "Economy") { 
                          if(isPremiumSelected || isBusinessSelected || isFirstSelected) { 
                            this.onClassTypeSelected(item, index);
                          }
                        }
                        else if(item.class == "Premium Economy") { 
                          if(!bronzeMember){
                            if(isEconomySelected || isBusinessSelected || isFirstSelected) { 
                              this.onClassTypeSelected(item, index);
                            }
                          }
                        
                        
                        }
                        else if(item.class == "Business"){
                          if(!bronzeMember){
                            if(isEconomySelected || isPremiumSelected || isFirstSelected) { 
                              this.onClassTypeSelected(item, index);
                            }
                          }
                        
                        }
                        else if(item.class == "First"){
                          if(!bronzeMember){
                            if(isEconomySelected || isPremiumSelected || isBusinessSelected) { 
                              this.onClassTypeSelected(item, index);
                            }
                          }
                        }
                      }}
                    >
                      <MaterialIcon
                        name={
                          item.isSelected ? "checkbox-marked" : "checkbox-blank-outline"
                        }
                        size={verticalScale(22)}
                        color={
                          item.isSelected ? colours.lightBlueTheme : colours.lightGreyish
                        }
                      />
                    </TouchableOpacity>
                    <Text
                      style={[styles.membershipSubListTextStyle, { marginLeft: scale(12),marginTop:scale(1) }]}
                    >
                      {item.class}
                    </Text>
                  </TouchableOpacity>
                </View>
              )                       
          })
        }
      </View>
    );
  }

  render() {

    const {travellersCount} = this.state;

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
                    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
                    fontSize: scale(16),
                    color: colours.darkBlueTheme,
                    fontWeight: 'bold'
                  }}
                >{travellersCount > 1 ? "Passengers" : "Passenger"} | {STRING_CONST.CABIN_CLASS}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.props.onCrossPressed();
                  }}
                  style={{ paddingHorizontal: scale(10) }}
                >
                  <Image
                    style={{
                      justifyContent: "flex-end",
                      height: verticalScale(28), width: scale(28)
                    }}
                    source={IMAGE_CONST.CROSS_ICON}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.travellersCountViewStyle}>
                <Image
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
