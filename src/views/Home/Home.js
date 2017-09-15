import style from './home.module.scss'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <div id="home-container" className={style.home}>

    <header>

      <h3>Homie Page</h3>

      <br />

      <Link to="/resource">
        Resource
      </Link>

    </header>

  </div>
);

export default Home
