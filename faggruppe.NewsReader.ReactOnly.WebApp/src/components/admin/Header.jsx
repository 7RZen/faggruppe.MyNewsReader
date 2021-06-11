import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export class Header extends Component {
  render() {
    return (
      <header>
        <div className="links">
          <NavLink to="/" className="link" activeClassName="active" exact>
            News outlets
          </NavLink>
          <NavLink to="/add" className="link" activeClassName="active">
            Add news outlet
          </NavLink>
        </div>
      </header>
    );
  }
}
