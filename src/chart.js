import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

function aggregateWeeks(weeks, weeksToAggregate) {
  if (weeksToAggregate === 1) {
    return weeks;
  }
  const aggregateWeeksAgo = i => {
    let weeksAgo = [];
    for (let j = weeksToAggregate - 1; j >= 0; j--) {
      weeksAgo.push(weeks[i - j].weeksAgo);
    }
    return weeksAgo.join(' + ');
  }
  const aggregateVelocity = i => {
    let velocity = 0;
    for (let j = weeksToAggregate - 1; j >= 0; j--) {
      velocity += (weeks[i - j].velocity);
    }
    return velocity;
  }
  const data = [];
  for (let i = 0; i < weeks.length; i++) {
    if (i % weeksToAggregate === weeksToAggregate - 1) {
      data.push({
        weeksAgo: aggregateWeeksAgo(i),
        velocity: aggregateVelocity(i),
      })
    }
  }
  return data;
}

export default class Chart extends React.Component {
  render() {
    const weeks = this.props.weeks.sort((a, b) => b.weeksAgo - a.weeksAgo);

    const data = aggregateWeeks(weeks, 1);

    return (
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="weeksAgo" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Line type="monotone" dataKey="velocity" stroke="#8884d8" />
      </LineChart>
    )
  }
}