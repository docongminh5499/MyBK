import React from 'react';
import {Text, View} from 'react-native';
import * as Cheerio from 'react-native-cheerio';
import {CreateFunctionStyle} from '../Styles';

function createBTN(ajaxData, getData) {
  const $ = Cheerio.load(getData);
  const ketquaTotNghiep = $('.row.content-acc div').text();
  let hasResult = true;
  if (ketquaTotNghiep.includes('không')) {
    hasResult = false;
  }
  return (
    <View>
      <Text
        style={[
          CreateFunctionStyle.bangtotnghiep,
          hasResult ? CreateFunctionStyle.btnFailed : null,
        ]}>
        {ketquaTotNghiep}
      </Text>
    </View>
  );
}

export default createBTN;
