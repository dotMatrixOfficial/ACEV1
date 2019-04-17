import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity, Animated, ActivityIndicator} from 'react-native';
import { ScrollableTabView, ScrollableTabBar } from '@valdio/react-native-scrollable-tabview'
import { Container, Content, Button } from 'native-base';
import { ListItem, Header } from 'react-native-elements'
import { FloatingAction } from 'react-native-floating-action';
import { Svg, LinearGradient } from 'expo';
import apiCred from '../assets/data/apiCred.json'
var s = require('./styles')
const { Circle, Rect, Path, G } = Svg;




const ref = React.createRef();
const ref2 = React.createRef();
const ref3 = React.createRef();
const ref4 = React.createRef();
const front = React.createRef();
var backToggle = false;
var frontToggle = true;
var centerToggle = false;
var underToggle = false;
export default class Result extends React.Component {
  timer;
  constructor(props) {
    super(props);

    this.state = {
      tab: null,
      activePage: 2,
      hover: false,
      hover2: false,
      hover3: false,
      hover4: false,
      hover5: false,
      hover6: false,
      undercarriage: null,
      rear: null,
      front: null,
      center: null,
      showPlayerControls: false,
      initialPage: 0,
      activeTab: undefined,
      data: null,
      isLoading: true,
      make: null,
      model: null,
      year: null,
      selectedColor: '#FFF',
      notSelectedColor: '#7A879B',
      backgroundColor: "#0D2847",
      frontSelected: true,
      undercarriageSelected: false,
      rearSelected: false,
      centerSelected: false,
      refresh: false,
      methodHave: false,
      currentTab: null,
      makeTitle: null,
      modelTitle: null,
      yearTitle: null

    }

  }
  showPlayerControls = () => {
    this.setState({ showPlayerControls: true, });
  }

  hidePlayerControls() {
    this.setState({ showPlayerControls: false, });
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0)
  }

  handleOnNavigateBack = () => {
    const { navigate } = this.props.navigation;
    navigate('Result')
    this.fetchandrefetch(this.state.data)

  }

  componentDidMount() {

    const { navigate } = this.props.navigation
    const { navigation } = this.props
    const data = navigation.getParam('data', 'NO DATA')
    const make = navigation.getParam('make', 'NO DATA')
    const model = navigation.getParam('model', 'NO DATA')
    const year = navigation.getParam('year', 'NO DATA')
    this.setState({ makeTitle: make, modelTitle: model, yearTitle: year })

    this.fetchandrefetch(data)
    console.log(data)
    this.setState({ make: data[0].make, model: data[0].model, year: data[0].year })

    this.setState({
      data: data,
      methodHave: false,
    })

    Animated.timing(this.animatedValue, {
      toValue: 150,
      duration: 1500
    }).start();

  }

  fetchandrefetch = (data) => {
    let opts = {

      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': apiCred.token
      }
    }
    fetch(`${apiCred.ip}/concealments/${data[0].make}/${data[0].model}/${data[0].year}`, opts)
      .then(resp => resp.json())
      .then(data => {
        console.log("Data", data);
        let rear = data[0].rear.concealment.length > 0 ? data[0].rear.concealment : null
        let front = data[0].front.concealment.length > 0 ? data[0].front.concealment : null
        let undercarriage = data[0].undercarriage.concealment.length > 0 ? data[0].undercarriage.concealment : null
        let center = data[0].center.concealment.length > 0 ? data[0].center.concealment : null

        this.setState({
          id: data[0]._id,
          data: data,
          undercarriage: undercarriage,
          front: front,
          rear: rear,
          center: center,
          isLoading: false
        })
      })
      .catch(err => console.log("Error", err.message))
  }


  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#05162E",
      elevation: 0
    },

    headerRight: (
      <TouchableOpacity
        style={s.menuButton}
        onPress={() => {
          var yo = ref2;
          yo.current.props.onPress()
        }}>
        <Ionicons name="md-information-circle" size={24} color="white"></Ionicons>
      </TouchableOpacity>
    ),

  }
  tabView(c) {
    this.setState(activePage)
  }


  rearToggled = () => {

    this.tabView.goToPage(3)
    this.bToggle()
    this.setState({ activeTab: 3 })


  };
  frontToggled = () => {

    this.tabView.goToPage(0)
    this.fToggle()
    this.setState({ activeTab: 0 })

  };
  centerToggled = () => {

    this.tabView.goToPage(1)
    this.cToggle()
    this.setState({ activeTab: 1 })

  };
  underToggled = () => {

    this.tabView.goToPage(2)
    this.uToggle()
    this.setState({ activeTab: 2 })

  };
  fToggle = () => {

    frontToggle = true;
    backToggle = false;
    centerToggle = false;
    underToggle = false;
    this.setState({ refresh: !this.state.refresh });
  }
  bToggle = () => {

    frontToggle = false;
    backToggle = true;
    centerToggle = false;
    underToggle = false;
    this.setState({ refresh: !this.state.refresh });
  }
  cToggle = () => {

    frontToggle = false;
    backToggle = false;
    centerToggle = true;
    underToggle = false;
    this.setState({ refresh: !this.state.refresh });
  }
  uToggle = () => {

    frontToggle = false;
    backToggle = false;
    centerToggle = false;
    underToggle = true;
    this.setState({ refresh: !this.state.refresh });
  }
  onScrollTab = () => {
    this.setState({ activeTab: this.state.activeTab = undefined });
  }

  onTabChanged = async (i, ref) => {


    switch (i.i) {
      case 0:

        this.fToggle()
        await this.setState({ currentTab: 'Front/Engine' })
        return;
      case 1:
        this.cToggle()
        await this.setState({ currentTab: 'Center/Cabin' })
        return;
      case 2:

        this.uToggle()
        await this.setState({ currentTab: 'Undercarriage/Wheels' })
        return;
      case 3:
        this.bToggle()
        await this.setState({ currentTab: 'Rear/Trunk' })
        return;
      default:
        break;
    }
  }

  render() {

    const { navigate } = this.props.navigation;

    return (

      <Container>
        {this.state.isLoading &&
          <ActivityIndicator size="large" color="#0000ff" />
        }
        {!this.state.isLoading &&


          <View style={styles.container}>
            <LinearGradient colors={['#05162E', '#0D2847']} style={{ height: 200 }}>
              <View style={styles.innerContainer}>
                <Text style={styles.titleText}>{this.state.makeTitle} {this.state.modelTitle} {this.state.yearTitle}</Text>
                <Svg height="70%" width="70%" viewBox="0 0 941.31 312.35">
                  {backToggle &&
                    <Path
                      fill={this.state.selectedColor}
                      onPress={this.rearToggled}
                      d="M936.85,174.7a151.82,151.82,0,0,0-7.78-32.82A105.18,105.18,0,0,0,924,130a2.49,2.49,0,0,0-1.76-.69H922a2.57,2.57,0,0,0-2.31,1.92c-.09.55-.18,1.12-.28,1.7l0,.09v.11h0c-1.25,7.5-2.9,17.18-3.66,20.65-1.14,5.31-6.78,5.72-8.48,5.72H891.54c-2.92,0-4.88-.75-5.8-2.22-1.41-2.24,0-5.37.1-5.5a46.73,46.73,0,0,1,3.91-7.36A97.28,97.28,0,0,1,904,126.93c8.31-8.21,14.36-18.74,18-26.13.49-1.62,1-3.38,1.59-5.18,3.24-10.51,3.52-16.48.94-20-3.31-4.49-11.37-4.72-24.24-4.72H842.39c-.91,0-8.92-.2-12-1.58l-20.33-9.21L805,57.81l-.25-.11-10.08-4.57C792.06,51.67,790,51,788.47,51c-2.67,0-4.13,2.13-4.46,6.52-3.32,21-11.84,75-15.07,95.43-1.14,6.18,1.78,8.41,4.88,10.17A80.84,80.84,0,0,1,825.33,236c0,.82,0,1.68,0,2.52a7.4,7.4,0,0,0,1.33,4,5.74,5.74,0,0,0,4.88,2.5h0l.6,0,28.22-1.12.94,0,1.17-.05,1.86-.07,2.19-.09,25.09-1c4.3-.17,6.63-3.75,8.33-6.37l.23-.36a6.51,6.51,0,0,1,4.24-3.08c2.1-.45,4.39-.76,6.6-1.06h0c4.43-.6,8.6-1.17,10.53-2.75C924.46,226.68,940.27,201.73,936.85,174.7Z" />
                  }
                  {!backToggle &&
                    <Path
                      fill={this.state.notSelectedColor}
                      onPress={this.rearToggled}
                      d="M936.85,174.7a151.82,151.82,0,0,0-7.78-32.82A105.18,105.18,0,0,0,924,130a2.49,2.49,0,0,0-1.76-.69H922a2.57,2.57,0,0,0-2.31,1.92c-.09.55-.18,1.12-.28,1.7l0,.09v.11h0c-1.25,7.5-2.9,17.18-3.66,20.65-1.14,5.31-6.78,5.72-8.48,5.72H891.54c-2.92,0-4.88-.75-5.8-2.22-1.41-2.24,0-5.37.1-5.5a46.73,46.73,0,0,1,3.91-7.36A97.28,97.28,0,0,1,904,126.93c8.31-8.21,14.36-18.74,18-26.13.49-1.62,1-3.38,1.59-5.18,3.24-10.51,3.52-16.48.94-20-3.31-4.49-11.37-4.72-24.24-4.72H842.39c-.91,0-8.92-.2-12-1.58l-20.33-9.21L805,57.81l-.25-.11-10.08-4.57C792.06,51.67,790,51,788.47,51c-2.67,0-4.13,2.13-4.46,6.52-3.32,21-11.84,75-15.07,95.43-1.14,6.18,1.78,8.41,4.88,10.17A80.84,80.84,0,0,1,825.33,236c0,.82,0,1.68,0,2.52a7.4,7.4,0,0,0,1.33,4,5.74,5.74,0,0,0,4.88,2.5h0l.6,0,28.22-1.12.94,0,1.17-.05,1.86-.07,2.19-.09,25.09-1c4.3-.17,6.63-3.75,8.33-6.37l.23-.36a6.51,6.51,0,0,1,4.24-3.08c2.1-.45,4.39-.76,6.6-1.06h0c4.43-.6,8.6-1.17,10.53-2.75C924.46,226.68,940.27,201.73,936.85,174.7Z" />
                  }
                  {/* front  */}
                  {frontToggle && <Path
                    fill={this.state.selectedColor}
                    onPress={this.frontToggled}
                    d="M123.35,181.55a82.42,82.42,0,0,1,12.13-10,81.76,81.76,0,0,1,29.3-12.33,82.22,82.22,0,0,1,60.59,11.2c7.22,4.62,9.84,5.44,12.68,5.44.63,0,1.29,0,2-.09h0c.86,0,1.84-.11,3-.11h40.09c4,0,6.36-.67,7.32-2.14s.63-3.73-1.16-7.82c-7.9-18.14-22.22-50.82-29.2-65.9l-.19-.41,0-.07A14.13,14.13,0,0,0,257,94.56c-1.35-1.22-3.16-1.77-5.89-1.77a33.43,33.43,0,0,0-5,.45c-31.67,4.85-60.7,9.83-86.29,14.8-21.89,4.25-41.77,8.6-59.09,12.91-14.11,3.52-26.49,7-37.85,10.61-9.52,3-16.75,5.69-22.56,7.88A69.57,69.57,0,0,0,29,144.74a42.47,42.47,0,0,0-7.8,5.93c-4.44,4.3-7.48,9.2-11,14.86a3.22,3.22,0,0,0,1,3.4,1.94,1.94,0,0,0,1.3.5c1.64,0,3.76-1.9,6.44-4.31s6.22-5.58,10.38-7.64a182.57,182.57,0,0,1,21.49-8.7A135.44,135.44,0,0,1,64.29,145a66.26,66.26,0,0,1,12.62-1.69h.75c3.89,0,6,.61,6.25,1.83.31,1.5-2.25,3.59-4.45,5.07a63.77,63.77,0,0,1-9.52,5.14,95.81,95.81,0,0,0-13.87,7.79,79.51,79.51,0,0,0-10.5,8.15,28.14,28.14,0,0,1-9.21,5.55,34.79,34.79,0,0,1-10.5,2.45c-6,.28-14.28,1.58-14.63,1.64H11c-1.13,0-6.87.29-8.29,6.09a.08.08,0,0,0,0,0c0,3.29,0,6.64.12,9.95a183.05,183.05,0,0,0,1.69,19.41,96.64,96.64,0,0,0,3.56,16c1.55,4.69,3.34,8.15,5.33,10.27a6.8,6.8,0,0,0,5,2.48c7.52,0,14,5.22,17.24,8.33a16,16,0,0,0,10.68,4h0c14,0,33-.09,44.57-.09h0c2.92,0,5-.79,6.46-2.4s2.26-4.39,2.26-8.13c0-1.27-.08-2.54-.15-3.77v-.06h0c-.08-1.25-.15-2.42-.15-3.61a81.66,81.66,0,0,1,6.43-31.9,82.16,82.16,0,0,1,17.56-26Z" />
                  }
                  {!frontToggle &&
                    <G>
                      <Path fill={this.state.notSelectedColor} onPress={this.frontToggled}
                        d="M123.35,181.55a82.42,82.42,0,0,1,12.13-10,81.76,81.76,0,0,1,29.3-12.33,82.22,82.22,0,0,1,60.59,11.2c7.22,4.62,9.84,5.44,12.68,5.44.63,0,1.29,0,2-.09h0c.86,0,1.84-.11,3-.11h40.09c4,0,6.36-.67,7.32-2.14s.63-3.73-1.16-7.82c-7.9-18.14-22.22-50.82-29.2-65.9l-.19-.41,0-.07A14.13,14.13,0,0,0,257,94.56c-1.35-1.22-3.16-1.77-5.89-1.77a33.43,33.43,0,0,0-5,.45c-31.67,4.85-60.7,9.83-86.29,14.8-21.89,4.25-41.77,8.6-59.09,12.91-14.11,3.52-26.49,7-37.85,10.61-9.52,3-16.75,5.69-22.56,7.88A69.57,69.57,0,0,0,29,144.74a42.47,42.47,0,0,0-7.8,5.93c-4.44,4.3-7.48,9.2-11,14.86a3.22,3.22,0,0,0,1,3.4,1.94,1.94,0,0,0,1.3.5c1.64,0,3.76-1.9,6.44-4.31s6.22-5.58,10.38-7.64a182.57,182.57,0,0,1,21.49-8.7A135.44,135.44,0,0,1,64.29,145a66.26,66.26,0,0,1,12.62-1.69h.75c3.89,0,6,.61,6.25,1.83.31,1.5-2.25,3.59-4.45,5.07a63.77,63.77,0,0,1-9.52,5.14,95.81,95.81,0,0,0-13.87,7.79,79.51,79.51,0,0,0-10.5,8.15,28.14,28.14,0,0,1-9.21,5.55,34.79,34.79,0,0,1-10.5,2.45c-6,.28-14.28,1.58-14.63,1.64H11c-1.13,0-6.87.29-8.29,6.09a.08.08,0,0,0,0,0c0,3.29,0,6.64.12,9.95a183.05,183.05,0,0,0,1.69,19.41,96.64,96.64,0,0,0,3.56,16c1.55,4.69,3.34,8.15,5.33,10.27a6.8,6.8,0,0,0,5,2.48c7.52,0,14,5.22,17.24,8.33a16,16,0,0,0,10.68,4h0c14,0,33-.09,44.57-.09h0c2.92,0,5-.79,6.46-2.4s2.26-4.39,2.26-8.13c0-1.27-.08-2.54-.15-3.77v-.06h0c-.08-1.25-.15-2.42-.15-3.61a81.66,81.66,0,0,1,6.43-31.9,82.16,82.16,0,0,1,17.56-26Z" />
                      <Path onPress={this.frontToggled} fill={this.state.backgroundColor} class="cls-2" d="M3.26,185.61c2-4.34,6.75-4.6,7.77-4.6h.2c.35,0,8.6-1.36,14.64-1.64a34.63,34.63,0,0,0,10.5-2.45,28.32,28.32,0,0,0,9.21-5.54,77.41,77.41,0,0,1,10.5-8.15,94.26,94.26,0,0,1,13.86-7.79,63.77,63.77,0,0,0,9.52-5.14c2.2-1.49,4.76-3.58,4.45-5.08-.25-1.21-2.36-1.83-6.25-1.83h-.75a65.47,65.47,0,0,0-12.62,1.69,137,137,0,0,0-13.45,3.78,180.87,180.87,0,0,0-21.49,8.7c-4.16,2.05-7.6,5.15-10.38,7.64s-4.8,4.3-6.44,4.3a1.86,1.86,0,0,1-1.3-.5,3.21,3.21,0,0,1-1-3.4Z" />
                    </G>
                  }
                  {/*undercarriage*/}
                  {underToggle && <Path
                    fill={this.state.selectedColor}
                    onPress={this.underToggled}
                    d="M664.34,238.54a80.67,80.67,0,0,1,13.19-44.3c.49-1.93.34-3.42-.45-4.43C675.7,188,672.62,188,671,188H255.89a5.7,5.7,0,0,0-2.94.75,5,5,0,0,0-1.88,1.92,5.17,5.17,0,0,0,.24,5.31,163.25,163.25,0,0,1,9,20.48A69.92,69.92,0,0,1,264.18,239a75.52,75.52,0,0,1-.94,12.39c-.4,2.39-.07,4.23,1,5.49a5.15,5.15,0,0,0,4.12,1.65H659.54c2.18,0,3.71-.53,4.67-1.61s1.43-3,1.13-5.68A81.89,81.89,0,0,1,664.34,238.54Z" />
                  }
                  {!underToggle && <Path
                    fill={this.state.notSelectedColor}
                    onPress={this.underToggled}
                    d="M664.34,238.54a80.67,80.67,0,0,1,13.19-44.3c.49-1.93.34-3.42-.45-4.43C675.7,188,672.62,188,671,188H255.89a5.7,5.7,0,0,0-2.94.75,5,5,0,0,0-1.88,1.92,5.17,5.17,0,0,0,.24,5.31,163.25,163.25,0,0,1,9,20.48A69.92,69.92,0,0,1,264.18,239a75.52,75.52,0,0,1-.94,12.39c-.4,2.39-.07,4.23,1,5.49a5.15,5.15,0,0,0,4.12,1.65H659.54c2.18,0,3.71-.53,4.67-1.61s1.43-3,1.13-5.68A81.89,81.89,0,0,1,664.34,238.54Z" />
                  }
                  {/*Center*/}
                  {centerToggle &&
                    <G>
                      <Path
                        onPress={this.centerToggled}
                        fill={this.state.selectedColor}
                        d="M304.75,168.31c1.09,3,2.52,4.92,4.52,6a13.39,13.39,0,0,0,6.62,1.3H680.1c1.17,0,2.25,0,3.3.07h0c1,0,1.87.06,2.76.06h0A17.29,17.29,0,0,0,697.8,172c13.14-9.88,28.59-14.89,45.92-14.89,1,0,2,0,3.08,0l1.44,0c2.88,0,4.6-.43,5.93-1.48,1.59-1.26,2.56-3.45,3.05-6.9,3-21.46,11.19-74.76,15.31-95.92.67-3.41.41-5.77-.82-7.65s-3.23-3.19-6.9-4.68c-14.59-5.93-42.88-17-46-18.27l-.09,0a56.59,56.59,0,0,0-8.07-3,232.08,232.08,0,0,0-28.77-6.55c-16-2.77-35-5-56.32-6.55-26.68-2-57.21-3-90.73-3-17.57,0-33.14.36-47.59,1.1s-27.38,1.84-39.5,3.36c-11.95,1.49-22.8,3.36-33.16,5.69A261.41,261.41,0,0,0,386,21.46c-35.83,12.47-64.22,31.68-103.51,58.28l-.33.22-6.68,4.52c-2.34,1.58-3.74,3-4.41,4.57a6.09,6.09,0,0,0,.34,5.25C278.33,109.05,297,151,304.75,168.31Z" />
                      <Path onPress={this.centerToggled}
                        fill={this.state.backgroundColor} id="RWindow-2" data-name="RWindow" class="cls-2" d="M531.3,98.34c2-19.92,7.24-74.09,7.24-74.09s1-9.66,10-9.72,77.58,2.41,96.53,5.73S672.92,39.4,672.92,39.4,690,75.66,696.46,87.93c5.65,10.76,7.07,17.53-6.4,17.53-44.19,0-69.83-1.59-151.13,0C533.15,105.46,530.93,102.05,531.3,98.34Z" />
                      <Path onPress={this.centerToggled}
                        fill={this.state.backgroundColor} id="fWindow-2" data-name="fWindow" class="cls-2" d="M310.74,98.8c-.23-5.62,6.07-12.34,20.56-24.3,20.27-16.75,53.06-33.82,69.92-40.8,14.23-5.89,23.59-7.53,38.17-10.9s44.29-7.37,70.2-7.83c7,.13,14,.69,11.69,10.94-1.82,8.08-9.77,52.4-14.3,70.61-1.82,7.32-5,8.49-10.38,8.49H318.08C317.62,105,310.74,105.09,310.74,98.8Z" />
                    </G>
                  }
                  {!centerToggle && <G>
                    <Path
                      onPress={this.centerToggled}
                      fill={this.state.notSelectedColor}
                      d="M304.75,168.31c1.09,3,2.52,4.92,4.52,6a13.39,13.39,0,0,0,6.62,1.3H680.1c1.17,0,2.25,0,3.3.07h0c1,0,1.87.06,2.76.06h0A17.29,17.29,0,0,0,697.8,172c13.14-9.88,28.59-14.89,45.92-14.89,1,0,2,0,3.08,0l1.44,0c2.88,0,4.6-.43,5.93-1.48,1.59-1.26,2.56-3.45,3.05-6.9,3-21.46,11.19-74.76,15.31-95.92.67-3.41.41-5.77-.82-7.65s-3.23-3.19-6.9-4.68c-14.59-5.93-42.88-17-46-18.27l-.09,0a56.59,56.59,0,0,0-8.07-3,232.08,232.08,0,0,0-28.77-6.55c-16-2.77-35-5-56.32-6.55-26.68-2-57.21-3-90.73-3-17.57,0-33.14.36-47.59,1.1s-27.38,1.84-39.5,3.36c-11.95,1.49-22.8,3.36-33.16,5.69A261.41,261.41,0,0,0,386,21.46c-35.83,12.47-64.22,31.68-103.51,58.28l-.33.22-6.68,4.52c-2.34,1.58-3.74,3-4.41,4.57a6.09,6.09,0,0,0,.34,5.25C278.33,109.05,297,151,304.75,168.31Z" />
                    <Path onPress={this.centerToggled}
                      fill={this.state.backgroundColor} id="RWindow-2" data-name="RWindow" class="cls-2" d="M531.3,98.34c2-19.92,7.24-74.09,7.24-74.09s1-9.66,10-9.72,77.58,2.41,96.53,5.73S672.92,39.4,672.92,39.4,690,75.66,696.46,87.93c5.65,10.76,7.07,17.53-6.4,17.53-44.19,0-69.83-1.59-151.13,0C533.15,105.46,530.93,102.05,531.3,98.34Z" />
                    <Path onPress={this.centerToggled}
                      fill={this.state.backgroundColor} id="fWindow-2" data-name="fWindow" class="cls-2" d="M310.74,98.8c-.23-5.62,6.07-12.34,20.56-24.3,20.27-16.75,53.06-33.82,69.92-40.8,14.23-5.89,23.59-7.53,38.17-10.9s44.29-7.37,70.2-7.83c7,.13,14,.69,11.69,10.94-1.82,8.08-9.77,52.4-14.3,70.61-1.82,7.32-5,8.49-10.38,8.49H318.08C317.62,105,310.74,105.09,310.74,98.8Z" />
                  </G>
                  }
                  {/*Wheels*/}
                  {underToggle &&
                    <G>
                      <Path
                        fill={this.state.selectedColor}
                        onPress={this.underToggled} d="M745.33,170.89A68.59,68.59,0,1,0,793.84,191,68.11,68.11,0,0,0,745.33,170.89Zm0,112.42a44.78,44.78,0,1,1,44.78-44.78A44.83,44.83,0,0,1,745.33,283.31Z" />
                      <Path onPress={this.underToggled} fill={this.state.selectedColor} id="bWheelPizza" class="cls-1" d="M731.74,268.72a18.39,18.39,0,0,0,3.31,1.82,23.61,23.61,0,0,0,8.63,2l1.3,0c5.92,0,9.21-1.47,9.57-1.64l-9.71-20.3Z" />
                      <Path onPress={this.underToggled} fill={this.state.selectedColor} id="bWheelPizza-2" data-name="bWheelPizza" class="cls-1" d="M764.25,264.75h0a19.54,19.54,0,0,0,3.16-2.07,23.84,23.84,0,0,0,5.82-6.67c3.44-5.95,3.67-10.18,3.67-10.36l-22.48-1Z" />
                      <Path onPress={this.underToggled} fill={this.state.selectedColor} id="bWheelPizza-3" data-name="bWheelPizza" class="cls-1" d="M767.26,214.84l-12.07,19,22.28,1.51h0a19.83,19.83,0,0,0-.21-3.77,24,24,0,0,0-2.87-8.38C771,217.25,767.41,214.94,767.26,214.84Z" />
                      <Path onPress={this.underToggled} fill={this.state.selectedColor} id="bWheelPizza-4" data-name="bWheelPizza" class="cls-1" d="M735.6,243.61l-22.25-1.9a19,19,0,0,0,.14,3.77,23.66,23.66,0,0,0,2.73,8.43c3.35,6,6.94,8.46,7,8.48h0Z" />
                      <Path onPress={this.underToggled} fill={this.state.selectedColor} id="bWheelPizza-5" data-name="bWheelPizza" class="cls-1" d="M736.16,232.62l-9.48-20.21a18.22,18.22,0,0,0-3.19,2,23.45,23.45,0,0,0-5.94,6.57,31,31,0,0,0-3.27,7.31,15.1,15.1,0,0,0-.58,3l22.45,1.35Z" />
                      <Path onPress={this.underToggled} fill={this.state.selectedColor} id="bWheelPizza-6" data-name="bWheelPizza" class="cls-1" d="M745.83,227l12.77-18.32a19.7,19.7,0,0,0-3.34-1.76A23.83,23.83,0,0,0,746.6,205h-.67c-6.32,0-9.79,1.63-10.16,1.81L745.83,227Z" />
                      <Path onPress={this.underToggled} fill={this.state.backgroundColor} id="bWheelHollow" class="cls-2" d="M745.33,193.75a44.78,44.78,0,1,0,44.78,44.78A44.84,44.84,0,0,0,745.33,193.75Zm.6,11.28h.67a23.83,23.83,0,0,1,8.66,1.85,19.7,19.7,0,0,1,3.34,1.76L745.83,227h0l-10.06-20.13C736.14,206.66,739.61,205,745.93,205ZM714.28,228.3a31,31,0,0,1,3.27-7.31,23.45,23.45,0,0,1,5.94-6.57,18.22,18.22,0,0,1,3.19-2l9.48,20.21h0l-22.45-1.35A15.1,15.1,0,0,1,714.28,228.3Zm1.94,25.61a23.66,23.66,0,0,1-2.73-8.43,19,19,0,0,1-.14-3.77l22.25,1.9-12.4,18.78h0S719.57,260,716.22,253.91ZM745,272.57l-1.3,0a23.61,23.61,0,0,1-8.63-2,18.39,18.39,0,0,1-3.31-1.82l13.1-18.09,9.71,20.3C754.19,271.1,750.9,272.57,745,272.57ZM773.23,256a23.84,23.84,0,0,1-5.82,6.67,19.54,19.54,0,0,1-3.16,2.07h0l-9.83-20.05,22.48,1C776.9,245.83,776.67,250.06,773.23,256Zm4.24-20.67h0l-22.28-1.51,12.07-19c.15.1,3.7,2.41,7.13,8.35a24,24,0,0,1,2.87,8.38A19.83,19.83,0,0,1,777.47,235.34Z" />
                    </G>
                  }
                  {underToggle &&
                    <G id="fWheel">
                      <Path onPress={this.underToggled} fill={this.state.selectedColor} id="fWheelPizza" class="cls-1" d="M200.2,264.75h0a19.9,19.9,0,0,0,3.15-2.07,23.68,23.68,0,0,0,5.82-6.67,31.24,31.24,0,0,0,3.12-7.34,15.36,15.36,0,0,0,.56-3h0l-22.48-1Z" />
                      <Path
                        fill={this.state.selectedColor}
                        onPress={this.underToggled} d="M181.29,170.89A68.59,68.59,0,1,0,229.79,191,68.14,68.14,0,0,0,181.29,170.89Zm0,112.42a44.78,44.78,0,1,1,44.78-44.78A44.82,44.82,0,0,1,181.29,283.31Z" />
                      <Path onPress={this.underToggled} fill={this.state.selectedColor} id="fWheelPizza-2" data-name="fWheelPizza" class="cls-1" d="M203.21,214.84l-12.07,19,22.28,1.51h0a19.83,19.83,0,0,0-.21-3.77,23.77,23.77,0,0,0-2.87-8.38C206.91,217.25,203.36,214.94,203.21,214.84Z" />
                      <Path onPress={this.underToggled} fill={this.state.selectedColor} id="fWheelPizza-3" data-name="fWheelPizza" class="cls-1" d="M167.7,268.72a18.3,18.3,0,0,0,3.3,1.82,23.61,23.61,0,0,0,8.63,2l1.31,0c5.92,0,9.2-1.47,9.56-1.64l-9.71-20.3Z" />
                      <Path onPress={this.underToggled} fill={this.state.selectedColor} id="fWheelPizza-4" data-name="fWheelPizza" class="cls-1" d="M194.55,208.65a20,20,0,0,0-3.33-1.76,23.92,23.92,0,0,0-8.66-1.85h-.68a25.06,25.06,0,0,0-10.16,1.81L181.78,227Z" />
                      <Path onPress={this.underToggled} fill={this.state.selectedColor} id="fWheelPizza-5" data-name="fWheelPizza" class="cls-1" d="M172.11,232.63l-9.48-20.22a18.83,18.83,0,0,0-3.19,2A23.73,23.73,0,0,0,153.5,221a30.63,30.63,0,0,0-3.26,7.3,14.66,14.66,0,0,0-.59,3l22.46,1.35Z" />
                      <Path onPress={this.underToggled} fill={this.state.selectedColor} id="fwheelPizza-6" data-name="fwheelPizza" class="cls-1" d="M149.3,241.71a18.29,18.29,0,0,0,.15,3.77,23.64,23.64,0,0,0,2.72,8.43c3.4,6.15,7,8.46,7,8.48l12.4-18.78Z" />
                      <Path onPress={this.underToggled} fill={this.state.backgroundColor} id="fWheelHollow" class="cls-2" d="M181.29,193.75a44.78,44.78,0,1,0,44.78,44.78A44.83,44.83,0,0,0,181.29,193.75Zm.59,11.28h.68a23.51,23.51,0,0,1,8.66,1.85,19.28,19.28,0,0,1,3.33,1.76L181.78,227h0l-10.06-20.13C172.09,206.66,175.56,205,181.88,205ZM150.24,228.3A30.52,30.52,0,0,1,153.5,221a23.45,23.45,0,0,1,5.94-6.57,18.88,18.88,0,0,1,3.19-2l9.48,20.22h0l-22.46-1.34A14.43,14.43,0,0,1,150.24,228.3Zm1.93,25.61a23.64,23.64,0,0,1-2.72-8.43,19,19,0,0,1-.15-3.77l22.25,1.9-12.4,18.78h0S155.52,260,152.17,253.91Zm28.77,18.66-1.31,0a23.75,23.75,0,0,1-8.62-2,18.39,18.39,0,0,1-3.31-1.82l13.09-18.09,9.71,20.3A23.78,23.78,0,0,1,180.94,272.57ZM209.18,256a23.68,23.68,0,0,1-5.82,6.67,19.9,19.9,0,0,1-3.15,2.07h0l-9.83-20.05,22.48,1C212.85,245.83,212.62,250.06,209.18,256Zm4.24-20.67h0l-22.28-1.51,12.07-19c.15.1,3.7,2.41,7.13,8.35a23.77,23.77,0,0,1,2.87,8.38A18.32,18.32,0,0,1,213.42,235.34Z" />
                    </G>

                  }

                  {!underToggle &&
                    <G>
                      <Path
                        fill={this.state.notSelectedColor}
                        onPress={this.underToggled} d="M745.33,170.89A68.59,68.59,0,1,0,793.84,191,68.11,68.11,0,0,0,745.33,170.89Zm0,112.42a44.78,44.78,0,1,1,44.78-44.78A44.83,44.83,0,0,1,745.33,283.31Z" />
                      <Path onPress={this.underToggled} fill={this.state.notSelectedColor} id="bWheelPizza" class="cls-1" d="M731.74,268.72a18.39,18.39,0,0,0,3.31,1.82,23.61,23.61,0,0,0,8.63,2l1.3,0c5.92,0,9.21-1.47,9.57-1.64l-9.71-20.3Z" />
                      <Path onPress={this.underToggled} fill={this.state.notSelectedColor} id="bWheelPizza-2" data-name="bWheelPizza" class="cls-1" d="M764.25,264.75h0a19.54,19.54,0,0,0,3.16-2.07,23.84,23.84,0,0,0,5.82-6.67c3.44-5.95,3.67-10.18,3.67-10.36l-22.48-1Z" />
                      <Path onPress={this.underToggled} fill={this.state.notSelectedColor} id="bWheelPizza-3" data-name="bWheelPizza" class="cls-1" d="M767.26,214.84l-12.07,19,22.28,1.51h0a19.83,19.83,0,0,0-.21-3.77,24,24,0,0,0-2.87-8.38C771,217.25,767.41,214.94,767.26,214.84Z" />
                      <Path onPress={this.underToggled} fill={this.state.notSelectedColor} id="bWheelPizza-4" data-name="bWheelPizza" class="cls-1" d="M735.6,243.61l-22.25-1.9a19,19,0,0,0,.14,3.77,23.66,23.66,0,0,0,2.73,8.43c3.35,6,6.94,8.46,7,8.48h0Z" />
                      <Path onPress={this.underToggled} fill={this.state.notSelectedColor} id="bWheelPizza-5" data-name="bWheelPizza" class="cls-1" d="M736.16,232.62l-9.48-20.21a18.22,18.22,0,0,0-3.19,2,23.45,23.45,0,0,0-5.94,6.57,31,31,0,0,0-3.27,7.31,15.1,15.1,0,0,0-.58,3l22.45,1.35Z" />
                      <Path onPress={this.underToggled} fill={this.state.notSelectedColor} id="bWheelPizza-6" data-name="bWheelPizza" class="cls-1" d="M745.83,227l12.77-18.32a19.7,19.7,0,0,0-3.34-1.76A23.83,23.83,0,0,0,746.6,205h-.67c-6.32,0-9.79,1.63-10.16,1.81L745.83,227Z" />
                      <Path onPress={this.underToggled} fill={this.state.backgroundColor} id="bWheelHollow" class="cls-2" d="M745.33,193.75a44.78,44.78,0,1,0,44.78,44.78A44.84,44.84,0,0,0,745.33,193.75Zm.6,11.28h.67a23.83,23.83,0,0,1,8.66,1.85,19.7,19.7,0,0,1,3.34,1.76L745.83,227h0l-10.06-20.13C736.14,206.66,739.61,205,745.93,205ZM714.28,228.3a31,31,0,0,1,3.27-7.31,23.45,23.45,0,0,1,5.94-6.57,18.22,18.22,0,0,1,3.19-2l9.48,20.21h0l-22.45-1.35A15.1,15.1,0,0,1,714.28,228.3Zm1.94,25.61a23.66,23.66,0,0,1-2.73-8.43,19,19,0,0,1-.14-3.77l22.25,1.9-12.4,18.78h0S719.57,260,716.22,253.91ZM745,272.57l-1.3,0a23.61,23.61,0,0,1-8.63-2,18.39,18.39,0,0,1-3.31-1.82l13.1-18.09,9.71,20.3C754.19,271.1,750.9,272.57,745,272.57ZM773.23,256a23.84,23.84,0,0,1-5.82,6.67,19.54,19.54,0,0,1-3.16,2.07h0l-9.83-20.05,22.48,1C776.9,245.83,776.67,250.06,773.23,256Zm4.24-20.67h0l-22.28-1.51,12.07-19c.15.1,3.7,2.41,7.13,8.35a24,24,0,0,1,2.87,8.38A19.83,19.83,0,0,1,777.47,235.34Z" />
                    </G>
                  }
                  {!underToggle &&
                    <G id="fWheel">
                      <Path onPress={this.underToggled} fill={this.state.notSelectedColor} id="fWheelPizza" class="cls-1" d="M200.2,264.75h0a19.9,19.9,0,0,0,3.15-2.07,23.68,23.68,0,0,0,5.82-6.67,31.24,31.24,0,0,0,3.12-7.34,15.36,15.36,0,0,0,.56-3h0l-22.48-1Z" />
                      <Path
                        fill={this.state.notSelectedColor}
                        onPress={this.underToggled} d="M181.29,170.89A68.59,68.59,0,1,0,229.79,191,68.14,68.14,0,0,0,181.29,170.89Zm0,112.42a44.78,44.78,0,1,1,44.78-44.78A44.82,44.82,0,0,1,181.29,283.31Z" />

                      <Path onPress={this.underToggled} fill={this.state.notSelectedColor} id="fWheelPizza-2" data-name="fWheelPizza" class="cls-1" d="M203.21,214.84l-12.07,19,22.28,1.51h0a19.83,19.83,0,0,0-.21-3.77,23.77,23.77,0,0,0-2.87-8.38C206.91,217.25,203.36,214.94,203.21,214.84Z" />
                      <Path onPress={this.underToggled} fill={this.state.notSelectedColor} id="fWheelPizza-3" data-name="fWheelPizza" class="cls-1" d="M167.7,268.72a18.3,18.3,0,0,0,3.3,1.82,23.61,23.61,0,0,0,8.63,2l1.31,0c5.92,0,9.2-1.47,9.56-1.64l-9.71-20.3Z" />
                      <Path onPress={this.underToggled} fill={this.state.notSelectedColor} id="fWheelPizza-4" data-name="fWheelPizza" class="cls-1" d="M194.55,208.65a20,20,0,0,0-3.33-1.76,23.92,23.92,0,0,0-8.66-1.85h-.68a25.06,25.06,0,0,0-10.16,1.81L181.78,227Z" />
                      <Path onPress={this.underToggled} fill={this.state.notSelectedColor} id="fWheelPizza-5" data-name="fWheelPizza" class="cls-1" d="M172.11,232.63l-9.48-20.22a18.83,18.83,0,0,0-3.19,2A23.73,23.73,0,0,0,153.5,221a30.63,30.63,0,0,0-3.26,7.3,14.66,14.66,0,0,0-.59,3l22.46,1.35Z" />
                      <Path onPress={this.underToggled} fill={this.state.notSelectedColor} id="fwheelPizza-6" data-name="fwheelPizza" class="cls-1" d="M149.3,241.71a18.29,18.29,0,0,0,.15,3.77,23.64,23.64,0,0,0,2.72,8.43c3.4,6.15,7,8.46,7,8.48l12.4-18.78Z" />
                      <Path onPress={this.underToggled} fill={this.state.backgroundColor} id="fWheelHollow" class="cls-2" d="M181.29,193.75a44.78,44.78,0,1,0,44.78,44.78A44.83,44.83,0,0,0,181.29,193.75Zm.59,11.28h.68a23.51,23.51,0,0,1,8.66,1.85,19.28,19.28,0,0,1,3.33,1.76L181.78,227h0l-10.06-20.13C172.09,206.66,175.56,205,181.88,205ZM150.24,228.3A30.52,30.52,0,0,1,153.5,221a23.45,23.45,0,0,1,5.94-6.57,18.88,18.88,0,0,1,3.19-2l9.48,20.22h0l-22.46-1.34A14.43,14.43,0,0,1,150.24,228.3Zm1.93,25.61a23.64,23.64,0,0,1-2.72-8.43,19,19,0,0,1-.15-3.77l22.25,1.9-12.4,18.78h0S155.52,260,152.17,253.91Zm28.77,18.66-1.31,0a23.75,23.75,0,0,1-8.62-2,18.39,18.39,0,0,1-3.31-1.82l13.09-18.09,9.71,20.3A23.78,23.78,0,0,1,180.94,272.57ZM209.18,256a23.68,23.68,0,0,1-5.82,6.67,19.9,19.9,0,0,1-3.15,2.07h0l-9.83-20.05,22.48,1C212.85,245.83,212.62,250.06,209.18,256Zm4.24-20.67h0l-22.28-1.51,12.07-19c.15.1,3.7,2.41,7.13,8.35a23.77,23.77,0,0,1,2.87,8.38A18.32,18.32,0,0,1,213.42,235.34Z" />
                    </G>
                  }

                </Svg>
              </View>
            </LinearGradient>
          </View>
        }

        {this.state.isLoading &&
          <ActivityIndicator size="large" color="#0000ff" />
        }

        {!this.state.isLoading &&

          <ScrollableTabView
            onChangeTab={this.onTabChanged.bind(this)}
            refreshControlStyle={{}}
            renderTabBar={() => <ScrollableTabBar onScroll={this.onScrollTab} />}
            style={{ backgroundColor: "#0D2847" }}
            tabBarTextStyle={{ color: "white", textAlign: "center", fontSize: 18 }}
            tabBarUnderlineStyle={{ backgroundColor: "white" }}
            ref={(tabView) => { this.tabView = tabView; }}
            page={this.state.activeTab}
            initialPage={this.state.initialPage}>

            <ScrollView tabLabel={"Front/Engine"} style={styles.scroller}>
              <View style={styles.scroller}>
                <Container>
                  <Content>
                    {this.state.showPlayerControls ? (
                      <Header
                        ref={ref3}
                        centerComponent={{ text: 'Includes: Engine, Grill, Headlights, Bumpers', style: { color: '#fff', fontSize: 16, marginBottom: 20 } }}
                        rightComponent={<Ionicons name="md-close-circle" size={20} color="white" style={{ marginBottom: 20, padding: 15 }} onPress={() => this.hidePlayerControls()} />}
                        containerStyle={{
                          backgroundColor: 'black',
                          justifyContent: 'center',
                          height: 70,
                          top: 0,
                        }}
                      />
                    ) : null}

                    {this.state.front &&
                      this.state.front.map(concealment => (
                        <ListItem
                          key={concealment._id}
                          leftAvatar={{ rounded: false, source: { uri: `${apiCred.ip}/${concealment.src[0]}` } }}
                          title={concealment.title}
                          onPress={() => navigate('Details', { data: concealment, id: this.state.id, zone: this.state.currentTab })}
                        />
                      ), )

                    }

                    {!this.state.front &&
                      <Text style={styles.noConcealment}>No concealment methods</Text>
                    }

                  </Content>
                </Container>
              </View>

            </ScrollView>

            <ScrollView tabLabel={"Center/Cabin"} style={styles.scroller}>
              <View style={styles.scroller}>
                <Container>

                  <Content>
                    {this.state.showPlayerControls ? (
                      <Header
                        ref={ref3}
                        centerComponent={{ text: 'Includes: Seats, Doors, Mirrors', style: { color: '#fff', fontSize: 16, marginBottom: 20 } }}
                        rightComponent={<Ionicons name="md-close-circle" size={20} color="white" style={{ marginBottom: 20, padding: 15 }} onPress={() => this.hidePlayerControls()} />}
                        containerStyle={{
                          backgroundColor: 'black',
                          justifyContent: 'center',
                          height: 70,


                        }}
                      />
                    ) : null}
                    {this.state.center &&
                      this.state.center.map(concealment => (

                        <ListItem
                          key={concealment._id}
                          leftAvatar={{ rounded: false, source: { uri: `${apiCred.ip}/${concealment.src[0]}` } }}
                          title={concealment.title}
                          onPress={() => navigate('Details', { data: concealment, id: this.state.id, zone: this.state.currentTab })}
                        />
                      ), )

                    }

                    {!this.state.center &&
                      <Text style={styles.noConcealment}>No concealment methods</Text>
                    }
                  </Content>
                </Container >


              </View>
            </ScrollView>

            <ScrollView tabLabel={"Undercarriage/Wheels"} style={styles.scroller}>
              <View style={styles.scroller}>
                <Container >
                  <Content>
                    {this.state.showPlayerControls ? (
                      <Header
                        ref={ref3}
                        centerComponent={{ text: 'Includes: Wheels, Frame', style: { color: '#fff', fontSize: 16, marginBottom: 20 } }}
                        rightComponent={<Ionicons name="md-close-circle" size={20} color="white" style={{ marginBottom: 20, padding: 15 }} onPress={() => this.hidePlayerControls()} />}
                        containerStyle={{
                          backgroundColor: 'black',
                          justifyContent: 'center',
                          height: 70,
                        }}
                      />
                    ) : null}
                    {this.state.undercarriage &&
                      this.state.undercarriage.map(concealment => (
                        <ListItem
                          key={concealment._id}
                          leftAvatar={{ rounded: false, source: { uri: `${apiCred.ip}/${concealment.src[0]}` } }}
                          title={concealment.title}
                          onPress={() => navigate('Details', { data: concealment, id: this.state.id, zone: this.state.currentTab })}
                        />
                      ), )

                    }
                    {!this.state.undercarriage &&
                      <Text style={styles.noConcealment}>No concealment methods</Text>
                    }
                  </Content>
                </Container >
              </View>
            </ScrollView>

            <ScrollView tabLabel={"Rear/Trunk"} style={styles.scroller}>
              <View style={styles.scroller}>
                <Container >

                  <Content>
                    {this.state.showPlayerControls ? (
                      <Header
                        ref={ref3}
                        centerComponent={{ text: 'Includes: Trunk, Taillights, Mirrors', style: { color: '#fff', fontSize: 16, marginBottom: 20 } }}
                        rightComponent={<Ionicons name="md-close-circle" size={20} color="white" style={{ marginBottom: 20, padding: 15 }} onPress={() => this.hidePlayerControls()} />}
                        containerStyle={{
                          backgroundColor: 'black',
                          justifyContent: 'center',
                          height: 70,
                        }}
                      >
                      </Header>
                    ) : null}
                    {this.state.rear &&
                      this.state.rear.map(concealment => (
                        <ListItem

                          key={concealment._id}
                          leftAvatar={{ rounded: false, source: { uri: `${apiCred.ip}${concealment.src[0]}` } }}
                          title={concealment.title}
                          onPress={() => navigate('Details', { data: concealment, id: this.state.id, zone: this.state.currentTab })}
                        />
                      ), )
                    }

                    {!this.state.rear &&
                      <Text style={styles.noConcealment}>No concealment methods</Text>
                    }

                  </Content>
                </Container >


              </View>
            </ScrollView>

          </ScrollableTabView>
        }

        <Container style={{ display: "none" }}>
          <Button onPress={() => {
            backToggle = false;
            frontToggle = true;
            centerToggle = false;
            underToggle = false;
            this.setState({ refresh: !this.state.refresh })
            navigate('Search')

          }} ref={ref} title="Press Me" >

          </Button>
        </Container>

        <Container style={{ display: "none" }}>
          <Button onPress={() => { this.showPlayerControls() }} ref={ref2} title="Press Me" >

          </Button>
        </Container>

        <Container style={{ display: "none" }}>
          <Button onPress={() => { this.showPlayerControls() }} ref={ref3} title="Press Me" >

          </Button>
        </Container>

        <FloatingAction
          color={"#4AA7D1"}
          onPressMain={(yo) => {
            this.setState({ methodHave: true })
            navigate('Add', {
              data: this.state.data,
              onNavigateBack: this.handleOnNavigateBack,
              zone: this.state.currentTab
            })
          }}
          showBackground={false}
          onStateChange={(yo) => { yo.isActive ? this.setState({ isActive: false }) : this.setState({ isActive: false }) }}
          floatingIcon={<Image style={{ width: 30, height: 30 }} source={require('../assets/add.png')} />}

        />
      </Container>
    )
  }

}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0D2847"
  },

  innerContainer: {
    //maxWidth: "auto",
    height: 200,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  listLabelText: {
    fontWeight: "600",
    fontSize: 15,
    color: "grey"
  },

  itemPicker: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 1,
    backgroundColor: "#183553",
    textAlign: "center",
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

  buttonHidden: {
    display: "none"
  },

  noConcealment: {
    color: "#000",
    textAlign: "center",
    marginTop: 50
  },

  titleText: {
    fontSize: 24,
    textAlign: "center",
    color: "#fff"
  },
  scroller: {
    height: 400,
    marginBottom: 2
  },

})