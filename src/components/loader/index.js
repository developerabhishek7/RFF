import React, {Component} from 'react';
import {
    View,
    Image
} from 'react-native';
import appStyle from 'app_style'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as IMAGE_CONST from "../../constants/ImageConst";
import scale, { verticalScale } from '../../helpers/scale';
import { colours } from '../../constants/ColorConst';
import FastImage from 'react-native-fast-image'

class TransLoader extends Component {
    constructor(props) {
      super(props);
    }
    render() {
        if (!this.props.isLoading) {
          return null;
        } else {
            return (
                <View style={appStyle.loaderContainer}>
                  <View style={{height:verticalScale(130), width:verticalScale(130), backgroundColor:colours.white, justifyContent:'center', alignItems:'center', borderRadius:verticalScale(10), overflow:'hidden'}}>
                    <FastImage source= {IMAGE_CONST.LOADER} style={{height:verticalScale(200), width:verticalScale(200)}} />
                  </View>
                </View>
            );
        }
      }
}
  
  const mapStateToProps = (state) => {
    const { common } = state;
    return {
      isLoading: common.isLoading,
    };
  };
  
  TransLoader.propTypes = {
    isLoading: PropTypes.bool,
  };
  export default connect(mapStateToProps)(TransLoader);

