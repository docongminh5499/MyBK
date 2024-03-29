import createTKB from './CreateDetailScreen/thoikhoabieu';
import createLT from './CreateDetailScreen/lichthi';
import createBD from './CreateDetailScreen/bangdiem';
import createDC from './CreateDetailScreen/diemchuyen';
import createHP from './CreateDetailScreen/hocphi';
//import createTB from './CreateDetailScreen/thongbao';
import createLL from './CreateDetailScreen/lylich';
import createTTSV from './CreateDetailScreen/tinhtrangsinhvien';
import createKQTS from './CreateDetailScreen/ketquatuyensinh';
import createDTB from './CreateDetailScreen/diemtrungbinh';
import createSTC from './CreateDetailScreen/sotinchi';
import createBTN from './CreateDetailScreen/bangtotnghiep';
const mapObject = {
  tkb: createTKB,
  lt: createLT,
  bd: createBD,
  dc: createDC,
  hp: createHP,
  //tb: createTB,
  ll: createLL,
  ttsv: createTTSV,
  kqts: createKQTS,
  dtb: createDTB,
  stc: createSTC,
  btn: createBTN,
  default: () => {},
};

export const CreateFunction = (data, getData, key = 'default') => {
  // Ajax data will be parsed
  // Get data will not be parsed (because of containing HTML tags sometimes... )
  if ((data || getData) && mapObject[key]) {
    const jsonData = data ? JSON.parse(data) : '';
    return mapObject[key](jsonData, getData);
  }
  return null;
};
