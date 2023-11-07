import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
  Platform,
  Modal
} from "react-native";
import Validators from "../../helpers/Validator";
import ScreenHeader from "../../components/header/Header";
import * as STRING_CONST from "../../constants/StringConst";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import styles from "./ProfileDetailsScreenStyles";
import FastImage from 'react-native-fast-image'

import * as IMG_CONST from "../../constants/ImageConst";
import * as STR_CONST from "../../constants/StringConst";
// import ImagePicker from "react-native-image-picker";
import CustomButton from "../../components/customComponents/CustomButton";

import { isEmptyString, getCountryCodes } from "../../utils/commonMethods";
import ModalDropdown from "react-native-modal-dropdown";
import { postcodeValidator } from "postcode-validator";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");
import * as API_CONST from "../../helpers/config";
import { getAccessToken, getUserId } from '../../constants/DataConst'
import * as IMAGE_CONST from "../../constants/ImageConst";
import { getUserInfo } from "../../actions/userActions";
import axios from 'axios'
import { Alert } from "react-native";
import { URL, USER_API_URL } from "../../../env.json";
export default class ProfileScreenComponent extends Component {
  constructor(props) {
    super(props);
    const { userData } = this.props;
    this.state = {
      firstName: userData.first_name ? userData.first_name : "",
      lastName: userData.last_name ? userData.last_name : "",
      addressLine1: this.props.userData.address
        ? this.props.userData.address.address1
        : "",
      addressLine2: this.props.userData.address
        ? this.props.userData.address.address2
        : "",
      selectedState: userData.address ? userData.address.state : "",
      selectedCity: userData.address ? userData.address.city : "",
      ageBand: this.getDataObject(userData.age_band, STR_CONST.ageBandOption),
      gender: this.getDataObject(userData.gender, STR_CONST.genderOptions),
      departureCity: "",
      selectedCountry: "",
      Alert_Visibility2: false,
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
      viewImage: false,
      countryListArray: [],
      stateListArray: userData.address
        ? this.onCountrySelected(
          this.getCountryObject(userData.address.country)
        )
        : [],
      cityListArray: [],
      countryArray: STR_CONST.COUNTRY_ARRAY,
      isLoader: false,
      cityAddress: ""
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
     if (
      Validators.validName(userFirstName) &&
      Validators.validName(userLastName)
    ) {
      var userInfo = {};
      userInfo["first_name"] = firstName;
      userInfo["last_name"] = lastName;
      userInfo["address1"] = addressLine1;
      addressLine2 && addressLine2.length !== 0 ? userInfo["address2"] = addressLine2 : null;
      userInfo["country"] = selectedCountry.sortname;
      selectedState ? userInfo["state"] = selectedState : null;
      userInfo["city"] = selectedCity;
      userInfo["postal_code"] = postCode;
      departureCity ? userInfo["airpot_city"] = JSON.stringify({
        name: `${departureCity.city_name} (${departureCity.code})`,
      }) : "";
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
    let userData = this.props.userData;
    if (userData.image && !isEmptyString(userData.image)) {
      this.setState({
        pickerCustomButton: [{ name: "Remove", title: STR_CONST.REMOVE_PHOTO }, { name: "View", title: "View Image" }],
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

    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
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
      let address = userData.address
      this.setState({
        cityAddress: address
      })
      if (userData.first_name !== prevProps.userData.first_name && userData.last_name !== prevProps.userData.last_name) {
        const { first_name, last_name, image, address } = this.props.userData
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
            { name: "View", title: "View Image" },
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


  renderLoader() {
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={this.state.isLoader}
      >
        <View style={{
          flex: 1, justifyContent: 'center',
          backgroundColor: 'rgba(52, 52, 52, 0.8)',
          alignItems: 'center',
          width: width + 4, height: height,
          marginStart: scale(0),
          marginEnd: scale(0),
          marginTop: scale(0),
          marginBottom: scale(0),
        }}>
          <View style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <View style={{ height: verticalScale(130), width: verticalScale(130), backgroundColor: "#FFF", justifyContent: 'center', alignItems: 'center', borderRadius: verticalScale(10), overflow: 'hidden' }}>
              <FastImage source={IMAGE_CONST.LOADER} style={{ height: verticalScale(200), width: verticalScale(200) }} />
            </View>
          </View>
        </View>
      </Modal>
    )
  }




  uploadImage = async (imageData) => {
    this.setState({ isLoader: true })
    const accesstoken = await getAccessToken();
    const userId = await getUserId();
    const authToken = API_CONST.AUTH0RIZATION_TOKEN;
    const data = new FormData();
    data.append('image', {
      uri: imageData.uri,
      name: 'image.jpg',
      type: imageData.type
    }
    );

    let url = `${USER_API_URL}/v1/users/${userId}/upload_profile_image?user[access_token]=${accesstoken}`

    var config = {
      method: 'put',
      url: url,
      headers: {
        'authorization': authToken,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };
    let res = await axios(config).then((res) => {
      this.setState({ isLoader: false })
      this.props.getUserInfoAction()
    }).catch((error) => {
      this.isAlert()
    })
  };

  isAlert = () => {
    Alert.alert(
      'Message',
      'Format is not matching!',
      [{ text: 'OK', onPress: () => { this.setState({ isLoader: false }) } }],
      { cancelable: false },
    );

  }

  chooseFile = () => {

    var options = {
      imageFileType: 'png',
      title: "Select Image",
      customButtons: this.state.pickerCustomButton,
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
  };

  profileImage() {
    const { userData } = this.props
    return (
      <FastImage
        source={IMG_CONST.PROFILE_IMAGE_RING}
        style={styles.imageBackgroundStyle}
      >
        <TouchableOpacity onPress={this.chooseFile.bind(this)}>
          <View style={{
            borderColor: "#35c1e0", width: scale(135), height: scale(135),
            backgroundColor: '#35c1e0',
            marginTop: scale(12),
            borderWidth: scale(4), borderRadius: scale(100)
          }}>
            <View style={{
              borderColor: "#d7f3f8", width: scale(125), height: scale(125),
              backgroundColor: '#d7f3f8',
              borderWidth: scale(4), borderRadius: scale(100)
            }}>
              <FastImage
                source={null}
                style={[
                  styles.profileImage,
                  {
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colours.darkBlueTheme,
                  },
                ]}
              >
                {this.state.addFileURI && this.state.addFileURI !== "" ? (
                  <FastImage
                    style={styles.innerProfileImage}
                    source={{
                      uri: this.state.addFileURI,
                      priority: FastImage.priority.normal,
                      cache: FastImage.cacheControl.immutable,
                    }}
                  />
                ) : (
                  <Text style={styles.nameInitialsStyle}>
                    {this.state.firstName && this.state.firstName[0].toUpperCase()}
                    {this.state.lastName && this.state.lastName[0].toUpperCase()}
                  </Text>
                )}
              </FastImage>
            </View>
          </View>
        </TouchableOpacity>
      </FastImage>
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
          marginTop: verticalScale(25),
          marginBottom: verticalScale(35),
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
        onPress={() => { }}
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
            underlineColorAndroid="transparent"
            value={addressLine1}
            blurOnSubmit={false}
            maxLength={70}
          />
          <TouchableOpacity onPress={() => { }}>
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
        onPress={() => { }}
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
            style={styles.textInput}
            underlineColorAndroid="transparent"
            placeholder=""
            autoCapitalize={"words"}
            onChangeText={(addressLine2) => {
              this.setState({ addressLine2 });
            }}
            value={addressLine2}
            blurOnSubmit={false}
            maxLength={70}
          />
          <TouchableOpacity onPress={() => { }}>
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
        onPress={() => { }}
      >
        <Text style={styles.textInputHeading}>
          {STRING_CONST.STATE}
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
            onChangeText={(selectedState) => {
              this.setState({ selectedState });
            }}
            value={selectedState}
            blurOnSubmit={false}
            editable={selectedCountry !== ""}
          />
          <TouchableOpacity onPress={() => { }}>
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
        onPress={() => { }}
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
            underlineColorAndroid="transparent"
            placeholder=""
            autoCapitalize={"words"}
            onChangeText={(selectedCity) => {
              this.setState({ selectedCity });
            }}
            value={selectedCity}
            blurOnSubmit={false}
            editable={selectedCountry !== ""}
          />
          <TouchableOpacity onPress={() => { }}>
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
        onPress={() => { }}
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
            underlineColorAndroid="transparent"
            placeholder=""
            autoCapitalize={"words"}
            onChangeText={(postCode) => {
              this.setState({ postCode });
            }}
            value={postCode}
            blurOnSubmit={false}
            editable={selectedCountry.sortname !== ""}
          />
          <TouchableOpacity onPress={() => { }}>
            <FastImage source={IMG_CONST.EDIT_ICON} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  addUserPreferenceLocation() {
    const { departureLocationList, departureCity, cityAddress } = this.state;
    let airpotName = ""
    if (cityAddress && cityAddress !== 'null' && cityAddress !== undefined && Object.keys(cityAddress).length !== 0) {

      let data = JSON.parse(cityAddress.airpot_city)
      airpotName = data.name
    }
    return (
      <TouchableOpacity
        style={{ marginTop: verticalScale(32) }}
        onPress={() => {
          if (departureLocationList) {
            this.props.navigation.navigate(STRING_CONST.LOCATION_LIST_SCREEN, {
              type: "source",
              screenType: "Findflight",
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
        {departureCity || airpotName ? (
          <Text style={styles.textInputHeading}>
            {STRING_CONST.PREFFERED_DEPARTURE}
          </Text>
        ) : null}
        <View
          style={[
            styles.textInputView,
            {
              borderBottomColor: colours.borderBottomLineColor,
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
            {departureCity ?
              <Text style={styles.countryDetailText}>
                {`${departureCity.city_name} (${departureCity.code})`}
              </Text>
              :
              airpotName ?
                <Text style={styles.countryDetailText}>
                  {airpotName}
                </Text>
                :
                <Text style={styles.countryText}>
                  {STRING_CONST.PREFFERED_DEPARTURE}
                </Text>
            }

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
            {/* <Text style={{ color: colours.redColor }}> *</Text> */}
          </Text>
        ) : null}
        <ModalDropdown
          showsVerticalScrollIndicator={true}
          onDropdownWillShow={() => {

            this.setState({
              showBorder: 1,
              colours: "red"
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
            borderColor: "gray",
            height: STR_CONST.ageBandOption.length * 50,
            borderTopWidth: 0.5,
            borderTopColor: showBorder == 1 ? "gray" : "skyblue",
            borderBottomColor: showBorder == 1 ? "gray" : "skyblue",
            borderBottomWidth: 0.5
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
                borderColor: showBorder == 1 ? "skyblue" : colours.white,
                borderWidth: showBorder == 1 ? 2 : 0,
              },
            ]}
          >
            {ageBand ? (
              <Text style={styles.countryDetailText}>{ageBand.label}</Text>
            ) : (
              <Text style={styles.countryText}>
                {STRING_CONST.AGE_BAND}
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
              borderBottomColor: colours.borderBottomLineColor,
            },
          ]}
          dropdownStyle={{
            width: scale(302),
            height: STR_CONST.genderOptions.length * 50,
            borderColor: "gray",
            borderTopWidth: 0.5,
            borderTopColor: showBorder == 2 ? "gray" : "skyblue",
            borderBottomColor: showBorder == 2 ? "gray" : "skyblue",
            borderBottomWidth: 0.5
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
                borderColor: showBorder == 2 ? "skyblue" : colours.white,
                borderWidth: showBorder == 2 ? 2 : 0,
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
            height: STR_CONST.genderOptions.length * scale(36),
            borderColor: "gray",
            borderTopWidth: 0.5,
            borderTopColor: showBorder == 3 ? "gray" : "skyblue",
            borderBottomColor: showBorder == 3 ? "gray" : "skyblue",
            borderBottomWidth: 0.5
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
                borderColor: showBorder == 3 ? "skyblue" : colours.white,
                borderWidth: showBorder == 3 ? 2 : 0,
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
              </Text>
            )}

            {IMG_CONST.DARK_SORT_DOWN}
          </View>
        </ModalDropdown>
      </TouchableOpacity>
    );
  }

  Show_Custom_Alert2(visible) {
    this.setState({ Alert_Visibility2: visible });
  }
  Hide_Custom_Alert2() {
    this.setState({ Alert_Visibility2: false });
  }
  renderImage() {
    return (
      <Modal
        visible={this.state.Alert_Visibility2}
        animationType={"none"}
        transparent={true}
        onRequestClose={() => {
          this.Show_Custom_Alert2(!this.state.Alert_Visibility2);
        }}>
        <View
          style={{
            backgroundColor: "#000000",
            flex: 1,
            height: height,
            width: width
          }}>
          <TouchableOpacity onPress={() => { this.Hide_Custom_Alert2() }} style={{ width: scale(20), height: scale(20), marginTop: scale(50), margin: scale(10) }}>
            <FastImage source={require("../../assets/back2.png")} style={{ height: verticalScale(30), width: verticalScale(30) }} />
          </TouchableOpacity>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <FastImage
              style={styles.innerProfileImage1}
              source={{
                uri: this.state.addFileURI,
                priority: FastImage.priority.normal,
                cache: FastImage.cacheControl.immutable,
              }}
            />
          </View>
        </View>
      </Modal>
    )
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
            height: STR_CONST.genderOptions.length * scale(36),
            borderColor: "gray",
            borderTopWidth: 0.5,
            borderTopColor: showBorder == 4 ? "gray" : "skyblue",
            borderBottomColor: showBorder == 4 ? "gray" : "skyblue",
            borderBottomWidth: 0.5
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
                borderColor: showBorder == 4 ? "skyblue" : colours.white,
                borderWidth: showBorder == 4 ? 2 : 0,
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
              </Text>
            )}

            {IMG_CONST.DARK_SORT_DOWN}
          </View>
        </ModalDropdown>
      </TouchableOpacity>
    );
  }
  getMembershipText(userData) {
    let member = ''
    if (userData.gold_member) {
      member = STR_CONST.GOLD_MEMBER;
    } else if (userData.silver_member) {
      member = STR_CONST.SILVER_MEMBER;
    } else if (userData.bronze_member) {
      member = STR_CONST.BRONZE_MEMBER;
    }
    else {
      member = ''
    }
    return member
  }


  renderHeader() {
    return (
      <View style={{ backgroundColor: "#03B2D8", borderBottomLeftRadius: scale(25), borderBottomRightRadius: scale(25), width: "100%", marginTop: scale(8) }}>
        <View style={{ justifyContent: "space-between", width: "92%", flexDirection: "row", borderWidth: 0, marginTop: Platform.OS == "android" ? scale(30) : scale(40), alignSelf: "center" }}>
          <TouchableOpacity onPress={() => {
            this.props.navigation.goBack()
          }}>
            {IMAGE_CONST.IOS_BACK_ARROW}
          </TouchableOpacity>
          <Text style={{ fontSize: scale(20), fontWeight: "700", padding: scale(6), marginStart: scale(50), color: "#FFF" }}>Profile</Text>
          <Text></Text>
          <TouchableOpacity style={{}}
            onPress={() => { this.props.navigation.navigate("ProfileDetailsScreen") }}
          >
            <FastImage source={require("../../assets/profile/edit.png")} resizeMode="contain" style={{ height: scale(20), margin: scale(10), width: scale(20), }} />
          </TouchableOpacity>

        </View>

      </View>
    );
  }
  render() {
    const { firstName, cityAddress, lastName, selectedCountry, submitPressed } = this.state;
    const { userData } = this.props
    let silver_member = userData.silver_member
    let gold_member = userData.gold_member
    let bronze_member = userData.bronze_member

   

    let airport = ""
    if (userData && userData.address) {
       airport = userData.address.airpot_city
    }
    console.log("yes check here airpot - - - -  - - - ---- ",airport)


    return (
      <ImageBackground source={IMG_CONST.PROFILE_BG} style={styles.profileScreenView}
        resizeMode="cover"
      >
        {this.renderLoader()}
        {this.renderHeader()}
        <View style={{ flex: 1 }}>
          {this.profileImage()}
          <View style={styles.profileSubView}>
            <View style={styles.firstNameView}>
              <Text style={styles.firstLastNameStyle}>{userData.first_name}</Text>
              <Text style={styles.firstLastNameStyle}> {userData.last_name}</Text>
            </View>
          </View>
          {
            bronze_member || silver_member || gold_member ?
              <View style={styles.membershipTxtView}>
                <Text style={styles.membershipText}>
                  {this.getMembershipText(userData)}
                </Text>
              </View>
              : null
          }
          <View style={styles.informationContainer}>
            <View style={{ flexDirection: STRING_CONST.ROW }}>
              <FastImage source={IMG_CONST.AIRPORT} style={styles.airpotImgStyle} resizeMode="contain" />
              <View style={{ alignContent: STRING_CONST.CENTER }}>
                <Text style={styles.membershipText1}>{airport}</Text>
                <Text style={styles.preferrableStyle}>{STRING_CONST.PREFFERED_DEPARTURE}</Text>
              </View>
            </View>
          </View>
          <View style={styles.genderAgeView}>
            <View style={
              [styles.informationContainer1, {
                marginEnd: 9,
              }
              ]
            }>
              <View style={{ flexDirection: STRING_CONST.ROW, justifyContent: STRING_CONST.CENTER, alignItems: STRING_CONST.CENTER }}>
                <FastImage source={IMG_CONST.AGE_GRP} style={[styles.ageImg, {
                  marginStart: scale(18)
                }]} resizeMode="contain" />
                <View>
                  <Text style={[styles.membershipText1, {
                    paddingStart: scale(15),
                    marginBottom: scale(-3),
                  }]}>{userData.age_band}</Text>
                  <Text style={[styles.contentTxt, {
                    fontWeight: '500',
                    paddingStart: scale(15)
                  }]}>{"Age Band"}</Text>
                </View>
              </View>
            </View>
            <View style={
              [styles.informationContainer1,
              {
                marginEnd: 9,
              }
              ]
            }>
              <View style={{ flexDirection: STRING_CONST.ROW, justifyContent: STRING_CONST.CENTER, alignItems: STRING_CONST.CENTER }}>
                <FastImage source={IMG_CONST.EQUALITY} style={styles.ageImg} resizeMode="contain" />
                <View>
                  <Text style={[styles.membershipText1, {
                    paddingStart: scale(15),
                    marginBottom: scale(-3)
                  }]}>{userData.gender}</Text>
                  <Text style={[styles.contentTxt, {
                    fontWeight: '500',
                    paddingStart: scale(15)
                  }]}>{STRING_CONST.GENDER}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.informationContainer}>
            <View style={{ flexDirection: STRING_CONST.ROW, alignSelf: STRING_CONST.FLEX_START }}>
              <FastImage source={IMG_CONST.LIKELY} style={styles.ageImg} resizeMode="contain" />
              <View style={{}}>
                <Text style={styles.membershipText1}>
                  {userData.flights_taken_annually}
                </Text>
                <Text style={styles.avgNoOfFlight}>{STRING_CONST.AVG_NUMBER_OF_FLIGHT}</Text>
                <Text style={styles.avgNoOfFlight}>{STRING_CONST.TAKEN_ANNUALLY}</Text>
              </View>
            </View>
          </View>

          <View style={styles.informationContainer}>
            <View style={{ flexDirection: STRING_CONST.ROW, alignSelf: STRING_CONST.FLEX_START }}>
              <FastImage source={IMG_CONST.TRAVEL} style={styles.ageImg} resizeMode="contain" />
              <View>
                <Text style={styles.membershipText1}>{userData.travelling_abroad_in_next_12_months}</Text>
                <Text style={styles.avgNoOfFlight}>{STRING_CONST.DO_YOU_WANT_TO_TRAVEL} </Text>
                <Text style={styles.avgNoOfFlight}>{STRING_CONST.NEXT_TWELVE_MONTH}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}