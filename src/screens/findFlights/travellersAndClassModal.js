import React, { Component, Fragment } from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground,Alert } from "react-native";
import styles from "./findFlightStyles";
import * as IMAGE_CONST from "../../constants/ImageConst";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import { FlatList } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import * as STRING_CONST from "../../constants/StringConst";
import MaterialIcon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import CustomButton from "../../components/customComponents/CustomButton";
import FastImage from 'react-native-fast-image'
import * as RootNavigation from '../../router/RouteNavigation';

export default class TravellersAndClassModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      showClassModal:this.props.showClassModal,
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
      <View style={{ flexDirection: "row", alignItems: "center",marginStart:scale(10) }}>
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
            { marginHorizontal: scale(12),
              textAlign:"center",
              paddingStart:scale(0), },
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
  // this.props.navigation.navigate("MembershipContainerScreen")}
  redirectToMembershipFunction() {
    Alert.alert(
      'Upgrade to Silver or Gold membership to see availability for all cabin classes',
      [{text: 'Upgrade',onPress: ()=>{console.log("yes printing -  - -  - ")}}],
      {cancelable: false},
    );
  }

navigateToMembership(){
  this.props.onCrossPressed();
  RootNavigation.navigationRef.navigate("MembershipContainerScreen")
}


  showAlert1() {  
    Alert.alert(  
        '',  
        'Upgrade to Silver or Gold membership to see availability for all cabin classes',  
        [  
            {  
                text: 'Cancel',  
                onPress: () => console.log('Cancel Pressed'),  
                style: 'Cancel',  
            },  
            {text: 'Upgrade', onPress: () => this.navigateToMembership() },  
        ]  
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
    const {userData,showClassModal}  = this.props;
    let goldMember = userData.gold_member
    let silverMember = userData.silver_member
    let bronzeMember = userData.bronze_member

    return (
      <View>
        {
          showClassModal ?
          <View style={{flexDirection:"row",flexWrap:"wrap",alignSelf:"center",justifyContent:"space-around",borderWidth:0,width:scale(330)}}>
          {
            this.state.classTypeArray.map((item, index) => { 
                return (
                  <View>
                    <TouchableOpacity
                      style={{ backgroundColor:  item.class  == "Economy" ?
                      "#edf0ff" : item.class == "Premium Economy" ?
                      "#fef8ed" : item.class == "Business" ?
                      "#f8ebfe" : item.class == "First" ? 
                      "#fde8f1" : null,
                      borderColor:  item.class  == "Economy" ?
                      "#bfc9ff" : item.class == "Premium Economy" ?
                      "#fce1b3" : item.class == "Business" ?
                      "#d7a1f0" : item.class == "First" ? 
                      "#f9b9d4" : null,
                      borderRadius:scale(10),marginVertical: verticalScale(5),alignItems:"center",borderWidth:0,width:scale(152),marginStart:scale(1),marginEnd:scale(1),height:scale(120) }}
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
                          else{
                           this.showAlert1()
                          }
                        }
                        else if(item.class == "Business"){
                          if(!bronzeMember){
                            if(isEconomySelected || isPremiumSelected || isFirstSelected) { 
                              this.onClassTypeSelected(item, index);
                            }
                          }
                          else{
                           this.showAlert1()
                          }
                        }
                        else if(item.class == "First"){
                          if(!bronzeMember){
                            if(isEconomySelected || isPremiumSelected || isBusinessSelected) { 
                              this.onClassTypeSelected(item, index);
                            }
                          }
                          else{
                           this.showAlert1()
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
                            else{
                             this.showAlert1()
                            }
                          }
                          else if(item.class == "Business"){
                            if(!bronzeMember){
                              if(isEconomySelected || isPremiumSelected || isFirstSelected) { 
                                this.onClassTypeSelected(item, index);
                              }
                            }
                            else{
                             this.showAlert1()
                            }
                          }
                          else if(item.class == "First"){
                            if(!bronzeMember){
                              if(isEconomySelected || isPremiumSelected || isBusinessSelected) { 
                                this.onClassTypeSelected(item, index);
                              }
                            }
                            else{
                             this.showAlert1()
                            }
                          }
                        }}
                      >
                      <View style={{alignSelf:"flex-end",justifyContent:"flex-end",marginTop:scale(5),marginStart:scale(90)}}>
                       {/* {
                          item.class == "Economy" ?
                          <MaterialIcon
                          name={
                            item.isSelected ? "checkbox-marked" : "checkbox-blank-outline"
                          }
                          size={verticalScale(22)}
                          color={
                            item.isSelected ? "#2044ff" : colours.lightGreyish
                          }
                        />
                        : item.class == "Premium Economy" ? 
                        <MaterialIcon
                        name={
                          item.isSelected ? "checkbox-marked" : "checkbox-blank-outline"
                        }
                        size={verticalScale(22)}
                        color={
                          item.isSelected ? "#f8a41e": colours.lightGreyish
                        }
                      />
                      : item.class == "Business" ?
                      <MaterialIcon
                      name={
                        item.isSelected ? "checkbox-marked" : "checkbox-blank-outline"
                      }
                      size={verticalScale(22)}
                      color={
                        item.isSelected ? "#af49de" : colours.lightGreyish
                      }
                    />
                    : item.class = "First" ? 
                    <MaterialIcon
                    name={
                      item.isSelected ? "checkbox-marked" : "checkbox-blank-outline"
                    }
                    size={verticalScale(22)}
                    color={
                      item.isSelected ? "#eb186f" : colours.lightGreyish
                    }
                  />
                  : null
                } */}
                        <MaterialIcon
                            name={
                              item.isSelected ? "checkbox-marked-circle" : "radiobox-blank"
                            }
                          size={verticalScale(22)}
                        
                          color={
                            item.class == "Economy" ?
                            item.isSelected ? "#2044ff" : colours.lightGreyish :
                            item.class == "Premium Economy" ?
                            item.isSelected ? "#f8a41e" : colours.lightGreyish :
                            item.class == "Business" ? 
                            item.isSelected ? "#af49de" : colours.lightGreyish :
                            item.class == "First" ? 
                            item.isSelected ? "#eb186f" : colours.lightGreyish :
                             null
                          }
                        />
                        </View>
                      </TouchableOpacity>
                      <View style={{flexDirection:"column",margin:scale(1)}}>
                      <ImageBackground
                        source={
                          item.class  == "Economy" ?
                          IMAGE_CONST.ECONOMYC : item.class == "Premium Economy" ?
                          IMAGE_CONST.PREMIUMC : item.class == "Business" ?
                          IMAGE_CONST.BUSINESSC : item.class == "First" ? 
                          IMAGE_CONST.FIRSTC : null
                        }
                        resizeMode="contain"
                        style={{height:scale(40),width:scale(40),alignSelf:"center",justifyContent:"center",alignItems:"center"}}
                      >
                      </ImageBackground>
                      <Text
                        style={[styles.membershipSubListTextStyle, { marginLeft: scale(12),marginTop:scale(10),marginBottom:scale(7) }]}
                      >
                        {item.class == "First" ? "First Class " :  item.class == "Premium Economy" ? "Prem Econ" : item.class }
                      </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )                       
            })
          }
          </View>
          : 
          null
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
                    marginStart:scale(13),
                    color: "#132C52",
                    fontWeight: '600'
                  }}
                >{travellersCount > 1 ? "Passengers " : "Passenger " } 
                {
                      this.state.showClassModal  ?
                      <Fragment>
                       | {STRING_CONST.CABIN_CLASS}
                      </Fragment>
                      : null
                }
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.props.onCrossPressed();
                  }}
                  style={{ paddingHorizontal: scale(10) }}
                >
                  <FastImage
                    style={{
                      justifyContent: "flex-end",
                      height: verticalScale(28), width: scale(28)
                    }}
                    source={IMAGE_CONST.CROSS_ICON}
                  />
                </TouchableOpacity>
              </View>
              <View style={[styles.travellersCountViewStyle,{
                padding:scale(10),
                borderRadius:scale(4),
                backgroundColor:"#dff9fe"
              }]}>
               <View style={{flexDirection:"row",justifyContent:"center"}}>
                <FastImage
                  source={IMAGE_CONST.LIGHT_BLUE_USER}
                  resizeMode="cover"
                  style={styles.passengerIcon}
                />
                {
                  !this.state.showClassModal  ?
                  <Text
                  style={{
                    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
                    fontSize: scale(14),
                    color: colours.darkBlueTheme,
                    fontWeight: 'bold',
                    paddingStart:scale(9)
                    
                  }}
                >{travellersCount > 1 ? "Passengers " : "Passenger"} 
                </Text>
                  :   <Text
                  style={{
                    fontFamily: STRING_CONST.appFonts.INTER_REGULAR,
                    fontSize: scale(14),
                    color: colours.darkBlueTheme,
                    fontWeight: 'bold',
                    paddingStart:scale(9)
                    
                  }}
                >{travellersCount > 1 ? "Passengers " : "Passenger"} 
                </Text>
                }
                 </View>
                {this.getTravellersCountView()}
              </View>
              {/* <View
                style={{
                  borderBottomWidth: 0.6,              
                  borderBottomColor: colours.borderBottomLineColor,
                  flexDirection:"row",
                }}
              /> */}
              {this.getClassType()}
              <TouchableOpacity 
                  onPress={()=>{
                    this.onDonePressed()
                  }}
                  style={styles.doneButton}>    
                  <Text style={styles.doneTxt}> Done </Text>
              </TouchableOpacity>
              {/* <CustomButton
                textSize={scale(18)}
                buttonColor={colours.lightBlueTheme}
                textColor={colours.white}
                textOnButton={"Done"}
                onButtonPress={() => this.onDonePressed()}
              /> */}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
