import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

import styles from './styles';
export default class Button extends Component {
  render() {
   
    return(
      <TouchableOpacity
        style={styles.button}
        underlayColor="#B5B5B5"
        onPress={() => {
          this.props.onPress();
        }}>
        <Text style={{color:"white", fontSize: 18}}>{this.props.text}</Text>
      </TouchableOpacity>
    )    
  }
}