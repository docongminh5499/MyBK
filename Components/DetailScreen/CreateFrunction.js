import React from 'react';
import {Text, View, ScrollView, FlatList} from 'react-native';
import {Table, Row, TableWrapper, Cell} from 'react-native-table-component';
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
  hocky.tkb.forEach((monhoc) => {
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
      initialNumToRender={2}
      data={data}
      renderItem={({item}) => createTKBTable(item)}
      keyExtractor={(item) => item.ten_hocky}
    />
  );
}

function createLTTable(data) {
  const widthArr = [220, 150, 150, 120, 120, 120, 120, 120, 120];
  const tbody = Object.values(data.lichthi).map((monhoc) => {
    return [
      monhoc.ten_mh,
      monhoc.ma_mh,
      monhoc.nhomto,
      monhoc.ngaykt,
      monhoc.gio_kt || '--',
      monhoc.phong_ktra || '--',
      monhoc.ngaythi,
      monhoc.gio_thi,
      monhoc.phong_thi,
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

function createBDTable(data) {
  const thead = [
    'MÃ MÔN HỌC',
    'TÊN MÔN HỌC',
    'NHÓM - TỔ',
    'SỐ TÍN CHỈ',
    'ĐIỂM THÀNH PHẦN',
    'ĐIỂM THI',
    'ĐIỂM TỔNG KẾT',
  ];

  const widthArr = [100, 150, 100, 100, 250, 100, 100];

  const tbody = Object.values(data.diem).map((monhoc) => {
    return [
      monhoc.ma_mh,
      monhoc.ten_mh,
      monhoc.nhomto,
      monhoc.so_tin_chi,
      monhoc.diem_thanhphan || '',
      monhoc.diem_thi,
      monhoc.diem_tong_ket,
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
      <Text style={CreateFunctionStyle.ngay_cn_bd}>
        {'Ngày cập nhật số TC, ĐTB: ' + data.ngay_th}
      </Text>
      <View style={CreateFunctionStyle.summary_bd}>
        <Text style={CreateFunctionStyle.text_summary_bd}>
          {'Số tín chỉ đăng ký học kỳ: ' + data.so_tc}
        </Text>
        <Text style={CreateFunctionStyle.text_summary_bd}>
          {'Số tín chỉ tích lũy học kỳ: ' + data.so_tctl_hk}
        </Text>
        <Text style={CreateFunctionStyle.text_summary_bd}>
          {'Điểm trung bình học kỳ: ' + data.diem_tb}
        </Text>
        <Text style={CreateFunctionStyle.text_summary_bd}>
          {'Số tín chỉ tích lũy: ' + data.so_tctl}
        </Text>
        <Text style={CreateFunctionStyle.text_summary_bd}>
          {'Điểm trung bình tích lũy: ' + data.diem_tbtl}
        </Text>
      </View>
      <View style={CreateFunctionStyle.summary_bd}>
        <Text style={CreateFunctionStyle.bd_info_text}>
          Thông tin xét học bổng khuyến khích học tập
        </Text>
        <Text style={CreateFunctionStyle.text_summary_bd}>
          {'ĐTB chung mở rộng: ' + data.dtb_chung_morong}
        </Text>
        <Text style={CreateFunctionStyle.text_summary_bd}>
          {'ĐTB 1 học kỳ: ' + (data.dtb_1hocky ? data.dtb_1hocky : '--')}
        </Text>
        <Text style={CreateFunctionStyle.text_summary_bd}>
          {'Điểm rèn luyện: ' + data.diem_renluyen}
        </Text>
        <Text style={CreateFunctionStyle.text_summary_bd}>
          {'Số TC đạt trong học kỳ: ' + data.sotc_dat_hocky}
        </Text>
      </View>
    </View>
  );
}

function createBD(data) {
  return (
    <FlatList
      windowSize={11}
      initialNumToRender={2}
      data={Object.values(data)}
      renderItem={({item}) => createBDTable(item)}
      keyExtractor={(item) => item.ten_hocky}
    />
  );
}

const mapObject = {
  tkb: createTKB,
  lt: createLT,
  bd: createBD,
  default: (data) => console.log('Lộn key rồi kìa ba!'),
};

export const CreateFunction = (data, key = 'default') => {
  if (data && mapObject[key] && typeof mapObject[key] === 'function') {
    const jsonData = JSON.parse(data);
    return mapObject[key](jsonData);
  }
  return null;
};
