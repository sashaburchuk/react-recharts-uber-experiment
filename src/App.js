import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DonutChart from './DonutChart';
import TriangleBarGraph from './TriangleBarGraph';

const STYLES = {
  heading: {
    display: 'block',
  },
  wrapper: {
    padding: 20,
    display: 'flex',
   },
  rightChart: {
      width: '50%',
      order: 2,
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

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <h1 style={STYLES.heading}>Campaign Finance Data in Two Charts</h1>
        <div style={STYLES.wrapper}>
          <DonutChart />

          <div style={STYLES.rightChart}>
            <TriangleBarGraph />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
