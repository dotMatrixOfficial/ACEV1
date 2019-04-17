import React, { Component } from 'react';
import Search from './components/Search';
import Login from './components/Login';
import Result from './components/Result';
import Details from './components/Details';
import Add from './components/Add';
import About from './components/About';
import Tutorial from './components/Tutorial';
import Bulletins from './components/Bulletins';

import { createStackNavigator, createAppContainer, createDrawerNavigator, createSwitchNavigator } from "react-navigation";


const MainAppStack = createStackNavigator(
  {
    Search: Search,
    Login: Login,
    Result: Result,
    Details: Details,
    Add: Add,
    Bulletins:Bulletins,
    About: About,
    Tutorial: Tutorial,
  },
  {
    initialRouteName: "Login", //temporarily - will/should be 'Login'
    defaultNavigationOptions: {
      backgroundColor:"#0D2847",
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerStyle: {
        backgroundColor: "#0D2847",
        elevation: 0,
      },
    },
  }
);

export default createAppContainer(MainAppStack);

