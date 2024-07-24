import React, { Fragment } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { addBookmark } from '../store/actions/bookmark';
import Loading from '../components/Loading';
import LoginPop from '../components/LoginPop';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DropdownMenu from '../components/DropdownMenu';

const Media = styled(CardMedia)({
  height: 140,
  objectFit: 'contain'
});

const Container = styled(Grid)({
  background: 'white',
});

const ItemCard = styled(Card)({
  position: 'relative',
  height: '100%'
});

const Icons = styled(FormControlLabel)({
  position: 'absolute',
  right: 0,
  zIndex: 99,
  bottom: 0,
});

const ItemGrid = styled(Grid)({
  height: '340px',
  left: 'auto',
  right: 'auto',
  padding: '1vw'
});

const Title = styled(Typography)({
  fontSize: '1rem'
});

const GutterTop = styled(Typography)({
  marginTop: '.35em'
});

const ItemList = () => {
  const dispatch = useDispatch();
  const { sites, result, isFetching, bookmarkErr, isAuthenticated } = useSelector(state => ({
    sites: [state.selectPage.google, state.selectPage.kijiji],
    result: [state.searchBar.result[0], state.searchBar.result[1]],
    isFetching: state.searchBar.isFetching,
    bookmarkErr: state.bookmark.error,
    isAuthenticated: state.auth.isAuthenticated,
  }));

  const addToBookmark = (posting) => {
    const payload = {
      'title': posting.title,
      'urls': posting.ads_url,
      'price': posting.price,
      'img': posting.img_url,
    };
    dispatch(addBookmark(payload));
  }

  const adjustGrid = (x, y) => {
    return sites[0].isSelected && sites[1].isSelected ? x : y
  }

  if (!isFetching) {
    return (
      <Container container item sm={12} style={{ position: 'relative' }}>
        <DropdownMenu />

        {
          result.map((page, index) =>
            sites[index].isSelected && page &&
            <Fragment key={index}>
              <Grid container alignContent='flex-start' item xs={adjustGrid(6, 12)}>
                <Grid item xs={12}>
                  <GutterTop gutterBottom variant="subtitle2" align="left">
                    {page.i}
                  </GutterTop>
                </Grid>
                {
                  page.ads_result.map((posting, index) => (
                    <Fragment key={posting.title + index}>
                      <ItemGrid item xs={adjustGrid(12, 6)} sm={adjustGrid(6, 3)} key={index}>
                        <ItemCard square={true}>
                          {isAuthenticated ?
                            <Icons
                              control={<Checkbox onClick={addToBookmark.bind(this, posting)} icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
                            />
                            :
                            <LoginPop />
                          }
                          <a href={posting.ads_url} alt={posting.title} target="_blank" rel="noopener noreferrer">
                            <CardActionArea>
                              <Media
                                component="img"
                                alt={posting.title}
                                image={posting.img_url}
                                title={posting.title}
                              />
                              <CardContent>
                                <Title gutterBottom variant="h5" component="h4">
                                  {posting.title}
                                </Title>
                                <Typography variant="body2" color="textSecondary" component="p">
                                  {posting.price}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </a>
                          <CardActions>
                          </CardActions>
                        </ItemCard>
                      </ItemGrid>
                    </Fragment>
                  ))
                }
              </Grid>
            </Fragment>
          )
        }
      </Container>
    )
  } else {
    return <Loading />
  }
}

export default ItemList;
