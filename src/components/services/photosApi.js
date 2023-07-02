import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const KEY = '36028028-2964cb2561d4c05b8daf5348d';

export const fetchPhotosWithQuery = async (searchValue, page) => {
  const response = await axios.get(API_URL, {
    params: {
      key: KEY,
      q: searchValue,
      page: page,
      per_page: 12,
    },
  });
  return response.data.hits;
};
