import React from 'react'
import './App.css';
import Header from '../../Components/header/header'
import Cards from '../Cards/Cards'
import newEntry from '../newEntry/newEntry'

import { Route } from 'react-router-dom' 

const Layout = () => (
<div className="App">
          <Header /> 
          <Route path="/" exact component={Cards} />
          <Route path="/new" exact component={newEntry} />
          {/* <Cards /> */}
        </div>
)

export default Layout