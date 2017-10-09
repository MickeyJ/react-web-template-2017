import React from 'react'

import {
  Switch,
  Route,
} from 'react-router-dom'

import {
  Home,
  Resource,
  Stores,
  Calendar,
  NotFound,
} from './lazy_routes'

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/resource" component={Resource} />
    <Route exact path="/stores" component={Stores} />
    <Route exact path="/calendar" component={Calendar} />
    <Route component={NotFound}/>
  </Switch>
);
