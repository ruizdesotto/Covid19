import React from 'react';
import { Switch,  StyleSheet, Text, View } from 'react-native';
import GraphComponent from '../graphComponent'

import {connect} from 'react-redux'

import COLOR_VAL from '../colors'

const BarItem = props => {  

    const backColor = {backgroundColor: props.style.light}
    const textColor = {color: props.style.dark}

    const percent = ((props.last-props.prev)/props.prev*100).toFixed(2)
    return (
    <View style={[styles.barItem, backColor]}>
        <Text style={[styles.text, textColor]}>{props.type}</Text>
        <Text style={[styles.text, textColor]}>{props.last}</Text>
        <Text style={[styles.text, textColor]}>{(percent>0 ? "+": "")+percent+"%"}</Text>

    </View>
    )
    }

class DetailsScreen extends React.Component{

    state = {
        isLog: false,
    }

    _setHeading(name){
        this.props.navigation.setOptions({ title: name })
    }

    _toggleLog = () => {
        this.setState(prevState => ({isLog: !prevState.isLog}))
    }

    render(){
        const thisCountry = this.props.countries[this.props.route.params.id];

        this._setHeading(thisCountry.name)
        const lastDay = thisCountry.data.length
        const lastData = thisCountry.data[lastDay-1]
        const prevData = thisCountry.data[lastDay-2]

        return(
            <View style={styles.container}>
                <View style={styles.barStatus}>
                    <BarItem 
                        type="Confirmed" 
                        last={lastData.confirmed} 
                        prev={prevData.confirmed} 
                        style={COLOR_VAL.COLOR_CONF}/>
                    <BarItem 
                        type="Recovered" 
                        last={lastData.recovered}
                        prev={prevData.recovered}
                        style={COLOR_VAL.COLOR_RECO} />
                    <BarItem 
                        type="Deaths" 
                        last={lastData.deaths} 
                        prev={prevData.deaths}
                        style={COLOR_VAL.COLOR_DEAD} />
                </View>
                <View style={styles.barStatus}>
                    <Switch 
                        onValueChange={this._toggleLog}
                        value={this.state.isLog} 
                    />
                    <Text>Log scale (debuggin)</Text>
                </View>
                <View style={styles.graphContainer}>
                <GraphComponent 
                    data={thisCountry.data} 
                    isLog={this.state.isLog}
                    />
                </View>
            </View>

        )
    }
}


const mapStateToProps = state => ({
    countries: state.countriesInfo,  //[this.props.route.params.id]
  })
export default connect(mapStateToProps)(DetailsScreen)


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold', 
    }, 
    barStatus: {
        flexDirection: 'row',
        alignSelf: 'stretch', 
        
    },
    barItem: {
        flex: 1/3,
        paddingHorizontal: 15,
        borderWidth: 1,
        alignItems: 'center'        
    }, 
    graphContainer: {
        flex:1, 
        justifyContent: 'center'
    }
  });