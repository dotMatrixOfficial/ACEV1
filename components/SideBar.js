import React, { Component } from 'react';


import {
  SwitchIOS,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { Container, Button, Icon } from 'native-base'
import Ionicons from '@expo/vector-icons/Ionicons';


export default class SideBar extends Component {

  constructor(props) {
  super(props);
  this.state={
    navigateDrawer:props.na
  }

  }

  navDrawer=()=>{
    this.state.navigateDrawer("About")
  }

  navDrawer2=()=>{
    this.state.navigateDrawer("Tutorial")
  }


  render() {
console.log(this.props)
    return (
      <Container>
      <View style={styles.controlPanel}>
        <View style={styles.drawerHeaderContainer}>
          <Text style={styles.drawerTitleText}>Ava Miller</Text>
          <Text style={styles.drawerSubtitleText}>ava_miller@cbsa.gc.ca</Text>
        </View>

      <TouchableOpacity
        style={styles.drawerListItem}
          onPress={this.navDrawer2}>
        <Ionicons name="md-cube" color="white" size={24} style={{marginRight: 10}}></Ionicons>
        <Text style={{color:"white", fontSize: 16}}>Tutorial</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerListItem}
        onPress={this.navDrawer}>
        <Ionicons name="md-hammer" color="white" size={24} style={{marginRight: 10}}></Ionicons>
        <Text style={{color:"white", fontSize: 16}}>About ACE</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerListItem}
        onPress={this.navDrawer}>
        <Ionicons name="md-power" color="white" size={24} style={{marginRight: 10}}></Ionicons>
        <Text style={{color:"white", fontSize: 16}}>Sign Out</Text>
      </TouchableOpacity>

      </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  controlPanel: {
    flex: 1,
    elevation: 2,
    backgroundColor:"#020c1c"
  },

  drawerHeaderContainer: {
    borderBottomWidth: 2,
    borderBottomColor: "#0D2847",
    padding: 16
  },

  drawerListItem: {
    height: 64,
    paddingLeft: 16,
    flexDirection: "row",
    alignItems: "center",
    
  },

  drawerTitleText: {
    fontSize: 24,
    color: "#fff"
  },

  drawerSubtitleText: {
    fontSize: 16,
    color: "#84A2C4"
  }

})
