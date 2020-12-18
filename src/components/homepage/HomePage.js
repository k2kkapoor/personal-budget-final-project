import { React, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar } from "../NavBar/NavigationBar";
import { Footer } from "../footer/Footer";
import Expenses from "../expenses/expenses";
import { Layout } from "../Layout";
import fire from "../../fire";

import Visualization from "../visualization/visualization";
import { NoMatch } from "../NoMatch";

const HomePage = ({ handleLogout, email }) => {
  const [userName, setUserName] = useState("");

  fire.auth().onAuthStateChanged(function (user) {
    if (user) {
      setUserName(user.email);
    } else {
    }
  });

  return (
    <section className="hero">
      <NavigationBar handleLogout={handleLogout} userName={userName} />
      <Layout>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              component={() => <Expenses user={userName} />}
            ></Route>
            <Route
              path="/visualization"
              component={() => <Visualization user={userName} />}
            ></Route>
            <Route component={NoMatch}></Route>
          </Switch>
        </Router>
      </Layout>
      <Footer />
    </section>
  );
};

export default HomePage;
