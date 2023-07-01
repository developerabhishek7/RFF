import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TouchableHighlight,
  Keyboard,
  BackHandler
} from "react-native";
import styles from "./findFlightStyles";
import * as IMAGE_CONST from "../../constants/ImageConst";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import { TextInput, FlatList, ScrollView } from "react-native-gesture-handler";
import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');
import { appFonts, LOCATION_NOT_AVAILABLE } from "../../constants/StringConst";

export default class SourceDestinationListComponent extends Component {
  constructor(props) {
    super(props);
    let locationData = []
    let singleAirportArray = []
    let multipleAirportArray = []

    const { locationsObject, type, sourceSelected, allLocations } = this.props.route.params
    console.log("yes check here on source detinatoin flightdetails screen Object data #######   ",locationsObject)
    console.log("yes check here on source detinatoin flightdetails screen Object data of all location  #######   ",allLocations)
    
    if (locationsObject && allLocations) {
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
        <Image
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

  getLocationText(itemObject, countryName) {
    if (itemObject.type == 'airport') {
      return `${itemObject.city_name} (${itemObject.code})`
    }
    return `${itemObject.city_name} (${countryName})`
  }

  renderListItem(itemObject, index) {
    let countryName = ''
    if (itemObject && itemObject.airports && itemObject.airports.length > 1) {
      countryName = itemObject.airports.map((item, index) => {
        return item.code
      }).join(',')
      hasMultiple = true
    } else {
      countryName = itemObject.country_name
    }
    return (
      <View>
        {itemObject.airports &&
          <TouchableHighlight onPress={() => {
            Keyboard.dismiss();
            this.props.route.params.onSourceSelected(itemObject)
            this.props.navigation.goBack();
          }}
            activeOpacity={1} underlayColor={colours.dimLightBlueBackgroundColor}
            style={{ marginTop: verticalScale(10), borderRadius: scale(5), paddingHorizontal: scale(10), paddingVertical: verticalScale(10), backgroundColor: this.state.selectedLocation && this.state.selectedLocation.code == itemObject.code ? colours.dimLightBlueBackgroundColor : colours.white }}>
            <Text style={styles.membershipSubListTextStyle}>{this.getLocationText(itemObject, countryName)} </Text>
          </TouchableHighlight>}

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

  renderList() {
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
            <Image
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

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.outerViewStyle} keyboardShouldPersistTaps={'always'}>
          {this.renderCrossIcon()}
          {this.renderSearchView()}
          {this.renderList()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
