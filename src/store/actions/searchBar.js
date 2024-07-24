import * as actionTypes from './actionTypes';
import axios from 'axios';

const BASE_SEARCH_URL = `${process.env.REACT_APP_HOST_IP_ADDRESS}/api/search`

export const getPostingRequest = (keyword) => {
  return {
    type: actionTypes.GET_POSTING_REQUEST,
    keyword
  }
}

export const setSearchKeyword = (keyword) => {
  return {
    type: actionTypes.SET_SEARCH_KEYWORD,
    keyword
  }
}

export const setPosting = (data) => {
  return {
    type: actionTypes.SET_POSTING,
    data
  }
}

export const getPostingFailure = (err) => {
  return {
    type: actionTypes.GET_POSTING_FAILURE
  }
}

export const getPosting = (keyword, site) => {
  const result = () => (dispatch) => {
    dispatch(getPostingRequest(keyword));
    // let data = new FormData();
    let resData = new Array(site.length);
    // data.append('search', keyword);
    const requests = site.map(async (page, index) => {
      if (page.isSelected) {
        await axios.get(`${BASE_SEARCH_URL}/${page.title.toLowerCase()}/`,
          {
            params: {'search': keyword}
          })
          .then((res) => {
            resData[index] = res.data;
          })
          .catch(err => {
            return dispatch(getPostingFailure(err))
          })
      } else {
        resData[index] = "";
      }
    })
    
    Promise.all(requests).then(() => {
      return dispatch(setPosting(resData))
    })                                              
  }
  return result();
}
