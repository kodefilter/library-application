import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { useSelector, useDispatch } from 'react-redux'

import {
  InputLabel,
  Select,
  Input,
  Chip,
  MenuItem,
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from '@material-ui/core'
import { fetchAuthorsThunk, updateBookThunk } from '../../../redux/actions'
import { AppState, Book } from '../../../types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  })
)

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(name: string, authorId: string[], theme: Theme) {
  return {
    fontWeight:
      authorId.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

export type EditBookFormProps = {
  book: Book
}

export default function EditBookForm({ book }: EditBookFormProps) {
  const [open, setOpen] = useState(false)
  const [newTitle, setNewTitle] = useState(book.title)
  const [newDescription, setNewDescription] = useState(book.description)
  const [newPublisher, setNewPublisher] = useState(book.publisher)
  const [authorIdList, setAuthorIdList] = useState<string[]>(book.authors)
  const classes = useStyles()
  const theme = useTheme()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAuthorsThunk())
  }, [dispatch])

  const authorList = useSelector((state: AppState) => state.author.authors)

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAuthorIdList(event.target.value as string[])
  }

  //input fields of book which are required, more can be added here
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value)
  }
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDescription(e.target.value)
  }
  const handlePublisherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPublisher(e.target.value)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const updateBook = async (e: React.FormEvent) => {
    e.preventDefault()

    const newBook: Book = {
      _id: book._id,
      title: newTitle,
      description: newDescription,
      publisher: newPublisher,
      isAvailable: false,
      authors: authorIdList,
    }

    dispatch(updateBookThunk(newBook))
  }

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        UPDATE BOOK
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add new book</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit Book and Update</DialogContentText>
          <form onSubmit={updateBook}>
            <TextField
              id="outlined-full-width"
              label="Title"
              style={{ margin: 8 }}
              value={newTitle}
              onChange={handleTitleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <TextField
              id="outlined-full-width"
              label="Publisher"
              style={{ margin: 8 }}
              value={newPublisher}
              onChange={handlePublisherChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <TextField
              id="outlined-full-width"
              label="Description"
              style={{ margin: 8 }}
              value={newDescription}
              onChange={handleDescriptionChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <InputLabel id="demo-mutiple-chip-label">Select Authors</InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={authorIdList}
              onChange={handleChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div className={classes.chips}>
                  {(selected as string[]).map(value => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {authorList.map(author => (
                <MenuItem
                  key={author.firstName}
                  value={author._id}
                  style={getStyles(author.firstName, authorIdList, theme)}
                >
                  {author.firstName}
                </MenuItem>
              ))}
            </Select>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={handleClose}
                type="submit"
                color="primary"
                variant="contained"
              >
                Add / Update Book
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )

  interface AuthorType {
    firstName: string
    lastName: string
    _id: string
  }
}
