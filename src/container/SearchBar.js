import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { setSearchKeyword, getPosting } from '../store/actions/searchBar'
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';

const Search = styled('form')(({ theme }) => ({
  position: 'relative',
  display: 'flex',

  backgroundColor: '#FFFFFF',
  marginRight: theme.spacing(2),
  width: '60%',
  marginLeft: theme.spacing(3),

}));

const SearchIconWrapper = styled(Button)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  zIndex: 99,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    borderRadius: '.5em',
    border: 'black solid 1px',
  },
}));

const sampleKeywords = ['Baseball bat', 'Baseball cleats', 'Smart Phone', 'Baseball']
const randomKeyword = sampleKeywords[Math.floor(Math.random() * sampleKeywords.length)]

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sites, keyword } = useSelector(state => ({
    sites: [state.selectPage.google, state.selectPage.kijiji],
    keyword: state.searchBar.keyword
  }));
  const { register, handleSubmit } = useForm();

  const firstSearch = () => {
    if (!keyword) {
      dispatch(getPosting(randomKeyword, sites))
      dispatch(setSearchKeyword(randomKeyword))
      return randomKeyword
    } else {
      return keyword
    }
  }

  const triggerSearch = (data, e) => {
    e.preventDefault();
    navigate('/')
    dispatch(getPosting(data.search, sites))
  }

  return (
    <Search onSubmit={handleSubmit((data, e) => triggerSearch(data, e))}>
      <SearchIconWrapper type='submit'>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
          placeholder="Search…"
          defaultValue={firstSearch()}
          inputProps={{ 'aria-label': 'search', ...register('search') }}
      />
    </Search>
  )
}

export default SearchBar
