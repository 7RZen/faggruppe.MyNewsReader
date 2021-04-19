import React, { Component } from "react";

export class ArticleTitle extends Component {
  render() {
    const article = this.props.data;

    return (
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        <h1 dangerouslySetInnerHTML={{ __html: article.title }} />
      </a>
    );
  }
}
