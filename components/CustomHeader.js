import React from 'react';
import {
    Button,
   Header, Left, Body, Right, Icon, Title, Container
} from 'native-base';

export default class CustomHeader extends React.Component {
  render() {
    return (
        <Header style={{   width: '100%', justifyContent: 'flex-start'}}>
                    <Left>
                        <Button transparent onPress={() => { this.props.navigation.navigate('AuthScreen') }}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Header</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Right>
                </Header>
    )
  }
}
