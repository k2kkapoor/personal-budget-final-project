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

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar } from "../NavBar/NavigationBar";
import Expenses from "../expenses/expenses";
import { Layout } from "../Layout";

const HomePage = ({ handleLogout }) => {
  return (
    <section className="hero">
      <NavigationBar handleLogout={handleLogout} />
      <Layout>
        <Router>
          <Switch>
            <Route path="/expenses" component={Expenses}></Route>
          </Switch>
        </Router>
      </Layout>
    </section>
  );
};

export default HomePage;
