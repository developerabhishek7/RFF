import MapView, {Marker} from 'react-native-maps';
import React, { Component, Fragment } from "react";
import { StyleSheet, View, ImageBackground, Text, Modal,TouchableOpacity, BackHandler,Dimensions } from "react-native";
import { connect } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage'

import * as IMG_CONST from "../../constants/ImageConst";
import * as STRING_CONST from "../../constants/StringConst";
import { colours } from "../../constants/ColorConst";
import scale, { verticalScale } from "../../helpers/scale";
import { getAirlinesAvailability, getPointsAvailability } from "../../actions/calendarActions";
// import {getMapKey} from '../../actions/mapSearchActions'
import PopUpComponent from '../../shared/popUpComponent'
import * as CONFIG from "../../helpers/config";
import  Entypo from 'react-native-vector-icons/Entypo';
const { height, width } = Dimensions.get("window");
import * as IMAGE_CONST from "../../constants/ImageConst";
import FastImage from 'react-native-fast-image'

var uuid = require("react-native-uuid");
import { getAccessToken } from "../../constants/DataConst";
import {updateGuestUserPostHog,updateLoggedInUserPostHog} from '../../actions/userActions'
import DeviceInfo from "react-native-device-info";
import {
  getAirlinesMembership,
  getPossibleRoutes,
  getLocations,
  getNearestAirport,
  sendAuditData,
  getFlightSchedule
} from "../../actions/findFlightActions";
import styles from "./masSearchStyles";
const coordinates = [];
class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: coordinates,
      centerCoordinate: [-73.98330688476561, 40.76975180901395],
      mapSearchData: {},
      showPopUp: false,
      WhereFrom:this.props.route.params.WhereFrom,
      tripType:this.props.route.params.searchData.tripType,
      isMarkerClick: false,      
      isShowMarker:true,
      isLoader:true,
      sourceCode:"",accesstoken:"",deviceName:"",deviecBrand:"",isEmulator:"",isTablet:"",
      zoomLevel:0
    };
    this.markerRef = null;
  }


  postHogAnalytics = (body) => {
    if(this.props.isLoggedIn){
      this.props.updateLoggedInUserPostHogAction(body)
    }
    else{
      this.props.updateGuestUserPostHogAction(body)
    }
  }
  
  async componentDidMount() {
    // setTimeout(() => {
    //   MapToken = this.props.mapBoxToken.token     
    // }, 100);
    

      const accesstoken = await getAccessToken();
       setTimeout(() => {
        this.setState({isLoader:false,})
      }, 2000);

      let MAP_TOKEN = await AsyncStorage.getItem("MAP_TOKEN")
    
      let deviceName = await DeviceInfo.getDeviceName()
      let deviecBrand = await DeviceInfo.getBrand()
      let isTablet = await DeviceInfo.isTablet()
      let isEmulator = await DeviceInfo.isEmulator()
      

      this.setState({
        deviecBrand,deviceName,isTablet,isEmulator
      })
    
    let uuid_Key = uuid.v4()
    let userId = this.props.userInfo.id
    // if(!MAP_TOKEN){
    //   this.props.getMapKeyAction(uuid_Key,userId)
    // }
    
    let sourceCode  = this.props.route.params.searchData.sourceCode.code
    let auditData = this.props.route.params.auditData
    let searchData =  this.props.route.params.searchData
    // console.log("yes check here search Data #######     ",searchData.classesSelected)
    let cabinClasses = []
    // let economy = ""
    // let premium_economy = ""
    // let business =""
    // let first = ""
    if(searchData.classesSelected[0] == true){
      cabinClasses.push("economy")
    }if(searchData.classesSelected[1] == true){
      cabinClasses.push("premium")
    }
    if(searchData.classesSelected[2] == true){
      cabinClasses.push("business")
    }
    if(searchData.classesSelected[3] == true){
      cabinClasses.push("first")
    }
    let loggedInUserPostHog = {}
    loggedInUserPostHog["user"] = {
      access_token: accesstoken
    }
    loggedInUserPostHog["event_name"] = "Saw map page search results"
    loggedInUserPostHog["data"] = {
      "membership_tier": searchData.tier,
      "airlineCode": searchData.airline,
      "journeyType": searchData.tripType,
      "passenger": searchData.passengerCount,
      "outbound_start_date": searchData.outboundStartDate,
      "outbound_end_date": searchData.outboundEndDate,
      "inbound_start_date": searchData.inboundStartDate,
      "inbound_end_date": searchData.inboundEndDate,
      "source": searchData.sourceCode.code,
      "destination": "",
      "cabin_class":cabinClasses,
      "metaData" : {
        "deviecBrand":this.state.deviecBrand,
        "deviceName":this.state.deviceName,
        "isEmulator":this.state.isEmulator,
        "isTablet":this.state.isTablet,
        "plateform": "Mobile",
      }
    }
    setTimeout(() => {
           this.setState({
          sourceCode:sourceCode
        })
    }, 1000);

    var destinations = this.props.route.params.destinations;
    var coordinates = [];
    destinations && destinations.map((item, index) => {
      coordinates.push([item.longitude, item.latitude]);
    });
    let showPopUp = coordinates.length == 0
    this.setState({
      coordinates: coordinates,
      centerCoordinate: coordinates[0],
      showPopUp
    });
      BackHandler.addEventListener('hardwareBackPress', () =>
            this.handleBackButton(this.props.navigation),
          );
  }
  componentDidUpdate(prevProps) {

    let WhereFrom = this.props.route.params.WhereFrom;
    let auditData = this.props.route.params.auditData
    let searchData = this.props.route.params.searchData;
    let singleMap = this.state.mapSearchData.selectedDestination
  
    let destinations =  (this.props.route.params.destinations)
   
    let pointsData1 = []
    let pointsData2 = []
    // let pointsData = []
    // destinations && destinations.map((singleMap)=>{
    //   pointsData1 = singleMap.points.BA
    //   pointsData2 = singleMap.points.SS
    //    })
    // pointsData = [...pointsData1, ...pointsData2]

    // console.log("yes check here point s data ###### ",JSON.stringify(singleMap))

    let data1 = JSON.stringify(singleMap)
    let pointsDatBA =  []
    let pointsDataSS = []

    if(data1 && Object.keys(data1).length !== 0){
      let data = JSON.parse(data1)
      pointsDatBA =  data.points.BA
      pointsDataSS = data.points.SS
   
     
    }

  
    if (this.state.isMarkerClick) {
      if (this.props !== prevProps) {
        if (
          this.props.airlinesDetail &&
          this.props.airlinesDetail !== prevProps.airlinesDetail && this.props.screenType == 'MAP'
        ) {
          this.setState({isLoader:false})   

          this.props.navigation.navigate("destinationdetailscomponent", {
            singleMap: JSON.stringify(singleMap),
            WhereFrom: JSON.stringify(WhereFrom),          
            searchData: JSON.stringify(searchData),
            auditData: JSON.stringify(auditData),    
            tripType:this.state.tripType,
            sourceCode:this.state.sourceCode   ,
            pointsDatBA:pointsDatBA,
            pointsDataSS:pointsDataSS
          });
        }
      }
    }
  }



  renderBottomButton(buttonText, backgroundColor, onButtonPress) {
    return (
      <TouchableOpacity
        style={[styles.buttonStyleMap, { backgroundColor: backgroundColor, position: "absolute", bottom: 40 }]}
        onPress={() => {
          onButtonPress();
        }}
        activeOpacity={.6}
      >
        <Entypo name="location-pin" size={scale(20)} color="white" />
        <Text style={{
          marginLeft: scale(6),
          color: colours.white,
          marginTop: -scale(3),
          fontFamily: STRING_CONST.appFonts.INTER_BOLD,
          fontSize: scale(16),
          fontWeight: "bold",
        }}>{buttonText}</Text>
      </TouchableOpacity>
    );
    }

      composeAvailabilityData = () => {
        let destinations = this.props.route.params.destinations;
        let isEconomy = false;
        let isPremium = false;
        let isBusiness = false;
        let isFirst = false;

        destinations && destinations.map((singleMap)=>{
          let inboundData = singleMap.availability.inbound
          let outboundData = singleMap.availability.outbound
          if(outboundData){
            for(let i of Object.keys(outboundData)){      
              if(outboundData[i].economy){
                isEconomy = true
              }  
              if(outboundData[i].premium){
                isPremium = true
              }  
              if(outboundData[i].business){
                isBusiness = true
              }  
              if(outboundData[i].first){
                isFirst = true
              }
            }            
          }
          if(inboundData){
            for(let i of Object.keys(inboundData)){      
              if(inboundData[i].economy){
                isEconomy = true
              }  
              if(inboundData[i].premium){
                isPremium = true
              }  
              if(inboundData[i].business){
                isBusiness = true
              }  
              if(inboundData[i].first){
                isFirst = true
              }
            }            
          }
        })
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



    renderLoader () {
      return (
        <Modal
          transparent={true}
          animationType={'none'}
          visible={this.state.isLoader}             
        >
          <View style={{flex:1,justifyContent:'center',  
          backgroundColor: 'rgba(52, 52, 52, 0.4)',
          alignItems:'center',
          width:width+36,height:height,
          marginStart:-scale(20),
          marginEnd:-scale(27),
          marginTop:Platform.OS == "ios"?  scale(-20) :scale(-40),
          marginBottom:-scale(20),
          // borderWidth:3,borderColor:"green"
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



  render() {
    let destinations = (this.props.route.params.destinations)
    const { tripType,zoomLevel} = this.state;
  return (
    <View style={{ flex: 1, borderWidth: 0, borderColor: "green",backgroundColor:"#75cff0" }}>

      {this.renderLoader()}
        {this.composeAvailabilityData()}
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: -89.98155760646617,
            longitude: 89.99346179538875,
            latitudeDelta: 180,
            longitudeDelta: 180,
          }}
          >
          {destinations && destinations.map((item, index) => {
              let economy = false
              let premium = false
              let business = false
              let first = false
            
              if(tripType == "return"){
                const processObject = {
                  oubound: [],
                  inbound: [],
                };
                /// Code for oubound
                Object.keys(item.availability.outbound).map((outboundDate) => {
                  const dateKeys = Object.keys(item.availability.outbound[outboundDate]);              
                  if (dateKeys.map) {
                    dateKeys.map((outboundDateKey) => {
                      const keysForTypes = Object.keys(
                        item.availability.outbound[outboundDate][outboundDateKey]
                      );            
                      if (!keysForTypes.length) {
                        return;
                      }
                      processObject.oubound.push(outboundDateKey);
                    });
                  }
                });
              
                /// Code for inbound
                Object.keys(item.availability.inbound).map((inboundDate) => {
                  const dateKeys = Object.keys(item.availability.inbound[inboundDate]);            
                  if (dateKeys.map) {
                    dateKeys.map((inboundDateKey) => {
                      const keysForTypes = Object.keys(
                        item.availability.inbound[inboundDate][inboundDateKey]
                      );            
                      if (!keysForTypes.length) {
                        return;
                      }
                      processObject.inbound.push(inboundDateKey);
                    });
                  }
                });
                const uniqueOutbound = [...new Set([...processObject.oubound])];
                const uniqueInbound = [...new Set([...processObject.inbound])];
                                                                                                                       
                const finalResult = {};
                uniqueOutbound.map((f) => {
                  if (uniqueInbound.includes(f)) {
                    finalResult[f] = true;
                  }
                });
              
                 economy = finalResult.economy
                 premium = finalResult.premium
                 business = finalResult.business
                 first = finalResult.first
              }
              if(tripType == "one_way") {
                economy = item.available_classes.economy
                premium = item.available_classes.premium
                business = item.available_classes.business
                first = item.available_classes.first
              } 
              // let lat_long = `[${item.longitude},${item.latitude}]`
              // let coordinatesValue = JSON.parse(lat_long)
              let lat = `${item.latitude}`
              let long = `${item.longitude}`



              return(
                <Marker
                  draggable={false}
                  key={index}
                  coordinate = {{latitude: parseFloat(lat),longitude: parseFloat(long)}}
                  tracksViewChanges={true}
                  tracksInfoWindowChanges={false}
                  onPress={() => {
                    this.setState({ isMarkerClick: true })
                    let pointsData 
                    var availableDestinations = this.props.route.params.destinations
                    var destinations = availableDestinations.length > 0 ? availableDestinations : []
                    let data = this.props.route.params.searchData;
                    let auditData = this.props.route.params.auditData
                    let mapSearchData = {
                      airline: data.airline,
                      sourceCode: data.sourceCode.code,
                      destinationCode: destinations[index].code,
                      selectedDestination: destinations[index],
                      selectedSource: data.sourceCode,
                      tier: data.tier,
                      passengerCount: data.passengerCount,
                      isReturn: data.tripType !== "one_way",
                      classSelected: data.classesSelected,
                      airways: data.airways,
                      selectedStartDate: data.selectedStartDate
                    };
                    this.setState({
                      mapSearchData: mapSearchData,
                      isLoader:true
                    })
                    auditData['search_data']['destination'] = destinations[index].code;
                    let flightScheduleData = {
                      airline: mapSearchData.airline,
                      source: mapSearchData.sourceCode,
                      destination: mapSearchData.destinationCode
                    }
                    // destinations && destinations.map((singleMap)=>{
                    //   pointsData = singleMap.points.BA
                    // })
                    this.props.getFlightScheduleAction(flightScheduleData)
                    this.props.sendAuditDataAction(auditData);
                    this.props.getAirlinesAvailabilityAction(mapSearchData);
                    this.props.getPointsAvailabilityAction(mapSearchData)
                    
                  }}

                >
                      <Fragment>
                    {
                      this.state.isShowMarker ?
                        <Fragment>
                    {
                    economy && premium && business && first ?
                      <View style={{ borderColor: colours.black, borderWidth: 0, width: scale(30) }}>
                        <FastImage resizeMode="contain" source={require("../../assets/mapIcon/c1.png")} style={{ height: scale(30), width: scale(19) }} />
                      </View>
                      : null
                  }
                  {
                    economy && premium && business && !first ?
                      <View style={{ borderColor: colours.black, borderWidth: 0, width: scale(30) }}>
                        <FastImage resizeMode="contain" source={require("../../assets/mapIcon/c2.png")} style={{ height: scale(30), width: scale(19) }} />
                      </View>
                      : null
                  }
                  {
                    economy && premium && first && !business ?
                      <View style={{ borderColor: colours.black, borderWidth: 0, width: scale(30) }}>
                        <FastImage resizeMode="contain" source={require("../../assets/mapIcon/c3.png")} style={{ height: scale(30), width: scale(19) }} />
                      </View>
                      : null
                  }
                  {
                    economy && business && first && !premium ?
                      <View style={{ borderColor: colours.black, borderWidth: 0, width: scale(30) }}>
                        <FastImage resizeMode="contain" source={require("../../assets/mapIcon/c4.png")} style={{ height: scale(30), width: scale(19) }} />
                      </View>
                      : null
                  }
                  {
                    business && premium && first && !economy ?
                      <View style={{ borderColor: colours.black, borderWidth: 0, width: scale(30) }}>
                        <FastImage resizeMode="contain" source={require("../../assets/mapIcon/c5.png")} style={{ height: scale(30), width: scale(19) }} />
                      </View>
                      : null
                  }
                  {
                    economy && premium && !first && !business ?
                      <View style={{ borderColor: colours.black, borderWidth: 0, width: scale(30) }}>
                        <FastImage resizeMode="contain" source={require("../../assets/mapIcon/c6.png")} style={{ height: scale(30), width: scale(19) }} />
                      </View>
                      : null
                  }
                  {
                    economy && business && !first && !premium ?
                      <View style={{ borderColor: colours.black, borderWidth: 0, width: scale(30) }}>
                        <FastImage resizeMode="contain" source={require("../../assets/mapIcon/c7.png")} style={{ height: scale(30), width: scale(19) }} />
                      </View>
                      : null
                  }
                  {
                    economy && first && !business && !premium ?
                      <View style={{ borderColor: colours.black, borderWidth: 0, width: scale(30) }}>
                        <FastImage resizeMode="contain" source={require("../../assets/mapIcon/c8.png")} style={{ height: scale(30), width: scale(19) }} />
                      </View>
                      : null
                  }
                  {
                    premium && business && !first && !economy ?
                      <View style={{ borderColor: colours.black, borderWidth: 0, width: scale(30) }}>
                        <FastImage resizeMode="contain" source={require("../../assets/mapIcon/c9.png")} style={{ height: scale(30), width: scale(19) }} />
                      </View>
                      : null
                  }
                  {
                    premium && first && !economy && !business ?
                      <View style={{ borderColor: colours.black, borderWidth: 0, width: scale(30) }}>
                        <FastImage resizeMode="contain" source={require("../../assets/mapIcon/c10.png")} style={{ height: scale(30), width: scale(19) }} />
                      </View>
                      : null
                  }
                  {
                    business && first && !economy && !premium ?
                      <View style={{ borderColor: colours.black, borderWidth: 0, width: scale(30) }}>
                        <FastImage resizeMode="contain" source={require("../../assets/mapIcon/c10.png")} style={{ height: scale(30), width: scale(19) }} />
                      </View>
                      : null
                  }
                  {
                    economy && !first && !business && !premium ?
                      <View style={{ borderColor: colours.black, borderWidth: 0, width: scale(30) }}>
                        <FastImage resizeMode="contain" source={require("../../assets/mapIcon/c12.png")} style={{ height: scale(30), width: scale(19) }} />
                      </View>
                      : null
                  }

                  {
                    business && !first && !economy && !premium ?
                      <View style={{ borderColor: colours.black, borderWidth: 0, width: scale(30) }}>
                        <FastImage resizeMode="contain" source={require("../../assets/mapIcon/c13.png")} style={{ height: scale(30), width: scale(19) }} />
                      </View>
                      : null
                  }
                  {
                    premium && !first && !economy && !business ?
                      <View style={{ borderColor: colours.black, borderWidth: 0, width: scale(30) }}>
                        <FastImage resizeMode="contain" source={require("../../assets/mapIcon/c14.png")} style={{ height: scale(30), width: scale(19) }} />
                      </View>
                      : null
                  }

                  {
                    first && !premium && !economy && !business ?
                      <View style={{ borderColor: colours.black, borderWidth: 0, width: scale(30) }}>
                        <FastImage resizeMode="contain" source={require("../../assets/mapIcon/c15.png")} style={{ height: scale(30), width: scale(19) }} />
                      </View>
                      : null
                  }

                        </Fragment>
                      : null
                    }
                  </Fragment>
                </Marker>
              )
            }
          )
          }
        </MapView>
        <View
            style={{
              position: "absolute",
              top: 40,
              left: scale(20),
              zIndex: 99,
            }}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}
              style={{
                alignSelf: "stretch",
                paddingVertical: verticalScale(5),
                paddingHorizontal: scale(6),
                backgroundColor: colours.white,
                borderRadius: scale(5),
              }}
            >
              {IMG_CONST.CHEVRON_BACK}
            </TouchableOpacity>
          </View>
          {this.state.showPopUp && <PopUpComponent
            isSingleButton={true}
            title={STRING_CONST.NO_AVAILIBILTY_FOUND}
            message={STRING_CONST.NO_AVAILIBILTY}
            image={IMG_CONST.NO_AVAILIBILTY}
            rightButtonText={STRING_CONST.EDIT_SEARCH}
            onRightButtonPress={() => {
              this.setState({
                showPopUp: false
              })
              this.props.navigation.goBack()
            }}
          />}
            {this.renderBottomButton(
            STRING_CONST.DESTINATIONS,
            "#0e1f32",
            () => {
              this.props.navigation.navigate("destinationscomponent", {
                WhereFrom: this.state.WhereFrom,
                destinations: destinations,
                searchData: this.props.route.params.searchData,
                auditData: this.props.route.params.auditData,
                tripType:this.state.tripType,
                sourceCode:this.state.sourceCode      
              })
            }
          )}
      </View>
  );
}
};

const mapStateToProps = (state) => {
  const { calendar ,mapKeyReducer,userInfo ,logIn } = state;
  return {
    userInfo: userInfo.userData,
    isLoggedIn: logIn.isLoggedIn,
    airlinesDetail: calendar.airlinesDetail,
    screenType: calendar.screenType,
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAirlinesAvailabilityAction: (mapSearchData) =>
    dispatch(getAirlinesAvailability(mapSearchData, 'MAP')),
    // updateGuestUserPostHogAction: (guestUserPostHog) => dispatch(updateGuestUserPostHog(guestUserPostHog)),
    updateLoggedInUserPostHogAction: (loggedInUserPostHog) => dispatch(updateLoggedInUserPostHog(loggedInUserPostHog)),
    getPointsAvailabilityAction: (mapSearchData) => dispatch(getPointsAvailability(mapSearchData)),
    getFlightScheduleAction: (flightScheduleData) => dispatch(getFlightSchedule(flightScheduleData)),
    // getMapKeyAction: (uuid_Key,userId) => dispatch(getMapKey(uuid_Key,userId)),
    sendAuditDataAction: (auditData) => dispatch(sendAuditData(auditData)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);

const mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}],
  },
];




