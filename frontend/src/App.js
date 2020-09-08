import React, { useEffect } from 'react'
import './App.scss'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'
import { useDispatch } from 'react-redux'
import { loadUser } from './reducers/auth'

function App () {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [])

  return (
    <>
      <Router>
        <Navbar/>
        <Route exact path='/'>
          <h1>Landing Page</h1>
        </Route>
        <section className="container">
          <Alert/>
          <Switch>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/login' component={Login}/>
          </Switch>
        </section>
      </Router>
    </>
  )
}

export default App
