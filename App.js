import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Provider } from 'react-redux'
import { store } from './redux/store'

import CountryList from './screens/CountryListScreen'
import Details from './screens/DetailsScreen'

const stack = createStackNavigator();

export default class App extends React.Component {

  render(){
    return (
      <Provider store={store}>
        <NavigationContainer>
          <stack.Navigator initialRouteName="CountryListScreen">
            <stack.Screen 
              name="CountryListScreen" 
              component={CountryList} 
              />
            <stack.Screen 
              name="DetailsScreen" 
              component={Details}
              />
          </stack.Navigator>
        </NavigationContainer>
      </Provider>
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
