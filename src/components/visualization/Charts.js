import React, { Component } from "react";
import { Pie, Bar, Doughnut } from "react-chartjs-2";
class Charts extends Component {
  state = {};
  render() {
    const { expenses } = this.props;

    console.log(expenses);
    return (
      <div>
        <div className="pieChart">
          <Pie data={expenses} />
        </div>

        <div className="pieChart">
          <Bar data={expenses} />
        </div>

        <div className="pieChart">
          <Doughnut data={expenses} />
        </div>
      </div>
    );
  }
}

export default Charts;
