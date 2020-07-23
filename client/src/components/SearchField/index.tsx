import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { useDispatch } from 'react-redux'
import { filterAllBooks } from '../../redux/actions'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

export default function SearchField() {
  const classes = useStyles()

  const dispatch = useDispatch()

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(filterAllBooks(event.target.value))

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        onChange={handleSearchTextChange}
      />
    </form>
  )
}
