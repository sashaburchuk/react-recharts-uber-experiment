import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import axios from 'axios';

const url = 'http://54.213.83.132/hackoregon/http/current_candidate_transactions_out/5591/';

function getData() {
  return axios.get(url)
  .then(function (response) {
    const dataSet = response.data;
    
     const dataSetAmounts = dataSet.filter(d => d.amount > 25000).map(function(item) {
        return {
          amount: item.amount,
          name: item.contributor_payee,
        }
     });
     console.log(dataSetAmounts);
     return dataSetAmounts;
  });
}

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
          Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill}/>;
};

TriangleBar.propTypes = {
  fill: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

class TriangleBarGraph extends Component {
  state = {
    data: [],
  }

  render() {
    if (this.state.data.length) {
      return (
        <div>
          <BarChart width={600} height={300} data={this.state.data}
                  margin={{top: 20, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Bar dataKey="amount" fill="#8884d8" shape={<TriangleBar/>} label/>
          </BarChart>

        </div>
      );
    } else {
      return (<div>Loading</div>);
    }
  }

    componentDidMount() {
    getData().then(data => {
      this.setState({data:data});
    }
  )};
}

export default TriangleBarGraph;