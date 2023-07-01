import React, { Component } from "react";
import { connect } from "react-redux";

import OnboardingComponent from "./onBoardingComponent";

class OnboardingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({ navigation }) => ({
    header: null,
  });

  render() {
    return <OnboardingComponent {...this.props} />;
  }
}

export default connect(null, null)(OnboardingContainer);
