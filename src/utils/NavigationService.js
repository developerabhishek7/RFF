// import { CommonActions, SwitchActions, StackActions } from 'react-navigation'


import {SwitchActions} from "@react-navigation/compat"
import { CommonActions,StackActions } from '@react-navigation/native';

class NavigationService {
  constructor () {
    this._navigator = null
    this._initialState = null
  }

  setTopLevelNavigator (navigatorRef) {
    this._navigator = navigatorRef
    if (navigatorRef && this._initialState) {
      this.navigate(this._initialState.routeName, this._initialState.params, this._initialState.key)
      this._initialState = null
    }
  }

  navigate (routeName, params, key) {
    if (this._navigator) {
      this._navigator.dispatch(
        CommonActions.navigate({
          routeName,
          key,
          params,
        })
      )
    } else {
      this._initialState = { routeName, params, key }
    }
  }

  reset (routeName) {
    this._navigator.dispatch(
      CommonActions.reset({
        index: 0,
        actions: [
          CommonActions.navigate({
            routeName
          })
        ],
      })
    )
  }

  resetStack (routeName) {
    this._navigator.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          CommonActions.navigate({
            routeName
          })
        ]
      })
    )
  }

  jumpTo (routeName) {
    this._navigator.dispatch(SwitchActions.jumpTo({ routeName }))
  }
}

const navigationService = new NavigationService()

export default navigationService
