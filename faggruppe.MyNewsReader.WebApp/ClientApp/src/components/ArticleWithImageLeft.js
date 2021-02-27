import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

export class ArticleWithImageLeft extends Component {
    render() {
        const article = this.props.data;
        const { icon, name } = article.newsOutlet;

        return (
            <div className="article article-with-image">
                <div className="row">
                    <div className="col-4">
                        <img src={article.image} className="card-img-top" alt={article.title} />
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <div className="col">
                                <a href={article.url} target="_blank" rel="noreferrer"><h1 dangerouslySetInnerHTML={{__html: article.title}}/></a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                            <p dangerouslySetInnerHTML={{__html: article.abstract}} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Moment date={article.date} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}