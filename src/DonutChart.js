import React, { Component } from 'react';
import { RadialChart } from 'react-vis';
import axios from 'axios';

const url = 'http://54.213.83.132/hackoregon/http/current_candidate_transactions_out/5591/';

const STYLES = {
   leftChart: {
      width: '50%',
      order: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
   },
    label: {
     position: 'absolute',
     bottom: 20,
   },
}

function getData() {
  return axios.get(url)
  .then(function (response) {

    const dataSet = response.data;
    
     const dataSetAmounts = dataSet.filter(d => d.amount > 15000).map(function(item) {
        return {
          angle: item.amount,
          title: item.contributor_payee,
        }
     });
     console.log(dataSetAmounts);
     return dataSetAmounts;
  });
}

class DonutChart extends Component {
  state = {
    display: null,
    data: [],
  }

  render() {

    if (this.state.data.length) {
      return (
        <div style={STYLES.leftChart}>
          <div style={STYLES.label}>{this.state.display}</div>
          <RadialChart
            onSectionMouseOver={ d => this.showTitle(d.title) }
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

  showTitle(title) {
    this.setState( {
      display: title
    });
  }
}

export default DonutChart;