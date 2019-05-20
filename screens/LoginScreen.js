/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { signInWithFacebookAsync, signInWithGoogleAsync, signInEmailAndPassword } from '../redux/modules/auth';

import { StyleSheet, Alert, Text } from 'react-native';
import {
  Container,
  Header,
  Button,
  Content,
  Form,
  Item,
  Input,
  View,
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import * as Expo from 'expo';

class LoginScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

 
  onCreateAccountPress = () => {
    const { navigation } = this.props;
    const navActions = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Signup' })],
    });
    navigation.dispatch(navActions);
  };

  render() {
    const { email, password } = this.state;
    return (
      <Container>
        <Header />
        <Content padder>
          <Form>
            <Item last>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={text => this.setState({ email: text })}
                placeholder="Email"
                value={email}
              />
            </Item>
            <Item last>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                onChangeText={text => this.setState({ password: text })}
                placeholder="Password"
                value={password}
              />
            </Item>
            <View padder>
              <Button full primary onPress={() => this.props.signInEmailAndPassword(this.state.email,this.state.password)}>
                <Text>Login</Text>
              </Button>
              <Button
                style={{ marginTop: 10 }}
                full
                light
                onPress={this.props.signInWithFacebookAsync}
              >
                <Text>Sign in using Facebook</Text>
              </Button>
              <Button
                style={{ marginTop: 10 }}
                full
                light
                onPress={this.props.signInWithGoogleAsync}
              >
                <Text>Sign in using Google</Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({});

export default connect(null, { signInWithFacebookAsync, signInWithGoogleAsync,  signInEmailAndPassword  })(LoginScreen);