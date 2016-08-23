import React, { Component } from 'react';
import { RadialChart } from 'react-vis';
import axios from 'axios';

const url = 'http://54.213.83.132/hackoregon/http/current_candidate_transactions_out/5591/';

function getData() {
  return axios.get(url)
  .then(function (response) {

    const dataSet = response.data;
    
     const dataSetAmounts = dataSet.filter(d => d.amount > 15000).map(function(item) {
        return {
          angle: item.amount,
          name: item.contributor_payee,
        }
     });
     console.log(dataSetAmounts);
     return dataSetAmounts;
  });
}

class DonutChart extends Component {
  
  state = {
    data: []
  }

  render() {

    if (this.state.data.length) {
      return (
        <div>
          <RadialChart
            data={this.state.data}
            width={300}
            height={300} />
        </div>
      )
    } else {
      return (<div>Loading</div>);
    }
  }

  componentDidMount() {
    getData().then(data => this.setState({data:data}));
  }
}

export default DonutChart;