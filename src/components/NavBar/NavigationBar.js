import React from "react";

export const NavigationBar = ({ handleLogout }) => {
  return (
    <nav className="mr-auto">
      <h2>Personal Budget</h2>

      <a href="/">Dashboard</a>
      <a href="/visualization">Visualization</a>

      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};
