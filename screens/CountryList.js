import React from 'react';
import {Button, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants'

import { fetchCountry, fetchFlag } from '../api'
import FlatListCountries from '../FlatList'

export default class CountryList extends React.Component{
    state = {
        countries: [],
        show: true,
    }

    componentDidMount(){
        this.getCountries()
    }

    getCountries = async () => {
        const countries = await fetchCountry()
        this.setState({countries}) 
        this.getLogos()
    }


    getLogos = () => {
        const listCountries = this.state.countries
        listCountries.forEach(this.setImageinState)
    }

    setImageinState = (country, index) => {
        url = fetchFlag(country.name)
        this.setState((prevState) => {
            countries = [...prevState.countries]
            countries[index].logo = url
            return {countries}
        })
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
                    countries={this.state.countries} 
                    onSelectCountry = {(country) => {this.props.navigation.navigate(
                        'Details',
                        {...country} )}} 
                /> }
               {/* <FlatListCountries countries={this.state.countries} /> */}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: Constants.statusBarHeight,
    },
  
  });