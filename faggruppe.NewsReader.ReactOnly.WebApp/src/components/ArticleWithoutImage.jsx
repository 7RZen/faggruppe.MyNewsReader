/* jshint ignore:start */
import React, { Component } from "react";
import { MyDateFormat } from "./MyDateFormat";

export class ArticleWithoutImage extends Component {
  render() {
    const article = this.props.data;

    return (
      <div className="article article-without-image">
        <div className="row">
          <div>
            <div className="row">
              <div className="col-12">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <h1 dangerouslySetInnerHTML={{ __html: article.title }} />
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <p className="article-abstract" dangerouslySetInnerHTML={{ __html: article.abstract }} />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <MyDateFormat date={article.date} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
/* jshint ignore:end */
