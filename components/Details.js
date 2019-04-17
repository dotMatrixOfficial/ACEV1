import React, { Component } from 'react';
import { Modal,View,Text, StyleSheet, ScrollView } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Container,Button, ListItem, Footer, FooterTab,Separator } from 'native-base';
import Slideshow from 'react-native-image-slider-show';
import { Ionicons } from '@expo/vector-icons';
import {Collapse,CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';
import { Divider } from 'react-native-elements';
import apiCred from '../assets/data/apiCred.json'
const ref = React.createRef();


export default class Details extends Component {
  timer;
  constructor(props) {
    super(props)
    this.state = {
      isModalOpened: false, 
      currentImageIndex: 0,
      showModal: false,
      position: 0,
      interval: null,
      dataSource: null,
      showPlayerControls: true,
    }
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

  }
  openModal(index) {
    this.setState({ showModal: true, currentImageIndex: index })
  }

  handleOpenModal(index) {
    this.setState({ showModal: true, currentImageIndex: index });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  showPlayerControls = () => {
    this.hideWithTimer();
    this.setState({ showPlayerControls: true, });
 
  }

  hidePlayerControls() {
    clearTimeout(this.timer);
    this.setState({ showPlayerControls: false, });
  }

  hideWithTimer() {
    this.timer = setTimeout(() => {
      this.hidePlayerControls()
    }, 1000)
  }

 
  async postDiscovered(){

    let formData={
      "location":this.state.data.location,
        "referenceNo":this.state.data.referenceNo,
        "userID":this.state.data.userId,
    }
    switch(this.state.zone){
      case 'Front/Engine':
    
      await this.setState({carArea: 'front'})
      break;
      case 'Center/Cabin':
  
      await this.setState({carArea: 'center'})
      break;
      case 'Undercarriage/Wheels':
   
      await this.setState({carArea: 'undercarriage'})
      break;
      case 'Rear/Trunk':
   
      await this.setState({carArea: 'rear'})
      break;
      default:
      break;
    }
    var XHR = new XMLHttpRequest();
var urlEncodedData = "";

var urlEncodedDataPairs = [];

var name;

for(name in formData) {

urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(formData[name]));
}

urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');


XHR.addEventListener('load', function(event) {
alert('Data sent and response loaded.');
});


XHR.addEventListener('error', function(event) {
alert('Error');
});

XHR.open('POST', `${apiCred.ip}concealments/${this.state.carArea}/discovered/${this.state.parentid}/${this.state.data._id}`);

XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

XHR.setRequestHeader('x-access-token', apiCred.token);

XHR.send(urlEncodedData);

  }

  componentDidMount() {
    const { navigate } = this.props.navigation
    const { navigation } = this.props
    const data = navigation.getParam('data', 'NO DATA')
    const parentid = navigation.getParam('id', 'NO DATA')
    let images = data.src.map((img, i) => { return { id: i, url: `${apiCred.ip}/${img}` } })
    const zone = navigation.getParam('zone', 'NO DATA')
    let position = this.state.position === images.id ? 0 : this.state.position + 1
    let [a, ...rest]=data.discovered
   
    this.setState({ title: data.title, description: data.description, dataSource: images, position: position, firstDiscovered:a,restDiscovered:rest,data,parentid,zone })
    this.showPlayerControls()

  }

  static navigationOptions = {

  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>

        {this.state.dataSource &&
          <Slideshow
            onPress={(yo) => { this.handleOpenModal(yo.index) }}
            dataSource={this.state.dataSource}
            position={this.state.position}
            onPositionChanged={position => this.setState({ position })}
          />
        }

<ScrollView>
        <View>
          <Modal visible={this.state.showModal} transparent={true} onRequestClose={this.handleCloseModal} onCancel={() => this.handleCloseModal}>
            <ImageViewer imageUrls={this.state.dataSource} index={this.state.currentImageIndex} />
          </Modal>


            <Text style={styles.reportTitle}>{this.state.title}</Text>
            <Divider style={{ backgroundColor: 'lightgrey' }}></Divider>
            <Text style={styles.reportDescription}>{this.state.description}</Text>
            <Divider style={{ backgroundColor: 'lightgrey' }}></Divider>
   
          <Collapse>
      <CollapseHeader style={{ borderBottomWidth:0,borderWidth:0, width: 370, height: 90}}>
        <Separator style={{backgroundColor:"transparent",  flexDirection: 'row'}} bordered>
        <Ionicons style={{ padding: 0}}name="md-eye" size={20} color="grey" />
        {this.state.firstDiscovered &&
          <Text style={{backgroundColor:"transparent",flex: 1, paddingRight: 30, paddingLeft: 5,}}>{`Last Discovery: ${this.state.firstDiscovered.location} on March 30th 2019\nRef: ${this.state.firstDiscovered.referenceNo}\nUserId: ${this.state.firstDiscovered.userId}`}</Text>
        }
          <Ionicons style={{ padding: 0}}name="md-arrow-dropdown" size={24} color="grey" />
        </Separator>
      </CollapseHeader>
      <CollapseBody>
      {this.state.restDiscovered &&
      this.state.restDiscovered.map((discovery, i)=>(
        <ListItem key={i} style={{backgroundColor:"transparent",  flexDirection: 'row'}} >
        <Text style={{backgroundColor:"transparent",flex: 1, paddingRight: 30, paddingLeft: 5,}}>{`Ref: ${discovery.referenceNo}\nUserId: ${discovery.userId}`}</Text>
        </ListItem>
    ))  
    }
      </CollapseBody>
    </Collapse>
          <Container style={{ display: "none" }}>
            <Button onPress={() => { navigate('Result') }} ref={ref} title="Press Me" ></Button>
          </Container>
        </View>
        </ScrollView>

        {this.state.showPlayerControls ? (
          <Footer style ={styles.bottomView} >
            <FooterTab style= {{backgroundColor:'#333' }}>
            <Ionicons style={{marginTop:6.5, marginLeft:10}}name="md-eye" size={24} color="white" />
                <Text style={{width:230, color:"white", fontSize: 16, marginTop:13.5, marginLeft:18}}>Discovered something here?</Text>
              <Button onPress={()=>{this.postDiscovered()}} >
                <Text  style={{color:"white", fontSize: 16, fontWeight:"600"}}>YES</Text>
              </Button>
              <Button>
                <Text style={{color:"white", fontSize: 16, fontWeight:"600"}}>NO</Text>
              </Button>
            </FooterTab>
          </Footer>
             ) : null}
      </Container>

    )

  }

}
const styles = StyleSheet.create({
  image: {
    height: 70,
    width: 70
  },

  reportTitle: {
    fontSize: 18,
    fontWeight: "600",
    padding: 16
  },

  reportDescription: {
    fontSize: 16,
    padding: 16
  },

  reportSmallText: {

  },


  listLabel: {
    marginTop: 1,
    backgroundColor: 'transparent',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    marginBottom: 30,

  },
  bottomView:{
    flex: 1,
    width: '100%', 
    height: 50, 
    backgroundColor: '#0D2847', 
  
    justifyContent:"flex-end",
    position: 'absolute',
    bottom: 0,
    elevation: 0
  
  },
})
