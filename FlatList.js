import React from 'react'
import {FlatList, StyleSheet, Text, TouchableOpacity, Image} from 'react-native'
import PropTypes from 'prop-types'
import { fetchFlag } from './api'

class Row extends React.PureComponent {
  render(){
    const {props} = this
    const icon = props.logo ?
                {uri: props.logo} :
                require('./assets/rotodos.jpg')

    return(
      <TouchableOpacity 
      style={styles.row}
      onPress={() => props.onSelectCountry(props.id)} >
      <Image
      style={styles.tinyLogo}
      resizeMode='cover'
      source={icon}
      />
      <Text style={styles.text}>{props.name}</Text>  
      </TouchableOpacity>  
      )
  }
}

const FlatListCountries = props => {

  const renderItem = ({item}) => {
    const url = fetchFlag(item.name)

    return (
      <Row 
        {...item}
        logo={url}
        id={item.key}
        onSelectCountry={props.onSelectCountry}
        />
      )
  }

  return(
  <FlatList renderItem={renderItem} data={props.countries} />
)}

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

  tinyLogo: {
    width: 24,
    height: 24,
  },

  text: {
    paddingLeft: 10,
    fontSize: 20,
  }
})
