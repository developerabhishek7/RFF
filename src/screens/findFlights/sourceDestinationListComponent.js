import React, { Component,Fragment } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TouchableHighlight,
  Keyboard,
  TextInput, FlatList, ScrollView ,
Platform} from "react-native";
import SvgUri from 'react-native-svg-uri';
import styles from "./findFlightStyles";
import * as IMAGE_CONST from "../../constants/ImageConst";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import { Dimensions } from 'react-native';
import * as STRING_CONST from "../../constants/StringConst";
import FastImage from 'react-native-fast-image'
import {SVG_URL} from '../../helpers/config'
const { height, width } = Dimensions.get('window');
import { appFonts, LOCATION_NOT_AVAILABLE } from "../../constants/StringConst";
import ScreenHeader from "../../components/header/Header";
export default class SourceDestinationListComponent extends Component {
  constructor(props) {
    super(props);
    let locationData = []
    let singleAirportArray = []
    let multipleAirportArray = []

    const { locationsObject, type, sourceSelected, allLocations } = this.props.route.params
    
    // console.log("yes check on source destination findflight screen locaiton Object ---------------- ",locationsObject)
    // console.log("yes check on source destination findflight screen all Location ---------------- ",allLocations)
  
    if (locationsObject && allLocations ) {
      if (type === 'destination') {
        let destinationList = Object.keys(locationsObject)
        destinationList.map((item, index) => {
          if (sourceSelected.code == locationsObject[item].code) {
            for (let i = 0; i < locationsObject[item].connections.length; i++) {
              for (let j = 0; j < allLocations.length; j++) {
                if (locationsObject[item].connections[i] == allLocations[j].code) {
                  if (allLocations[j].airports.length > 1) {
                    multipleAirportArray.push(allLocations[j])
                  } else {
                    singleAirportArray.push(allLocations[j])
                  }
                }
              }
            }

            locationData = [...singleAirportArray, ...multipleAirportArray]
          }
        })
      } else {
        let destinationList = Object.keys(locationsObject)
        destinationList.map((item, index) => {
          if (locationsObject[item].airports.length > 1) {
            multipleAirportArray.push(locationsObject[item])
          } else {
            singleAirportArray.push(locationsObject[item])
          }

        })
        locationData = [...singleAirportArray, ...multipleAirportArray]
      }
    }

    this.state = {
      locationsObject: locationData,
      searchedList: locationData,
      searchText: "",
      cityIsLondon: "",
      screenType:this.props.route.params.screenType,
      selectedLocation: this.props.route.params.selectedLocation,
    };
  }

  renderCrossIcon() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.goBack();
        }}
        style={styles.membershipScreenCrossIconStyle}
      >
        <FastImage
          style={{
            justifyContent: "flex-end",
            height: scale(18),
            width: scale(18)
          }}
          source={IMAGE_CONST.DARK_BLUE_CROSS_ICON}
        />
      </TouchableOpacity>
    );
  }
  onSearch(searchText) {
    this.setState({ searchText });
    const { locationsObject } = this.state
    let searchedList = locationsObject.filter((item) => {
      let code = ''
      item.airports.map((item) => {
        code = code.concat(`${item.code} `)
      })
      let fullName = `${item.code}-${item.city_name} (${item.country_name}) ${code}`.toLowerCase()
      return fullName.includes(searchText.toLowerCase())
    })
    this.setState({
      searchText,
      searchedList
    })

  }

  renderSearchView() {
    return (
      <View style={styles.searchMembershipStyle}>
        <TextInput
        underlineColorAndroid="transparent"
          placeholder={this.props.route.params.placeholderTitle}
          placeholderTextColor={colours.lightGreyish}
          style={{ fontWeight: "600", paddingVertical: verticalScale(15), fontSize: scale(14) }}
          onChangeText={(searchText) => {
            this.onSearch(searchText)
          }}
        />
      </View>
    );
  }


  getLocationText(itemObject, countryName) {
    if (itemObject.type == 'airport') {
      return `${itemObject.city_name} (${itemObject.code})`
    }
    return `${itemObject.city_name} (${countryName})`
  }

  renderListItem = (itemObject, index) => {
    let countryName = ''
    if (itemObject && itemObject.airports && itemObject.airports.length > 1) {
      countryName = itemObject.airports.map((item, index) => {
        return item.code
      }).join(', ')
      hasMultiple = true
    } else {
      countryName = itemObject.country_name
    }

 
    return (
      <View>
        {itemObject.airports &&
        <Fragment>
          <View style={{flexDirection:"row",borderBottomWidth:0.9,borderBottomColor:"#DDDDDD"}} >
            {
              this.state.screenType ?
              <View style={{marginTop:scale(16),margin:scale(4)}}> 
              <SvgUri
               width={scale(20)}
               height={scale(20)}
               source={{uri:`${SVG_URL}${itemObject.country_code}.svg`}}
             /> 
          </View> 
              : null
            }
            
          <TouchableHighlight onPress={() => {
            Keyboard.dismiss();
            this.props.route.params.onSourceSelected(itemObject)
            this.props.navigation.goBack();
          }}
            activeOpacity={1}
             underlayColor={colours.dimLightBlueBackgroundColor}
            style={{ marginTop: verticalScale(10), borderRadius: scale(5), paddingHorizontal: scale(10),
            width:scale(290),borderWidth:0, 
            paddingVertical: verticalScale(10), backgroundColor: this.state.selectedLocation && this.state.selectedLocation.code == itemObject.code ? colours.dimLightBlueBackgroundColor : "#FFF" }}>
               <Text style={styles.membershipSubListTextStyle}>{this.getLocationText(itemObject, countryName)} </Text>
          </TouchableHighlight>
          </View>
          </Fragment>
          }
         
      </View>
    );
  }
  getSortedList() {
    let locationList = this.state.searchedList
    let sortedList = locationList.sort((x, y) => {
      return (x.city_name > y.city_name) ? 1 : -1;
    })
    return sortedList
  }

  renderList = () => {
    return (
      <View style={{ marginHorizontal: scale(10) }}>
        {
          this.state.searchedList && this.state.searchedList.length !== 0 ? <FlatList
            keyboardShouldPersistTaps='always'
            data={this.getSortedList()}
            renderItem={({ item, index }) => { 
              if (item.code == "LON") {                          
                return this.renderListItem(item, index);
              }
            }}
          /> : <View style={{ justifyContent: 'center', alignItems: 'center', height: height - 200 }}>
            <FastImage
              style={{
                justifyContent: "flex-end",
                height: scale(94), width: scale(106)
              }}
              source={IMAGE_CONST.NO_LOCATION_AVAILABLE}
            />
            <Text style={{
              color: colours.lightGreyish,
              fontSize: scale(14),
              fontFamily: appFonts.INTER_REGULAR,
              fontWeight: '500',
              marginTop: verticalScale(20)
            }}>
              {LOCATION_NOT_AVAILABLE}
            </Text>
          </View>

        }
      </View>
    );
  }

  // for testing purpose only...    

  renderList1 = () => {
    return (
      <View style={{ marginHorizontal: scale(10) }}>
        {
          this.state.searchedList && this.state.searchedList.length !== 0 ? <FlatList
            keyboardShouldPersistTaps='always'
            data={this.getSortedList()}
            renderItem={({ item, index }) => {
              if (item.code != "LON") {
                return this.renderListItem(item, index);
              }
            }}
          /> : <View style={{ justifyContent: 'center', alignItems: 'center', height: height - 200 }}>
            <FastImage
              style={{
                justifyContent: "flex-end",
                height: scale(94), width: scale(106)
              }}
              source={IMAGE_CONST.NO_LOCATION_AVAILABLE}
            />
            <Text style={{
              color: colours.lightGreyish,
              fontSize: scale(14),
              fontFamily: appFonts.INTER_REGULAR,
              fontWeight: '500',
              marginTop: verticalScale(20)
            }}>
              {LOCATION_NOT_AVAILABLE}
            </Text>
          </View>
        }
      </View>
    );
  }


  renderListForFindFlight = () => {
    return (
      <View style={{ marginHorizontal: scale(10) }}>
        {
          this.state.searchedList && this.state.searchedList.length !== 0 ? <FlatList
            keyboardShouldPersistTaps='always'
            data={this.getSortedList()}
            renderItem={({ item, index }) => {                                                
                return this.renderListItem(item, index);
            }}
          /> : <View style={{ justifyContent: 'center', alignItems: 'center', height: height - 200 }}>
            <FastImage
              style={{
                justifyContent: "flex-end",
                height: scale(94), width: scale(106)
              }}
              source={IMAGE_CONST.NO_LOCATION_AVAILABLE}
            />
            <Text style={{
              color: colours.lightGreyish,
              fontSize: scale(14),
              fontFamily: appFonts.INTER_REGULAR,
              fontWeight: '500',
              marginTop: verticalScale(20)
            }}>
              {LOCATION_NOT_AVAILABLE}
            </Text>
          </View>

        }
      </View>
    );
  }

multipleCitiesTxt (){
  return (
    <View style={{borderWidth:0,borderColor:"red"}}>
        <Text
            style={{
              color: colours.white,
              fontSize: scale(13),width:width*0.9,
              fontFamily: appFonts.INTER_REGULAR,
              marginStart:scale(24),
              fontWeight: '500', alignSelf: 'center',
              marginTop: verticalScale(10),
              marginBottom: verticalScale(30),
            }}
          >We only let you choose hubs with flights to more than one place</Text>
          <Text
            style={{
              color: colours.gray, fontSize: scale(13), marginStart: scale(30), fontFamily: appFonts.INTER_SEMI_BOLD,
              alignSelf: 'flex-start', marginTop: verticalScale(6), marginBottom: verticalScale(1),
            }}
          >CIties with multiple airports</Text>

    </View>
  )
}
singleCityTxt () {
  return(
    <View>
       <Text
            style={{
              color: colours.gray, fontSize: scale(13), marginStart: scale(15), fontFamily: appFonts.INTER_SEMI_BOLD, fontWeight: '500', alignSelf: 'flex-start',
              marginTop: verticalScale(30), marginBottom: verticalScale(1),
            }}
          >Cities with one airport</Text>
    </View>
  )
}

renderHeader() {
  const {screenType} = this.state
  return (
   <View style={{backgroundColor:"#03B2D8",height:scale(190),borderBottomLeftRadius:scale(25),borderBottomRightRadius:scale(25),width:"100%",
      marginTop:Platform.OS=="ios"?scale(-60):scale(-15)
   }}>
      <View style={{justifyContent:"space-between",alignSelf:"center",width:"92%",flexDirection:"row",marginTop:scale(40)}}>
      <TouchableOpacity onPress={() => {
            this.props.navigation.goBack() }}>

{IMAGE_CONST.IOS_BACK_ARROW}

      </TouchableOpacity>
          <Text style={{fontSize:scale(20),fontWeight:"700",padding:scale(10),color:"#FFF"}}>Search Destination</Text>
          <Text>       </Text>
         </View>
         <View style={{marginTop:scale(5),backgroundColor:"#42c5e2",width:scale(330),alignSelf:"center",flexDirection:"row",borderWidth:0,borderRadius:scale(10)}}>
         <TouchableOpacity style={{width:scale(42),borderEndEndRadius:scale(10),borderTopRightRadius:scale(10),marginStart:scale(10),borderBottomEndRadius:scale(10),alignSelf:"flex-end"}}>
            <FastImage source={require("../../assets/findFlight/search.png")} resizeMode="contain" style={{height:scale(25),width:scale(25),margin:scale(10)}} />
            </TouchableOpacity>
            <TextInput 
               onChangeText={(searchText) => {
                this.onSearch(searchText)
              }}
              placeholder={this.props.route.params.placeholderTitle}              placeholderTextColor="#FFFFFF"
              style={{height:scale(40),paddingStart:scale(0),color:"#FFF",width:scale(280),borderRadius:scale(10),fontWeight:"700"}}  />
         </View>

         {
          !screenType ?
          <Fragment>
          {this.multipleCitiesTxt()}
          </Fragment>
          : null
         }
   </View>
  );
}



  render() {
    const {screenType} = this.state; 
    return (
      <SafeAreaView style={styles.container}>

         {this.renderHeader()}
        <ScrollView style={styles.outerViewStyle} keyboardShouldPersistTaps={'always'}>
          {/* {this.renderCrossIcon()} */}
         

          {/* {this.renderSearchView()} */}
          {
            screenType ?
            <Fragment>
              {this.renderListForFindFlight()}
            </Fragment>
            : 
            <Fragment>
              <View style={{marginTop:scale(40)}}>
              {/* {this.multipleCitiesTxt()} */}
              {this.renderList()}
              {this.singleCityTxt()}
              {this.renderList1()}
              </View>
            </Fragment>
          }        
        </ScrollView>
      </SafeAreaView>
    );
  }
}
