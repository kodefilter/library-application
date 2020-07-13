import React, { useEffect } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import ListSubheader from '@material-ui/core/ListSubheader'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../types'
import BookCard from '../BookCard'
import BookForm from '../BookForm'
import AuthorForm from '../AuthorForm/intex'
import { fetchBooksThunk } from '../../redux/actions'

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
      height: '100%',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  })
)

export default function BookGridList() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBooksThunk())
  }, [dispatch])

  const items = useSelector((state: AppState) => state.book.items)

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <GridList cellHeight={300} className={classes.gridList} cols={4}>
        <GridListTile key="Subheader" cols={8} style={{ height: 'auto' }}>
          <ListSubheader component="div">
            <BookForm />
            <AuthorForm />
          </ListSubheader>
        </GridListTile>
        {items.map(book => (
          <GridListTile key={book.title}>
            <BookCard key={book.title} book={book} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}
