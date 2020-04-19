import React from 'react';
import {Switch, Button, StyleSheet, TextInput, View, Text } from 'react-native';
import Constants from 'expo-constants';

import {connect} from 'react-redux'
import _ from 'lodash'

import FlatListCountries from '../FlatList'

const MIN_CHAR = 0;

class CountryListScreen extends React.Component{
    state = {
        show: true,
        search: false,
        isSorted: false,
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.countries.length === 0 &&
            this.props.countries.length !== 0) {
            this._sortCountries()
        }
      }

    toggle = () => {
        const flag = this.state.show
        this.setState({show: !flag})
    }

    _sortCountries = () => {
        if (!this.state.isSorted && !this.statesortCountries){
            const nDays = this.props.countries[0].data.length - 1
            const sortCountries = _.sortBy(this.props.countries, 
                                [function(c) { return - c.data[nDays].confirmed; }])
            this.setState({sortCountries})
        }

        this.setState(prevState => ({isSorted: !prevState.isSorted}))
    }

    searchCountries = (val) => {
        this.setState({search: true})
        if (val.length > MIN_CHAR){
            let searchCountries
            if (this.state.isSorted){
                searchCountries = this.state.sortCountries.filter(({name}) => (name.toLowerCase().includes(val.toLowerCase())));
            }
            else{
                searchCountries = this.props.countries.filter(({name}) => (name.toLowerCase().includes(val.toLowerCase())));
            }
            if (searchCountries!== null){
                this.setState({searchCountries})
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
                <View style={styles.switch}>
                    <Switch 
                    onValueChange={this._sortCountries}
                    value={this.state.isSorted}  
                    /> 
                    <Text style={styles.text}>Sort {this.state.isSorted ? "by cases ": "by name"}</Text>
                </View>
               <Button title="Toggle for debugging" onPress={this.toggle} /> 
               {this.state.show &&
               <FlatListCountries 
                    countries={this.state.search ? this.state.searchCountries : 
                        (this.state.isSorted ? this.state.sortCountries : this.props.countries)} 
                    onSelectCountry = {(id) => {}}
                    // onSelectCountry = {(id) => {this.props.navigation.navigate(
                    //     'DetailsScreen',
                    //     {id} )}} 
                /> }
               {/* <FlatListCountries countries={this.state.countries} /> */}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    countries: state.countriesInfo, 
  })
export default connect(mapStateToProps)(CountryListScreen)

const styles = StyleSheet.create({
    container: {
      paddingTop: Constants.statusBarHeight,
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
    switch: {
        flexDirection: 'row', 
        alignItems: 'center',
        padding: 10,
    }, 
    text : {
        fontSize: 15,
    }
  });