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
import { AppState, Author } from '../../types';
import {addAuthorThunk } from '../../redux/actions';

export default function AuthorForm() {

  const [open, setOpen] = useState(false)
  const [newFirstName, setNewFirstName] = useState("") 
  const [newLastName, setNewLastName] = useState("")

  const authors = useSelector((state: AppState) => state.author.authors)

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

 
  const addAuthor = async (e: React.FormEvent) => {
    e.preventDefault() 
    const newAuthor = {
      firstName: newFirstName,
      lastName: newLastName
    }

    //check if author with same first and last name exists check with lowering the case

    const author = authors.find(author => author.firstName === newFirstName && author.lastName === newLastName )

    const changedAuthor = { ...author, lastName: newLastName }    

    if( typeof author === 'undefined' ){
        
            dispatch(addAuthorThunk(newAuthor))
            setNewFirstName('')
            setNewLastName('')
            
    } else {

      if (window.confirm(`${changedAuthor.lastName} is alreay in the library, replace the details with new one?`)) { 
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
        ADD OR UPDATE AUTHOR
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add new book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add new book to the library if it exists based on title, its details will be updated
          </DialogContentText>
          <form onSubmit={addAuthor}>

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
          <Button onClick={handleClose} type="submit" color="primary" variant="contained">
            Add / Update Author
          </Button>
        </DialogActions>
        </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
