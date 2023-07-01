import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colours } from '../../constants/ColorConst';
import scale,{verticalScale} from '../../helpers/scale';
const { height, width } = Dimensions.get('window');
import * as STR_CONST from '../../constants/StringConst';

export default StyleSheet.create({
      loaderContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: colours.transBlackColor,
        alignItems: 'center',
        justifyContent: 'center'
      },
});
