import React, {Component, PropTypes } from 'react'
import { withRouter } from 'react-router'

class Leaderview extends Component {

  render () {
    return (

    <div>
      <Leaderboard />
    </div>
    )
  }
}

export default withRouter(Leaderview)