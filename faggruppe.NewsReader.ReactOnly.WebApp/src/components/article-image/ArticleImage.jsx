import React, { Component } from "react";

export class ArticleImage extends Component {
  render() {
    const article = this.props.data;

    return (
      <img src={article.image} alt={article.title} />
    );
  }
}
