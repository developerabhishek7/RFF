import React from "react";
import {
  View,
  Modal,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import styles from "./manageContactDetailsStyles";
import BaseComponent from "./baseComponent";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
const { height, width } = Dimensions.get("window");

let componentIndex = 0;

export default class ModalPicker extends BaseComponent {
  constructor() {
    super();

    this._bind("onChange", "close", "renderChildren");

    this.state = {
      animationType: "slide",
      modalVisible: true,
      transparent: false,
      selected: "please select",
      data: [],
      searchText: "",
      searchedList: [],
    };
  }

  componentDidMount() {
    this.setState({ selected: this.props.initValue });
    this.setState({ cancelText: this.props.cancelText });
    this.setState({ data: this.props.data, searchedList: this.props.data });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({ data: this.props.data });
    }
  }

  onChange(item) {
    this.props.onChange(item);
    this.setState({ selected: item.label });
    this.close();
  }

  close() {
    this.setState({
      modalVisible: false,
    });
  }

  renderSection(section) {
    return (
      <View
        key={section.key}
        style={[styles.sectionStyle, this.props.sectionStyle]}
      >
        <Text style={[styles.sectionTextStyle, this.props.sectionTextStyle]}>
          {section.label}
        </Text>
      </View>
    );
  }

  renderOption(option) {
    return (
      <TouchableOpacity key={option.key} onPress={() => this.onChange(option)}>
        <View style={styles.optionStyle}>
          <View style={{ flex: 0.15 }}>
            <Image
              source={option.image}
              resizeMode="stretch"
              style={{ width: scale(30), height: verticalScale(16) }}
            />
          </View>
          <View style={{ flex: 0.7, alignItems: "center" }}>
            <Text style={[styles.optionTextStyle]}>{option.label}</Text>
          </View>
          <View style={{ flex: 0.15, alignItems: "flex-end" }}>
            <Text style={[styles.optionTextStyle, { fontSize: scale(12) }]}>
              {option.dialCode}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  onSearch(searchText) {
    let data = [];
    let searchedList = this.state.data.filter((item) => {
      data = `${item.label.toLowerCase()}${item.dialCode}`;
      return data.includes(searchText.toLowerCase());
    });
    this.setState({ searchedList });
  }

  renderOptionList() {
    const options = this.state.searchedList.map((item) => {
      if (item.section) {
        return this.renderSection(item);
      }
      return this.renderOption(item);
    });

    return (
      <View
        style={[styles.overlayStyle, this.props.overlayStyle]}
        key={`modalPicker${componentIndex++}`}
      >
        <View style={styles.optionContainer}>
          <ScrollView keyboardShouldPersistTaps="always">
            <View style={{ paddingHorizontal: scale(10) }}>{options}</View>
          </ScrollView>
        </View>
        <View style={styles.cancelContainer}>
          <TouchableOpacity
            onPress={() => {
              this.props.onCancel();
            }}
          >
            <View style={[styles.cancelStyle, this.props.cancelStyle]}>
              <Text
                style={[styles.cancelTextStyle, this.props.cancelTextStyle]}
              >
                {this.props.cancelText}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderChildren() {
    if (this.props.children) {
      return this.props.children;
    }
  }

  render() {
    const dp = (
      <Modal
        ref={(ref) => {
          this.modal = ref;
        }}
        visible={true}
        onRequestClose={this.close}
        animationType={this.state.animationType}
        style={{ backgroundColor: colours.white }}
      >
        {
          <View style={styles.searchTextInput}>
            <TextInput
            underlineColorAndroid="transparent"
              style={[{ paddingHorizontal: scale(10), fontSize: scale(18) }]}
              placeholder="Search"
              autoCapitalize="none"
              onChangeText={(searchText) => {
                this.setState({ searchText });
                this.onSearch(searchText);
              }}
              value={this.state.searchText}
              returnKeyType="done"
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
            />
          </View>
        }
        {this.renderOptionList()}
      </Modal>
    );

    return (
      <View style={this.props.style}>
        {dp}

        <TouchableOpacity onPress={this.open}>
          {this.renderChildren()}
        </TouchableOpacity>
      </View>
    );
  }
}
