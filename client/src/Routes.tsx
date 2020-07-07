import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Landing from './pages/Landing'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route exact path="/home" component={Home} />
  </Switch>
)

export default Routes
