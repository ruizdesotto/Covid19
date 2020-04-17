import React from 'react';
import { Switch,  StyleSheet, Text, View } from 'react-native';

import {connect} from 'react-redux'

const LEN_TOP = 10

const TableCell = props => {  

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

const TableRow = props => {  

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


class RankingScreen extends React.Component{

    state={
        topCountries: []
    }

    componentDidMount(){
        if (this.props.countries){
            // this._getTopCountries()
        }
    }

    shouldComponentUpdate(nextProps){
        if (nextProps.countries.length !== this.props.countries){
            // this._getTopCountries()
            return true
        }
        return false
    }

    _getTopCountries = () => {
        const topCountries = []
        const l = this.props.countries.length
        for (let c = 0 ; c < l; c++) { 
            const nDays = this.props.countries[c].data.length
            const conf = this.props.countries[c].data[nDays-1].confirmed
            const key = this.props.countries[c].key
            this._buildRanking(key, conf, topCountries)
        }

        this.setState({topCountries})
    }

    _buildRanking = (key, conf, topCountries) => {
        const l = topCountries.length
        for (let c = 0 ; c < l; c++) { 
            const nDays = this.props.countries[topCountries[c]].data.length
            if (conf > this.props.countries[topCountries[c]].data[nDays-1].confirmed){
                topCountries.splice( c, 0, key); 
            }
            console.log("hahahhc")
        }

        if (l < LEN_TOP){
            topCountries.push(key)
        }

    }

    render(){

        return(
            <View style={styles.container}>
                <Text>{this.state.topCountries.length}</Text>
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
    },
});