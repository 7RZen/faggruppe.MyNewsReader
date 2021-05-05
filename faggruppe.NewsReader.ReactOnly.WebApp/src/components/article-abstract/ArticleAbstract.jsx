import React, { Component } from "react";

export class ArticleAbstract extends Component {
  render() {
    const article = this.props.data;

    return (
      <p
        className="article-abstract"
        dangerouslySetInnerHTML={{ __html: article.abstract }}
      />
    );
  }
}
