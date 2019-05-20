import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ImageBackground,
  Button,
  TouchableOpacity,
  View
} from 'react-native';
import { ExpoConfigView } from '@expo/samples';
import { auth } from '../firebase';



export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    // header: AuthScreen,
    title: 'Settings ',
    // headerLeft: (
    //   <Button
    //     onPress={() => this.props.navigation.navigate(goBack())}
    //     S
    //     title="Info"
    //     color="#fff"
    //   />
    // ),
    headerStyle: {
      backgroundColor: 'blue',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Button title='Back to Auth Page!' style={styles.items} onPress={() => { this.props.navigation.navigate('AuthScreen') }}></Button> */}
        <Button title='SignOut of all Accounts' style={styles.items} onPress={() => {
          alert('Aree you sure you want to sign out. You cant use all features of the app if you dont sigin in')
          auth.signOut()
          this.props.navigation.navigate('AuthScreen')
        }}>
        </Button>

      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: "center",
    backgroundColor: 'yellow'
  },
  items: {
    flex: 1,
    margin: 10,

  },
  buttonContainer: {
    flex: 1, margin: 12, backgroundColor: '#aa00aa', color: '#ffffff'

  }
});