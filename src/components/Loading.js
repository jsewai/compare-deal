import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loading = () => {
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <CircularProgress color="primary" />
    </Box>
  );
}

export default Loading;