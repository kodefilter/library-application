import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { useDispatch } from 'react-redux'
import DeleteIcon from '@material-ui/icons/Delete'
import { Book } from '../../../types'
import {
  removeBookThunk,
  borrowBookThunk,
  addNotification,
  unborrowBookThunk,
} from '../../../redux/actions'
import { IconButton } from '@material-ui/core'
import EditBookForm from '../EditBookForm'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
})

export type BookCardProps = {
  book: Book
}

export default function BookCard({ book }: any) {
  const dispatch = useDispatch()

  const handleDelete = () => {
    if (window.confirm(`Delete ${book.title}`)) {
      dispatch(removeBookThunk(book))
    }
  }

  const handleBorrow = () => {
    if (book.isAvailable) {
      try {
        dispatch(borrowBookThunk(book))
        dispatch(
          addNotification({
            errorMessage: '',
            successMessage: `You Just borrowed ${book.title}`,
          })
        )
        setTimeout(() => {
          dispatch(addNotification({ errorMessage: '', successMessage: '' }))
        }, 3000)
      } catch (error) {
        dispatch(
          addNotification({
            errorMessage: ` Error : ${error.response.data.error}`,
            successMessage: '',
          })
        )
        setTimeout(() => {
          dispatch(addNotification({ errorMessage: '', successMessage: '' }))
        }, 3000)
      }
    } else {
      try {
        dispatch(unborrowBookThunk(book))
        dispatch(
          addNotification({
            errorMessage: '',
            successMessage: `You Just unborrowed ${book.title}`,
          })
        )
        setTimeout(() => {
          dispatch(addNotification({ errorMessage: '', successMessage: '' }))
        }, 3000)
      } catch (error) {
        dispatch(
          addNotification({
            errorMessage: ` Error : ${error.response.data.error}`,
            successMessage: '',
          })
        )
        setTimeout(() => {
          dispatch(addNotification({ errorMessage: '', successMessage: '' }))
        }, 3000)
      }
    }
  }

  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="https://www.basicbooks.com/wp-content/uploads/2019/09/9781541699359-1.jpg?fit=496%2C750"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {book.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {book.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          {book.publisher}
        </Button>
        <IconButton
          color="secondary"
          aria-label="delete book"
          component="span"
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
        <EditBookForm key={book.title} book={book} />
        {book.isAvailable ? (
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleBorrow}
          >
            Borrow
          </Button>
        ) : (
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={handleBorrow}
          >
            Unborrow
          </Button>
        )}
      </CardActions>
    </Card>
  )
}
