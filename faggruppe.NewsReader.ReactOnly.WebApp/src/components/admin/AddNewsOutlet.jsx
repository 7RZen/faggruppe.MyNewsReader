/* jshint ignore:start */
import React, { Component } from "react";
import NewsOutletForm from "./NewsOutletForm/NewsOutletForm";

export class AddNewsOutlet extends Component {
  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(outlet) {
    //console.log(outlet);
    this.saveNewsOutlet(outlet);
  }

  render() {
    return (
      <React.Fragment>
        <NewsOutletForm handleOnSubmit={this.handleOnSubmit} />
      </React.Fragment>
    );
  }

  async saveNewsOutlet(outlet) {
    const url = `${this.baseUrl}/NewsOutletStore`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: outlet,
    })
      .then((data) => data.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
}
/* jshint ignore:end */