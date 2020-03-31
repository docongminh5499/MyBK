import React from 'react';
import {Text, View, ScrollView, FlatList} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import {CreateFunctionStyle} from './Styles';

function createTKBTable(hocky) {
  const thead = [
    'TÊN MÔN HỌC',
    'MÃ MH',
    'TÍN CHỈ',
    'TC HỌC PHÍ',
    'NHÓM-TỔ',
    'THỨ',
    'TIẾT',
    'GIỜ HỌC',
    'PHÒNG',
    'CƠ SỞ',
    'TUẦN HỌC',
  ];
  const widthArr = [200, 100, 100, 150, 100, 100, 100, 150, 150, 100, 500];
  const tbody = [];
  hocky.tkb.forEach(monhoc => {
    tbody.push([
      monhoc.ten_mh,
      monhoc.ma_mh,
      monhoc.so_tin_chi === 0 ? '--' : monhoc.so_tin_chi,
      monhoc.tc_hp === 0 ? '--' : monhoc.tc_hp,
      monhoc.nhomto,
      monhoc.thu1 === 0 ? '--' : monhoc.thu1,
      `${monhoc.tiet_bd1}-${monhoc.tiet_kt1}`,
      `${monhoc.giobd}-${monhoc.giokt}`,
      monhoc.phong1,
      monhoc.macoso,
      monhoc.tuan_hoc,
    ]);
  });

  return (
    <View key={hocky.ten_hocky} style={CreateFunctionStyle.tkb_wrapper}>
      <Text style={CreateFunctionStyle.ten_hoc_ky}>{hocky.ten_hocky}</Text>
      <Text style={CreateFunctionStyle.tkb_ngay_cn}>
        Ngày cập nhật: {' ' + hocky.ngay_cap_nhat}
      </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Table borderStyle={CreateFunctionStyle.tkb_table_style}>
          <Row
            data={thead}
            style={CreateFunctionStyle.tkb_head_style}
            textStyle={CreateFunctionStyle.tkb_head_text}
            widthArr={widthArr}
          />
          {tbody.map((row, index) => (
            <Row
              key={row}
              style={index % 2 === 0 && CreateFunctionStyle.tkb_even_row}
              data={row}
              textStyle={CreateFunctionStyle.tkb_body_text}
              widthArr={widthArr}
            />
          ))}
        </Table>
      </ScrollView>
    </View>
  );
}

function createTKB(data) {
  return (
    <FlatList
      windowSize={11}
      initialNumToRender={4}
      data={data}
      renderItem={({item}) => createTKBTable(item)}
      keyExtractor={item => item.ten_hocky}
    />
  );
}

const mapObject = {
  tkb: createTKB,
  default: data => console.log('Lộn key rồi kìa ba!'),
};

export const CreateFunction = (data, key = 'default') => {
  if (data && mapObject[key] && typeof mapObject[key] === 'function') {
    const jsonData = JSON.parse(data);
    return mapObject[key](jsonData);
  }
  return null;
};
