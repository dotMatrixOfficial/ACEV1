import React from 'react';
import SideBar from './SideBar';
import { Ionicons } from '@expo/vector-icons';
import { Font } from 'expo';
import { StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Drawer from 'react-native-drawer'
import { Container, Content, Form, Picker, Icon, Text, Button } from 'native-base';
import Makes from '../assets/data/makes.json'
import apiCred from '../assets/data/apiCred.json'
var s = require('./styles')

var self
const ref = React.createRef();
const ref2 = React.createRef();
let arr = []

export default class Search extends React.Component {

  closeDrawer = () => {
    this.refs.drawer.close()
  };

  showActionsheet = () => {
    this.ActionSheet.show()
  }

  constructor(props) {
    super(props)
    this.myRef = React.createRef()
    this.state = {

      car: [],
      makes: Makes.makes,
      make: 'Ford',
      model: 'Aerostar',
      year: '2019',
      isLoading: false,
      drawerOpen: false,
      arrYear: [2019, 2018, 2017],
      data: null,
      loading: true
    }
  }

  componentDidMount() {

    for (let i = 2019; i > 1989; i--) {
      arr.push(i.toString())
    }
  }
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  makeValueSaved(value) {
    console.log(value);
    this.setState({
      make: value
    }, () => {

    });
  }

  modelValueSaved(value) {
    this.setState({
      model: value,
    }, () => {
    });
  }

  yearValueSaved(value) {
    this.setState({
      year: value
    }, () => {
    });
  }

  savedData() {
    this.setState({
      isLoading: true
    })
    let opts = {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': apiCred.token
      }
    }

    const { navigate } = this.props.navigation
    fetch(`${apiCred.ip}/vehicles/honda/civic/2019`, opts)
      .then(resp => {
        console.log("Response", resp)
        if (resp.status != 200) {
          throw new Error(`${resp.status}`);
        }
        return resp.json()

      })
      .then(data => {
        this.setState({
          isLoading: false
        })
        console.log("Data", data)
        navigate('Result', { data: data, make: this.state.make, model: this.state.model, year: this.state.year })
      })
      .catch(err => alert(err.message))

  }

  /* Navigation Bar */
  static navigationOptions = {

    headerLeft: (
      <TouchableOpacity
        style={s.menuButton}
        onPress={() => {
          var yo = ref;
          yo.current.props.onPress()
        }}>
        <Ionicons name="md-menu" size={24} color="white" />
      </TouchableOpacity>
    ),

    headerRight: (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={s.menuButton}
          onPress={() => {
            var yo = ref2;
            yo.current.props.onPress()
          }}>
          <Ionicons name="md-today" size={24} color="white" />
        </TouchableOpacity>
      </View>
    ),
  }
  navigateDrawer = (ev) => {
    const { navigate } = this.props.navigation;
    navigate(ev)
  }

  render() {

    if (this.state.loading) {
      return false;
    }
    const { navigate } = this.props.navigation;

    return (
      <Drawer
        ref={this.myRef}
        content={<SideBar na={this.navigateDrawer} />}
        type="displace"
        openDrawerOffset={0.2}
        open={false}
        tapToClose={true}
        panCloseMask={0.0}
        closedDrawerOffset={-3}
        tweenEasing={"easeOutQuint"}
        tweenHandler={(ratio) => ({
          main: { opacity: (2 - ratio) / 0 }
        })}
      >

        {/* MAIN CONTENT */}

        <Container style={styles.searchScreenContainer}>
          <Content>
            <Form style={styles.mmmForm}>

              <View style={styles.pickerListItem}>
                <Text style={styles.pickerLabelText}>MAKE</Text>
                <Picker
                  mode="dialog"
                  style={styles.itemPicker}
                  placeholder="Select Make"
                  prompt="Select Make"
                  selectedValue={this.state.make}
                  onValueChange={this.makeValueSaved.bind(this)}>
                  {
                    Object.keys(this.state.makes).map(make => (
                      <Picker.Item key={Date.now()} label={make} value={make} />
                    ))
                  }
                </Picker>
              </View>


              <View style={styles.pickerListItem}>
                <Text style={styles.pickerLabelText}>MODEL</Text>
                <Picker
                  mode="dialog"
                  style={styles.itemPicker}
                  placeholder="Select Model"
                  prompt="Select Model"
                  selectedValue={this.state.model}
                  onValueChange={this.modelValueSaved.bind(this)}
                >
                  {
                    this.state.makes[this.state.make].models.map(model => (
                      <Picker.Item key={Date.now()} label={model} value={model} />
                    ))
                  }
                </Picker>
              </View>

              <View style={styles.pickerListItem}>
                <Text style={styles.pickerLabelText}>YEAR</Text>
                <Picker
                  mode="dialog"
                  style={styles.itemPicker}
                  placeholder="Select Year"
                  prompt="Select Year"
                  selectedValue={this.state.year}
                  onValueChange={this.yearValueSaved.bind(this)}
                >
                  {
                    arr.map(year => (
                      <Picker.Item key={Date.now()} label={year} value={year} />
                    ))
                  }
                </Picker>
              </View>

              {this.state.isLoading &&
                <ActivityIndicator size="large" color="#ffffff" />
              }

              {!this.state.isLoading &&
                <Button block iconLeft onPress={() => { this.savedData() }} style={{ backgroundColor: "#4AA7D1", height: 50, marginBottom: 25 }}>
                  <Icon name="car"></Icon>
                  <Text style={{ fontSize: 18 }}>View Vehicle</Text>
                </Button>
              }

              {/*
                  <Button block iconLeft transparent light>
                    <Icon name="mic"></Icon>
                    <Text style={{fontSize: 16}}>Use Voice</Text>
</Button>*/}

            </Form>
          </Content>

          <Container style={{ display: "none" }}>
            <Button onPress={(c) => {
              navigate("Bulletins")

            }} ref={ref2} title="Press Me" >

            </Button>
          </Container>


          <Container style={{ display: "none" }}>
            <Button onPress={(c) => {

              if (this.state.drawerOpen) {
                this.myRef.current.close()
              }

              this.myRef.current.open()
              this.state.drawerOpen = true

            }} ref={ref} title="Press Me" >

            </Button>
          </Container>
        </Container>
      </Drawer>
    );
  }


}
const drawerStyles = {
  drawer: {
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3
  },
  main: { paddingLeft: 3 },
}

const styles = StyleSheet.create({
  searchScreenContainer: {
    backgroundColor: "#0D2847",
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  mmmForm: {

  },

  itemPicker: {
    //marginBottom: 25,
    color: "white",
    backgroundColor: "#173553",
    height: 60
  },

  pickerLabelText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#84A2C4",
    letterSpacing: 1.5,
    width: "25%"
  },

  pickerListItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25
  },

  buttonHidden: {
    display: "none"
  },
})