import React, { Component } from "react";
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
      noDataErr: "",
      showResult: false,
    };

    this.dateSelected = this.dateSelected.bind(this);
  }
  //Component to select date
  dateSelected = (e) => {
    this.setState({ showResult: true });
    let budgetValue = [];
    let budgetLabel = [];
    let colorDataset = [];
    let hoverDataset = [];
    let tempMonth = "";
    if (parseInt(this.state.month) < 10) {
      tempMonth = "0" + String(this.state.month);
    } else {
      tempMonth = this.state.month;
    }

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

    //Here we are calling backend for category wise total amount spent by the user according to the month selected
    axios({
      method: "post",
      headers: { Pragma: "no-cache" },
      url: "http://localhost:3050/groupData",
      data: {
        username: this.props.user,
        month: String(tempMonth),
        year: String(this.state.year),
      },
    })
      .then((res) => {
        this.setState({ noDataErr: "" });
        tempMonth = "";
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

        if (budgetLabel.length === 0) {
          this.setState({ showResult: false });
          this.setState({ noDataErr: "No data for selected date found" });
        }

        this.setState({ finalState: expenses });
        console.log(this.state.finalState);
      })
      .catch((err) => {
        console.log("error:" + err);
        this.setState({ noDataErr: "No data for selected date found" });
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
        <div className="userInfo">
          <h6>Hello user : {this.props.user} </h6>
        </div>
        <h6>
          Please pick the month and year expense charts Default Month : December
          and Year : {this.state.year}
        </h6>

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
          className="dateSubmit"
        >
          Submit
        </ReactBootStrap.Button>

        <h6>{this.state.noDataErr}</h6>
        {this.state.showResult ? (
          <Charts expenses={this.state.finalState} />
        ) : null}
        {/* <Charts expenses={this.state.finalState} /> */}
      </div>
    );
  }
}

export default Visualization;
