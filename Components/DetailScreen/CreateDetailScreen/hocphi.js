import React from 'react';
import {Text, View, FlatList, ScrollView} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import {CreateFunctionStyle} from '../Styles';

function createHPTable(data) {
  const thead = [
    'MÃ MH',
    'TÊN MÔN HỌC',
    'TC HỌC PHÍ',
    'ĐƠN GIÁ',
    'SỐ TIỀN',
    'MỨC GIẢM',
    'GHI CHÚ',
  ];
  const widthArr = [100, 200, 100, 100, 150, 100, 100];
  const tbody = data.hocphi.map((monhoc) => {
    return [
      monhoc.ma_mh,
      monhoc.ten_mh,
      monhoc.tc_hocphi,
      monhoc.don_gia,
      monhoc.thanh_tien,
      '',
      monhoc.ghi_chu || '',
    ];
  });
  return (
    <View key={data.ten_hocky} style={CreateFunctionStyle.tkb_wrapper}>
      <Text style={CreateFunctionStyle.ten_hoc_ky}>{data.ten_hocky}</Text>
      <Text style={CreateFunctionStyle.tkb_ngay_cn}>
        Ngày cập nhật: {' ' + data.ngay_cap_nhat}
      </Text>
    </View>
  );
}

function createHP(data) {
  return (
    <FlatList
      windowSize={11}
      data={data}
      renderItem={({item}) => createHPTable(item)}
      keyExtractor={(item) => item.ten_hocky}
    />
  );
}

export default createHP;
