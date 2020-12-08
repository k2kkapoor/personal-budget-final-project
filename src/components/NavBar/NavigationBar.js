import React from "react";
// import styled from 'styled-components';

// const Styles = styled.div`
//     .navbar{
//         background-color: #222;
//     }
//     .navbar-brand, .navbar-nav .nav-link{
//         color: #bbb;

//         &:hover {
//             color: white;
//         }
//     }
// `;

// export const NavigationBar = () => (
//    <Styles>
//         <Navbar expand = "lg">
//             <Navbar.Brand href ="/">Code Life</Navbar.Brand>
//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Collapse id="basic-navbar-nav">
//                 <Nav className = "ml-auto">
//                     <Nav.Item><Nav.Link href ="/">Home</Nav.Link></Nav.Item>
//                     <Nav.Item><Nav.Link href ="/about">About</Nav.Link></Nav.Item>
//                     <Nav.Item><Nav.Link href ="/contact">Contact</Nav.Link></Nav.Item>
//                 </Nav>
//             </Navbar.Collapse>
//         </Navbar>
//     </Styles>

// )

// export const NavigationBar = () => {
//   return (
//     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//       <Navbar.Brand href="#home">Personal Budget</Navbar.Brand>
//       <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//       <Navbar.Collapse id="responsive-navbar-nav">
//         <Nav className="mr-auto">
//           <Nav.Item>
//             <Nav.Link href="/">Home</Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link href="/about">About</Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link href="/contact">Contact</Nav.Link>
//           </Nav.Item>
//         </Nav>
//         <Nav>
//           <Nav.Link href="#deets">Logout</Nav.Link>
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//   );
// };

export const NavigationBar = ({ handleLogout }) => {
  return (
    <nav className="mr-auto">
      <h2>Personal Budget</h2>
      <a href="/">Dashboard</a>
      <a href="/expenses">Expenses</a>
      <a href="/visualization">Visualization</a>

      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};
