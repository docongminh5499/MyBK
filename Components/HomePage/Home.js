import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {HomeStyle} from './Style';
import Container from './Container';

const avatar = require('./icon/avatar.jpg');
const logout = require('./icon/logout.png');
const data = [
  {
    title: 'Học tập',
    item: [
      {name: 'Thời khóa biểu', icon: require('./icon/thoikhoabieu.png')},
      {name: 'Lịch thi', icon: require('./icon/lichthi.png')},
      {name: 'Bảng điểm', icon: require('./icon/bangdiem.png')},
      {name: 'Thông báo', icon: require('./icon/thongbao.png')},
      {name: 'Điểm chuyển', icon: require('./icon/diemchuyen.png')},
      {name: 'Góp ý', icon: require('./icon/gopy.png')},
      {name: 'Học phí', icon: require('./icon/hocphi.png')},
    ],
  },
  {
    title: 'Thông tin sinh viên',
    item: [
      {name: 'Lý lịch', icon: require('./icon/lylich.png')},
      {name: 'Cập nhật địa chỉ', icon: require('./icon/capnhatdiachi.png')},
      {
        name: 'Tình trạng sinh viên',
        icon: require('./icon/tinhtrang.png'),
      },
    ],
  },
  {
    title: 'Thống kê học tập',
    item: [
      {name: 'Điểm trung bình', icon: require('./icon/diemtrungbinh.png')},
      {name: 'Số tín chỉ', icon: require('./icon/sotinchi.png')},
    ],
  },
  {
    title: 'Hỗ trợ',
    item: [
      {name: 'MyBk', icon: require('./icon/mybk.png')},
      {name: 'Qui chế', icon: require('./icon/quiche.png')},
      {name: 'Hướng dẫn', icon: require('./icon/huongdan.png')},
      {name: 'Bách Khoa Wiki', icon: require('./icon/bkwiki.png')},
      {name: 'Địa điểm học', icon: require('./icon/diadiemhoc.png')},
      {name: 'Giờ học', icon: require('./icon/giohoc.png')},
    ],
  },
  {
    title: 'Đăng ký thông tin',
    item: [{name: 'Người thân', icon: require('./icon/nguoithan.png')}],
  },
  {
    title: 'Tuyển sinh',
    item: [
      {name: 'Kết quả tuyển sinh', icon: require('./icon/ketquatuyensinh.png')},
    ],
  },
  {
    title: 'Tốt nghiệp',
    item: [
      {name: 'Bằng tốt nghiệp', icon: require('./icon/bangtotnghiep.png')},
      {name: 'Tiến độ học tập', icon: require('./icon/tiendohoctap.png')},
    ],
  },
];

export default class Home extends Component {
  render() {
    return (
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={HomeStyle.banner}>
            <Image source={avatar} style={HomeStyle.avatar} />
            <View style={HomeStyle.info}>
              <Text style={HomeStyle.info_name} numberOfLines={1}>
                Đỗ Công Minh
              </Text>
              <Text style={HomeStyle.info_major} numberOfLines={1}>
                Khoa KH&KT máy tính
              </Text>
            </View>
            <TouchableOpacity style={HomeStyle.logout}>
              <Image source={logout} />
            </TouchableOpacity>
          </View>
          <Text style={HomeStyle.time}>Tuần 10, Thứ Sáu, ngày 06/03/2020</Text>
          <View>
            {data.map(element => (
              <Container
                key={element.title}
                title={element.title}
                item={element.item}
              />
            ))}
          </View>
          <View style={HomeStyle.footer}>
            <Text style={HomeStyle.footerTitle}>MyBK App</Text>
            <Text style={HomeStyle.footertext}>Copyright &copy; - 2020</Text>
            <Text style={HomeStyle.footertext}>Nguyễn Vũ Hoàng Phúc</Text>
            <Text style={HomeStyle.footertext}>Đỗ Công Minh</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
