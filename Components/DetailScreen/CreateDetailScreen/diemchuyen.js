import React from 'react';
import {Text, ScrollView} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import {CreateFunctionStyle} from '../Styles';
import * as Cheerio from 'react-native-cheerio';

const widthArr = [140, 200, 120, 120, 140, 100, 150, 100];

function header() {
  const thead = [
    'MÃ MÔN HỌC',
    'TÊN MÔN HỌC',
    'NHÓM - TỔ',
    'SỐ TÍN CHỈ',
    'ĐIỂM KIỂM TRA',
    'ĐIỂM THI',
    'ĐIỂM TỔNG KẾT',
    'HỌC KỲ',
  ];
  return (
    <Row
      data={thead}
      style={CreateFunctionStyle.tkb_head_style}
      textStyle={CreateFunctionStyle.tkb_head_text}
      widthArr={widthArr}
    />
  );
}

function formatString(text) {
  return text
    .split(' ')
    .filter((e) => e)
    .map((e) => e.trim())
    .join(' ');
}

function createDCRow(data, index) {
  const tbody = [
    data.ma_mh,
    data.ten_mh,
    data.nhomto,
    data.so_tin_chi,
    data.diem_thanhphan || ' ',
    data.diem_thi || ' ',
    data.diem_tong_ket || ' ',
    data.hocky,
  ];
  return (
    <Row
      key={data.ma_mh + data.hocky}
      data={tbody}
      style={index % 2 === 0 && CreateFunctionStyle.tkb_even_row}
      textStyle={CreateFunctionStyle.tkb_body_text}
      widthArr={widthArr}
    />
  );
}

function createDC(ajaxData, getData) {
  const $ = Cheerio.load(getData);
  const name = $('span[class=blue]').children('b').text() || '';

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <Text style={CreateFunctionStyle.dcTitle}>BẢNG ĐIỂM CHUYỂN</Text>
      <Text style={CreateFunctionStyle.dcStudentName}>
        {formatString(name)}
      </Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={CreateFunctionStyle.dcContainer}>
        <Table borderStyle={CreateFunctionStyle.tkb_table_style}>
          {header()}
          {ajaxData.map(createDCRow)}
        </Table>
      </ScrollView>
    </ScrollView>
  );
}

export default createDC;
