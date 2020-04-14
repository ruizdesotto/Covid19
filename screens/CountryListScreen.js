import React from 'react';
import {Button, StyleSheet, TextInput, View } from 'react-native';

import {connect} from 'react-redux'

import FlatListCountries from '../FlatList'

const MIN_CHAR = 0;

class CountryListScreen extends React.Component{
    state = {
        show: true,
        search: false,
    }
    

    toggle = () => {
        const flag = this.state.show
        this.setState({show: !flag})
    }

    searchCountries = (val) => {
        this.setState({search: true})
        if (val.length > MIN_CHAR){
            const countries = this.props.countries.filter(({name}) => (name.toLowerCase().includes(val.toLowerCase())));
            if (countries!== null){
                this.setState({countries})
            }
        }
        else{
            this.setState({search: false})
        }
    }

    render(){

        return(
            <View style={styles.container} >
                <TextInput 
                    style={styles.input} 
                    onChangeText={this.searchCountries} 
                    placeholder="Country" 
                    autoCompleteType="off"
                />
               <Button title="Toggle for debugging" onPress={this.toggle} /> 
               {this.state.show && 
               <FlatListCountries 
                    countries={this.state.search ? this.state.countries : this.props.countries} 
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
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        margin: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 3,
      },
  });