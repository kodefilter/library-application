import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { GoogleLogout } from 'react-google-login'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../types'
import { removeCurrentUser } from '../../redux/actions/user'
import Cookies from 'js-cookie'
import SearchField from '../SearchField'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
)

export default function ApplicationBar() {
  const classes = useStyles()

  const history = useHistory()

  const dispatch = useDispatch()

  const currentUser = useSelector((state: AppState) => state.user.currentUser)
  console.log(currentUser, 'Current User')

  const logout = () => {
    dispatch(removeCurrentUser)
    Cookies.remove('current-user')
    Cookies.remove('access-cookie')
    history.push('/')
  }

  const logoutFailure = () => {
    alert('Logout Failed')
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Integrify Library
          </Typography>
          <SearchField />
          <Link to={`/authors`}>
            <Typography variant="h6" className={classes.title}>
              Authors
            </Typography>
          </Link>
          <GoogleLogout
            clientId="659114991649-egsmdi2p7p7fu360cpq4i7evom0beq6c.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={logout}
            onFailure={logoutFailure}
          ></GoogleLogout>
        </Toolbar>
      </AppBar>
    </div>
  )
}
