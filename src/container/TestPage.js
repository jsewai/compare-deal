import React, { Fragment }from 'react';
import ItemList from './ItemList';
import Navbar from '../components/Navbar';
import WelcomeMessage from '../components/WelcomeMessage';


const TestPage = () => {
  return (
    <Fragment>
      <Navbar />
      <ItemList />
      <WelcomeMessage />
    </Fragment>
  )
}

export default TestPage;
