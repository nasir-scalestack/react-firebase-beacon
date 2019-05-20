import React from 'react';
import { createAppContainer,createStackNavigator, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import MapsScreen from '../screens/MapsScreen';
import SelectionScreen from '../screens/SettingsScreen'
import ContentScreen from '../screens/ContentScreen'
import SearchScreen from'../screens/SearchScreen'
 import HomeScreen from '../screens/HomeScreen'


export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  HomeScreen: HomeScreen,
  MapsScreen : MapsScreen,
  SelectionScreen: SelectionScreen,
  ContentScreen : ContentScreen,
  SearchScreen :SearchScreen},
  {    
     initialRouteName: "Main"
    }
  
));