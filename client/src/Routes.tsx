import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Landing from './pages/Landing'
import AuthorTableList from './components/AuthorTableList'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route exact path="/home" component={Home} />
    <Route exact path="/authors" component={AuthorTableList} />
  </Switch>
)

export default Routes
