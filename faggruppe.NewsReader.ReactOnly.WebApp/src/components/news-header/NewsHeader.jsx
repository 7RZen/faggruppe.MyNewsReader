import React, { Component }  from 'react';
import "./NewsHeader.css";

export class NewsHeader extends Component {
  render() {
    const newsOutletIcon = this.props.newsOutletIcon;
    const newsOutletName = this.props.newsOutletName;

    return (
      <h1>
        <img
          id="top-logo"
          src={newsOutletIcon}
          alt={newsOutletName}
          className="newsoutlet-large-icon"
        />
      </h1>
    );
  }
}
