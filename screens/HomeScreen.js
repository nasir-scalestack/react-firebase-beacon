import React from 'react';
import { Platform, View, StyleSheet, Button, Image, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { fetchBeaconData } from '../redux/modules/beacons';
import CustomHeader from '../components/CustomHeader'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home ',
    headerStyle: {
      backgroundColor: 'blue',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },

  };

  componentWillMount() {
    this.props.fetchBeaconData();
  }
  
  render() {
    return (

      <View style={styles.container} >
        <ImageBackground source={require('../assets/images/selection_background.png')} style={styles.background}>
          {/* <CustomHeader /> */}
          <View style={styles.blank}></View>
          <View style={styles.row}>
            <View style={styles.buttonContainer}>
              <Button title="SHOP" onPress={() => { () => this.props.navigation.navigate('SearchScreen') }} style={styles.buttonContainer}></Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button title="PLAY" onPress={() => { () => this.props.navigation.navigate('SearchScreen') }} style={styles.buttonContainer}></Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button title="EAT" onPress={() => { () => this.props.navigation.navigate('SearchScreen') }} style={styles.buttonContainer}></Button>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.buttonContainer}>
              <Button title="STAY" onPress={() => {
                () => this.props.navigation.navigate('SearchScreen')
              }} style={styles.buttonContainer}>
              </Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button title="EVENTS" onPress={() => {
                () => this.props.navigation.navigate('SearchScreen')

              }} style={styles.buttonContainer}></Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button title="SERVICES" onPress={() => {
                () => this.props.navigation.navigate('SearchScreen')
              }} style={styles.buttonContainer}></Button>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.buttonContainer}>
              <Button title="DEALS" onPress={() => {
                () => this.props.navigation.navigate('SearchScreen')
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
    alignItems: 'stretch',
    justifyContent: 'center',
    
  },
  blank: { flex: 7, flexDirection: 'column', alignItems: "stretch", width: '100%' },
  buttonContainer: {
    flex: 1, margin: 5, backgroundColor: '#3387FF', alignItems : "stretch"

  },
  buttons: {
    flex: 1, backgroundColor: '#3387FF', color: '#ffffff', alignItems : "stretch"
  }, background: { height: "100%", width: '100%' }
});

const mapStateToProps = state => ({
  beacons: state.beacons
})
export default connect(mapStateToProps, { fetchBeaconData })(HomeScreen)