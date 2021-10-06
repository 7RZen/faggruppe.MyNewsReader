import React, { Component } from "react";
import NewsOutletForm from "./NewsOutletForm/NewsOutletForm";

export class AddNewsOutlet extends Component {
  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);

    //this.baseUrl = "http://newsapi.oh7.no";
    this.baseUrl = "https://localhost:5001";
  }

  handleOnSubmit(outlet) {
    console.log("Save form");
    console.log(outlet);
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
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(outlet),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
}
