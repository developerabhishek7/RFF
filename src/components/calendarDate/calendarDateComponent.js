import React, { Component } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Platform } from "react-native";
import scale from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import styles from './styles'

class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circleType: 0,
      isOutBounded: false,
      classSelected: this.props.classSelected,
      selectedDate: this.props.selectedDate,
      availabilityData: this.props.availabilityData,
      isOffPeakValue: this.props.isOffPeakValue,
    };
  }

  getClassArray() {
    let classSelected = this.state.classSelected;
    for (i = 0; i <= classSelected; i++) {
      if (classSelected[i] && data[item]) {
        classData.push(true);
      } else {
        classData.push(false);
      }
    }
  }

  componentWillMount() {
    

    var classData = this.state.classSelected;
    var availabilityData = this.state.availabilityData;
    var availabilityArray = [];
    if (availabilityData) {
      Object.entries(availabilityData).map((item) => {
        availabilityArray.push(item[0]);
      });

      let flag = 0;
      for (let index = 0; index < classData.length; index++) {
        if (classData[index] && availabilityArray[index]) {
          flag = flag + 1;
        }
      }
      this.setState({
        circleType: flag,
      });
    }
  }
  getBackgroundColor(details) {
    var data = this.state.availabilityData;
    if (this.state.isOutBounded) {
      data = this.state.availabilityData;
    }
    if (data.peak || !this.props.isOffPeakValue) {
      return "white";
    } else {
      return "#C7E4F4";
    }
  }

  getEconomyColor(data, details, passengerCount) {
    if (data.economy && data.economy.seats >= passengerCount) {
      return colours.blue;
    } else {
      return "rgb(231,237,241)";
    }
  }
  getPremiumColor(data, details, passengerCount) {
    if (data.premium && data.premium.seats >= passengerCount) {
      return colours.yellow;
    } else {
      return "rgb(231,237,241)";
    }
  }
  getBusinessColor(data, details, passengerCount) {
    if (data.business && data.business.seats >= passengerCount) {
      return "#A905F6";
    } else {
      return "rgb(231,237,241)";
    }
  }

  getFirstColor(data, details, passengerCount) {
    if (data.first && data.first.seats >= passengerCount) {
      return "#ED1870";
    } else {
      return "rgb(231,237,241)";
    }
  }

  getFullCircelColor(details) {


    
    var data;
    var passengerCount = this.props.passengerCount;
    if (this.state.isOutBounded) {
      data = this.state.availabilityData;
    } else {
      data = this.state.availabilityData;
    }

    let classes = this.state.classSelected;
    let index = -1;
    for (i = 0; i < classes.length; i++) {
      if (classes[i] == true) {
        index = i;
      }
    }

    switch (index) {
      case 0: {
        return this.getEconomyColor(data, details, passengerCount);
      }
      case 1: {
        return this.getPremiumColor(data, details, passengerCount);
      }
      case 2: {
        return this.getBusinessColor(data, details, passengerCount);
      }
      case 3: {
        return this.getFirstColor(data, details, passengerCount);
      }
      default: {
        return "rgb(231,237,241)";
      }
    }
  }

  getQuarterCircleColor(details, index) {
    var data;
    var passengerCount = this.props.passengerCount;
    if (this.state.isOutBounded) {
      data = this.state.availabilityData;
    } else {
      data = this.state.availabilityData;
    }
    color = this.getBackgroundColor(details);

    switch (index) {
      case 1: {
        return this.getFirstColor(data, details, passengerCount);
      }
      case 2: {
        return this.getEconomyColor(data, details, passengerCount);
      }
      case 3: {
        return this.getBusinessColor(data, details, passengerCount);
      }
      case 4: {
        return this.getPremiumColor(data, details, passengerCount);
      }
    }
  }

  getHalfCircleColor(details, index) {
    var data = this.state.availabilityData;
    let classes = this.state.classSelected;
    var availabilityData = this.state.availabilityData;
    var availabilityArray = [];
    var passengerCount = this.props.passengerCount;
    if (availabilityData) {
      Object.entries(availabilityData).map((item) => {
        availabilityArray.push(item[0]);
      });
    }
    let indexArray = [];
    for (i = 0; i < classes.length; i++) {
      if (classes[i] && availabilityArray[i]) {
        indexArray.push(i);
      }
    }
    {
      switch (index) {
        case 1: {
          switch (indexArray[1]) {
            case 0: {
              return this.getEconomyColor(data, details, passengerCount);
            }
            case 1: {
              return this.getPremiumColor(data, details, passengerCount);
            }
            case 2: {
              return this.getBusinessColor(data, details, passengerCount);
            }
            case 3: {
              return this.getFirstColor(data, details, passengerCount);
            }
          }
        }
        case 2: {
          switch (indexArray[0]) {
            case 0: {
              return this.getEconomyColor(data, details, passengerCount);
            }
            case 1: {
              return this.getPremiumColor(data, details, passengerCount);
            }
            case 2: {
              return this.getBusinessColor(data, details, passengerCount);
            }
            case 3: {
              return this.getFirstColor(data, details, passengerCount);
            }
          }
        }
      }
    }
  }

  threePartCircleColor(details, index) {
    var data;
    if (this.state.isOutBounded) {
      data = this.state.availabilityData;
    } else {
      data = this.state.availabilityData;
    }
    var passengerCount = this.props.passengerCount;
    let classes = this.state.classSelected;
    let indexArray = [];
    for (i = 0; i < classes.length; i++) {
      if (classes[i] == true) {
        indexArray.push(i);
      }
    }
    switch (index) {
      case 1: {
        switch (indexArray[0]) {
          case 0: {
            return this.getEconomyColor(data, details, passengerCount);
          }
          case 1: {
            return this.getPremiumColor(data, details, passengerCount);
          }
          case 2: {
            return this.getBusinessColor(data, details, passengerCount);
          }
          case 3: {
            return this.getFirstColor(data, details, passengerCount);
          }
        }
      }
      case 2: {
        switch (indexArray[1]) {
          case 0: {
            return this.getEconomyColor(data, details, passengerCount);
          }
          case 1: {
            return this.getPremiumColor(data, details, passengerCount);
          }
          case 2: {
            return this.getBusinessColor(data, details, passengerCount);
          }
          case 3: {
            return this.getFirstColor(data, details, passengerCount);
          }
        }
      }
      case 3: {
        switch (indexArray[2]) {
          case 0: {
            return this.getEconomyColor(data, details, passengerCount);
          }
          case 1: {
            return this.getPremiumColor(data, details, passengerCount);
          }
          case 2: {
            return this.getBusinessColor(data, details, passengerCount);
          }
          case 3: {
            return this.getFirstColor(data, details, passengerCount);
          }
        }
      }
    }
  }

  halfCirclesView(date, detail) {
    let i = 0.75;
    return (
      <TouchableOpacity>
        <View
          style={styles.halfCircleContainer}
        >
          <View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  height: scale(40) * i,
                  width: scale(20) * i,
                  backgroundColor: "transparent",
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: scale(40) * i,
                    width: scale(40) * i,
                    borderRadius: scale(20) * i,
                    borderWidth: scale(2.5),
                    borderColor: this.getHalfCircleColor(detail, 1),
                  }}
                />
              </View>
              <View
                style={{
                  height: scale(40) * i,
                  width: scale(20) * i,
                  backgroundColor: "transparent",
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    height: scale(40) * i,
                    width: scale(40) * i,
                    borderRadius: scale(20) * i,
                    borderWidth: scale(2.5),
                    borderColor: this.getHalfCircleColor(detail, 2),
                  }}
                />
              </View>
            </View>
            <View
              style={{
                position: "absolute",
                left: scale(18) * i,
                height: scale(40) * i,
                width: scale(4) * i,
                backgroundColor: "white",
              }}
            />
            <View
              style={{
                position: "absolute",
                top: scale(5.5) * i,
                left: scale(5.5) * i,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: this.getBackgroundColor(detail),
                borderRadius: scale(15) * i,
                height: scale(29) * i,
                width: scale(29) * i,
              }}
            >
              <Text
                style={{
                  fontSize: scale(14) * i,
                  color: colours.darkBlueTheme,
                }}
              >
                 {this.props.day}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  threePartCirclesView(date, detail) {
    let i = 0.75;
    return (
      <TouchableOpacity>
        <View
          style={styles.threePartCircleContainer}
        >
          <View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  height: scale(22) * i,
                  width: scale(20) * i,
                  backgroundColor: "transparent",
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: scale(40) * i,
                    width: scale(40) * i,
                    borderRadius: scale(20) * i,
                    borderWidth: scale(2),
                    borderColor: this.threePartCircleColor(detail, 3),
                  }}
                />
              </View>
              <View
                style={{
                  height: scale(22) * i,
                  width: scale(20) * i,
                  backgroundColor: "transparent",
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    height: scale(40) * i,
                    width: scale(40) * i,
                    borderRadius: scale(20) * i,
                    borderWidth: scale(2),
                    borderColor: this.threePartCircleColor(detail, 1),
                  }}
                />
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  height: scale(17.3) * i,
                  width: scale(40) * i,
                  backgroundColor: "transparent",
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: scale(40) * i,
                    width: scale(40) * i,
                    borderRadius: scale(20) * i,
                    borderWidth: scale(2),
                    borderColor: this.threePartCircleColor(detail, 2),
                  }}
                />
              </View>
            </View>
            <View
              style={{
                position: "absolute",
                left: scale(18) * i,
                height: scale(3) * i,
                width: scale(4) * i,
                backgroundColor: "white",
              }}
            />
            <View
              style={{
                position: "absolute",
                height: scale(4) * i,
                top: scale(22) * i,
                width: scale(5) * i,
                backgroundColor: "white",
                transform: [{ rotate: "70deg" }],
              }}
            />
            <View
              style={{
                position: "absolute",
                height: scale(4) * i,
                top: scale(22) * i,
                left: scale(36) * i,
                width: scale(5) * i,
                backgroundColor: "white",
                transform: [{ rotate: "-70deg" }],
              }}
            />
            <View
              style={{
                position: "absolute",
                height: scale(30) * i,
                width: scale(30) * i,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: this.getBackgroundColor(detail),
                borderRadius: scale(15) * i,
                top: scale(5) * i,
                left: scale(5) * i,
              }}
            >
              <Text
                style={{
                  fontSize: scale(14) * i,
                  color: colours.darkBlueTheme,
                }}                                                                                           
              >
                {this.props.day}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  fullCircle(date, detail) {
    let i = 0.75;
    return (
      <TouchableOpacity>
        <View
          style={styles.fullCircleContainer}
        >
          <View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  height: scale(40) * i,
                  width: scale(40) * i,
                  backgroundColor: "transparent",
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: scale(40) * i,
                    width: scale(40) * i,
                    borderRadius: scale(20) * i,
                    borderWidth: scale(2.5),
                    borderColor: this.getFullCircelColor(detail),
                  }}
                />
              </View>
            </View>
            <View
              style={{
                position: "absolute",
                top: scale(5.5) * i,
                left: scale(5.5) * i,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                backgroundColor: this.getBackgroundColor(detail),
                borderRadius:
                  Platform.OS == "android" ? scale(16) * i : scale(15) * i,
                height:
                  Platform.OS == "android" ? scale(30) * i : scale(29) * i,
                width: Platform.OS == "android" ? scale(30) * i : scale(29) * i,
              }}
            >
              <Text
                style={{
                  fontSize: scale(14) * i,
                  color: colours.darkBlueTheme,
                  alignSelf: "center",
                }}
              >
                {this.props.day}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  quarterCirclesView(date, detail) {
    let i = 0.75;
    return (
      <TouchableOpacity>
        <View
          style={styles.quadCircleContainer}
        >
          <View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  height: scale(20) * i,
                  width: scale(20) * i,
                  backgroundColor: "transparent",
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: scale(40) * i,
                    width: scale(40) * i,
                    borderRadius: scale(20) * i,
                    borderWidth: scale(2.5),
                    borderColor: this.getQuarterCircleColor(detail, 1),
                  }}
                />
              </View>
              <View
                style={{
                  height: scale(20) * i,
                  width: scale(20) * i,
                  backgroundColor: "transparent",
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    height: scale(40) * i,
                    width: scale(40) * i,
                    borderRadius: scale(20) * i,
                    borderWidth: scale(2.5),
                    borderColor: this.getQuarterCircleColor(detail, 2),
                  }}
                />
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  height: scale(20) * i,
                  width: scale(20) * i,
                  backgroundColor: "transparent",
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: scale(40) * i,
                    width: scale(40) * i,
                    borderRadius: scale(20) * i,
                    borderWidth: scale(2.5),
                    borderColor: this.getQuarterCircleColor(detail, 3),
                  }}
                />
              </View>
              <View
                style={{
                  height: scale(20) * i,
                  width: scale(20) * i,
                  backgroundColor: "transparent",
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    height: scale(40) * i,
                    width: scale(40) * i,
                    borderRadius: scale(20) * i,
                    borderWidth: scale(2.5),
                    borderColor: this.getQuarterCircleColor(detail, 4),
                  }}
                />
              </View>
            </View>
            <View
              style={{
                position: "absolute",
                left: scale(18) * i,
                height: scale(40) * i,
                width: scale(4) * i,
                backgroundColor: "white",
              }}
            />
            <View
              style={{
                position: "absolute",
                top: scale(18) * i,
                height: scale(4) * i,
                width: scale(40) * i,
                backgroundColor: "white",
              }}
            />
            <View
              style={{
                position: "absolute",
                top: scale(5.5) * i,
                left: scale(5.2) * i,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: this.getBackgroundColor(detail),
                borderRadius: scale(15) * i,
                height: scale(29) * i,
                width: scale(29) * i,
              }}
            >
              <Text
                style={{
                  fontSize: scale(14) * i,
                  color: colours.darkBlueTheme,
                }}
              >
                {this.props.day}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  getAppropriateCircle() {
    if (this.state.circleType == 4) {
      return this.quarterCirclesView(this.props.children, this.props.date);
    } else if (this.state.circleType == 3) {
      return this.threePartCirclesView(this.props.children, this.props.date);
    } else if (this.state.circleType == 2) {
      return this.halfCirclesView(this.props.children, this.props.date);
    } else if (this.state.circleType == 1) {
      return this.fullCircle(this.props.children, this.props.date);
    } else {
      return (
        <TouchableOpacity>
          <Text>{this.props.day}</Text>
        </TouchableOpacity>
      );
    }
  }

  render() {
    return this.getAppropriateCircle();
  }
}

export default Day;
