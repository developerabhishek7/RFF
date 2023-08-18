import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  BackHandler,
  Platform
} from "react-native";
import PropTypes from "prop-types";
import styles from "./NotificationsStyles";
import ScreenHeader from "../../components/header/Header";
import * as STRING_CONST from "../../constants/StringConst";
import * as IMAGE_CONST from "../../constants/ImageConst";
import Utils from "../../utils/commonMethods";
import scale from "../../helpers/scale";
import moment from "moment";
import FastImage from 'react-native-fast-image'

export default class NotificationsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currnetNotiPage: 1,
      notificationList: this.props.notificationList
    };
    this.onEndReachedCalledDuringMomentum = true;
  }

  componentDidMount() {

    BackHandler.addEventListener('hardwareBackPress', () =>
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


  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
  }




  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.notificationList !== prevProps.notificationList) {
        this.setState({
          notificationList: this.props.notificationList
        })
      }
      if (this.props.alertNotifications !== prevProps.alertNotifications) {
        this.setState({
          notificationList: this.props.alertNotifications
        })
      }
    }
  }

  /**
   * Added Pull to refresh functionality
   */
  onRefresh() {
    this.setState(
      {
        currnetNotiPage: 1
      },
      () => {
        this.props.resetNotificationDataAction();
        this.props.onRefresh();
      }
    );
  }

  /**
   * To call api for more data
   */
  handleLoadMore = () => {
    if (this.state.currnetNotiPage < this.props.totalPages && !this.onEndReachedCalledDuringMomentum // Check for page exist or not
    ) {
      this.onEndReachedCalledDuringMomentum = true;
      this.setState({ currnetNotiPage: this.state.currnetNotiPage + 1 }, () => {
        this.props.callGetNotifications(this.state.currnetNotiPage);
      });
    }
  };

  goToNotifDetail(notifData, index) {
    // Mark Notification to read if its Unread !notifData.unread
    if (notifData.unread) {
      const { notificationList } = this.state

      this.props.markNotificationRead(notifData);
      notifData.unread = false
      notificationList[index] = notifData
      this.setState({
        notificationList: notificationList
      })
    }
    this.props.navigation.navigate(STRING_CONST.NOTIFICATION_DETAIL_SCREEN, {
      notifData, notification_id: notifData.id
    });
  }

  // eslint-disable-next-line react/sort-comp
  renderCell({ item, index }) {
    let messageData = "";
    if (item.message && item.message.length > 75) {
      messageData = `${item.message.slice(0, 75)}... `;
    } else {
      messageData = `${item.message} `;
    }

    let date = item.created_at
    let actualDate =  moment(date).format("DD-MM-YYYY : HH:mm")

    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <TouchableOpacity
        style={[styles.cellContainer]}
        activeOpacity={0.6}
        onPress={() => this.goToNotifDetail(item, index)}
      >
        <View style={{flexDirection:"row",justifyContent:"space-around",borderWidth:0,width:scale(340)}}>
            <FastImage source={IMAGE_CONST.LOGO_ICON} style={{width:scale(40),height:scale(40)}} resizeMode="contain" />
            <Text style={[styles.notifTitle, { opacity: !item.unread ? 1 : 0.6 }]}>
          {item.title}
        </Text>
        </View>
        <Text style={[styles.notifDate, { opacity: !item.unread ? 1 : 0.6 }]}>
          {/* {Utils.getDateFormate(item.created_at)} */}
          {actualDate}
        </Text>
        <View style={styles.line} />
      </TouchableOpacity>
    );
  }

  _renderNotif(notifications) {

    return (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={notifications}
        renderItem={item => this.renderCell(item)}
        extraData={this.state}
        onRefresh={() => this.onRefresh()}
        refreshing={false}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0.1}
        onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
      />
    );
  }

  /**
   * Custom Header for Notifications screen
   */
  // renderHeader() {
  //   return (
  //     <View style={{ marginHorizontal: scale(15) }}>
  //       <ScreenHeader
  //         {...this.props}
  //         left
  //         title={STRING_CONST.NOTIFICATONS_SCREEN_TITLE}
  //         clickOnRight={() => this.goToNotifications()}
  //         clickOnLeft={() => {
  //           this.props.navigation.goBack();
  //           this.props.resetNotificationDataAction();
  //         }}
  //       />
  //     </View>
  //   );
  // }


  renderHeader(){
    return(
      <View style={{alignItems:"center",backgroundColor:"#03B2D8",height:scale(110),width:"100%",marginTop:Platform.OS == "ios" ?  scale(-60) : scale(-20),borderBottomLeftRadius:scale(30),borderBottomRightRadius:scale(30),marginBottom:scale(20)}}>
        <View style={{marginTop:scale(30)}}>
        <ScreenHeader
          {...this.props}
          left
          title={STRING_CONST.NOTIFICATONS_SCREEN_TITLE}
          clickOnRight={() => this.goToNotifications()}
          clickOnLeft={() => {
            this.props.navigation.goBack();
            this.props.resetNotificationDataAction();
          }}
        />
        </View>
      </View>
    )
  }

  /**
   * rendeEmptyListView for showing a message when no data available
   */
  // eslint-disable-next-line class-methods-use-this
  rendeEmptyListView() {
    const isAlreadyRead = false;
    return (
      <View style={styles.emptyViewContainer}>
        <FastImage
          style={styles.emptyImage}
          source={IMAGE_CONST.NO_NOTIFICATION_IMAGE}
        />
        <Text style={styles.emptyTitle}>
          {STRING_CONST.NO_NOTIFICATION_YET}
        </Text>
        <Text style={styles.emptyDiscription}>
          {STRING_CONST.NO_NOTIFICATION_DESCI}
        </Text>
      </View>
    );
  }

  render() {
    const { notificationList } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {this.renderHeader()}
        {notificationList && notificationList.length > 0
          ? this._renderNotif(notificationList)
          : this.rendeEmptyListView()}
      </SafeAreaView>
    );
  }
}

NotificationsComponent.propTypes = {
  navigation: PropTypes.object.isRequired
};
