import React from "react";
import * as ReactDOM from "react-dom";
import Expenses from "../expenses";

// E2E test case
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Expenses></Expenses>, div);
});
