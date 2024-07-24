import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getBookmark, removeBookmark } from '../store/actions/bookmark';
import Navbar from '../components/Navbar';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const Media = styled(CardMedia)({
  height: 140,
});

const Container = styled(Grid)({
  marginTop: '3rem',
});

const BookmarkCard = styled(Card)({
  position: 'relative',
  height: '100%'
});

const Icons = styled(IconButton)({
  position: 'absolute',
  right: 0,
  zIndex: 99,
  top: 0,
});

const BookmarkGrid = styled(Grid)({
  height: '340px',
  left: 'auto',
  right: 'auto',
  padding: '1vw'
});

const Title = styled(Typography)({
  fontSize: '1rem'
});

const Bookmark = () => {
  const dispatch = useDispatch();
  const { bookmarkList } = useSelector(state => ({
    bookmarkList: state.bookmark.bookmarkList
  }));

  useEffect(() => {
    dispatch(getBookmark());
  }, [])

  const removeItem = (pk) => {
    dispatch(removeBookmark(pk));
  }

  if (bookmarkList !== null) {
    return (
      <Fragment>
        <Navbar />
        <Container container item xs={12}>
          <Grid container alignContent='flex-start' item>
            <Grid item xs={12}>
              <Typography gutterBottom variant="h5" component="h2" align="center">
                Bookmarks
              </Typography>
            </Grid>
            {
              bookmarkList.map((posting, index) => (
                <Fragment key={posting.pk + index}>
                  <BookmarkGrid item sm={3} xs={6} key={index}>
                    <BookmarkCard square={true} >
                      <a href={posting.urls} alt={posting.title} target="_blank" rel="noopener noreferrer">
                        <CardActionArea>
                          <Media
                            component="img"
                            alt={posting.title}
                            image={posting.img}
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
                      <Icons aria-label="delete" onClick={() => removeItem(posting.pk)}>
                        <DeleteIcon fontSize="small" />
                      </Icons>
                    </BookmarkCard>
                  </BookmarkGrid>
                </Fragment>
              ))
            }
          </Grid>
        </Container>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Navbar />
        <Container container item xs={12}>
          <Grid container alignContent='flex-start' item>
            <Grid item xs={12}>
              <Typography gutterBottom variant="h5" component="h2" align="center">
                There is no Bookmarks yet.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Fragment>
    );
  }
}

export default Bookmark;
