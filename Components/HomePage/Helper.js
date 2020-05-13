export const icon = [
  {
    title: 'Học tập',
    item: [
      {
        name: 'Thời khóa biểu',
        icon: require('./icon/thoikhoabieu.png'),
        ajaxUrl: 'https://mybk.hcmut.edu.vn/stinfo/lichthi/ajax_lichhoc',
        key: 'tkb',
      },
      {
        name: 'Lịch thi',
        icon: require('./icon/lichthi.png'),
        ajaxUrl: 'https://mybk.hcmut.edu.vn/stinfo/lichthi/ajax_lichthi',
        key: 'lt',
      },
      {
        name: 'Bảng điểm',
        icon: require('./icon/bangdiem.png'),
        ajaxUrl: 'https://mybk.hcmut.edu.vn/stinfo/grade/ajax_grade',
        getUrl: 'https://mybk.hcmut.edu.vn/stinfo/grade',
        key: 'bd',
      },
      // {
      //   name: 'Thông báo',
      //   icon: require('./icon/thongbao.png'),
      //   ajaxUrl: 'https://mybk.hcmut.edu.vn/stinfo/message/data',
      //   key: 'tb',
      // },
      {
        name: 'Điểm chuyển',
        icon: require('./icon/diemchuyen.png'),
        ajaxUrl: 'https://mybk.hcmut.edu.vn/stinfo/grade/ajax_grade_diemchuyen',
        getUrl: 'https://mybk.hcmut.edu.vn/stinfo/grade_diemchuyen',
        key: 'dc',
      },
      {
        name: 'Học phí',
        icon: require('./icon/hocphi.png'),
        ajaxUrl: 'https://mybk.hcmut.edu.vn/stinfo/hoc-phi/ajax_hocphi',
        key: 'hp',
      },
    ],
  },
  {
    title: 'Thông tin sinh viên',
    item: [
      {
        name: 'Lý lịch',
        icon: require('./icon/lylich.png'),
        getUrl: 'https://mybk.hcmut.edu.vn/stinfo/profile',
        key: 'll',
      },
      {
        name: 'Tình trạng sinh viên',
        icon: require('./icon/tinhtrang.png'),
        ajaxUrl: 'https://mybk.hcmut.edu.vn/stinfo/qd/ajax_qd',
        getUrl: 'https://mybk.hcmut.edu.vn/stinfo/qd',
        key: 'ttsv',
      },
    ],
  },
  {
    title: 'Thống kê học tập',
    item: [
      {
        name: 'Điểm trung bình',
        icon: require('./icon/diemtrungbinh.png'),
        ajaxUrl: 'https://mybk.hcmut.edu.vn/stinfo/grade/ajax_grade',
        key: 'dtb',
      },
      {
        name: 'Số tín chỉ',
        icon: require('./icon/sotinchi.png'),
        ajaxUrl: 'https://mybk.hcmut.edu.vn/stinfo/grade/ajax_grade',
        key: 'stc',
      },
    ],
  },
  {
    title: 'Tuyển sinh',
    item: [
      {
        name: 'Kết quả tuyển sinh',
        icon: require('./icon/ketquatuyensinh.png'),
        getUrl: 'https://mybk.hcmut.edu.vn/stinfo/ketqua_tuyensinh',
        key: 'kqts',
      },
    ],
  },
  {
    title: 'Tốt nghiệp',
    item: [
      {
        name: 'Bằng tốt nghiệp',
        icon: require('./icon/bangtotnghiep.png'),
        getUrl: 'https://mybk.hcmut.edu.vn/stinfo/ketqua_totnghiep',
        key: 'btn',
      },
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
