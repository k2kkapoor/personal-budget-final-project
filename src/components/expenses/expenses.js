import React, { Component } from "react";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";

export default class Expenses extends Component {
  // state = {
  //   expenses: [],
  // };

  constructor(props) {
    super(props);
    this.state = { expenses: [] };
  }

  componentDidMount() {
    let currentComponent = this;
    axios
      .get("http://localhost:3050/user/" + this.props.user)
      .then(function (res) {
        //console.log(res.data.expense);
        var tempExpenses = [];
        for (var i = 0; i < res.data.expense.length; i++) {
          tempExpenses[i] = res.data.expense[i];
        }
        console.log(tempExpenses);
        currentComponent.setState({ expenses: tempExpenses });
      });
  }

  //console.log(expenses[0]);
  renderExpenses = (expense, index) => {
    console.log(expense);
    return (
      <tr>
        <td>{expense.title}</td>
        <td>$ {expense.amount}</td>
        <td>{expense.category}</td>
        <td>{expense.date}</td>
      </tr>
    );
  };

  render() {
    return (
      <div>
        <ReactBootStrap.Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>{this.state.expenses.map(this.renderExpenses)}</tbody>
        </ReactBootStrap.Table>
      </div>
    );
  }
}

// const Expenses = ({ user }) => {
//   var expenses = [
// {
//   title: "Sovi",
//   amount: "10",
//   category: "Food",
//   date: "10 June",
// },
// {
//   title: "Crowns",
//   amount: "20",
//   category: "Food",
//   date: "10 May",
// },
// {
//   title: "Shoes",
//   amount: "40",
//   category: "Shopping",
//   date: "25 August",
// },
// {
//   title: "Groceries",
//   amount: "25",
//   category: "Groceries",
//   date: "28 December",
// },
//];

//   //console.log("username:" + user);
//   axios.get("http://localhost:3050/user/" + user).then(function (res) {
//     //console.log(res.data.expense);

//     for (var i = 0; i < res.data.expense.length; i++) {
//       expenses[i] = res.data.expense[i];
//     }
//     //console.log(expenses);
//   });

//   //console.log(expenses[0]);
//   const renderExpenses = (expense, index) => {
//     console.log(expense);
//     return (
//       <tr>
//         <td>{expense.title}</td>
//         <td>$ {expense.amount}</td>
//         <td>{expense.category}</td>
//         <td>{expense.date}</td>
//       </tr>
//     );
//   };
//   return (
//     <div>
//       <ReactBootStrap.Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Amount</th>
//             <th>Category</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>{expenses.map(renderExpenses)}</tbody>
//       </ReactBootStrap.Table>
//     </div>
//   );
// };

// export default Expenses;
