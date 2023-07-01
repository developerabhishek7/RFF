import * as React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { HeaderButtons, HeaderButton } from "react-navigation-header-buttons";
import {colours} from '../constants/ColorConst'

const MaterialHeaderButton = props => (
  <HeaderButton
    {...props}
    IconComponent={MaterialIcons}
    iconSize={23}
    color={colours.white}
  />
);

export const MaterialHeaderButtons = props => (
  <HeaderButtons
    HeaderButtonComponent={MaterialHeaderButton}
    OverflowIcon={<MaterialIcons name="more-vert" size={23} color={colours.white} />}
    {...props}
  />
);

export { Item } from "react-navigation-header-buttons";
