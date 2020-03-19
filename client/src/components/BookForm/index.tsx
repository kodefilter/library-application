import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import BookService from '../../services/books'
import { useSelector, useDispatch } from 'react-redux';
import { AppState, Book } from '../../types';
import { createBook, addNotification } from '../../redux/actions';

export default function BookForm() {
  const [open, setOpen] = useState(false)
  const [newTitle, setNewTitle] = useState("") 
  const [newDescription, setNewDescription] = useState("")
  const [newPublisher, setNewPublisher] = useState("")

  const items = useSelector((state: AppState) => state.book.items)

  const dispatch = useDispatch()




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

  const addBook = (e: React.FormEvent) => {
    e.preventDefault() 

    const newBook = {
      title: newTitle,
      description: newDescription,
      publisher: newPublisher,
      isAvailable: false,
    }

    const book = items.find(book => book.title === newTitle)
    const changedBook = { ...book, title: newTitle, description: newDescription, publisher: newPublisher}

    //console.log(changedPerson)
    

    if( typeof book === 'undefined' ){

      BookService
        .create(newBook)
        .then( (addedBook: Book) => {
            //here disptach adding book to the store
          dispatch(createBook(addedBook))

          setNewTitle('')
          setNewDescription('')
          setNewPublisher('')

          dispatch(addNotification({errorMessage: '', successMessage: `You Just added ${addedBook.title}`}))
          setTimeout(()=>{
          dispatch(addNotification({errorMessage: '', successMessage: ''}))
          },3000)
        }).catch(error => {
        
          setNewTitle('')
          setNewDescription('')
          setNewPublisher('')

            dispatch(addNotification({errorMessage : ` Error : ${error.response.data.error}`, successMessage: ''}))
            setTimeout(()=>{
              dispatch(addNotification({errorMessage: '', successMessage: ''}))
            },3000)
        })

    } else {

      if (window.confirm(`${changedBook.title} is alreay in the library, replace the details with new one?`)) { 
      /*  
      BookService
        .update(changedBook.title, changedBook)
        .then( updatedPerson => {
          setPersons(persons.map(person=> person.id !== changedPerson.id ? person : updatedPerson))
          setNewName('')
          setNewNumber('')

          setSuccessMessage(`${changedPerson.name} has been updated with new number`)
          setTimeout(()=>{
            setSuccessMessage(null)
          }, 5000)

        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
        }

        )*/
      }
    }
  } 

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        ADD OR UPDATE BOOK
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add new book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add new book to the library if it exists based on title, its details will be updated
          </DialogContentText>
          <form onSubmit={addBook}>

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
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} type="submit" color="primary" variant="contained">
            Add / Update Book
          </Button>
        </DialogActions>
        </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
