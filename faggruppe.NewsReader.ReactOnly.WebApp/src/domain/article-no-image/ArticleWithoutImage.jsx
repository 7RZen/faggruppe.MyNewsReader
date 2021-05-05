import "./ArticleWithoutImage.css";
import React, { Component } from "react";
import { MyDateFormat } from "../../components/my-date-format/MyDateFormat";
import { ArticleTitle } from "../../components/article-title/ArticleTitle";
import { ArticleAbstract } from "../../components/article-abstract/ArticleAbstract";

export class ArticleWithoutImage extends Component {
  render() {
    const article = this.props.data;

    return (
      <div className="articles-container article-without-image">
        <ArticleTitle data={article} />
        <ArticleAbstract data={article} />
        <p>
          <MyDateFormat date={article.date} />
        </p>
      </div>
    );
  }
}
