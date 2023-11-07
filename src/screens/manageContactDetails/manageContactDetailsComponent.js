import React, { Component, Fragment } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  BackHandler,
  Alert,
  SafeAreaView,
  Platform
} from "react-native";
import ScreenHeader from "../../components/header/Header";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import styles from "./manageContactDetailsStyles";
import * as STR_CONST from "../../constants/StringConst";
import { TouchableOpacity } from "react-native-gesture-handler";
import Octicons from "react-native-vector-icons/Feather";
import CustomButton from "../../components/customComponents/CustomButton";
import Validators from "../../helpers/Validator";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import { getAccessToken } from "../../constants/DataConst";
import { isEmptyString, getCountryCodes, getISOCode, storeCountryData, isAndroid } from "../../utils/commonMethods";
import PhoneInput from "react-native-phone-input";
import ModalPickerImage from "./modalComponent";
import DeviceInfo from "react-native-device-info";
import MyStatusBar from "../../components/statusbar";

export default class ProfileScreenComponent extends Component {
  constructor(props) {
    super(props);
    let userData = props.userData;
    let iso = 'gb'
    if (userData.phone) {
      let countries = getCountryCodes()
      iso = getISOCode(userData.phone.country_code, countries)
    }
    this.state = {
      mobileNumber: userData.phone ? userData.phone.number : "",
      isNumberVerified: userData.phone ? userData.phone.verified : false,
      addEmail: "",
      primaryEmail: "",
      showSendOTPView:
        userData.phone && !userData.phone.verified ? true : false,
      showSendOTPButton: true,
      alternateEmails: userData.alternate_emails
        ? userData.alternate_emails
        : [],
      isAddEmailPressed: false,
      isFocuesOnEmail: false,
      isAddNumberPressed: false,
      isVerifyPressed: false,
      otpNumber: "",
      selectedCode: userData.phone
        ? `+${this.props.userData.phone.country_code}`
        : "+44",
      showBorder: false,
      activeIndex: -1,
      timer: null,
      phoneInput: null,
      value: "",
      modalRef: {},
      showModal: false,
      isValidNumber: null,
      deviceName: "",
      deviecBrand: "",
      isEmulator: "",
      isTablet: "",
      countrySelectedIso: iso,
      countryList: [],
      isFocused: false
    };
    this.counter = null
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


  async componentDidMount() {
    const { navigation } = this.props;


    let deviceName = await DeviceInfo.getDeviceName()
    let deviecBrand = await DeviceInfo.getBrand()
    let isTablet = await DeviceInfo.isTablet()
    let isEmulator = await DeviceInfo.isEmulator()


    this.setState({
      deviecBrand, deviceName, isTablet, isEmulator
    })

    if (this.props.userData.alternate_emails[0].is_primary == true) {
      let email = this.props.userData.alternate_emails[0].email
      this.setState({ primaryEmail: email })
    }
    this.willFocusSubscription = navigation.addListener(
      "willFocus",
      this.componentWillFocus.bind(this)
    );
    this.setState({
      pickerData: this.phone.getPickerData(),
    }, () => {
      let countryList = storeCountryData(this.state.pickerData)
      this.setState({
        countryList
      })
    });

    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
  }
  async componentWillFocus() {
    this.props.getUserInfoAction();
  }
  runTimer() {
    if (this.counter) {
      clearInterval(this.counter);
    }
    this.counter = setInterval(() => {
      if (this.state.timer > 0) {
        this.setState((prevState) => ({
          timer:
            prevState.timer - 1 > 9
              ? "" + (prevState.timer - 1)
              : "0" + (prevState.timer - 1),
        }));
      }
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (
        this.props.setPrimaryEmailError &&
        this.props.setPrimaryEmailError !== prevProps.setPrimaryEmailError
      ) {
        alert(this.props.setPrimaryEmailError);
        this.props.resetManageContactAction();
      }
      if (
        this.props.secondaryVerificationError &&
        this.props.secondaryVerificationError !==
        prevProps.secondaryVerificationError
      ) {
        alert(this.props.secondaryVerificationError);
        this.props.resetManageContactAction();
      }
      if (
        this.props.primaryVerificationError &&
        this.props.primaryVerificationError !==
        prevProps.primaryVerificationError
      ) {
        alert(this.props.primaryVerificationError);
        this.props.resetManageContactAction();
      }

      if (
        this.props.createAlternateEmailSuccess &&
        this.props.createAlternateEmailSuccess !==
        prevProps.createAlternateEmailSuccess
      ) {
        this.setState({
          addEmail: "",
          isAddEmailPressed: false,
        });
      } else if (
        this.props.createAlternateEmailError &&
        this.props.createAlternateEmailError !==
        prevProps.createAlternateEmailError
      ) {
        alert(this.props.createAlternateEmailError);
        this.props.resetManageContactAction();
      }

      if (
        this.props.deleteEmailSuccess &&
        this.props.deleteEmailSuccess !== prevProps.deleteEmailSuccess
      ) {
        this.setState({
          alternateEmails: this.props.userData.alternate_emails,
        });
      } else if (
        this.props.deleteEmailError &&
        this.props.deleteEmailError !== prevProps.deleteEmailError
      ) {
        alert(this.props.deleteEmailError);
        this.props.resetManageContactAction();
      }

      if (this.props.userData !== prevProps.userData) {
        this.setState({
          alternateEmails: this.props.userData.alternate_emails,
          isAddNumberPressed: false,
        });
        if (this.props.userData.phone) {
          let countries = getCountryCodes()
          let iso = getISOCode(this.props.userData.phone.country_code, countries)
          this.setState({
            mobileNumber: this.props.userData.phone.number,
            selectedCode: `+${this.props.userData.phone.country_code}`,
            isNumberVerified: this.props.userData.phone.verified,
            showSendOTPView: !this.props.userData.phone.verified,
            countrySelectedIso: iso
          });
        } else {
          this.setState({
            mobileNumber: "",
            selectedCode: STR_CONST.INITIAL_PNUMBER_CODE,
            isNumberVerified: false,
            showSendOTPView: false,
            countrySelectedIso: STR_CONST.INITIAL_ISO_CODE
          });
          this.phone.selectCountry(STR_CONST.INITIAL_ISO_CODE);
        }
      } else if (this.props.userError !== prevProps.userError) {
        alert(this.props.userError);
        this.props.resetManageContactAction();
      }
    }
    if (
      this.props.deleteNumberSuccess &&
      this.props.deleteNumberSuccess !== prevProps.deleteNumberSuccess
    ) {
      this.setState({
        showSendOTPButton: true,
      });
    }
    if (
      this.props.deleteNumberError &&
      this.props.deleteNumberError !== prevProps.deleteNumberError
    ) {
      alert(this.props.deleteNumberError);
      this.props.resetManageContactAction();
    }
    if (
      this.props.verifyNumberError &&
      this.props.verifyNumberError !== prevProps.verifyNumberError
    ) {
      alert(this.props.verifyNumberError);
      this.props.resetManageContactAction();
    }

    if (
      this.props.resendOTPSuccess &&
      this.props.resendOTPSuccess !== prevProps.resendOTPSuccess
    ) {
      Alert.alert(STR_CONST.VERIFICATION_OTP_SENT);
      this.setState({
        showSendOTPButton: false,
        timer: STR_CONST.TIMER_LIMIT,
        otpNumber: '',
        isVerifyPressed: false
      });
      this.runTimer();
      this.props.resetManageContactAction();
    } else if (
      this.props.resendOTPError &&
      this.props.resendOTPError !== prevProps.resendOTPError
    ) {
      alert(this.props.resendOTPError);
      this.props.resetManageContactAction();
    }
  }

  _menu = [];

  setMenuRef = (ref, index) => {
    this._menu[index] = ref;
  };

  hideMenu = (index) => {
    this._menu[index].hide();
    this.setState({
      activeIndex: -1,
    });
  };

  showMenu = (index) => {
    this._menu[index].show();
    this.setState({
      activeIndex: index,
    });
  };
  onPressFlag() {
    this.setState({
      showModal: true,
    });
    this.state.myCountryPicker.open();
  }

  selectCountry(country) {
    this.phone.selectCountry(country.iso2);
    this.setState({ selectedCode: country.dialCode, countrySelectedIso: country.iso2 })
  }


  renderHeader() {
    return (
      <View style={styles.headerStyleView}>
        <View style={{ marginTop: Platform.OS == "android" ? scale(16) : scale(40) }}>
          <ScreenHeader
            {...this.props}
            left
            title={STR_CONST.MANAGE_CONTACT_DETAILS}
            notifCount={2}
            clickOnLeft={() => this.props.navigation.goBack()}
          />
        </View>
      </View>
    )
  }


  addMobileNumberView() {
    const { isAddNumberPressed, mobileNumber } = this.state;
    return (
      <View>
        <Text style={[styles.infoTitle, { fontWeight: "600" }]}>
          {STR_CONST.ADD_MOBILE_NO}
        </Text>
        <Text style={{ color: "#132C52", fontSize: scale(12), fontWeight: '400', padding: 1, paddingTop: 7, fontFamily: STR_CONST.appFonts.INTER_REGULAR }}>
          {STR_CONST.ADD_MOBILE_NO_TO_RECIEVE_SMS_ALERTS}
        </Text>

        {this.contactNumberView()}
        {isAddNumberPressed && mobileNumber.length < 10 && (
          <Text style={[styles.infoTitle, { color: colours.errorColor }]}>
            {STR_CONST.PLEASE_ENTER_VALID_NUMBER}
          </Text>
        )}
      </View>
    );
  }

  updatePrimaryEmail = () => {
    const { primaryEmail } = this.state;
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (primaryEmail.length == 0) {
      Alert.alert("Message", "Please Enter Email !")
    }
    else if (!regEmail.test(primaryEmail)) {
      Alert.alert("Message", "Please Enter Valid Email!")
    }
    else {
      this.props.setSecondaryAsPrimaryEmailAction(primaryEmail);
    }

  }

  singleEmailView(item, index) {
    const { isFocused, isFocuesOnEmail } = this.state;

    return (
      <Fragment >
        <View style={[styles.emailIdsInnerView,
        {
          width: "100%"
        },
        ]}>
          {
            index == 0 && isFocuesOnEmail == true ?
              <TextInput
                underlineColorAndroid="transparent"
                style={
                  isFocused || this.state.primaryEmail != item.email ?
                    styles.singleEmailView1 : styles.singleEmailView2}
                numberOfLines={1}
                autoFocus={true}
                value={this.state.primaryEmail}
                onChangeText={(primaryEmail) => this.setState({ primaryEmail })}
              >
              </TextInput>
              :
              <Text
                style={styles.singleEmailView}
                ellipsizeMode={"tail"}
                numberOfLines={1}
                autoFocus={isFocuesOnEmail}
              >
                {item.email}
              </Text>
          }

          {item.verified ? (
            item.is_primary ? (
              <View
                style={[
                  styles.statusStyle,
                  { backgroundColor: colours.lightGreen },
                ]}
              >
                <Text style={[styles.statuTextStyle, { paddingHorizontal: scale(4), fontWeight: "600" }]}>
                  {STR_CONST.PRIMARY_TEXT}
                </Text>
              </View>
            ) : null
          ) : (
            <View>
              {item.verified && item.is_primary ? (
                <View
                  style={[
                    styles.statusStyle,
                    { backgroundColor: colours.lightGreen },
                  ]}
                >
                  <Text style={[styles.statuTextStyle, { fontWeight: "600" }]}>
                    {STR_CONST.PRIMARY_TEXT}
                  </Text>
                </View>
              ) : null}
              {
                !item.verified ?
                  <View
                    style={[
                      styles.statusStyle,
                      {
                        backgroundColor: colours.lightYellow,
                        marginTop: verticalScale(2),
                      },
                    ]}
                  >
                    <Text style={[styles.statuTextStyle, { fontWeight: "600" }]}>
                      {STR_CONST.UNVERIFIED_TEXT}
                    </Text>
                  </View>
                  : null
              }

            </View>
          )}

          <Menu
            style={{ marginHorizontal: scale(-15), marginTop: verticalScale(8) }}
            ref={(ref) => this.setMenuRef(ref, index)}
            button={
              <TouchableOpacity
                style={{ marginTop: 5 }}
                onPress={() => {
                  this.showMenu(index);
                }}
              >
                <Octicons
                  name="more-vertical"
                  color={
                    this.state.activeIndex == index
                      ? colours.lightBlueTheme
                      : colours.darkBlueTheme
                  }
                  size={scale(22)}
                />
              </TouchableOpacity>
            }
            onHidden={() => {
              this.setState({
                activeIndex: -1,
              });
            }}
          >
            {
              item.is_primary ? (

                <MenuItem
                  onPress={() => {
                    this.hideMenu(index);
                    this.setState({
                      isFocused: true,
                      isFocuesOnEmail: true
                    })
                  }}
                  style={{ height: verticalScale(50) }}
                  textStyle={{ color: colours.black, fontSize: scale(12) }}
                >
                  {STR_CONST.EDIT}
                </MenuItem>
              ) : null
            }
            {!item.is_primary ? (
              <MenuItem
                onPress={() => {
                  this.hideMenu(index);
                  if (item.verified) {
                    this.props.setPrimaryEmailAction(item.id);
                  } else {
                    if (item.is_primary) {
                      this.props.resendPrimaryVerificationAction(item.id);
                    } else {
                      this.props.resendSecondaryVerificationAction(item.id);
                    }
                  }
                }}
                disabled={
                  !item.is_primary &&
                    this.props.userData.social_user &&
                    item.verified
                    ? true
                    : false
                }
                style={{ height: verticalScale(50) }}
                textStyle={{ color: colours.black, fontSize: scale(12) }}
              >
                {item.verified
                  ? STR_CONST.SET_PRIMARY
                  : STR_CONST.RESEND_VERIFICATION_CODE}
              </MenuItem>
            ) : null}
            {!item.is_primary ? (
              <MenuDivider style={{ marginHorizontal: scale(30) }} />
            ) : null}
            {!item.is_primary ? (
              <MenuItem
                onPress={() => {
                  this.hideMenu(index);
                    Alert.alert(
                    'Delete Email',
                    'Are you sure you want to delete email ?',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      { text: 'OK', onPress: () => this.props.deleteEmailAction(item.id) },
                    ]
                  );
                }}
                style={{ height: verticalScale(50) }}
                textStyle={{ color: colours.black, fontSize: scale(12) }}
              >
                {STR_CONST.DELETE_EMAIL}
              </MenuItem>
            ) : null}
          </Menu>
        </View>
        {
          index == 0 ?
            <View
              style={[
                styles.line,
                {
                  backgroundColor:
                    this.state.activeIndex == index
                      ? colours.lightBlueTheme
                      : colours.borderBottomLineColor,
                },
              ]}
            />
            : null
        }
        {
          index == 0 ?
            <View style={{ flex: 1, justifyContent: "flex-end", alignItems: 'center', borderWidth: 0, marginTop: scale(10) }}>
              {
                this.state.primaryEmail !== item.email ?
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        isFocuesOnEmail: true,
                        isFocused: true,
                      })
                      this.updatePrimaryEmail()
                    }}
                    style={{ alignItems: 'center', backgroundColor: colours.lightBlueTheme, width: scale(140), padding: scale(8), borderRadius: scale(10) }}>
                    <Text style={{ color: colours.white, fontWeight: "700", fontSize: scale(16) }}>Update</Text>
                  </TouchableOpacity>
                  : null
              }
            </View>
            : null
        }
        {
          index !== 0 ?
            <View
              style={[
                styles.line,
                {
                  backgroundColor:
                    this.state.activeIndex == index
                      ? colours.lightBlueTheme
                      : colours.borderBottomLineColor,
                },
              ]}
            />
            : null
        }
        {item.is_primary && item.email.includes(STR_CONST.APPLE_EMAIL) && (
          <Text style={{ fontSize: scale(12), color: colours.lightBlueTheme }}>
            {STR_CONST.HIDDEN_EMAIL_INFO}
          </Text>
        )}
      </Fragment>

    );
  }

  getSortedList() {
    let countryList = this.state.countryList
    let sortedList = countryList.sort((x, y) => {
      return (x.label > y.label) ? 1 : -1;
    })
    return sortedList
  }

  contactNumberView() {
    const { isNumberVerified, showModal } = this.state;
    let userData = this.props.userData;
    let country = this.state.countrySelectedIso


    let goldMember = userData.gold_member

    return (
      <View style={{}}>
        <View
          style={[
            styles.emailIdsInnerView,
            {
              width: "100%"
            },
          ]}
        >
          <TouchableOpacity onPress={() => {
            if (!userData.phone) {
              this.setState({
                showModal: true,
              })
            }
          }}
            style={{ borderWidth: 0 }}
          >

            <PhoneInput
              ref={(ref) => {
                this.phone = ref;
              }}
              onPressFlag={() => {
                this.setState({
                  showModal: true,
                });
              }}
              initialCountry={country.toLowerCase()}
              style={this.state.mobileNumber ? styles.phoneInput : styles.phoneInput1}
              textStyle={styles.phoneInputText}
              disabled

            />
            {isAndroid() && <View style={[styles.phoneInput, { backgroundColor: 'transparent', position: 'absolute' }]}
              onPress={() => {
                if (!userData.phone) {
                  this.setState({
                    showModal: true,
                  })
                }
              }}
            />}
          </TouchableOpacity>
          {showModal && (
            <ModalPickerImage
              data={this.getSortedList()}
              onChange={(country) => {
                this.selectCountry(country);
                this.setState({
                  showModal: false
                })
              }}
              cancelText="Cancel"
              onCancel={() => {
                this.setState({
                  showModal: false
                })
              }}
            />
          )}
          <TextInput
            underlineColorAndroid="transparent"
            editable={!userData.phone}
            style={[
              styles.input,
              { width: scale(130), borderWidth: 0, paddingStart: scale(4), alignSelf: "flex-start", marginTop: scale(2) },
            ]}
            placeholder="Mobile number"
            autoCapitalize="none"
            onChangeText={(mobileNumber) => {
              mobileNumber = mobileNumber.replace(/[^0-9]/g, '')
              this.setState({ mobileNumber });
            }}
            keyboardType={"number-pad"}
            value={this.state.mobileNumber}
            blurOnSubmit={false}
            returnKeyType="done"
            maxLength={10}
            onSubmitEditing={() => {
              Keyboard.dismiss()
            }}
          />

          {
            goldMember && isNumberVerified ?
              <View
                style={[
                  styles.statusStyle,
                  {
                    backgroundColor:
                      this.props.userData.phone && !isNumberVerified
                        ? colours.lightYellow
                        : colours.lightGreen,
                    borderRadius: scale(15)
                  },
                ]}
              >
                <Text style={[styles.statuTextStyle, { fontWeight: "600", marginStart: isNumberVerified ? scale(6) : scale(1), alignSelf: "center", margin: scale(1), width: scale(45), }]}>
                  {isNumberVerified ? "Verified" : STR_CONST.UNVERIFIED_TEXT}
                </Text>
              </View>
              :
              <View
                style={[
                  styles.statusStyle1,
                ]}
              >
                <Text style={[styles.statuTextStyle, { fontWeight: "600" }]}>
                </Text>
              </View>
          }
          {this.props.userData.phone ? (
            <Menu
              style={{ marginStart: scale(-15), marginTop: verticalScale(2), }}
              ref={(ref) => this.setMenuRef(ref, 4)}
              button={
                <TouchableOpacity
                  style={{ alignSelf: 'flex-end' }}
                  onPress={() => {
                    this.showMenu(4);
                  }}
                >
                  <Octicons
                    name="more-vertical"
                    color={
                      this.state.activeIndex == 4
                        ? colours.lightBlueTheme
                        : colours.darkBlueTheme
                    }
                    size={scale(22)}
                  />
                </TouchableOpacity>
              }
              onHidden={() => {
                this.setState({
                  activeIndex: -1,
                });
              }}
            >
              {!isNumberVerified && <MenuItem
                onPress={() => {
                  this.hideMenu(4);
                  this.props.sendOTPAction();
                }}
                style={{ height: verticalScale(35) }}
                textStyle={{ color: "black", fontSize: scale(12) }}
              >
                {"Send OTP"}
              </MenuItem>}
              <MenuDivider style={{ marginHorizontal: scale(30) }} />
              <MenuItem
                onPress={() => {
                  this.hideMenu(4);
                  this.props.deleteNumberAction();
                }}
                style={{ height: verticalScale(35) }}
                textStyle={{ color: "black", fontSize: scale(12) }}
              >
                {STR_CONST.DELETE_NUMBER}
              </MenuItem>
            </Menu>
          ) : null}
        </View>
        <View
          style={[
            styles.line,
            {
              backgroundColor:
                this.state.activeIndex == 4
                  ? colours.lightBlueTheme
                  : colours.borderBottomLineColor,
            },
          ]}
        />
      </View>
    );
  }
  getAlternateEmails(alternateEmails) {
    alternateEmails.forEach(function (item, i) {
      if (item.is_primary) {
        alternateEmails.splice(i, 1);
        alternateEmails.unshift(item);
      }
    });
    alternateEmails = alternateEmails.sort((a, b) => a.id - b.id);
    return alternateEmails;
  }



  emailIdsView() {
    const { alternateEmails } = this.state;
    return (
      <View style={styles.emailIdsView}>
        {
          alternateEmails.length > 1 ?
            <Text style={[styles.infoTitle, { fontWeight: "600" }]}>
             {STR_CONST.UPDATE_EMAILS}
            </Text>
            :
            <Text style={[styles.infoTitle, { fontWeight: "600" }]}>
            {STR_CONST.UPDATE_EMAIL}
            </Text>
        }
        {alternateEmails &&
          this.getAlternateEmails(alternateEmails).map((item, index) => {
            return this.singleEmailView(item, index);
          })}
      </View>
    );
  }
  checkEmail(addEmail) {
    let alternateEmails = this.state.alternateEmails;
    let flag = 0;
    alternateEmails.map((obj) => {
      if (obj.email == addEmail) {
        flag++;
      }
    });
    return flag > 0;
  }
  addEmailView() {
    const { addEmail, isAddEmailPressed } = this.state;

    let userData = this.props.userData
    let bronzeMember = userData.bronze_member
    return (
      <View style={styles.emailIdsView}>
        <Text style={[styles.infoTitle, { fontWeight: "600" }]}>
          {STR_CONST.ADD_SECONDARY_EMAIL}
        </Text>
        <Text style={[styles.infoSubText]}>{STR_CONST.PRIMARY_EMAIL_INFO}</Text>
        <TextInput
          underlineColorAndroid="transparent"
          style={[
            styles.input,
            styles.addEmailViewTextInput,
            {
              borderBottomWidth: 1,
              borderColor:
                isAddEmailPressed && isEmptyString(addEmail)
                  ? colours.errorColor
                  : colours.borderBottomLineColor,
            },
          ]}
          placeholder="Enter email"
          editable={bronzeMember ? false : true}
          placeholderTextColor={
            isAddEmailPressed && isEmptyString(addEmail)
              ? colours.errorColor
              : colours.borderBottomLineColor
          }
          autoCapitalize="none"
          onChangeText={(email) => {
            this.setState({
              addEmail: email
            });
          }}

          keyboardType={"email-address"}
          value={addEmail}
          blurOnSubmit={false}
          returnKeyType="done"
          maxLength={70}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
        />
        {isAddEmailPressed &&
          !isEmptyString(addEmail) &&
          !Validators.validEmail(addEmail) && (
            <Text style={styles.errorMessageTextStyle}>
              {STR_CONST.PLEASE_ENTER_VALID_EMAIL}
            </Text>
          )}


        {
          bronzeMember ?
            <Fragment>
              <TouchableOpacity
                style={{ backgroundColor: colours.lightGreyish, justifyContent: "center", borderRadius: scale(10), alignItems: "center", alignSelf: "center", margin: scale(20) }}
              >

                <Text style={{ color: colours.white, borderRadius: scale(10), fontSize: scale(14), marginStart: scale(30), marginEnd: scale(30), padding: scale(8), fontWeight: "700" }}>Add</Text>
              </TouchableOpacity>


            </Fragment>
            :
            <Fragment>
              {Validators.validEmail(this.state.addEmail) ?

                <TouchableOpacity
                  onPress={async () => {
                    const { addEmail } = this.state;
                    Keyboard.dismiss();
                    if (this.checkEmail(addEmail)) {
                      Alert.alert(STR_CONST.EMAIL_EXIST);
                    } else {
                      this.setState({
                        isAddEmailPressed: true,
                      });
                      if (Validators.validEmail(addEmail)) {
                        const accesstoken = await getAccessToken();
                        var body = {
                          user: {
                            access_token: accesstoken,
                          },
                          notification_email: { email: addEmail },
                        };
                        this.props.createAlternateEmailAction(body);
                        this.setState({
                          addEmail: "",
                          isAddEmailPressed: false,
                        });
                      }
                    }
                  }}
                  style={{
                    alignSelf: 'center',
                    backgroundColor: colours.lightBlueTheme, marginTop: scale(10), width: scale(140), padding: scale(8), alignItems: 'center', borderRadius: scale(10)
                  }}>
                  <Text style={{ color: colours.white, fontWeight: "700", fontSize: scale(16) }}>Add</Text>
                </TouchableOpacity>
                : null}
            </Fragment>
        }
        {
          bronzeMember ?
            <View style={styles.upgradetxtView}>
              <Text style={styles.upgradTxt}>
                {STR_CONST.UPGRADE_TO_ADD_SECONDARY_EMAIL}
              </Text>
            </View>
            : null
        }
      </View>
    );
  }

  showSendOTPView() {
    const { isVerifyPressed, otpNumber, timer } = this.state;
    return (
      <View>
        <Text style={[styles.infoSubText]}>{STR_CONST.ENTER_OTP}</Text>
        <View style={styles.otpView}>
          <View
            style={[
              styles.sendOTPView,
              {
                borderBottomColor:
                  isVerifyPressed && isEmptyString(otpNumber)
                    ? colours.errorColor
                    : colours.borderBottomLineColor,
              },
            ]}
          >
            <TextInput
              underlineColorAndroid="transparent"
              style={[
                styles.input,
                {
                  width: scale(150),
                  marginTop: verticalScale(20),
                },
              ]}
              placeholder={STR_CONST.VERIFICATION_CODE}
              placeholderTextColor={
                isVerifyPressed && isEmptyString(otpNumber)
                  ? colours.errorColor
                  : colours.borderBottomLineColor
              }
              autoCapitalize="none"
              onChangeText={(otpNumber) => {
                this.setState({ otpNumber });
              }}
              keyboardType={"number-pad"}
              value={otpNumber}
              blurOnSubmit={false}
              returnKeyType="done"
              maxLength={4}
            />

            <Text
              style={[
                styles.infoSubText,
                { color: colours.lightBlueTheme, marginTop: verticalScale(15) },
              ]}
            >
              00:{timer ? timer : "00"}
            </Text>
            <CustomButton
              textOnButton={STR_CONST.RESEND_TEXT}
              textSize={scale(14)}
              onButtonPress={() => {
                const { timer } = this.state;
                if (!timer || timer == 0) {
                  this.props.sendOTPAction();
                }
              }}
              buttonColor={colours.white}
              buttonStyle={[
                styles.addButtonStyle,
                styles.resendOTPButton,
                {
                  borderColor:
                    !timer || timer == 0
                      ? colours.lightBlueTheme
                      : colours.dimLightBlueTheme,
                },
              ]}
              textColor={
                !timer || timer == 0
                  ? colours.lightBlueTheme
                  : colours.dimLightBlueTheme
              }
            />
          </View>
        </View>
        {isVerifyPressed &&
          !isEmptyString(otpNumber) &&
          otpNumber.length < 4 && (
            <Text style={styles.errorMessageTextStyle}>
              {STR_CONST.PLEASE_ENTER_VALID_OTP}
            </Text>
          )}
        <CustomButton
          textOnButton={STR_CONST.VERIFY_TEXT}
          textSize={scale(16)}
          onButtonPress={() => {
            const { otpNumber } = this.state;
            Keyboard.dismiss();
            this.setState({
              isVerifyPressed: true,
            });
            if (!isEmptyString(otpNumber) && otpNumber.length == 4) {
              let metaData = {
                "deviecBrand": this.state.deviecBrand,
                "deviceName": this.state.deviceName,
                "isEmulator": this.state.isEmulator,
                "isTablet": this.state.isTablet,
                "plateform": "Mobile",
              }
              this.props.verifyOTPAction(otpNumber, metaData);
            }
          }}
          buttonColor={colours.lightBlueTheme}
          buttonStyle={[styles.addButtonStyle1,]}
          textColor={colours.white}
        />
      </View>
    );
  }
  validatePhoneNumber() {
    const { mobileNumber, selectedCode, countrySelectedIso } = this.state;
    if (!isEmptyString(mobileNumber) && mobileNumber.length >= 10) {
      var userInfo = {};
      userInfo["country_code"] = selectedCode.replace("+", "");
      userInfo["phone_number"] = mobileNumber;
      userInfo["iso_country_code"] = countrySelectedIso
      let metaData = {
        "deviecBrand": this.state.deviecBrand,
        "deviceName": this.state.deviceName,
        "isEmulator": this.state.isEmulator,
        "isTablet": this.state.isTablet,
        "plateform": "Mobile",
      }
      this.props.addContactAction(userInfo, metaData)      
    }
  }

  render() {
    let userData = this.props.userData;
    const {
      showSendOTPView,
      alternateEmails,
      isNumberVerified,
      showSendOTPButton,
    } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS == "android" ? "" : "padding"}
        >
          <MyStatusBar />
          {this.renderHeader()}
          <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="always">

            <View style={styles.innerContainer}>
              {this.addMobileNumberView()}
              {!isNumberVerified ? (
                showSendOTPView && userData.gold_member ? (
                  showSendOTPButton ? (
                    null
                  ) : (
                    this.showSendOTPView()
                  )
                ) : null
              ) : null}
              {userData && !userData.phone ? (
                <CustomButton
                  textOnButton={STR_CONST.ADD_TEXT}
                  textSize={scale(18)}
                  onButtonPress={() => {
                    Keyboard.dismiss();
                    this.validatePhoneNumber();
                    this.setState({
                      isAddNumberPressed: true,
                    });
                  }}
                  buttonColor={colours.lightBlueTheme}
                  buttonStyle={styles.addButtonStyle}
                  textColor={colours.white}
                />
              ) : null}
              {this.emailIdsView()}
              {alternateEmails && alternateEmails.length < 3
                ? this.addEmailView()
                : null}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
  componentWillUnmount() {
    if (this.counter) {
      clearInterval(this.counter)
    }
  }
}
