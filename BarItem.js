import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

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

export default BarItem


const styles = StyleSheet.create({

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
      paddingLeft: 10,
      fontSize: 16,
      fontWeight: 'bold'
    }
  })
  