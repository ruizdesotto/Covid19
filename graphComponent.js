import  React from 'react';
import {  Dimensions } from 'react-native';

import { LineChart } from 'react-native-chart-kit';

import COLOR_VAL from './colors'

const M_VALUE = Math.pow(10,6)
const K_VALUE = Math.pow(10,3)

const FloatToString = (val) =>{
  if (val >= M_VALUE){
    return Math.floor(val/M_VALUE)+"M"
  }
  else if((val >= K_VALUE)) {
    return Math.floor(val/K_VALUE)+"k"
  }
  else{
    return Math.floor(val)+""
  }
}

const myLog = (val) => {
  if (val > 0){
    return Math.log10(val) 
  }
  return 0
}

const formatYLabel = (isLog) => (val) => {
  if (isLog){
      return FloatToString(Math.pow(10,val))
  }
  else{
      return FloatToString(val) 
  }
}

const GraphComponent = (props) => {

    const {isLog, data} = props

    const reshapeData = (data, type) => {
      return data.map((item) => (item[type]))
                 .filter((_val, indx) => (!(indx%DotInterval) || indx===(TotalPoints-1)))
                 .map((val) => (isLog ? myLog(val) : val) )
    }

    const TotalPoints = data.length
    const DotInterval = 5;

    const confArray = reshapeData(data, "confirmed")
    const recoArray = reshapeData(data, "recovered")
    const deadArray = reshapeData(data, "deaths")

    // TODO
    const dateArray = data.map(({date}) => (date))

    const NbPoints = confArray.length;

    const xArray = [] || dateArray;

    const datasets = [
                      { data: confArray, 
                        color: (opacity = 1) => COLOR_VAL.COLOR_CONF.dark+Math.floor(opacity*255).toString(16),
                      },
                      { data: deadArray, 
                        color: (opacity = 1) => COLOR_VAL.COLOR_DEAD.dark+Math.floor(opacity*255).toString(16),
                      },
                      { data: recoArray, 
                        color: (opacity = 1) => COLOR_VAL.COLOR_RECO.dark+Math.floor(opacity*255).toString(16),
                      },
                     ]

    

    const xDimension = Dimensions.get('window').width - 16
    const yDimension = xDimension*0.7
    return(
        <LineChart
        // onDataPointClick={({value, dataset, getColor}) => {}}
        data={{
          labels: xArray,
          datasets: datasets,
        }}
        formatYLabel={formatYLabel(isLog)}
        width={xDimension}
        height={yDimension}
        yAxisInterval={Math.floor(NbPoints/4)} 
        chartConfig={{
          backgroundGradientFrom: '#eef',
          backgroundGradientTo: '#eef',
          decimalPlaces: 3, 
          color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
        }}
        // bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    )
}

export default GraphComponent