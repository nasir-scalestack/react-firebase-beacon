import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class SettingsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Settings Screen
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    margin: 5,
    backgroundColor: '#F5FCFF',
  },
});