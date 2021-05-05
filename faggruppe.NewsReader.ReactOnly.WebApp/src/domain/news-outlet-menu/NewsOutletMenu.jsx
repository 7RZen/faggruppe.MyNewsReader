import "./NewsOutletMenu.css";
import React, { Component } from "react";
import { NewsOutlet } from "../../components/news-outlet/NewsOutlet";

export class NewsOutletMenu extends Component {
  constructor(props) {
    super(props);
    this.callbackFunction = this.callbackFunction.bind(this);
  }

  callbackFunction(selectedOutlet) {
    this.props.callbackFunction(selectedOutlet);
  }

  render() {
    const outlets = this.props.data;
    const selectedOutlet = this.props.selectedOutlet;
    const title = this.props.title;
    const iconClass = title === "National" ? "fas fa-crown" : "fas fa-globe-europe";

    return (
      <ul>
        <li key={title}>
          <a href="/#" className="menu-header">
            <i className={iconClass}></i>
            <span className="nav-text">{title}</span>
          </a>
        </li>
        {outlets
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map((outlet) => {
            return (
              <NewsOutlet
                data={outlet}
                selectedOutlet={selectedOutlet}
                key={outlet.tag}
                setActiveNewsOutlet={this.callbackFunction}
              />
            );
          })}
        <li key={title}>
          <a href="/#top" className="menu-bottom">
            <i className="fas fa-arrow-up"></i>
            <span className="nav-text">To top</span>
          </a>
        </li>
      </ul>
    );
  }
}
