import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Linking,
  Alert,
  Dimensions,
  BackHandler,
  ScrollView,
  ImageBackground
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Modal from "react-native-modal";
import  Entypo from "react-native-vector-icons/Entypo";
import styles from "./masSearchStyles";
import TravellersAndClassModal from "../findFlights/travellersAndClassModal";
import * as STRING_CONST from "../../constants/StringConst";
import * as IMAGE_CONST from "../../constants/ImageConst";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import ScreenHeader from "../../components/header/Header";
import { DrawerActions } from "@react-navigation/drawer";
import {
  getformattedDate,
  getMapSearchData,
  isAndroid,
  getBAClassesString,
  isEmptyString,
  isIOS
} from "../../utils/commonMethods";
import DeviceInfo from "react-native-device-info";
import PopUpComponent from "../../shared/popUpComponent";
import * as Config from "../../helpers/config";
import moment from "moment";
import { getStoreData, getUserId ,getAccessToken} from "../../constants/DataConst";
// import PostHog from 'posthog-react-native';
const classes1 = ["Economy","Premium Economy","Businness", "First"]
import { Platform } from "react-native";
var uuid = require("react-native-uuid");
const { height, width } = Dimensions.get("window");
import FastImage from 'react-native-fast-image'
import MyStatusBar from '../../components/statusbar/index'

let isAppReviewSuccess =false
let buildVersion = 0
export default class FindFlightComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopUp: false,
      checked: false,
      travelTo: false,
      travelData: [
        {
          "id": "1",
          "value": "I know where I want to travel from"
        },
        {
          "id": "2",
          "value": "I know where I want to travel to"
        }
      ],
      classObject: [
        {
          class: "Economy",
          isSelected: true,
          value: "economy",
        },
        {
          class: "Premium Economy",
          isSelected: true,
          value: "premium_economy",
        },
        {
          class: "Business",
          isSelected: true,
          value: "business",
        },
        {
          class: "First",
          isSelected: true,
          value: "first",
        },
      ],
      classObject1:[
        {
          class: "Economy",
          isSelected: true,
        },
        {
          class: "Premium Economy",
          isSelected: false,
        },
        {
          class: "Business",
          isSelected: false,
        },
        {
          class: "First",
          isSelected: false,
        },
      ],
      deviceName:"",
      deviecBrand:"",
      isEmulator:"",
      isTablet:"",
      userData:this.props.userInfo,
      selectedSource: null,
      showClassModal: false,
      classSelected: [true, true, true, true],
      classSelected1: [true, false, false, false],
      travellersCount: 1,
      airlineSelected: null,
      tierSelected: null,
      selectedIndex: this.props.isReturn ? 1 : 0,
      departStartDate: "",
      departEndDate: "",
      returnStartDate: "",
      returnEndDate: "",
      isSearchClicked: false,
      showLoginPopup: false,
      userConfigDetails:this.props.userConfigDetails
    };
  }

  componentDidMount = async () => {
    let userId = await AsyncStorage.getItem("userId");
    let deviceName = await DeviceInfo.getDeviceName()
    let deviecBrand = await DeviceInfo.getBrand()
    let isTablet = await DeviceInfo.isTablet()
    let isEmulator = await DeviceInfo.isEmulator()

    const accesstoken = await getAccessToken();

    this.setState({
      accesstoken:accesstoken
    })
    this.setState({
      deviecBrand,deviceName,isTablet,isEmulator
    })
   
    if (userId) {     
      this.setState({
        airlineSelected: this.props.userInfo.airline_memberships[0].airline,
        //  airlineSelected:"british_airways",
        tierSelected: this.props.userInfo.airline_memberships[0].membership,
        airLinesMembershipDetailsObject: this.props.airLinesMembershipDetailsObject
      });

    }

   
    setTimeout(() => {
        this.getBuildVersionData()
    }, 2000);
  

   
    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
  }



  getBuildVersionData = () => {
   

    const {userConfigDetails} = this.state
      if(userConfigDetails && userConfigDetails.length > 0 ){
       userConfigDetails.map((singleMap)=>{
              if(singleMap.ConfigTypeGUID == "isAppReviewed"){
                isAppReviewSuccess = singleMap.ConfigTypeValue
              }
              if(singleMap.ConfigTypeGUID == "appBuildVersion"){
                buildVersion = singleMap.ConfigTypeValue
              }
            })
      }
  }



  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () =>
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



  goToNotifications() {
    const { navigation } = this.props;
    navigation.navigate(STRING_CONST.NOTIFICATIONS_SCREEN, {
      fromAlertScreen: false,
    });
  }

  renderHeader() {
    return (
      <ScreenHeader
        {...this.props}
        left
        setting
        title={STRING_CONST.MAP_SEARCH_TITLE}
        right
        notifCount={2}
        clickOnRight={() => this.goToNotifications()}
      />
    );
  }

  checkErrorCondition() {
    const {
      airlineSelected,
      selectedSource,
      departStartDate,
      returnStartDate,
      selectedIndex,
    } = this.state;
    if (
      airlineSelected &&
      selectedSource &&
      !isEmptyString(departStartDate) &&
      (selectedIndex == 1 ? !isEmptyString(returnStartDate) : true)
    )
      return true;
    else return false;
  }

  renderBottomButton(buttonText, backgroundColor, onButtonPress) {
    return (
      <TouchableOpacity
        style={[styles.buttonStyle, { backgroundColor: backgroundColor }]}
        onPress={() => {
          onButtonPress();
        }}
      >
        <Text style={styles.buttonTextStyle}>{buttonText}</Text>
      </TouchableOpacity>
    );
  }

  // tabView() {
  //   return (
  //     <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#d8f7fb",height:scale(50),borderRadius:scale(10),alignItems:'center' }}>
  //       <TouchableOpacity
  //         // style={[
  //         //   styles.tabViewStyle,
  //         //   {
  //         //     borderBottomColor:
  //         //       this.state.selectedIndex == 0
  //         //         ? colours.lightBlueTheme
  //         //         : colours.white,
  //         //   },
  //         // ]}
  //         style={
  //           this.state.selectedIndex == 0 ?
  //           styles.tabViewStyle : 
  //           styles.tabViewStyle1

  //         }
  //         onPress={() => {
  //           this.setState({ selectedIndex: 0 });
  //         }}
  //       >
  //         <Text
  //           style={[
  //             styles.tabTextStyle,
  //             {
  //               color:
  //                 this.state.selectedIndex == 0
  //                   ? colours.white
  //                   : colours.gray,
  //             },
  //           ]}
  //         >
  //           {STRING_CONST.ONE_WAY}
  //         </Text>
  //       </TouchableOpacity>

  //       <TouchableOpacity
  //         // style={[
  //         //   styles.tabViewStyle,
  //         //   {
  //         //     borderBottomColor:
  //         //       this.state.selectedIndex !== 0
  //         //         ? colours.lightBlueTheme
  //         //         : colours.white,
  //         //   },
  //         // ]}

  //         style={
  //           this.state.selectedIndex != 0 ?
  //           styles.tabViewStyle : 
  //           styles.tabViewStyle1

  //         }
  //         onPress={() => {
  //           this.setState({ selectedIndex: 1 });
  //         }}
  //       >
  //         <Text
  //           style={[
  //             styles.tabTextStyle,
  //             {
  //               color:
  //                 this.state.selectedIndex !== 0
  //                   ? colours.white
  //                   : colours.gray,
  //             },
  //           ]}
  //         >
  //           {STRING_CONST.RETURN}
  //         </Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }


  tabView() {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#e1f2f1",height:scale(50),borderRadius:scale(10),alignItems:'center' }}>
        <TouchableOpacity
          // style={[
          //   styles.tabViewStyle,
          //   {
          //     borderBottomColor:
          //       this.state.selectedIndex == 0
          //         ? colours.lightBlueTheme
          //         : colours.white,
          //   },
          // ]}
          style={
            this.state.selectedIndex == 0 ?
            styles.tabViewStyle : 
            styles.tabViewStyle1

          }
          onPress={() => {
            this.setState({ selectedIndex: 0 });
          }}
        >
          <Text
            style={[
              styles.tabTextStyle,
              {
                color:
                  this.state.selectedIndex == 0
                    ? "#585c5f"
                    : colours.gray,
              },
            ]}
          >
            {STRING_CONST.ONE_WAY}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          // style={[
          //   styles.tabViewStyle,
          //   {
          //     borderBottomColor:
          //       this.state.selectedIndex !== 0
          //         ? colours.lightBlueTheme
          //         : colours.white,
          //   },
          // ]}

          style={
            this.state.selectedIndex != 0 ?
            styles.tabViewStyle : 
            styles.tabViewStyle1

          }
          onPress={() => {
            this.setState({ selectedIndex: 1 });
          }}
        >
          <Text
            style={[
              styles.tabTextStyle,
              {
                color:
                  this.state.selectedIndex !== 0
                    ? "#585c5f"
                    : colours.gray,
              },
            ]}
          >
            {STRING_CONST.RETURN}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  getClassText() {

    const {userData}  = this.state;

    let goldMember = userData.gold_member
    let silverMember = userData.silver_member
    let bronzeMember = userData.bronze_member

    let classObject
    let classSelected 

    if(bronzeMember){
      classObject = this.state.classObject1;
      classSelected = this.state.classSelected1;

    }
    else{
      classObject = this.state.classObject1;
      classSelected = this.state.classSelected;
    }

   
    let selectedClassCount = 0;
    let index = -1;
    for (i = 0; i < classSelected.length; i++) {
      if (classSelected[i]) {
        selectedClassCount = selectedClassCount + 1;
        index = i;
      }
    }
    if (selectedClassCount == 1) {
      return `${classObject[index].class}`;
    } else if (selectedClassCount == 0) {
      return ` None`;
    } else {
      return `${selectedClassCount} Classes`;
    }
  }

  getClassView() {
    const { classObject, travellersCount,classObject1 } = this.state;
    return (
      <TouchableOpacity
        style={styles.classViewContainer}
        onPress={() => {
          this.setState({
            showClassModal: true,
          });
        }}
      >
        {/* <TouchableOpacity
          style={styles.classViewInnerContainer}
          onPress={() => {
            this.setState({
              showClassModal: true,
            });
          }}
        >
          <FastImage
            source={IMAGE_CONST.SEAT_ICON}
            resizeMode="contain"
            style={[styles.infoIcon, { marginRight: scale(7) }]}
          />
          <View style={{}}>
            <Text
              style={[
                styles.classViewTextStyle,
                {
                  color: classObject
                    ? colours.darkBlueTheme
                    : colours.lightGreyish,
                },
              ]}
            >
              {classObject ? this.getClassText() : STRING_CONST.CABIN_CLASS}
            </Text>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.classViewInnerContainer}
          onPress={() => {
            this.setState({
              showClassModal: true,
            });
          }}
        >
          <FastImage
            source={IMAGE_CONST.TRAVELLER_ICON}
            style={[styles.infoIcon1, { marginRight: scale(9) }]}
          />
          <View>
            <Text
              style={[
                styles.classViewTextStyle,
                {
                  color:
                    travellersCount !== 0
                      ? colours.darkBlueTheme
                      : colours.lightGreyish,
                  alignSelf: "center",
                },
              ]}
            >
              {travellersCount !== 0
                ? travellersCount
                : STRING_CONST.TRAVELLERS}
            </Text>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  async validateFindFlightData() {



    this.setState({
      isSearchClicked: true,
    });
    const {
      airlineSelected,
      selectedSource,
      classSelected,
      classObject,
      tierSelected,
      travellersCount,
      selectedIndex,
      departStartDate,
      returnStartDate,
      departEndDate,
      returnEndDate,
    } = this.state;
    const guestId = await getStoreData("guestId");
    const userId = await getUserId("userId");
    let travel_classes = getBAClassesString(classSelected);
    if (airlineSelected && selectedSource && !isEmptyString(departStartDate)) {
      if (
        selectedIndex == 0 ||
        (selectedIndex == 1 && !isEmptyString(returnStartDate))
      ) {
        if (
          !this.props.userInfo.silver_member &&
          !this.props.userInfo.gold_member
        ) {
          if (isAndroid() || isIOS()) {

            console.log("yes hcekc here inside is Androd  -  - === =",)

            // let loggedInUserPostHog = {}
            // loggedInUserPostHog["user"] = {
            //   access_token: this.state.access_token
            // }
            // loggedInUserPostHog["event_name"] = "Saw map page login screen"
            // loggedInUserPostHog["data"] = {
            //   "tier": this.state.tierSelected,
            //   "airlineCode": "BA",
            //   "journeyType":selectedIndex == 0 ? "one_way" : "return",
            //   "passenger": travellersCount,
            //   "start_date":departStartDate,
            //   "end_date":departEndDate,
            //   "arrival_start_date": returnStartDate,
            //   "arrival_end_date": returnEndDate,
            //   "source": selectedSource,
            //   "destination":"",
            //   "cabin_class":travel_classes,
            //   "metaData" : {
            //     "deviecBrand":this.state.deviecBrand,
            //     "deviceName":this.state.deviceName,
            //     "isEmulator":this.state.isEmulator,
            //     "isTablet":this.state.isTablet,
            //     "plateform": "Mobile",
            //   }
            // }
            // Alert.alert("yes here on post hog !")
            this.setState({
              showPopUp: true,
            });
          } else {
            // this.props.navigation.navigate(STRING_CONST.PRICING_SCREEN);
          }
        } else {
          let airline = airlineSelected.replace("_", "-").toLowerCase();
          let index = classSelected.indexOf(true);
          let WhereFrom = this.state.selectedIndex == 0 ? this.state.travelTo : null;
          searchData = {
            airline: airline,
            sourceCode: selectedSource,
            tier:tierSelected,
            passengerCount: travellersCount,
            tripType: selectedIndex == 1 ? "return" : "one_way",
            classSelected: classObject[index].value,
            classesSelected: classSelected,
            outboundStartDate: departStartDate,
            outboundEndDate: departEndDate,
            inboundStartDate: selectedIndex == 1 ? returnStartDate : null,
            inboundEndDate: selectedIndex == 1 ? returnEndDate : null,
            airways: airlineSelected,
            selectedStartDate: departStartDate,
            travelTo: selectedIndex == 0 ? this.state.travelTo : false,
          };
          user_action_audit = {};
          user_action_audit["user_id"] = userId;
          user_action_audit["guest_id"] = guestId;
          user_action_audit["event_id"] = uuid.v4();
          user_action_audit["source_page"] = "map";
          user_action_audit["destination_page"] = "calendar";
          user_action_audit["event_type"] = 0;
          user_action_audit["event_time"] = moment().format("YYYY-MM-DD HH:MM");
          user_action_audit["trip_type"] =
            selectedIndex == 1 ? "return" : "one_way";
          user_action_audit["search_data"] = {
            airline: airline,
            source: selectedSource.code,
            destination: "",
            departure_date_from: departStartDate,
            departure_date_to: departEndDate,
            arrival_date_from: selectedIndex == 1 ? returnStartDate : "",
            arrival_date_to: selectedIndex == 1 ? returnEndDate : "",
            passenger_count: travellersCount,
            cabin_classes: travel_classes,
          };
         
         
          
          let classSelected1 = "";
          for (i = 0; i < classSelected.length; i++) {
            if (classSelected[i]) {
              if (isEmptyString(classSelected1)) {
                classSelected1 = classSelected1.concat(`${classes1[i]}`);
              } else {
                classSelected1 = classSelected1.concat(`,${classes1[i]}`);
              }
            }
          }   
          
          console.log("yes getting here on onseach - - - - - - -")

          const trackData = {
            "Search Type": 'Map Page',
            "Search Parameters": {   
              airline:"British Airways",
              originIATA: WhereFrom ? 'N/A' : selectedSource.code,
              destinationIATA: WhereFrom ? selectedSource.code : 'N/A',
              originCity: WhereFrom ? 'N/A' : selectedSource.city_name ? selectedSource.city_name : 'N/A',
              destinationCity: WhereFrom && selectedSource.city_name  ? selectedSource.city_name  : 'N/A',
              originCountry: WhereFrom ? 'N/A' : selectedSource.country_name ? selectedSource.country_name : 'N/A',
              destinationCountry: WhereFrom && selectedSource.country_name ? selectedSource.country_name : 'N/A',
              journeyType: selectedIndex == 1 ? "return" : "one_way",
              numberOfPassengers: travellersCount,
              cabinClasses: classSelected1,
              searchOriginatedFrom: 'Map Page',
              outboundStartDate: departStartDate ? departStartDate : 'N/A',
              outboundEndDate: departEndDate ? departEndDate : 'N/A',
              inboundStartDate: returnStartDate ? returnStartDate : 'N/A',
              inboundEndDate: returnEndDate ? returnEndDate : 'N/A'
            },
          }
          // PostHog.capture('Search', trackData);
          this.props.onSearchPressed(searchData, user_action_audit, WhereFrom);
        }
      }
    }
  }
  getDate() {
    const {
      isSearchClicked,
      departStartDate,
      returnStartDate,
      selectedIndex,
      departEndDate,
      returnEndDate,
    } = this.state;
    return (
      <View>
        <TouchableOpacity
          style={[
            styles.airlineMembershipButton,
            {
              paddingBottom: verticalScale(6),
              borderBottomColor:
                isSearchClicked && !departStartDate
                  ? colours.errorColor
                  : colours.borderBottomLineColor,
            },
          ]}
          onPress={() => {
            this.props.navigation.navigate(STRING_CONST.CREATE_ALERT_SCREEN, {
              headingText: STRING_CONST.DEPART_TEXT,
              onSelectPress: (startDate, endDate) => {
                this.setState({
                  showCreateAlertModal: true,
                  departStartDate: startDate,
                  departEndDate: endDate,
                });
              },
              showDateRange: true,
              selectedStartDate: this.state.departStartDate,
              selectedEndDate: this.state.departEndDate,
            });
          }}
        >
          <FastImage
            source={IMAGE_CONST.DEPARTURE}
            resizeMode="contain"
            style={[styles.infoIcon1, { marginRight: scale(10) }]}
          />
          <View style={{}}>
            <Text
              style={[
                styles.airlineMembershipTextStyle,
                {
                  color:
                    isSearchClicked && isEmptyString(departStartDate)
                      ? colours.errorColor
                      : colours.lightGreyish,
                  fontSize: departEndDate ? scale(10) : scale(14),
                },
              ]}
            >
              {STRING_CONST.DEPART_DATE}
            </Text>
            {!isEmptyString(departStartDate) && (
              <Text
                style={
                  (styles.inputTextStyle,
                    [
                      {
                        fontWeight: "bold",
                        color: !departEndDate
                          ? colours.lightGreyish
                          : colours.darkBlueTheme,
                        fontSize: this.state.departStartDate
                          ? scale(14)
                          : scale(10),
                      },
                    ])
                }
              >
                {`${!isEmptyString(departStartDate)
                  ? `${getformattedDate(departStartDate)}`
                  : ""
                  }${!isEmptyString(departEndDate) &&
                    departStartDate !== departEndDate
                    ? ` - ${getformattedDate(departEndDate)}`
                    : ""
                  }`}
              </Text>
            )}
          </View>
        </TouchableOpacity>
        {selectedIndex == 1 && (
          <TouchableOpacity
            style={[
              styles.airlineMembershipButton,
              {
                paddingBottom: verticalScale(6),
                borderBottomColor: !isEmptyString(departStartDate)
                  ? isSearchClicked && isEmptyString(returnStartDate)
                    ? colours.errorColor
                    : colours.borderBottomLineColor
                  : colours.borderBottomLineColor,
              },
            ]}
            onPress={() => {
              let difference = moment(this.state.returnStartDate).diff(
                moment(this.state.departStartDate)
              );
              if (!isEmptyString(departStartDate)) {
                this.props.navigation.navigate(
                  STRING_CONST.CREATE_ALERT_SCREEN,
                  {
                    headingText: STRING_CONST.RETURN,
                    onSelectPress: (startDate, endDate) => {
                      this.setState({
                        showCreateAlertModal: true,
                        returnStartDate: startDate,
                        returnEndDate: endDate,
                      });
                    },
                    showDateRange: true,
                    minDate: this.state.departStartDate,
                    selectedStartDate:
                      difference < 0 ? "" : this.state.returnStartDate,
                    selectedEndDate:
                      difference < 0 ? "" : this.state.returnEndDate,
                  }
                );
              }
            }}
          >
            <FastImage
              source={IMAGE_CONST.DEPARTURE}
              style={[styles.infoIcon1, { marginRight: scale(7) }]}
            />
            <View style={{}}>
              <Text
                style={[
                  styles.airlineMembershipTextStyle,
                  {
                    color: !isEmptyString(departStartDate)
                      ? isSearchClicked && isEmptyString(returnStartDate)
                        ? colours.errorColor
                        : colours.lightGreyish
                      : colours.borderBottomLineColor,
                    fontSize: returnStartDate ? scale(10) : scale(14),
                  },
                ]}
              >
                {STRING_CONST.RETURN_DATE}
              </Text>
              {!isEmptyString(returnStartDate) && (
                <Text
                  style={
                    (styles.inputTextStyle,
                      [
                        {
                          fontWeight: "bold",
                          color: !returnStartDate
                            ? colours.lightGreyish
                            : colours.darkBlueTheme,
                          fontSize: this.state.returnStartDate
                            ? scale(14)
                            : scale(10),
                        },
                      ])
                  }
                >
                  {`${!isEmptyString(returnStartDate)
                    ? `${getformattedDate(returnStartDate)}`
                    : ""
                    }${!isEmptyString(returnEndDate) &&
                      returnEndDate !== returnStartDate
                      ? ` - ${getformattedDate(returnEndDate)}`
                      : ""
                    }`}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }




  postHogAnalytics = (body) => {
    if(this.props.isLoggedIn){
      this.props.loggedinUserPostHogFun(body)
    }
    else{
      this.props.guestUserPostHogFunc(body)
    }
  }

  informationView() {
    const { isSearchClicked, 
      airlineSelected,
      selectedSource,
      classSelected,
      classObject,
      tierSelected,
      travellersCount,
      selectedIndex,
      departStartDate,
      returnStartDate,
      departEndDate,
      returnEndDate,
      
    } = this.state;
    let travel_classes = getBAClassesString(classSelected);
    return (
      <View style={styles.informationContainer}>
        {this.tabView()}
        {/* <TouchableOpacity
          style={[
            styles.airlineMembershipButton,
            {
              paddingBottom: verticalScale(6),
              borderBottomColor:
                isSearchClicked && !airlineSelected
                  ? colours.errorColor
                  : colours.borderBottomLineColor,
            },
          ]}
          onPress={() => {
            this.props.navigation.navigate(
              STRING_CONST.AIRLINE_MEMBERSHIP_SCREEN,
              {
                airLinesMembershipDetailsObject: this.props
                  .airLinesMembershipDetailsObject,
                onMembershipSelected: (airlineSelected, tierSelected) => {
                  this.setState({
                    airlineSelected: airlineSelected,
                    tierSelected: tierSelected,
                  });
                },
                airlineSelected: this.state.airlineSelected,
                tierSelected: this.state.tierSelected,
              }
            );
          }}
        >
          <FastImage
            source={IMAGE_CONST.PLANE}
            style={[styles.infoIcon, { marginRight: scale(7) }]}
          />
          <View style={{}}>
            <Text
              style={[
                styles.airlineMembershipTextStyle,
                {
                  color:
                    isSearchClicked && !airlineSelected
                      ? colours.errorColor
                      : colours.lightGreyish,
                  fontSize: this.state.airlineSelected ? scale(10) : scale(14),
                },
              ]}
            >
              {STRING_CONST.AIRLINE} | {STRING_CONST.MEMBERSHIP_TIER}
            </Text>
            {airlineSelected && (
              <Text
                style={
                  (styles.inputTextStyle,
                  [
                    {
                      fontWeight: "bold",
                      color: !airlineSelected
                        ? colours.lightGreyish
                        : colours.darkBlueTheme,
                      fontSize: this.state.airlineSelected
                        ? scale(14)
                        : scale(10),
                    },
                  ])
                }
              >
                {airlineSelected
                  ? airlineSelected.airline
                  : STRING_CONST.AIRLINE}{" "}
                |{" "}
                {tierSelected
                  ? tierSelected.title
                  : STRING_CONST.MEMBERSHIP_TITLE}
              </Text>
            )}
          </View>
        </TouchableOpacity> */}
        {
          // this.state.selectedIndex == 0 ?
            <View>
              {
                this.state.travelData.map((singleMap, key) => {
                  return (
                    <View style={{marginLeft:scale(-3)}}>
                      {
                        this.state.checked == key ?
                          <TouchableOpacity onPress={async () => {
                            this.setState({ checked: key, })
                          }}
                            style={{ flexDirection: 'row', width: width * 0.93, alignItems: 'center', borderWidth: 0, flexWrap: "wrap", margin: scale(7) }}>
                            <FastImage source={require("../../assets/common/radio_btn_check.png")} style={{ height: scale(18), width: scale(18), padding: scale(4) }} />
                            <Text style={{ fontSize: scale(13), padding: scale(2), paddingStart: scale(4), fontFamily: STRING_CONST.appFonts.INTER_REGULAR }}> {singleMap.value}</Text>
                          </TouchableOpacity>
                          :
                          <TouchableOpacity onPress={async () => {
                            this.setState({
                              checked: key,
                              travelTo: !this.state.travelTo
                            })
                          }}
                            style={{ flexDirection: 'row', width: width * 0.93, alignItems: 'center', borderWidth: 0, flexWrap: "wrap", margin: scale(7) }}>
                            <FastImage source={require("../../assets/common/radio_btn_uncheck.png")} style={{ height: scale(18), width: scale(18), padding: scale(4) }} />
                            <Text style={{ fontSize: scale(13), padding: scale(2), paddingStart: scale(4), fontFamily: STRING_CONST.appFonts.INTER_REGULAR }}> {singleMap.value}</Text>
                          </TouchableOpacity>
                      }
                    </View>
                  )
                })
              }
            </View>
            // :
            // null
        }
        {this.getLocation()}
        {this.getDate()}
        {this.getClassView()}
        {/* {!this.checkErrorCondition() && isSearchClicked && (
          <Text style={styles.errorMessage}>
            {STRING_CONST.CHOOSE_ALL_FIELDS}
          </Text>
        )} */}
        {this.renderBottomButton(
          STRING_CONST.SEARCH_MAP,
          colours.lightBlueTheme,
          () => {
            if (this.props.isLoggedIn) {
              this.validateFindFlightData();
            } else {


              let uuid_Key = uuid.v4()
              let guestUserPostHog = {}
              guestUserPostHog["sessionId"] = `${uuid_Key}`
              guestUserPostHog["event_name"] = "Saw map page login screen"
              guestUserPostHog["data"] = {
                "tier": this.state.tierSelected,
                "airlineCode": "BA",
                "journeyType":selectedIndex == 0 ? "one_way" : "return",
                "passenger": travellersCount,
                "start_date":departStartDate,
                "end_date":departEndDate,
                "arrival_start_date": returnStartDate,
                "arrival_end_date": returnEndDate,
                "source": selectedSource,
                "destination":"",
                "cabin_class":travel_classes,
                "metaData" : {
                  "deviecBrand":this.state.deviecBrand,
                  "deviceName":this.state.deviceName,
                  "isEmulator":this.state.isEmulator,
                  "isTablet":this.state.isTablet,
                  "plateform": "Mobile",
                }
              }

              // console.log("yes hcekc here inside the posthog analytics .   . .  . .   .",)
              // this.postHogAnalytics(guestUserPostHog)

              this.setState({
                showLoginPopup: true,
              });
            }
          }
        )}
      </View>
    );
  }
  onSourceSelected(selectedSource) {
    this.setState({
      selectedSource: selectedSource,
    });
  }
  getFullDestinationName(destinationObject) {
    let code = "";
    destinationObject.airports.map((item, index, arrayRef) => {
      if (arrayRef.length == 1) {
        code = code.concat(`${item.code}`)
      }
      else {
        code = code.concat(`${item.code}, `)
      }
      // code  = item.code      
    });
    let fullName = `${destinationObject.city_name} (${code})`;
    return fullName;
  }
  getLocation() {
    const { selectedSource, isSearchClicked } = this.state;
    if (selectedSource) {
      if (
        selectedSource &&
        selectedSource.airports &&
        selectedSource.airports.length > 1
      ) {
        countryName = selectedSource.airports
          .map((item, index) => {
            return item.code;
          })
          .join(",");
        hasMultiple = true;
      } else {
        countryName = selectedSource.country_name;
      }
    }
    return (
      <TouchableOpacity
        style={[
          styles.airlineMembershipButton,
          {
            paddingBottom: verticalScale(6),
            borderBottomColor:
              isSearchClicked && !selectedSource
                ? colours.errorColor
                : colours.borderBottomLineColor,
          },
        ]}
        onPress={() => {
          this.props.navigation.navigate(STRING_CONST.LOCATION_LIST_SCREEN, {
            type: "source",
            locationsObject: getMapSearchData(),
            placeholderTitle: STRING_CONST.WHERE_ARE_YOU_FLYING_FROM,
            allLocations: this.props.locationsObject,
            sourceSelected: null,
            onSourceSelected: (selectedSource) => {
              this.onSourceSelected(selectedSource);
            },
            selectedLocation: selectedSource,
          });
        }}
      >
        <FastImage
          source={IMAGE_CONST.LOCATION_PIN}
          resizeMode="contain"
          style={[styles.infoIcon, { marginRight: scale(7) }]}
        />
        <View style={{}}>
          {
            this.state.selectedIndex == 0 ?
              <Fragment>
                {
                  this.state.travelTo ?
                    <Text
                      style={[
                        styles.airlineMembershipTextStyle,
                        {
                          color:
                            isSearchClicked && !selectedSource
                              ? colours.errorColor
                              : colours.lightGreyish,
                          fontSize: selectedSource ? scale(10) : scale(14),
                        },
                      ]}
                    >
                      {"Where To"}/{STRING_CONST.AIRPORT_TEXT}
                    </Text>
                    :
                    <Text
                      style={[
                        styles.airlineMembershipTextStyle,
                        {
                          color:
                            isSearchClicked && !selectedSource
                              ? colours.errorColor
                              : colours.lightGreyish,
                          fontSize: selectedSource ? scale(10) : scale(14),
                        },
                      ]}
                    >
                      {"Where From"}/{STRING_CONST.AIRPORT_TEXT}
                    </Text>
                }
              </Fragment>
              :
              <Fragment>
                {
                  <Text
                    style={[
                      styles.airlineMembershipTextStyle,
                      {
                        color:
                          isSearchClicked && !selectedSource
                            ? colours.errorColor
                            : colours.lightGreyish,
                        fontSize: selectedSource ? scale(10) : scale(14),
                      },
                    ]}
                  >
                    {"Where From"}/{STRING_CONST.AIRPORT_TEXT}
                  </Text>
                }
              </Fragment>
          }

          {selectedSource && (
            <Text
              numberOfLines={1}
              style={
                (styles.inputTextStyle,
                  [
                    {
                      fontWeight: "bold",
                      color: !selectedSource
                        ? colours.lightGreyish
                        : colours.darkBlueTheme,
                      fontSize: selectedSource ? scale(15) : scale(10),
                      width: scale(270)
                    },
                  ])
              }
            >
              {this.getFullDestinationName(selectedSource)}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    const {
      showLoginPopup,
      showClassModal,
      travellersCount,
      classObject,
      showPopUp,    
    } = this.state;
    const {userData} = this.state     
    const { navigation, } = this.props;    
    let bronzeMember = userData.bronze_member     
    return (
      <ImageBackground source={IMAGE_CONST.FindFlight_BG} resizeMode="cover" style={{height:"100%",width:"100%",justifyContent:"center",alignItems:"center"}}>
        <MyStatusBar  />
        <SafeAreaView style={styles.container}>
          {this.renderHeader()}
          <ScrollView>
            {this.informationView()}
            <Text style={styles.wheretoGoTextStyle}>
              {STRING_CONST.I_KNOW_WHERE_TO_GO}
            </Text>
            {this.renderBottomButton(
              STRING_CONST.FIND_FLIGHT_TITLE,
              colours.darkBlueTheme,
              () => {
                this.props.navigation.goBack();
              }
            )}
            {showClassModal && (
              <TravellersAndClassModal
                onCrossPressed={() => {
                  this.setState({
                    showClassModal: false,
                  });
                }}
                showClassModal={false}
                onDonePressed={(data, array, travellersCount) => {
                  this.setState({
                    classObject: data,
                    classSelected: array,
                    travellersCount: travellersCount,
                    showClassModal: false,
                  });
                }}
                travellersCount={travellersCount}
                selectedClassObject={bronzeMember ? this.state.classObject1 : this.state.classObject}
                userData={this.state.userData}
              />
            )}
           
            
          {
            isAppReviewSuccess == false || buildVersion == 0  ?
            <Fragment>
            {showPopUp  &&  (
              <PopUpComponent
                isSingleButton={false}
                // haveCrossIcon={true}
                title={STRING_CONST.UPGRADE_MEMBERSHIP_TEXT}
                message={STRING_CONST.MAP_SEARCH_UPGRADE_MESSAGE}
                image={IMAGE_CONST.UPGRADE_MEMBERSHIP}
                leftButtonText={STRING_CONST.NO}
                rightButtonText={STRING_CONST.UPGRADE}
                onLeftButtonPress={() => {
                  this.setState({
                    showPopUp: false,
                  });
                }}
                onRightButtonPress={() => {
                  this.setState({
                    showPopUp: false,
                  });            
                  this.props.navigation.navigate("MembershipContainerScreen")
                  // yes changed here for app review.......
                  // Linking.canOpenURL(Config.UPGRADE_MEMBERSHIP_URL).then(
                  //   (supported) => {
                  //     if (supported) {
                  //       Linking.openURL(Config.UPGRADE_MEMBERSHIP_URL);
                  //     } else {
                  //       console.log(
                  //         "Can not open URI: " + Config.UPGRADE_MEMBERSHIP_URL
                  //       );
                  //     }
                  //   }
                  // );
                }}
              />
            )}
            </Fragment> 
            : null  
          }
            {showLoginPopup && (
              // <PopUpComponent
              //   isSingleButton={false}
              //   haveCrossIcon={true}
              //   title={STRING_CONST.LOGIN}
              //   message={STRING_CONST.LOGIN_TEXT}
              //   image={IMAGE_CONST.LOGIN_ICON}
              //   leftButtonText={STRING_CONST.SIGN_UP}
              //   rightButtonText={STRING_CONST.LOGIN}
              //   onLeftButtonPress={() => {
              //     this.setState({
              //       showLoginPopup: false,
              //     });
              //     this.props.navigation.navigate("SignUp");
              //   }}
              //   onRightButtonPress={() => {
              //     this.setState({
              //       showLoginPopup: false,
              //     });
              //     this.props.navigation.navigate("Anonymous");
              //   }}
              // />

              <View>
              <Modal
                isVisible={true}
                style={{ margin: 0, justifyContent: "flex-end" }}
              >
                <View style={styles.mainView}>
                  <View style={styles.innerView}>
                    <View
                      style={styles.titleView}
                    >
                       <View>
                          <Text style={styles.titleTextStyle1}>{"      "}</Text>
                      </View>
                      <View>
                          <Text style={styles.titleTextStyle}>{STRING_CONST.LOGIN_SIGNUP}</Text>
                      </View>
                      <View>
                          <TouchableOpacity
                          onPress={() => {
                            this.setState({ showLoginPopup: false });
                          }}
                          style={{marginBottom:scale(10)}}
                        >
                            <Entypo name="cross" size={30} color={colours.lightGreyish} />
                        </TouchableOpacity>
                      </View>
                    </View>
                    
                    <FastImage
                      source={IMAGE_CONST.LOGIN_ICON}
                      style={{ marginTop: verticalScale(35), width:scale(106), height:scale(94),alignSelf:'center' }}
                    />
                    <Text style={[styles.messageStyle,{fontWeight: "500",}]}>{STRING_CONST.LOGIN_TEXT}</Text>
                    <View style={styles.doubleButtonView}>
                      <TouchableOpacity
                        style={styles.leftButtonStyle}
                        onPress={() => {
                          this.setState({
                                  showLoginPopup: false,
                                });
                                this.props.navigation.navigate("SignUp");
                        }}
                      >
                        <Text style={styles.leftButtonTextStyle}>
                          {STRING_CONST.SIGN_UP}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.leftButtonStyle}
                        onPress={() => {
                          this.setState({
                                  showLoginPopup: false,
                                });
                                this.props.navigation.navigate("SignIn");
                        }}
                      >
                        <Text style={styles.leftButtonTextStyle}>
                        {STRING_CONST.LOGIN}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            )}
        </ScrollView>
      </SafeAreaView>
      </ImageBackground>
    );
  }
}
