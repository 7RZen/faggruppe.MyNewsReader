import { Component } from "react";

class Header extends Component {
  render() {
    return (
      <header>
        <nav className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 navbar navbar-light">
          <div className="container">
            <a className="navbar-brand" href="/">
              My News Reader
            </a>
            <button
              aria-label="Toggle navigation"
              type="button"
              className="mr-2 navbar-toggler"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="d-sm-inline-flex flex-sm-row-reverse collapse navbar-collapse">
              <ul className="navbar-nav flex-grow">
                <li className="nav-item" key="1">
                  <a className="text-dark nav-link" href="/">
                    Home
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
