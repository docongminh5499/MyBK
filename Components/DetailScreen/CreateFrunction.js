import createTKB from './CreateDetailScreen/thoikhoabieu';
import createLT from './CreateDetailScreen/lichthi';
import createBD from './CreateDetailScreen/bangdiem';
import createDC from './CreateDetailScreen/diemchuyen';
import createHP from './CreateDetailScreen/hocphi';

const mapObject = {
  tkb: createTKB,
  lt: createLT,
  bd: createBD,
  dc: createDC,
  hp: createHP,
  default: () => {},
};

export const CreateFunction = (data, getData, key = 'default') => {
  // Ajax data will be parsed
  // Get data will not be parsed (because of containing HTML tags sometimes... )
  if (data && mapObject[key]) {
    const jsonData = JSON.parse(data);
    return mapObject[key](jsonData, getData);
  }
  return null;
};
