import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CountryList from './screens/CountryList'
import Details from './screens/Details'

const stack = createStackNavigator();

export default class App extends React.Component {

  render(){
    return (
          <NavigationContainer>
            <stack.Navigator initialRouteName="CountryList">
              <stack.Screen 
                name="CountryList" 
                component={CountryList} 
                // options={{ 
                //   animationEnabled: false, 
                //   headerShown: false }}
                />
              <stack.Screen 
                name="Details" 
                component={Details}
                // options={{ 
                //   animationEnabled: false, 
                //   headerShown: false }}
                />
            </stack.Navigator>
          </NavigationContainer>
      )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
