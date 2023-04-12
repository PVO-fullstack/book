import axios from 'axios';

// axios.defaults.baseURL = 'https://books-backend.p.goit.global';

export const getTopBooks = async () => {
  const response = await axios.get(
    'https://books-backend.p.goit.global/books/top-books'
  );
  return response.data;
};

export const getBookById = async id => {
  try {
    const response = await axios.get(
      `https://books-backend.p.goit.global/books/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
