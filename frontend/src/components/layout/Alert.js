import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { removeAlert } from '../../reducers/alert'

function Alert ({ alerts, removeAlert }) {
  return (
    <div className="notifications">
      { alerts && alerts.length > 0 && alerts
        .map(
          alert =>
            <div key={alert.id} className={`notification is-${alert.alertType}`}>
              <button className="delete" onClick={() => removeAlert({ id: alert.id })}></button>
              {alert.msg}
            </div>
        )
      }
    </div>
  )
}

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
  removeAlert: PropTypes.func
}

const mapStatToProps = state => ({ alerts: state.alert })
const mapDispatch = { removeAlert }

export default connect(mapStatToProps, mapDispatch)(Alert)
