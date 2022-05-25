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
    const isSelceted = this.props.selectedOutlet === outlet.tag;
    const outletShortName = isSelceted ? "active" : "";
    const statusCss = isSelceted ? "nav-text active" : "nav-text";
    let shortName = outlet.name;

    if (outlet.name.length > 4) {
      shortName = shortName.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");      
      shortName = shortName.replace(/\s/g, '');
      shortName = shortName.substring(0, 4);
    }

    return (
      <li key={outlet.tag}>
        <a href="/#" onClick={() => this.selectNewsOutlet(outlet.tag)}>
          <i className={outletShortName}>{shortName}</i>
          <span className={statusCss}>{outlet.name}</span>
        </a>
      </li>
    );
  }
}
