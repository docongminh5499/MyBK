import React from 'react';
import {Text, View, FlatList} from 'react-native';
import * as Cheerio from 'react-native-cheerio';
import {CreateFunctionStyle} from '../Styles';

function createTTSVItem(data) {
  return (
    <View>
      <Text
        style={[
          CreateFunctionStyle.ttsvText,
          CreateFunctionStyle.ttsvItemHeader,
        ]}>
        {data.ten_hocky}
      </Text>
      <Text style={CreateFunctionStyle.ttsvText}>
        {'Tình trạng: '}
        <Text style={CreateFunctionStyle.ttsvValue}> {data.ten_lydo}</Text>
      </Text>
      <Text style={CreateFunctionStyle.ttsvText}>
        {'Số quyết định: '}
        <Text style={CreateFunctionStyle.ttsvValue}>{data.so_quyetdinh}</Text>
      </Text>
      <Text style={CreateFunctionStyle.ttsvText}>
        {'Ngày ra quyết định: '}
        <Text style={CreateFunctionStyle.ttsvValue}>{data.ngayqd}</Text>
      </Text>
      <Text style={CreateFunctionStyle.ttsvText}>
        {'Loại: '}
        <Text style={CreateFunctionStyle.ttsvValue}>{data.ten_loai}</Text>
      </Text>
    </View>
  );
}

function createTTSVHeader(data) {
  const $ = Cheerio.load(data);
  const tinh_trang = $('span[class=red]').text();
  return (
    <View style={CreateFunctionStyle.ttsvHeader}>
      <Text style={CreateFunctionStyle.ttsvHeaderText}>
        {'Tình trạng hiện tại: '}
        <Text style={CreateFunctionStyle.ttsvHeaderStatus}>{tinh_trang}</Text>
      </Text>
    </View>
  );
}

function empty() {
  return (
    <View>
      <Text style={CreateFunctionStyle.ttsvEmpty}>
        Danh sách quyết định rỗng
      </Text>
    </View>
  );
}

function createTTSV(ajaxData, getData) {
  const array = ajaxData && Array.isArray(ajaxData) ? ajaxData : [];
  const rows = array[0] || {};
  const data = rows.Rows || [];

  return (
    <FlatList
      windowSize={11}
      data={data}
      renderItem={({item}) => createTTSVItem(item)}
      keyExtractor={(item, index) => item.id.toString() || index.toString()}
      ListHeaderComponent={() => createTTSVHeader(getData)}
      ListEmptyComponent={empty}
      ItemSeparatorComponent={() => (
        <View style={{width: '100%', height: 40}} />
      )}
    />
  );
}

export default createTTSV;
