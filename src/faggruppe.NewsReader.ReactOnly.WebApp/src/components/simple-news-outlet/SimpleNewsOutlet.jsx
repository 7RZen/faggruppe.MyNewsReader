import React, { Component } from "react";

export class SimpleNewsOutlet extends Component {
  constructor(props) {
    super(props);
    this.selectNewsOutlet = this.selectNewsOutlet.bind(this);
  }

  selectNewsOutlet(outlet) {
    this.props.setActiveNewsOutlet(outlet);
  }

  render() {
    const outlet = this.props.data;
    const isSelceted = this.props.selectedOutlet === outlet.tag;
    const statusCss = isSelceted ? "nav-text active" : "nav-text";

    return (
      <li key={outlet.tag}>
        <a href="/#" onClick={() => this.selectNewsOutlet(outlet.tag)}>
          <span className={statusCss}>{outlet.name}</span>
        </a>
      </li>
    );
  }
}
