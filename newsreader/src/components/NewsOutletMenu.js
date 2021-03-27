import React, { Component } from "react";
import { NewsOutlet } from "./NewsOutlet";

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

    return (
      <div>
        <div className="list-group-item list-group-item-secondary">{title}</div>
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
      </div>
    );
  }
}
