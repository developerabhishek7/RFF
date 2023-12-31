import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Validators from "../../helpers/Validator";
import ScreenHeader from "../../components/header/Header";
import * as STRING_CONST from "../../constants/StringConst";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import styles from "./UpdateProfileStyles";
import * as IMG_CONST from "../../constants/ImageConst";
import * as STR_CONST from "../../constants/StringConst";
import CustomButton from "../../components/customComponents/CustomButton";
import { isEmptyString, getCountryCodes } from "../../utils/commonMethods";
import ModalDropdown from "react-native-modal-dropdown";
import { postcodeValidator } from "postcode-validator";
import FastImage from 'react-native-fast-image'

export default class UpdateProfileComponent extends Component {
  constructor(props) {
    super(props);
    const { userData } = this.props;
    this.state = {
      firstName: userData.first_name  ? first_name : "",
      lastName: userData.last_name ? last_name : "" ,
      addressLine1: this.props.userData.address
        ? this.props.userData.address.address1
        : "",
      addressLine2: this.props.userData.address
        ? this.props.userData.address.address2
        : "",
      selectedCountry: userData.address
        ? this.getCountryObject(userData.address.country)
        : "",
      selectedState: userData.address ? userData.address.state : "",
      selectedCity: userData.address ? userData.address.city : "",
      ageBand: this.getDataObject(userData.age_band, STR_CONST.ageBandOption),
      gender: this.getDataObject(userData.gender, STR_CONST.genderOptions),
      departureCity: this.props.userData.address
        ? this.getDepartureCityObject(
            JSON.parse(this.props.userData.address.airpot_city)
          )
        : "",
      flightsTakenAnnually: this.getDataObject(
        userData.flights_taken_annually,
        STR_CONST.approxNumberFlights
      ),
      travellingAbroadInNext12Months: this.getDataObject(
        userData.travelling_abroad_in_next_12_months,
        STR_CONST.travelAbroadOptions
      ),
      postCode: userData.address ? userData.address.zip : "",
      departureLocationList: this.props.departureLocationList,
      addFileURI: this.props.userData.image,
      submitPressed: false,
      pickerCustomButton: [],
      showBorder: 0,
      countryListArray: [],
      stateListArray: userData.address
        ? this.onCountrySelected(
            this.getCountryObject(userData.address.country)
          )
        : [],
      cityListArray: [],
      countryArray: STR_CONST.COUNTRY_ARRAY,
    };
  }

  getDataObject(data, dataArray) {
    if (data) {
      let dataObject = {};
      dataArray.map((item) => {
        if (item.value == data) {
          dataObject = item;
        }
      });
      return dataObject;
    }
    return "";
  }

  getCountryObject(countryCode) {
    let countryObject = {};
    this.props.countryList.map((item) => {
      if (item.sortname == countryCode) {
        countryObject = item;
      }
    });
    return countryObject;
  }

  getCityObject(city) {
    let cityObject = {};
    this.props.cityList &&
      this.props.cityList.map((item) => {
        if (item.name == city) {
          cityObject = item;
        }
      });
    return cityObject;
  }

  getDepartureCityObject(departureCity) {
    let userSelectedCityObject = {};
    this.props.departureLocationList.map((item) => {
      if (item.code == departureCity.value) {
        userSelectedCityObject = item;
      }
    });
    return userSelectedCityObject;
  }

  submitData() {
    this.setState({
      submitPressed: true,
    });
    const {
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      selectedCountry,
      selectedState,
      selectedCity,
      postCode,
      departureCity,
      ageBand,
      gender,
      travellingAbroadInNext12Months,
      flightsTakenAnnually,
    } = this.state;
    let userFirstName = firstName.trim();
    let userLastName = lastName.trim();
    let userAddressLine1 = addressLine1.trim();
    let userAddressLine2 = addressLine2.trim();
    let userPostCode = postCode.trim();

    if (
      Validators.validName(userFirstName) &&
      Validators.validName(userLastName) &&
      !isEmptyString(userAddressLine1) &&
      // !isEmptyString(userAddressLine2) &&
      selectedCountry &&
      // selectedState &&
      selectedCity &&
      userPostCode &&
      postcodeValidator(userPostCode, selectedCountry.sortname) &&
      // departureCity &&
      ageBand &&
      // gender &&
      travellingAbroadInNext12Months &&
      flightsTakenAnnually
    ) {
      var userInfo = {};
      userInfo["first_name"] = firstName;
      userInfo["last_name"] = lastName;
      userInfo["address1"] = addressLine1;
      addressLine2.length !== 0 ? userInfo["address2"] = addressLine2 : null;
      userInfo["country"] = selectedCountry.sortname;
      selectedState ? userInfo["state"] = selectedState : null;
      userInfo["city"] = selectedCity;
      userInfo["postal_code"] = postCode;      
      departureCity ?  userInfo["airpot_city"] = JSON.stringify({
        name: `${departureCity.name} (${departureCity.code})`,
        value: departureCity.code,
      }) : null;
      userInfo["age_band"] = ageBand.value;
      gender ? userInfo["gender"] = gender.value : null;
      userInfo["flights_taken_annually"] = flightsTakenAnnually.value;
      userInfo["travelling_abroad_in_next_12_months"] =
        travellingAbroadInNext12Months.value;     
      this.props.updateUserDataAction(userInfo);
      this.setState({
        submitPressed: false,
      });
    }
  }
  getPreferedCountryList() {
    let countryList = this.props.countryList;
    let preferedCountryArray = getCountryCodes();
    let countryListObjectArray = [];
    countryList.map((country) => {
      preferedCountryArray.map((item) => {
        if (country.name == item.label) {
          countryListObjectArray.push(country);
        }
      });
    });
    this.setState({
      countryListArray: countryListObjectArray,
    });
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.getPreferedCountryList();
    // }, 1000);   
    let userData = this.props.userData;

    if (userData.image && !isEmptyString(userData.image)) {
      this.setState({
        pickerCustomButton: [{ name: "Remove", title: STR_CONST.REMOVE_PHOTO }],
      });
    }
    if (!isEmptyString(userData.country)) {
      this.state.countryListArray.map((item, index) => {
        if (item.sortname.toUpperCase() == userData.address.country) {
          this.setState({
            selectedCountry: countryListArray[index].name,
          });
        }
      });
    }
    const { navigation } = this.props;
    this.willFocusSubscription = navigation.addListener(
      "willFocus",
      this.componentWillFocus.bind(this)
    );
  }

  async componentWillFocus() {
    this.props.getUserInfoAction();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      let userData = this.props.userData 
      this.setState({
        addFileURI: this.props.userData.image,
      });
      if (userData && (userData.first_name !== prevProps.userData.first_name && userData.last_name !== prevProps.userData.last_name)) {
        const { first_name,last_name, image } = this.props.userData
        this.setState({
          firstName: first_name ? first_name : "",
          lastName: last_name ? last_name : "",
          addFileURI: image,
        });
      }
      if (this.props.userData.image) {
        this.setState({
          pickerCustomButton: [
            { name: "Remove", title: STR_CONST.REMOVE_PHOTO },
          ],
        });
      } else if (!this.props.userData.image) {
        this.setState({ pickerCustomButton: [] });
      }
    }
  }

  renderBottomButton(buttonText, onPressCallBack) {
    return (
      <View style={[styles.bottomButtonContainer]}>
        <CustomButton
          textSize={scale(14)}
          buttonColor={colours.lightBlueTheme}
          textColor={colours.white}
          textOnButton={buttonText}
          onButtonPress={() => onPressCallBack()}
        />
      </View>
    );
  }

  renderHeader() {
    return (
      <View style={{ marginHorizontal: scale(15) }}>
        <ScreenHeader
          {...this.props}
          title={STR_CONST.PERSONAL_INFO}
          notifCount={2}
        />
      </View>
    );
  }

  renderRow(option) {
    return (
      <View style={{ padding: scale(15) }}>
        <Text style={{ fontSize: scale(14), color: colours.darkBlueTheme }}>
          {option.label}
        </Text>
      </View>
    );
  }

  renderButton(buttonText, onPress) {
    return (
      <View
        style={{
          marginTop: verticalScale(35),
          marginBottom: verticalScale(15),
        }}
      >
        <CustomButton
          textOnButton={buttonText}
          textSize={scale(18)}
          onButtonPress={() => {
            onPress();
          }}
          buttonColor={colours.lightBlueTheme}
          buttonStyle={[styles.buttonStyle]}
          textColor={colours.white}
        />
      </View>
    );
  }

  onCountrySelected(selectedCountry) {
    let stateList = this.props.stateList;
    let selectedCountryStateListArray = [];
    // stateList.map((item) => {
    //   if (selectedCountry.id == item.country_id) {
    //     selectedCountryStateListArray.push(item);
    //   }
    // });
    this.setState({
      stateListArray: selectedCountryStateListArray,
    });
    return selectedCountryStateListArray;
  }

  onStateSelected(selectedState) {
    this.setState({ selectedState });
    let cityList = this.props.cityList;
    let selectedStateCityListArray = [];
    cityList.map((item) => {
      if (selectedState.id == item.state_id) {
        selectedStateCityListArray.push(item);
      }
    });
    this.setState({
      cityListArray: selectedStateCityListArray,
    });
    return selectedStateCityListArray;
  }
  validateName(name) {
    if (name.length < 2 || !Validators.validName(name)) {
      return false;
    }
    return true;
  }
  addressLineOne() {
    const { addressLine1, submitPressed } = this.state;
    return (
      <TouchableOpacity
        style={{ marginTop: verticalScale(32) }}
        onPress={() => {}}
      >
        <Text style={styles.textInputHeading}>
          {STRING_CONST.ADDRESS_LINE_1}
          <Text style={{ color: colours.redColor }}> *</Text>
        </Text>
        <View
          style={[
            styles.textInputView,
            {
              borderBottomColor:
                submitPressed && addressLine1.length < 5
                  ? colours.redColor
                  : colours.borderBottomLineColor,
            },
          ]}
        >
          <TextInput
          underlineColorAndroid="transparent"
            style={styles.textInput}
            placeholder=""
            autoCapitalize={"words"}
            onChangeText={(addressLine1) => {
              this.setState({ addressLine1 });
            }}
            value={addressLine1}
            onSubmitEditing={() => {
              this.lastName.focus();
            }}
            blurOnSubmit={false}
            maxLength={70}
          />
          <TouchableOpacity onPress={() => {}}>
            <FastImage source={IMG_CONST.EDIT_ICON} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  addressLineTwo() {
    const { addressLine2, submitPressed } = this.state;
    return (
      <TouchableOpacity
        style={{ marginTop: verticalScale(32) }}
        onPress={() => {}}
      >
        <Text style={styles.textInputHeading}>
          {STRING_CONST.ADDRESS_LINE_2}
        </Text>
        <View
          style={[
            styles.textInputView,
            {
              borderBottomColor: colours.borderBottomLineColor,
            },
          ]}
        >
          <TextInput
          underlineColorAndroid="transparent"
            style={styles.textInput}
            placeholder=""
            autoCapitalize={"words"}
            onChangeText={(addressLine2) => {
              this.setState({ addressLine2 });
            }}
            value={addressLine2}
            onSubmitEditing={() => {
              this.lastName.focus();
            }}
            blurOnSubmit={false}
            maxLength={70}
          />
          <TouchableOpacity onPress={() => {}}>
            <FastImage source={IMG_CONST.EDIT_ICON} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  addUserState() {
    const { selectedState, submitPressed, selectedCountry } = this.state;
    return (
      <TouchableOpacity
        style={{ marginTop: verticalScale(32) }}
        onPress={() => {}}
      >
        <Text style={styles.textInputHeading}>
          {STRING_CONST.STATE}
        </Text>
        <View
          style={[
            styles.textInputView,
            {
              borderBottomColor:colours.borderBottomLineColor,
            },
          ]}
        >
          <TextInput
          underlineColorAndroid="transparent"
            style={styles.textInput}
            placeholder=""
            autoCapitalize={"words"}
            onChangeText={(selectedState) => {
              this.setState({ selectedState });
            }}
            value={selectedState}
            blurOnSubmit={false}
            editable={selectedCountry !== ""}
          />
          <TouchableOpacity onPress={() => {}}>
            <FastImage source={IMG_CONST.EDIT_ICON} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  addUserCity() {
    const { selectedCountry, submitPressed, selectedCity } = this.state;
    return (
      <TouchableOpacity
        style={{ marginTop: verticalScale(32) }}
        onPress={() => {}}
      >
        <Text style={styles.textInputHeading}>
          {STRING_CONST.CITY}
          <Text style={{ color: colours.redColor }}> *</Text>
        </Text>
        <View
          style={[
            styles.textInputView,
            {
              borderBottomColor:
                submitPressed && selectedCity.length < 2
                  ? colours.redColor
                  : colours.borderBottomLineColor,
            },
          ]}
        >
          <TextInput
          underlineColorAndroid="transparent"
            style={styles.textInput}
            placeholder=""
            autoCapitalize={"words"}
            onChangeText={(selectedCity) => {
              this.setState({ selectedCity });
            }}
            value={selectedCity}
            blurOnSubmit={false}
            editable={selectedCountry !== ""}
          />
          <TouchableOpacity onPress={() => {}}>
            <FastImage source={IMG_CONST.EDIT_ICON} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  addUserPostCode() {
    const { postCode, submitPressed, selectedCountry } = this.state;
    return (
      <TouchableOpacity
        style={{ marginTop: verticalScale(32) }}
        onPress={() => {}}
      >
        <Text style={styles.textInputHeading}>
          {STRING_CONST.POST_CODE}
          <Text style={{ color: colours.redColor }}> *</Text>
        </Text>
        <View
          style={[
            styles.textInputView,
            {
              borderBottomColor:
                submitPressed &&
                (!selectedCountry.sortname ||
                  !postcodeValidator(postCode, selectedCountry.sortname))
                  ? colours.redColor
                  : colours.borderBottomLineColor,
            },
          ]}
        >
          <TextInput
          underlineColorAndroid="transparent"
            style={styles.textInput}
            placeholder=""
            autoCapitalize={"words"}
            onChangeText={(postCode) => {
              this.setState({ postCode });
            }}
            value={postCode}
            blurOnSubmit={false}
            editable={selectedCountry.sortname !== ""}
          />
          <TouchableOpacity onPress={() => {}}>
            <FastImage source={IMG_CONST.EDIT_ICON} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  addUserPreferenceLocation() {
    const { departureLocationList, submitPressed, departureCity } = this.state;
    return (
      <TouchableOpacity
        style={{ marginTop: verticalScale(32) }}
        onPress={() => {
          if (departureLocationList) {
            this.props.navigation.navigate(STRING_CONST.LOCATION_LIST_SCREEN, {
              type: "source",
              screenType:"Findflight",
              locationsObject: departureLocationList,
              placeholderTitle: STRING_CONST.WHERE_ARE_YOU_FLYING_FROM,
              allLocations: departureLocationList,
              sourceSelected: departureLocationList,
              onSourceSelected: (selectedSource) => {
                this.setState({
                  departureCity: selectedSource,
                });
              },
              selectedLocation: departureCity,
            });
          }
        }}
      >
        {departureCity ? (
          <Text style={styles.textInputHeading}>
            {STRING_CONST.PREFFERED_DEPARTURE}
          </Text>
        ) : null}
        <View
          style={[
            styles.textInputView,
            {
              borderBottomColor:colours.borderBottomLineColor,
            },
          ]}
        >
          <View
            style={[
              styles.countryView,
              {
                borderWidth: scale(0),
                borderBottomWidth: 0,
                borderTopWidth: 0,
              },
            ]}
          >
            {departureCity ? (
              <Text style={styles.countryDetailText}>
                {`${departureCity.city_name} (${departureCity.code})`}
              </Text>
            ) : (
              <Text style={styles.countryText}>
                {STRING_CONST.PREFFERED_DEPARTURE}
              </Text>
            )}

            {IMG_CONST.DARK_SORT_DOWN}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  addUserAge() {
    const { ageBand, submitPressed, showBorder } = this.state;
    return (
      <TouchableOpacity style={{ marginTop: verticalScale(32) }}>
        {ageBand ? (
          <Text style={styles.textInputHeading}>
            {STRING_CONST.AGE_BAND}
            <Text style={{ color: colours.redColor }}> *</Text>
          </Text>
        ) : null}
        <ModalDropdown
          onDropdownWillShow={() => {
            this.setState({
              showBorder: 1,
            });
          }}
          onDropdownWillHide={() => {
            this.setState({
              showBorder: 0,
            });
          }}
          options={STR_CONST.ageBandOption}
          style={[
            styles.textInputView,
            {
              marginTop: scale(5),
              borderBottomColor:
                submitPressed && !ageBand
                  ? colours.redColor
                  : colours.borderBottomLineColor,
            },
          ]}
          dropdownStyle={{
            width: scale(302),
            borderColor: colours.black,
            height: STR_CONST.ageBandOption.length * 40,
            borderTopWidth: 0.5,
          }}
          onSelect={(option) => {
            this.setState({
              ageBand: STR_CONST.ageBandOption[option],
            });
          }}
          renderRow={(option, index, isSelected) => {
            return this.renderRow(option);
          }}
        >
          <View
            style={[
              styles.countryView,
              {
                borderColor: showBorder == 1 ? colours.black : colours.white,
              },
            ]}
          >
            {ageBand ? (
              <Text style={styles.countryDetailText}>{ageBand.label}</Text>
            ) : (
              <Text style={styles.countryText}>
                {STRING_CONST.AGE_BAND}
                <Text style={{ color: colours.redColor }}> *</Text>
              </Text>
            )}

            {IMG_CONST.DARK_SORT_DOWN}
          </View>
        </ModalDropdown>
      </TouchableOpacity>
    );
  }

  addUserGender() {
    const { gender, submitPressed, showBorder } = this.state;
    return (
      <TouchableOpacity style={{ marginTop: verticalScale(32) }}>
        {gender ? (
          <Text style={styles.textInputHeading}>
            {STRING_CONST.GENDER}
          </Text>
        ) : null}
        <ModalDropdown
          onDropdownWillShow={() => {
            this.setState({
              showBorder: 2,
            });
          }}
          onDropdownWillHide={() => {
            this.setState({
              showBorder: 0,
            });
          }}
          options={STR_CONST.genderOptions}
          style={[
            styles.textInputView,
            {
              marginTop: scale(5),
              borderBottomColor:colours.borderBottomLineColor,
            },
          ]}
          dropdownStyle={{
            width: scale(302),
            borderColor: colours.black,
            height: STR_CONST.genderOptions.length * 40,
            borderTopWidth: 0.5,
          }}
          onSelect={(option) => {
            this.setState({
              gender: STR_CONST.genderOptions[option],
            });
          }}
          renderRow={(option, index, isSelected) => {
            return this.renderRow(option);
          }}
        >
          <View
            style={[
              styles.countryView,
              {
                borderColor: showBorder == 2 ? colours.black : colours.white,
              },
            ]}
          >
            {gender ? (
              <Text style={styles.countryDetailText}>{gender.label}</Text>
            ) : (
              <Text style={styles.countryText}>
                {STRING_CONST.GENDER}
              </Text>
            )}

            {IMG_CONST.DARK_SORT_DOWN}
          </View>
        </ModalDropdown>
      </TouchableOpacity>
    );
  }

  addUserFlightNumber() {
    const { flightsTakenAnnually, submitPressed, showBorder } = this.state;
    return (
      <TouchableOpacity style={{ marginTop: verticalScale(32) }}>
        {flightsTakenAnnually ? (
          <Text style={styles.textInputHeading}>
            {STRING_CONST.APPROX_FLIGHT_NUMBER}
            <Text style={{ color: colours.redColor }}> *</Text>
          </Text>
        ) : null}
        <ModalDropdown
          onDropdownWillShow={() => {
            this.setState({
              showBorder: 3,
            });
          }}
          onDropdownWillHide={() => {
            this.setState({
              showBorder: 0,
            });
          }}
          options={STR_CONST.approxNumberFlights}
          style={[
            styles.textInputView,
            {
              marginTop: scale(5),
              borderBottomColor:
                submitPressed && !flightsTakenAnnually
                  ? colours.redColor
                  : colours.borderBottomLineColor,
            },
          ]}
          dropdownStyle={{
            width: scale(302),
            borderColor: colours.black,
            height: STR_CONST.approxNumberFlights.length * 40,
            borderTopWidth: 0.5,
          }}
          onSelect={(option) => {
            this.setState({
              flightsTakenAnnually: STR_CONST.approxNumberFlights[option],
            });
          }}
          renderRow={(option, index, isSelected) => {
            return this.renderRow(option);
          }}
        >
          <View
            style={[
              styles.countryView,
              {
                borderColor: showBorder == 3 ? colours.black : colours.white,
              },
            ]}
          >
            {flightsTakenAnnually ? (
              <Text style={[styles.countryDetailText, { width: scale(250) }]}>
                {flightsTakenAnnually.label}
              </Text>
            ) : (
              <Text style={styles.countryText}>
                {STRING_CONST.APPROX_FLIGHT_NUMBER}
                <Text style={{ color: colours.redColor }}> *</Text>
              </Text>
            )}

            {IMG_CONST.DARK_SORT_DOWN}
          </View>
        </ModalDropdown>
      </TouchableOpacity>
    );
  }

  addUserTravelCount() {
    const {
      travellingAbroadInNext12Months,
      submitPressed,
      showBorder,
    } = this.state;
    return (
      <TouchableOpacity style={{ marginTop: verticalScale(32) }}>
        {travellingAbroadInNext12Months ? (
          <Text style={[styles.textInputHeading, { width: scale(290) }]}>
            {STRING_CONST.HOW_LIKELY_TO_TRAVEL_ABROAD}
            <Text style={{ color: colours.redColor }}> *</Text>
          </Text>
        ) : null}
        <ModalDropdown
          onDropdownWillShow={() => {
            this.setState({
              showBorder: 4,
            });
          }}
          onDropdownWillHide={() => {
            this.setState({
              showBorder: 0,
            });
          }}
          options={STR_CONST.travelAbroadOptions}
          style={[
            styles.textInputView,
            {
              marginTop: scale(5),
              borderBottomColor:
                submitPressed && !travellingAbroadInNext12Months
                  ? colours.redColor
                  : colours.borderBottomLineColor,
            },
          ]}
          dropdownStyle={{
            width: scale(302),
            borderColor: colours.black,
            height: STR_CONST.travelAbroadOptions.length * 40,
            borderTopWidth: 0.5,
          }}
          onSelect={(option) => {
            this.setState({
              travellingAbroadInNext12Months:
                STR_CONST.travelAbroadOptions[option],
            });
          }}
          renderRow={(option, index, isSelected) => {
            return this.renderRow(option);
          }}
        >
          <View
            style={[
              styles.countryView,
              {
                borderColor: showBorder == 4 ? colours.black : colours.white,
              },
            ]}
          >
            {travellingAbroadInNext12Months ? (
              <Text style={[styles.countryDetailText, { width: scale(250) }]}>
                {travellingAbroadInNext12Months.label}
              </Text>
            ) : (
              <Text style={[styles.countryText, { width: scale(250) }]}>
                {STRING_CONST.HOW_LIKELY_TO_TRAVEL_ABROAD}
                <Text style={{ color: colours.redColor }}> *</Text>
              </Text>
            )}

            {IMG_CONST.DARK_SORT_DOWN}
          </View>
        </ModalDropdown>
      </TouchableOpacity>
    );
  }


  render() {
    const {
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      selectedState,
      selectedCity,
      showBorder,
      selectedCountry,
      postCode,
      submitPressed,
    } = this.state;
    return (
      <SafeAreaView style={{ flex: 1}}>
        <ScrollView style={{ flex: 1, }} keyboardShouldPersistTaps="always">
          {this.renderHeader()}
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{ marginTop: verticalScale(32) }}
              onPress={() => {}}
            >
              <Text style={styles.textInputHeading}>
                {STRING_CONST.FIRST_NAME}
                <Text style={{ color: colours.redColor }}> *</Text>
              </Text>
              <View
                style={[
                  styles.textInputView,
                  {
                    borderBottomColor:
                      submitPressed && !this.validateName(firstName.trim())
                        ? colours.redColor
                        : colours.borderBottomLineColor,
                  },
                ]}
              >
                <TextInput
                underlineColorAndroid="transparent"
                  style={styles.textInput}
                  placeholder=""
                  autoCapitalize={"words"}
                  onChangeText={(firstName) => {
                    this.setState({ firstName });
                  }}
                  value={firstName}
                  onSubmitEditing={() => {
                    this.lastName.focus();
                  }}
                  blurOnSubmit={false}
                  maxLength={20}
                />
                <TouchableOpacity onPress={() => {}}>
                  <FastImage source={IMG_CONST.EDIT_ICON} style={styles.editIcon} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: verticalScale(32) }}
              onPress={() => {}}
            >
              <Text style={styles.textInputHeading}>
                {STRING_CONST.LAST_NAME}
                <Text style={{ color: colours.redColor }}> *</Text>
              </Text>
              <View
                style={[
                  styles.textInputView,
                  {
                    borderBottomColor:
                      submitPressed && !this.validateName(lastName.trim())
                        ? colours.redColor
                        : colours.borderBottomLineColor,
                  },
                ]}
              >
                <TextInput
                underlineColorAndroid="transparent"
                  style={styles.textInput}
                  ref={(input) => {
                    this.lastName = input;
                  }}
                  placeholder=""
                  autoCapitalize={"words"}
                  onChangeText={(lastName) => {
                    this.setState({ lastName });
                  }}
                  value={lastName}
                  onSubmitEditing={() => {}}
                  blurOnSubmit={false}
                  maxLength={20}
                />
                <TouchableOpacity onPress={() => {}}>
                  <FastImage source={IMG_CONST.EDIT_ICON} style={styles.editIcon} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            {this.addressLineOne()}
            {this.addressLineTwo()}
            {/* <TouchableOpacity
              style={{ marginTop: verticalScale(32) }}
              onPress={() => {}}
            >
              <Text style={styles.textInputHeading}>
                {STRING_CONST.ADDRESS_LINE_1}
                <Text style={{ color: colours.redColor }}> *</Text>
              </Text>
              <View
                style={[
                  styles.textInputView,
                  {
                    borderBottomColor:
                      submitPressed && addressLine1.length < 5
                        ? colours.redColor
                        : colours.borderBottomLineColor,
                  },
                ]}
              >
                <TextInput
                  style={styles.textInput}
                  placeholder=""
                  autoCapitalize={"words"}
                  onChangeText={(addressLine1) => {
                    this.setState({ addressLine1 });
                  }}
                  value={addressLine1}
                  onSubmitEditing={() => {
                    this.lastName.focus();
                  }}
                  blurOnSubmit={false}
                  maxLength={70}
                />
                <TouchableOpacity onPress={() => {}}>
                  <Image source={IMG_CONST.EDIT_ICON} style={styles.editIcon} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: verticalScale(32) }}
              onPress={() => {}}
            >
              <Text style={styles.textInputHeading}>
                {STRING_CONST.ADDRESS_LINE_2}
                <Text style={{ color: colours.redColor }}> *</Text>
              </Text>
              <View
                style={[
                  styles.textInputView,
                  {
                    borderBottomColor:
                      submitPressed && addressLine2.length < 2
                        ? colours.redColor
                        : colours.borderBottomLineColor,
                  },
                ]}
              >
                <TextInput
                  style={styles.textInput}
                  placeholder=""
                  autoCapitalize={"words"}
                  onChangeText={(addressLine2) => {
                    this.setState({ addressLine2 });
                  }}
                  value={addressLine2}
                  onSubmitEditing={() => {
                    this.lastName.focus();
                  }}
                  blurOnSubmit={false}
                  maxLength={70}
                />
                <TouchableOpacity onPress={() => {}}>
                  <Image source={IMG_CONST.EDIT_ICON} style={styles.editIcon} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity> */}

            <TouchableOpacity
              style={{ marginTop: verticalScale(32) }}
              onPress={() => {
                this.props.navigation.navigate(STR_CONST.COUNTRY_LIST_SCREEN, {
                  onCountrySelected: (selectedCountry) => {
                    this.onCountrySelected(selectedCountry);
                    this.setState({
                      selectedCountry,
                      selectedState: "",
                      selectedCity: "",
                    });
                  },
                  selectedCountry: selectedCountry,
                  locationObject: this.state.countryListArray,
                });
              }}
            >
              {selectedCountry ? (
                <Text style={styles.textInputHeading}>
                  {STRING_CONST.COUNTRY}
                  <Text style={{ color: colours.redColor }}> *</Text>
                </Text>
              ) : null}
              <View
                style={[
                  styles.textInputView,
                  {
                    borderBottomColor:
                      submitPressed && !selectedCountry
                        ? colours.redColor
                        : colours.borderBottomLineColor,
                  },
                ]}
              >
                <View
                  style={[
                    styles.countryView,
                    {
                      borderWidth: scale(0),
                      borderBottomWidth: 0,
                      borderTopWidth: 0,
                    },
                  ]}
                >
                  {selectedCountry ? (
                    <Text style={styles.countryDetailText}>
                      {selectedCountry.name}
                    </Text>
                  ) : (
                    <Text style={styles.countryText}>
                      {STRING_CONST.COUNTRY}
                      <Text style={{ color: colours.redColor }}> *</Text>
                    </Text>
                  )}
                  {IMG_CONST.DARK_SORT_DOWN}
                </View>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{ marginTop: verticalScale(32) }}
              onPress={() => {}}
            >
              <Text style={styles.textInputHeading}>
                {STRING_CONST.STATE}
                <Text style={{ color: colours.redColor }}> *</Text>
              </Text>
              <View
                style={[
                  styles.textInputView,
                  {
                    borderBottomColor:
                      submitPressed && selectedState.length < 2
                        ? colours.redColor
                        : colours.borderBottomLineColor,
                  },
                ]}
              >
                <TextInput
                  style={styles.textInput}
                  placeholder=""
                  autoCapitalize={"words"}
                  onChangeText={(selectedState) => {
                    this.setState({ selectedState });
                  }}
                  value={selectedState}
                  blurOnSubmit={false}
                  editable={selectedCountry !== ""}
                />
                <TouchableOpacity onPress={() => {}}>
                  <Image source={IMG_CONST.EDIT_ICON} style={styles.editIcon} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginTop: verticalScale(32) }}
              onPress={() => {}}
            >
              <Text style={styles.textInputHeading}>
                {STRING_CONST.CITY}
                <Text style={{ color: colours.redColor }}> *</Text>
              </Text>
              <View
                style={[
                  styles.textInputView,
                  {
                    borderBottomColor:
                      submitPressed && selectedCity.length < 2
                        ? colours.redColor
                        : colours.borderBottomLineColor,
                  },
                ]}
              >
                <TextInput
                  style={styles.textInput}
                  placeholder=""
                  autoCapitalize={"words"}
                  onChangeText={(selectedCity) => {
                    this.setState({ selectedCity });
                  }}
                  value={selectedCity}
                  blurOnSubmit={false}
                  editable={selectedState !== ""}
                />
                <TouchableOpacity onPress={() => {}}>
                  <Image source={IMG_CONST.EDIT_ICON} style={styles.editIcon} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginTop: verticalScale(32) }}
              onPress={() => {}}
            >
              <Text style={styles.textInputHeading}>
                {STRING_CONST.POST_CODE}
                <Text style={{ color: colours.redColor }}> *</Text>
              </Text>
              <View
                style={[
                  styles.textInputView,
                  {
                    borderBottomColor:
                      submitPressed &&
                      (!selectedCountry.sortname ||
                        !postcodeValidator(postCode, selectedCountry.sortname))
                        ? colours.redColor
                        : colours.borderBottomLineColor,
                  },
                ]}
              >
                <TextInput
                  style={styles.textInput}
                  placeholder=""
                  autoCapitalize={"words"}
                  onChangeText={(postCode) => {
                    this.setState({ postCode });
                  }}
                  value={postCode}
                  blurOnSubmit={false}
                  editable={selectedCountry.sortname !== ""}
                />
                <TouchableOpacity onPress={() => {}}>
                  <Image source={IMG_CONST.EDIT_ICON} style={styles.editIcon} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: verticalScale(32) }}
              onPress={() => {
                if (this.state.departureLocationList) {
                  this.props.navigation.navigate(
                    STRING_CONST.LOCATION_LIST_SCREEN,
                    {
                      type: "source",
                      locationsObject: this.state.departureLocationList,
                      placeholderTitle: STRING_CONST.WHERE_ARE_YOU_FLYING_FROM,
                      allLocations: this.state.departureLocationList,
                      sourceSelected: this.state.departureLocationList,
                      onSourceSelected: (selectedSource) => {
                        this.setState({
                          departureCity: selectedSource,
                        });
                      },
                      selectedLocation: this.state.departureCity,
                    }
                  );
                }
              }}
            >
              {this.state.departureCity ? (
                <Text style={styles.textInputHeading}>
                  {STRING_CONST.PREFFERED_DEPARTURE}
                  <Text style={{ color: colours.redColor }}> *</Text>
                </Text>
              ) : null}
              <View
                style={[
                  styles.textInputView,
                  {
                    borderBottomColor:
                      submitPressed && !this.state.departureCity
                        ? colours.redColor
                        : colours.borderBottomLineColor,
                  },
                ]}
              >
                <View
                  style={[
                    styles.countryView,
                    {
                      borderWidth: scale(0),
                      borderBottomWidth: 0,
                      borderTopWidth: 0,
                    },
                  ]}
                >
                  {this.state.departureCity ? (
                    <Text style={styles.countryDetailText}>
                      {`${this.state.departureCity.city_name} (${this.state.departureCity.code})`}
                    </Text>
                  ) : (
                    <Text style={styles.countryText}>
                      {STRING_CONST.PREFFERED_DEPARTURE}
                      <Text style={{ color: colours.redColor }}> *</Text>
                    </Text>
                  )}

                  {IMG_CONST.DARK_SORT_DOWN}
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: verticalScale(32) }}>
              {this.state.ageBand ? (
                <Text style={styles.textInputHeading}>
                  {STRING_CONST.AGE_BAND}
                  <Text style={{ color: colours.redColor }}> *</Text>
                </Text>
              ) : null}
              <ModalDropdown
                onDropdownWillShow={() => {
                  this.setState({
                    showBorder: 1,
                  });
                }}
                onDropdownWillHide={() => {
                  this.setState({
                    showBorder: 0,
                  });
                }}
                options={STR_CONST.ageBandOption}
                style={[
                  styles.textInputView,
                  {
                    marginTop: scale(5),
                    borderBottomColor:
                      submitPressed && !this.state.ageBand
                        ? colours.redColor
                        : colours.borderBottomLineColor,
                  },
                ]}
                dropdownStyle={{
                  width: scale(302),
                  borderColor: colours.black,
                  height: STR_CONST.ageBandOption.length * 40,
                  borderTopWidth: 0.5,
                }}
                onSelect={(option) => {
                  this.setState({
                    ageBand: STR_CONST.ageBandOption[option],
                  });
                }}
                renderRow={(option, index, isSelected) => {
                  return this.renderRow(option);
                }}
              >
                <View
                  style={[
                    styles.countryView,
                    {
                      borderColor:
                        showBorder == 1 ? colours.black : colours.white,
                    },
                  ]}
                >
                  {this.state.ageBand ? (
                    <Text style={styles.countryDetailText}>
                      {this.state.ageBand.label}
                    </Text>
                  ) : (
                    <Text style={styles.countryText}>
                      {STRING_CONST.AGE_BAND}
                      <Text style={{ color: colours.redColor }}> *</Text>
                    </Text>
                  )}

                  {IMG_CONST.DARK_SORT_DOWN}
                </View>
              </ModalDropdown>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: verticalScale(32) }}>
              {this.state.gender ? (
                <Text style={styles.textInputHeading}>
                  {STRING_CONST.GENDER}
                  <Text style={{ color: colours.redColor }}> *</Text>
                </Text>
              ) : null}
              <ModalDropdown
                onDropdownWillShow={() => {
                  this.setState({
                    showBorder: 2,
                  });
                }}
                onDropdownWillHide={() => {
                  this.setState({
                    showBorder: 0,
                  });
                }}
                options={STR_CONST.genderOptions}
                style={[
                  styles.textInputView,
                  {
                    marginTop: scale(5),
                    borderBottomColor:
                      submitPressed && !this.state.gender
                        ? colours.redColor
                        : colours.borderBottomLineColor,
                  },
                ]}
                dropdownStyle={{
                  width: scale(302),
                  borderColor: colours.black,
                  height: STR_CONST.genderOptions.length * 40,
                  borderTopWidth: 0.5,
                }}
                onSelect={(option) => {
                  this.setState({
                    gender: STR_CONST.genderOptions[option],
                  });
                }}
                renderRow={(option, index, isSelected) => {
                  return this.renderRow(option);
                }}
              >
                <View
                  style={[
                    styles.countryView,
                    {
                      borderColor:
                        showBorder == 2 ? colours.black : colours.white,
                    },
                  ]}
                >
                  {this.state.gender ? (
                    <Text style={styles.countryDetailText}>
                      {this.state.gender.label}
                    </Text>
                  ) : (
                    <Text style={styles.countryText}>
                      {STRING_CONST.GENDER}
                      <Text style={{ color: colours.redColor }}> *</Text>
                    </Text>
                  )}

                  {IMG_CONST.DARK_SORT_DOWN}
                </View>
              </ModalDropdown>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: verticalScale(32) }}>
              {this.state.flightsTakenAnnually ? (
                <Text style={styles.textInputHeading}>
                  {STRING_CONST.APPROX_FLIGHT_NUMBER}
                  <Text style={{ color: colours.redColor }}> *</Text>
                </Text>
              ) : null}
              <ModalDropdown
                onDropdownWillShow={() => {
                  this.setState({
                    showBorder: 3,
                  });
                }}
                onDropdownWillHide={() => {
                  this.setState({
                    showBorder: 0,
                  });
                }}
                options={STR_CONST.approxNumberFlights}
                style={[
                  styles.textInputView,
                  {
                    marginTop: scale(5),
                    borderBottomColor:
                      submitPressed && !this.state.flightsTakenAnnually
                        ? colours.redColor
                        : colours.borderBottomLineColor,
                  },
                ]}
                dropdownStyle={{
                  width: scale(302),
                  borderColor: colours.black,
                  height: STR_CONST.approxNumberFlights.length * 40,
                  borderTopWidth: 0.5,
                }}
                onSelect={(option) => {
                  this.setState({
                    flightsTakenAnnually: STR_CONST.approxNumberFlights[option],
                  });
                }}
                renderRow={(option, index, isSelected) => {
                  return this.renderRow(option);
                }}
              >
                <View
                  style={[
                    styles.countryView,
                    {
                      borderColor:
                        showBorder == 3 ? colours.black : colours.white,
                    },
                  ]}
                >
                  {this.state.flightsTakenAnnually ? (
                    <Text style={[styles.countryDetailText, { width: scale(250) }]}>
                      {this.state.flightsTakenAnnually.label}
                    </Text>
                  ) : (
                    <Text style={styles.countryText}>
                      {STRING_CONST.APPROX_FLIGHT_NUMBER}
                      <Text style={{ color: colours.redColor }}> *</Text>
                    </Text>
                  )}

                  {IMG_CONST.DARK_SORT_DOWN}
                </View>
              </ModalDropdown>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: verticalScale(32) }}>
              {this.state.travellingAbroadInNext12Months ? (
                <Text style={[styles.textInputHeading, { width: scale(290) }]}>
                  {STRING_CONST.HOW_LIKELY_TO_TRAVEL_ABROAD}
                  <Text style={{ color: colours.redColor }}> *</Text>
                </Text>
              ) : null}
              <ModalDropdown
                onDropdownWillShow={() => {
                  this.setState({
                    showBorder: 4,
                  });
                }}
                onDropdownWillHide={() => {
                  this.setState({
                    showBorder: 0,
                  });
                }}
                options={STR_CONST.travelAbroadOptions}
                style={[
                  styles.textInputView,
                  {
                    marginTop: scale(5),
                    borderBottomColor:
                      submitPressed &&
                      !this.state.travellingAbroadInNext12Months
                        ? colours.redColor
                        : colours.borderBottomLineColor,
                  },
                ]}
                dropdownStyle={{
                  width: scale(302),
                  borderColor: colours.black,
                  height: STR_CONST.travelAbroadOptions.length * 40,
                  borderTopWidth: 0.5,
                }}
                onSelect={(option) => {
                  this.setState({
                    travellingAbroadInNext12Months:
                      STR_CONST.travelAbroadOptions[option],
                  });
                }}
                renderRow={(option, index, isSelected) => {
                  return this.renderRow(option);
                }}
              >
                <View
                  style={[
                    styles.countryView,
                    {
                      borderColor:
                        showBorder == 4 ? colours.black : colours.white,
                    },
                  ]}
                >
                  {this.state.travellingAbroadInNext12Months ? (
                    <Text style={[styles.countryDetailText, { width: scale(250) }]}>
                      {this.state.travellingAbroadInNext12Months.label}
                    </Text>
                  ) : (
                    <Text style={[styles.countryText, { width: scale(250) }]}>
                      {STRING_CONST.HOW_LIKELY_TO_TRAVEL_ABROAD}
                      <Text style={{ color: colours.redColor }}> *</Text>
                    </Text>
                  )}

                  {IMG_CONST.DARK_SORT_DOWN}
                </View>
              </ModalDropdown>
            </TouchableOpacity> */}
            {this.addUserState()}
            {this.addUserCity()}
            {this.addUserPostCode()}
            {this.addUserPreferenceLocation()}
            {this.addUserAge()}
            {this.addUserGender()}
            {this.addUserFlightNumber()}
            {this.addUserTravelCount()}
            {this.renderButton(STR_CONST.SAVE, () => {
              this.submitData();
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
