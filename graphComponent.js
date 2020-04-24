import  React from 'react';
import {  Dimensions } from 'react-native';

import { LineChart } from 'react-native-chart-kit';

import COLOR_VAL from './colors'

const M_VALUE = Math.pow(10,6)
const K_VALUE = Math.pow(10,3)

const DOT_INTERVAL = 5

export const FloatToString = (val) =>{
  if (val >= M_VALUE){
    return Math.floor(val/M_VALUE)+"M"
  }
  else if (val >= K_VALUE) {
    return Math.floor(val/K_VALUE)+"k"
  }
  else if (val >= 1 || val === 0){
    return Math.floor(val)+""
  }
  else {
    return FloatToString(val*1000)
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

const reshapeCountryType = (data, type, isLog) => {
  const TotalPoints = data.length
  return data.map((item) => (item[type]))
             .filter((_val, indx) => (!(indx%DOT_INTERVAL) || indx===(TotalPoints-1)))
             .map((val) => (isLog ? myLog(val) : val) )
}

export const oneCountryReshape = (data, isLog) => {

    const confArray = reshapeCountryType(data, "confirmed", isLog)
    const recoArray = reshapeCountryType(data, "recovered", isLog)
    const deadArray = reshapeCountryType(data, "deaths", isLog)

    const dateArray = data.map(({date}) => (date))

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

    return {datasets, xArray}
}

export const fewCountriesReshape = (countries, type, isLog) => {
  const datasets = countries.map((element, index) => ({
    data: reshapeCountryType(element.data, type, isLog).map((e) => (e/element.population)), 
    color: (opacity = 1) => COLOR_VAL.COLOR_ARRAY[index].dark+Math.floor(opacity*255).toString(16),
  }));

  const xArray = [];
  return {datasets, xArray}
}

export const GraphComponent = (props) => {

    const {isLog, datasets, xArray, legend} = props

    NbPoints = datasets[0].data.length

    const xDimension = Dimensions.get('window').width - 16
    const yDimension = xDimension*0.7
    return(
        <LineChart
        // onDataPointClick={({value, dataset, getColor}) => {}}
        data={{
          labels: xArray,
          datasets: datasets,
          legend: legend
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

