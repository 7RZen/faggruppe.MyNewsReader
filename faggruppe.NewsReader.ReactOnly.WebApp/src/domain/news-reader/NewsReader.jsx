import "./NewsReader.css";
import React, { Component } from "react";
import { ArticleWithImage } from "../article-image/ArticleWithImage";
import { ArticleWithoutImage } from "../article-no-image/ArticleWithoutImage";
import { NewsOutletMenu } from "../news-outlet-menu/NewsOutletMenu";
import { NewsHeader } from "../../components/news-header/NewsHeader";
import { groupByKey, findArrayElementByTag } from "../../components/Utils";

export class NewsReader extends Component {
  static displayName = NewsReader.name;

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

    this.baseUrl = "http://newsapi.oh7.no";
    //this.baseUrl = "https://localhost:44312";
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
      <nav className="main-menu">
        <div className="scrollbar" id="style-1">
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
    return (
      <div className="articles">
        {articles.map((article) => {
          if (article.image) {
            return <ArticleWithImage data={article} key={article.id} />;
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
        <NewsHeader
          newsOutletName={newsOutletName}
          newsOutletIcon={newsOutletIcon}
        />
        <div className="outlets-container">{newsOutletContent}</div>
        <div className="articles-container">{articleContent}</div>
      </div>
    );
  }

  async getNewsOutlets() {
    const url = `${this.baseUrl}/NewsOutletStore`;
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
          outlets: data.newsOutlets,
          loadingOutlets: false,
        })
      )
      .catch((error) => {
        console.error(error);
      });
  }

  async getArticles(selectedOutlet) {
    const url = `${this.baseUrl}/NewsStore/?outlet=${selectedOutlet}`;

    this.setState({
      articles: [],
      loadingArticles: true,
      selectedOutlet: selectedOutlet,
    })

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
