import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {connect} from 'react-redux'
import _ from 'lodash'

const LEN_TOP = 10

const TableCell = props => {  

    return (
    <View style={[styles.barItem]}>
        <Text style={[styles.text]}>{props.text}</Text>
    </View>
    )
}

const TableRow = props => {  

    const {name, data} = props.country
    const lastDay = data.length

    // const backColor = {backgroundColor: props.style.light}
    // const textColor = {color: props.style.dark}

    // const percent = ((props.last-props.prev)/props.prev*100).toFixed(2)
    return (
    <View style={[styles.barStatus]}>
        <TableCell style={[styles.text]} text={name}/>
        <TableCell style={[styles.text]} text={data[lastDay-1].confirmed}/>
        <TableCell style={[styles.text]} text={data[lastDay-1].deaths}/>
        <TableCell style={[styles.text]} text={data[lastDay-1].recovered}/>
    </View>
    )
}

class RankingScreen extends React.Component{

    state={
        sortCountries: null
    }

    componentDidMount(){

        if (this.props.countries){
            this.timeout = setTimeout(this._getSortCountries, 100)   
        }
    }

    _getSortCountries = () => {

        const nDays = this.props.countries[0].data.length - 1
        const sortCountries = _.sortBy(this.props.countries, 
                                    [function(c) { return - c.data[nDays].confirmed; }])
 
        this.setState({sortCountries})
        clearTimeout(this.timeout);
    }

    render(){
        if (this.state.sortCountries){
            const dummyCountry = {name: "Name", 
                                  key:"-1", 
                                  data:[
                                      {confirmed: "Conf.", 
                                        deaths: "Deaths", 
                                        recovered: "Recov." 
                                      }]}
            return(
                <View style={styles.container}>
                    <TableRow key={dummyCountry.key} country={dummyCountry} />
                    {this.state.sortCountries
                        .map((country, key)=> (key < LEN_TOP ? <TableRow key={country.key} country={country} /> : null))}
                </View>
            )}

        return(
            <View style={styles.container}>
                <Text>Loading ... </Text>
            </View>
        )

    }
}

const mapStateToProps = state => ({
    countries: state.countriesInfo, 
  })
export default connect(mapStateToProps)(RankingScreen)


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
        fontSize: 14,
    }, 
    barStatus: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignSelf: 'stretch', 
        
    },
    barItem: {
        flex: 1/4,
        paddingHorizontal: 15,
        borderWidth: 1,
        alignItems: 'center'        
    }, 
});