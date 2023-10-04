import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  ScrollView
} from "react-native";
import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");
import styles from "./calenderStyles";
import * as IMG_CONST from "../../constants/ImageConst";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import { CalendarList,LocaleConfig } from "react-native-calendars";
import moment from "moment";
import { getCalendarLocals } from "../../utils/commonMethods";
import * as STRING_CONST from "../../constants/StringConst";
import FastImage from 'react-native-fast-image'
import * as IMAGE_CONST from "../../constants/ImageConst";
import MyStatusBar from "../../components/statusbar";

export default class CalenderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      startDate: null,
      endDate: null,
      dateData: {},
    };
    getCalendarLocals()
    LocaleConfig.defaultLocale = "us";
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
    }
  }

  componentDidMount() {
    const {
      selectedStartDate,
      selectedEndDate,
    } = this.props.route.params;
    this.setDateRange(selectedStartDate, selectedEndDate);
    this.setState({
      startDate: selectedStartDate,
      endDate: selectedEndDate,
    });
  }

  setDateRange(selectedStartDate, selectedEndDate) {
    let difference = moment(selectedEndDate).diff(
      moment(selectedStartDate),
      "day"
    );
    let endData = {};
    if (difference > 0) {
      for (let i = 0; i <= difference; i++) {
        let currentDate = moment(selectedStartDate)
          .add(i, "days")
          .format("YYYY-MM-DD");
        endData[currentDate] = {
          startingDay: i == 0,
          endingDay: i == difference,
          color:
            i == 0 || i == difference
              ? colours.darkBlueTheme
              : colours.dimLightBlueBackgroundColor,
          textColor:
            i == 0 || i == difference ? colours.white : colours.darkBlueTheme,
        };
      }
      this.setState({
        endDate: selectedEndDate,
        dateData: endData,
      });
    } else if (difference < 0) {
      let startData = {};
      startData[selectedEndDate] = {
        startingDay: true,
        endingDay: false,
        color: colours.darkBlueTheme,
        textColor: colours.white,
        endDate: endDate,
      };
      let endDate = this.state.startDate;
      this.setState({
        startDate: selectedEndDate,
        endDate: endDate,
        dateData: startData,
      });

      let newDifference = moment(endDate).diff(moment(selectedEndDate), "day");
      for (let i = 0; i <= newDifference; i++) {
        let currentDate = moment(selectedEndDate)
          .add(i, "days")
          .format("YYYY-MM-DD");
        endData[currentDate] = {
          startingDay: i == 0,
          endingDay: i == newDifference,
          color:
            i == 0 || i == newDifference
              ? colours.darkBlueTheme
              : colours.dimLightBlueBackgroundColor,
          textColor:
            i == 0 || i == newDifference
              ? colours.white
              : colours.darkBlueTheme,
        };
      }
      this.setState({
        dateData: endData,
      });
    } else {
      endData[selectedEndDate] = {
        startingDay: true,
        endingDay: true,
        color: colours.darkBlueTheme,
        textColor: colours.white,
      };
      this.setState({
        endDate: selectedEndDate,
        dateData: endData,
      });
    }
  }

  // renderHeader() {
  //   return (
  //     <View>
  //       <TouchableOpacity
  //         onPress={() => {
  //           this.props.navigation.goBack();
  //         }}
  //         style={styles.createCalendarHeader}
  //       >
  //         <Image
  //           style={{
  //             justifyContent: "flex-end",
  //            height:scale(18),  width:scale(18) 
  //           }}
  //           source={IMG_CONST.DARK_BLUE_CROSS_ICON}
  //         />
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }


  renderHeader() {
    const headingText = this.props.route.params.headingText;

    return (
     <View style={{backgroundColor:"#03B2D8",height:Platform.OS =="android" ? scale(80) : scale(110),borderBottomLeftRadius:scale(30),borderBottomRightRadius:scale(30),width:"100%",marginTop:Platform.OS == "android" ? scale(-20) :scale(-60) }}>
        <View style={{justifyContent:"space-between",width:"94%",flexDirection:"row",marginTop:Platform.OS == "android"? scale(20): scale(50)}}>
        <TouchableOpacity style={{paddingStart:scale(20),marginTop:Platform.OS == "android" ? scale(8) : scale(1)}} onPress={() => {
              this.props.navigation.goBack()}}>
                {IMAGE_CONST.IOS_BACK_ARROW}
            </TouchableOpacity>
            <Text style={{fontSize:scale(20),fontWeight:"700",padding:scale(10),paddingStart:scale(-10),color:"#FFF"}}>{headingText}</Text>
                <Text>     </Text>
           </View>
           {/* <View style={{marginTop:scale(20),backgroundColor:"#42c5e2",width:scale(330),alignSelf:"center",flexDirection:"row",borderWidth:0,borderRadius:scale(10)}}>
              <TextInput 
                 onChangeText={(searchText) => {
                  this.onSearch(searchText)
                }}
              style={{height:scale(40),paddingStart:scale(10),color:"#FFF",width:scale(280),borderRadius:scale(10),fontWeight:"700"}}  />
              <TouchableOpacity style={{backgroundColor:"#FFF",width:scale(42),borderEndEndRadius:scale(10),borderTopRightRadius:scale(10),marginStart:scale(10),borderBottomEndRadius:scale(10),alignSelf:"flex-end"}}>
              <FastImage source={require("../../assets/findFlight/search.png")} resizeMode="contain" style={{height:scale(25),width:scale(25),margin:scale(10)}} />
              </TouchableOpacity>
           </View> */}
  
  
  
  
  
     </View>
    );
  }
  
  renderHeading() {
    const headingText = this.props.route.params.headingText;
    return (
      <View>
        <View style={styles.headingContainerStyle}>
          <FastImage
            source={IMG_CONST.DARK_BLUE_TAKE_OFF}
            style={styles.takeOffIcon}
          />
          <Text style={styles.headingTextStyle}>{headingText}</Text>
        </View>
        <View style={styles.borderView}>
          <View style={styles.greyBorderStyle} />
          <View style={styles.darkBorderStyle} />
          <View style={styles.greyBorderStyle} />
        </View>
      </View>
    );
  }
  renderBottomButton() {
    return (
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          if (this.state.startDate) {
            this.props.route.params.onSelectPress(
              this.state.startDate,
              this.state.endDate
            );
            this.props.navigation.goBack();
          } else {
            alert(STRING_CONST.CHOOSE_DATE);
          }
        }}
        activeOpacity={.6}
      >
        <Text style={styles.buttonTextStyle}>{STRING_CONST.SELECT_TEXT}</Text>
      </TouchableOpacity>
    );
  }
  onDateSelect(day) {
    let date = day.dateString;
    const { startDate, endDate, dateData } = this.state;
    let difference = moment(startDate).diff(moment(date), "day");
    let differenceAfter = moment(endDate).diff(moment(date), "day");
    if (!startDate) {
      let startData = {};
      startData[date] = {
        startingDay: true,
        endingDay: false,
        color: colours.darkBlueTheme,
        textColor: colours.white,
        endDate: endDate,
      };
      this.setState({
        startDate: date,
        endDate: date,
        dateData: startData,
      });
    } else if (
      startDate &&
      endDate &&
      startDate !== endDate &&
      difference < 0 &&
      differenceAfter > 0
    ) {
      let startData = {};
      startData[date] = {
        startingDay: true,
        endingDay: true,
        color: colours.darkBlueTheme,
        textColor: colours.white,
      };
      this.setState({
        startDate: date,
        endDate: date,
        dateData: startData,
      });
    } else if (endDate == date) {
      let startData = {};
      startData[date] = {
        startingDay: true,
        endingDay: true,
        color: colours.darkBlueTheme,
        textColor: colours.white,
      };
      this.setState({
        startDate: date,
        endDate: date,
        dateData: startData,
      });
    } else {
      let showDateRange = this.props.route.params.showDateRange;
      if (showDateRange) {
        this.setDateRange(startDate, date);
      } else {
        let startData = {};
        startData[date] = {
          startingDay: true,
          endingDay: true,
          color: colours.darkBlueTheme,
          textColor: colours.white,
        };
        this.setState({
          startDate: date,
          endDate: date,
          dateData: startData,
        });
      }
    }
  }
  onSingleDateSelect(day) {
    let date = day.dateString ? day.dateString : day;
    let startData = {};
    startData[date] = {
      startingDay: true,
      endingDay: true,
      color: colours.darkBlueTheme,
      textColor: colours.white,
    };
    this.setState({
      startDate: date,
      endDate: date,
      dateData: startData,
    });
  }

  render() {
    const today = moment().format("YYYY-MM-DD");
    return (
      <SafeAreaView style={styles.container}>
         <MyStatusBar />
         {this.renderHeader()}
         <View style={{backgroundColor:"#84D4E5",alignSelf:"center",height:scale(5),borderTopLeftRadius:scale(7),borderTopRightRadius:scale(7),width:scale(120),marginTop:scale(-7)}} />
        <View style={styles.createAlertContainer}>
          <View style={{ flex: 1,}}>
            {/* {this.renderHeading()} */}
            <ScrollView showsVerticalScrollIndicator={false} >
            <View
              style={[
                styles.calendarContainer,
                { paddingHorizontal: scale(0) },
              ]}
              onStartShouldSetResponder={() => true}
            >
              <CalendarList
                ref={(ref) => {
                  this._refCalendarList = ref;
                }}
                  calendarStyle={[styles.calendarStyle,{
                    borderWidth:1,
                    borderColor:"#E4E4E4",
                  }]}
                markedDates={this.state.dateData}
                markingType={"period"}
                showDateRange={this.props.route.params.showDateRange}
                onVisibleMonthsChange={(months) => {}}
                onDayPress={(day) => {
                  let showDateRange = this.props.route.params
                    .showDateRange;
                  showDateRange
                    ? this.onDateSelect(day)
                    : this.onSingleDateSelect(day);
                }}
                minDate={
                  this.props.route.params.minDate &&
                  this.props.route.params.minDate !== ""
                    ? this.props.route.params.minDate
                    : today
                }
                pastScrollRange={0}
                futureScrollRange={12}
                scrollEnabled={true}
                showScrollIndicator={false}
                calendarWidth={scale(330)}
                calendarHeight={verticalScale(350)}
                horizontal={false}
                theme={{
                  classSelected: [],
                  availabilityData: {},
                  isOutBounded: this.state.selectedIndex == 0,
                  width: width - scale(30),
                  textSectionTitleColor: colours.lightGreyish,
                  selectedDayTextColor: colours.white,
                  todayTextColor: colours.lightBlueTheme,
                  dayTextColor: colours.darkBlueTheme,
                  textDisabledColor: colours.lightGreyish,
                  selectedDotColor: colours.white,
                  monthTextColor: colours.lightBlueTheme,
                  textDayFontWeight: "500",
                  textMonthFontWeight: "bold",
                  textDayHeaderFontWeight: "300",
                  textDayFontSize: scale(16),
                  textMonthFontSize: scale(16),
                  textDayHeaderFontSize: scale(16),
                  "stylesheet.calendar.header": {
                    header: styles.alertCalendarHeader,
                    monthText: styles.alertCalendarMonthText,
                    dayText: {
                      fontWeight: "100",
                    },
                  },
                }}
                listFooterComponent={() => {
                  return <View style={{ height: verticalScale(70) }} />;
                }}
              />
            </View>
            </ScrollView>
          </View>
          {
            this.state.startDate && 
            <Fragment>
                  {this.renderBottomButton()}
            </Fragment>
          }
          
        </View>
      </SafeAreaView>
    );
  }
}
