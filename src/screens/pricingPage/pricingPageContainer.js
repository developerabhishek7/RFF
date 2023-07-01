/**
 * Date: Oct 19, 2020
 * Description: Pricing Screen.
 *
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import PricingPageComponent from "./pricingPageComponent";
import {
  updateGuestUserPostHog,updateLoggedInUserPostHog
} from "../../actions/userActions";
class PricingPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <PricingPageComponent 
                {...this.props}
                guestUserPostHogFunc = {(guestUserPostHog)=>{this.props.updateGuestUserPostHogAction(guestUserPostHog)}}
                loggedinUserPostHogFun = {(loggedInUserPostHog)=>{this.props.updateLoggedInUserPostHogAction(loggedInUserPostHog)}}

            />
        }
} 
const mapStateToProps = (state) => {
  const { userInfo, logIn, subscription } = state;

  // console.log("check here subscription  -----------------  ",subscription)
  return {
    userData: userInfo.userData,
    isLoggedIn: logIn.isLoggedIn,
    plansArray: subscription.plansArray,
  };
};
 
const mapDispatchToProps = (dispatch) => {
  return {
   updateGuestUserPostHogAction: (guestUserPostHog) => dispatch(updateGuestUserPostHog(guestUserPostHog)),
   updateLoggedInUserPostHogAction: (loggedInUserPostHog) => dispatch(updateLoggedInUserPostHog(loggedInUserPostHog)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PricingPageContainer);
