import React from 'react';
import {View, Text} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import {CreateFunctionStyle} from '../Styles';
function createSTC(ajaxData) {
  ajaxData = Object.values(ajaxData || {});
  let labels = [];
  let so_tinchi = [];
  let tong_tinchi = [];
  ajaxData = ajaxData.reverse();
  ajaxData.forEach(e => {
    labels.push(e.hk_nh.substring(2, e.hk_nh.length));
    so_tinchi.push(e.so_tctl_hk);
    tong_tinchi.push(e.so_tctl);
  });
  labels.forEach((e, i) => {});

  return (
    <View>
      <Text style={CreateFunctionStyle.chartText}>Tổng số tín chỉ</Text>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: tong_tinchi,
              color: (opacity = 1) => `#87f081`,
            },
          ],
          legend: [],
        }}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        yAxisLabel=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '4',
            strokeWidth: '1',
            stroke: '#f2f2f2',
          },
        }}
        fromZero
        style={{
          marginVertical: 10,
          borderRadius: 0,
        }}
        hideLegend={false}
        renderDotContent={({x, y, index}) => (
          <Text style={{position: 'absolute', top: y, left: x}}>
            {tong_tinchi[index]}
          </Text>
        )}
      />

      <Text style={CreateFunctionStyle.chartText}>Số tín chỉ học kì</Text>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: so_tinchi,
              color: (opacity = 1) => `#91ecf2`,
            },
          ],
          legend: [],
        }}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        yAxisLabel=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '4',
            strokeWidth: '1',
            stroke: '#f2f2f2',
          },
        }}
        fromZero
        style={{
          marginVertical: 10,
          borderRadius: 0,
        }}
        hideLegend={false}
        renderDotContent={({x, y, index}) => (
          <Text style={{position: 'absolute', top: y, left: x}}>
            {so_tinchi[index]}
          </Text>
        )}
      />
    </View>
  );
}

export default createSTC;
