import React from 'react'
import {Switch, FlatList, StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/AntDesign'
import { fetchFlag } from './api'
import {FloatToString} from './graphComponent'

import COLOR_VAL from './colors'
import BarItem from './BarItem'
import GraphComponent from './graphComponent'


class Row extends React.PureComponent {

  state = {
    extra: false,
    isLog: false,
  }

  _showExtra = () => {
    this.setState((prevState) => ({extra: !prevState.extra}))
  }

  _toggleLog = () => {
    this.setState(prevState => ({isLog: !prevState.isLog}))
  }

  render(){
    const {props} = this
    const icon = props.logo ?
                {uri: props.logo} :
                require('./assets/rotodos.jpg')

    
    const lastDay = props.data.length
    const lastData = props.data[lastDay-1]
    const prevData = props.data[lastDay-2]
    const pprevData = props.data[lastDay-3]
    const threeFlags=[(lastData.confirmed - prevData.confirmed) > (prevData.confirmed - pprevData.confirmed),
                      (lastData.recovered - prevData.recovered) > (prevData.recovered - pprevData.recovered),
                      (lastData.deaths - prevData.deaths) > (prevData.deaths - pprevData.deaths)]

    const iconUp = <Icon
                    name='caretup'
                    color='#c00' />
    const iconDown = <Icon
                    name='caretdown'
                    color='#0a0' />
    
    // TODO FORMAT: COLORS, NUMBER, SYMBOL IF UP OR DOWN AND PERCENTAGE
    return(
      <View>
      <TouchableOpacity 
      onPress={this._showExtra} >
        <View style={styles.row}>
          <View style={styles.rowName}>
            <Image
              style={styles.tinyLogo}
              resizeMode='cover'
              source={icon}
            />
            <Text style={styles.text}>{this.state.extra ? 
                                        props.name : 
                                        (props.name.length > 15 ? 
                                            props.name.slice(0,15)+"..." :
                                            props.name ) }</Text> 
          </View>
          {this.state.extra || 
          <View style={styles.rowNumbers}>
            <Text style={[styles.text, 
                          {flex:1, 
                          color: COLOR_VAL.COLOR_CONF.dark},
                          styles.rowNumbers]}
            >{FloatToString(lastData.confirmed)}</Text> 
            {threeFlags[0] ? iconUp : iconDown} 
            <Text style={[styles.text, 
                          {flex:1, 
                          color: COLOR_VAL.COLOR_RECO.dark},
                          styles.rowNumbers]}
            >{FloatToString(lastData.recovered)}</Text>
            {threeFlags[1] ? iconUp : iconDown}  
            <Text style={[styles.text, 
                          {flex:1, 
                          color: COLOR_VAL.COLOR_DEAD.dark}, 
                          styles.rowNumbers]}
            >{FloatToString(lastData.deaths)}</Text>
            {threeFlags[2] ? iconUp : iconDown}
          </View>}
        </View>
      {this.state.extra && 
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
      </View>} 
      </TouchableOpacity> 
      {this.state.extra && 
      <View>
      <View style={styles.switch}>
        <Text style={styles.switchText}>Log scale</Text>
        <Switch 
            onValueChange={this._toggleLog}
            value={this.state.isLog} 
        />
      </View>
      <View style={styles.graphContainer}>
      <GraphComponent 
          data={props.data} 
          isLog={this.state.isLog} 
          />
      </View> 
      </View>} 
      </View>  
      )
  }
}

class FlatListCountries extends React.Component {

  renderItem = ({item}) => {
    const url = fetchFlag(item.name)

    return (
      <Row 
        {...item}
        logo={url}
        id={item.key}
        />
      );
  }

  render(){
    return(
      <FlatList renderItem={this.renderItem} data={this.props.countries} />
    )
  }
}

FlatListCountries.propTypes = {
  countries: PropTypes.array,
}

export default FlatListCountries


const styles = StyleSheet.create({
  row: {
      padding: 10,
      alignItems: 'center',
      flexDirection: 'row', 
  },
  rowName:{
    flex: 1, 
    justifyContent: 'flex-start',
    flexDirection: 'row', 
  },
  rowNumbers:{
    flex: 1, 
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row', 
    textAlign: 'right', 
    paddingHorizontal: 2,
  },
  tinyLogo: {
    width: 24,
    height: 24,
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
  text: {
    // paddingHorizontal: 15,
    fontSize: 20,
    fontWeight: 'bold'
  }, 
  graphContainer: {
      flex:1, 
      justifyContent: 'center'
  }, 
  switch:{
    padding:5,
    flexDirection: 'row',
    alignSelf: 'stretch', 
    alignItems: 'center',
  },
  switchText: {
    paddingHorizontal: 10,
    fontSize: 16,
    fontStyle: 'italic'
  },
})
