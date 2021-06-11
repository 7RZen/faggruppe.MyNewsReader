import "./SimpleNewsOutletMenu.css";
import React, { Component } from "react";
import { SimpleNewsOutlet } from "../../components/simple-news-outlet/SimpleNewsOutlet";

export class SimpleNewsOutletMenu extends Component {
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

    return (
      <ul>
        <li key={title}>
          <a href="/#" className="menu-header">
            <span className="nav-text">{title}</span>
          </a>
        </li>
        {outlets
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map((outlet) => {
            return (
              <SimpleNewsOutlet
                data={outlet}
                selectedOutlet={selectedOutlet}
                key={outlet.tag}
                setActiveNewsOutlet={this.callbackFunction}
              />
            );
          })}
      </ul>
    );
  }
}
