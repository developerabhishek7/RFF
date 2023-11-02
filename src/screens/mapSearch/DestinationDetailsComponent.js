import React, { Component, Fragment } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity,Modal, BackHandler, Image, ScrollView, FlatList,Platform, ImageBackground, Alert, Dimensions } from 'react-native';
import ScreenHeader from "../../components/header/Header";
// import styles from './masSearchStyles'
import * as STRING_CONST from "../../constants/StringConst";
import * as IMAGE_CONST from "../../constants/ImageConst";
import { appFonts } from "../../constants/StringConst";
import { colours } from "../../constants/ColorConst";
// import * as CONFIG from "../../helpers/config";
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import scale, { verticalScale } from "../../helpers/scale";
import * as CONST from "../../constants/StringConst";
import MyStatusBar from '../../components/statusbar/index';

import { getAirlinesAvailability,getSeatsAvailability ,getPointsAvailability,getPeakOffPeakData } from "../../actions/calendarActions";
import {
  getAirlinesMembership,
  getPossibleRoutes,
  getLocations,
  getNearestAirport,
  sendAuditData,
  getFlightSchedule,
  getCabinClass
} from "../../actions/findFlightActions";
import { CheckBox } from 'react-native';
import styles from './DestinationDetailsStyles'
import {
  getClassesDisplayName,
  getClassesColor,
  getDateFormate,
  getLocationName,
} from "../../utils/commonMethods";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

// var pendingOutBoundCount = 0
import moment from "moment";
let monthKey = ""
let dateForPoints = ""
let peakKey = ""
let economyValue = ""
let premiumValue =  ""
let businessValue = ""
let firstValue = ""
// let peak = ""
class DestinationsComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classSelected: true,
      first: "",
      business: "",
      premium: "",
      economy: "",
      month: "",
      actualDate: "",
      returnDateMonth: "",
      WhereFrom: "",
      peakKey:"",
      staticDateArray:[],
      // economyClass: false,
      // premiumClass: false,
      // businessClass: false,
      // firstClass: false,
      isLoader:false,
      peak: "",
      mapSearchData: {},
      departureDaysDiff:0,
      returnDaysDiff:0,
      tripType: this.props.route.params.tripType,
      sourceCode: this.props.route.params.sourceCode,
      destination:this.props.route.params.destination
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

  componentDidUpdate(prevProps) {
  let auditData =   this.props.route.params.auditData  
  let searchData = this.props.route.params.searchData
  let  tripType =  this.props.route.params.tripType
     
      if (this.props !== prevProps) {
      if (
        this.props.airlinesDetail &&
        this.props.airlinesDetail !== prevProps.airlinesDetail && this.props.screenType == 'MAP'
      ) {
        this.setState({isLoader:false})
        this.props.navigation.navigate(STRING_CONST.CALENDAR_SCREEN, {
          searchData:this.state.mapSearchData,
          peakOffpeakData:this.props.peakOffpeakData,
          WhereFrom:this.state.WhereFrom,
          destination:this.state.destination,
          auditData:auditData,
          fromdestinationDetails:true,
          monthKey: monthKey,
          tripType:tripType,
          newSearchData:searchData,
          focusedDate: null,
          staticDateArray:this.state.staticDateArray
        });
      }
    }
  }

  componentDidMount = () => {

    let singleMap = JSON.parse(this.props.route.params.singleMap)

    let searchData = JSON.parse(this.props.route.params.searchData)

    let auditData = JSON.parse(this.props.route.params.auditData)


      var start1 = moment(auditData.search_data.departure_date_from);
      var end1 = moment(auditData.search_data.departure_date_to);
      let departureDaysDiff =   end1.diff(start1, "days")



    var start = moment(auditData.search_data.arrival_date_from);
    var end = moment(auditData.search_data.arrival_date_to);
    let returnDaysDiff =   end.diff(start, "days")
    

    let WhereFrom = this.props.route.params.WhereFrom
    let data1 = JSON.parse(this.props.route.params.singleMap)

    let outboundData = data1.availability.outbound
    let inboundData = data1.availability.inbound && data1.availability.inbound

    let outboundLength = outboundData && Object.keys(outboundData).length
    let inboundLength = 0


    console.log('outboundLength >>> /// ',outboundLength)

    let outboundDiff = parseInt(outboundLength) - parseInt(departureDaysDiff) 
    var pendingOutBoundCount = 0
    let pendingInBoundCount = 0

 
      if(this.state.tripType == "return"){
       // Outbound 
       if(outboundLength > 20 ){
          pendingOutBoundCount = outboundLength - 10
        }
        if(outboundLength < 10) {
          pendingOutBoundCount = 0
        }
        if(outboundLength > 10 && outboundLength < 20){
           pendingOutBoundCount = outboundLength - 10
        }
      
        let firstOutboundDataKey =  Object.keys(outboundData)[0]
        let inboundData1 = Object.keys(inboundData)

        inboundData1.map((singleMap, index) => {
          if(singleMap >= firstOutboundDataKey){
            inboundLength++
          }
        })  

        // console.log(' inboud length ..... ', inboundLength)
        // Inbound 
        if(inboundLength > 20 ){
          pendingInBoundCount = inboundLength - 10
         }
         if(inboundLength < 10) {
          pendingInBoundCount = 0
         }
         if(inboundLength > 10 && inboundLength < 20){
           pendingInBoundCount = inboundLength - 10
        }
      }

      if(this.state.tripType == "one_way"){
        if(outboundLength > 20 ){
          pendingOutBoundCount = outboundLength - 10
        }
        if(outboundLength < 10) {
          pendingOutBoundCount = 0
        }
      }


    
  
    this.setState({ WhereFrom,departureDaysDiff:pendingOutBoundCount,returnDaysDiff:pendingInBoundCount })

    this.checkIfPeakOffPeakDataMonth()
    this.props.getPeakOffPeakDataAction()
   
    const data = {
      "source": auditData.search_data.source,
     "destination": data1.code
    }

    setTimeout(() => {
      this.getDates()
      this.props.getCabinClassAction(data)
    }, 1000);
  
    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
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

  getDates = () => {

    var dateArray = [];
    let today = new Date()

    let d = moment().year() + 1
    let month = moment().month() + 2

    let endDateKey = `${d}-${month}-01`
    let exactEndDate = moment(endDateKey).format("YYYY-MM-DD")

    let endDay = new Date(exactEndDate)
    var currentDate = moment(today);
    var stopDate = moment(endDay);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
      currentDate = moment(currentDate).add(1, 'days');
    }

    this.setState({
      staticDateArray: dateArray
    })

   
    return dateArray;
  }

  renderHeader() {
    let data = JSON.parse(this.props.route.params.singleMap)
    return (
        <View style={styles.headerView}>
          <View style={{ flexDirection:"row",alignItems:"center",marginTop:Platform.OS == "android" ? scale(27) : scale(45) ,marginStart:scale(6) }}>
          <TouchableOpacity 
          style={{marginTop: scale(7)}}
          onPress={() => {
            this.setState({
              peakKey:"",
              peak:""
            })
            this.props.navigation.goBack() }}>
           {IMAGE_CONST.IOS_BACK_ARROW}
          </TouchableOpacity>

         <View style={{flexDirection:"row"}}>
          <Text style={styles.headerCity}>{data.city_name}</Text>
          <Text style={styles.headerCountry}>{data.country_name}</Text>
          </View>
          </View>
          <Text style={styles.airportName}>{data.name} Airport</Text>
        </View>
    );
  }




  renderPeakFairText() {
    const {peakKey,peak,actualDate} = this.state



    return (
      <View style={{ marginTop: scale(10),backgroundColor:"#FFF" }}>
        <View style={[styles.peakFairMainView,{
          // borderWidth:1,
          width:scale(356),
          // borderRadius:scale(10)
        }]}>
          
          <View style={[styles.peakFairSubHeaderView,{
            backgroundColor:  !peak  && actualDate ? "#FFFFFF" : peak && actualDate ? colours.skyBlueColor : "#FFF",
            // borderBottomColor: !peak  && actualDate ? "gray"  : "#FFF",
            // borderBottomWidth:0.3,
            width:scale(178),
            borderLeftColor:peak  && actualDate ? "gray"  : "#FFF",
            borderLeftWidth:0.3,
            borderRightWidth:0.3,
            borderRightColor:peak  && actualDate ? "gray"  : "#FFF",
            borderTopWidth:0.3,
            borderTopColor:peak  && actualDate ? "gray"  : "#FFF",
         }]}>
            <ImageBackground
              source={require("../../assets/classes/PEAK.png")}
              style={[styles.peakFairImg,{
                marginStart:scale(-10)
              }]}
            >
            </ImageBackground>
            <Text style={styles.peakFairTxt}>Peak Fare</Text>
          </View>
          <View style={[styles.peakFairSubHeaderView,{
            backgroundColor: peak && actualDate ? "#FFFFFF" : !peak && actualDate ? colours.skyBlueColor : "#FFF",
            // borderBottomColor: peak  && actualDate ? "gray"  : "#FFF",
            // borderBottomWidth:0.3,
            width:scale(178),
            borderLeftColor:!peak  && actualDate ? "gray"  : "#FFF",
            borderLeftWidth:0.3,
            borderRightWidth:0.3,
            borderRightColor:!peak  && actualDate ? "gray"  : "#FFF",
            borderTopWidth:0.3,
            borderTopColor:!peak  && actualDate ? "gray"  : "#FFF",

      }]}>
           <ImageBackground
              source={require("../../assets/classes/OFFPEAK.png")}
              style={styles.peakFairImg}
            >
            </ImageBackground>
            <Text style={styles.peakFairTxt} >Off-Peak Fare</Text>
          </View>

        </View>
      </View>
    )
  }


  dateView(date) {
    let dates =  moment(date).format("DD MMM").split(" ")
    return (
      <View style={styles.textView}>
        <Text style={styles.dateText}>{dates[0]}</Text>
        <Text style={styles.monthText}>{dates[1]}</Text>
      </View>
    );
  }


  getPointsText(points) {
    // if (points % 1000 == 0) {
    //   return `${points / 1000}k`;
    // } else {
    //   return points;
    // }

    return Math.abs(points) > 999 ? Math.sign(points)*((Math.abs(points)/1000).toFixed(2)) + 'k' : Math.sign(points)*Math.abs(points)


  }




  showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints) {
    const { tripType } = this.state;
    let dates = JSON.parse(this.props.route.params.singleMap)
    let pointsDatBA  = this.props.route.params.pointsDatBA
    let pointsDataSS  = this.props.route.params.pointsDataSS

    economyValue = ""
    premiumValue =  ""
    businessValue = ""
    firstValue = ""
   
     if (pointsDatBA && Object.keys(pointsDatBA).length !== 0 ) {
        if(this.state.peak  === false){ 
              pointsDatBA.map((singleMap)=>{
                if(singleMap.one_way === true && singleMap.peak_type === "offpeak"){
                  if(singleMap.economy_avios){
                    economyValue = singleMap.economy_avios
                  }
                  if(singleMap.premium_avios){
                    premiumValue = singleMap.premium_avios
                  }
                  if(singleMap.business_avios ){
                    businessValue = singleMap.business_avios
                  }
                  if(singleMap.first_avios){
                    firstValue = singleMap.first_avios
                  } 
                }
              })
        }
        else{
              pointsDatBA.map((singleMap)=>{
                  if(singleMap.one_way === true && singleMap.peak_type === "peak"){
                  if(singleMap.economy_avios){
                    economyValue = singleMap.economy_avios
                  }
                  if(singleMap.premium_avios){
                    premiumValue = singleMap.premium_avios
                  }
                  if(singleMap.business_avios ){
                    businessValue = singleMap.business_avios
                  }
                  if(singleMap.first_avios){
                    firstValue = singleMap.first_avios
                  } 
                }
              })
        }

    }







  if (pointsDataSS && Object.keys(pointsDataSS).length !== 0 ) {
   
  
    if(this.state.peak === false){
  
      pointsDataSS.map((singleMap)=>{
  
        if(singleMap.one_way === true && singleMap.peak_type === "offpeak"){
          if(singleMap.economy_avios){
            economyValue = singleMap.economy_avios
          }
          if(singleMap.premium_avios){
            premiumValue = singleMap.premium_avios
          }
          if(singleMap.business_avios ){
            businessValue = singleMap.business_avios
          }
          if(singleMap.first_avios){
            firstValue = singleMap.first_avios
          } 
        }
      })
    }
    else{
      pointsDataSS.map((singleMap)=>{
  
        if(singleMap.one_way === true && singleMap.peak_type === "peak"){
          if(singleMap.economy_avios){
            economyValue = singleMap.economy_avios
          }
          if(singleMap.premium_avios){
            premiumValue = singleMap.premium_avios
          }
          if(singleMap.business_avios ){
            businessValue = singleMap.business_avios
          }
          if(singleMap.first_avios){
            firstValue = singleMap.first_avios
          } 
        }
      })
    }
     
    }
    


    let economyClass = dates.available_classes.economy;
    let premiumClass = dates.available_classes.premium;
    let businessClass = dates.available_classes.business;
    let firstClass = dates.available_classes.first;

      let economyInbound = false
      let premiumInbound = false
      let businessInbound = false
      let firstInbound = false

      let economyOutbound = false
      let premiumOutbound = false
      let businessOutbound = false
      let firstOutbound = false

    if (tripType == "return") {

      let inboundData = dates.availability.inbound
      let outboundData = dates.availability.outbound

      economyClass = false
      premiumClass = false
      businessClass = false
      firstClass = false

      for (let i of Object.keys(outboundData)) {
        if (outboundData[i].economy) {
          economyOutbound = true
        }
        if (outboundData[i].premium) {
          premiumOutbound = true
        }
        if (outboundData[i].business) {
          businessOutbound = true
        }
        if (outboundData[i].first) {
          firstOutbound = true
        }
      }

      for (let i of Object.keys(inboundData)) {
        if (inboundData[i].economy) {
          economyInbound = true
        }
        if (inboundData[i].premium) {
          premiumInbound = true
        }
        if (inboundData[i].business) {
          businessInbound = true
        }
        if (inboundData[i].first) {
          firstInbound = true
        }
      }

      economyClass = economyOutbound && economyInbound
      premiumClass = premiumOutbound && premiumInbound
      businessClass = businessOutbound && businessInbound
      firstClass = firstOutbound && firstInbound

    }
    if (tripType == "one_way") {

      let outboundData = dates.availability.outbound

      economyClass = false
      premiumClass = false
      businessClass = false
      firstClass = false

      for (let i of Object.keys(outboundData)) {
        if (outboundData[i].economy) {
          economyClass = true
        }
        if (outboundData[i].premium) {
          premiumClass = true
        }
        if (outboundData[i].business) {
          businessClass = true
        }
        if (outboundData[i].first) {
          firstClass = true
        }
      }
    }

    if (first || economy || business || premium) {
      first ?
        this.setState({ first })
        : this.setState({ first: "" })
      economy ?
        this.setState({ economy })
        : this.setState({ economy: "" })
      business ?
        this.setState({ business })
        : this.setState({ business: "" })
      premium ?
        this.setState({ premium })
        : this.setState({ premium: "" })
      peak ?
        this.setState({ peak }) :
        this.setState({ peak: false })
    }

    if (month) {
      month == 0 ?
        this.setState({ month: "January", returnDateMonth: "" })
        : month == 1 ?
          this.setState({ month: "February", returnDateMonth: "" })
          : month == 2 ?
            this.setState({ month: "March", returnDateMonth: "" })
            : month == 3 ?
              this.setState({ month: "April", returnDateMonth: "" })
              : month == 4 ?
                this.setState({ month: "May", returnDateMonth: "" })
                : month == 5 ?
                  this.setState({ month: "June", returnDateMonth: "" })
                  : month == 6 ?
                    this.setState({ month: "July", returnDateMonth: "" })
                    : month == 7 ?
                      this.setState({ month: "August", returnDateMonth: "" })
                      : month == 8 ?
                        this.setState({ month: "September", returnDateMonth: "" })
                        : month == 9 ?
                          this.setState({ month: "October", returnDateMonth: "" })
                          : month == 10 ?
                            this.setState({ month: "November", returnDateMonth: "" })
                            : month == 11 ?
                              this.setState({ month: "December", returnDateMonth: "" })
                              : null

    }

    if (returnDateMonth) {
      returnDateMonth == 0 ?
        this.setState({ returnDateMonth: "January", month: "" })
        : returnDateMonth == 1 ?
          this.setState({ returnDateMonth: "February", month: "" })
          : returnDateMonth == 2 ?
            this.setState({ returnDateMonth: "March", month: "" })
            : returnDateMonth == 3 ?
              this.setState({ returnDateMonth: "April", month: "" })
              : returnDateMonth == 4 ?
                this.setState({ returnDateMonth: "May", month: "" })
                : returnDateMonth == 5 ?
                  this.setState({ returnDateMonth: "June", month: "" })
                  : returnDateMonth == 6 ?
                    this.setState({ returnDateMonth: "July", month: "" })
                    : returnDateMonth == 7 ?
                      this.setState({ returnDateMonth: "August", month: "" })
                      : returnDateMonth == 8 ?
                        this.setState({ returnDateMonth: "September", month: "" })
                        : returnDateMonth == 9 ?
                          this.setState({ returnDateMonth: "October", month: "" })
                          : returnDateMonth == 10 ?
                            this.setState({ returnDateMonth: "November", month: "" })
                            : returnDateMonth == 11 ?
                              this.setState({ returnDateMonth: "December", month: "" })
                              : null

    }

    if (actualDate) {
      this.setState({ actualDate })
    }

    return (
      <View style={{ 
      backgroundColor:this.state.actualDate ? colours.skyBlueColor:"#FFF",
      borderBottomColor:this.state.actualDate ? "gray": "#FFF",
      borderBottomWidth:this.state.actualDate ? 0.3 : 0,
      borderLeftColor:this.state.actualDate ? "gray" : "#FFF",
      borderLeftWidth:this.state.actualDate ? 0.3 : 0,
      borderRightWidth:this.state.actualDate ? 0.3 : 0,
      borderRightColor:this.state.actualDate ? "gray" : "#FFF",
      width: scale(356),     
      padding:scale(7),        
      alignSelf:"center",
      borderBottomLeftRadius:scale(10),
      borderBottomRightRadius:scale(10)
       }}>
      {
        this.state.actualDate  ?
        <View style={{ flexDirection: "row", justifyContent: "space-between", margin: scale(9), marginTop: scale(10), alignContent: "center", }}>
        {
          economyClass ?
            <View style={{ flexDirection: "row", backgroundColor: "#FFFFFF",height:scale(30), justifyContent: 'center', alignItems: 'center', borderRadius: scale(6)}}>
              <View style={{ margin: scale(5), borderRadius: scale(7), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{color:"#2044FF",fontSize:Platform.OS==="ios" ?scale(7) :scale(13)}}>{'\u2B24'}</Text>
                 <Text style={{ fontSize: scale(11), textAlign: 'center', paddingStart: scale(4), color: "#132C52", fontFamily: appFonts.INTER_SEMI_BOLD, }}>{STRING_CONST.ECONOMY}</Text>
              </View>
            </View>
            : <View style={{ flexDirection: "row", backgroundColor: "#FFFFFF", height:scale(30),justifyContent: 'center', alignItems: 'center', borderRadius: scale(6) }}>
              <View style={{ margin: scale(5), borderRadius: scale(7), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            
                    <Text style={{color:"#EFEFEF",fontSize:Platform.OS==="ios" ?scale(7) :scale(13)}}>{'\u2B24'}</Text>
                 <Text style={{ fontSize: scale(11),opacity:0.4, textAlign: 'center', paddingStart: scale(4), color: "#132C52", fontFamily: appFonts.INTER_SEMI_BOLD, }}>{STRING_CONST.ECONOMY}</Text>
              </View>
            </View>
        }
        {
          premiumClass ?
            <View style={{ flexDirection: "row", backgroundColor: "#FFFFFF", height:scale(30),justifyContent: 'center', alignItems: 'center', marginLeft: -scale(7), borderRadius: scale(6) }}>
              <View style={{ margin: scale(5), borderRadius: scale(7), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              
                    <Text style={{color:"#FEA41D",fontSize:Platform.OS==="ios" ?scale(7) :scale(13)}}>{'\u2B24'}</Text>
                
                <Text style={{ fontSize: scale(11), textAlign: 'center', paddingStart: scale(4), paddingEnd: scale(4), color: "#132C52", fontFamily: appFonts.INTER_SEMI_BOLD, }}>{"Prem Econ"}</Text>
              </View>
            </View>
            : <View style={{ flexDirection: "row", backgroundColor: "#FFFFFF", height:scale(30),justifyContent: 'center', alignItems: 'center', marginLeft: -scale(7), borderRadius: scale(6) }}>
              <View style={{ margin: scale(5), borderRadius: scale(7), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              
                    <Text style={{color:"#EFEFEF",fontSize:Platform.OS==="ios" ?scale(7) :scale(13)}}>{'\u2B24'}</Text>
                
                <Text style={{ fontSize: scale(11), opacity:0.4,textAlign: 'center', paddingStart: scale(4), paddingEnd: scale(4), color: "#132C52", fontFamily: appFonts.INTER_SEMI_BOLD, }}>{"Prem Econ"}</Text>
              </View>
            </View>
        }
        {
          businessClass ?
            <View style={{ flexDirection: "row", backgroundColor: "#FFFFFF", height:scale(30),justifyContent: 'center', alignItems: 'center', marginLeft: -scale(7), borderRadius: scale(6) }}>
              <View style={{ margin: scale(5), borderRadius: scale(7), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
             
                    <Text style={{color:"#A905F6",fontSize:Platform.OS==="ios" ?scale(7) :scale(13)}}>{'\u2B24'}</Text>
             
                <Text style={{ fontSize: scale(11), textAlign: 'center', paddingStart: scale(4), paddingEnd: scale(4), color: "#132C52", fontFamily: appFonts.INTER_SEMI_BOLD, }}>{STRING_CONST.BUSINESS}</Text>
              </View>
            </View>
            : <View style={{ flexDirection: "row", backgroundColor: "#FFFFFF", height:scale(30),justifyContent: 'center', alignItems: 'center', marginLeft: -scale(7), borderRadius: scale(6) }}>
           
              <View style={{ margin: scale(5), borderRadius: scale(7), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            
                    <Text style={{color:"#EFEFEF",fontSize:Platform.OS==="ios" ?scale(7) :scale(13)}}>{'\u2B24'}</Text>
              
                <Text style={{ fontSize: scale(11),opacity:0.4, textAlign: 'center', paddingStart: scale(4), paddingEnd: scale(4), color: "#132C52", fontFamily: appFonts.INTER_SEMI_BOLD, }}>{STRING_CONST.BUSINESS}</Text>
              </View>
            </View>
        }
        {
          firstClass ?
            <View style={{ flexDirection: "row", backgroundColor: "#FFFFFF", height:scale(30),justifyContent: 'center', alignItems: 'center', marginLeft: -scale(7), borderRadius: scale(6) }}>
              <View style={{ margin: scale(5), borderRadius: scale(7), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{color:"#EB186F",fontSize:Platform.OS==="ios" ?scale(7) :scale(13)}}>{'\u2B24'}</Text>
                <Text style={{ fontSize: scale(11), textAlign: 'center', paddingStart: scale(3), color: "#132C52", fontFamily: appFonts.INTER_SEMI_BOLD, }}>{STRING_CONST.FIRST}   </Text>
              </View>
            </View>
            : <View style={{ flexDirection: "row", backgroundColor: "#FFFFFF", height:scale(30),justifyContent: 'center', alignItems: 'center', marginLeft: -scale(7), borderRadius: scale(6) }}>
              <View style={{ margin: scale(5), borderRadius: scale(7), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{color:"#EFEFEF",fontSize:Platform.OS==="ios" ?scale(7) :scale(13)}}>{'\u2B24'}</Text>
                <Text style={{ fontSize: scale(11),opacity:0.4, textAlign: 'center', paddingStart: scale(3), color: "#132C52", fontFamily: appFonts.INTER_SEMI_BOLD, }}>{STRING_CONST.FIRST}    </Text>
              </View>
            </View>
        }
      </View>
        : null
      }
        {
          (economyValue || premiumValue|| businessValue || firstValue ) 
              ?
            
            <View style={{ marginTop: -scale(6),borderWidth:0 }}>
              {
                this.state.peak === true ?
                  <View style={{ borderWidth: 0, width: "96%", flexDirection: "row", justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderBottomColor: "gray", borderBottomWidth: 0, borderTopWidth: 0, borderTopColor: "gray" }}>
                    {
                      economyValue ?
                        <View style={{ width: "22%", marginLeft: scale(7), alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: "green" }}>
                          <Text style={{color:"#132C52", fontSize: scale(12), padding: scale(1),fontWeight:"400", fontFamily: appFonts.INTER_REGULAR, textAlign: 'center',  paddingRight: scale(15) }} numberOfLines={1}>{this.getPointsText(economyValue)}</Text>
                        </View>
                        :
                        <Fragment>
                          {
                            economyClass ? <View style={{ width: "22%", marginLeft: scale(7), alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: "green" }}>
                              <Text style={{ fontSize: scale(12), padding: scale(1),fontWeight:"700", fontFamily: appFonts.INTER_REGULAR, textAlign: 'center', paddingLeft: scale(7) }} numberOfLines={1}> - </Text>
                            </View> :
                              <View style={{ width: "22%", marginLeft: scale(7), alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: "green" }}>
                                <Text style={{ fontSize: scale(12), padding: scale(1),fontWeight:"400", fontFamily: appFonts.INTER_REGULAR, textAlign: 'center', paddingLeft: scale(7) }} numberOfLines={1}>   </Text>
                              </View>
                          }
                        </Fragment>

                    }
                    {
                      premiumValue ?
                        <View style={{ width: "30%", marginLeft: scale(1), alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderColor: "green", borderWidth: 0 }}>
                          <Text style={{color:"#132C52", fontSize: scale(12), marginRight:scale(10),padding: scale(1),fontWeight:"400", fontFamily: appFonts.INTER_REGULAR, textAlign: 'center', paddingLeft: 0 }} numberOfLines={1}> {this.getPointsText(premiumValue)}</Text>
                        </View>

                        :
                        <Fragment>
                          {
                            premiumClass ?
                              <View style={{ width: "30%", alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderColor: "green", borderWidth: 0 }}>
                                <Text style={{ fontSize: scale(12),padding: scale(1),fontWeight:"700", fontFamily: appFonts.INTER_REGULAR, textAlign: 'center', paddingLeft: 0 }} numberOfLines={1}> - </Text>
                              </View>
                              :
                              <View style={{ width: "30%", alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderColor: "green", borderWidth: 0 }}>
                                <Text style={{ fontSize: scale(12),padding: scale(1),fontWeight:"700", fontFamily: appFonts.INTER_REGULAR, textAlign: 'center', paddingLeft: 0 }} numberOfLines={1}>   </Text>
                              </View>
                          }
                        </Fragment>
                    }
                    {
                      businessValue ?
                        <View style={{ width: "24%", marginLeft: scale(0), alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: "green" }}>
                          <Text style={{ color:"#132C52",fontSize: scale(12),marginRight:scale(10),padding: scale(1),fontWeight:"400", fontFamily: appFonts.INTER_REGULAR, textAlign: 'center', marginLeft: scale(1) }} numberOfLines={1}>{this.getPointsText(businessValue)}</Text>
                        </View>

                        :
                        <Fragment>
                          {
                            businessClass ?
                              <View style={{ width: "24%", marginLeft: scale(12), alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: "green" }}>
                                <Text style={{ fontSize: scale(12),padding: scale(1),fontWeight:"700", fontFamily: appFonts.INTER_REGULAR, textAlign: 'center', paddingLeft: scale(13), marginLeft: scale(12) }} numberOfLines={1}> - </Text>
                              </View>
                              :
                              <View style={{ width: "24%", marginLeft: scale(12), alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: "green" }}>
                                <Text style={{ fontSize: scale(12),padding: scale(1),fontWeight:"700", fontFamily: appFonts.INTER_REGULAR, textAlign: 'center', paddingLeft: scale(12), marginLeft: scale(12) }} numberOfLines={1}>   </Text>
                              </View>
                          }
                        </Fragment>
                    }
                    {
                      firstValue ?
                        <View style={{ width: "20%", alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: "green" }}>
                          <Text style={{color:"#132C52", fontSize: scale(12),padding: scale(1),fontWeight:"400", fontFamily: appFonts.INTER_REGULAR, textAlign: 'right', paddingRight: 7, paddingLeft: scale(20) }} numberOfLines={1}>{this.getPointsText(firstValue)}</Text>
                        </View>

                        :
                        <Fragment>
                          {
                            firstClass ?
                              <View style={{ width: "20%", alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: "green" }}>
                                <Text style={{ fontSize: scale(12),padding: scale(1),fontWeight:"700", fontFamily: appFonts.INTER_REGULAR, textAlign: 'right', paddingRight: 1, paddingLeft: scale(6) }} numberOfLines={1}> - </Text>
                              </View>

                              : <View style={{ width: "20%", alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: "green" }}>
                                <Text style={{ fontSize: scale(12),padding: scale(1),fontWeight:"700", fontFamily: appFonts.INTER_REGULAR, textAlign: 'right', paddingRight: 1, paddingLeft: scale(6) }} numberOfLines={1}>   </Text>
                              </View>
                          }
                        </Fragment>
                    }
                  </View>
                  :
                  this.state.peak === false ?
                  <View style={{ width: "96%", flexDirection: "row", justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginStart: 3 }}>
                    {
                      economyValue ?
                        <View style={{ width: "22%", marginLeft: scale(7), alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: "red" }}>
                          <Text style={{ fontSize: scale(12),padding: scale(1),fontWeight:"400", fontFamily: appFonts.INTER_REGULAR, textAlign: 'center', paddingRight: scale(15),color:"#132C52" }} numberOfLines={1}>{this.getPointsText(economyValue)}</Text>
                        </View>
                        :
                        <Fragment>
                          {
                            economyClass ?
                              <View style={{ width: "22%", marginLeft: scale(7), alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: "red" }}>
                                <Text style={{ fontSize: scale(12),padding: scale(1),fontWeight:"700", fontFamily: appFonts.INTER_REGULAR, textAlign: 'center', paddingLeft: 7 }} numberOfLines={1}> - </Text>
                              </View>
                              :
                              <View style={{ width: "22%", marginLeft: scale(7), alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: "red" }}>
                                <Text style={{ fontSize: scale(12),padding: scale(1),fontWeight:"700", fontFamily: appFonts.INTER_REGULAR, textAlign: 'center', paddingLeft: 7 }} numberOfLines={1}> - </Text>
                              </View>
                          }
                        </Fragment>
                    }
                    {
                      premiumValue ?
                      <View style={{ width: "30%", marginLeft: scale(1), alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderColor: "green", borderWidth: 0 }}>
                           <Text style={{ fontSize: scale(12), marginRight:scale(10),padding: scale(1),fontWeight:"400", fontFamily: appFonts.INTER_REGULAR, textAlign: 'center', paddingLeft: 0 ,color:"#132C52"}} numberOfLines={1}> {this.getPointsText(premiumValue)}</Text>
                      </View>
                        :
                        <Fragment>
                          {
                            premiumClass ?
                              <View style={{ width: "30%", marginLeft: scale(7), alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderColor: "red", borderWidth: 0 }}>
                                <Text style={{ fontSize: scale(12),paddingEnd:scale(9),padding: scale(1),fontWeight:"700", fontFamily: appFonts.INTER_REGULAR, textAlign: 'center', paddingLeft: scale(6) }} numberOfLines={1}> - </Text>
                              </View>
                              :
                              <View style={{ width: "30%", marginLeft: scale(7), alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderColor: "red", borderWidth: 0 }}>
                                <Text style={{ fontSize: scale(12),padding: scale(1),fontWeight:"700", fontFamily: appFonts.INTER_REGULAR, textAlign: 'center', paddingLeft: scale(6) }} numberOfLines={1}>   </Text>
                              </View>
                          }
                        </Fragment>
                    }
                    {
                      businessValue ?
                      <View style={{ width: "24%", marginLeft: scale(0), alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: "green" }}>
                      <Text style={{ fontSize: scale(12),marginRight:scale(10),padding: scale(1),fontWeight:"400", fontFamily: appFonts.INTER_REGULAR, textAlign: 'center', marginLeft: scale(1),color:"#132C52"}} numberOfLines={1}>{this.getPointsText(businessValue)}</Text>
                    </View>
                        :
                        <Fragment>
                          {
                            businessClass ?
                              <View style={{ width: "24%", marginLeft: scale(10), alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: "red" }}>
                                <Text style={{ fontSize: scale(12),padding: scale(1),fontWeight:"700", fontFamily: appFonts.INTER_REGULAR, textAlign: 'center', paddingLeft: scale(10), marginLeft: scale(9) }} numberOfLines={1}> - </Text>
                              </View>
                              :
                              <View style={{ width: "24%", marginLeft: scale(10), alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: "red" }}>
                                <Text style={{ fontSize: scale(12),padding: scale(1),fontWeight:"700", fontFamily: appFonts.INTER_REGULAR, textAlign: 'center', paddingLeft: scale(10), marginLeft: scale(9) }} numberOfLines={1}>   </Text>
                              </View>
                          }
                        </Fragment>
                    }
                    {
                      firstValue ?
                        <View style={{ width: "20%", alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: "red" }}>
                          <Text style={{ fontSize: scale(12),padding: scale(1),fontWeight:"400", fontFamily: appFonts.INTER_REGULAR, textAlign: 'right', paddingRight: 7, paddingLeft: scale(20),color:"#132C52" }} numberOfLines={1}>{this.getPointsText(firstValue)}</Text>
                        </View>
                        :
                        <Fragment>
                          {
                            firstClass ?
                              <View style={{ width: "20%", alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: "red" }}>
                                <Text style={{ fontSize: scale(12),padding: scale(1),fontWeight:"700", fontFamily: appFonts.INTER_REGULAR, textAlign: 'right', paddingRight: 7, paddingLeft: scale(6) }} numberOfLines={1}> - </Text>
                              </View>
                              :
                              <View style={{ width: "20%", alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: "red" }}>
                                <Text style={{ fontSize: scale(12),padding: scale(1),fontWeight:"700", fontFamily: appFonts.INTER_REGULAR, textAlign: 'right', paddingRight: 7, paddingLeft: scale(6) }} numberOfLines={1}>   </Text>
                              </View>
                          }
                        </Fragment>
                    }
                  </View>
                  : null
              }
            </View>
          
            : null
        }
      </View>
    )
  }



  renderOutboundDates = () => {
    let dates = JSON.parse(this.props.route.params.singleMap)
    const { tripType } = this.state;
    let isEconomy = false
    let isPremium = false
    let isBusiness = false
    let isFirst = false

    let economy1 = false
    let premium1 = false
    let business1 = false
    let first1 = false

    let economy2 = false
    let premium2 = false
    let business2 = false
    let first2 = false

    if (tripType == "return") {
      let inboundData = dates.availability.inbound
      let outboundData = dates.availability.outbound

      for (let i of Object.keys(outboundData)) {
        if (outboundData[i].economy) {
          economy1 = true
        }
        if (outboundData[i].premium) {
          premium1 = true
        }
        if (outboundData[i].business) {
          business1 = true
        }
        if (outboundData[i].first) {
          first1 = true
        }
      }
     
      for (let i of Object.keys(inboundData)) {
        if (inboundData[i].economy) {
          economy2 = true
        }
        if (inboundData[i].premium) {
          premium2 = true
        }
        if (inboundData[i].business) {
          business2 = true
        }
        if (inboundData[i].first) {
          first2 = true
        }
      }

      if (economy1 == economy2) {
        isEconomy = true
      }
      if (premium1 == premium2) {
        isPremium = true
      }
      if (business1 == business2) {
        isBusiness = true
      }
      if (first1 == first2) {
        isFirst = true
      }
    }

    let actualDate = Object.entries(dates.availability.outbound)
    let DateCount = 9
    if(tripType == "return"){
      DateCount = 9
    }
    else{
      DateCount = 19
    }


    return (
      <View style={{ width: scale(350), flex:1,flexDirection: "row",flexWrap:"wrap",alignSelf:"flex-start",marginStart:scale(10),marginEnd:scale(10) }}>
        {
          actualDate.map((singleMap ,index) => {

            peakKey =  singleMap[1].peak
            dateForPoints = singleMap[0]

            let dates = Object.values(singleMap)[0];
            
            let dateKeys = Object.values(singleMap)[1]
            // let actualDate = new Date(dates).getDate()

            let actualDate =  moment(dates).format("DD MMM").split(" ")

            let month = new Date(dates).getMonth()
            let returnDateMonth = ""

            let businessClass = singleMap[dateKeys]
            let peak = dateKeys.peak;
            let business;
            let economy;
            let premium;
            let first;

            let economySeat;
            let premiumSeat;
            let businessSeat;
            let firstSeat;


            if (tripType == "return") {
              if (dateKeys.economy && isEconomy) {               
                economy = dateKeys.economy.points      
                economySeat = dateKeys.economy   
              }
              if (dateKeys.premium && isPremium) {            
                premium = dateKeys.premium.points
                premiumSeat = dateKeys.premium
              }
              if (dateKeys.business && isBusiness) {              
                business = dateKeys.business.points
                businessSeat = dateKeys.business
              }
              if (dateKeys.first && isFirst) {              
                first = dateKeys.first.points;
                firstSeat = dateKeys.first
              }
            }
            else {
              if (dateKeys.economy) {              
                economy = dateKeys.economy.points
                economySeat = dateKeys.economy   
              }
              if (dateKeys.premium) {                
                premium = dateKeys.premium.points
                premiumSeat = dateKeys.premium
              }
              if (dateKeys.business) {              
                business = dateKeys.business.points
                businessSeat = dateKeys.business
              }
              if (dateKeys.first) {           
                first = dateKeys.first.points
                firstSeat = dateKeys.first
              }
            }

            return (
              <Fragment>
                {
                  index <=  DateCount ?
                  <View style={ [styles.outboundMainView, { margin: (index >= 10 && tripType == "return")? scale(7) : scale(4)  } ]}>
                  {
                    peak == true ?
                      <Fragment>
                        {
                          economySeat && premiumSeat && businessSeat && firstSeat ?
                            <ImageBackground
                            source={require("../../assets/classes/c1.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >

                                <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>


                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          economySeat && premiumSeat && businessSeat && !firstSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c2.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"

                            >
                              <TouchableOpacity
                                onPress={() => {
                                    setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                               
                                <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>

                             </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          economySeat && premiumSeat && firstSeat && !businessSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c3.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                    setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          economySeat && businessSeat && firstSeat && !premiumSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c4.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                    setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          businessSeat && premiumSeat && firstSeat && !economySeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c5.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                    setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          economySeat && premiumSeat && !firstSeat && !businessSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c6.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                    setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          economySeat && businessSeat && !firstSeat && !premiumSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c7.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                    setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          economySeat && firstSeat && !businessSeat && !premiumSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c8.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                    setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          premiumSeat && businessSeat && !firstSeat && !economySeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c9.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                    setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          premiumSeat && firstSeat && !economySeat && !businessSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c10.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                    setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          businessSeat && firstSeat && !economySeat && !premiumSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c10.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                    setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          economySeat && !firstSeat && !businessSeat && !premiumSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c12.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>

                            : null

                        }
                        {
                          businessSeat && !firstSeat && !economySeat && !premiumSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c13.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                    setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>

                            : null

                        }
                        {
                          premiumSeat && !firstSeat && !economySeat && !businessSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c14.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                    setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>

                            : null

                        }
                        {
                          firstSeat && !premiumSeat && !economySeat && !businessSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c15.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                    setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }

                      </Fragment>

                      :
                      <Fragment>
                        {
                          economySeat && premiumSeat && businessSeat && firstSeat ?
                            <ImageBackground
                            source={require("../../assets/classes/c1.png")}
                            style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                    setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          economySeat && premiumSeat && businessSeat && !firstSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c2.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                    setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          economySeat && premiumSeat && firstSeat && !businessSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c3.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                    setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          economySeat && businessSeat && firstSeat && !premiumSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c4.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                    setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          businessSeat && premiumSeat && firstSeat && !economySeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c5.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                    setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          economySeat && premiumSeat && !firstSeat && !businessSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c6.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                    setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          economySeat && businessSeat && !firstSeat && !premiumSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c7.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                    setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          economySeat && firstSeat && !businessSeat && !premiumSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c8.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                    setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          premiumSeat && businessSeat && !firstSeat && !economySeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c9.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                    setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          premiumSeat && firstSeat && !economySeat && !businessSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c10.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                    setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          businessSeat && firstSeat && !economySeat && !premiumSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c10.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                    setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }

                        {
                          economySeat && !firstSeat && !businessSeat && !premiumSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c12.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                    setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>

                            : null
                        }
                        {
                          businessSeat && !firstSeat && !economySeat && !premiumSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c13.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                    setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>

                            : null
                        }
                        {
                          premiumSeat && !firstSeat && !economySeat && !businessSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c14.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                    setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          firstSeat && !premiumSeat && !economySeat && !businessSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c15.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                    setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                      </Fragment>
                  }
                </View>

                  : null
                }
              </Fragment>
            )
          })
        }
      </View>
    )
  }

  renderInboundDates() {
    let dates = JSON.parse(this.props.route.params.singleMap)
    const { tripType } = this.state

    let isEconomy = false
    let isPremium = false
    let isBusiness = false
    let isFirst = false

    let economy1 = false
    let premium1 = false
    let business1 = false
    let first1 = false

    let economy2 = false
    let premium2 = false
    let business2 = false
    let first2 = false

    if (tripType == "return") {
      let inboundData = dates.availability.inbound
      let outboundData = dates.availability.outbound


      for (let i of Object.keys(outboundData)) {
        if (outboundData[i].economy) {
          economy1 = true
        }
        if (outboundData[i].premium) {
          premium1 = true
        }
        if (outboundData[i].business) {
          business1 = true
        }
        if (outboundData[i].first) {
          first1 = true
        }
      }
    
      for (let i of Object.keys(inboundData)) {
        if (inboundData[i].economy) {
          economy2 = true
        }
        if (inboundData[i].premium) {
          premium2 = true
        }
        if (inboundData[i].business) {
          business2 = true
        }
        if (inboundData[i].first) {
          first2 = true
        }
      }

      if (economy1 == economy2) {
        isEconomy = true
      }
      if (premium1 == premium2) {
        isPremium = true
      }
      if (business1 == business2) {
        isBusiness = true
      }
      if (first1 == first2) {
        isFirst = true
      }
    }

    let outBoundDates = Object.entries(dates.availability.outbound)

    let firstOutboundObject; 
    let firstOutboundDate; 
    
    for(const key in outBoundDates){
      if(outBoundDates.hasOwnProperty(key)){
        firstOutboundObject = outBoundDates[key];
        break;
      }
    }
    
    firstOutboundDate = new Date(Object.values(firstOutboundObject)[0]);

    let actualDate = Object.entries(dates.availability.inbound).filter(([key, value])=>{
      //const item = dates.availability.inbound[key];
      let itemDate = new Date(key);
      return itemDate>=firstOutboundDate;
    });

    return (
      <View style={{ width: scale(350), flex:1,flexDirection: "row",flexWrap:"wrap",alignSelf:"flex-start",marginStart:scale(10),marginEnd:scale(10) }}>
        {
          actualDate.length!=0 ? actualDate.map((singleMap, index) => {
            

           let  peakKey =  singleMap[1].peak
             dateForPoints = singleMap[0]

            let dates = Object.values(singleMap)[0];
            let dateKeys = Object.values(singleMap)[1]
            let actualDate =  moment(dates).format("DD MMM").split(" ")
            let month = "";
            let businessClass = singleMap[dateKeys]
            let returnDateMonth = new Date(dates).getMonth()

           let peak = dateKeys.peak;
            let business;
            let economy;
            let premium;
            let first;

            let economySeat;
            let premiumSeat;
            let businessSeat;
            let firstSeat;

            if (tripType == "return") {
              if (dateKeys.economy && isEconomy) {               
                economy = dateKeys.economy.points      
                economySeat = dateKeys.economy   
              }
              if (dateKeys.premium && isPremium) {            
                premium = dateKeys.premium.points
                premiumSeat = dateKeys.premium
              }
              if (dateKeys.business && isBusiness) {              
                business = dateKeys.business.points
                businessSeat = dateKeys.business
              }
              if (dateKeys.first && isFirst) {              
                first = dateKeys.first.points;
                firstSeat = dateKeys.first
              }
            }
            else {
              if (dateKeys.economy) {              
                economy = dateKeys.economy.points
                economySeat = dateKeys.economy   
              }
              if (dateKeys.premium) {                
                premium = dateKeys.premium.points
                premiumSeat = dateKeys.premium
              }
              if (dateKeys.business) {              
                business = dateKeys.business.points
                businessSeat = dateKeys.business
              }
              if (dateKeys.first) {           
                first = dateKeys.first.points
                firstSeat = dateKeys.first
              }
            }

            return (
              <Fragment>
                {
                  index <= 9 ?
                  <View style={ [styles.outboundMainView, { margin: index >= 10 ? scale(7) : scale(4) }]}>
                  {
                    peak == true ?
                      <Fragment>
                        {
                          economySeat && premiumSeat && businessSeat && firstSeat ?
                            <ImageBackground
                            source={require("../../assets/classes/c1.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)

                                }}
                              >
                                <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          economySeat && premiumSeat && businessSeat && !firstSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c2.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"

                            >
                              <TouchableOpacity
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)

                                }}
                              >
                                <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          economySeat && premiumSeat && firstSeat && !businessSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c3.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)

                                }}
                              >
                                <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          economySeat && businessSeat && firstSeat && !premiumSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c4.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)

                                }}
                              >
                                <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          businessSeat && premiumSeat && firstSeat && !economySeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c5.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)

                                }}
                              >
                                <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          economySeat && premiumSeat && !firstSeat && !businessSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c6.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)

                                }}
                              >
                                <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          economySeat && businessSeat && !firstSeat && !premiumSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c7.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)

                                }}
                              >
                                <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          economySeat && firstSeat && !businessSeat && !premiumSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c8.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)

                                }}
                              >
                                <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          premiumSeat && businessSeat && !firstSeat && !economySeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c9.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)

                                }}
                              >
                                <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          premiumSeat && firstSeat && !economySeat && !businessSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c10.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)

                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          businessSeat && firstSeat && !economySeat && !premiumSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c10.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)

                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          economySeat && !firstSeat && !businessSeat && !premiumSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c12.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)

                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>

                            : null

                        }
                        {
                          businessSeat && !firstSeat && !economySeat && !premiumSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c13.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)

                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>

                            : null

                        }
                        {
                          premiumSeat && !firstSeat && !economySeat && !businessSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c14.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)

                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>

                            : null

                        }
                        {
                          firstSeat && !premiumSeat && !economySeat && !businessSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c15.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)

                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }

                      </Fragment>

                      :
                      <Fragment>
                        {
                          economySeat && premiumSeat && businessSeat && firstSeat ?
                            <ImageBackground
                            source={require("../../assets/classes/c1.png")}
                            style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)

                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          economySeat && premiumSeat && businessSeat && !firstSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c2.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)

                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          economySeat && premiumSeat && firstSeat && !businessSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c3.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)

                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          economySeat && businessSeat && firstSeat && !premiumSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c4.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)

                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          businessSeat && premiumSeat && firstSeat && !economySeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c5.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)

                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          economySeat && premiumSeat && !firstSeat && !businessSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c6.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)

                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          economySeat && businessSeat && !firstSeat && !premiumSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c7.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)

                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          economySeat && firstSeat && !businessSeat && !premiumSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c8.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)

                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          premiumSeat && businessSeat && !firstSeat && !economySeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c9.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)

                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          premiumSeat && firstSeat && !economySeat && !businessSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c10.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          businessSeat && firstSeat && !economySeat && !premiumSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c10.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)

                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }

                        {
                          economySeat && !firstSeat && !businessSeat && !premiumSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c12.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          businessSeat && !firstSeat && !economySeat && !premiumSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c13.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          premiumSeat && !firstSeat && !economySeat && !businessSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c14.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                        {
                          firstSeat && !premiumSeat && !economySeat && !businessSeat ?
                            <ImageBackground
                              source={require("../../assets/classes/c15.png")}
                              style={styles.outboundbgImg}
                              resizeMode="contain"
                            >
                              <TouchableOpacity style={styles.offpeakbg}
                                onPress={() => {
                                   setTimeout(() => {
                                  this.setState({peakKey:peakKey,peak:peak})
                                  }, 300);
                                  this.showClassesData(first, economy, business, premium, peak, month, returnDateMonth, actualDate,peakKey,dateForPoints)
                                }}
                              >
                                  <Text style={styles.dateText}>{actualDate[0]}</Text>
                                <Text style={styles.monthText}>{actualDate[1]}</Text>
                              </TouchableOpacity>
                            </ImageBackground>
                            : null
                        }
                      </Fragment>
                  }
                </View>

                  : null
                }
              
              </Fragment>
            )
          }) : 
          <Text
          style={{textAlign: CONST.CENTER,}}
          >
            Selected cabin class is unavailable for your search parameters
          </Text>
        
        }
      </View>
    )
  }




  renderBottomButton(buttonText, backgroundColor, onButtonPress) {
    return (
      <TouchableOpacity
        style={[styles.buttonStyleMap, { backgroundColor: backgroundColor, position: "absolute", bottom: 40 }]}
        onPress={() => {
          onButtonPress();
        }}
      >
        <Text style={styles.buttonTextStyle}>{buttonText}</Text>
      </TouchableOpacity>
    );
  }


  gotoCalender = () => {  
    this.setState({isLoader:true})  
    var availableDestinations = JSON.parse(this.props.route.params.singleMap)
    var destinations = availableDestinations.length > 0 ? availableDestinations : []
    let data = JSON.parse(this.props.route.params.searchData);
    let auditData = JSON.parse(this.props.route.params.auditData)
   

    let mapSearchData = {
      airline: data.airline,
      // sourceCode: data.sourceCode.code,
      // destinationCode: availableDestinations.code,
      // selectedDestination: availableDestinations,
      // selectedSource: data.sourceCode,
      // tier: data.tier,
      sourceCode: this.state.WhereFrom == true ? availableDestinations.code : data.sourceCode.code,
      destinationCode: this.state.WhereFrom == true ? data.sourceCode.code : availableDestinations.code,
      selectedDestination: this.state.WhereFrom == true ? data.sourceCode : availableDestinations,
      selectedSource: this.state.WhereFrom == true ? availableDestinations : data.sourceCode,
      tier: data.tier,
      passengerCount: data.passengerCount,
      isReturn: data.tripType !== "one_way",
      classSelected: data.classesSelected,
      airways: data.airways,
      selectedStartDate: data.selectedStartDate
    };
    this.setState({
      mapSearchData: mapSearchData
    })

    auditData['search_data']['destination'] = availableDestinations.code
    let flightScheduleData = {
      airline: mapSearchData.airline,
      source: mapSearchData.sourceCode,
      destination: mapSearchData.destinationCode
    }
    
    this.props.getFlightScheduleAction(flightScheduleData)
    this.props.sendAuditDataAction(auditData);
    this.props.getAirlinesAvailabilityAction(mapSearchData);
    this.props.getSeatsAvailabilityAction(mapSearchData);
    this.props.getPointsAvailabilityAction(mapSearchData)

  }

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
            <Image source={IMAGE_CONST.LOADER} style={{ height: verticalScale(200), width: verticalScale(200) }} />
          </View>
        </View>
        </View>
      </Modal>
    
    )
  }





  render() {
    let singleMap = this.props.route.params.singleMap
    let destinationData = JSON.parse(singleMap)
    let departureCount = destinationData.availability.outboundLeftCounter
    let returnCount = destinationData.availability.inboundLeftCounter
    let isOutBoundTrue;
    let isInBoundTrue;
    if (destinationData.availability.outbound) {
      isOutBoundTrue = Object.entries(destinationData.availability.outbound)
    }
    if (destinationData.availability.inbound) {
      isInBoundTrue = Object.entries(destinationData.availability.inbound)
    }
    const {tripType, departureDaysDiff, returnDaysDiff} = this.state


    // console.log("yes check here inside render - - - - - -  - -   ",pendingOutBoundCount)
   
    return (
      <SafeAreaView style={{ flex: 1,backgroundColor:"#FFF" }}>
        <MyStatusBar />
        {this.renderLoader()}
        {this.renderHeader()}
        {this.renderPeakFairText()}

        {/* <View style={{ margin: scale(10), paddingStart: scale(0), justifyContent: "center", alignItems: "center", marginTop: scale(20), paddingBottom: scale(10), }}>
            <Text style={{ fontSize: scale(12), padding: scale(3), color: "#132C52", fontFamily: appFonts.INTER_REGULAR, textAlign: 'center' }}>Click on any date to see the price of cabin class</Text>
          </View> */}

        {this.showClassesData()}
        {/* {this.renderClasses()} */}
        <ScrollView scrollEnabled={false}>
          {
            isOutBoundTrue ?
              <Fragment>
                <View style={{ margin: scale(10), paddingStart: scale(10) }}>
                  <Text style={{ fontSize: scale(16), padding: 3, color: "#132C52", fontFamily: appFonts.INTER_SEMI_BOLD }}>Departure</Text>
                </View>
                {this.renderOutboundDates()}
                {/* {
                  this.state.month ?
                    <View style={{ backgroundColor: "#03B2D8", flexDirection: "row", alignSelf: 'center', borderRadius: 6, justifyContent: "center", marginTop: scale(7) }}>
                      <Text style={{ fontSize: scale(14), color: "#fff", marginStart: 10, padding: 7, marginEnd: -9, fontFamily: appFonts.INTER_SEMI_BOLD, alignSelf: 'center', fontWeight: Platform.OS === 'ios' ? '100' : '700' }}>{this.state.actualDate}</Text>
                      <Text style={{ fontSize: scale(14), color: "#fff", marginEnd: 10, padding: 7, fontFamily: appFonts.INTER_SEMI_BOLD, alignSelf: 'center', fontWeight: Platform.OS === 'ios' ? '100' : '700' }}>{this.state.month}</Text>
                    </View>
                    : null
                } */}
                {
                  departureDaysDiff ?
                    <TouchableOpacity onPress={() => { this.gotoCalender() }} style={{
                      alignItems: "flex-end", alignSelf: "flex-end", justifyContent: "center", marginRight: scale(30), margin: scale(10)
                      , marginTop: this.state.month ? scale(7) : scale(7),
                    }}>
                      <Text style={{ textAlign: 'right', fontSize: scale(13), color: "#03B2D8", fontFamily: appFonts.INTER_BOLD, fontWeight: Platform.OS === 'ios' ? '700' : '700',textDecorationLine:"underline" }}>+{departureDaysDiff} More days </Text>
                      {/* <Text style={{ textAlign: 'center', fontSize: scale(13), color: "#03B2D8", fontFamily: appFonts.INTER_BOLD, fontWeight: Platform.OS === 'ios' ? '100' : '900' }}> </Text> */}
                    </TouchableOpacity>
                    : null
                }
              </Fragment>
              : null
          }
          {
              isInBoundTrue ?
              <Fragment>
                <View style={{ margin: scale(10), paddingStart: scale(10) }}>
                  <Text style={{ fontSize: scale(16), padding: 3, color: "#132C52", fontFamily: appFonts.INTER_SEMI_BOLD }}>Return</Text>
                </View>
                {this.renderInboundDates()}
                {/* {
                  this.state.returnDateMonth ?
                    <View style={{ backgroundColor: "#03B2D8", flexDirection: "row", alignSelf: 'center', borderRadius: 6, marginTop: -scale(0), justifyContent: "center", borderWidth: 0, marginTop: scale(7) }}>
                      <Text style={{ fontSize: scale(14), color: "#fff", marginStart: 10, padding: 7, marginEnd: -9, fontFamily: appFonts.INTER_SEMI_BOLD, alignSelf: 'center', fontWeight: Platform.OS === 'ios' ? '100' : '700' }}>{this.state.actualDate}</Text>
                      <Text style={{ fontSize: scale(14), color: "#fff", marginEnd: 10, padding: 7, fontFamily: appFonts.INTER_SEMI_BOLD, alignSelf: 'center', fontWeight: Platform.OS === 'ios' ? '100' : '700' }}>{this.state.returnDateMonth}</Text>
                    </View>
                    : null
                } */}
                {
                  returnDaysDiff ?
                    <TouchableOpacity onPress={() => { this.gotoCalender() }} style={{
                      alignItems: "flex-end", alignSelf: "flex-end",
                      marginTop: this.state.returnDateMonth ? scale(7) : scale(7), justifyContent: "center", marginRight: scale(30), margin: scale(10), borderWidth: 0
                    }}>
                      <Text style={{ textAlign: 'right', fontSize: scale(13), color: "#03B2D8", fontFamily: appFonts.INTER_BOLD, fontWeight: Platform.OS === 'ios' ? '700' : '700',textDecorationLine:"underline" }}>+{returnDaysDiff} More days</Text>
                      {/* <Text style={{ textAlign: 'center', fontSize: scale(13), color: "#03B2D8", fontFamily: appFonts.INTER_BOLD, fontWeight: Platform.OS === 'ios' ? '100' : '900' }}> </Text> */}
                    </TouchableOpacity>
                    : null
                }
              </Fragment>
              : null
          }


          <View style={{ margin: scale(10), paddingStart: scale(0), justifyContent: "center", alignItems: "center", marginTop: scale(20), paddingBottom: scale(10), }}>
            <Text style={{ fontSize: scale(14), padding: scale(3), color: "#132C52", fontFamily: appFonts.INTER_REGULAR, textAlign: 'center' }}>Click on any date to see the price of cabin class</Text>
          </View>
         
         
        </ScrollView>
        {this.renderBottomButton(
          STRING_CONST.VIEW_CALENDAR,
          colours.lightBlueTheme,
          () => {
            this.gotoCalender()
          }
        )}
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => {
  const { calendar } = state;
  return {
    airlinesDetail: calendar.airlinesDetail,
    calendarSeats:calendar.calendarSeats,
    screenType: calendar.screenType,
    peakOffpeakData:calendar.peakOffpeakData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAirlinesAvailabilityAction: (mapSearchData) =>
    dispatch(getAirlinesAvailability(mapSearchData, 'MAP')),
    getSeatsAvailabilityAction: (mapSearchData) =>
     dispatch(getSeatsAvailability(mapSearchData, 'MAP')),
    getPointsAvailabilityAction: (mapSearchData) => dispatch(getPointsAvailability(mapSearchData)),
    sendAuditDataAction: (auditData) => dispatch(sendAuditData(auditData)),
    getCabinClassAction:(data)=> dispatch(getCabinClass(data)),
    getFlightScheduleAction: (flightScheduleData) => dispatch(getFlightSchedule(flightScheduleData)),
    getPeakOffPeakDataAction:() => dispatch(getPeakOffPeakData()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DestinationsComponent);