import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';


import BookService from '../../services/books'
import AuthorService from '../../services/authors'
import { useSelector, useDispatch } from 'react-redux';
import { AppState, Book, BookFormValues } from '../../types';
import {addNotification, addBookThunk } from '../../redux/actions';

export default function BookForm() {
  const [open, setOpen] = useState(false)
  const [newTitle, setNewTitle] = useState("") 
  const [newDescription, setNewDescription] = useState("")
  const [newPublisher, setNewPublisher] = useState("")
  const [newAuthorList, setNewAuthorList] = useState<AuthorType[]>([])

  const items = useSelector((state: AppState) => state.book.items)

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/authors')
        const data = await response.json()
        setNewAuthorList(data)
      } catch (error) {
        throw error
      }
    }
    fetchData()
  }, [])


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

  const addBook = async (e: React.FormEvent) => {
    e.preventDefault()

    const newBook: BookFormValues = {
      title: newTitle,
      description: newDescription,
      publisher: newPublisher,
      isAvailable: false,
    }

    const book = items.find(book => book.title === newTitle)
    const changedBook = { ...book, title: newTitle, description: newDescription, publisher: newPublisher}    

    if( typeof book === 'undefined' ){
        
            dispatch(addBookThunk(newBook))
            setNewTitle('')
            setNewDescription('')
            setNewPublisher('')
            
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
        <Autocomplete
          id="combo-box-demo"
          options={newAuthorList as AuthorType[]}
          getOptionLabel={(author: AuthorType) => author.firstName}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
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

  interface AuthorType {
    firstName: string;
    lastName: string;
  }
}
