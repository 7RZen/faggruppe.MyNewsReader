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
}