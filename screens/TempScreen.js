import React from 'react';
import {  View, StyleSheet, Button, Image, ImageBackground } from 'react-native';

import CustomHeader from '../components/CustomHeader'


// class HomeHeader extends React.Component {
//   render() {
//     return (
//       <Header style={{ paddingTop: 20, width: '100%', justifyContent: 'flex-start' }}>
//           <Left>
//             <Button transparent onPress={() => { this.props.navigation.navigate('AuthScreen') }}>
//               <Icon name='arrow-back' />
//             </Button>
//           </Left>
//           <Body>
//             <Title>Header</Title>
//           </Body>
//           <Right>
//             <Button transparent>
//               <Icon name='menu' />
//             </Button>
//           </Right>
//         </Header>
//     )
//   }
// }

export default class TempScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (

      <View style={styles.container} >
        <ImageBackground source={require('../assets/images/selection_background.png')} style={styles.background}>
          <CustomHeader />
          <View style={styles.blank}></View>
          <View style={styles.row}>
            <View style={styles.buttonContainer}>
              <Button title="SHOP" onPress={() => { }} style={styles.buttonContainer}></Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button title="PLAY" onPress={() => { alert('salam') }} style={styles.buttonContainer}></Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button title="EAT" onPress={() => { }} style={styles.buttonContainer}></Button>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.buttonContainer}>
              <Button title="STAY" onPress={() => { }} style={styles.buttonContainer}>
              </Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button title="EVENTS" onPress={() => {
                this.props.navigation.navigate('AuthScreen')

              }} style={styles.buttonContainer}></Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button title="SERVICES" onPress={() => { }} style={styles.buttonContainer}></Button>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.buttonContainer}>
              <Button title="DEALS" onPress={() => {
                this.props.navigation.navigate('ArminScreen')
              }} />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="MAP"
                onPress={
                  () => this.props.navigation.navigate('MapsScreen')
                } />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="SEARCH" style={{}} onPress={
                () => this.props.navigation.navigate('SearchScreen')
              } />
            </View>
          </View>
        </ImageBackground>
      </View >
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%', height: "100%",
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blank: { flex: 7, flexDirection: 'column', alignItems: "stretch", width: '100%' },
  buttonContainer: {
    flex: 1, margin: 12, backgroundColor: '#33C7FF', color: '#ffffff'

  },
  buttons: {
    flex: 1, margin: 12, backgroundColor: '#33C7FF', color: '#ffffff'
  }, background: { height: "100%", width: '100%' }
});