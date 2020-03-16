import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    
  </Switch>
)
/*<Route exact path="/loginout/" component={GoogleLogInOut} />*/ // this route is now moved as a component on the application bar

export default Routes
