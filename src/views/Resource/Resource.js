import style from './resource.module.scss'
import React from 'react'
import { Link } from 'react-router-dom'

import AuthHOC from '../../containers/AuthHOC'

const Resource = () => (
  <div id="resource-container" className={style.resource}>

    <header>

      <h3>Super Special Secret Data</h3>

      <br />

      <Link to="/">
        Home
      </Link>

    </header>

  </div>
);

export default AuthHOC(Resource)
