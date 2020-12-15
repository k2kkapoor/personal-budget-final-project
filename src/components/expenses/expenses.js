import React, { Component } from "react";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import TextField from "@material-ui/core/TextField";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";

import Select from "react-select";

export default class Expenses extends Component {
  // state = {
  //   expenses: [],
  // };

  constructor(props) {
    super(props);
    this.state = {
      expenses: [],
      columns: [
        {
          dataField: "id",
          text: "id",
          hidden: true,
        },
        {
          dataField: "title",
          text: "Title",
        },
        {
          dataField: "amount",
          text: "Amount",
        },
        {
          dataField: "category",
          text: "Category",
        },
        {
          dataField: "date",
          text: "Date",
          sort: true,
        },
        {
          dataField: "update",
          text: "Update",
          formatter: this.updateButton,
        },
        {
          dataField: "delete",
          text: "Delete",
          formatter: this.deleteButton,
        },
      ],
      open: false,
      title: "",
      amount: "",
      category: "",
      date: "",
    };
  }

  updateButton(cell, row, rowIndex, formatExtraData) {
    return (
      <ReactBootStrap.Button variant="primary">Update</ReactBootStrap.Button>
    );
  }
  deleteButton(cell, row, rowIndex, formatExtraData) {
    return (
      <ReactBootStrap.Button variant="danger">Delete</ReactBootStrap.Button>
    );
  }

  componentDidMount() {
    let currentComponent = this;
    console.log(this.props.user);
    axios
      .get("http://localhost:3050/user/" + this.props.user)
      .then(function (res) {
        //console.log(res.data.expense);
        var tempExpenses = [];
        for (var i = 0; i < res.data.expense.length; i++) {
          tempExpenses[i] = res.data.expense[i];
        }
        //console.log(tempExpenses);
        currentComponent.setState({ expenses: tempExpenses });
      });
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = () => {
    axios({
      method: "post",
      headers: { Pragma: "no-cache" },
      url: "http://localhost:3050/addNewData/" + this.props.user,
      data: {
        username: this.props.user,
        title: this.state.title,
        amount: this.state.amount,
        category: this.state.category,
        date: this.state.date,
      },
    });
    this.handleClose();
  };

  //console.log(expenses[0]);
  // renderExpenses = (expense, index) => {
  //   console.log(expense);
  //   return (
  //     <tr>
  //       <td key={expense.id} style={{ display: "none" }}>
  //         {expense.id}
  //       </td>
  //       <td>{expense.title}</td>
  //       <td>$ {expense.amount}</td>
  //       <td>{expense.category}</td>
  //       <td>{expense.date}</td>
  //       <td>
  //         <ReactBootStrap.Button variant="primary" value={expense.id}>
  //           Update
  //         </ReactBootStrap.Button>
  //       </td>
  //       <td>
  //         <ReactBootStrap.Button variant="danger">Delete</ReactBootStrap.Button>
  //       </td>
  //     </tr>
  //   );
  // };

  render() {
    const options = {
      sizePerPage: 5,
      sizePerPageList: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
      firstPageText: "First",
      prePageText: "Back",
      nextPageText: "Next",
      lastPageText: "Last",
      nextPageTitle: "First page",
      prePageTitle: "Pre page",
      firstPageTitle: "Next page",
      lastPageTitle: "Last page",
      showTotal: true,
    };
    return (
      <div>
        <BootstrapTable
          className="dataTable"
          keyField="id"
          data={this.state.expenses}
          columns={this.state.columns}
          pagination={paginationFactory(options)}
          sort={{ dataField: "date", order: "desc" }}
        />
        {/* <table className="table table-striped table-bordered dataTable">
          <thead>
            <tr>
              <th style={{ display: "none" }}></th>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.state.expenses.map(this.renderExpenses)}</tbody>
        </table> */}

        <div>
          <ReactBootStrap.Button
            className="addButton"
            variant="success"
            onClick={this.handleClickOpen}
          >
            Add new Expense
          </ReactBootStrap.Button>
          <Dialog
            className="newData"
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add Expense</DialogTitle>
            <DialogContent className="dialogContent">
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                onChange={this.handleChange}
              />
              <TextField
                margin="dense"
                id="amount"
                label="Amount"
                type="text"
                onChange={this.handleChange}
              />
              <TextField
                margin="dense"
                id="category"
                label="Category"
                type="text"
                onChange={this.handleChange}
              />

              <TextField
                margin="dense"
                id="date"
                label=""
                type="date"
                onChange={this.handleChange}
              />
            </DialogContent>
            <DialogActions>
              <ReactBootStrap.Button
                variant="danger"
                onClick={this.handleClose}
                color="primary"
              >
                Cancel
              </ReactBootStrap.Button>
              <ReactBootStrap.Button
                variant="success"
                onClick={this.handleSubmit}
                color="primary"
              >
                Submit
              </ReactBootStrap.Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}
