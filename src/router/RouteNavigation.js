// RootNavigation.js

import { createNavigationContainerRef } from '@react-navigation/native';
import 'react-native-gesture-handler';
export const navigationRef = createNavigationContainerRef()
export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

// add other navigation functions that you need and export them