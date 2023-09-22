import React, { Component } from "react";
import styles from "./NoNetworkStyles";
import * as IMAGE_CONST from "../../constants/ImageConst";
import * as STRING_CONST from "../../constants/StringConst";
import {
    View,
    Text,
    SafeAreaView
} from "react-native";
import FastImage from 'react-native-fast-image';
import Modal from "react-native-modal";

export default class NoNetworkComponent extends Component {

    render() {
        return (
            <Modal
                presentationStyle="pageSheet"
                isVisible={true}
                style={{ margin: 0, justifyContent: "flex-end" }}>
                <View style={styles.viewContainer}>
                    <FastImage
                        style={styles.image}
                        resizeMode="contain"
                        source={IMAGE_CONST.NO_NETWORK}
                    />
                    <Text style={styles.title}>
                        {STRING_CONST.NO_NETWORK}
                    </Text>
                    <Text style={styles.description}>
                        {STRING_CONST.NO_INTERNET_MSG}
                    </Text>
                </View>
            </Modal>
        );
    }


}