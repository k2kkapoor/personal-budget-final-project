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
import axios from "axios";
import Visualization from "../visualization/visualization";

const HomePage = ({ handleLogout, email }) => {
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");

  fire.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.

      // axios
      //   .get("http://localhost:3050/user/" + user.email)
      //   .then(function (res) {
      //     console.log(res);
      //   });
      setUserName(user.email);
    } else {
      // No user is signed in.
    }
  });

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
          </Switch>
        </Router>
      </Layout>
      <Footer />
    </section>
  );
};

export default HomePage;
