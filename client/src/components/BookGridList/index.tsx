import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { useSelector } from 'react-redux';
import { AppState } from '../../types';
import BookCard from '../BookCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: '100%',
      height: '100%'
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }),
);

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function BookGridList() {


   //book in items array
  const items = useSelector((state: AppState) => state.book.items) 
  
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={300} className={classes.gridList} cols={4}>
        <GridListTile key="Subheader" cols={8} style={{ height: 'auto' }}>
          <ListSubheader component="div">Library</ListSubheader>
        </GridListTile>
        {items.map(book => (
          <GridListTile key={book._id}>
            <BookCard book={book}/>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
