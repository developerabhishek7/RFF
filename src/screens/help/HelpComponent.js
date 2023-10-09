import React, { Component } from "react";
import styles from "./HelpStyles";
import { connect } from "react-redux";
import * as IMG_CONST from "../../constants/ImageConst";
import * as STRING_CONST from "../../constants/StringConst";
import * as IMAGE_CONST from "../../constants/ImageConst";
import { colours } from "../../constants/ColorConst";
import Entypo from "react-native-vector-icons/dist/Entypo";
import {
    View,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList,
    Image,
    Platform,
} from "react-native";
import scale, { verticalScale } from "../../helpers/scale";
import FastImage from 'react-native-fast-image';
import ScreenHeader from "../../components/header/Header";
import ModalDropdown from "react-native-modal-dropdown";
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {
    getUserInfo,
    submitHelpForm,
} from "../../actions/userActions";
import MyStatusBar from "../../components/statusbar";

class HelpComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            zendeskCategory: this.props.zendeskCategory,
            email: this.props.userData.email,
            subject: "",
            description: "",
            submitPressed: false,
            imageArray: [],
            image1: {},
            image2: {},
            image3: {},
        };
    }

    componentDidMount = async () => {
        // setTimeout(() => {
        //     console.log('inside component zendesk cat res ', this.state.zendeskCategory.zendeskCategory);
        //     if(this.props.zendeskCategory){
        //         this.setState({
        //          zendeskCategory: this.props.zendeskCategory,
        //         });     
        //      }
        // }, 1000);
    }

    renderHeader() {
        return (
            <View style={{ alignItems: "center", backgroundColor: "#03B2D8", height: Platform.OS == "android" ? scale(80) : scale(100), width: "100%", marginTop: Platform.OS == "android" ? scale(-20) : scale(-60), borderBottomLeftRadius: scale(30), borderBottomRightRadius: scale(30), marginBottom: scale(0) }}>
                <View style={{ marginTop: Platform.OS == "android" ? scale(16) : scale(40) }}>
                    <ScreenHeader
                        {...this.props}
                        left
                        setting
                        title={"Help"}
                        right
                        clickOnRight={() => this.goToNotifications()}
                    />
                </View>
            </View>
        )
    }

    renderRow(rowData, rowID, highlighted) {
        return (
            <View style={{ padding: scale(15), backgroundColor: "#FFFFFF" }}>
                <Text style={{ fontSize: scale(14), color: colours.darkBlueTheme, }}>
                    {rowData}
                </Text>
            </View>
        );
    }

    addSubjectDropdown = () => {

        const { submitPressed, subject, zendeskCategory } = this.state;

        let categories = []

        if (categories) {
            categories = zendeskCategory.zendeskCategory
        }

        return (
            <View>
                <TouchableOpacity
                    style={{ marginTop: verticalScale(14) }}>

                    {subject ? (
                        <Text style={styles.textInputHeading}>{"Select Subject"}</Text>
                    ) : (
                        null
                    )}

                    <ModalDropdown
                        options={categories}
                        style={[
                            styles.textInputView,
                            {
                                marginTop: scale(5),
                                borderBottomColor: colours.borderBottomLineColor,
                            },
                        ]}
                        dropdownStyle={{
                            width: scale(312),
                            height: scale(180),
                            borderTopWidth: 0.5,
                            borderBottomWidth: 0.5,
                            marginTop: Platform.OS == "android" ? scale(-42) : scale(1),
                            elevation: 4,
                        }}
                        onSelect={(index, value) => {
                            this.setState({
                                subject: categories[index],
                            });
                        }}
                        renderRow={this.renderRow}
                    >
                        <View
                            style={[
                                styles.subjectView,
                            ]}
                        >
                            {subject ? (
                                <Text style={styles.subjectDetailText}>{subject}</Text>
                            ) : (
                                <Text style={styles.subjectText}>
                                    {"Select Subject"}
                                </Text>
                            )}

                            <FastImage source={IMG_CONST.ARROW_DOWN_PNG}
                                resizeMode="contain"
                                style={{ height: scale(16), width: scale(16), marginEnd: scale(6), marginTop: scale(4) }} />
                        </View>
                    </ModalDropdown>
                </TouchableOpacity>
                {submitPressed && !subject &&
                    <Text style={{ color: 'red' }}>{"Please select subject"}</Text>}
            </View>
        );
    }

    validateDescription(message) {
        if (message.length < 2) {
            return false;
        }
        return true;
    }

    validataForm() {
        const { subject, description, imageArray, image1, image2, image3 } = this.state;

        if (!subject) {
            return;
        } else if (!description) {
            return;
        } else {

            const data = new FormData();
            data.append('subject', subject);
            data.append('description', description);
            data.append('type', "incident");
            data.append('priority', "normal");

            if(Object.keys(image1).length > 0){
                data.append('image', {
                uri: image1.uri,
                name: image1.fileName,
                type: image1.type
                }
               );
            }
            if(Object.keys(image2).length > 0){
                data.append('image', {
                uri: image2.uri,
                name: image2.fileName,
                type: image2.type
                }
               );
            }
            if(Object.keys(image3).length > 0){
                data.append('image', {
                uri: image3.uri,
                name: image3.fileName,
                type: image3.type
                }
               );
            }

            // if(imageArray.length > 0){
            //     imageArray.forEach(imageData => {
            //         const data = new FormData();
            //         data.append('image', {
            //         uri: imageData,
            //         name: 'image.jpg',
            //         type: imageData.type
            //         }
            //        );
            //        postData['image'] = data;
            //       });
            // }

            this.props.submitHelpFormAction(data);
        }
    }

    addAttachImages() {

        return (
            <View style={styles.attachView}>

                <View style={{ flexDirection: "column" }}>

                    <Text style={styles.attachText}>
                        Do you have a screenshot?
                    </Text>

                    <Text style={styles.textBelowAttach}>
                        (Max 3 allowed)
                    </Text>

                </View>

                <TouchableOpacity style={styles.attachButton}
                    activeOpacity={.6}
                    onPress={this.chooseFile.bind(this)}
                >
                    <Icon name="plus" size={16} color="#FFFFFF" />
                    <Text style={styles.buttonTextStyle}>Attach</Text>
                </TouchableOpacity>

            </View>
        );

    }

    renderSubmitButton() {
        return (

            <TouchableOpacity
                style={[styles.buttonStyle, { backgroundColor: colours.lightBlueTheme }]}
                activeOpacity={.6}
                onPress={() => {
                    this.setState({
                        submitPressed: true,
                    });
                    this.validataForm()
                }}>
                <Text style={styles.buttonTextStyle}>Submit</Text>
            </TouchableOpacity>
        );
    }

    chooseFile = () => {

        const  {image1, image2, image3} = this.state;

        if (this.state.imageArray.length < 3) {

            var options = {
                imageFileType: 'png',
                title: "Select Image",
                storageOptions: {
                    skipBackup: true,
                    path: "images",
                },
            };
            launchImageLibrary(options, (response) => {
                if (response.didCancel) {
                } else if (response.error) {
                } else if (response.customButton) {
                    if (response.customButton == "View") {
                        this.Show_Custom_Alert2()
                    }
                    else {
                        this.props.deleteProfileImageAction();
                    }
                } else {
                    let url = response.assets[0].uri
                    let fileName = response.assets[0].fileName
                    let type = response.assets[0].type
                    
                    if(Object.keys(image1).length === 0){
                        this.setState({
                            image1: {
                                uri: url,
                                fileName: fileName,
                                type: type,
                              }
                        });

                    }else if(Object.keys(image2).length === 0){
                        this.setState({
                            image2: {
                                uri: url,
                                fileName: fileName,
                                type: type,
                              }
                        });
                    }else if(Object.keys(image3).length === 0){
                        this.setState({
                            image3: {
                                uri: url,
                                fileName: fileName,
                                type: type,
                              }
                        });
                    }

                    console.log('image 1 ', image1.uri)
                    console.log('image 2 ', image2.uri)
                    console.log('image 3 ', image2.uri)
                    this.setState((prevState) => ({
                        imageArray: [...prevState.imageArray, response.assets[0].uri],
                    }));
                }
            });
        } else {
        }
    };

    renderItem = ({ item, index }) => (
        <View style={styles.imageContainer}>
            <Image source={{ uri: item }} style={styles.image} />
            <TouchableOpacity
                style={styles.deleteIcon}
                onPress={() => this.deleteImage(index)}>
                <Entypo name="cross" size={scale(16)} color={colours.redColor} />
            </TouchableOpacity>
        </View>
    );

    deleteImage = (index) => {
        const { imageArray, image1, image2, image3 } = this.state;

        if(!image1 && (imageArray[index] == image1.uri)){
            this.setState({
                image1: {} 
            });
        }
        if(!image2 && (imageArray[index] == image2.uri)){
            this.setState({
                image2: {} 
            });
        }
        if(!image3 && (imageArray[index] == image3.uri)){
            this.setState({
                image3: {} 
            });
        }

        imageArray.splice(index, 1);
        this.setState({ imageArray: [...imageArray] });
    };

    renderImageList() {
        const { imageArray } = this.state;
        return (
            <View style={styles.listView}>
                <FlatList
                    data={imageArray}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderItem}
                    horizontal={true}
                />
            </View>
        );
    }

    render() {
        const { email, description, submitPressed, zendeskCategory } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <MyStatusBar />
                {this.renderHeader()}
                <ScrollView style={styles.container}>
                    <View style={{ marginHorizontal: scale(32) }}>
                        {
                            email &&
                            <Text style={styles.title}>
                                {email}
                            </Text>
                        }
                        {this.addSubjectDropdown()}
                        <Text style={styles.textInputHeading}>
                            Message about the issue
                        </Text>
                        <View
                            style={styles.textInputMessageView}
                        >
                            <TextInput
                                style={styles.textInput}
                                placeholder="Tell us a bit more about your issue"
                                multiline={true}
                                textAlign="justify"
                                onChangeText={(message) => {
                                    this.setState({ description: message });
                                }}
                                value={description}
                                underlineColorAndroid='transparent'
                            />
                        </View>
                        {submitPressed && !description &&
                            <Text style={{ color: 'red' }}>{"Please enter message"}</Text>}
                        {this.addAttachImages()}
                        {this.renderImageList()}
                        {this.renderSubmitButton()}
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    const { userInfo } = state;
    return {
        userData: userInfo.userData,
        zendeskCategory: userInfo.zendeskCategory
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfoAction: () => dispatch(getUserInfo()),
        submitHelpFormAction: (postData) => dispatch(submitHelpForm(postData)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HelpComponent);