import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'

import { useDispatch } from 'react-redux'
import { Author } from '../../../types'
import { updateAuthorThunk } from '../../../redux/actions'
import { IconButton } from '@material-ui/core'

export type EditAuthorProps = {
  author: Author
}

export default function EditAuthorForm({ author }: EditAuthorProps) {
  const [open, setOpen] = useState(false)
  const [newFirstName, setNewFirstName] = useState(author.firstName)
  const [newLastName, setNewLastName] = useState(author.lastName)

  const dispatch = useDispatch()

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFirstName(e.target.value)
  }
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLastName(e.target.value)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const editAuthor = async (e: React.FormEvent) => {
    e.preventDefault()

    const newAuthor: Author = {
      firstName: newFirstName,
      lastName: newLastName,
      _id: author._id,
    }

    dispatch(updateAuthorThunk(newAuthor))
    setNewFirstName('')
    setNewLastName('')
  }

  return (
    <div>
      <IconButton
        color="secondary"
        aria-label="edit author"
        component="span"
        onClick={handleClickOpen}
      >
        <EditIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Author</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit Author</DialogContentText>
          <form onSubmit={editAuthor}>
            <TextField
              id="outlined-full-width"
              label="First Name"
              style={{ margin: 8 }}
              value={newFirstName}
              onChange={handleFirstNameChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <TextField
              id="outlined-full-width"
              label="Last Name"
              style={{ margin: 8 }}
              value={newLastName}
              onChange={handleLastNameChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
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
                Edit Author
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
