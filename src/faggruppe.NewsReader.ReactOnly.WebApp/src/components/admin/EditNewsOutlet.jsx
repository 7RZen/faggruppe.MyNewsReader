import React, { Component } from "react";
import NewsOutletForm from "./NewsOutletForm/NewsOutletForm";

export class EditNewsOutlet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      outlet: null,
      loadingOutlet: true,
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.selectedNewsOutlet = "nrk";

    //this.baseUrl = "http://newsapi.oh7.no";
    this.baseUrl = "https://localhost:5001";
  }

  componentDidMount() {
    this.getNewsOutlet(this.selectedNewsOutlet);
  }

  handleOnSubmit(outlet) {
    console.log(outlet);
  }

  renderNewsOutlet(outlet) {
    return (
      <React.Fragment>
        <NewsOutletForm
          handleOnSubmit={this.handleOnSubmit}
          newsOutlet={outlet}
        />
      </React.Fragment>
    );
  }

  render() {
    let content = this.state.loadingOutlet ? (
      <p>
        <em>Loading news outlet...</em>
      </p>
    ) : (
      this.renderNewsOutlet(this.state.outlet)
    );

    return <div>content{content}</div>;
  }

  async getNewsOutlet(selectedNewsOutlet) {
    const url = `${this.baseUrl}/NewsOutletStore/${selectedNewsOutlet}`;
    await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        var newsOutlet = data.newsOutlets[0];
        this.setState({
          outlet: newsOutlet,
          loadingOutlet: false,
        });
      })
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
