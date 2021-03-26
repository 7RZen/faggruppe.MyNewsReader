import React, { Component } from "react";
import Moment from "react-moment";
import "moment-timezone";

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
                <h1 dangerouslySetInnerHTML={{__html: article.title}}/>
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <p dangerouslySetInnerHTML={{ __html: article.abstract }} />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <Moment date={article.date} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
