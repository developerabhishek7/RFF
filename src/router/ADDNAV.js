import * as React from 'react';
import 'react-native-gesture-handler';
import { Button, View, StatusBar,Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createDrawerNavigator } from '@react-navigation/drawer';

import LoadingScreen from "../screens/loading/loading-screen";
import LoginComponent from "../screens/login/LoginComponent";
import SignUpComponent from "../screens/signUp/SignUpComponent";
import AlertsScreen from "../screens/alerts/alerts-screen";
import EditAlertScreen from "../screens/alerts/editAlertScreen";
import TransLoader from "../components/loader/index";
import NotificationsContainer from "../screens/notifications/NotificationsContainer";
import ProfileScreenContainer from "../screens/profile/ProfileScreenContainer";
import UserProfileScreenContainer from "../screens/profileDetails/ProfileScreenContainer";
import ProfileDetailsScreenContainer from "../screens/profileDetails/ProfileDetailsScreenContainer";
import NotificationSettingsContainer from "../screens/notificationSettings/NotificationSettingsContainer";
import ChangePasswordContainer from "../screens/changePassword/ChangePasswordContainer";
import CountryListComponent from "../screens/profileDetails/countryListComponent";
import MembershipContainer from "../screens/membership/membershipContainer";
import CalenderContainer from "../screens/calender/calenderContainer";
import FindFlightContainer from "../screens/findFlights/findFlightContainer";
// import PricingContainerScreen from "../screens/pricingPage/pricingPageContainer";
import MapSearchContainer from "../screens/mapSearch/mapSearchContainer";
import airlineMembershipComponent from "../screens/findFlights/airlineMembershipComponent";
import sourceDestinationListComponent from "../screens/findFlights/sourceDestinationListComponent";
import CreateAlertCalender from "../screens/calender/createAlertCalendar";
import NotificationDetailComponent from "../screens/notifications/notificationDetails/NotificationDetailsComponent";
import MapComponent from "../screens/mapSearch/mapViewComponent";
import MoreOptions from "../screens/more/moreComponent";
import OnboardingContainer from "../screens/onBoardingScreens/onBoardingContainer";
import ManageContactDetailsContainer from "../screens/manageContactDetails/manageContactDetailsContainer";
import UpdateProfileContainer from "../screens/updateProfile/UpdateProfileContainer";
import UpdateCountryListComponent from "../screens/updateProfile/countryListComponent";
import FlightDetailsContainer from "../screens/flightDetails/flightDetailsContainer";
import DestinationsComponent from "../screens/mapSearch/DestinationsComponent";
import DestinationDetailsComponent from "../screens/mapSearch/DestinationDetailsComponent"
import findFlightDetails1 from '../screens/calender/flightDetailsContainer'
import PriceDetailsScreen from '../screens/calender/PriceDetailScreen'
import DrawerView from '../screens/Drawer/drawerModal'
// import Test from '../../Test'
import * as IMAGE_CONST from "../constants/ImageConst";
import FlightDetailsCompoent from '../screens/calender/flightDetailsContainer'
import SplashComponent from '../screens/splash/SplashComponent'
import NoNetWorkComponent from '../screens/noNetwork/NoNetworkComponent'
import { connect } from "react-redux";
import scale, { verticalScale } from '../helpers/scale'
import FindFlightComponent from '../screens/findFlights/findFlightComponent';
import HelpComponent from '../screens/help/HelpComponent'

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

import NavigationService from "../utils/NavigationService";
import { navigationRef } from './RouteNavigation';

import calendarTest from '../screens/calender/calendarTest';


// const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();

{/* Add Drawer.Navigation to a function.*/ }

componentDidMount = async() => {
  StatusBar.setHidden(false);
}

const drawerViewModel = (navigation) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
      {/* <DraweView navigation={navigation} /> */}
      <DrawerView navigation={navigation} />
    </View>
  );
};

    const PublicStack = () => (
    <Stack.Navigator>
        <Stack.Screen
          name="splash"
          component={SplashComponent}
          options={{
            headerShown: false,
            fullScreenGestureEnabled:false
          }}
        />

        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{
            headerShown: false,
            gestureEnabled:false,
            fullScreenGestureEnabled:false
          }}
        />
      <Stack.Screen
          name="SignUp"
          component={SignUpComponent}
          options={{
            headerShown: false,
            gestureEnabled:false,
            fullScreenGestureEnabled:false
          }}
        />
       <Stack.Screen
          name="SignIn"
          component={LoginComponent}
          options={{
            headerShown: false,
            gestureEnabled:false,
            fullScreenGestureEnabled:false
          }}
        />
       <Stack.Screen
          name="FindFlightContainerScreen"
          component={FindFlightContainer}
          options={{
            headerShown: false,
            gestureEnabled:false,
            fullScreenGestureEnabled:false
          }}
        />

<Stack.Screen
          name="MoreOptions"
          component={MoreOptions}
          options={{
            headerShown: false,
            gestureEnabled:false,
            fullScreenGestureEnabled:false
          }}
        />
  
      <Stack.Screen
        name="MoreComponentScreen"
        component={MoreComponent}
        options={{
            headerShown: false
          }}
      />
        <Stack.Screen
          name="MapSearchContainerScreen"
          component={MapSearchContainer}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
                name="Onboard"
                component={OnboardingContainer}
                options={{
                    headerShown: false,
                    gestureEnabled:false
                }}
                /> 
    </Stack.Navigator>
  );




  
  const ProtectedStack = () => (
    <Stack.Navigator>
       <Stack.Screen
          name="splash"
          component={SplashComponent}
          options={{
            headerShown: false,
            }}
          
        />
      <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{
            headerShown: false,
            gestureEnabled:false
          }}
        />
         <Stack.Screen
          name="SignIn"
          component={LoginComponent}
          options={{
            headerShown: false,
            gestureEnabled:false
          }}
        />
        <Stack.Screen
          name="Onboard"
          component={OnboardingContainer}
          options={{
            headerShown: false,
            gestureEnabled:false
      
          }}
        />
        <Stack.Screen
          name="NoNetworkScreen"
          component={NoNetWorkComponent}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="HelpScreen"
          component={HelpComponent}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="FindFlightContainerScreen"
          component={FindFlightContainer}
          options={{
            headerShown: false,
            gestureEnabled:false,
            fullScreenGestureEnabled:false
          }}
        />
        <Stack.Screen
          name="MapSearchContainerScreen"
          component={MapSearchContainer}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="MapComponentScreen"
          component={MapComponent}
          options={{
            headerShown: false
          }}
        />


      <Stack.Screen
          name="calendarTest"
          component={calendarTest}
          options={{
            headerShown: false
          }}
        />


      <Stack.Screen
          name="FlightDetailsCompoent"
          component={FlightDetailsCompoent}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="MoreOptions"
          component={MoreOptions}
          options={{
            headerShown: false,
            gestureEnabled:false,
            fullScreenGestureEnabled:false
          }}
        />
        <Stack.Screen
          name="airlineMembershipScreen"
          component={airlineMembershipComponent}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="UserProfileScreen"
          component={UserProfileScreenContainer}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="findFlightDetails1"
          component={findFlightDetails1}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpComponent}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="sourceDestinationListScreen"
          component={sourceDestinationListComponent}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="NotificationSettingsScreen"
          component={NotificationSettingsContainer}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Alerts"
          component={AlertsScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="EditAlert"
          component={EditAlertScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="CalenderContainerScreen"
          component={CalenderContainer}
          options={{
            headerShown: false,
            gestureEnabled:true
          }}
        />
        <Stack.Screen
          name="CreateAlertCalenderScreen"
          component={CreateAlertCalender}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreenContainer}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="priceDetails"
          component={PriceDetailsScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="ManageContactDetails"
          component={ManageContactDetailsContainer}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="CountryListSCreen"
          component={CountryListComponent}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="ProfileDetailsScreen"
          component={ProfileDetailsScreenContainer}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordContainer}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="destinationscomponent"
          component={DestinationsComponent}
          options={{
            headerShown: false
          }}
        />
       
        <Stack.Screen
          name="destinationdetailscomponent"
          component={DestinationDetailsComponent}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="MembershipContainerScreen"
          component={MembershipContainer}
          options={{
            headerShown: false
          }}
        />
        {/* <Stack.Screen
          name="PricingContainerScreen" 
          component={PricingContainerScreen}
          options={{
            headerShown: false
          }}
        /> */}
        
        <Stack.Screen
          name="NotificationsScreen"
          component={NotificationsContainer}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="NotificationDetailScreen"
          component={NotificationDetailComponent}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="UpdateCountryListComponent"
          component={UpdateCountryListComponent}
          options={{
            headerShown: false
          }}
        />
    </Stack.Navigator>
  );
  
function MainStack() {
    // Mocked logic for authentication, Implement actually logic
    const isLoggedIn = true;
  
    return (
      <NavigationContainer
          ref={navigationRef}
          
      >
         <Drawer.Navigator 
         drawerContent={drawerViewModel}
                screenOptions={{ headerShown: false, drawerType: "front" ,swipeEnabled:false,
                drawerStyle: {
                  backgroundColor: 'transparent',
                },
              }}
          >
          {/* {isLoggedIn ? ( */}           
            <Drawer.Screen
              name="ProtectedStack"
              component={ProtectedStack}
              options={{ headerShown:false, }}

            />
             {/* ) : ( */}
            <Drawer.Screen
              name="PublicStack"
              component={PublicStack}
              options={{ headerShown:false }}
            />
          {/* )} */}
          {/* This screen can be accessible even if when user is not authenticated */}
          {/* <Drawer.Screen
            name="CocktailDetailScreen"
            component={CocktailDetailScreen}
            options={{ header: () => <Header /> }}
          /> */}
        </Drawer.Navigator>
      </NavigationContainer>
    );
  };
  


  export default MainStack;