//   british_airways   -----> airlineSelected

import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableHighlight,
  BackHandler,
  Alert,
  ImageBackground
} from "react-native";
import FastImage from 'react-native-fast-image'
// import crashlytics from "@react-native-firebase/crashlytics";
import MyStatusBar from '../../components/statusbar/index'
import PostHog from 'posthog-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from "./findFlightStyles";
import TravellersAndClassModal from "./travellersAndClassModal";
import * as STRING_CONST from "../../constants/StringConst";
import * as IMAGE_CONST from "../../constants/ImageConst";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import ScreenHeader from "../../components/header/Header";
import { getGeoDistance, getBAClassesString, getAirlinesLogo,isEmptyString } from "../../utils/commonMethods";
import moment from "moment";
import { getStoreData, getUserId } from "../../constants/DataConst";
import Modal from "react-native-modal";
var uuid = require('react-native-uuid');
import DeviceInfo from "react-native-device-info";
import * as RootNavigation from '../../router/RouteNavigation';
const classes1 = ["Economy","Premium Economy","Business", "First"]
export default class FindFlightComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classObject: [
        {
          class: "Economy",
          isSelected: true,
        },
        {
          class: "Premium Economy",
          isSelected: true,
        },
        {
          class: "Business",
          isSelected: true,
        },
        {
          class: "First",
          isSelected: true,
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
      selectedSource: {"airports": [{"code": "LGW", "name": "Gatwick"}, {"code": "LHR", "name": "Heathrow"}, {"code": "LCY", "name": "City"}, {"code": "LTN", "name": "Luton"}, {"code": "SEN", "name": "Southend"}, {"code": "STN", "name": "Stansted"}], "city_name": "London", "code": "LON", "country_name": "United Kingdom", "latitude": 51.148056, "longitude": -0.190278, "name": "London", "type": "city"},
      selectedDestination: null,
      showClassModal: false,
      classSelected: [true, true, true, true],
      classSelected1: [true, false, false, false],
      travellersCount: 1,
      // airlineSelected:null  Only for testing we have commented this
      airlineSelected: "british_airways",
      tierSelected: null,
      selectedIndex: this.props.isReturn ? 1 : 0,
      locationsObject: this.props.locationsObject,
      airlinesPossileRoutesList: this.props.airlinesPossileRoutesList,
      isSearchClicked: false,
      nearestAirports: [],
      showAirlineModal: false,
      userSelectedAirlineIndex: -1,
      userSelectedAirlineMembershipIndex: -1,
      userSelectedAirline: null,
      userSelectedAirlineMembership: null,
      airlinesMembershipDetails: null,
      staticDateArray: [],
      isLoader:false,
      // userConfigDetails:this.props.userConfigDetails

     };
  }

  getNearestCity(airports) {
    const { currentLatitude, currentLongitude } = this.props
    let distanceArray = []
    if (airports) {
      airports.map((item, index) => {
        let distance = getGeoDistance(currentLatitude, currentLongitude, item.latitude, item.longitude, "K")
        distanceArray.push(distance)
      })

      if (!this.state.selectedSource) {
        this.setState({
          selectedSource: airports[distanceArray.indexOf(Math.min(...distanceArray))]
        })
      }
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
  }

  handleBackButton = (nav) => {
    if (!nav.isFocused()) {
      return true;
    } else {
      Alert.alert(
        'Exit App',
        'Do you want to Exit..',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Exit',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {
          cancelable: false,
        },
      );
      return true;
    }
  };


  // logCrashlytics = async () => {
    
  //   const userData  = this.props.userData

  //   crashlytics().log("Dummy Details Added just for added ");
  //   await Promise.all([
  //     crashlytics().setUserId("101"),
  //     crashlytics().setAttribute("credits", String(50)),
  //     crashlytics().setAttributes({
  //       email: userData.email,
  //     }),
  //   ]);
  // };

  //  logCrash = async (user) => {
  //   console.log("yes chekcking its calling  - -  - - - -")
  //   crashlytics().crash();
  // };

  //  logError = async (user) => {
  //   crashlytics().log("Updating user count.");
  //   try {
  //     if (users) {
  //       // An empty array is truthy, but not actually true.
  //       // Therefore the array was never initialised.
  //       setUserCounts(userCounts.push(users.length));
  //     }
  //   } catch (error) {
  //     crashlytics().recordError(error);
  //     console.log(error);
  //   }
  // };



  componentDidMount = async () => {

    const userData  = this.props.userData

   

    let deviceName = await DeviceInfo.getDeviceName()
    let deviecBrand = await DeviceInfo.getBrand()
    let isTablet = await DeviceInfo.isTablet()
    let isEmulator = await DeviceInfo.isEmulator()
    let trackData = {}
    let isNewSignUp =  await AsyncStorage.getItem("isNewSignUp");

    // if(this.props.isLoggedIn){
      // this.logCrashlytics()          
    // }


    if(userData && Object.keys(userData).length !== 0 && isNewSignUp){
       trackData = {
        planName: "Bronze Trial Plan",
        chargeBeePlanId: "bronze-trial-plan",
        billingFrequency: userData.current_plan.period_unit === 'year' ? 'Annual' : 'Monthly',
        onTrial: userData.current_plan.on_trial ? 'Yes' : 'No',
        trialLength: 150,
        trialUnit:  'Months',
        reffered:  'No',
        affiliateId:  'N/A',
        affiliateProgram:  'N/A'
      }
    }


    setTimeout(() => {
        if(this.props.isLoggedIn && Object.keys(userData).length !== 0){
          PostHog.identify(this.props.userData.email, {
            email: this.props.userData.email,
            deviceName: deviceName,
            deviecBrand:deviecBrand,
            isTablet:isTablet,
            isEmulator:isEmulator,
            Plateform:"Mobile",
            userType:"Logged-in user"
          });
        }
    }, 100);

 
    setTimeout(async() => {
      if(isNewSignUp){
        PostHog.capture('New Sign Up', trackData);
      }
    }, 1200);
     
    setTimeout(async() => {
      if(isNewSignUp){
       await AsyncStorage.removeItem('isNewSignUp')
      }
    }, 2000);

    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
  };
  // }




  // componentDidUpdate = async (prevProps) => {
  //   let userId = await AsyncStorage.getItem("userId");
  //   if (this.props !== prevProps) {
  //     if (
  //       this.props.airlinesPossileRoutesList &&
  //       this.props.airlinesPossileRoutesList !==
  //       prevProps.airlinesPossileRoutesList
  //     ) {
  //       this.setState({
  //         airlinesPossileRoutesList: this.props.airlinesPossileRoutesList,
  //       });
  //     }
  //     if (
  //       this.props.locationsObject !== prevProps.locationsObject
  //     ) {
  //       this.setState({
  //         locationsObject: this.props.locationsObject,
  //       });
  //     }
  //     // if (userId == null) {
  //     //   this.setState({
  //     //     airlineSelected: this.props.airLinesMembershipDetailsObject[0].airline.replace(" ", "_").toLowerCase(),
  //     //     tierSelected: this.props.airLinesMembershipDetailsObject[0].memberships[0].value,
  //     //     airLinesMembershipDetailsObject: this.props.airLinesMembershipDetailsObject
  //     //   });
  //     // }

  //     if (this.props.userData !== prevProps.userData) {
  //       if (Object.keys(this.props.userData).length !== 0 && !this.props.userData.airline_memberships) {          
  //         this.setState({
  //           showAirlineModal: true
  //         })
  //       } else {
  //         this.setState({
  //           airlineSelected: this.props.userData.airline_memberships[0].airline,
  //           tierSelected: this.props.userData.airline_memberships[0].membership,
  //           airlinesMembershipDetails: this.props.airLinesMembershipDetailsObject
  //         });
  //       }
  //     }
  //     if (
  //       this.props.airLinesMembershipDetailsObject &&
  //       this.props.airLinesMembershipDetailsObject !==
  //       prevProps.airLinesMembershipDetailsObject
  //     ) {
  //       this.setState({
  //         airlineSelected: this.props.airLinesMembershipDetailsObject[0],
  //         tierSelected: this.props.airLinesMembershipDetailsObject[0].memberships[0],
  //         airlinesMembershipDetails: this.props.airLinesMembershipDetailsObject
  //       });
  //     }
  //     if (this.props.nearestAirports && this.props.nearestAirports !== prevProps.nearestAirports) {
  //       this.setState({
  //         nearestAirports: this.props.nearestAirports,
  //       });
  //     }
  //     if (this.props.currentLatitude && this.props.currentLongitude && this.props.locationsObject) {
  //       this.getNearestCity(this.props.locationsObject)
  //     }
  //   }
  // }


  componentDidUpdate = async (prevProps) => {

    let userId = await AsyncStorage.getItem("userId");
    if (this.props !== prevProps) {
      if (
        this.props.airlinesPossileRoutesList &&
        this.props.airlinesPossileRoutesList !==
        prevProps.airlinesPossileRoutesList
      ) {
        this.setState({
          airlinesPossileRoutesList: this.props.airlinesPossileRoutesList,
        });
      }
      if (
        this.props.locationsObject !== prevProps.locationsObject
      ) {
        this.setState({
          locationsObject: this.props.locationsObject,
        });
      }
      if (userId == null) {
        this.setState({
          airlineSelected: this.props.airLinesMembershipDetailsObject[0].airline.replace(" ", "_").toLowerCase(),
          tierSelected: this.props.airLinesMembershipDetailsObject[0].memberships[0].value,
          airLinesMembershipDetailsObject: this.props.airLinesMembershipDetailsObject
        });
      }

      if (this.props.userData !== prevProps.userData) {
        if (Object.keys(this.props.userData).length !== 0 && !this.props.userData.airline_memberships) {
          this.setState({
            showAirlineModal: true
          })
        } else {
          if (this.props.userData.airline_memberships) {
            this.setState({
              airlineSelected: this.props.userData.airline_memberships[0].airline,
              tierSelected: this.props.userData.airline_memberships[0].membership,
              airlinesMembershipDetails: this.props.airLinesMembershipDetailsObject
            });
          }
        
        }
      }
      if (
        this.props.airLinesMembershipDetailsObject &&
        this.props.airLinesMembershipDetailsObject !==
        prevProps.airLinesMembershipDetailsObject
      ) {
        this.setState({
          airlineSelected: this.props.airLinesMembershipDetailsObject[0],
          tierSelected: this.props.airLinesMembershipDetailsObject[0].memberships[0],
          airlinesMembershipDetails: this.props.airLinesMembershipDetailsObject
        });
      }
      if (this.props.nearestAirports && this.props.nearestAirports !== prevProps.nearestAirports) {
        this.setState({
          nearestAirports: this.props.nearestAirports,
        });
      }
      if (this.props.currentLatitude && this.props.currentLongitude && this.props.locationsObject) {
        this.getNearestCity(this.props.locationsObject)
      }
    }
  }



  goToNotifications() {
    const { navigation } = this.props;
    // Alert.alert("YES CALLING THIS ON FINDFLIGHT!")
    this.props.navigation.navigate(STRING_CONST.NOTIFICATIONS_SCREEN, { fromAlertScreen: false });
  }

  renderHeader() {
    return (
      <ScreenHeader
        {...this.props}
        left
        setting
        title={STRING_CONST.FIND_FLIGHT_TITLE}
        right
        notifCount={2}
        clickOnRight={() => this.goToNotifications()}
      />
    );
  }

  renderBottomButton(buttonText, backgroundColor, onButtonPress) {
    return (

      <TouchableOpacity
        style={[styles.buttonStyle, { backgroundColor: backgroundColor }]}
        activeOpacity={.6}
        onPress={() => { onButtonPress() }}>
        <Image source={require("../../assets/mapSearch/WorldMap.png")} resizeMode="contain" style={{height:scale(25),width:scale(25),marginRight:scale(-5)}}  />
        <Text style={styles.buttonTextStyle}>{buttonText}</Text>
      </TouchableOpacity>
    );
  }

  renderBottomButton1(buttonText, backgroundColor, onButtonPress) {
    return (

      <TouchableOpacity
        style={[styles.buttonStyle, { backgroundColor: backgroundColor }]}
        activeOpacity={.6}
        onPress={() => { onButtonPress() }}>
        <Text style={styles.buttonTextStyle}>{buttonText}</Text>
      </TouchableOpacity>
    );
  }

  // tabView() {
  //   return (
  //     <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
  //       <TouchableOpacity
  //         style={[
  //           styles.tabViewStyle,
  //           {
  //             borderBottomColor:
  //               this.state.selectedIndex == 0
  //                 ? colours.lightBlueTheme
  //                 : colours.white,
  //           },
  //         ]}
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
  //                   ? colours.darkBlueTheme
  //                   : colours.lightGreyish,
  //             },
  //           ]}
  //         >
  //           {STRING_CONST.ONE_WAY}
  //         </Text>
  //       </TouchableOpacity>

  //       <TouchableOpacity
  //         style={[
  //           styles.tabViewStyle,
  //           {
  //             borderBottomColor:
  //               this.state.selectedIndex !== 0
  //                 ? colours.lightBlueTheme
  //                 : colours.white,
  //           },
  //         ]}
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
  //                   ? colours.darkBlueTheme
  //                   : colours.lightGreyish,
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
    
    const {userData}  = this.props;
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
      if(classObject[index].class == "Premium Economy"){
        return `Prem Econ`;
      }
       return `${classObject[index].class}`;
    } else if (selectedClassCount == 0) {
      return ` None`;
    } else {
      return `${selectedClassCount} Classes`;
    }
  }


  checkIfPeakOffPeakDataMonth = () => {
    let month =  new Date().getMonth()
    if(month === 0){
      monthKey = 23
    }else if(month === 1){
      monthKey = 22
    } else if(month === 2){
      monthKey = 21
    } else if(month === 3){
      monthKey = 20
    } else if(month === 4){
      monthKey = 19
    } else if(month === 5){
      monthKey = 18
    } else if(month === 6){
      monthKey = 17
    } else if(month === 7){
      monthKey = 16
    } else if(month === 8){
      monthKey = 15
    } else if(month === 9){
      monthKey = 14
    } else if(month === 10){
      monthKey = 13
    } else if(month === 11){
      monthKey = 22
    }
  }
  getClassView() {

    const {classObject} = this.state

    return (
      <TouchableOpacity
        style={styles.classViewContainer}
        onPress={() => {
          this.setState({
            showClassModal: true,
          });
        }}
      >
        <TouchableOpacity
          style={styles.classViewInnerContainer}
          onPress={() => {
            this.setState({
              showClassModal: true,
            });
          }}
        >
          <FastImage
            source={IMAGE_CONST.SEAT_ICON}
            style={[styles.infoIcon, { marginRight: scale(7) }]}
          />
          <View style={{}}>
            <Text
              style={[
                styles.classViewTextStyle,
                {
                  color: this.state.classObject
                    ? colours.darkBlueTheme
                    : colours.lightGreyish,
                },
              ]}
            >
              {this.state.classObject ? this.getClassText() : STRING_CONST.CABIN_CLASS}
            </Text>
          </View>
        </TouchableOpacity>
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
            style={[styles.infoIcon1, { marginRight: scale(7) }]}
          />
          <View>
            <Text
              style={[
                styles.classViewTextStyle,
                {
                  color:
                    this.state.travellersCount !== 0
                      ? colours.darkBlueTheme
                      : colours.lightGreyish,
                  alignSelf: "center",
                },
              ]}
            >
              {this.state.travellersCount !== 0
                ? `${this.state.travellersCount} ${this.state.travellersCount > 1 ? 'Passengers' : 'Passenger'}`
                : STRING_CONST.TRAVELLERS}
            </Text>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
  
   validateFindFlightData = async() => {    
    this.setState({
      isSearchClicked: true,
      isLoader:true
    })

    const {userData}  = this.props;

    let goldMember = userData.gold_member
    let silverMember = userData.silver_member
    let bronzeMember = userData.bronze_member

    const {
      airlineSelected,
      selectedSource,
      selectedDestination,
      classSelected,
      tierSelected,
      travellersCount,
      selectedIndex,
      classSelected1
    } = this.state;
     const guestId = await getStoreData('guestId')
    const userId = await getUserId('userId')


    if (selectedSource && selectedDestination) {
      let travel_classes
      if(bronzeMember){
         travel_classes = getBAClassesString(classSelected1)
         } 
      else{
        travel_classes = getBAClassesString(classSelected)
      }
      // let airline = airlineSelected
      //   .replace("_", "-")
      //   .toLowerCase();
      // let airline = this.state.airlineSelected
      searchData = {
        airline: "british-airways",
        sourceCode: selectedSource.code,
        destinationCode: selectedDestination.code,
        passengerCount: travellersCount,
        tier: bronzeMember ? "bronze":"gold",
        selectedSource: selectedSource,
        selectedDestination: selectedDestination,
        isReturn: selectedIndex == 1,
        classSelected: bronzeMember ? classSelected1 : classSelected,
        // airways: airlineSelected,                                 
        airways:"british_airways"
      };
      user_action_audit = {}
      user_action_audit['user_id'] = userId
      user_action_audit['guest_id'] = guestId
      user_action_audit['event_id'] = uuid.v4()
      user_action_audit['source_page'] = 'landing'
      user_action_audit['destination_page'] = 'calendar'
      user_action_audit['event_type'] = 0
      user_action_audit['event_time'] = moment().format("YYYY-MM-DD HH:MM");
      user_action_audit['trip_type'] = this.state.selectedIndex == 1 ? 'return' : 'one_way'
      user_action_audit['search_data'] = {
        airline: "british-airways",
        source: this.state.selectedSource.code,
        destination: this.state.selectedDestination.code,
        departure_date_from: '',
        departure_date_to: '',
        arrival_date_from: '',
        arrival_date_to: '',
        passenger_count: this.state.travellersCount,
        cabin_classes: travel_classes,//Array
      }

          // let classSelected1 = "";
          // for (i = 0; i < classSelected.length; i++) {
          //   if (classSelected[i]) {
          //     if (isEmptyString(classSelected1)) {
          //       classSelected1 = classSelected1.concat(`${classes1[i]}`);
          //     } else {
          //       classSelected1 = classSelected1.concat(`,${classes1[i]}`);
          //     }
          //   }
          // }   
          


      const trackData = {
        "Search Type": 'Calendar Page',
        "Search Parameters": {   
          airline:"British Airways",
          originIATA: selectedSource.code,
          destinationIATA: selectedDestination.code,
          originCity: selectedSource.city_name ? selectedSource.city_name : 'N/A',
          destinationCity: selectedDestination && selectedDestination.city_name  ? selectedDestination.city_name  : 'N/A',
          originCountry: selectedSource &&  selectedSource.country_name ? selectedSource.country_name : 'N/A',
          destinationCountry: selectedDestination && selectedDestination.country_name ? selectedDestination.country_name : 'N/A',
          journeyType: selectedIndex == 1 ? "return" : "one_way",
          numberOfPassengers: travellersCount,
          cabinClasses: this.renderClassValues(),
          searchOriginatedFrom: 'Home Page',
          outboundStartDate: 'N/A since Calendar Page search',
          outboundEndDate: 'N/A since Calendar Page search',
          inboundStartDate: 'N/A since Calendar Page search',
          inboundEndDate: 'N/A since Calendar Page search'
        },
      }
      PostHog.capture('Search', trackData);
      this.props.onSearchPressed(searchData, user_action_audit);
    }
  }


  renderClassValues(){
    const { classSelected, } = this.state;

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

    return classSelected1;
  }

  getNearestAirport(airportList) {
    const { currentLatitude, currentLongitude } = this.props
    let distanceArray = []

    airportList.map((item, index) => {

      let distance = getGeoDistance(currentLatitude, currentLongitude, item.latitudeAirport, item.longitudeAirport, "K")
      if (distance) {
        distanceArray.push(distance)
      }
    })

    if (distanceArray.length > 0) {
      let nearestAirport = airportList[distanceArray.indexOf(Math.min(...distanceArray))]
      return `${nearestAirport.nameAirport},${nearestAirport.codeIataCity} `
    }
  }

  informationView() {
    const { isSearchClicked, airlineSelected, selectedSource, selectedDestination, tierSelected, nearestAirports } = this.state
    const { currentLatitude } = this.props
    return (
      <View style={styles.informationContainer}>
        {this.tabView()}
        {/* <TouchableOpacity
          style={[styles.airlineMembershipButton,{borderBottomColor:isSearchClicked && !airlineSelected ? colours.errorColor: colours.borderBottomLineColor,}]}
          onPress={() => {
            this.props.navigation.navigate(STRING_CONST.AIRLINE_MEMBERSHIP_SCREEN, {
              airLinesMembershipDetailsObject: this.props
                .airLinesMembershipDetailsObject,
              onMembershipSelected: (airlineSelected, tierSelected) => {
                this.setState({
                  airlineSelected: airlineSelected,
                  tierSelected: tierSelected,
                });
              },
              airlineSelected:this.state.airlineSelected,
              tierSelected:this.state.tierSelected
            });
          }}
        >
          <Image source={IMAGE_CONST.PLANE} style={[styles.infoIcon, {marginRight: scale(7)}]} />
          <View style={{}}>
            <Text
              style={[
                styles.airlineMembershipTextStyle,
                {
                  color: !airlineSelected && !isSearchClicked
                    ? colours.lightGreyish : isSearchClicked && !airlineSelected ? colours.errorColor
                    : colours.darkBlueTheme,
                },
              ]}
            >
              {airlineSelected
                ? airlineSelected.airline
                : STRING_CONST.AIRLINE}{" "}
              /{" "}
              {tierSelected
                ? tierSelected.title
                : STRING_CONST.MEMBERSHIP_TIER}
            </Text>
          </View>
        </TouchableOpacity> */}
        {this.getLocation()}
        {/* { selectedSource && nearestAirports && currentLatitude &&
        <Text style = {styles.airportNameStyle}>{STRING_CONST.NEAREST_AIRPORT}: {this.getNearestAirport(nearestAirports)} </Text>} */}
        {this.getClassView()}
        {isSearchClicked && (!selectedSource || !selectedDestination) && <Text style={{color:colours.redColor, alignSelf:'center',marginBottom:verticalScale(5), fontSize:scale(12), fontFamily: STRING_CONST.appFonts.INTER_REGULAR, }}>Please choose all fields</Text>}
        {this.renderBottomButton1("Search", colours.lightBlueTheme, () => {
          this.validateFindFlightData();
        })}
      </View>
    );
  }
  onSourceSelected(selectedSource) {
    this.setState({
      selectedSource: selectedSource,
    });
  }
  onDestinationSelected(selectedDestination) {
    this.setState({
      selectedDestination: selectedDestination,
    });
  }

  getLocation111() {
    const { isSearchClicked, selectedSource, selectedDestination, airlinesPossileRoutesList,locationsObject } = this.state
  


    // console.log("yes check here selected source  - - - - - - ",locationsObject)


    return (
      <View
        style={styles.getLocationContainer}
      >
        <TouchableOpacity
          style={[styles.getlocationStyle, { borderBottomColor: isSearchClicked && !selectedSource ? colours.errorColor : colours.borderBottomLineColor, }]}
          onPress={() => {
            if (locationsObject && this.state.airlinesPossileRoutesList) {
              this.props.navigation.navigate(STRING_CONST.LOCATION_LIST_SCREEN, {
                screenType: "Findflight",
                type: !selectedDestination ? "source" : "destination",
                locationsObject: !selectedDestination
                  ? locationsObject
                  : airlinesPossileRoutesList,
                placeholderTitle: STRING_CONST.WHERE_ARE_YOU_FLYING_FROM,
                allLocations: locationsObject,
                sourceSelected: selectedDestination,
                onSourceSelected: (selectedSource) => {
                  this.onSourceSelected(selectedSource);
                  // this.props.getNearestAirport(selectedSource.latitude, selectedSource.longitude )
                },
                selectedLocation: selectedSource
              })
            }
          }}
        >
          <Text
            style={[
              styles.getLocationTextStyle,
              {
                color: selectedSource
                  ? colours.darkBlueTheme : !selectedSource && !isSearchClicked ?
                    colours.lightGreyish : colours.errorColor,
              },
            ]}
          >
            {selectedSource
              ? selectedSource.code
              : STRING_CONST.FROM}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              styles.getLocationSubTextStyle,
              {
                color: selectedSource
                  ? colours.darkBlueTheme : !selectedSource && !isSearchClicked ?
                    colours.lightGreyish : colours.errorColor,
              },
            ]}
          >
            {selectedSource
              ? selectedSource.name
              : STRING_CONST.ORIGIN_CITY}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("check what is happending here ####### ",)

            if (selectedSource && selectedDestination) {
              let selectedSourceObject = selectedSource;
              let selectedDestinationObject = selectedDestination;
              let temp;
              temp = selectedSourceObject;
              (selectedSourceObject = selectedDestinationObject),
                (selectedDestinationObject = temp);
               this.setState({
                selectedSource: selectedSourceObject,
                selectedDestination: selectedDestinationObject,
              });
            }
          }}

          style={{borderWidth:0,width:scale(40),alignSelf:'center'}}
        >
          <FastImage resizeMode="contain" source={IMAGE_CONST.RETURN_ICON}
            style={[styles.returnIcon]} />
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={[styles.getlocationStyle, { borderBottomColor: isSearchClicked && !selectedDestination ? colours.errorColor : colours.borderBottomLineColor, }]}
          onPress={() => {
            this.props.navigation.navigate(STRING_CONST.LOCATION_LIST_SCREEN, {
              screenType: "Findflight",
              type: !selectedSource ? "source" : "destination",
              sourceSelected: selectedSource,
              allLocations: locationsObject,
              locationsObject: !selectedSource
                ? locationsObject
                : airlinesPossileRoutesList,
              placeholderTitle: STRING_CONST.WHERE_ARE_YOU_FLYING_TO,
              onSourceSelected: (selectedSource) => {
              this.onDestinationSelected(selectedSource);
              },
              selectedLocation: selectedDestination
            });
          }}
        >
          <Text
            style={[
              styles.getLocationTextStyle,
              {
                color: selectedDestination
                  ? colours.darkBlueTheme : !selectedDestination && !isSearchClicked ?
                    colours.lightGreyish : colours.errorColor,
              },
            ]}
          >
            {selectedDestination
              ? selectedDestination.code
              : STRING_CONST.TO}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              styles.getLocationSubTextStyle,
              {
                color: selectedDestination
                  ? colours.darkBlueTheme : !selectedDestination && !isSearchClicked ?
                    colours.lightGreyish : colours.errorColor,
              },
            ]}
          >
            {selectedDestination
              ? selectedDestination.name
              : STRING_CONST.DESTINATION_CITY}
          </Text>
        </TouchableOpacity> */}
      </View>
    );
  }



  getFullDestinationName(destinationObject) {
    let code = "";
    destinationObject.airports.map((item, index, arrayRef) => {
      if (arrayRef.length == 1) {
        code = code.concat(`${item.code}`)
      }else if(index == (arrayRef.length - 1)){
        code = code.concat(`${item.code}`)
      }
      else {
        code = code.concat(`${item.code}, `)
      }
    })
    let fullName = `${destinationObject.city_name} (${code})`;
    return fullName;
  }


  getLocation() {

    const { isSearchClicked, selectedSource, selectedDestination, airlinesPossileRoutesList,locationsObject } = this.state
  

  
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
      <Fragment>
      <TouchableOpacity
        style={[
          styles.airlineMembershipButton1,
          {
            paddingBottom: verticalScale(6),

            borderBottomColor:
              isSearchClicked && !selectedSource
                ? colours.errorColor
                : colours.borderBottomLineColor,
          },
        ]}
        onPress={() => {
          if (locationsObject && this.state.airlinesPossileRoutesList) {
            this.props.navigation.navigate(STRING_CONST.LOCATION_LIST_SCREEN, {
              screenType: "Findflight",
              type: !selectedDestination ? "source" : "destination",
              locationsObject: !selectedDestination
                ? locationsObject
                : airlinesPossileRoutesList,
              placeholderTitle: STRING_CONST.WHERE_ARE_YOU_FLYING_FROM,
              allLocations: locationsObject,
              sourceSelected: selectedDestination,
              onSourceSelected: (selectedSource) => {
                this.onSourceSelected(selectedSource);
                // this.props.getNearestAirport(selectedSource.latitude, selectedSource.longitude )
              },
              selectedLocation: selectedSource
            })
          }
        }}
      >
        <FastImage
          source={IMAGE_CONST.TAKEOFF}
          resizeMode="contain"
          style={[styles.infoIcon1, { marginRight: scale(10) }]}
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
                          fontSize: selectedSource ? scale(11) : scale(14),
                        },
                      ]}
                    >
                      {"Departure City"}
                      {/* /{STRING_CONST.AIRPORT_TEXT} */}
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
                          fontSize: selectedSource ? scale(11) : scale(14),
                        },
                      ]}
                    >
                      {"Departure City"}
                      {/* /{STRING_CONST.AIRPORT_TEXT} */}
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
                        fontSize: selectedSource ? scale(11) : scale(14),
                      },
                    ]}
                  >
                  {"Departure City"}                  
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
                      fontSize: selectedSource ? scale(14) : scale(10),
                      width: scale(220)
                    },
                  ])
              }
            >
              {this.getFullDestinationName(selectedSource)}
            </Text>
          )}
        </View>
      </TouchableOpacity>


      <TouchableOpacity
          onPress={() => {
            console.log("check what is happending here ####### ",)

            if (selectedSource && selectedDestination) {
              let selectedSourceObject = selectedSource;
              let selectedDestinationObject = selectedDestination;
              let temp;
              temp = selectedSourceObject;
              (selectedSourceObject = selectedDestinationObject),
                (selectedDestinationObject = temp);
               this.setState({
                selectedSource: selectedSourceObject,
                selectedDestination: selectedDestinationObject,
              });
            }
          }}

          style={{borderWidth:0,width:scale(40),alignSelf:'flex-end'}}
        >
          <FastImage resizeMode="contain" source={IMAGE_CONST.RETURN_ICON}
            style={[styles.returnIcon]} />
        </TouchableOpacity>




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
            screenType: "Findflight",
            type: !selectedSource ? "source" : "destination",
            sourceSelected: selectedSource,
            allLocations: locationsObject,
            locationsObject: !selectedSource
              ? locationsObject
              : airlinesPossileRoutesList,
            placeholderTitle: STRING_CONST.WHERE_ARE_YOU_FLYING_TO,
            onSourceSelected: (selectedSource) => {
            this.onDestinationSelected(selectedSource);
            },
            selectedLocation: selectedDestination
          });
        }}
      >
        <FastImage
          source={IMAGE_CONST.DestinationCode}
          resizeMode="contain"
          style={[styles.infoIcon, { marginRight: scale(7) }]}
        />
        <View style={{}}>
         

{/* <Text
            style={[
              styles.getLocationTextStyle,
              {
                color: selectedDestination
                  ? colours.darkBlueTheme : !selectedDestination && !isSearchClicked ?
                    colours.lightGreyish : colours.errorColor,
              },
            ]}
          >
            {selectedDestination
              ? selectedDestination.code
              : STRING_CONST.TO}
          </Text> */}
          <Text
                      style={[
                        styles.airlineMembershipTextStyle,
                        {
                          color:
                            isSearchClicked && !selectedSource
                              ? colours.errorColor
                              : colours.lightGreyish,
                          fontSize: selectedSource ? scale(11) : scale(14),
                        },
                      ]}
                    >
                      {"Destination City"}
                      {/* /{STRING_CONST.AIRPORT_TEXT} */}
                    </Text>
         
          {selectedDestination && (
            <Text
              numberOfLines={1}
              style={
                (styles.inputTextStyle,
                  [
                    {
                      fontWeight: "bold",
                      color: !selectedDestination
                        ? colours.lightGreyish
                        : colours.darkBlueTheme,
                      fontSize: selectedDestination ? scale(14) : scale(10),
                      width: scale(220)
                    },
                  ])
              }
            >
              {this.getFullDestinationName(selectedDestination)}
            </Text> )}
        </View>
      </TouchableOpacity>
</Fragment>
    );
  }
  renderSubListItem(item, index, itemObject) {
    const { userSelectedAirlineMembershipIndex } = this.state;
    return (
      <TouchableHighlight
        onPress={() => {
          this.setState({
            userSelectedAirline: itemObject,
            userSelectedAirlineMembership: item,
            userSelectedAirlineMembershipIndex: index,
          });
        }}
        activeOpacity={1}
        underlayColor={colours.dimLightBlueBackgroundColor}
        style={{
          borderRadius: scale(5),
          paddingHorizontal: scale(10),
          paddingVertical: verticalScale(10),
          marginTop: verticalScale(5),
          backgroundColor:
            userSelectedAirlineMembershipIndex == index
              ? colours.dimLightBlueBackgroundColor
              : colours.white,
        }}
      >
        <Text style={styles.membershipSubListTextStyle}>{item.title}</Text>
      </TouchableHighlight>
    );
  }
  renderListItem(itemObject, index) {
    return (
      <View>
        {itemObject.airline == STRING_CONST.BRITISH_AIRWAYS &&
          <View>
            <TouchableOpacity
              style={styles.airlineContainer}
              onPress={() => {
                this.setState({
                  userSelectedAirlineIndex:
                    this.state.userSelectedAirlineIndex == index ? -1 : index,
                  userSelectedAirlineMembershipIndex: -1,
                });
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <FastImage
                  source={getAirlinesLogo(STRING_CONST.BRITISH_AIRWAYS)}
                  style={{ marginRight: scale(10),marginBottom:scale(7) }}
                />
                <Text style={styles.membershipListTextStyle}>
                  {itemObject.airline}
                </Text>
              </View>
              <View>{IMAGE_CONST.DARK_SORT_DOWN}</View>
            </TouchableOpacity>
            {this.state.userSelectedAirlineIndex == index && (
              <FlatList
                keyboardShouldPersistTaps="always"
                data={itemObject.memberships}
                renderItem={({ item, index }) => {
                  return this.renderSubListItem(item, index, itemObject);
                }}
              />
            )}
          </View>
        }
      </View>
    );
  }
  showTravelClassModel(){
    const {userData}  = this.props;
    let isLoggedIn = this.props.isLoggedIn

    let goldMember = userData.gold_member
    let silverMember = userData.silver_member
    let bronzeMember = userData.bronze_member
    return(
      <TravellersAndClassModal
                  showClassModal={true}
                  onCrossPressed={() => {
                    this.setState({
                      showClassModal: false,
                    });
                  }}
                  onDonePressed={(data, array, travellersCount) => {
                                   this.setState({
                      classObject: data,
                      classSelected: array,
                      travellersCount: travellersCount,
                      showClassModal: false,
                    });
                  }}
                  travellersCount={this.state.travellersCount}
                  selectedClassObject={bronzeMember ? this.state.classObject1 : this.state.classObject}
                  userData={this.props.userData}
                />
    )
  }


  showEmailVerify(){
    const {userData,isLoggedIn}  = this.props;
    // let isLoggedIn = this.props.isLoggedIn

    return(
      <View>
      {
        userData && Object.keys(userData).length != 0 && isLoggedIn ?
        <Fragment>
        {STRING_CONST.MANAGE_CONTACT_SCREEN && STRING_CONST.UPDATE_PROFILE_SCREEN &&
          userData &&
          !userData.email_verified && (
            <TouchableOpacity
              style={styles.bannerView}
              onPress={() => {
                this.props.navigation.navigate(STRING_CONST.MANAGE_CONTACT_SCREEN);
              }}
            >                
              <Text style={styles.bannerText}>
                {STRING_CONST.VERIFY_EMAIL_MESSAGE}
              </Text>
            </TouchableOpacity>
          )}
           </Fragment>
           : null
      } 
      </View>
    )
  }


  render() {
    const {userData}  = this.props;

       return (
          <ImageBackground source={IMAGE_CONST.FindFlight_BG} resizeMode="cover" style={{height:"100%",width:"100%",justifyContent:"center",alignItems:"center"}}>
           
          <SafeAreaView >
          <MyStatusBar  />
          <View style={styles.outerViewStyle}>
            {this.renderHeader()}

            {this.showEmailVerify()}
                  
            {/* <ScrollView keyboardShouldPersistTaps="always"> */}
              {this.informationView()}
              {
                // userData.buildVersion == 0 ? 
               <Fragment>
                   <Text style={styles.wheretoGoTextStyle}>
                    {STRING_CONST.DONT_KNOW_WHERE_TO_GO}
                  </Text>
             
                {this.renderBottomButton(STRING_CONST.MAP_SEARCH_TITLE, colours.darkBlueTheme, () => {
            
            this.props.navigation.navigate(STRING_CONST.MAP_SEARCH_SCREEN, {
                    airLinesMembershipDetailsObject: this.props
                      .airlinesMembershipDetails,
                    airlinesPossileRoutesList: this.props.airlinesPossileRoutes,
                    locationsObject: this.props.locationsObject,
                  });
                })}
              </Fragment> 
                // : null
              //   <Fragment>
              //      <Text style={styles.wheretoGoTextStyle}>
              //       {STRING_CONST.DONT_KNOW_WHERE_TO_GO}
              //     </Text>
             
              //   {this.renderBottomButton(STRING_CONST.MAP_SEARCH_TITLE, colours.darkBlueTheme, () => {
              //     this.props.navigation.navigate(STRING_CONST.MAP_SEARCH_SCREEN, {
              //       airLinesMembershipDetailsObject: this.props
              //         .airlinesMembershipDetails,
              //       airlinesPossileRoutesList: this.props.airlinesPossileRoutes,
              //       locationsObject: this.props.locationsObject,
              //     });
              //   })}
              // </Fragment> 
              } 
             


              {this.state.showClassModal &&
                <Fragment>
                  {this.showTravelClassModel()}
                  </Fragment>
              }
              {this.state.showAirlineModal && (
                <Modal isVisible={true}>
                  <View style={styles.airlineContainerView}>
                    <View style={styles.airlineViewHeader}>
                      <Text style={styles.airlineHeaderText}>
                        {STRING_CONST.AIRLINE_MEMBERSHIP_TIERS}
                      </Text>
                    </View>
                    <View style={styles.airlineInnerContainerView} />
                    <Text style={styles.confirmTierText}>
                      {STRING_CONST.CONFIRM_AIRLINE_TIERS}
                    </Text>
                    <FlatList
                      style={{ marginTop: verticalScale(10) }}
                      keyboardShouldPersistTaps="always"
                      data={this.state.airlinesMembershipDetails}
                      renderItem={({ item, index }) => {
                        return this.renderListItem(item, index);
                      }}
                    />
                    <TouchableOpacity
                      style={[styles.okButton, { backgroundColor: this.state.userSelectedAirline && this.state.userSelectedAirlineMembership ? colours.lightBlueTheme : colours.imageShadowColor }]}
                      disabled={!this.state.userSelectedAirline || !this.state.userSelectedAirlineMembership}
                      onPress={() => {
                        const {
                          userSelectedAirline,
                          userSelectedAirlineMembership,
                        } = this.state;
                        var userInfo = {};
                        userInfo[
                          "airline_name"
                        ] = userSelectedAirline.airline
                          .replace(" ", "_")
                          .toLowerCase();
                        userInfo["membership_type"] =
                          userSelectedAirlineMembership.value;
                        userInfo["airline_code"] = "BA"
                        this.setState({
                          airlineSelected: userInfo.airline_name,
                          tierSelected: userInfo.membership_type
                        })
                        this.props.onAirlineSelected(userInfo);
                        this.setState({ showAirlineModal: false });
                      }}
                    >
                      <Text style={styles.okText}>{STRING_CONST.OK}</Text>
                    </TouchableOpacity>
                    <Text style={styles.airlineMessageText}>
                      {STRING_CONST.AIRLINE_MESSAGE}
                    </Text>
                  </View>
                </Modal>
              )}
            {/* </ScrollView> */}
          </View>
          </SafeAreaView>
          </ImageBackground>
    );
  }
}