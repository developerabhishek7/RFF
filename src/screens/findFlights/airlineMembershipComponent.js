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
  FlatList, ScrollView
} from "react-native";
import styles from "./findFlightStyles";
const { height, width } = Dimensions.get('window');
import * as IMAGE_CONST from "../../constants/ImageConst";
import scale, { verticalScale } from "../../helpers/scale";
import ScreenHeader from "../../components/header/Header";
import FastImage from 'react-native-fast-image'
import { colours } from "../../constants/ColorConst";
import { appFonts, AIRLINE_NOT_AVAILABLE, BRITISH_AIRWAYS } from "../../constants/StringConst";
import { getAirlinesLogo, getAirwaysDisplayName } from "../../utils/commonMethods";
import * as STRING_CONST from "../../constants/StringConst";
import MyStatusBar from "../../components/statusbar";
export default class AirlineMembershipComponent extends Component {
  constructor(props) {
    super(props);
    airlineMembershipData = this.props.route.params.airLinesMembershipDetailsObject
    this.state = {
      airLinesMembershipDetailsObject: airlineMembershipData,
      searchedList: airlineMembershipData,
      searchText: "",
      isOpenDialog: true,
      airlineSelected: this.props.route.params.airlineSelected ? this.props.route.params.airlineSelected : {},
      tierSelected: this.props.route.params.tierSelected ? this.props.route.params.tierSelected : {}
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

  renderHeader() {
    return (
      <View style={styles.headerMainView}>
        <View style={{ marginTop: Platform.OS == "android" ? scale(16) : scale(40) }}>
          <ScreenHeader
            {...this.props}
            left
            title={STRING_CONST.AIRLINE_MEMBERSHIP_TIERS}
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
          width: width * 0.72,

          backgroundColor: (itemObject.airline == (airlineSelected.airline || getAirwaysDisplayName(airlineSelected))) && (item.value == (tierSelected.value || tierSelected)) ? colours.dimSkyBlueColor : ''
        }}>
        {
          item.value == "blue" ?
            <View style={{ flexDirection:STRING_CONST.ROW, justifyContent: STRING_CONST.SPACE_BETWEEN }}>

              <Text style={styles.membershipSubListTextStyle}>{item.title}</Text>
              <Text style={styles.membershipSubListTextStyle}>({STRING_CONST.CHOOSE_IF_UNSURE})</Text>
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
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
      </TouchableHighlight>
    );
  }

  renderListItem(itemObject, index) {
    const { tierSelected, isOpenDialog } = this.state;

    return (
      <TouchableOpacity onPress={() => {
        this.setState({ isOpenDialog: !this.state.isOpenDialog })
      }} >

        <View >
          {itemObject.airline == BRITISH_AIRWAYS && <View style={{ marginTop: verticalScale(20) }}>
            <View style={styles.airlineContainer}>
              <FastImage source={getAirlinesLogo(BRITISH_AIRWAYS)} resizeMode="contain" style={styles.baIMGStyle} />
              <Text style={styles.membershipListTextStyle}>{itemObject.airline}</Text>
              {tierSelected ?
                <View style={{ backgroundColor: colours.lightBlueTheme, borderRadius: scale(12), marginStart: scale(10), }}>
                  <Text style={styles.membershipListTextStyle1} >{`${tierSelected.title ? tierSelected.title : tierSelected}`}
                  </Text>
                </View>
                : null}
              {
                isOpenDialog ?
                  <FastImage resizeMode="contain" source={require("../../assets/up1.png")} style={{ width: scale(13), height: scale(13), marginStart: Platform.OS == "android" ? scale(20) : scale(5) }} />
                  :
                  <FastImage resizeMode="contain" source={require("../../assets/down1.png")} style={{ width: scale(13), height: scale(13), marginStart: Platform.OS == "android" ? scale(20) : scale(5) }} />
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
      <View style={styles.renderListStyle}>
        {
          this.state.searchedList && this.state.searchedList.length !== 0 ? <FlatList
            keyboardShouldPersistTaps='always'
            data={this.state.searchedList}
            renderItem={({ item, index }) => {
              return this.renderListItem(item, index);
            }}
          /> : <View style={{ justifyContent: STRING_CONST.CENTER, alignItems: STRING_CONST.CENTER, height: height - 200 }}>
            <FastImage
              style={styles.noAirlineAvailableIMG}
              source={IMAGE_CONST.NO_AIRLINE_AVAILABLE}
            />
            <Text style={styles.noAirlineAvailable}>
              {AIRLINE_NOT_AVAILABLE}
            </Text>
          </View>
        }
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1}} >
        <SafeAreaView style={styles.container}>
          <MyStatusBar />
          {this.renderHeader()}
          <ScrollView style={styles.outerViewStyle} keyboardShouldPersistTaps='always'>
            <View style={styles.membershipView}>
              <Text style={styles.membershipText}>{STRING_CONST.SELECT_YOUR_AIRLINE_MEMBERSHIP}</Text>
            </View>
            {this.renderList()}
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
