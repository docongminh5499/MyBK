import React from 'react';
import {Text, View, FlatList, Image} from 'react-native';
import * as Cheerio from 'react-native-cheerio';
import {CreateFunctionStyle} from '../Styles';

function createLLItem(item) {
  if (item.type === 'normal') {
    return (
      <View style={CreateFunctionStyle.normalLLContainer}>
        <View style={CreateFunctionStyle.normalThLL}>
          <Text style={CreateFunctionStyle.normalThTextLL}>{item.th}</Text>
        </View>
        <View style={CreateFunctionStyle.normalTdLL}>
          <Text style={CreateFunctionStyle.normalTdTextLL}>{item.td}</Text>
        </View>
      </View>
    );
  } else if (item.type === 'title') {
    return (
      <View style={CreateFunctionStyle.titleLL}>
        <Text style={CreateFunctionStyle.titleLLText}>{item.th}</Text>
      </View>
    );
  } else if (item.type === 'sub-title') {
    return (
      <View style={CreateFunctionStyle.subTitleLL}>
        <Text style={CreateFunctionStyle.subTitleTextLL}>{item.th}</Text>
      </View>
    );
  } else if (item.type === 'sub-value') {
    return (
      <View style={CreateFunctionStyle.subTitleLL}>
        <Text style={CreateFunctionStyle.subValueTextLL}>{item.td}</Text>
      </View>
    );
  }
  return null;
}

function formatData(getData) {
  const $ = Cheerio.load(getData || '');
  $('table tr a[data-link=cmndedit]').remove(); // remove cap_nhat button
  const data = $('table tr').map(function() {
    const th = $('th', this);
    const td = $('td', this);
    let type = 'normal';

    if (th.attr('colspan') && th.attr('style')) {
      type = 'title';
    } else if (th.attr('colspan')) {
      type = 'sub-title';
    } else if (th.text() === '') {
      type = 'sub-value';
    }

    return {th: th.text().trim(), td: td.text().trim(), type};
  });
  return data.get();
}

function empty() {
  return (
    <View style={CreateFunctionStyle.emptyContainer}>
      <Text style={CreateFunctionStyle.emptyText}>
        Không tìm thấy lý lịch sinh viên
      </Text>
    </View>
  );
}

function createLL(ajax, get) {
  const data = formatData(get);
  return (
    <FlatList
      data={data}
      renderItem={dataRender => createLLItem(dataRender.item)}
      keyExtractor={(item, index) => item.th + item.td + index}
      ListEmptyComponent={empty}
    />
  );
}

export default createLL;
