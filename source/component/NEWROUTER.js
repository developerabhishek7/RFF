

import * as React from 'react';

import { createNativeStackNavigator,  } from '@react-navigation/native-stack';

import { createDrawerNavigator } from '@react-navigation/drawer';
import {DrawerActions,NavigationContainer} from '@react-navigation/native';

// import FirstPage from '../screens/login';
// import SecondPage from '../screens/signup';
// import ThirdPage from '../screens/ThirdScreen'
import FastImage from 'react-native-fast-image';
import 'react-native-gesture-handler'

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();

{/* Add Drawer.Navigation to a function.*/}








import { AppState, Image,View, Platform,Dimensions ,StatusBar, TouchableOpacity } from "react-native";
import LoadingScreen from "../../src/screens/loading/loading-screen";
import LoginComponent from "../../src/screens/login/LoginComponent";
import SignUpComponent from "../../src/screens/signUp/SignUpComponent";
import AlertsScreen from "../../src/screens/alerts/alerts-screen";
import EditAlertScreen from "../../src/screens/alerts/editAlertScreen";
import TransLoader from "../../src/components/loader/index";
import NotificationsContainer from "../../src/screens/notifications/NotificationsContainer";
import ProfileScreenContainer from "../../src/screens/profile/ProfileScreenContainer";
import UserProfileScreenContainer from "../../src/screens/profileDetails/ProfileScreenContainer";

import ProfileDetailsScreenContainer from "../../src/screens/profileDetails/ProfileDetailsScreenContainer";
import NotificationSettingsContainer from "../../src/screens/notificationSettings/NotificationSettingsContainer";
import ChangePasswordContainer from "../../src/screens/changePassword/ChangePasswordContainer";
import CountryListComponent from "../../src/screens/profileDetails/countryListComponent";
import MembershipContainer from "../../src/screens/membership/membershipContainer";
import CalenderContainer from "../../src/screens/calender/calenderContainer";
import FindFlightContainer from "../../src/screens/findFlights/findFlightContainer";
import PricingContainer from "../../src/screens/pricingPage/pricingPageContainer";
import MapSearchContainer from "../../src/screens/mapSearch/mapSearchContainer";
import airlineMembershipComponent from "../../src/screens/findFlights/airlineMembershipComponent";
import sourceDestinationListComponent from "../../src/screens/findFlights/sourceDestinationListComponent";
import CreateAlertCalender from "../../src/screens/calender/createAlertCalendar";
import NotificationDetailComponent from "../../src/screens/notifications/notificationDetails/NotificationDetailsComponent";
import MapComponent from "../../src/screens/mapSearch/mapViewComponent";
import MoreComponent from "../../src/screens/more/moreComponent";
import OnboardingContainer from "../../src/screens/onBoardingScreens/onBoardingContainer";
import ManageContactDetailsContainer from "../../src/screens/manageContactDetails/manageContactDetailsContainer";
import UpdateProfileContainer from "../../src/screens/updateProfile/UpdateProfileContainer";
import UpdateCountryListComponent from "../../src/screens/updateProfile/countryListComponent";
import FlightDetailsContainer from "../../src/screens/flightDetails/flightDetailsContainer";
import DestinationsComponent from "../../src/screens/mapSearch/DestinationsComponent";
import DestinationDetailsComponent from "../../src/screens/mapSearch/DestinationDetailsComponent"



import findFlightDetails1 from '../../src/screens/calender/flightDetailsContainer'

import PriceDetailsScreen from '../../src/screens/calender/PriceDetailScreen'


import Test from '../../Test'
import * as IMAGE_CONST from "../../src/constants/ImageConst";


function Root() {
  return (
    //   <Drawer.Navigator
    //   initialRouteName='FindFlightContainerScreen'

    // >

<Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#c6cbef', //Set Drawer background
            width: 250, //Set Drawer width
          },
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          }
        }}>
      {/* <Drawer.Screen name="FirstPage" component={FirstPage} /> */}
      {/* <Drawer.Screen name="SecondPage" component={SecondPage} /> */}


      <Drawer.Screen name="FindFlightContainerScreen" component={FindFlightContainer} />
      <Drawer.Screen name="ProfileScreen" component={AlertsScreen} />
      <Drawer.Screen name="MapSearchContainerScreen" component={MapSearchContainer} />
      <Drawer.Screen name="PricingContainerScreen" component={PricingContainer} />

      <Drawer.Screen name="MembershipContainerScreen" component={MembershipContainer} />
      <Drawer.Screen name="MoreComponentScreen" component={MoreComponent} />
      <Drawer.Screen name="FlightDetailsComponent" component={FlightDetailsContainer} />
      

    </Drawer.Navigator>
  );
}

function switchNavigator(){
  return(
    <NavigationContainer>
       <Stack.Navigator > 
       <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{
            headerShown:false
          }}
        />

        <Stack.Screen
          name="Authenticated"
          component={AuthenticatedStack}
          options={{
            headerShown:false
          }}
        />


        <Stack.Screen
          name="Anonymous"
          component={AnonymousStack}
          options={{
            headerShown:false
          }}
        />


          <Stack.Screen
          name="OnBoarding"
          component={OnBoardingStack}
          options={{
            headerShown:false
          }}
        />
        </Stack.Navigator>

     
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='login'>
        <Stack.Screen  name="Root" component={Root} 
        options={{ headerShown: false }} 
        
        /> 
       
        {/* <Stack.Screen
          name="FirstPage"
          component={FirstPage}
          options={{
            title: 'First Page', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        /> */}
        {/* <Stack.Screen
          name="secondscreen"
          component={SecondPage}
          options={{
            title: 'Second Page', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        /> */}
        {/* <Stack.Screen
          name="ThirdPage"
          component={ThirdPage}
          options={{
            title: 'Third Page', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        /> */}


        <Stack.Screen
          name="FindFlightContainerScreen"
          component={FindFlightContainer}
          options={{
            // headerShown:false
            headerLeft: () => (

              <TouchableOpacity
              onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}
           
              >
                 <FastImage
              // style={styles.backIcon}
              source={
                  IMAGE_CONST.DARK_NOTIFICATION_BELL_ICON
              }
            />

              </TouchableOpacity>
            )
            
          }}

        
        />

<Stack.Screen
          name="test"
          component={Test}
          options={{
            headerShown:false
          }}
        />

        <Stack.Screen
          name="MapSearchContainerScreen"
          component={MapSearchContainer}
          options={{
            headerShown:false
          }}
        />

        <Stack.Screen
        name="MapComponentScreen"
        component={MapComponent}
        options={{
          headerShown:false
        }}
      />

       <Stack.Screen
          name="airlineMembershipScreen"
          component={airlineMembershipComponent}
          options={{
            headerShown:false
          }}
        />

        <Stack.Screen
          name="UserProfileScreen"
          component={UserProfileScreenContainer}
          options={{
            headerShown:false
          }}
        />
        
        <Stack.Screen
        name="findFlightDetails1"
        component={findFlightDetails1}
        options={{
          headerShown:false
        }}
      />

<Stack.Screen
          name="sourceDestinationListScreen"
          component={sourceDestinationListComponent}
          options={{
            headerShown:false
          }}
        />

        <Stack.Screen
          name="Alerts"
          component={AlertsScreen}
          options={{
            headerShown:false
          }}
        />
        
        <Stack.Screen
        name="EditAlert"
        component={EditAlertScreen}
        options={{
          headerShown:false
        }}
      />

<Stack.Screen
          name="CalenderContainerScreen"
          component={CalenderContainer}
          options={{
            headerShown:false
          }}
        />

        <Stack.Screen
          name="CreateAlertCalenderScreen"
          component={CreateAlertCalender}
          options={{
            headerShown:false
          }}
        />
        
        <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreenContainer}
        options={{
          headerShown:false
        }}
      />

<Stack.Screen
          name="priceDetails"
          component={PriceDetailsScreen}
          options={{
            headerShown:false
          }}
        />

        <Stack.Screen
          name="ManageContactDetails"
          component={ManageContactDetailsContainer}
          options={{
            headerShown:false
          }}
        />
        
        <Stack.Screen
        name="CountryListSCreen"
        component={CountryListComponent}
        options={{
          headerShown:false
        }}
      />

<Stack.Screen
          name="ProfileDetailsScreen"
          component={ProfileDetailsScreenContainer}
          options={{
            headerShown:false
          }}
        />

        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordContainer}
          options={{
            headerShown:false
          }}
        />
        
        <Stack.Screen
        name="destinationscomponent"
        component={DestinationsComponent}
        options={{
          headerShown:false
        }}
      />

<Stack.Screen
          name="login"
          component={LoginComponent}
          options={{
            headerShown:false
          }}
        />

        <Stack.Screen
          name="destinationdetailscomponent"
          component={DestinationDetailsComponent}
          options={{
            headerShown:false
          }}
        />
        
        <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsContainer}
        options={{
          headerShown:false
        }}
      />


<Stack.Screen
          name="NotificationDetailScreen"
          component={NotificationDetailComponent}
          options={{
            headerShown:false
          }}
        />

        <Stack.Screen
          name="UpdateCountryListComponent"
          component={UpdateCountryListComponent}
          options={{
            headerShown:false
          }}
        />
        
      

      </Stack.Navigator>

    </NavigationContainer>
  );
}




