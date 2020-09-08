import { faEnvelope, faExclamationTriangle, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAlert } from '../../reducers/alert'
import { register } from '../../reducers/auth'
import isValidEmail from '../../utils/isValidEmail'

function onChange (formData, setFormData) {
  return event => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }
}

function onSubmit (event) {
  event.preventDefault()

  return async (formData, setAlert, register) => {
    const { name, email, password, passwordConfirmation } = formData
    if (password !== passwordConfirmation) {
      setAlert('Password don\'t match', 'danger')
    } else {
      const res = register({ name, email, password })
      const { error, payload } = await res
      if (error) payload.errors.forEach(error => setAlert(error.msg, 'danger'))
    }
  }
}

const initialFromData = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: ''
}

function Register ({ setAlert, register, isAuthenticated }) {
  const [formData, setFormData] = useState(initialFromData)

  const { name, email, password, passwordConfirmation } = formData

  const isCurrentEmailValid = isValidEmail(email)
  const emailWarningsClassName = classNames('input', { 'is-danger': !isCurrentEmailValid })

  if (isAuthenticated) return (<Redirect to="/"/>)

  return (
    <>
      <section className="mb-2">
        <h1 className="is-size-1">Sign Up</h1>
        <h3 className="is-size-3">
          <i className="mr-3">
            <FontAwesomeIcon icon={faUser}/>
          </i>
          Create Your Account
        </h3>
      </section>

      <section>
        <form onSubmit={event => onSubmit(event)(formData, setAlert, register)}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control has-icons-left">
              <input className="input" type="text" name='name' value={name} onChange={onChange(formData, setFormData)} required/>
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faUser}/>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input className={emailWarningsClassName} type="email" name="email" value={email} onChange={onChange(formData, setFormData)} required/>
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faEnvelope}/>
              </span>
              {!isCurrentEmailValid &&
                <span className="icon is-small is-right">
                  <FontAwesomeIcon icon={faExclamationTriangle}/>
                </span>
              }
            </div>
            {!isCurrentEmailValid && <p className="help is-danger">This email is invalid</p>}
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control has-icons-left">
              <input className="input" type="text" name="password" value={password} onChange={onChange(formData, setFormData)} required/>
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faLock}/>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">Confirm Password</label>
            <div className="control has-icons-left">
              <input className="input" type="text" name="passwordConfirmation" value={passwordConfirmation} onChange={onChange(formData, setFormData)} required/>
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faLock}/>
              </span>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button type="submit" className="button is-link">
                Register
              </button>
            </div>
          </div>

        </form>
      </section>

    </>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func,
  register: PropTypes.func,
  isAuthenticated: PropTypes.bool.isRequired
}

const mapDispatch = { setAlert, register }
const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated })

export default connect(mapStateToProps, mapDispatch)(Register)
