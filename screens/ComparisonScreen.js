import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {connect} from 'react-redux'
import _ from 'lodash'
import {doMatch} from '../api'

import {GraphComponent, fewCountriesReshape} from '../graphComponent'

const LEN_TOP = 5


class RankingScreen extends React.Component{

    state={
        sortCountries: null
    }        

    componentDidMount(){

        if (this.props.countries){
            this._getSortCountries()
            // this._getRegion("Europe")
        }
    }

    _getSortCountries = () => {

        const nDays = this.props.countries[0].data.length - 1
        const sortCountries = _.sortBy(this.props.countries, 
                                    [function(c) { return - c.data[nDays].confirmed; }])
                                .filter((_val, index) => (index < LEN_TOP))
                                .map((country) => {
                                    const c = doMatch(country.name)
                                    return ({...country, population: c[0].population})})

        this.setState({sortCountries})
    }

    _getRegion = (region) => {
        const regional = this.props.countries.filter(({name}) => {
            const country = doMatch(name)
            if (country.length > 0 && country[0].region){
                return country[0].region === region
            }
            return false
        })       
        
        // HACER FOREACH MAS GLOBAL
    }

    render(){
        if (this.state.sortCountries){
            const oGraph = fewCountriesReshape(this.state.sortCountries, "confirmed", false)
            datasets = oGraph.datasets
            xArray = oGraph.xArray
            const legend =  this.state.sortCountries.map((c) => (c.name))

            return(
                <View style={styles.container}>
                <GraphComponent 
                    datasets={datasets} 
                    xArray={xArray}
                    isLog={false} 
                    legend={legend}
                    />
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


// const TableCell = props => {  

    //     return (
    //     <View style={[styles.barItem]}>
    //         <Text style={[styles.text]}>{props.text}</Text>
    //     </View>
    //     )
    // }
    
    // const TableRow = props => {  
    
    //     const {name, data} = props.country
    //     const lastDay = data.length
    
    //     // const backColor = {backgroundColor: props.style.light}
    //     // const textColor = {color: props.style.dark}
    
    //     // const percent = ((props.last-props.prev)/props.prev*100).toFixed(2)
    //     return (
    //     <View style={[styles.barStatus]}>
    //         <TableCell style={[styles.text]} text={name}/>
    //         <TableCell style={[styles.text]} text={data[lastDay-1].confirmed}/>
    //         <TableCell style={[styles.text]} text={data[lastDay-1].deaths}/>
    //         <TableCell style={[styles.text]} text={data[lastDay-1].recovered}/>
    //     </View>
    //     )
    // }