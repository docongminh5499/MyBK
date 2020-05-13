import React from 'react';
import {Text, View, FlatList} from 'react-native';
import * as Cheerio from 'react-native-cheerio';
import {CreateFunctionStyle} from '../Styles';
import {Table, Row} from 'react-native-table-component';

function createKQTSItem(data) {
  data = data && Array.isArray(data) ? data : [];
  const widthArr = [200, 200];
  data.forEach(e => {
    e[1] = e[1].trim();
  });
  let temp = data[9][1].split('\n');
  temp.forEach((e, i) => (temp[i] = e.trim()));
  temp = temp.filter(e => e !== '');
  temp = temp.join('\n');
  data[9][1] = temp;
  return (
    <View>
      <Table style={CreateFunctionStyle.tkb_table_style}>
        {data.map((row, index) => (
          <Row
            key={row}
            data={row}
            widthArr={widthArr}
            style={index % 2 === 0 && CreateFunctionStyle.tkb_even_row}
            textStyle={CreateFunctionStyle.tkb_body_text}
          />
        ))}
      </Table>
    </View>
  );
}

function empty() {
  return (
    <View>
      <Text style={CreateFunctionStyle.KQTSEmpty}>
        Danh sách quyết định rỗng
      </Text>
    </View>
  );
}

function createKQTS(ajaxData, getData) {
  const $ = Cheerio.load(getData);
  const ketquaTable = $('.wrapper-account-info .table').children();
  var thongtintuyensinh = [];
  ketquaTable.children().each((i, e) => {
    const tieuchi = $(e)
      .children()
      .first()
      .text();
    const ketqua = $(e)
      .children()
      .last()
      .text();
    thongtintuyensinh.push([tieuchi, ketqua]);
  });
  return (
    <FlatList
      windowSize={11}
      data={[thongtintuyensinh]}
      renderItem={({item}) => createKQTSItem(item)}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={empty}
      ItemSeparatorComponent={() => (
        <View style={{width: '100%', height: 40}} />
      )}
    />
  );
}

export default createKQTS;
