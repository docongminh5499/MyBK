import React from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import {LineChart} from 'react-native-chart-kit';
import {CreateFunctionStyle} from '../Styles';
import {Dimensions} from 'react-native';

function createDTBItem(data) {
  data = data && Array.isArray(data) ? data : [];
  const widthArr = [200, 200];

  return (
    <View>
      <ScrollView showsVerticalScrollIndicato={true}>
        <Table style={CreateFunctionStyle.tkb_table_style}>
          {data.map((row, index) => (
            <Row
              key={row}
              data={row}
              widthArr={widthArr}
              style={index % 2 === 0 && CreateFunctionStyle.tkb_even_row}
              textStyle={CreateFunctionStyle.dtbTableText}
            />
          ))}
        </Table>
      </ScrollView>
    </View>
  );
}

function createDTB(ajaxData) {
  ajaxData = Object.values(ajaxData || {});
  let labels = [];
  let tb_tichluy = [];
  let tb_hocky = [];
  ajaxData = ajaxData.reverse();
  ajaxData.forEach(e => {
    tb_hocky.push(e.diem_tb);
    tb_tichluy.push(e.diem_tbtl);
    labels.push(e.hk_nh.substring(2, e.hk_nh.length));
  });
  const tb_tichluy_hientai = tb_tichluy[tb_tichluy.length - 1];
  const tong_tinchi = ajaxData[ajaxData.length - 1].so_tctl;
  let listDTB = [];
  labels.forEach((e, i) => {
    listDTB.push(['Học kì ' + labels[i], tb_hocky[i]]);
  });
  return (
    <View>
      <View>
        <Text style={CreateFunctionStyle.dtbText}>
          Điểm trung bình tích lũy: {tb_tichluy_hientai}
        </Text>
        <Text style={CreateFunctionStyle.dtbText}>
          Tổng số tín chỉ: {tong_tinchi}
        </Text>
      </View>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: tb_hocky,
              color: (opacity = 1) => `#91ecf2`,
            },
            {
              data: tb_tichluy,
              color: (opacity = 1) => `#87f081`,
            },
          ],
          legend: ['TB học kì', 'TB tích lũy'],
        }}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        yAxisLabel=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2, // optional, defaults to 2dp
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
        style={{
          marginVertical: 10,
          borderRadius: 0,
        }}
        hideLegend={false}
      />
      <FlatList
        windowSize={2}
        data={[listDTB]}
        renderItem={({item}) => createDTBItem(item)}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => (
          <View style={{width: '100%', height: 40}} />
        )}
      />
    </View>
  );
}

export default createDTB;
