/* eslint-disable global-require */
/* eslint-disable react/prop-types */
import React from 'react';
import { Alert, DeviceEventEmitter, Platform, StatusBar, StyleSheet, View, NativeModules } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import LoginScreen from './screens/LoginScreen';
import Beacons from 'react-native-beacons-manager';
import { hashCode, deepCopyBeaconsLists } from './utils/helpers';
import { InAppNotificationProvider, withInAppNotification } from 'react-native-in-app-notification';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
const store = configureStore({});
import DefaultProps from './constants/DefaultProps';

import { auth, fb } from './firebase';

// uuid of YOUR BEACON (change to yours)
const UUID = '23A01AF0-232A-4518-9C0E-323FB773F5EF';
const IDENTIFIER = 'Beachlife';
const TIME_FORMAT = 'HH:mm:ss';
const EMPTY_BEACONS_LISTS = {
  rangingList: [],
  monitorEnterList: [],
  monitorExitList: [],
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


const region = {
  identifier: 'Beachlife',
  uuid: '23A01AF0-232A-4518-9C0E-323FB773F5EF'
};

class App extends React.Component {
  // will be set as list of beacons to update state
  _beaconsLists = null;

  // will be set as a reference to "beaconsDidRange" event:
  beaconsDidRangeEvent = null;
  // will be set as a reference to "regionDidEnter" event:
  regionDidEnterEvent = null;
  // will be set as a reference to "regionDidExit" event:
  regionDidExitEvent = null;
  // will be set as a reference to "authorizationStatusDidChange" event:
  authStateDidRangeEvent = null;
  
  constructor(props) {
    super(props);
    this.unsubscriber = null;
    this.state = {
      isLoadingComplete: false,
      uuid: UUID,
      identifier: IDENTIFIER,
      message: '',
      user: null,
      isAuthenticated: false,
      isAuthenticationReady: false,
    };
  }
  
  componentDidMount() {
   fetch('http://3.18.28.164/api/getAllBeacons', DefaultProps.getHeader)
    .then((response) => response.json())
    .then((responseJson) => {
        this.turnOnBeaconListeners(responseJson.beacons);
    })
    .catch((error) => {
        console.log(error);
    });

    auth.onAuthStateChanged(this.onAuthStateChanged);

  }
  

  componentWillUnMount() {

    const { uuid, identifier } = this.state;

    const region = { identifier, uuid }; // minor and major are null here

    // stop monitoring beacons:
    Beacons.stopMonitoringForRegion(region)
      .then(() => console.log('Beacons monitoring stopped succesfully'))
      .catch(error =>
        console.log(`Beacons monitoring not stopped, error: ${error}`),
      );

    // stop ranging beacons:
    Beacons.stopRangingBeaconsInRegion(region)
      .then(() => console.log('Beacons ranging stopped succesfully'))
      .catch(error =>
        console.log(`Beacons ranging not stopped, error: ${error}`),
      );

    // stop updating locationManager:
    Beacons.stopUpdatingLocation();
    // remove auth state event we registered at componentDidMount:
    this.authStateDidRangeEvent.remove();
    // remove monitiring events we registered at componentDidMount::
    this.regionDidEnterEvent.remove();
    this.regionDidExitEvent.remove();
    // remove ranging event we registered at componentDidMount:
    this.beaconsDidRangeEvent.remove();
  }

  turnOnBeaconListeners(beaconsCompareList = []) {

    this._beaconsLists = EMPTY_BEACONS_LISTS;
    const { identifier, uuid, user } = this.state;
    // MANDATORY: you have to request ALWAYS Authorization (not only when in use) when monitoring
    // you also have to add "Privacy - Location Always Usage Description" in your "Info.plist" file
    // otherwise monitoring won't work
    Beacons.requestAlwaysAuthorization();
    Beacons.shouldDropEmptyRanges(true);
    // Define a region which can be identifier + uuid,
    // identifier + uuid + major or identifier + uuid + major + minor
    // (minor and major properties are numbers)
    const region = { identifier, uuid };
    // Monitor for beacons inside the region
    Beacons.startMonitoringForRegion(region) // or like  < v1.0.7: .startRangingBeaconsInRegion(identifier, uuid)
      .then(() => console.log('Beacons monitoring started succesfully'))
      .catch(error =>
        console.log(`Beacons monitoring not started, error: ${error}`),
      );

    // Range for beacons inside the region
    Beacons.startRangingBeaconsInRegion(region) // or like  < v1.0.7: .startRangingBeaconsInRegion(identifier, uuid)
      .then(() => console.log('Beacons ranging started succesfully'))
      .catch(error =>
        console.log(`Beacons ranging not started, error: ${error}`),
      );

    // update location to be able to monitor:
    Beacons.startUpdatingLocation();

    // OPTIONAL: listen to authorization change
    this.authStateDidRangeEvent = Beacons.BeaconsEventEmitter.addListener(
      'authorizationStatusDidChange',
      info => console.log('authorizationStatusDidChange: ', info),
    );

    // Ranging: Listen for beacon changes
    this.beaconsDidRangeEvent = Beacons.BeaconsEventEmitter.addListener(
      'beaconsDidRange',
      data => {
        this.setState({ message: 'beaconsDidRange event' });
        data.beacons.forEach(event => {
          console.log(event.uuid);
        })

        var arr = _.filter(data.beacons, function(obj) {
          return _.where(obj.uuid, {id: 'some_id'}).length > 0;
        })

        // throw push notification
      },
    );

    // monitoring events
    this.regionDidEnterEvent = Beacons.BeaconsEventEmitter.addListener(
      'regionDidEnter',
      ({ uuid, identifier }) => {
        this.setState({ message: 'regionDidEnter event' });
        console.log('regionDidEnter, data: ', { uuid, identifier });
        const time = moment().format(TIME_FORMAT);
      },
    );

    this.regionDidExitEvent = Beacons.BeaconsEventEmitter.addListener(
      'regionDidExit',
      ({ identifier, uuid, minor, major }) => {
        this.setState({ message: 'regionDidExit event' });
        const time = moment().format(TIME_FORMAT);
        console.log('regionDidExit, data: ', {
          identifier,
          uuid,
          minor,
          major,
          time
        });
      },
    );
  }

  _loadResourcesAsync = async () =>
    Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  onAuthStateChanged = user => {
    this.setState({
      isAuthenticationReady: true,
      isAuthenticated: !!user,
      user: user
    });
    if(user){
      console.log(user);
      this.trackUser();
    }
  };

    render() {
      const {
        isLoadingComplete,
        isAuthenticationReady,
        isAuthenticated,
      } = this.state;
      const { skipLoadingScreen } = this.props;
  
      if ((!isLoadingComplete || !isAuthenticationReady) && !skipLoadingScreen) {
        return (
          <AppLoading
            startAsync={this._loadResourcesAsync}
            onError={this._handleLoadingError}
            onFinish={this._handleFinishLoading}
          />
        );
      }
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <Provider store={store}>
            <InAppNotificationProvider>
              {
                isAuthenticated ? <AppNavigator /> : <LoginScreen />
              }
              </InAppNotificationProvider> 
            </Provider> 
        </View>
      );
    }
  }

export default withInAppNotification(App);