import React, { Component } from "react";
import { MyDateFormat } from "../my-date-format/MyDateFormat";

export class ArticleWithImageLeft extends Component {
  render() {
    const article = this.props.data;

    return (
      <div className="article article-with-image">
        <div className="row">
          <div className="col col-lg-4">
            <img
              src={article.image}
              className="card-img-top"
              alt={article.title}
            />
          </div>
          <div className="col col-lg-8">
            <div className="row">
              <div className="col">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <h1 dangerouslySetInnerHTML={{ __html: article.title }} />
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p className="article-abstract" dangerouslySetInnerHTML={{ __html: article.abstract }} />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <MyDateFormat date={article.date} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}