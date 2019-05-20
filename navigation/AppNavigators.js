import React from 'react';
import { createStackNavigator, createAppContainer , createSwitchNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import MapsScreen from '../screens/MapsScreen';
import SelectionScreen from '../screens/SettingsScreen'
import ContentScreen from '../screens/ContentScreen'
import SearchScreen from'../screens/SearchScreen'
 import HomeScreen from '../screens/HomeScreen'

 const AppNavigator = createSwitchNavigator({
    Main: MainTabNavigator,
    Maps : MapsScreen,
    SelectionScreen: SelectionScreen,
    ContentScreen : ContentScreen,
    SearchScreen :SearchScreen,
   HomeScreen : HomeScreen},
    {    
       initialRouteName: "Main"
      }
    );
 const AppContainer = createAppContainer(AppNavigator);
 export default AppContainer;

