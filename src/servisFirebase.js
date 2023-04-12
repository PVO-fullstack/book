import axios from 'axios';

axios.defaults.baseURL = `https://books-314f3-default-rtdb.europe-west1.firebasedatabase.app`;

const bookName = { id: '12345', bookName: 'good', img: 'xtr.uyyu.com' };

export const postTopBooks = async book => {
  const uidW = localStorage.getItem('uid');
  const parseUid = await JSON.parse(uidW);
  const response = await axios.post(`${parseUid}.json?auth=${parseUid}`, book);
  return response.data;
};

export const getShopingList = async () => {
  const uidW = localStorage.getItem('uid');
  const parseUid = await JSON.parse(uidW);
  //   console.log(parseUid);
  const response = await axios.get(`${parseUid}.json?auth=${parseUid}`);
  return response.data;
  // console.log(response.data);
};

export const deleteBookShoping = async key => {
  const uidW = localStorage.getItem('uid');
  const parseUid = await JSON.parse(uidW);
  //   console.log(parseUid);
  const response = await axios.delete(
    `${parseUid}/${key}.json?auth=${parseUid}`
  );
  return response.data;
  // console.log(response.data);
};
