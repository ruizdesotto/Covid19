import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Provider } from 'react-redux'
import { store } from './redux/store'

import CountryList from './screens/CountryListScreen'
import Details from './screens/DetailsScreen'
import Ranking from './screens/RankingScreen'

const stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default class App extends React.Component {

  render(){
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator >
            <Tab.Screen 
              name="CountryStack" 
              component={CountryStack} 
            />
            <Tab.Screen 
              name="RankingScreen" 
              component={Ranking} 
              />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
      )
  }
}

class CountryStack extends React.Component {

  render(){
    return (
      <Provider store={store}>
          <stack.Navigator initialRouteName="CountryListScreen">
            <stack.Screen 
              name="CountryListScreen" 
              component={CountryList} 
              options={{ 
                headerShown: false }} 
              />
            <stack.Screen 
              name="DetailsScreen" 
              component={Details}
              />
          </stack.Navigator>
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
