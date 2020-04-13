import  React from 'react';
import {  Dimensions } from 'react-native';

import { LineChart } from 'react-native-chart-kit';

import COLOR_VAL from './colors'

const GraphComponent = (props) => {

    const DotInterval = 5;

    const data = props.data
    const confArray = data.map(({confirmed}) => (confirmed))
                          .filter((val, indx) => !(indx%DotInterval))
    const deadArray = data.map(({deaths}) => (deaths))
                          .filter((val, indx) => !(indx%DotInterval))
    const recoArray = data.map(({recovered}) => (recovered))
                          .filter((val, indx) => !(indx%DotInterval))
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
        width={xDimension}
        height={yDimension}
        yAxisInterval={Math.floor(NbPoints/4)} 
        chartConfig={{
          backgroundGradientFrom: '#eef',
          backgroundGradientTo: '#eef',
          decimalPlaces: 0, 
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