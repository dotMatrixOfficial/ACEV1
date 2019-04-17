import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Container } from 'native-base';
var s = require('./styles');


// This component is the About page which displays the names of dotMatrix
// Also displays the logo


export default class About extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }

  static navigationOptions = {
    headerTitle: "About",
  }



  render() {
    return (
      <Container style={styles.container} >

        {/* This will show the logo in the about page*/}
        <Image source={require('../assets/dotmatrixlogo.png')} style={styles.logo}></Image>
        <View style={styles.listPad}>

          {/* List of names in dotMatrix*/}
          <Text style={styles.subtitleText}>TEAM LEAD</Text>
          <Text style={styles.textBody}>Jervin Francisco</Text>
        </View>

        <View style={styles.listPad}>
          <Text style={styles.subtitleText}>DESIGN LEAD</Text>
          <Text style={styles.textBody}>Keanu Reeves</Text>
        </View>

        <View style={styles.listPad}>
          <Text style={styles.subtitleText}>BACKEND DEVELOPER</Text>
          <Text style={styles.textBody}>Cesar Guerrero</Text>
        </View>

        <View style={styles.listPad}>
          <Text style={styles.subtitleText}>BACKEND DEVELOPER</Text>
          <Text style={styles.textBody}>Dharaksinh Raj</Text>
        </View>

        <View style={styles.listPad}>
          <Text style={styles.subtitleText}>FRONTEND DEVELOPER</Text>
          <Text style={styles.textBody}>Mike Jalowiecki</Text>
        </View>

      </Container>
    );
  }
}

/* Styles for the about page */
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0D2847",
    padding: 16
  },

  logo: {
    marginBottom: 36
  },

  textBody: {
    color: '#FFF',
    fontSize: 24,
    textAlign: 'center',
  },

  listPad: {
    marginBottom: 24
  },

  subtitleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#84A2C4",
    letterSpacing: 1.5,
    textAlign: "center"
  }

})