import React, { Component, Button } from 'react';
import { WebView } from 'react-native';
import {Icon } from 'native-base'
 // const  url  = this.props.navigation.getParam('key1', 'https://github.com/facebook/react-native')

export default class ContentScreen extends  React.Component {
  constructor(props) {
    super(props);
    this.state = {
        url: ''
    };
}
static navigationOptions = {
  // header: AuthScreen,

  title: 'Content ',
  headerLeft: (
    <Icon name={'chevron-left'} onPress={() => this.props.navigation.navigate(goBack())}
      
      title="Info"
      color="#fff"
    />
  ),
  headerStyle: {
    backgroundColor: 'blue',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },

};

    

    render() {
    return (
       
      <WebView
        source = {{uri : this.props.navigation.getParam('key1', 'https://thebeachlifeapplogin.com')}}

        style={{marginTop: 20}}

      />
    );
  }
}