import React, { Component, Fragment } from "react";
import { View, Text, Image, Alert,BackHandler,Linking,SafeAreaView } from "react-native";
import ScreenHeader from "../../components/header/Header";
import { connect } from "react-redux";
import * as STRING_CONST from "../../constants/StringConst";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import * as IMG_CONST from "../../constants/ImageConst";
import { TouchableOpacity } from "react-native-gesture-handler";
import  Ionicons  from "react-native-vector-icons/Ionicons";
import { getformattedDate, isEmptyString, getLocationNameWithCode } from "../../utils/commonMethods";
import MaterialIcon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import moment from "moment";
import * as IMAGE_CONST from "../../constants/ImageConst";
import ModalDropdown from "react-native-modal-dropdown";
import * as STR_CONST from "../../constants/StringConst";
import FastImage from 'react-native-fast-image'

import styles from "./PriceDetailsStyle";
import {
  getCabinClass
} from "../../actions/findFlightActions";
import PopUpComponent from "../../shared/popUpComponent";
import {
  cancelAlerts,
  resetCancelAlert,
  editAlert,
  resetAlertUpdate,
} from "../../actions/alertActions";
const classes = ["economy", "premium_economy", "business", "first"];

class PriceDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passengerCount: 1,
      selectedIndex: true,
      departStartDate: "",
      departEndDate: "",
      returnStartDate: "",
      returnEndDate: "",
      classSelectedArray: [true, true, true, true],
      showPopUp: false,
      isSavedPressed: false,
      selectedDestination:null,
      selectedSource:null,
      prevSelectedSource:null,
      prevSelectedDestination:null,
      id: "",
      airline: "",
      membershipType: "",
      airlineSelected: {},
      tierSelected: {},
      source: "",
      destination: "",
      availabilityUrl: "",
      availableClasses: "",
      isSearchClicked:true,
      locationsObject: this.props.locations,
      airlinesPossileRoutesList: this.props.airlinesPossileRoutes,
      passengerCount:this.props.route.params.passengerCount,
      searchData:this.props.route.params.searchData,
    //screenType:this.props.route.params.screen,
      skyScannerCabinCode:"economy",
      economy:true,
      premium:false,
      business:false,
      first:false,
      isEconomy:false,
      isPremium:false,
      isBusiness:false,
      isFirst:false,    
      cabinClassData:this.props.cabinClassData,
      cabinCode:"M",
      ageBand:"",
      trip_type:this.props.route.params.trip_type,
      classData:this.props.route.params.classData,
      headerTxt:this.props.route.params.headerTxt,
      selectedDate:""
    };
  }

  componentDidUpdate(prevProps) {
    const {cabinClassData} = this.state
    if (this.props !== prevProps) {
      if(cabinClassData){
        setTimeout(() => {
          this.setState({ cabinClassData:this.props.cabinClassData,})
        }, 1000);
       
      }
    
    }
  }

//   componentDidMount() {
//     // data = this.props.route.params.alertData;
//     // let searchData = this.props.route.params.data;

//     this.setState({
//       passengerCount: searchData.passengerCount,
//       selectedIndex: searchData.isReturn ? 1 : 0,
//       departStartDate: moment(searchData.startDate).format("YYYY-MM-DD"),
//       departEndDate: moment(searchData.endDate).format("YYYY-MM-DD"),
//       returnStartDate: searchData.arrivalStartDate
//         ? moment(searchData.arrivalStartDate).format("YYYY-MM-DD")
//         : "",
//       returnEndDate: searchData.arrivalEndDate
//         ? moment(searchData.arrivalEndDate).format("YYYY-MM-DD")
//         : "",
//       classSelectedArray: searchData.classSelected,
//       id: searchData.alertID,
//       airline: searchData.airways,
//       membershipType: searchData.tier,
//       source: searchData.selectedSource,
//       destination: searchData.selectedDestination,
//       availabilityUrl: searchData.availabilityUrl,
//       availableClasses: searchData.availableClasses.split(","),
//       isEconomy:searchData.classSelected[0],
//       isPremium:searchData.classSelected[1],
//       isBusiness:searchData.classSelected[2],
//       isFirst:searchData.classSelected[3]
//     });
//     BackHandler.addEventListener('hardwareBackPress', () =>
//     this.handleBackButton(this.props.navigation),
//   );
//   }


componentDidMount(){
  
  const {selectedSource, selectedDestination,searchData} = this.state

  setTimeout(() => {

    console.log("yes check here prevSelected Date = =  = = = =",searchData)

    this.setState({
      airlinesPossileRoutesList: this.props.airlinesPossileRoutes,
      locationsObject: this.props.locations,
      prevSelectedSource:searchData.sourceCode,
      prevSelectedDestination: searchData.destinationCode,
      selectedDate:this.props.route.params.selectedDate,
    })
  }, 300);



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

  getTravellersCountView() {
    return (
      <View style={styles.travelCountContainer}>
        <TouchableOpacity
          style={styles.countButtonStyle}
          onPress={() => {
            if (this.state.passengerCount > 1) {
              this.setState({
                passengerCount: this.state.passengerCount - 1,
              });
            }
          }}
        >
          {IMG_CONST.MINUS_ICON}
        </TouchableOpacity>
        <Text style={[{ marginHorizontal: scale(12), fontSize:scale(14) }]}>
          {this.state.passengerCount}
        </Text>
        <TouchableOpacity
          style={styles.countButtonStyle}
          onPress={() => {
            if(this.state.passengerCount < 6){
            this.setState({
              passengerCount: this.state.passengerCount + 1,
            });
          }
          }}
        >
          {IMG_CONST.PLUS_ICON}
        </TouchableOpacity>
      </View>
    );
  }

  renderHeader() {
    return (
      <View style={{marginHorizontal:scale(15)}}>
        <ScreenHeader
          {...this.props}
          left
          title={this.state.headerTxt}
          notifCount={2}
          clickOnRight={() => this.goToNotifications()}
          clickOnLeft={() => {
            this.props.navigation.goBack();
          }}
        />
      </View>
    );
  }


  onSourceSelected(selectedSource) {
    const {selectedDestination} = this.state;
    this.setState({
      selectedSource: selectedSource,
    });

    if(selectedSource && selectedDestination){
      let data = {
        source: selectedSource.code,
       destination: selectedDestination.code
     }

      this.props.getCabinClassAction(data)
    }
  }
  onDestinationSelected(selectedDestination) {
    const {selectedSource,} = this.state
  
    this.setState({
      selectedDestination: selectedDestination,
    });

    if(selectedSource && selectedDestination){
      let data = {
        source: selectedSource.code,
       destination: selectedDestination.code
     }
      this.props.getCabinClassAction(data)
    }
  }
  originView() {
    const { airlinesPossileRoutesList,searchData,isSearchClicked,selectedSource,selectedDestination,locationsObject,prevSelectedSource } = this.state
  
    // console.log("yes check here searh data selectedSource #######   ",selectedSource)
   
    return (
      <View style={{ marginTop: verticalScale(18) }}>
        <Text
          style={[
            styles.headingTextStyle,
            {
              marginBottom: verticalScale(8),
            },
          ]}
        >
          {STRING_CONST.ORIGIN}
        </Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate(STRING_CONST.LOCATION_LIST_SCREEN, {
                screenType: "Findflight",
              type: !selectedDestination ? "source" : "destination",
              locationsObject: !selectedDestination
                ? locationsObject
                : airlinesPossileRoutesList,
              placeholderTitle: STRING_CONST.WHERE_ARE_YOU_FLYING_FROM,
              allLocations: this.state.locationsObject,
              sourceSelected: selectedDestination,
              onSourceSelected: (selectedSource) => {
                this.onSourceSelected(selectedSource);
                // this.props.getNearestAirport(selectedSource.latitude, selectedSource.longitude )
              },
              selectedLocation: selectedSource
            })
          }}
          style={styles.orginDestinationStyle}
        >
       
          <Text
            numberOfLines={1}
            style={[
              styles.getLocationSubTextStyle,
              // {
              //   color: selectedSource
              //     ? colours.darkBlueTheme : !selectedSource && !isSearchClicked ?
              //       colours.lightGreyish : colours.errorColor,
              // },
            ]}
          >
            {selectedSource
              ? selectedSource.code
              :prevSelectedSource ? prevSelectedSource : "Select Origin"}
          </Text>

          <TouchableOpacity onPress={()=>{
            this.setState({
              selectedSource:null,
              prevSelectedSource:null
            })
          }}
          style={{borderWidth:0,borderColor:"red",height:scale(40),width:scale(40),justifyContent:"center",alignItems:"center"}}
        
          >
            <FastImage
              style={{
                justifyContent: "flex-end",
                marginEnd:scale(10),
                height:scale(15),  width:scale(15) 
              }}
              source={IMG_CONST.DARK_BLUE_CROSS_ICON}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  }

  destinationView() {
    const { selectedSource,searchData,isSearchClicked,airlinesPossileRoutesList,locationsObject,selectedDestination,prevSelectedDestination} = this.state
    return (
      <View style={{ marginTop: verticalScale(18) }}>
        <Text
          style={[
            styles.headingTextStyle,
            {
              marginBottom: verticalScale(8),
            },
          ]}
        >
          {STRING_CONST.DESTINATION}
        </Text>
        <TouchableOpacity 
          onPress={() => {
            this.props.navigation.navigate(STRING_CONST.LOCATION_LIST_SCREEN, {
              screenType: "Findflight",
            type: !selectedSource ? "source" : "destination",
            sourceSelected: selectedSource,
            allLocations: this.state.locationsObject,
            locationsObject: !selectedSource
              ? locationsObject
              : airlinesPossileRoutesList,
            placeholderTitle: STRING_CONST.WHERE_ARE_YOU_FLYING_TO,
            onSourceSelected: (selectedSource) => {
              this.onDestinationSelected(selectedSource);
            },
            selectedLocation: selectedDestination
            });
          //   let data = {
          //     source: selectedSource.airports.code,
          //    destination: selectedDestination.airports.code
          //  }

            //  this.props.getCabinClassAction(data)
        }
      
      }
        style={styles.orginDestinationStyle}
        >
          <Text
            numberOfLines={1}
            style={[
              styles.getLocationSubTextStyle,
              // {
              //   color: selectedDestination
              //     ? colours.darkBlueTheme : !selectedDestination && !isSearchClicked ?
              //       colours.lightGreyish : colours.errorColor,
              // },
            ]}
          >
             {selectedDestination
              ? selectedDestination.code
              : prevSelectedDestination ? prevSelectedDestination : "Select Destination"}
          </Text>

          <TouchableOpacity onPress={()=>{
            this.setState({
              selectedDestination:null,
              prevSelectedDestination:null
            })
          }}
          style={{borderWidth:0,borderColor:"red",height:scale(40),width:scale(40),justifyContent:"center",alignItems:"center"}}
        
          >
            <FastImage
              style={{
                justifyContent: "flex-end",
                marginEnd:scale(10),
                height:scale(15),  width:scale(15) 
              }}
              source={IMG_CONST.DARK_BLUE_CROSS_ICON}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  }





  departureDateView() {
    const { departStartDate,departEndDate,selectedDate } = this.state
    
   var date1 = moment(selectedDate.dateString,'YYYY-MM-DD')
   let dat3 = (date1.format('DD/MM/YYYY'))
   
   let depDate =  moment(departStartDate,'YYYY-MM-DD')
   let dat4 = (depDate.format('DD/MM/YYYY'))

    return (
      <View style={{ marginTop: verticalScale(18) }}>
        <Text
          style={[
            styles.headingTextStyle,
            {
              marginBottom: verticalScale(8),
            },
          ]}
        >
          {STRING_CONST.DEPARTURE_DATE}
        </Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate(STRING_CONST.CREATE_ALERT_SCREEN, {
              headingText: STRING_CONST.DEPART_TEXT,
              onSelectPress: (startDate) => {
                this.setState({
                  departStartDate: startDate,
                  selectedDate:""
                });
              },
              showDateRange: false,
              selectedStartDate: departStartDate
                            ? departStartDate
                            : null,
            });
          }}
          style={styles.orginDestinationStyle}

        >

          {
            departStartDate || selectedDate ?


<Fragment>
            <Text style={styles.dateTextStyle}>
            {
              departStartDate ?
              <Fragment>
                 {`${
                !isEmptyString(this.state.departStartDate)
                    ? `${dat4}`
                    : ``
                }`}
                 </Fragment>
              : null
            }
            {
              selectedDate ?
              <Fragment>
              {`${
            !isEmptyString(this.state.selectedDate)
                ? `${dat3}`
                :  ``
            }`}
              </Fragment>

              : null
            }
          </Text>
          </Fragment>
            : 
            <Text>{"Select Departure Date"}</Text> 
          }
       
          <TouchableOpacity onPress={()=>{
            this.setState({
              departStartDate:"",
              selectedDate:""
            })
          }}
            style={{borderWidth:0,borderColor:"red",height:scale(40),width:scale(40),justifyContent:"center",alignItems:"center"}}
          >
            <FastImage
              style={{
                justifyContent: "flex-end",
                marginEnd:scale(10),
                height:scale(15),  width:scale(15) 
              }}
              source={IMG_CONST.DARK_BLUE_CROSS_ICON}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  }

  returnDateView() {
    const { returnStartDate, selectedDate } = this.state

    let depDate =  moment(returnStartDate,'YYYY-MM-DD')
    let dat4 = (depDate.format('DD/MM/YYYY'))
   
    return (
      <View style={{ marginTop: verticalScale(18) }}>
        <Text
          style={[
            styles.headingTextStyle,
            {
              marginBottom: verticalScale(8),
            },
          ]}
        >
          {STRING_CONST.RETURN_DATE1}
        </Text>

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate(STRING_CONST.CREATE_ALERT_SCREEN, {
              headingText: STRING_CONST.RETURN,
              onSelectPress: (startDate) => {
                this.setState({
                  returnStartDate: startDate,
                });
              },
              showDateRange: false,
              minDate: this.state.departStartDate?this.state.departStartDate : selectedDate.dateString ,
              selectedStartDate: returnStartDate
                            ? returnStartDate
                            : null,
            });
          }}
          style={styles.orginDestinationStyle}
        >
          <Text style={styles.dateTextStyle}>
            {`${
              !isEmptyString(this.state.returnStartDate)
                ? `${dat4}`
                : "Select Return Date"
            }`}
          </Text>
          <TouchableOpacity onPress={()=>{
            this.setState({
              returnStartDate:""
            })
          }}
          style={{borderWidth:0,borderColor:"red",height:scale(40),width:scale(40),justifyContent:"center",alignItems:"center"}}
        
          >
            <FastImage
              style={{
                justifyContent: "flex-end",
                marginEnd:scale(10),
                height:scale(15),  width:scale(15) 
              }}
              source={IMG_CONST.DARK_BLUE_CROSS_ICON}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  }
  
  getIcon(icon, color){
    return <MaterialIcon
    name={icon}
    size={scale(18)}
    color={color}
  />
  }
  
  renderTravelClass(classType, index) {

 

    const {economy,premium,business,first,classData,cabinClassData} = this.state;
    let marginStyle = {};
    if (index % 2 == 0) {
      marginStyle = { marginRight: scale(10) };
    }
    switch (classType) {
      case "economy": {
        return (
          <TouchableOpacity
            style={[styles.classCheckboxContainer, marginStyle,{
              borderColor:"#2044FF"
            }]}
            onPress={() => {
              this.setState({
                economy:true,
                premium:false,
                business:false,
                first:false,
                skyScannerCabinCode:"economy",
                cabinCode:"M"
              })
            }}
          >
            { !economy ?
              this.getIcon(STRING_CONST.CHECK_EMPTY_CIRCLE, colours.blue):
              this.getIcon(STRING_CONST.CHECK_CIRCLE, colours.blue)
            }
      <Text style={[styles.classTextStyle,{
        color:"#2044FF"
      }]}>{STRING_CONST.ECONOMY}</Text>
          </TouchableOpacity>
        );
      }
      case "premium" :
      case "premium_economy": {
        return (
          <TouchableOpacity
            style={[styles.classCheckboxContainer, marginStyle,{
              borderColor:"#FEA41D"
            }]}
            onPress={() => {
              this.setState({
                economy:false,
                premium:true,
                business:false,
                first:false,
                skyScannerCabinCode:"premiumeconomy",
                cabinCode:"W"
              })
            }}
          >
            { !premium ?
              this.getIcon(STRING_CONST.CHECK_EMPTY_CIRCLE, colours.yellow):
              this.getIcon(STRING_CONST.CHECK_CIRCLE, colours.yellow)
            }
            <Text style={[styles.classTextStyle,{
        color:"#FEA41D"
      }]}>{STRING_CONST.PREMIUM_ECONOMY}</Text>
          </TouchableOpacity>
        );
      }
      case "business": {
        return (
          <TouchableOpacity
            style={[styles.classCheckboxContainer, marginStyle,{
              borderColor:"#A400F1"
            }]}
            onPress={() => {
              this.setState({
                economy:false,
                premium:false,
                business:true,
                first:false,
                skyScannerCabinCode:"business",
                cabinCode:"C"

              })
            }}
          >
            { !business ?
              this.getIcon(STRING_CONST.CHECK_EMPTY_CIRCLE, colours.purple):
              this.getIcon(STRING_CONST.CHECK_CIRCLE, colours.purple)
            }
             <Text style={[styles.classTextStyle,{
        color:"#A400F1"
      }]}>{STRING_CONST.BUSINESS}</Text>
          </TouchableOpacity>
        );
      }
      case "first": {
        return (
          <TouchableOpacity
            style={[styles.classCheckboxContainer, marginStyle,{
              borderColor:"#F31973"
            }]}
            onPress={() => {
              this.setState({
                economy:false,
                premium:false,
                business:false,
                first:true,
                cabinCode:"F",
                skyScannerCabinCode:"first"
              })
            }}
          >
            
            { !first ?
              this.getIcon(STRING_CONST.CHECK_EMPTY_CIRCLE, colours.pink):
              this.getIcon(STRING_CONST.CHECK_CIRCLE, colours.pink)
            }
           <Text style={[styles.classTextStyle,{
        color:"#F31973"
      }]}>{STRING_CONST.FIRST}</Text>
          </TouchableOpacity>
        );
      }
      default: {
        return null;
      }
    }
  }
  travelClassView() {
    const { cabinClassData, classData} = this.state;
    // console.log("yes check cabinClass data insidert travel class view #######    ",cabinClassData)
    let availableClasses = ["economy","premium","business","first"]
    let classSelectedArray = [true, true, true, true]
    let travelData = []
    let economy
    let premium
    let business
    let first

    if(cabinClassData ){
      if(cabinClassData.economy){
        economy = cabinClassData.economy ? "economy" : ""
      }
     
      if(cabinClassData.premium_economy){
        premium = cabinClassData.premium_economy ? "premium" : ""
      }
    
      if(cabinClassData.business){
        business = cabinClassData.business ? "business" : ""
      }
     
      if(cabinClassData.first){
        first = cabinClassData.first ? "first" : ""
      }
   
    } 
   

        // let travelData =  [economy?"economy",premium?"premium",business?"business",first?"first"]
        // if(economy){
        //   economy = "economy"
        // }
        //  else if(premium){
        //   premium = "premium"
        // }    
        // else if(business){
        //   business = "business"
        // }             
        // else if(first){
        //   first = "first"
        // }
    
        travelData[0] = economy
        travelData[1] = premium
        travelData[2] = business
        travelData[3] = first

     
    return (
      <View style={{ marginTop: verticalScale(20) }}>
        <Text style={[styles.headingTextStyle1]}>{"Select Cabin Class"}</Text>
       { travelData.length> 0 ? <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop:verticalScale(5) }}>
          {travelData.map((classType, index) => {
            if(travelData.includes(classType))
            return this.renderTravelClass(classType, index);
          })}
        </View> : null}
        {/* {classSelectedArray.every((v) => v === false) ? (
          <Text style={{ color: colours.redColor, marginTop: verticalScale(3) }}>
            {STRING_CONST.SELECT_CABIN}
          </Text>
        ) : null} */}
      </View>
    );
  }

 

  // https://www.skyscanner.co.in/transport/flights/lon/abz/230325/230329/?adults=1&adultsv2=1&cabinclass=economy&iym=2303&oym=2303&rtn=1&selectediday=29&selectedoday=25
   handleSkyScannerRedirection = () => {
    // const { dId, aId, numberOfPassengers, jType, date, cabinCode, returnDate } = data || {}  
    
    const {searchData,selectedDate,trip_type,passengerCount,departStartDate,skyScannerCabinCode,returnStartDate,selectedSource,selectedDestination,numberOfLines}  = this.state;
    
    let source = ""                 
    let destination = ""      


    if(selectedSource){
      source = selectedSource.code.toLowerCase()
    }
    else{
      source = searchData.sourceCode.toLowerCase()
    }

    if(selectedDestination){
      destination = selectedDestination.code.toLowerCase()
    }
    else{
      destination = searchData.destinationCode.toLowerCase()
    } 
    
    
    let numberOfPassengers = passengerCount
    let dDate 
    let dYear



    if(departStartDate){
      dDate =  moment(departStartDate).format('DD')
      dYear =  moment(departStartDate).format('YYMM')
    }else{
      dDate =  moment(selectedDate.dateString).format('DD')
      dYear =  moment(selectedDate.dateString).format('YYMM')
    }
    
    const aDate =  moment(returnStartDate).format('DD')
    const aYear =  moment(returnStartDate).format('YYMM')
    // const source = dId.toLowerCase()
    // const destination = aId.toLowerCase()

    let url = ""
     if(source){
      if(trip_type == "return"){
         url = `https://www.skyscanner.co.in/transport/flights/${source}/${destination}/${dYear}${dDate}/${aYear}${aDate}/?adults=${numberOfPassengers}&adultsv2=${numberOfPassengers}&cabinclass=${skyScannerCabinCode}&oym=${dYear}&selectedoday=${dDate}&iym=${aYear}&selectediday=${aDate}&rtn=1`
      
        console.log("yes chec here url ##### ",url)
        }
      if(trip_type == "one_way"){
         url = `https://www.skyscanner.co.in/transport/flights/${source}/${destination}/${dYear}${dDate}/?adultsv2=${numberOfPassengers}&cabinclass=${skyScannerCabinCode}&oym=${dYear}&selectedoday=${dDate}&rtn=0`
         console.log("yes chec here url ##### ",url)
        }
          //  console.log("yes checking what URL is GETTING ########     ",url)
       Linking.openURL(url, '_blank') 
     }
     else{
        Linking.openURL("https://www.skyscanner.co.in/transport/flights/", "_blank")
     }
  }

  // https://www.britishairways.com/travel/redeem/execclub/_gf/en_gb?eId=100002&pageid=PLANREDEMPTIONJOURNEY&tab_selected=redeem&redemption_type=STD_RED&amex_redemption_type=&upgradeOutbound=true&WebApplicationID=BOD&Output=&hdnAgencyCode=&departurePoint=LON&destinationPoint=NYC&departInputDate=24/03/2023&returnInputDate=29/03/2023&oneWay=false&RestrictionType=Restricted&NumberOfAdults=1&NumberOfYoungAdults=0&NumberOfChildren=0&NumberOfInfants=0&aviosapp=true&CabinCode=M
   handleBaRedirection = () => {
    // const { dId, aId,  jType, date, returnDate } = data || {}   
    
    const {selectedIndex,selectedDate,searchData,passengerCount,cabinCode,departStartDate,returnStartDate,selectedSource,selectedDestination,}  = this.state;
    let source = ""
    let destination = ""

    if(selectedSource){
      source = selectedSource.code.toLowerCase()
    }
    else{
      source = searchData.sourceCode.toLowerCase()
    }

    if(selectedDestination){
      destination = selectedDestination.code.toLowerCase()
    }
    else{
      destination = searchData.destinationCode.toLowerCase()
    } 

    // let source = selectedSource.code.toLowerCase()
    // let destination = selectedDestination.code.toLowerCase()

    let numberOfPassengers = passengerCount
    let oneWay = selectedIndex == 0 ? true : false
    let departInputDate 
    if(departInputDate){
       departInputDate =  moment(departStartDate).format('DD/MM/YYYY')
    }
    else{
       departInputDate =  moment(selectedDate.dateString).format('DD/MM/YYYY')
    }
   
    const returnInputDate =  moment(returnStartDate).format('DD/MM/YYYY')
  
     if(source){
      const url = `https://www.britishairways.com/travel/redeem/execclub/_gf/en_gb?eId=100002&pageid=PLANREDEMPTIONJOURNEY&tab_selected=redeem&redemption_type=STD_RED&amex_redemption_type=&upgradeOutbound=true&WebApplicationID=BOD&Output=&hdnAgencyCode=&departurePoint=${source}&destinationPoint=${destination}&departInputDate=${departInputDate}${!oneWay && departInputDate ? `&returnInputDate=${returnInputDate}` : ''}&oneWay=${oneWay}&RestrictionType=Restricted&NumberOfAdults=${numberOfPassengers}&NumberOfYoungAdults=0&NumberOfChildren=0&NumberOfInfants=0&aviosapp=true&CabinCode=${cabinCode}`
      console.log("yes what url is getting on book on BA        - -- - - ",url)
   
      Linking.openURL(url, '_blank')
     }else{
      Linking.openURL("https://www.britishairways.com/travel/redeem/execclub/", "_blank")
     }
  }


  renderBody() {
    const { source, destination } = this.state;

    // let PrevSource = JSON.stringify(source)
    // let prevDestination = JSON.stringify(destination)
    return (
      <View style={{ marginHorizontal: scale(20) }}>
        {this.travelClassView()}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: verticalScale(20),
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => {
                  this.setState({ selectedIndex: 0 });
                }}
              >
                {this.state.selectedIndex == 0 ? (
                  <FastImage source={IMG_CONST.RADIO_BUTTON} 
                  style={styles.radioButton}/>
                ) : (
                  <Ionicons
                    name="ios-radio-button-off"
                    size={verticalScale(20)}
                    color={colours.darkBlueTheme}
                  />
                )}
                <Text style={styles.tripTypeTextStyle}>{STRING_CONST.ONE_WAY}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: scale(20),
                }}
                onPress={() => {
                  this.setState({ selectedIndex: 1 });
                }}
              >
                {this.state.selectedIndex == 1 ? (
                  <FastImage source={IMG_CONST.RADIO_BUTTON} 
                  style={styles.radioButton}/>
                ) : (
                  <Ionicons
                    name="ios-radio-button-off"
                    size={verticalScale(20)}
                    color={colours.darkBlueTheme}
                  />
                )}
                <Text style={styles.tripTypeTextStyle}>{STRING_CONST.RETURN}</Text>
              </TouchableOpacity>
            </View>
        </View>
        {this.originView()}
        {this.destinationView()}
        {this.departureDateView()}

        {this.state.selectedIndex == 1 ? this.returnDateView() : null}
       
        {this.state.isSavedPressed &&
        this.state.selectedIndex == 1 &&
        isEmptyString(this.state.returnStartDate) ? (
          <Text style={{ color: colours.redColor, marginTop: verticalScale(3) }}>
            {STRING_CONST.SELECT_RETURN_DATE}
          </Text>
        ) : null}
      </View>
    );
  }
  getTravelClasses() {
    const { classSelectedArray } = this.state;
    let classSelected = "";
    for (i = 0; i < classSelectedArray.length; i++) {
      if (classSelectedArray[i]) {
        if (isEmptyString(classSelected)) {
          classSelected = classSelected.concat(`${classes[i]}`);
        } else {
          classSelected = classSelected.concat(`,${classes[i]}`);
        }
      }
    }   
    return classSelected;
  }

  jsonToQueryString = (json) =>
    "?" +
    Object.keys(json)
      .map(function(key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
      })
      .join("&");

  validateData() {
    const { returnStartDate, classSelectedArray, selectedIndex } = this.state;

    if (
      (selectedIndex == 1 && isEmptyString(returnStartDate)) ||
      classSelectedArray.every((data) => data == false)
    ) {
    } else {
      let editAlertData = {};
    //   let searchData = this.props.route.params.data;
      const url = {
        // airlineSelected: `${this.state.airline.value}_${this.state.membershipType.value}`,
        airlineSelected:this.state.airline,
        airlineMembership: this.state.membershipType,
        aCode: this.state.airline,
        numberOfPassengers: this.state.passengerCount,
        tclass: "Economy",
        tValue: "economy",
        membership: this.state.membershipType,
        jType: this.state.selectedIndex == 1 ? "return" : "one-way",
        dPlace:getLocationNameWithCode(searchData.selectedSource),
        dId: searchData.sourceCode,
        aPlace:getLocationNameWithCode(searchData.selectedDestination),
        aId: searchData.destinationCode,
        economy: this.state.classSelectedArray[0],
        premium: this.state.classSelectedArray[1],
        business: this.state.classSelectedArray[2],
        first: this.state.classSelectedArray[3],
        start_date: moment(searchData.startDate).format('YYYY-MM-DD') || null
      };      

      if(this.state.selectedIndex == 0) {
        editAlertData["number_of_passengers"] = this.state.passengerCount;
        editAlertData["travel_classes"] = this.getTravelClasses();
        editAlertData["trip_type"] =
          this.state.selectedIndex == 0 ? "one_way" : "return";
        editAlertData["membership_type"] = this.state.membershipType;
        editAlertData["start_date"] = moment(this.state.departStartDate).format("DD-MM-YYYY") ;
        editAlertData["end_date"] = moment(this.state.departEndDate).format("DD-MM-YYYY") ;
        editAlertData["source_code"] = searchData.sourceCode
        editAlertData["destination_code"] = searchData.destinationCode
        editAlertData["availability_url"] = `/calendar${this.jsonToQueryString(
          url
        )}`; 
      }
      else {
        editAlertData["number_of_passengers"] = this.state.passengerCount;
        editAlertData["travel_classes"] = this.getTravelClasses();
        editAlertData["trip_type"] =
          this.state.selectedIndex == 0 ? "one_way" : "return";
        editAlertData["membership_type"] = this.state.membershipType;
        editAlertData["start_date"] = moment(this.state.departStartDate).format("DD-MM-YYYY") ;
        editAlertData["end_date"] = moment(this.state.departEndDate).format("DD-MM-YYYY") ;
        editAlertData["source_code"] = searchData.sourceCode
        editAlertData["destination_code"] = searchData.destinationCode
        editAlertData["arrival_start_date"] = moment(this.state.returnStartDate).format("DD-MM-YYYY")
        editAlertData["arrival_end_date"] = moment(this.state.returnEndDate).format("DD-MM-YYYY")
        editAlertData["availability_url"] = `/calendar${this.jsonToQueryString(
          url
        )}`; 
      }
      this.props.editAlertAction(editAlertData, this.state.id);
    }
  }

  buttonView() {
 
    const {headerTxt,departStartDate,selectedDate,returnStartDate,selectedSource,selectedDestination,prevSelectedSource,prevSelectedDestination,selectedIndex} = this.state
  

    return ( 
      <View style={styles.buttonViewContainer}>
       {
        (departStartDate || selectedDate ||   returnStartDate) && (selectedSource!= null || prevSelectedSource!=null) &&  (selectedDestination!=null || prevSelectedDestination !=null)  ?
        <TouchableOpacity
        style={styles.checkOnAirlineButton}
        onPress={() => {
          if(headerTxt == "Booking Details"){
            this.handleBaRedirection()
          }
          else{
            this.handleSkyScannerRedirection()
          }
        }}
      >
        {
            headerTxt ==  "Booking Details" ? 
              <FastImage source={IMAGE_CONST.BRITISH_AIRWAYS_TRANPARENT_LOGO} />
            : null
        }
         {
          headerTxt ==  "Booking Details" ?
          <Text style={styles.bookOnBAText}>
          {STRING_CONST.BOOK_ON_BA}
        </Text>
          : 
          <Text style={styles.bookOnBAText}>
          {"Price"}
        </Text>
        }
      </TouchableOpacity>
         : 
         <TouchableOpacity
         style={styles.saveButtonDisable}
       >
        {
             headerTxt ==  "Booking Details" ? 
             <FastImage source={IMAGE_CONST.BRITISH_AIRWAYS_TRANPARENT_LOGO} />
            : null
        }
          {
           headerTxt ==  "Booking Details" ?

           <Text style={styles.bookOnBAText}>
           {STRING_CONST.BOOK_ON_BA}
         </Text>
           : 
           <Text style={styles.bookOnBAText1}>
           {"Price"}
         </Text>
         }
        </TouchableOpacity>
       }
      </View>
    );
  }

  // this.props.getCabinClassAction(data)
  renderRow(option) {
    return (
      <View style={{ padding: scale(15) }}>
        <Text style={{ fontSize: scale(14), color: colours.darkBlueTheme }}>
          {option.label}
        </Text>
      </View>
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
              colours:"red"
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
            borderTopColor:showBorder == 1 ? "gray": "skyblue",
            borderBottomColor:showBorder == 1 ? "gray": "skyblue",
            borderBottomWidth:0.5
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
                {/* <Text style={{ color: colours.redColor }}> *</Text> */}
              </Text>
            )}

            {IMG_CONST.DARK_SORT_DOWN}
          </View>
        </ModalDropdown>
      </TouchableOpacity>
    );
  }
  render() {
    // let screenType =  this.props.route.params.screen;
    return (
      <SafeAreaView style={{ flex: 1}}>
        <View style={{ flex: 1,  }}>
          {this.renderHeader()}
          {this.renderBody()}
          {this.state.showPopUp && (
            <PopUpComponent
              isSingleButton={false}
              title={STRING_CONST.DELETE_ALERT}
              message={STRING_CONST.CANCEL_ALERT}
              image={IMG_CONST.DELETE_ALERT}
              leftButtonText={STRING_CONST.NO}
              rightButtonText={STRING_CONST.YES}
              onLeftButtonPress={() => {
                this.setState({
                  showPopUp: false,
                });
              }}
              onRightButtonPress={() => {
                this.setState({
                  showPopUp: false,
                });      
                //   this.props.cancelAlertAction(this.state.id,screenType)
                // this.props.route.params.props.cancelAlertAction(
                //   this.state.id
                // );
              }}
            />
          )}
        </View>
        {this.buttonView()}
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cancelAlertAction: (id) => dispatch(cancelAlerts(id)),
    resetAlertCancelFlag: () => dispatch(resetCancelAlert()),
    editAlertAction: (data, id) => dispatch(editAlert(data, id)),
    resetAlertUpdateAction: () => dispatch(resetAlertUpdate()),
    getCabinClassAction:(data)=> dispatch(getCabinClass(data))
  };
};

const mapStateToProps = (state) => {
  const { alerts, findFlight } = state;
  console.log("-------------------map state to props function ##############       ",findFlight.cabinClassData)
   return {
    alertCancelSuccess: alerts.alertCancelSuccess,
    alertCancelError: alerts.alertCancelError,
    airlinesMembershipDetails: findFlight.airlinesMembershipDetails,
    editAlertSuccess: alerts.editAlertSuccess,
    editAlertError: alerts.editAlertError,
    locations: findFlight.locations,
    airlinesPossileRoutes: findFlight.airlinesPossileRoutes,
    cabinClassData:findFlight.cabinClassData,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PriceDetailsScreen);
