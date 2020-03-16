import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import GoogleLogInOut from './pages/GoogleLogInOut.tsx'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/loginout/" component={GoogleLogInOut} />
  </Switch>
)

export default Routes
