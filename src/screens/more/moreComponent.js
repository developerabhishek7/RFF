import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Linking,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Alert,
  Platform
} from "react-native";
import ScreenHeader from "../../components/header/Header";
import styles from "./moreStyles";
import * as STRING_CONST from "../../constants/StringConst";
import scale, { verticalScale } from "../../helpers/scale";
import * as IMAGE_CONST from "../../constants/ImageConst";
import { getpolicies } from "../../utils/commonMethods";
import MyStatusBar from "../../components/statusbar";

export default class MoreComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      policyArray: getpolicies(),
    };
  }

  goToNotifications() {
    const { navigation } = this.props;
    navigation.navigate(STRING_CONST.NOTIFICATIONS_SCREEN, { fromAlertScreen: false });
  }


  renderHeader(){
    return(
      <View style={styles.moreHeaderView}>
        <View style={{marginTop:Platform.OS == "android" ? scale(16) : scale(40)}}>
        <ScreenHeader
          {...this.props}
          left
          setting
          title={STRING_CONST.MORE_TITLE}
          right
          notifCount={2}
          clickOnRight={() =>  this.props.navigation.navigate("NotificationsScreen",{
            fromAlertScreen: false,
          })}
        />
        </View>
      </View>
    )
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


  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );

  }


  renderListItem(item) {
    return (
      <View>
        <TouchableOpacity
          style={styles.descritionItemView}
          onPress={() => {
            Linking.openURL(item.link);
          }}
        >
          <Text style={styles.screenTitle}>{item.title}</Text>
          {IMAGE_CONST.CHEVRON_RIGHT}
        </TouchableOpacity>
        <View style={styles.line} />
      </View>
    );
  }
  policyList() {
    return (
      <View style={{ marginTop: verticalScale(20) }}>
        <FlatList
          data={this.state.policyArray}
          renderItem={({ item }) => {
            return this.renderListItem(item);
          }}
        />
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <MyStatusBar />
        {this.renderHeader()}
        <ScrollView style={styles.container}>
          <View style={{ marginHorizontal: scale(20) }}>
            {this.policyList()}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
