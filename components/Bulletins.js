import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { View, ScrollView, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export default class Bulletins extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      fakeData: {
        _id: "123123213",
        countFound: 2019,
        date: 2019,
        description: "Hidden pocket in glove compartement",
        discovered: [
          {
            _id: "123123123123",
            location: "Ottawa,Ontario",
            referenceNo: 1222,
            userId: "123123Fy",
          },
        ],
        location: "Ottawa,Ontario",
        referenceNo: 35764,
        src: [
          "/assets/drugs.jpeg",
        ],
        title: "Hidden pocket in glove",
        userId: "58433",
      },
      fakeData2: {
        _id: "23232323",
        countFound: 2019,
        date: 2019,
        description: "Fake cupholder, found drugs in cupholder",
        discovered: [
          {
            _id: "123123123123",
            location: "Ottawa,Ontario",
            referenceNo: 1222,
            userId: "123123Fy",
          },
        ],
        location: "Ottawa,Ontario",
        referenceNo: 35764,
        src: [
          "/assets/drugs.jpeg",
        ],
        title: "Fake cupholder",
        userId: "58433",
      },
      fakeData3: {
        _id: "23232323",
        countFound: 2019,
        date: 2019,
        description: "Shifter knob had cocaine hidden inside",
        discovered: [
          {
            _id: "123123123123",
            location: "Ottawa,Ontario",
            referenceNo: 1222,
            userId: "123123Fy",
          },
        ],
        location: "Ottawa,Ontario",
        referenceNo: 35764,
        src: [
          "/assets/drugs.jpeg",
        ],
        title: "Shifter knob",
        userId: "58433",
      }
    }
  }
  static navigationOptions = {
    headerTitle: "Bulletins",
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={styles.container}>
        <Content>
          <TouchableOpacity key={1} onPress={() => navigate('Details', { data: this.state.fakeData })}>
            <Card style={styles.cardContainer}>
              <CardItem style={styles.cards}>
                <Left>
                  <Thumbnail square large source={require('../assets/drugs.jpeg')} />
                  <Body>
                    <Text style={{ color: "black" }}>Hidden pocket in glove compartement</Text>
                    <Text style={{ color: "grey" }} note>Toyota Corolla 2018</Text>
                    <Text style={{ color: "grey" }} note>added 3 days ago</Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity key={2} onPress={() => navigate('Details', { data: this.state.fakeData2 })}>
            <Card>
              <CardItem style={styles.cards}>
                <Left>
                  <Thumbnail square large source={require('../assets/drugs.jpeg')} />
                  <Body>
                    <Text style={{ color: "black" }}>Fake cupholder</Text>
                    <Text style={{ color: "grey" }} note>Mazda 6 2019</Text>
                    <Text style={{ color: "grey" }} note>added 6 days ago</Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity key={3} onPress={() => navigate('Details', { data: this.state.fakeData3 })}>
            <Card>
              <CardItem style={styles.cards}>
                <Left>
                  <Thumbnail square large source={require('../assets/drugs.jpeg')} />
                  <Body>
                    <Text style={{ color: "black" }}>Shifter knob</Text>
                    <Text style={{ color: "grey" }} note>Honda Civic 2019</Text>
                    <Text style={{ color: "grey" }} note>added 6 days ago</Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgrey"
  },

});