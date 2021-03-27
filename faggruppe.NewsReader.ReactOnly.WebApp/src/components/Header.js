import { Component } from "react";

class Header extends Component {
  render() {
    return (
      <header>
        <nav class="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 navbar navbar-light">
          <div class="container">
            <a class="navbar-brand" href="/">
              My News Reader
            </a>
            <button
              aria-label="Toggle navigation"
              type="button"
              class="mr-2 navbar-toggler"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="d-sm-inline-flex flex-sm-row-reverse collapse navbar-collapse">
              <ul class="navbar-nav flex-grow">
                <li class="nav-item">
                  <a class="text-dark nav-link" href="/">
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
