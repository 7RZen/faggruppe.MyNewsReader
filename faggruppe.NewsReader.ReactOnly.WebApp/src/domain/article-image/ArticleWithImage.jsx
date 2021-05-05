import React, { Component } from "react";
import { MyDateFormat } from "../../components/my-date-format/MyDateFormat";
import { ArticleImage } from "../../components/article-image/ArticleImage";
import { ArticleTitle } from "../../components/article-title/ArticleTitle";
import { ArticleAbstract } from "../../components/article-abstract/ArticleAbstract";
import "./ArticleWithImage.css";

export class ArticleWithImage extends Component {
  render() {
    const article = this.props.data;

    return (
      <div className="articles-container article-container-image">
        <div className="article-content">
          <ArticleTitle data={article} />
          <ArticleAbstract data={article} />
          <p>
            <MyDateFormat date={article.date} />
          </p>
        </div>
        <div className="article-image">
          <ArticleImage data={article} />
        </div>
      </div>
    );
  }
}
