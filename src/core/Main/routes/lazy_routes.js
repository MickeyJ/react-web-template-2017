import React from 'react'
import Bundle from '../../../utils/Bundle'

import loadHome from 'bundle-loader?lazy&name=[name]!../../../views/Home/Home'
import loadHomeMobile from 'bundle-loader?lazy&name=[name]!../../../views/Home/Home.Mobile'
import loadResource from 'bundle-loader?lazy&name=[name]!../../../views/Resource/Resource'
import loadStores from 'bundle-loader?lazy&name=[name]!../../../views/Stores/Stores'
import loadCalendar from 'bundle-loader?lazy&name=[name]!../../../views/Calendar/Calendar'
import loadNotFound from 'bundle-loader?lazy&name=[name]!../../../views/NotFound'

export const Home = (props) => (
  <Bundle load={window.checkMobile() ? loadHomeMobile : loadHome}>
    {(Home) => <Home {...props}/>}
  </Bundle>
);

export const Resource = (props) => (
  <Bundle load={loadResource}>
    {(Resource) => <Resource {...props}/>}
  </Bundle>
);

export const Stores = (props) => (
  <Bundle load={loadStores}>
    {(Stores) => <Stores {...props}/>}
  </Bundle>
);

export const Calendar = (props) => (
  <Bundle load={loadCalendar}>
    {(Calendar) => <Calendar {...props}/>}
  </Bundle>
);



export const NotFound = (props) => (
  <Bundle load={loadNotFound}>
    {(NotFound) => <NotFound {...props}/>}
  </Bundle>
);

