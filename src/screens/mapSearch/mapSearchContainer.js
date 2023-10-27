/**
 * Date: July 08, 2020
 * Description: Map Search Screen.
 *
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import MapSearchComponent from "./mapSearchComponent";
import {
  getAvailableDestinations,
  resetData,
} from "../../actions/mapSearchActions";
import { getAirlinesAvailability,getPointsAvailability, getSeatsAvailability } from "../../actions/calendarActions";

import {updateGuestUserPostHog,updateLoggedInUserPostHog,getUserConfigDetails} from '../../actions/userActions'
import { Alert } from "react-native";
class MapSearchContainer extends Component {
  constructor(props) {
    super(props);    
    this.state = {
      userInfo: this.props.userInfo,
      airLinesMembershipDetailsObject: this.props.airlinesMembershipDetails,
      airlinesPossileRoutesList: this.props.airlinesPossileRoutes,
      locationsObject: this.props.locations,
      searchData: {},
      mapSearchData: {},
      auditData: {},
      WhereFrom:"",
    };
  }
  componentDidMount() {  
    this.props.getUserConfigDetailsAction()
   }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (
        this.props.airlinesMembershipDetails &&
        this.props.airlinesMembershipDetails !==
          prevProps.airlinesMembershipDetails
      ) {
        this.setState({
          airLinesMembershipDetailsObject: this.props.airlinesMembershipDetails,
        });
      }
      if (
        this.props.airlinesPossileRoutes &&
        this.props.airlinesPossileRoutes !== prevProps.airlinesPossileRoutes
      ) {
        this.setState({
          airlinesPossileRoutesList: this.props.airlinesPossileRoutes,
        });
      }
      if (
        this.props.locations &&
        this.props.locations !== prevProps.locations
      ) {
        this.setState({
          locationsObject: this.props.locations,
        });
      }
      if (
        this.props.availableDestinations &&
        this.props.availableDestinations !== prevProps.availableDestinations
      ) {


        console.log("yes check here getting on map search screen  -  - - - - -  ",)
        this.props.navigation.navigate("MapComponentScreen", {
          destinations: this.props.availableDestinations.available_destinations,       
          searchData: this.state.searchData,
          auditData: this.state.auditData,
          WhereFrom:this.state.WhereFrom
        });
      } else if (
        this.props.availableDestinationsError &&
        this.props.availableDestinationsError !==
          prevProps.availableDestinationsError
      ) {
        if (this.state.searchData.passengerCount > 6) {
          console.log("yes check here getting on map 111111111    search screen  -  - - - - -  ",)

          this.props.navigation.navigate("MapComponentScreen", {
            destinations: [],
            searchData: this.state.searchData,
            auditData: this.state.auditData,
            WhereFrom:this.state.WhereFrom
          });
        } else {
          Alert.alert(this.props.availableDestinationsError);
        }
        this.props.resetDataAction();
      }
      if (
        this.props.airlinesDetail &&
        this.props.airlinesDetail !== prevProps.airlinesDetail
      ) {
        this.props.navigation.navigate("CalenderContainerScreen", {
          mapSearchData: this.state.mapSearchData,
        });
      }
    }
  }

  render() {
    return (
      <MapSearchComponent
        userInfo={this.props.userInfo}
        airLinesMembershipDetailsObject={
          this.state.airLinesMembershipDetailsObject
        }
        airlinesPossileRoutesList={this.state.airlinesPossileRoutesList}
        locationsObject={this.state.locationsObject}
        navigation={this.props.navigation}        
        onSearchPressed={(searchData, auditData,WhereFrom) => {            
          this.setState({
            searchData: searchData,
            auditData: auditData,
            WhereFrom:WhereFrom
          });             
          this.props.getAvailableDestinationsAction(searchData);
        }}
        userConfigDetails={this.props.userConfigDetails}
        onPinPressed={(mapSearchData, auditData) => {
          this.setState({
            mapSearchData: mapSearchData,
            auditData: auditData,
          });
          this.props.getAirlinesAvailabilityAction(mapSearchData);
          this.props.getSeatsAvailabilityAction(mapSearchData);
        }}
        // guestUserPostHogFunc = {(guestUserPostHog)=>{this.props.updateGuestUserPostHogAction(guestUserPostHog)}}
        // loggedinUserPostHogFun = {(loggedInUserPostHog)=>{this.props.updateLoggedInUserPostHogAction(loggedInUserPostHog)}}
        isLoggedIn={this.props.isLoggedIn}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { findFlight, mapSearch, userInfo, logIn ,mapKeyReducer} = state; 
    return {
    userInfo: userInfo.userData,
    airlinesMembershipDetails: findFlight.airlinesMembershipDetails,
    locations: findFlight.locations,
    airlinesPossileRoutes: findFlight.airlinesPossileRoutes,
    availableDestinations: mapSearch.availableDestinations,
    availableDestinationsError: mapSearch.availableDestinationsError,
    isLoggedIn: logIn.isLoggedIn,
    userConfigDetails:userInfo.userConfigDetails
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAvailableDestinationsAction: (searchData) =>
      dispatch(getAvailableDestinations(searchData)),
      // updateGuestUserPostHogAction: (guestUserPostHog) => dispatch(updateGuestUserPostHog(guestUserPostHog)),
      // updateLoggedInUserPostHogAction: (loggedInUserPostHog) => dispatch(updateLoggedInUserPostHog(loggedInUserPostHog)),
      getPointsAvailabilityAction:(searchData)=>dispatch(getPointsAvailability(searchData)),
      getAirlinesAvailabilityAction: (mapSearchData) =>
      dispatch(getAirlinesAvailability(mapSearchData, "MAP")),
      getSeatsAvailabilityAction: (mapSearchData) =>
      dispatch(getSeatsAvailability(mapSearchData, "MAP")),
    resetDataAction: (searchData) => dispatch(resetData(searchData)),
    getUserConfigDetailsAction:() => dispatch(getUserConfigDetails()),

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MapSearchContainer);
