import "./NewsReader.css";
import React, { Component } from "react";
import { ArticleWithImageLeft } from "../../components/article-image-left/ArticleWithImageLeft";
import { ArticleWithImageRight } from "../../components/article-image-right/ArticleWithImageRight";
import { ArticleWithoutImage } from "../../components/article-no-image/ArticleWithoutImage";
import { NewsOutletMenu } from "../../components/news-outlet-menu/NewsOutletMenu";
import { groupByKey, findArrayElementByTag } from "../../components/Utils";

class NewsReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      outlets: [],
      articles: [],
      loadingArticles: true,
      loadingOutlets: true,
      selectedOutlet: "nrk", // Initial news outlet displayed
    };

    this.findArrayElementByTag = findArrayElementByTag.bind(this);
    this.groupByKey = groupByKey.bind(this);
    this.callbackFunction = this.callbackFunction.bind(this);
  }

  callbackFunction(selectedOutlet) {
    this.setState({ selectedOutlet });
    this.getArticles(selectedOutlet);
    if (window) window.scroll(0, 0);
  }

  componentDidMount() {
    this.getNewsOutlets();
    this.getArticles(this.state.selectedOutlet);
  }

  renderNewsOutlets(outlets, selectedOutlet) {
    const groupedOutlets = Object.entries(groupByKey(outlets, "group"));

    return (
      <nav class="main-menu">
        <div class="scrollbar" id="style-1">
          {groupedOutlets.map((data) => {
            const title = data[0];
            const outlets = data[1];
            return (
              <NewsOutletMenu
                data={outlets}
                selectedOutlet={selectedOutlet}
                title={title}
                callbackFunction={this.callbackFunction}
                key={title}
              />
            );
          })}
        </div>
      </nav>
    );
  }

  renderNews(articles) {
    let index = 0;

    return (
      <div className="articles">
        {articles.map((article) => {
          if (article.image) {
            if (++index % 2 === 0) {
              return <ArticleWithImageLeft data={article} key={article.id} />;
            }
            return <ArticleWithImageRight data={article} key={article.id} />;
          }
          return <ArticleWithoutImage data={article} key={article.id} />;
        })}
      </div>
    );
  }

  render() {
    let newsOutletContent = this.state.loadingOutlets ? (
      <p>
        <em>Loading news outlets...</em>
      </p>
    ) : (
      this.renderNewsOutlets(this.state.outlets, this.state.selectedOutlet)
    );
    let articleContent = this.state.loadingArticles ? (
      <p>
        <em>Loading articles...</em>
      </p>
    ) : (
      this.renderNews(this.state.articles)
    );
    let newsOutlet = findArrayElementByTag(
      this.state.outlets,
      this.state.selectedOutlet
    );
    let newsOutletName = "";
    let newsOutletIcon = "";

    if (newsOutlet) {
      newsOutletName = newsOutlet.name;
      newsOutletIcon = newsOutlet.icon;
    }

    return (
      <div>
        <h1>
          <img
            id="top-logo"
            src={newsOutletIcon}
            alt={newsOutletName}
            className="newsoutlet-large-icon"
          />
        </h1>
        <div>
          <div className="outlets-container">{newsOutletContent}</div>
          <div className="articles-container">{articleContent}</div>
        </div>
      </div>
    );
  }

  async getNewsOutlets() {
    await fetch("http://newsapi.oh7.no/NewsOutletStore")
      .then((data) => data.json())
      .then((data) =>
        this.setState({
          outlets: data.newsOutlets,
          loadingOutlets: false,
        })
      )
      .catch((error) => {
        console.error(error);
      });
  }

  async getArticles(selectedOutlet) {
    const url = "http://newsapi.oh7.no/NewsStore/?outlet=" + selectedOutlet;
    await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) =>
        this.setState({
          articles: data.articles,
          loadingArticles: false,
          selectedOutlet: selectedOutlet,
        })
      )
      .catch((error) => {
        console.error(error);
      });
  }
}

export default NewsReader;
