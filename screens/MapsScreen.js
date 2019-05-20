import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,Image,Button,ImageBackground,StatusBar} from 'react-native';
import { MapView } from "expo";
import DefaultProps from '../constants/DefaultProps';
import { Container, Header, Tab, Tabs, TabHeading, Icon } from 'native-base';
import CustomHeader from '../components/CustomHeader';


_handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
        location,
      });
    }


    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location), location, });
  };

export default class MapsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            markers: [],
        };
    }

    static navigationOptions = {
        // header: AuthScreen,
        title: 'Map ',
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
        
    };

    fetchMarkerData() {
        fetch('http://3.18.28.164/api/getAllBeacons', DefaultProps.getHeader)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    isLoading: false,
                    markers: responseJson.beacons,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidMount() {
        this.fetchMarkerData();

    }

    render() {
        return (
          <Container>

            {/* <CustomHeader/> */}
            <MapView
                style={{ flex: 1 }}
                region={{
                    latitude: 38.7209,
                    longitude: -75.0760,
                    latitudeDelta: 0.3922,
                    longitudeDelta: 0.3421,
                }}
            >
                {this.state.isLoading ? null : this.state.markers.map((marker, index) => {
                    console.log("marker : " + marker)
                    const coords = {
                        latitude: parseFloat(marker.lat),
                        longitude: parseFloat(marker.lng),
                    };

                    const metadata = `Status: ${marker.statusValue}`;

                    return (
                        <MapView.Marker
                            key={index}
                            coordinate={coords}
                            title={marker.nickname}
                            // description={marker.nickname}
                            onPress={() => { 
                                // this.props.navigation.navigate('SelectionScreen')
                                // alert("pressed") 
                            }}
                            // onSelect ={()=>{alert("Selected")}}
                            onCalloutPress={() => { 
                                // alert("onCalloutPress")
                                alert("from map !!! "+marker.url)
                                this.props.navigation.navigate('ContentScreen', {
                                  'key1': marker.url}
                                ) 
                                 }}   // shoold navigate to descriptionScreen 
                        />
                    );
                })}
            </MapView>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    buttonContainer: {
        flex: 1, margin: 12
    }
});