import React, { Component } from "react";

export class ArticleImage extends Component {
  render() {
    const article = this.props.data;

    return (
      <img src={article.image} className="card-img-top" alt={article.title} />
    );
  }
}
