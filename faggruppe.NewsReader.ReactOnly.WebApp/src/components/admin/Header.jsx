/* jshint ignore:start */
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export class Header extends Component {
  render() {
    return (
      <header>
        <div className="links">
          <NavLink to="/add" className="link" activeClassName="active">
            Add news outlet
          </NavLink>
        </div>
      </header>
    );
  }
}
/* jshint ignore:end */