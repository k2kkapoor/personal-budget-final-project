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

export default class Expenses extends Component {
  // state = {
  //   expenses: [],
  // };

  constructor(props) {
    super(props);
    this.updateClicked = this.updateClicked.bind(this);
    this.deleteClicked = this.deleteClicked.bind(this);

    // bind here like this below

    this.updateButton = this.updateButton.bind(this);
    this.deleteButton = this.deleteButton.bind(this);
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
      userId: "",
      rowId: "",
      month: "",
      year: "",
      isUpdate: false,
    };
  }

  componentDidMount() {
    let currentComponent = this;
    console.log(this.props.user);

    axios({
      method: "post",
      headers: { Pragma: "no-cache" },
      url: "http://localhost:3050/expenses",
      data: {
        username: this.props.user,
      },
    }).then(function (res) {
      console.log(res.data);
      var tempExpenses = [];
      for (var i = 0; i < res.data.length; i++) {
        tempExpenses[i] = res.data[i];
      }
      //console.log(tempExpenses);
      currentComponent.setState({ expenses: tempExpenses });
    });

    // axios
    //   .get("http://localhost:3050/expenses" + this.props.user)
    //   .then(function (res) {
    //     console.log(res.data);
    //     var tempExpenses = [];
    //     for (var i = 0; i < res.data.length; i++) {
    //       tempExpenses[i] = res.data[i];
    //     }
    //     //console.log(tempExpenses);
    //     currentComponent.setState({ expenses: tempExpenses });
    //   });
  }

  clearInput = () => {
    this.setState({ title: "" });
    this.setState({ amount: "" });
    this.setState({ category: "" });
    this.setState({ date: "" });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.clearInput();
    this.setState({ open: false });
  };
  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  updateClicked = (e, row) => {
    this.setState({ isUpdate: true });
    //alert("clicked");
    console.log(row);
    this.setState({ userId: row._id });
    this.setState({ title: row.title });
    this.setState({ amount: row.amount });
    this.setState({ category: row.category });
    this.setState({ date: row.date });

    this.handleClickOpen();

    // console.log("event e:" + e);
  };

  deleteClicked = (e) => {
    axios({
      method: "post",
      headers: { Pragma: "no-cache" },
      url: "http://localhost:3050/deleteData",
      data: {
        id: e.target.value,
      },
    });
    window.location.reload();
  };

  // formatDate = () => {
  //   let formatComponent = this;
  //   let dateValue = this.state.date;
  //   let month = dateValue.substr(5, 2);
  //   let year = dateValue.slice(0, 4);
  //   console.log("date " + this.state.date);
  //   console.log(month);
  //   console.log(year);
  //   formatComponent.setState({ month: month });
  //   formatComponent.setState({ year: year });
  // };

  updateButton(cell, row, rowIndex, formatExtraData) {
    return (
      <ReactBootStrap.Button
        variant="primary"
        value={row}
        // date={row.date}
        // onClick={() => this.handleUpdate()}
        // onClick={this.handleUpdate}
        onClick={(e) => this.updateClicked(e, row)}
      >
        Update
      </ReactBootStrap.Button>
    );
  }

  deleteButton(cell, row, rowIndex, formatExtraData) {
    return (
      <ReactBootStrap.Button
        value={row._id}
        onClick={(e) => this.deleteClicked(e)}
        variant="danger"
      >
        Delete
      </ReactBootStrap.Button>
    );
  }

  handleSubmit = () => {
    if (this.state.isUpdate) {
      console.log(this.state.userId);
      axios({
        method: "post",
        headers: { Pragma: "no-cache" },
        url: "http://localhost:3050/updateData",
        data: {
          id: this.state.userId,
          username: this.props.user,
          title: this.state.title,
          amount: this.state.amount,
          category: this.state.category,
          date: this.state.date,
        },
      });
    } else {
      axios({
        method: "post",
        headers: { Pragma: "no-cache" },
        url: "http://localhost:3050/addNewData",
        data: {
          username: this.props.user,
          title: this.state.title,
          amount: this.state.amount,
          category: this.state.category,
          date: this.state.date,
          month: this.state.date.substr(5, 2),
          year: this.state.date.slice(0, 4),
        },
      });
    }
    window.location.reload();
    this.handleClose();
  };

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
                value={this.state.title}
                onChange={this.handleChange}
              />
              <TextField
                margin="dense"
                id="amount"
                label="Amount"
                type="number"
                required="yes"
                value={this.state.amount}
                onChange={this.handleChange}
              />
              <TextField
                margin="dense"
                id="category"
                label="Category"
                type="text"
                value={this.state.category}
                onChange={this.handleChange}
              />

              <TextField
                margin="dense"
                id="date"
                label=""
                disableClock={true}
                type="date"
                value={this.state.date}
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
