import React from 'react';
import {Text, View, FlatList, ScrollView} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import {CreateFunctionStyle} from '../Styles';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function createHPTable(data) {
  const thead = [
    'MÃ MH',
    'TÊN MÔN HỌC',
    'TÍN CHỈ HỌC PHÍ',
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
      !monhoc.tc_hocphi || monhoc.tc_hocphi === 0 ? '--' : monhoc.tc_hocphi,
      numberWithCommas(monhoc.don_gia.replace(/\s/g, '')),
      numberWithCommas(monhoc.thanh_tien.replace(/\s/g, '')),
      !monhoc.muc_giam || monhoc.muc_giam === 0 ? '' : monhoc.muc_giam,
      monhoc.ghi_chu || '',
    ];
  });

  var tonghp = data.tong_hp_thanhtoan;
  var dadong = data.da_dong;
  var phaidong = data.phai_dong;
  var tamung = data.tam_ung;
  var conlai = data.con_lai;
  (tonghp == null || tonghp === '0') && (tonghp = '--');
  (dadong == null || dadong === '0') && (dadong = '--');
  (phaidong == null || phaidong === '0') && (phaidong = '--');
  (tamung == null || tamung === '0') && (tamung = '--');
  (conlai == null || conlai === '0') && (conlai = '--');

  return (
    <View key={data.ten_hocky} style={CreateFunctionStyle.tkb_wrapper}>
      <Text style={CreateFunctionStyle.ten_hoc_ky}>{data.ten_hocky}</Text>
      <Text style={CreateFunctionStyle.tkb_ngay_cn}>
        Ngày cập nhật: {' ' + data.ngay_cap_nhat}
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
      <View style={CreateFunctionStyle.hpWrap}>
        <Text style={CreateFunctionStyle.hpText}>
          {'Tổng học phí: '}
          <Text style={CreateFunctionStyle.numberHp}>
            {numberWithCommas(tonghp.replace(/\s/g, '')) + ' đ'}
          </Text>
        </Text>
      </View>
      <View style={CreateFunctionStyle.hpWrap}>
        <Text style={CreateFunctionStyle.hpText}>
          {'Số tiền đã tạm ứng hoặc được khấu trừ: '}
          <Text style={CreateFunctionStyle.numberHp}>
            {numberWithCommas(dadong.replace(/\s/g, '')) + ' đ'}
          </Text>
        </Text>
        <Text style={CreateFunctionStyle.hpText}>
          {'Tổng tiền cần thanh toán: '}
          <Text style={CreateFunctionStyle.numberHp}>
            {numberWithCommas(phaidong.replace(/\s/g, '')) + ' đ'}
          </Text>
        </Text>
      </View>
      <View style={CreateFunctionStyle.hpWrap}>
        <Text style={CreateFunctionStyle.hpText}>
          {'Số tiền cần thanh toán đợt 1:  '}
          <Text style={CreateFunctionStyle.numberHp}>
            {numberWithCommas(tamung.replace(/\s/g, '')) + ' đ'}
          </Text>
        </Text>
        <Text style={CreateFunctionStyle.hpText}>
          {'Số tiền cần thanh toán đợt 2: '}
          <Text style={CreateFunctionStyle.numberHp}>
            {numberWithCommas(conlai.replace(/\s/g, '')) + ' đ'}
          </Text>
        </Text>
      </View>
    </View>
  );
}

function createHP(data) {
  return (
    <FlatList
      windowSize={11}
      data={Object.values(data)}
      renderItem={({item}) => createHPTable(item)}
      keyExtractor={(item) => item.ten_hocky}
    />
  );
}

export default createHP;
