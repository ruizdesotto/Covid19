import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants'


export default class Details extends React.Component{
    render(){
        // const lastDay = this.props.route.params.data.length
        // const lastData = this.props.route.params.data[lastDay-1]
        return(
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.route.params.name}</Text>
                {/* <Text style={styles.text}>{"Confirmed: "+lastData.confirmed}</Text>
                <Text style={styles.text}>{"Recovered: "+lastData.recovered}</Text>
                <Text style={styles.text}>{"Deaths: "+lastData.deaths}</Text> */}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: Constants.statusBarHeight,
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold'
    }
  });