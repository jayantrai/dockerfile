import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import NavBar from './components/NavBar.jsx'
import ProductList from './components/ProductList.jsx'
import Cart from './components/Cart.jsx'
import Details from './components/Details.jsx'
import Default from './components/Default.jsx'

function App() {
  return (
   <React.Fragment>
    <NavBar />
    <Switch>
      <Route exact path='/' component={ProductList} />
      <Route path='/details' component={Details} />
      <Route path='/cart' component={Cart} />
      <Route component={Default} />
    </Switch>

    
   </React.Fragment>
  )
}

export default App;
