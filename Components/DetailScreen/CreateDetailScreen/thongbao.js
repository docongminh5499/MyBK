import React from 'react';
import {Text, View, FlatList} from 'react-native';
import {CreateFunctionStyle} from '../Styles';

function createTBItem(data) {
  return (
    <View>
      <Text>{data.ten_canhbao}</Text>
      <Text>{data.ngay_tao}</Text>
    </View>
  );
}

function createTB(data) {
  console.log(data);
  return (
    <FlatList
      windowSize={11}
      data={data[0].Rows}
      renderItem={({item}) => createTBItem(item)}
      keyExtractor={(item, index) => item.id.toString() || index.toString()}
      ItemSeparatorComponent={() => (
        <View style={{width: '100%', height: 40}} />
      )}
    />
  );
}

export default createTB;
