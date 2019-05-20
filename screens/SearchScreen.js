import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, View } from 'react-native';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text,Title, Button, Icon, Left, Body, Right } from 'native-base';
import { red } from 'ansi-colors';
import DefaultProps from '../constants/DefaultProps';
import CustomHeader from '../components/CustomHeader';

export default class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            beacons: [],
        };
    }
    static navigationOptions = {
        header: SearchScreen,
        title: 'Search ',
        headerRight: (
          <Button
            onPress={() => {}}
            
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
    
    fetchBeaconsData() {
        fetch('http://3.18.28.164/api/getAllBeacons', DefaultProps.getHeader)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    isLoading: false,
                    beacons: responseJson.beacons,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidMount() {
        this.fetchBeaconsData();
        console.log(this.state.beacons)

    }
    render() {
        return (

            <View style={styles.container} >
                <FlatList
                    data={this.state.beacons}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) =>
                    
                        <View >
                            <View style={{ flexDirection: 'row', height: 140, width: "100%" }} >
                            {/* <View style={{ flex: 3, width: 120, height: 120, padding : 10 , alignItems:'center' }}></View> */}
                                <Image source={{ uri: item.location_image }} style={{ flex: 4, width: undefined, height: undefined ,marginLeft : 5, alignItems:'center' }}
                              />
                                <View style={{ flex: 6, flexDirection: "column",justifyContent:'space-evenly',alignItems:'center' }}  >
                                    <Text style={styles.title}>{item.nofifytitle}</Text>
                                    <Text style={styles.text}>{item.nofifytext}</Text>
                                    <Text style={styles.text}>{item.tags}</Text>
                                </View>
                                {/* <Image source={require('../assets/images/selection_background.png')} style={{ flex: 1, height: 200 }} /> */}
                                <View style={{ flex: 1,  justifyContent:'center', alignItems:"center" }}><Icon name='arrow-forward' style={{  }} 
                                onPress = {()=>{
                                    console.log('clicked') 
                                    this.props.navigation.navigate('ContentScreen', {
                                        'key1': item.url}
                                      ) 
                                   }} /></View>
                            </View>
                        </View>
                    }
                    keyExtractor={item => item.email}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,


    },
    card: {
        padding: 10,
        fontSize: 18,
        height: 224,
        backgroundColor: "#a0a0a0"
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    title: {
        padding: 10,
        fontSize: 18,
        fontStyle: 'normal',
        alignItems :'stretch'

    },
    text: {
        padding: 10,
        fontSize: 14,
        fontStyle: 'normal'
    }
})

// skip this line if using Create React Native App
