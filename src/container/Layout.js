import React from 'react'
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';

const Root = styled('div')(({ theme }) => ({
  flexGrow: 1,
}));

const Layout = (props) => {
  return (
    <Root>
      <Container>
        {props.children}
      </Container>
    </Root>
  );
}

export default Layout
