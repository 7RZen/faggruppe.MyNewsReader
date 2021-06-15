/* jshint ignore:start */
import React, { Component } from "react";
import NewsOutletForm from "./NewsOutletForm";

export class EditNewsOutlet extends Component {
  constructor(props) {
    super(props);
    this.outlet = null;
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.selectedNewsOutlet = "nrk";
  }

  handleOnSubmit(outlet) {
    console.log(outlet);
  }

  render() {
    return (
      <React.Fragment>
        <NewsOutletForm handleOnSubmit={this.handleOnSubmit} newsOutlet={this.outlet} />
      </React.Fragment>
    );
  }

  async getNewsOutlet() {
    const url = `${this.baseUrl}/NewsOutletStore/${this.selectedNewsOutlet}`;
    await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) =>
        this.setState({
          outlet: data.newsOutlets,
          loadingOutlets: false,
        })
      )
      .catch((error) => {
        console.error(error);
      });
  }

  async saveNewsOutlet() {
    const url = `${this.baseUrl}/NewsOutletStore`;
    await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) =>
        this.setState({
          outlets: data.newsOutlets,
          loadingOutlets: false,
        })
      )
      .catch((error) => {
        console.error(error);
      });
  }
}
/* jshint ignore:end */