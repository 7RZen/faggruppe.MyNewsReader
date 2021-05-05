import React, { Component } from "react";
import { MyDateFormat } from "../../components/my-date-format/MyDateFormat";
import { ArticleImage } from "../../components/article-image/ArticleImage";
import { ArticleTitle } from "../../components/article-title/ArticleTitle";
import { ArticleAbstract } from "../../components/article-abstract/ArticleAbstract";
import "./ArticleWithImageLeft.css";

export class ArticleWithImageLeft extends Component {
  render() {
    const article = this.props.data;

    return (
      <article className="article article-with-image article-container-image-left">
        <div className="image-left">
          <ArticleImage data={article} />
        </div>
        <div className="data-center">
          <div>
            <ArticleTitle data={article} />
          </div> 
          <div>
          <ArticleAbstract data={article} />
        </div>
        <div>
          <MyDateFormat date={article.date} />
        </div>
        </div>
       
      </article>
    );
  }
}
