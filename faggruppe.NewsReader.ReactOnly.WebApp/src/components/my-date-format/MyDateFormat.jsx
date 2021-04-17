/* jshint ignore:start */
import React, { Component } from "react";
import Moment from "react-moment";
import "moment-timezone";

export class MyDateFormat extends Component {
  render() {
    const date = this.props.date;
    return (
      <span className="custom-date">
        <Moment fromNow="true">{date}</Moment>
        <span className="soft-date" data-bs-toggle="tooltip" data-bs-placement="right" title={date}>
          &nbsp; <Moment format="DD.MM.YYYY HH:mm">{date}</Moment>
        </span>
      </span>
    );
  }
}
/* jshint ignore:end */
