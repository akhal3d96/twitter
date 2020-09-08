import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../reducers/auth'

function GuestLinks (props) {
  return (
    <>
      <Link className="button" to='/register'>
        <strong> Register </strong>
      </Link>

      <Link className="button" to='/login'>
        <span className="mr-2">Log in</span>
        <span><FontAwesomeIcon icon={faSignInAlt}/></span>
      </Link>
    </>
  )
}

function AuthButtons (props) {
  return (
    <button className="button is-danger" {...props}>
      <span className="mr-2">Log Out</span>
      <span><FontAwesomeIcon icon={faSignOutAlt}/></span>
    </button>
  )
}

function Navbar ({ auth, logout }) {
  const { isAuthenticated, loading } = auth

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
        </a>

        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {!loading &&
            (
              isAuthenticated ? <AuthButtons onClick={logout}/> : <GuestLinks/>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({ auth: state.auth })
const mapDisptch = { logout }

export default connect(mapStateToProps, mapDisptch)(Navbar)
