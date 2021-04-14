import React, { Component } from "react";

export class NewsOutlet extends Component {
  constructor(props) {
    super(props);
    this.selectNewsOutlet = this.selectNewsOutlet.bind(this);
  }

  selectNewsOutlet(outlet) {
    this.props.setActiveNewsOutlet(outlet);
  }

  render() {
    const outlet = this.props.data;
    const statusCss =
      this.props.selectedOutlet === outlet.tag ? "nav-text active" : "nav-text";

    return (
      <li key={outlet.tag}>
        <a href="/#" onClick={() => this.selectNewsOutlet(outlet.tag)}>
          <i className="fa fa-newspaper fa-lg"></i>
          <span className={statusCss}>{outlet.name}</span>
        </a>
      </li>
    );
  }
}