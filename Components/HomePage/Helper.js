export const icon = [
  {
    title: 'Học tập',
    item: [
      {
        name: 'Thời khóa biểu',
        icon: require('./icon/thoikhoabieu.png'),
        url: 'https://mybk.hcmut.edu.vn/stinfo/lichthi/ajax_lichhoc',
      },
      {name: 'Lịch thi', icon: require('./icon/lichthi.png')},
      {name: 'Bảng điểm', icon: require('./icon/bangdiem.png')},
      {name: 'Thông báo', icon: require('./icon/thongbao.png')},
      {name: 'Điểm chuyển', icon: require('./icon/diemchuyen.png')},
      {name: 'Học phí', icon: require('./icon/hocphi.png')},
    ],
  },
  {
    title: 'Thông tin sinh viên',
    item: [
      {name: 'Lý lịch', icon: require('./icon/lylich.png')},
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

function getWeek(date) {
  const dateCopy = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  dateCopy.setDate(dateCopy.getDate() - dayNr + 3);
  const firstThursday = dateCopy.valueOf();
  dateCopy.setMonth(0, 1);
  if (dateCopy.getDay() !== 4) {
    dateCopy.setMonth(0, 1 + ((4 - dateCopy.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - dateCopy) / 604800000);
}

const dayNames = [
  'Chủ Nhật',
  'Thứ Hai',
  'Thứ Ba',
  'Thứ Tư',
  'Thứ Năm',
  'Thứ Sáu',
  'Thứ Bảy',
];

export function createDateString() {
  const date = new Date();
  const weekNumber = getWeek(date);

  let day = dayNames[date.getDay()];
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return `Tuần ${weekNumber}, ${day}, Ngày ${dd}/${mm}/${yyyy}`;
}
