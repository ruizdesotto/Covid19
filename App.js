import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Entypo'



import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Provider } from 'react-redux'
import { store } from './redux/store'

import CountryList from './screens/CountryListScreen'
import Details from './screens/DetailsScreen'
import Comparison from './screens/ComparisonScreen'

const stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default class App extends React.Component {

  render(){
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator 
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Countries') {
                  iconName = "list";
                } else if (route.name === 'Comparison') {
                  iconName = 'line-graph';
                }
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}>
            <Tab.Screen 
              name="Countries" 
              component={CountryStack} 
              
            />
            <Tab.Screen 
              name="Comparison" 
              component={Comparison} 
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
