import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Chart from './chart';
import * as Actions from './store/actions';

import { getCompletedTickets } from './api';
import { getVelocity } from './issue';

class Container extends React.Component {

  componentDidMount() {
    const jql = '';
    const from = 30;
    const to = 0;
    for (let i = to; i <= from; i++) {
      getCompletedTickets(this.props.username, this.props.password, this.props.appId, jql, i).then((issues) => {
        const week = {
          weeksAgo: i,
          issues: issues,
          velocity: getVelocity(issues),
        }
        this.props.actions.addWeek(week);
      });
    }
  }

  render() {
    return (
    <div>
      <Chart weeks={this.props.weeks} />
    </div>
    )
  }
}

Container.propTypes = {
  weeks: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  weeks: state.weeks
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)
