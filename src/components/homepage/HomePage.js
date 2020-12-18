// import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import { About } from "../About";
// import { Contact } from "../Contact";
// import { NoMatch } from "../NoMatch";
// import { Layout } from "../Layout";
// import { NavigationBar } from "../NavigationBar";

// const HomePage = () => {
//   return (
//     <React.Fragment>
//       <NavigationBar />
//       <Layout>
//         <Router>
//           <Switch>
//             <Route exact path="/" component={HomePage} />
//             <Route path="/about" component={About} />
//             <Route path="/contact" component={Contact} />
//             <Route component={NoMatch} />
//           </Switch>
//         </Router>
//       </Layout>
//     </React.Fragment>
//   );
// };

// export default HomePage;

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

  const nameUser = localStorage.getItem("name");

  return (
    <section className="hero">
      <NavigationBar handleLogout={handleLogout} />
      <Layout>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              component={() => <Expenses user={userName} />}
            ></Route>
            <Route
              exact
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
