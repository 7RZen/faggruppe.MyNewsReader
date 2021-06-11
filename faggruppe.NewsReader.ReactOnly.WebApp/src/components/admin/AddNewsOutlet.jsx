import React, { Component } from 'react';
import NewsOutletForm from './NewsOutletForm';

export class AddNewsOutlet extends Component {
  constructor (props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(outlet) {
    console.log(outlet);
  }

  render() {
    return (
      <React.Fragment>
        <NewsOutletForm handleOnSubmit={this.handleOnSubmit} />
      </React.Fragment>
    );
  };

  async saveNewsOutlet() {
    const url = `${this.baseUrl}/NewsOutletStore`;
    await fetch(url, {
      method: "POST",
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