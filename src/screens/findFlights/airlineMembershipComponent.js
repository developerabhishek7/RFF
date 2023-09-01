import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TouchableHighlight,
  Dimensions,
  BackHandler,
  Platform,
  
} from "react-native";
import styles from "./findFlightStyles";
const { height, width } = Dimensions.get('window');
import * as IMAGE_CONST from "../../constants/ImageConst";
import scale, { verticalScale } from "../../helpers/scale";
import ScreenHeader from "../../components/header/Header";
import FastImage from 'react-native-fast-image'

import { colours } from "../../constants/ColorConst";
import { TextInput, FlatList, ScrollView } from "react-native-gesture-handler";
import { appFonts, AIRLINE_NOT_AVAILABLE, BRITISH_AIRWAYS } from "../../constants/StringConst";
import { getAirlinesLogo, getAirwaysDisplayName } from "../../utils/commonMethods";
export default class AirlineMembershipComponent extends Component {
  constructor(props) {
    super(props);
    airlineMembershipData = this.props.route.params.airLinesMembershipDetailsObject
    this.state = {
      airLinesMembershipDetailsObject: airlineMembershipData,
      searchedList: airlineMembershipData,
      searchText: "",
      isOpenDialog:true,
      airlineSelected: this.props.route.params.airlineSelected ? this.props.route.params.airlineSelected : {},
      tierSelected: this.props.route.params.tierSelected  ? this.props.route.params.tierSelected : {}
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );

  }


  handleBackButton = (nav) => {
    if (!nav.isFocused()) {
      BackHandler.removeEventListener('hardwareBackPress', () =>
        this.handleBackButton(this.props.navigation),
      );
      return false;
    } else {
      nav.goBack();
      return true;
    }
  };


  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
  }

  // renderCrossIcon() {
  //   return (
  //     <View style={{ justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
  //       <TouchableOpacity
  //         onPress={() => {
  //           this.props.navigation.goBack();
  //         }}
  //         style={styles.membershipScreenCrossIconStyle}
  //       >
  //         <Image
  //           style={{
  //             justifyContent: "flex-end",
  //             height: scale(22),
  //             width: scale(22)
  //           }}
  //           source={require("../../assets/common/back1.png")}
  //         />
  //       </TouchableOpacity>
  //       <View>
  //         <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 10 }}> Airline Membership Tier </Text>
  //       </View>
  //     </View>
  //   );
  // }


  renderHeader(){
    return(
      <View style={{alignItems:"center",backgroundColor:"#03B2D8",height:scale(110),width:"100%",marginTop:Platform.OS == "android" ? scale(-20) :scale(-60),borderBottomLeftRadius:scale(30),borderBottomRightRadius:scale(30),marginBottom:scale(20)}}>
        <View style={{marginTop:scale(40)}}>
        <ScreenHeader
          {...this.props}
          left
          title={"Airline Membership Tier"}
          notifCount={2}
          clickOnLeft={() => this.props.navigation.goBack()}
        />
        </View>
      </View>
    )
  }


  onSearch(searchText) {
    this.setState({ searchText });
    const { airLinesMembershipDetailsObject } = this.state
    let searchedList = airLinesMembershipDetailsObject.filter((item) => {
      let airlineName = `${item.airline}`.toLowerCase()
      if (airlineName.includes(searchText.toLowerCase())) {
        return true
      } else {
      }
      return false
    })
    this.setState({
      searchText,
      searchedList
    })

  }

  renderSearchView() {
    const { airLinesMembershipDetailsObject } = this.state
    return (
      <View style={styles.searchMembershipStyle}>
        <TextInput
          placeholder={"Airline/Membership"}
          underlineColorAndroid="transparent"
          placeholderTextColor={colours.lightGreyish}
          style={{ fontWeight: "600", paddingVertical: verticalScale(15), fontSize: scale(14) }}
          onChangeText={(searchText) => {
            if (airLinesMembershipDetailsObject) {
              this.onSearch(searchText)
            }
          }}
        />
      </View>
    );
  }

  onItemPress(itemObject, item) {
    this.props.route.params.onMembershipSelected(itemObject, item)
    this.props.navigation.goBack();

  }

  renderSubListItem(item, index, itemObject) {
    const { airlineSelected, tierSelected } = this.state
    // console.log("check here on item render ####### ",tierSelected      ,airlineSelected )
    return (
      <TouchableHighlight
        onPress={() => {
          this.onItemPress(itemObject, item)
        }}
        activeOpacity={1}
        underlayColor={colours.dimLightBlueBackgroundColor}
        style={{
          borderRadius: scale(5),
          paddingHorizontal: scale(10),
          paddingVertical: verticalScale(10),
          marginTop: verticalScale(5),
          width: width * 0.72,
         
          backgroundColor: (itemObject.airline == (airlineSelected.airline || getAirwaysDisplayName(airlineSelected))) && (item.value == (tierSelected.value || tierSelected)) ? colours.dimSkyBlueColor : ''
        }}>
          {
            item.value == "blue"  ?
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>

            <Text style={styles.membershipSubListTextStyle}>{item.title}</Text>
            <Text style={styles.membershipSubListTextStyle}>(Choose if Unsure)</Text>
            {
               item.value == tierSelected ?
               <Image
               source={require('../../assets/common/rightCheck.png')}
               style={styles.tickMark}
               resizeMode="contain"
             />
               : null
            }
           
            </View>
            :
            item.value == tierSelected ?
              <View style={{flexDirection:"row",justifyContent:"space-between"}}>
             <Text style={styles.membershipSubListTextStyle}>{item.title}</Text>
              <FastImage
               resizeMode="contain"
               source={require('../../assets/common/rightCheck.png')}
              style={styles.tickMark}
            />
              </View>
            :
            <Text style={styles.membershipSubListTextStyle}>{item.title}</Text>
          }
        {/* <Text style={styles.membershipSubListTextStyle}>{item.title}</Text> */}
      </TouchableHighlight>
    );
  }

  renderListItem(itemObject, index) {
    const {tierSelected,isOpenDialog} = this.state;

    console.log("yes check here - - - - - - ",tierSelected)
    

    return (
      <TouchableOpacity onPress={()=>{
        this.setState({isOpenDialog:!this.state.isOpenDialog})
      }} >
        
      <View >
        {itemObject.airline == BRITISH_AIRWAYS && <View style={{ marginTop: verticalScale(20) }}>
            <View style={styles.airlineContainer}>
            <FastImage source={getAirlinesLogo(BRITISH_AIRWAYS)} resizeMode="contain" style={{ marginRight: scale(10),height:scale(20),width:scale(40) }} />
            <Text style={styles.membershipListTextStyle}>{itemObject.airline}</Text>
            {tierSelected ?
              <View style={{ backgroundColor: colours.lightBlueTheme, borderRadius: 13, marginStart: 13, }}>
                <Text style={styles.membershipListTextStyle1} >{`${tierSelected.title ?  tierSelected.title : tierSelected}`}
                </Text>
              </View>
              : null} 
              {
                isOpenDialog  ?
                <FastImage resizeMode="contain" source={require("../../assets/up1.png")} style={{width:scale(13),height:scale(13),marginStart:Platform.OS == "android" ? scale(20) : scale(5)}} />
                :
                <FastImage resizeMode="contain" source={require("../../assets/down1.png")} style={{width:scale(13),height:scale(13),marginStart:Platform.OS == "android" ? scale(20) : scale(5)}} />
              }
              </View>
                {
                  this.state.isOpenDialog ?
                      <FlatList
                      keyboardShouldPersistTaps='always'
                      data={itemObject.memberships}
                      renderItem={({ item, index }) => {
                        return this.renderSubListItem(item, index, itemObject);
                      }}
                    />
                  : null
                }
        </View>}
      </View>
       </TouchableOpacity>
    );
  }

  renderList() {
    return (
      <View style={{ marginHorizontal: scale(20), flex: 1 }}>
        {
          this.state.searchedList && this.state.searchedList.length !== 0 ? <FlatList
            keyboardShouldPersistTaps='always'
            data={this.state.searchedList}
            renderItem={({ item, index }) => {
              return this.renderListItem(item, index);
            }}
          /> : <View style={{ justifyContent: 'center', alignItems: 'center', height: height - 200 }}>
            <FastImage
              style={{
                justifyContent: "flex-end",
                height: scale(94), width: scale(106)
              }}
              source={IMAGE_CONST.NO_AIRLINE_AVAILABLE}
            />
            <Text style={{
              color: colours.lightGreyish,
              fontSize: scale(14),
              fontFamily: appFonts.INTER_REGULAR,
              fontWeight: '500',
              marginTop: verticalScale(20)
            }}>
              {AIRLINE_NOT_AVAILABLE}
            </Text>
          </View>
        }
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1,borderWidth:0,borderColor:"green"}} >
        <SafeAreaView style={styles.container}>
          {this.renderHeader()}
          <ScrollView style={styles.outerViewStyle} keyboardShouldPersistTaps='always'>
            {/* {this.renderCrossIcon()} */}
            
            <View style={{ justifyContent: 'center', alignItems: 'center', margin: scale(9), marginStart: scale(16), marginTop: scale(21), marginBottom: -scale(9), }}>
              <Text style={{ color: "gray", fontFamily: appFonts.INTER_SEMI_BOLD, fontSize: scale(13), alignSelf: "flex-start", paddingStart: scale(4) }}>{"Select Your Airline Membership Tier"}</Text>
            </View>
            {/* {this.renderSearchView()} */}
            {this.renderList()}
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
