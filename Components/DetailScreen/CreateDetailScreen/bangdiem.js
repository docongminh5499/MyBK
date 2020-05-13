import React from 'react';
import {Text, View, ScrollView, FlatList, Image} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import {ScaleAndOpacity} from 'react-native-motion';
import {CreateFunctionStyle} from '../Styles';
import * as Cheerio from 'react-native-cheerio';

const errorImg = require('../img/error.png');
function formatString(text) {
  return text
    .split(' ')
    .filter(e => e)
    .map(e => e.trim())
    .join(' ');
}

function format_diem_tk(diemtk, diemtl) {
  let diem_tong_ket = diemtk || ' ';
  let diem_thi_lai = diemtl ? `; ${diemtl} (lần 2)` : ' ';
  return diem_tong_ket + diem_thi_lai;
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

  const tbody = Object.values(data.diem || {}).map(monhoc => {
    return [
      monhoc.ma_mh,
      monhoc.ten_mh,
      monhoc.nhomto,
      monhoc.so_tin_chi,
      monhoc.diem_thanhphan || '',
      monhoc.diem_thi || '',
      format_diem_tk(monhoc.diem_tong_ket, monhoc.diem_thilai),
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

      {tbody.length === 0 && (
        <View style={CreateFunctionStyle.emptyItemContainer}>
          <Text style={CreateFunctionStyle.emptyItemText}>
            Không có bảng điểm
          </Text>
        </View>
      )}

      <Text
        style={[CreateFunctionStyle.bd_info_text, CreateFunctionStyle.padding]}>
        {'Tổng kết: ' + data.ten_hocky}
      </Text>
      <Text style={CreateFunctionStyle.ngay_cn_bd}>
        {'Ngày cập nhật số TC, ĐTB: ' + (data.ngay_th || '--')}
      </Text>
      <View style={CreateFunctionStyle.summary_bd}>
        <Text style={CreateFunctionStyle.text_summary_bd}>
          {'Số tín chỉ đăng ký học kỳ: ' + (data.so_tc || '--')}
        </Text>
        <Text style={CreateFunctionStyle.text_summary_bd}>
          {'Số tín chỉ tích lũy học kỳ: ' + (data.so_tctl_hk || '--')}
        </Text>
        <Text style={CreateFunctionStyle.text_summary_bd}>
          {'Điểm trung bình học kỳ: ' + (data.diem_tb || '--')}
        </Text>
        <Text style={CreateFunctionStyle.text_summary_bd}>
          {'Số tín chỉ tích lũy: ' + (data.so_tctl || '--')}
        </Text>
        <Text style={CreateFunctionStyle.text_summary_bd}>
          {'Điểm trung bình tích lũy: ' + (data.diem_tbtl || '--')}
        </Text>
      </View>
      <View style={CreateFunctionStyle.summary_bd}>
        <Text style={CreateFunctionStyle.bd_info_text}>
          Thông tin xét học bổng khuyến khích học tập
        </Text>
        <Text style={CreateFunctionStyle.text_summary_bd}>
          {'ĐTB chung mở rộng: ' + (data.dtb_chung_morong || '--')}
        </Text>
        <Text style={CreateFunctionStyle.text_summary_bd}>
          {'ĐTB 1 học kỳ: ' + (data.dtb_1hocky || '--')}
        </Text>
        <Text style={CreateFunctionStyle.text_summary_bd}>
          {'Điểm rèn luyện: ' + (data.diem_renluyen || '--')}
        </Text>
        <Text style={CreateFunctionStyle.text_summary_bd}>
          {'Số TC đạt trong học kỳ: ' + (data.sotc_dat_hocky || '--')}
        </Text>
      </View>
    </View>
  );
}

function createHeaderTable(data) {
  if (!data) {
    return <Text style={CreateFunctionStyle.bdTitle}>BẢNG ĐIỂM SINH VIÊN</Text>;
  }

  const $ = Cheerio.load(data);
  const text = $('.home-content-padding > div span').map(function() {
    return formatString($(this).text());
  });

  return (
    <View>
      <Text style={CreateFunctionStyle.bdTitle}>BẢNG ĐIỂM SINH VIÊN</Text>
      <Text style={CreateFunctionStyle.bdHeaderText}>
        {'Họ tên: '}
        <Text style={CreateFunctionStyle.bdHeaderValue}>{text[0] || '--'}</Text>
      </Text>
      <Text style={CreateFunctionStyle.bdHeaderText}>
        {'Số tín chỉ tích lũy: '}
        <Text style={CreateFunctionStyle.bdHeaderValue}>{text[1] || '--'}</Text>
      </Text>
      <Text style={CreateFunctionStyle.bdHeaderText}>
        {'Điểm trung bình tích lũy: '}
        <Text style={CreateFunctionStyle.bdHeaderValue}>{text[2] || '--'}</Text>
      </Text>
      <Text style={CreateFunctionStyle.bdHeaderText}>
        {'Tính đến hết học kỳ: '}
        <Text style={CreateFunctionStyle.bdHeaderValue}>{text[3] || '--'}</Text>
      </Text>
      <Text style={CreateFunctionStyle.bdHeaderText}>
        {'Ngày cập nhật: '}
        <Text style={CreateFunctionStyle.bdHeaderValue}>{text[4] || '--'}</Text>
      </Text>
    </View>
  );
}

function createBD(ajaxData, getData) {
  const arrayAjaxData = Object.values(ajaxData || {});
  if (arrayAjaxData.length === 0) {
    return (
      <ScaleAndOpacity
        scaleMin={0}
        style={CreateFunctionStyle.emptyContainer}
        animateOnDidMount={true}>
        <View style={CreateFunctionStyle.emptyImgContainer}>
          <Image source={errorImg} style={CreateFunctionStyle.emptyImg} />
        </View>
        <Text style={CreateFunctionStyle.emptyText}>
          Không tìm thấy bảng điểm
        </Text>
      </ScaleAndOpacity>
    );
  }
  return (
    <FlatList
      windowSize={11}
      initialNumToRender={2}
      data={arrayAjaxData}
      renderItem={({item}) => createBDTable(item)}
      keyExtractor={(item, index) => item.ten_hocky || index.toString()}
      ListHeaderComponent={() => createHeaderTable(getData)}
    />
  );
}

export default createBD;
