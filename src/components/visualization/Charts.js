import React, { Component } from "react";
import { Pie, Bar, Doughnut } from "react-chartjs-2";
class Charts extends Component {
  state = {};
  render() {
    const { expenses } = this.props;

    console.log(expenses);
    const options = {
      scales: {
        yAxis: [
          {
            stacked: true,
          },
        ],
        xAxis: [
          {
            stacked: true,
          },
        ],
      },
    };
    return (
      <div className="charts_h3">
        <div className="pieChart">
          <h3>Pie Chart</h3>
          <Pie data={expenses} />
        </div>
        <hr />
        <div className="pieChart">
          <h3>Bar Chart</h3>
          <Bar
            data={expenses}
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: [
                  {
                    stacked: true,
                    ticks: { beginAtZero: true, min: 0 },
                  },
                ],
                xAxes: [
                  {
                    stacked: true,
                  },
                ],
              },
            }}
          />
        </div>

        <hr />
        <div className="pieChart">
          <h3>Doughnut Chart</h3>
          <Doughnut data={expenses} />
        </div>
      </div>
    );
  }
}

export default Charts;
