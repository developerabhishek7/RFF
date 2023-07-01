import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TouchableHighlight,
  BackHandler
} from "react-native";
import styles from "./findFlightStyles";
import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');
import * as IMAGE_CONST from "../../constants/ImageConst";
import scale, { verticalScale } from "../../helpers/scale";
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
      airlineSelected: this.props.route.params.airlineSelected ? this.props.route.params.airlineSelected : {},
      tierSelected: this.props.route.params.tierSelected ? this.props.route.params.tierSelected : {}
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


  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );


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
          backgroundColor: (itemObject.airline == (airlineSelected.airline || getAirwaysDisplayName(airlineSelected))) && (item.value == (tierSelected.value || tierSelected)) ? colours.dimLightBlueBackgroundColor : ''
        }}>
        <Text style={styles.membershipSubListTextStyle}>{item.title}</Text>
      </TouchableHighlight>
    );
  }
  renderListItem(itemObject, index) {
    return (
      <View>
        {itemObject.airline == BRITISH_AIRWAYS && <View style={{ marginTop: verticalScale(20) }}>
          <View style={styles.airlineContainer}>
            <Image source={getAirlinesLogo(BRITISH_AIRWAYS)} style={{ marginRight: scale(10) }} />
            <Text style={styles.membershipListTextStyle}>{itemObject.airline}</Text>
          </View>
          <FlatList
            keyboardShouldPersistTaps='always'
            data={itemObject.memberships}
            renderItem={({ item, index }) => {
              return this.renderSubListItem(item, index, itemObject);
            }}
          />
        </View>}
      </View>
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
            <Image
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
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.outerViewStyle} keyboardShouldPersistTaps='always'>
          {this.renderCrossIcon()}
          {this.renderSearchView()}
          {this.renderList()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
