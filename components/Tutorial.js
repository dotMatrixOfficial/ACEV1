import React, { Component } from 'react';
import { Image } from 'react-native';
import {Button } from 'native-base';
import Onboarding from 'react-native-onboarding-swiper';


const ref = React.createRef();

export default class Tutorial extends Component {
    constructor(props) {
      super(props);
    }

    static navigationOptions = {
      headerTransparent: true,
      headerStyle:{
        backgroundColor: "transparent"
      }
    }

    done = () => {
      return (<Button
        title='Done'
       
      />)
      };
   
    render() {
      const { navigate } = this.props.navigation;
      const Done = ({

      })

      return(
      <Onboarding 
      skipToPage={2}
      DoneButtonComponent={() => (
        <Button
          title={'Done'}
        onPress={(ev)=>{navigate('Search')}}><Image style={{width:10, height:10}} source={require('../assets/icon.png')}/></Button>
      )}
      pages={[
        {
          backgroundColor: '#0D2847',
          image: <Image style={{width:256, height:256}} source={require('../assets/onb_search.png')} />,
          title: 'Quick and easy search',
          subtitle: 'Find a vehicle by Make, Model & Year',
        },
        {
          backgroundColor: '#0D2847',
          image: <Image style={{width:256, height:256}} source={require('../assets/onb_bino.png')} />,
          title: 'Browse hiding spots',
          subtitle: 'View a list of concealment methods filtered by four vehicle zones',
        },
        {
          backgroundColor: '#0D2847',
          image: <Image style={{width:256, height:256}} source={require('../assets/onb_doc.png')} />,
          title: 'Document new findings',
          subtitle: 'Create reports for newly discovered and existing concealment methods',
        },
      ]}/>)
      }
  }