import React from 'react';
import {Text, View, ScrollView, FlatList} from 'react-native';
import {Table, Row, TableWrapper, Cell} from 'react-native-table-component';
import {CreateFunctionStyle} from '../Styles';

function createLTTable(data) {
  const widthArr = [220, 150, 150, 120, 120, 120, 120, 120, 120];
  const tbody = Object.values(data.lichthi).map((monhoc) => {
    return [
      monhoc.ten_mh,
      monhoc.ma_mh,
      monhoc.nhomto,
      monhoc.ngaykt || '--',
      monhoc.gio_kt || '--',
      monhoc.phong_ktra || '--',
      monhoc.ngaythi || '--',
      monhoc.gio_thi || '--',
      monhoc.phong_thi || '--',
    ];
  });
  return (
    <View key={data.ten_hocky} style={CreateFunctionStyle.tkb_wrapper}>
      <Text style={CreateFunctionStyle.ten_hoc_ky}>{data.ten_hocky}</Text>
      <Text style={CreateFunctionStyle.tkb_ngay_cn}>
        {'Ngày cập nhật: ' + data.ngay_cap_nhat}
      </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Table borderStyle={CreateFunctionStyle.tkb_table_style}>
          <TableWrapper style={CreateFunctionStyle.lt_table_head}>
            <Row
              data={['TÊN MÔN HỌC', 'MÃ MÔN HỌC', 'NHÓM-TỔ']}
              widthArr={widthArr.slice(0, 3)}
              style={CreateFunctionStyle.tkb_head_style}
              textStyle={CreateFunctionStyle.tkb_head_text}
            />
            <TableWrapper>
              <Cell
                data="NGÀY KIỂM TRA GIỮA KỲ"
                style={CreateFunctionStyle.tkb_head_style}
                textStyle={CreateFunctionStyle.tkb_head_text}
              />
              <Row
                data={['NGÀY', 'GIỜ', 'PHÒNG']}
                widthArr={widthArr.slice(3, 6)}
                style={CreateFunctionStyle.tkb_head_style}
                textStyle={CreateFunctionStyle.tkb_head_text}
              />
            </TableWrapper>
            <TableWrapper>
              <Cell
                data="NGÀY KIỂM TRA CUỐI KỲ"
                style={CreateFunctionStyle.tkb_head_style}
                textStyle={CreateFunctionStyle.tkb_head_text}
              />
              <Row
                data={['NGÀY', 'GIỜ', 'PHÒNG']}
                widthArr={widthArr.slice(6, 9)}
                style={CreateFunctionStyle.tkb_head_style}
                textStyle={CreateFunctionStyle.tkb_head_text}
              />
            </TableWrapper>
          </TableWrapper>
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

function createLT(data) {
  return (
    <FlatList
      windowSize={11}
      initialNumToRender={2}
      data={Object.values(data)}
      renderItem={({item}) => createLTTable(item)}
      keyExtractor={(item) => item.ten_hocky}
    />
  );
}

export default createLT;
