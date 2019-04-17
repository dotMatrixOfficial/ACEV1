import React, { Component } from 'react';
import {Item, Input,Icon, Button } from 'native-base';
import { Alert, View, Text, Image, StyleSheet, KeyboardAvoidingView} from 'react-native';
var s = require('./styles')

export default class Login extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            username: "ava_miller@cbsa.gc.ca",
            password: null
        }
      }

      loginPressed() {

        if(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(this.state.username) && this.state.password){
          this.props.navigation.navigate('Search');
        }else{
          Alert.alert("Login Failed","Invalid email and/or password entered")
        }
        
      }

      static navigationOptions = {

        headerStyle:{
          backgroundColor: "#020c1c",
          elevation: 0
        }
        }

      render() {
          return (
            <KeyboardAvoidingView behavior="padding" style={styles.container} keyboardVerticalOffset="75">
            <View style={{flex: 1, justifyContent:"center"}}>
              <View style={styles.logoView}>
                <Image style={styles.logo} source={require("../assets/aceLogo.png")}></Image>
              </View>
                  <View style={styles.formView}>
                  <View style={{marginBottom: 24}}>
                  <Item style={styles.textInput} >
                      <Icon name="md-person" style={{color:"#fff", marginLeft: 16, width: 24}}/>
                      <Input style={styles.textInputText} placeholder="ava_miller@cbsa.gc.ca"  placeholderTextColor="grey" onChange={(ev) => { this.setState({ username: "ava_miller@cbsa.gc.ca" }) }}>
                      ava_miller@cbsa.ca
                      </Input>
                    </Item>

                    <Item style={styles.textInput}>
                      <Icon active name="md-lock" style={{color:"#fff", marginLeft: 16, width: 24}}/>
                      <Input style={styles.textInputText} secureTextEntry placeholder="Password" placeholderTextColor="grey" onChange={(ev) => { this.setState({ password: ev.nativeEvent.text }) }}/>
                    </Item>
                  </View>
                    
                    <Button block style={s.largeButtonOutline} onPress={this.loginPressed.bind(this)}>
                      <Text style={s.largeButtonOutlineText}>LOGIN</Text>
                    </Button>
                  </View>
              </View>
              
            </KeyboardAvoidingView>
          );
      }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#020c1c",
    flex: 1
  },

  logoView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36
    //flexGrow: 1
  },

  logo: {
    width: 350,
    height: 69
  },

  formView: {
    //backgroundColor: "red"
  },

  textInput: {
    backgroundColor: "#0D2847", 
    borderColor: "transparent",
    //borderColor:"transparent",
    marginBottom: 2,
  },

  textInputText: {
    color:"#fff",
    fontSize: 16
  }

})