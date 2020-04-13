import React from 'react';
import {Button, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants'

import {connect} from 'react-redux'

import FlatListCountries from '../FlatList'

class CountryListScreen extends React.Component{
    state = {
        show: true,
    }

    toggle = () => {
        const flag = this.state.show
        this.setState({show: !flag})
    }

    render(){
        return(
            <View style={styles.container} >
               <Button title="Toggle for debugging" onPress={this.toggle} /> 
               {this.state.show && 
               <FlatListCountries 
                    countries={this.props.countries} 
                    onSelectCountry = {(id) => {this.props.navigation.navigate(
                        'DetailsScreen',
                        {id} )}} 
                /> }
               {/* <FlatListCountries countries={this.state.countries} /> */}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    countries: state.countriesList, 
  })
export default connect(mapStateToProps)(CountryListScreen)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: Constants.statusBarHeight,
    },
  
  });