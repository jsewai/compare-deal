import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { styled } from '@mui/system'; // styledを使って@mui/systemからスタイルを適用
import { setPosting } from '../store/actions/searchBar';
import { useSelector, useDispatch } from "react-redux";

const BoxWrapper = styled('div')({
  position: 'absolute',
  right: '5em',
  top: '0',
  zIndex: 20,
});

const DropdownMenu = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const { result } = useSelector(state => ({
    result: [state.searchBar.result[0], state.searchBar.result[1]],
  }));
  
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const makeNumber = (str) => {
    const extractNumber = parseFloat(str.replace(/[^0-9.]/g, ''));
    return isNaN(extractNumber) ? 0 : extractNumber;
  };

  const lowToHigh = (a, b) => {
    return makeNumber(a.price) - makeNumber(b.price);
  };
  
  const highToLow = (a, b) => {
    return makeNumber(b.price) - makeNumber(a.price);
  };
  
  const sortAds = (isLowFirst) => {
    const orderBy = isLowFirst ? lowToHigh : highToLow;
    const sortedGoogle = {
      ...result[0],
      ads_result: result[0].ads_result.sort(orderBy)
    };
    const sortedKijiji = {
      ...result[1],
      ads_result: result[1].ads_result.sort(orderBy)
    };
    dispatch(setPosting([sortedGoogle, sortedKijiji]));
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const startSort = (isLowToHigh) => {
    sortAds(isLowToHigh);
  };

  return (
    <BoxWrapper>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        variant="contained"
        color="primary"
      >
        Sort by
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={() => startSort(true)}>Price: low to high</MenuItem>
                  <MenuItem onClick={() => startSort(false)}>Price: high to low</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </BoxWrapper>
  );
}

export default DropdownMenu;
