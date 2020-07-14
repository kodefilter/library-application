import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Landing from './pages/Landing'
import AuthorList from './pages/AuthorList'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route exact path="/home" component={Home} />
    <Route exact path="/authors" component={AuthorList} />
  </Switch>
)

export default Routes
