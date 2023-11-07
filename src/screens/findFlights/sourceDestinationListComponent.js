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
import MyStatusBar from "../../components/statusbar";

export default class SourceDestinationListComponent extends Component {
  constructor(props) {
    super(props);
    let locationData = []
    let singleAirportArray = []
    let multipleAirportArray = []
    this.state={
      isOnFocus:false
    }
    const { locationsObject, type, sourceSelected, allLocations,headerTxt,travelTo } = this.props.route.params
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
            justifyContent: STRING_CONST.FLEX_END,
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
    if (itemObject && itemObject.airports && itemObject.airports.length > 0) {
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
          <View style={styles.sourceDestinationView} >
            <View style={{justifyContent:STRING_CONST.CENTER,alignContent:STRING_CONST.CENTER,}}> 
              <View style={{borderRadius:scale(40),flexWrap:"wrap"}}>
              <SvgUri
               width={scale(20)}
               height={scale(20)}
               borderRadius={(scale(40))}
               source={{uri:`${SVG_URL}${itemObject.country_code}.svg`}}
             /> 
             </View>
            </View> 
          <TouchableHighlight onPress={() => {
            Keyboard.dismiss();
            this.props.route.params.onSourceSelected(itemObject)
            this.props.navigation.goBack();
          }}
            activeOpacity={1}
             underlayColor={colours.dimLightBlueBackgroundColor}
              style={{ borderRadius: scale(5),
              justifyContent:"center",
              width:scale(290),borderWidth:0,
             backgroundColor: this.state.selectedLocation && this.state.selectedLocation.code == itemObject.code ? colours.dimLightBlueBackgroundColor : "#FFF" }}>
               <Text style={[styles.membershipSubListTextStyle,{
               }]}>
                {this.getLocationText(itemObject, countryName)} 
                </Text>
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
      <View style={{ marginHorizontal: scale(0),}}>

        {
          this.state.searchedList && this.state.searchedList.length !== 0 ?
          <Fragment>
              <Text
              style={styles.citiesWithMultipleAirpots}
            >{STRING_CONST.CITIES_WITH_MULTIPLE_AIRPOTS}</Text>
          <FlatList
            keyboardShouldPersistTaps='always'
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={this.getSortedList()}
            renderItem={({ item, index }) => { 
              if (item.code == "LON") {                          
                return this.renderListItem(item, index);
              }
            }}
          /> 
          
          </Fragment>: <View style={{ justifyContent: STRING_CONST.CENTER, alignItems: STRING_CONST.CENTER }}>
          <Image
              resizeMode="contain"
              style={{
                marginTop:scale(150),
                height: scale(220), 
                width: scale(220)
              }}
              source={IMAGE_CONST.NO_LOCATION_AVAILABLE}
            />
          </View>
        }
      </View>
    );
  }

  renderList1 = () => {
    return (
      <View style={{ marginHorizontal: scale(0) }}>
        {
          this.state.searchedList && this.state.searchedList.length !== 0 ? 
          <Fragment>
            <Text
             style={styles.citiesWithSingleAirpots}
            >{STRING_CONST.CITIES_WITH_SINGLE_AIRPOTS}</Text>
             <FlatList
            keyboardShouldPersistTaps='always'
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={this.getSortedList()}
            renderItem={({ item, index }) => {
              if (item.code != "LON") {
                return this.renderListItem(item, index);
              }
            }}
          />
          </Fragment>
          
          : null
        }
      </View>
    );
  }


  renderListForFindFlight = () => {
    return (
      <View style={{ marginHorizontal: scale(0)}}>
        {
          this.state.searchedList && this.state.searchedList.length !== 0 ? <FlatList
            keyboardShouldPersistTaps='always'
            extraData={this.getSortedList()}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={this.getSortedList()}
            renderItem={({ item, index }) => {                                                
                return this.renderListItem(item, index);
            }}
          /> : <View style={{ justifyContent: 'center', alignItems: 'center', }}>
            <Image
              resizeMode="contain"
              style={{
                marginTop:scale(200),
                height: scale(220), width: scale(220)
              }}
              source={IMAGE_CONST.NO_LOCATION_AVAILABLE}
            />
          </View>
        }
      </View>
    );
  }

multipleCitiesTxt (){
  const {screenType,} = this.state
  let travelTo  = this.props.route.params.travelTo
  let returnType = this.props.route.params.returnType
  return (
    <View style={{borderWidth:0,borderColor:"red"}}>
        <Text
            style={{
              color: colours.white,
              fontSize: scale(14),width:width*0.9,
              fontFamily: appFonts.INTER_REGULAR,
              marginStart:scale(24),
              alignSelf: 'center',
              fontWeight:"400",
              marginTop: verticalScale(10),
              marginBottom: verticalScale(30),
            }}
          >
            {
              returnType == 1 ?
              <Fragment>
              {`We only let you choose hubs with flights ${travelTo ? "to" : "from"} more than one place`}
              </Fragment>
              :
              <Fragment>
              {`We only let you choose airports with BA operated flights ${travelTo ? "to" : "from"} more than one place`}
              </Fragment>
            }
            </Text>
    </View>
  )
}
singleCityTxt () {
  return(
    <View>
      {
         this.state.searchedList ?
         <Text
             style={styles.citiesWithSingleAirpots}
          >{STRING_CONST.CITIES_WITH_SINGLE_AIRPOTS}</Text>
         : null
      }
      
    </View>
  )
}

renderHeader() {
  const {screenType,searchText} = this.state
  let headerTxt  = this.props.route.params.headerTxt
  return (
   <View style={[styles.sourceDestinationHeader,{
    height:screenType ? scale(180) : scale(210),
   }]}>
      <View style={styles.headerSubView}>
      <TouchableOpacity
      style = {{marginTop: scale(10),}}
      onPress={() => {
            this.props.navigation.goBack()}}>
        {IMAGE_CONST.IOS_BACK_ARROW}
      </TouchableOpacity>
          <Text style={{marginTop: scale(4), fontSize:scale(20),fontWeight:"700",padding:scale(10),color:"#FFF"}}>{headerTxt ? "My Home Airport" :  "Search Destination"}</Text>
          <Text>    </Text>
         </View>
         <View style={styles.sourceHeaderSubView}>
         <TouchableOpacity style={{width:scale(42),borderEndEndRadius:scale(10),borderTopRightRadius:scale(10),marginStart:scale(10),borderBottomEndRadius:scale(10),alignSelf:"flex-end"}}>
            <FastImage source={require("../../assets/findFlight/search.png")}
            resizeMode="contain" style={styles.searchHeader} />
            </TouchableOpacity>
            <TextInput 
               onChangeText={(searchText) => {
                this.onSearch(searchText)
              }}
              value={this.state.searchText}
              placeholder= {headerTxt ? headerTxt : this.props.route.params.placeholderTitle}              
              onFocus={()=>{
                this.setState({
                    isOnFocus:!this.state.isOnFocus
                })
              }}
              placeholderTextColor={this.state.isOnFocus ? "gray" : "#FFF"}
              style={styles.sourceHeaderInput}  
              />
                {
                  this.state.searchText ? 
                  <TouchableOpacity
                  onPress={()=>{
                    this.setState({
                      searchText:""
                    })
                    setTimeout(() => {
                      this.renderList()
                    }, 100);
                  }}
                 style={{marginStart:scale(-50),margin:scale(6),marginTop:scale(10)}}>
                 </TouchableOpacity>
                  : 
                  null
                }  
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
        <MyStatusBar />
         {this.renderHeader()}
        <ScrollView
         showsVerticalScrollIndicator={false}
         showsHorizontalScrollIndicator={false}
         style={styles.outerViewStyle} keyboardShouldPersistTaps={'always'}>
          {
            screenType ?
            <View >
              {this.renderListForFindFlight()}
            </View>
            : 
            <Fragment>
              <View style={{marginTop:scale(40)}}>
              {this.renderList()}
              {this.renderList1()}
              </View>
            </Fragment>
          }        
        </ScrollView>
      </SafeAreaView>
    );
  }
}
