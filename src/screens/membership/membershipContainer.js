/**
 * Date: Oct 19, 2020
 * Description: Membership Screen.
 *
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import MembershipComponent from "./membershipComponent";
import {getUserConfigDetails} from '../../actions/userActions'
class MembershipContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.props.getUserConfigDetailsAction()
  }

  render() {
    return (
      <MembershipComponent
      // {...this.props}
      navigation={this.props.navigation}
      userData = {this.props.userData}
      userConfigDetails={this.props.userConfigDetails}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { userInfo } = state;
  // console.log("yes checking details on map state to props  - =  = =   = = = =",userInfo.userConfigDetails)
  return {
    userData: userInfo.userData,
    userConfigDetails:userInfo.userConfigDetails
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserConfigDetailsAction:() => dispatch(getUserConfigDetails()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MembershipContainer);
