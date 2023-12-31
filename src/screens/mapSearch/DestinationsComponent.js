import React, { Component, Fragment } from 'react';
import { View, Text, SafeAreaView,TextInput, TouchableOpacity, BackHandler, Image, ScrollView, Dimensions, Platform } from 'react-native';
import styles from './masSearchStyles'
import scale, { verticalScale } from "../../helpers/scale";
import * as STRING_CONST from "../../constants/StringConst";
import  AntDesign from 'react-native-vector-icons/AntDesign';
import { appFonts } from "../../constants/StringConst";
import SearchInput, { createFilter } from 'react-native-search-filter';
import { colours } from '../../constants/ColorConst';
const KEYS_TO_FILTERS = ['city_name', 'country_name', 'code', 'Hewanorra', 'SLU', 'UVF'];
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

import FastImage from 'react-native-fast-image'

export default class DestinationsComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      destination: [],
      isBodyLoaded: false,
      city_name: "",
      searchTerm: '',
      sortType: 'asc',
      tripType: this.props.route.params.tripType,
      sourceCode: this.props.route.params.sourceCode,
    }
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }
  componentDidMount = () => {
    let destination = this.props.route.params.destinations;
    let searchData = this.props.route.params.searchData
    let auditData = this.props.route.params.auditData

    // console.log("check on source ######## ",this.state.sourceCode)
    
    if (this.state.sourceCode == "LON") {
      let objIndex = destination.findIndex((obj => obj.code == "SLU"));
      if (objIndex != -1) {
        destination[objIndex].city_name = "Hewanorra International Airport (UVF) (SLU)"
      }
    }

    this.setState({
      destination: destination
    })
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

  sortListByName() {
    //Sort ArrayList by ascending order
    this.state.destination.sort(function (obj1, obj2) {
      return obj1.city_name - obj2.city_name;
    });
    this.setState(previousState => (
      { destination: previousState.destination }
    ))
  }


  // renderHeader() {
  //   return (
  //     <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 9, marginTop: 10, alignContent: "center" }}>
  //       <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
  //         <Image source={require("../../assets/common/back1.png")} style={[styles.infoIcon1]} />
  //       </TouchableOpacity>
  //       <Text style={{ fontSize: scale(20), fontWeight: "700", textAlign: 'center', color: "#132C52" }}>{STRING_CONST.DESTINATIONS}</Text>
  //       <TouchableOpacity style={{marginRight:scale(30)}}>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }


  renderHeader() {
    return (
     <View style={{backgroundColor:"#03B2D8",height:scale(170),borderBottomLeftRadius:scale(25),borderBottomRightRadius:scale(25),width:"100%",marginTop:scale(-50)}}>
        <View style={{justifyContent:"space-between",width:"92%",flexDirection:"row",borderWidth:0,marginTop:scale(40),alignSelf:"center"}}>
        <TouchableOpacity onPress={() => {
              this.props.navigation.goBack()}}>
              <FastImage source={require("../../assets/findFlight/back.png")} resizeMode="contain" style={{height:scale(25),width:scale(25),margin:scale(10)}} />
            </TouchableOpacity>
  
            <Text style={{fontSize:scale(20),fontWeight:"700",padding:scale(10),color:"#FFF"}}>Search Destination</Text>
  
            <Text>          </Text>
           </View>
  
           <View style={{marginTop:scale(20),backgroundColor:"#42c5e2",width:scale(330),alignSelf:"center",flexDirection:"row",borderWidth:0,borderRadius:scale(10)}}>
              <TextInput 
                //  onChangeText={(searchText) => {
                //   this.onSearch(searchText)
                // }}
                placeholder='Search Available Routes'
                placeholderTextColor="#FFF"
                onChangeText={(term) => { this.searchUpdated(term) }}
              style={{height:scale(40),paddingStart:scale(10),color:"#FFF",width:scale(280),borderRadius:scale(10),fontWeight:"700"}}  />
              <TouchableOpacity style={{backgroundColor:"#FFF",width:scale(42),borderEndEndRadius:scale(10),borderTopRightRadius:scale(10),marginStart:scale(10),borderBottomEndRadius:scale(10),alignSelf:"flex-end"}}>
              <FastImage source={require("../../assets/findFlight/search.png")} resizeMode="contain" style={{height:scale(25),width:scale(25),margin:scale(10)}} />
              </TouchableOpacity>
           </View>
     </View>
    );
  }

  renderClasses() {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between", margin: scale(10), marginTop: scale(15), alignContent: "center", width: "96%" }}>
        <View style={{ flexDirection: "row", backgroundColor: "#ebf9fc",borderRadius:scale(4), borderWidth: 0, justifyContent: 'center', marginBottom: scale(1), alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ padding: scale(4), borderRadius: scale(6), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <AntDesign name="checkcircle" size={scale(12)} color="#2044FF" />
            <Text style={{ fontSize: scale(12), textAlign: 'center', paddingStart:scale(4), color: "#132C52", fontFamily: appFonts.INTER_SEMI_BOLD, }}>{STRING_CONST.ECONOMY}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", backgroundColor: "#ebf9fc",borderRadius:scale(4), borderWidth: 0, justifyContent: 'center', marginBottom: scale(1), alignItems: 'center', justifyContent: 'center', marginLeft: 2 }}>
          <View style={{ padding: scale(4),borderRadius: scale(6), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <AntDesign name="checkcircle" size={scale(12)} color="#FEA41D" />
            <Text style={{ fontSize: scale(12), textAlign: 'center', paddingStart:scale(4), paddingEnd: 4, color: "#132C52", fontFamily: appFonts.INTER_SEMI_BOLD, }}>{STRING_CONST.PREMIUM_ECONOMY}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", backgroundColor: "#ebf9fc",borderRadius:scale(4), borderWidth: 0, justifyContent: 'center', marginBottom: scale(1), alignItems: 'center', justifyContent: 'center', marginLeft: 2 }}>
          <View style={{ padding: scale(4),borderRadius: scale(6), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <AntDesign name="checkcircle" size={scale(12)} color="#A905F6" />
            <Text style={{ fontSize: scale(12), textAlign: 'center', paddingStart:scale(4), paddingEnd: 4, color: "#132C52", fontFamily: appFonts.INTER_SEMI_BOLD, }}>{STRING_CONST.BUSINESS}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", backgroundColor: "#ebf9fc",borderRadius:scale(4), borderWidth: 0, justifyContent: 'center', marginBottom: scale(1), alignItems: 'center', justifyContent: 'center', marginLeft: 2 }}>
          <View style={{ padding: scale(4),borderRadius: scale(6), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <AntDesign name="checkcircle" size={scale(12)} color="#EB186F" />
            <Text style={{ fontSize: scale(12), textAlign: 'center', paddingStart:scale(4), color: "#132C52", fontFamily: appFonts.INTER_SEMI_BOLD, }}>{STRING_CONST.FIRST}</Text>
          </View>
        </View>

      </View>
    );
  }



  searchFilterFunction = text => { 
    const { destination } = this.state;

    const newData = destination.filter(item => {
      const itemData = `${item.city_name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({ destination: newData });
  };


  render() {

    const { destination, sortType, tripType } = this.state;
    let searchData = this.props.route.params.searchData
    let auditData = this.props.route.params.auditData
    const filteredDestination = destination.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    const sortedArray = filteredDestination.sort((a, b) => {
      const isReversed = (sortType === 'asc') ? 1 : -1;
      return isReversed * a.city_name.localeCompare(b.city_name)
    })
    // console.log("check here what we are getting in sorted array data ######## ",JSON.stringify(sortedArray))                                                                             
    return (
      <SafeAreaView style={styles.container}>
        {this.renderHeader()}
        <ScrollView style={styles.container}>
          {/* <SearchInput
            onChangeText={(term) => { this.searchUpdated(term) }}
            style={{ height: 45, width: "97%", color: "#132C52", alignSelf: 'center', margin: scale(10), borderBottomWidth: 1, borderColor: "gray", borderRadius: scale(10), paddingStart: scale(16), fontSize: scale(14), fontFamily: appFonts.INTER_SEMI_BOLD }}
            placeholder="Search Available Routes"
            placeholderTextColor="#97ADB6"
          /> */}
          {this.renderClasses()}
          {
            sortedArray.map((singleMap, index) => {

              // console.log("yes chec k on destination list commponent  ####### ",singleMap)

              let pointsData1 = []
              let pointsData2 = []
              let pointsData = []

              pointsData1 = singleMap.points.BA
              pointsData2 = singleMap.points.SS

              pointsData = [...pointsData1, ...pointsData2]

              let economy = false
              let premium_economy = false
              let business = false
              let first = false
              if (tripType == "one_way") {
                economy = singleMap.available_classes.economy;
                premium_economy = singleMap.available_classes.premium;
                business = singleMap.available_classes.business;
                first = singleMap.available_classes.first;
              }
              else {
                const processObject = {
                  oubound: [],
                  inbound: [],
                };

                /// Code for oubound
                Object.keys(singleMap.availability.outbound).map((outboundDate) => {
                  const dateKeys = Object.keys(singleMap.availability.outbound[outboundDate]);
                  if (dateKeys.map) {
                    dateKeys.map((outboundDateKey) => {
                      const keysForTypes = Object.keys(
                        singleMap.availability.outbound[outboundDate][outboundDateKey]
                      );
                      if (!keysForTypes.length) {
                        return;
                      }
                      processObject.oubound.push(outboundDateKey);
                    });
                  }
                });

                /// Code for inbound
                Object.keys(singleMap.availability.inbound).map((inboundDate) => {
                  const dateKeys = Object.keys(singleMap.availability.inbound[inboundDate]);
                  if (dateKeys.map) {
                    dateKeys.map((inboundDateKey) => {
                      const keysForTypes = Object.keys(
                        singleMap.availability.inbound[inboundDate][inboundDateKey]
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
                premium_economy = finalResult.premium
                business = finalResult.business
                first = finalResult.first
              }
              // console.log("check her getting data ####### ",JSON.stringify(singleMap))
              return (
                <Fragment>
            {
              economy || premium_economy || business || first ?
                <TouchableOpacity onPress={() => {
                  this.props.navigation.navigate("destinationdetailscomponent", {
                    singleMap: JSON.stringify(singleMap),
                    searchData: JSON.stringify(searchData),
                    auditData: JSON.stringify(auditData),
                    WhereFrom: this.props.route.params.WhereFrom,
                    tripType: this.state.tripType,
                    sourceCode: this.state.sourceCode,
                    pointsData:pointsData,
                    destination:this.state.destination

                  })
                }} style={{ borderWidth:scale(1.5),borderStyle:"dashed",borderColor:colours.lightBlueTheme,borderRadius: scale(10), margin: scale(7), alignSelf: 'center', justifyContent: 'center', width: '94%', backgroundColor: "#ebf9fc" }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
               
                    <View style={{ margin: scale(16) }}>
                      <Text style={{ fontSize: scale(15), width: width * 0.5, borderWidth: 0, color: "#132C52", fontFamily: appFonts.INTER_SEMI_BOLD, fontWeight: Platform.OS === 'ios' ? '100' : '900' }}
                      >{singleMap.city_name}</Text>
                      <Text style={{ fontSize: scale(12), width: width * 0.5, color: "#132C52", fontFamily: appFonts.INTER_REGULAR, }}>{singleMap.country_name}</Text>
                    </View>
                
                    <View style={{ flexDirection: "row", borderWidth: 0, alignItems: "center", marginEnd: scale(10), marginStart: -scale(18) }}>
                      {
                        economy ?
                          <View style={{ backgroundColor: "#2044FF", height: scale(14), width: scale(14), borderRadius: scale(14), justifyContent: 'center', margin: scale(4), alignItems: 'center' }}>
                            <Text style={{ color: "#FFF", fontSize: scale(12), fontFamily: appFonts.INTER_SEMI_BOLD }}></Text>
                          </View>
                          : null
                      }
                      {
                        premium_economy ?
                          <View style={{ backgroundColor: "#FEA41D", height: scale(14), width: scale(14), borderRadius: scale(14), justifyContent: 'center', margin: scale(4), alignItems: 'center' }}>
                            <Text style={{ color: "#FFF", fontSize: scale(12), fontFamily: appFonts.INTER_SEMI_BOLD }}></Text>
                          </View>
                          : null
                      }
                      {
                        business ?
                          <View style={{ backgroundColor: "#A905F6", height: scale(14), width: scale(14), borderRadius: scale(14), justifyContent: 'center', margin: scale(4), alignItems: 'center' }}>
                            <Text style={{ color: "#FFF", fontSize: scale(12), fontFamily: appFonts.INTER_SEMI_BOLD }}></Text>
                          </View>
                          : null
                      }
                      {
                        first ?
                          <View style={{ backgroundColor: "#EB186F", height: scale(14), width: scale(14), borderRadius: scale(14), justifyContent: 'center', margin: scale(4), alignItems: 'center' }}>
                            <Text style={{ color: "#FFF", fontSize: scale(12), fontFamily: appFonts.INTER_SEMI_BOLD }}></Text>
                          </View>
                          : null
                      }
                      <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate("destinationdetailscomponent", {
                          singleMap: JSON.stringify(singleMap),
                          WhereFrom: this.props.route.params.WhereFrom,
                          searchData: JSON.stringify(searchData),
                          auditData: JSON.stringify(auditData),
                          tripType: this.state.tripType,
                          sourceCode: this.state.sourceCode,
                          pointsData:pointsData,
                          destination:this.state.destination
                        })
                      }}>
                        {
                              <FastImage resizeMode='contain' source={require("../../assets/common/rightArrow.png")} style={{ height: scale(20), width: scale(20), padding: scale(4), marginStart: scale(7) }} />
                        }
                          </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
                : null
          }
          </Fragment>
              )
            })
          }
        </ScrollView>
      </SafeAreaView>
    )
  }
}
