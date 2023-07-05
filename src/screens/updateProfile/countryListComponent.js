import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TouchableHighlight,
  Keyboard,
} from "react-native";
import styles from "./UpdateProfileStyles";
import * as IMAGE_CONST from "../../constants/ImageConst";
import scale from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import { TextInput, FlatList, ScrollView } from "react-native-gesture-handler";
import { LOCATION_NOT_AVAILABLE } from "../../constants/StringConst";
import * as STR_CONST from "../../constants/StringConst";
import FastImage from 'react-native-fast-image'

export default class CountryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationsObject: this.props.route.params.locationObject,
      searchedList: this.props.route.params.locationObject,
      searchText: "",
      selectedCountry: this.props.route.params.selectedCountry,
    };
  }

  renderCrossIcon() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.goBack();
        }}
        style={styles.crossIconButton}
      >
        <FastImage
          style={styles.crossIconImage}
          source={IMAGE_CONST.DARK_BLUE_CROSS_ICON}
        />
      </TouchableOpacity>
    );
  }
  onSearch(searchText) {
    this.setState({ searchText });
    const { locationsObject } = this.state;
    let searchedList = locationsObject.filter((item) => {
      let fullName = item.name.toLowerCase();
      return fullName.includes(searchText.toLowerCase());
    });
    this.setState({
      searchText,
      searchedList,
    });
  }

  renderSearchView() {
    return (
      <View style={styles.searchView}>
        <TextInput
        underlineColorAndroid="transparent"
          placeholder={STR_CONST.SEARCH_LOCATION}
          placeholderTextColor={colours.lightGreyish}
          style={styles.searchTextInput}
          onChangeText={(searchText) => {
            this.onSearch(searchText);
          }}
        />
      </View>
    );
  }

  componentDidMount() {}

  renderListItem(itemObject, index) {
    return (
      <View>
        <TouchableHighlight
          onPress={() => {
            Keyboard.dismiss();
            this.props.route.params.onCountrySelected(itemObject);
            this.props.navigation.goBack();
          }}
          activeOpacity={1}
          underlayColor={colours.dimLightBlueBackgroundColor}
          style={[
            styles.airwaysTile,
            {
              backgroundColor:
                itemObject.id == this.state.selectedCountry.id
                  ? colours.dimLightBlueBackgroundColor
                  : colours.white,
            },
          ]}
        >
          <Text style={styles.airwaysText}>{itemObject.name}</Text>
        </TouchableHighlight>
      </View>
    );
  }

  renderList() {


    // console.log("yes chekcing list here #######")
    return (
      <View style={{ marginHorizontal: scale(10) }}>
        {this.state.searchedList && this.state.searchedList.length !== 0 ? (
          <FlatList
            keyboardShouldPersistTaps="always"
            data={this.state.searchedList}
            renderItem={({ item, index }) => {
              return this.renderListItem(item, index);
            }}
          />
        ) : (
          <View style={styles.noLocationView}>
            <FastImage
              style={styles.noLocationImage}
              source={IMAGE_CONST.NO_LOCATION_AVAILABLE}
            />
            <Text style={styles.noLocationText}>{LOCATION_NOT_AVAILABLE}</Text>
          </View>
        )}
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colours.white,
        }}
      >
        <ScrollView
          style={styles.countryListContainer}
          keyboardShouldPersistTaps={"always"}
        >
          {this.renderCrossIcon()}
          {this.renderSearchView()}
          {this.renderList()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
