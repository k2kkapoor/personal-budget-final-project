import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";

import MonthYearPicker from "react-month-year-picker";

import Charts from "./Charts";

class Visualization extends Component {
  constructor(props) {
    super(props);

    this.state = {
      finalState: [],
      chartData: {},

      title: "",
      amount: "",
      category: "",
      date: "",
      userId: "",
      rowId: "",
      month: "12",
      year: "2020",
      // months: ["01", "02", 03, 04, 5, 6, 7, 8, 9, 10, 11, 12],
    };

    this.dateSelected = this.dateSelected.bind(this);
  }

  dateSelected = (e) => {
    let budgetValue = [];
    let budgetLabel = [];
    let colorDataset = [];
    let hoverDataset = [];
    let tempMonth = "";
    if (parseInt(this.state.month) < 10) {
      // console.log("Month value");
      tempMonth = "0" + String(this.state.month);
      //this.setState({ month: tempMonth });
    } else {
      tempMonth = this.state.month;
    }
    // console.log("month:" + tempMonth);
    let expenses = {
      labels: [],
      datasets: [
        {
          data: [],
          label: "Bar Chart",
          backgroundColor: [],
          hoverBackgroundColor: [],
        },
      ],
    };
    axios({
      method: "post",
      headers: { Pragma: "no-cache" },
      url: "http://localhost:3050/groupData",
      data: {
        username: this.props.user,
        month: String(tempMonth),
        year: String(this.state.year),
      },
    }).then((res) => {
      tempMonth = "";
      console.log(res.data[0]["_id"]);
      console.log(res.data[0]["total"]);
      for (var i = 0; i < res.data.length; i++) {
        budgetValue[i] = parseInt(res.data[i]["total"]);
        budgetLabel[i] = res.data[i]["_id"];
        colorDataset[i] = this.colorGenerator();
        hoverDataset[i] = this.colorGenerator();
      }
      expenses.labels = budgetLabel;

      expenses.datasets[0].data = budgetValue;
      expenses.datasets[0].backgroundColor = colorDataset;
      expenses.datasets[0].hoverBackgroundColor = hoverDataset;

      this.setState({ finalState: expenses });
      console.log(this.state.finalState);
    });
  };

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  colorGenerator = function () {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  };

  render() {
    return (
      <div>
        <h4>Please pick the month and year expense charts</h4>

        <MonthYearPicker
          selectedMonth={this.state.month}
          selectedYear={this.state.year}
          minYear={2019}
          maxYear={2021}
          onChangeYear={(year) => this.setState({ year: year })}
          onChangeMonth={(month) => this.setState({ month: month })}
        />

        <ReactBootStrap.Button
          onClick={(e) => this.dateSelected(e)}
          variant="primary"
        >
          Submit
        </ReactBootStrap.Button>

        <Charts expenses={this.state.finalState} />
        {/* <div className="pieChart">
          <Pie data={this.state.expenses} />
        </div>

        <div className="pieChart">
          <Bar data={this.state.expenses} />
        </div> */}
      </div>
    );
  }
}

export default Visualization;
