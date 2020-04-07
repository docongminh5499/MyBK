import React from 'react';
import {Text, View, ScrollView, FlatList, Image} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import {ScaleAndOpacity} from 'react-native-motion';
import {CreateFunctionStyle} from '../Styles';

const errorImg = require('../img/error.png');
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
  const thoi_khoa_bieu = hocky.tkb && Array.isArray(hocky.tkb) ? hocky.tkb : [];
  const tbody = thoi_khoa_bieu.map(monhoc => {
    return [
      monhoc.ten_mh,
      monhoc.ma_mh,
      monhoc.so_tin_chi === 0 || !monhoc.so_tin_chi ? '--' : monhoc.so_tin_chi,
      monhoc.tc_hp === 0 || !monhoc.tc_hp ? '--' : monhoc.tc_hp,
      monhoc.nhomto,
      monhoc.thu1 === 0 || !monhoc.thu1 ? '--' : monhoc.thu1,
      `${monhoc.tiet_bd1}-${monhoc.tiet_kt1 == -1 ? '--' : monhoc.tiet_kt1}`,
      `${monhoc.giobd}-${monhoc.giokt}`,
      monhoc.phong1 || '--',
      monhoc.macoso || '--',
      monhoc.tuan_hoc,
    ];
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
      {tbody.length === 0 && (
        <View style={CreateFunctionStyle.emptyItemContainer}>
          <Text style={CreateFunctionStyle.emptyItemText}>
            Không có thời khóa biểu
          </Text>
        </View>
      )}
    </View>
  );
}

function createTKB(data) {
  if (!data || (data && Array.isArray(data) && data.length === 0)) {
    return (
      <ScaleAndOpacity
        scaleMin={0}
        style={CreateFunctionStyle.emptyContainer}
        animateOnDidMount={true}>
        <View style={CreateFunctionStyle.emptyImgContainer}>
          <Image source={errorImg} style={CreateFunctionStyle.emptyImg} />
        </View>
        <Text style={CreateFunctionStyle.emptyText}>
          Không tìm thấy thời khóa biểu
        </Text>
      </ScaleAndOpacity>
    );
  }
  return (
    <FlatList
      windowSize={11}
      initialNumToRender={2}
      data={data}
      renderItem={({item}) => createTKBTable(item)}
      keyExtractor={(item, index) => item.ten_hocky || index.toString()}
    />
  );
}

export default createTKB;
