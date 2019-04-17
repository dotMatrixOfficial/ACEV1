import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Picker,Button,Label } from 'native-base';
import { View, Image, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ImagePicker, Permissions, Camera } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import apiCred from '../assets/data/apiCred.json'
//import Camera from 'react-native-camera';
var s = require('./styles');


// This is component is the Add form page, to add a car to the database


const ref = React.createRef();
const front = React.createRef();


const options = {
  title: 'Choose Image',
  takePhotoButtonTitle: 'Take Photo',
  chooseFromLibraryButtonTitle: 'Choose From Gallery'
};

export default class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carArea: "front",
      imageSource: null,
      location: null,
      long: null,
      lat: null,
      images: [],
      vehicleData: null,
      foo: true,
      zone: null,
      zones: ['Front/Engine', 'Center/Cabin', 'Undercarriage/Wheels', 'Rear/Trunk'],
      isLoading: false,
      validateTextENumber: false,
      validateDescription: false,
      validateTitle: false,
      photos: false,
    };
  }

  static navigationOptions = {
    headerTitle: "Add a concealment method",
  }


  // This 3 functions (pass,fail,getlocation) gets the current location of the user when the go to the add page
  // and will be set into the lat and long state
  // this uses the google api to get the current city

  pass = (position) => {
    this.setState({
      lat: position.coords.latitude,
      long: position.coords.longitude
    });


    fetch('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyD-NU9g6gKIAc2cZu1xQ6LwiKISOs0Ia58&address=' + `${this.state.lat}` + ',' + `${this.state.long}`)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          location: `${responseJson.results[0].address_components[2].long_name},${responseJson.results[0].address_components[4].long_name}`
        })

      });
  }
  fail = (err) => {
    console.log('ERROR', err);
  }
  getLocation = () => {
    console.log("load getting location");
    let opts = { enableHighAccuracy: false, maximumAge: 120000, timeOut: 20000 };

    navigator.geolocation.getCurrentPosition(this.pass, this.fail, opts);


  }


  componentDidMount() {

    this.getLocation()
    const { navigation } = this.props
    const data = navigation.getParam('data', 'NO DATA')
    this.setState({ vehicleData: data })

    const zone = navigation.getParam('zone', 'noData')
    this.setState({
      zone
    })
    console.log('Zone selection: ', zone)
    var newArray = this.state.zones.filter((word) => word != zone)
    newArray.unshift(zone)

    this.setState({
      zones: newArray
    })

  }

  // This function will post a concealment method with all the details and images which will talk to the Api

  postConcealment = async () => {
    if (!this.state.title || !this.state.description || !this.state.userId || !this.state.reference || (this.state.images.length === 0)) {
      if (!this.state.title) {
        this.setState({
          validateTitle: true
        })
      }
      if (!this.state.description) {
        this.setState({
          validateDescription: true,
        })
      }
      if (!this.state.userId) {
        this.setState({
          validateTextENumber: true,
        })
      }
      if (!this.state.reference) {
        this.setState({
          reference: 12345
        })
      }
      if (this.state.images.length === 0) {
        this.setState({
          photos: true
        })
      }
      return false
    }

    const { navigate, goBack, isFocused, dangerouslyGetParent } = this.props.navigation
    const { navigation } = this.props
    let id = this.state.vehicleData[0]._id

    let vehicleDataKeys = Object.keys(this.state.vehicleData[0])
    let checkForArea = vehicleDataKeys.filter(vechicleArea => vechicleArea === this.state.carArea)
    let checkForAreaIndex = checkForArea[0]
    let countFound = 1

    let countofdiscoveredFound = countFound + 1

    const scone = navigation.getParam('zone', 'noData')

    switch (this.state.zone) {
      case 'Front/Engine':

        await this.setState({ carArea: 'front' })
        break;
      case 'Center/Cabin':

        await this.setState({ carArea: 'center' })
        break;
      case 'Undercarriage/Wheels':

        await this.setState({ carArea: 'undercarriage' })
        break;
      case 'Rear/Trunk':

        await this.setState({ carArea: 'rear' })
        break;
      default:
        break;
    }



    const data = new FormData();
    data.append('title', this.state.title);
    data.append('description', this.state.description);
    data.append('location', this.state.location);
    data.append('date', 2019);
    data.append('referenceNo', this.state.reference);
    data.append('userId', this.state.userId);
    data.append('discovered', `{"location":"${this.state.location}","userId":"qdwsdasda","referenceNo":"1222"}`);

    const photos = this.state.images

    photos.forEach((photo) => {

      data.append('file', {
        uri: photo,
        type: 'image/jpeg',
        name: photo
      });
    });

    this.setState({
      isLoading: true
    })

    fetch(`${apiCred.ip}/concealments/${this.state.carArea}/${id}`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        'x-access-token': apiCred.token,
        "Content-Type": "multipart/form-data",
      },
      body: data
    }).then(res => {

      console.log("Respone:", res)
      const onNavigateBack = navigation.getParam('onNavigateBack', 'NoData')
      onNavigateBack(true)
      this.setState({
        isLoading: false
      })


    }).catch(err => {
      console.log("Error: ", err);
    });
  }


  onValueChange2 = (value) => {

    this.setState({
      carArea: value
    });
  }


  // This function is the Camera function, it will ask the user permissions at first. 

  cameraPressed = async (ev) => {

    const { status: st, permissions } = await Permissions.askAsync(Permissions.CAMERA);
    const { status: stR } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let id = this.state.vehicleData[0]._id

    if (st === 'granted' && stR === 'granted') {
      console.log("Camera is granted");
      const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({ allowsEditing: true, mediaTypes: "Images", aspect: [1, 1], quality: 0.3 });

      if (!cancelled) {
        var imageList = this.state.images
        imageList.push(uri)
        this.setState({ images: imageList, photos: false })
      }
    } else {
      throw new Error('Camera permission not granted');
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;

    return (

      <KeyboardAwareScrollView
        style={{ backgroundColor: '#4c69a5' }}
        resetScrollToCoords={{ x: 0, y: 100 }}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
        extraScrollHeight={1000}
      >
        <Container style={styles.container}>
          {this.state.isLoading &&
            <ActivityIndicator size="large" color="#4AA7D"
              style={{
                justifyContent: "center",
                marginTop: 200,
                alignItems: "center",

              }} />
          }
          {!this.state.isLoading &&
            <Content>

              <Form>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ paddingLeft: 16, fontSize: 16 }}>Car Area</Text>
                  <Item>
                    <Picker
                      mode="dropdown"
                      placeholderStyle={{ color: "#FFF" }}
                      placeholderIconColor="#FFF"
                      selectedValue={this.state.carArea}
                      onValueChange={this.onValueChange2}>

                      {
                        this.state.zones.map(zone => (
                          <Picker.Item key={Date.now()} label={zone} value={zone} />
                        ))
                      }

                    </Picker>
                  </Item>
                </View>

                <Item floatingLabel>

                  <Label style={styles.listLabelText}>Title {this.state.validateTitle && <Text style={{ color: 'red', fontStyle: 'italic' }}> * required</Text>}</Label>
                  <Input style={styles.inputFields} onChange={(ev) => { this.setState({ title: ev.nativeEvent.text, validateTitle: false }) }} />
                </Item>
                <Item floatingLabel>
                  <Label style={styles.listLabelText}>Description {this.state.validateDescription && <Text style={{ color: 'red', fontStyle: 'italic' }}> * required</Text>}</Label>
                  <Input style={styles.descriptionInput} onChange={(ev) => { this.setState({ description: ev.nativeEvent.text, validateDescription: false }) }} />
                </Item>
                <Item floatingLabel>
                  <Label style={styles.listLabelText}>Employee Number {this.state.validateTextENumber && <Text style={{ color: 'red', fontStyle: 'italic' }}> * required</Text>}</Label>
                  <Input style={styles.inputFields} onChange={(ev) => { this.setState({ userId: ev.nativeEvent.text, validateTextENumber: false }) }} />
                </Item>
                <Item floatingLabel>
                  <Label style={styles.listLabelText}>Reference Number (optional)</Label>
                  <Input style={styles.inputFields} onChange={(ev) => { this.setState({ reference: ev.nativeEvent.text }) }} />
                </Item>

              </Form>
              <Button transparent iconLeft large block style={{ backgroundColor: "grey", marginTop: 24, marginLeft: 16, marginRight: 16, height: 50 }} onPress={this.cameraPressed.bind(this)} >
                <Ionicons name='md-camera' size={24} color="white" />
              </Button>

              <View style={styles.imageContainer}>
                {this.state.images &&
                  this.state.images.map((image, i) => (
                    <Image key={i} source={{ uri: image }} style={{ height: 80, width: 80, marginTop: 10, marginLeft: 10 }} />
                  ))}
              </View>


              <Button block iconLeft onPress={() => { this.postConcealment() }} style={{ backgroundColor: "#4AA7D1", height: 50, marginTop: 25, marginLeft: 16, marginRight: 16 }}>
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#fff" }}>SUBMIT</Text>
              </Button>

              <Container style={{ display: "none" }}>
                <Button onPress={() => {
                  navigate('Result')
                }} ref={ref} title="Press Me" >
                </Button>
              </Container>

            </Content>
          }
        </Container>

      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 16,
  },

  view: {
    flex: 1
  },

  buttonSavedStyle: {
    marginTop: 20,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#4AA7D1",
    height: 60,
    width: 300

  },
  formItem:
  {
    borderColor: '#375B79',
    borderBottomColor: '#0D2847',
    marginTop: 5
  },

  listLabel: {
    marginTop: 1,
    backgroundColor: 'transparent',
    textAlign: 'center',
    justifyContent: "center",
    alignItems: "center",

  },

  listLabelText: {

  },

  inputFields: {

  },

  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
})

