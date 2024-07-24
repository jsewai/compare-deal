import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../store/actions/selectPage';
import { Checkbox, FormControlLabel, Box } from '@mui/material';

const PageSelection = (props) => {
  const dispatch = useDispatch();
  const { sites } = useSelector(state => ({
    sites: [state.selectPage.google, state.selectPage.kijiji]
  }));

  const pageSelect = (event) => {
    dispatch(setPage(event.target.value, event.target.checked));
  }

  return (
    <Box display="flex" alignItems="center">
      {
        props.pageChoice.map((page, index) => (
          <FormControlLabel
            value={page.title}
            control={<Checkbox color="primary" onClick={pageSelect} checked={sites[index].isSelected}/>}
            label={page.title}
            labelPlacement="start"
            key={index}
          />
        ))
      }
    </Box>
  );
}

export default PageSelection;
