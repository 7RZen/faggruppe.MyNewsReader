import React, { Component } from "react";
import { ArticleWithoutImage } from "./ArticleWithoutImage";
import { ArticleWithImageLeft } from "./ArticleWithImageLeft";
import { ArticleWithImageRight } from "./ArticleWithImageRight";
import { NewsOutletMenu } from "./NewsOutletMenu";

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = {
      outlets: [],
      articles: [],
      loadingArticles: true,
      loadingOutlets: true,
      selectedOutlet: "nrk", // Initial news outlet displayed
    };

    this.findArrayElementByTag = this.findArrayElementByTag.bind(this);
    this.groupByKey = this.groupByKey.bind(this);
  }

  callbackFunction = (selectedOutlet) => {
    this.setState({ selectedOutlet: selectedOutlet });
    this.getArticles(selectedOutlet);
    window && window.scroll(0, 0);
  };

  componentDidMount() {
    this.getNewsOutlets();
    this.getArticles(this.state.selectedOutlet);
  }

  renderNewsOutlets(outlets, selectedOutlet) {
    const groupedOutlets = this.groupByKey(outlets, "group");

    return (
      <div className="list-group news-outlets">
        {/* {groupedOutlets.each((outlets) => {
          return (
            <NewsOutletMenu
              data={outlets}
              selectedOutlet={selectedOutlet}
              title="XXX"
              callbackFunction={this.callbackFunction}
            />
          );
        })} */}
        <NewsOutletMenu
          data={groupedOutlets.National}
          selectedOutlet={selectedOutlet}
          title="Nasjonale nyheter"
          callbackFunction={this.callbackFunction}
        />
        <NewsOutletMenu
          data={groupedOutlets.International}
          selectedOutlet={selectedOutlet}
          title="Internasjonale nyheter"
          callbackFunction={this.callbackFunction}
        />
        <a
          href="#top"
          className="list-group-item list-group-item-action list-group-item-info"
        >
          To top
        </a>
      </div>
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

  groupByKey(array, key) {
    return array.reduce((hash, obj) => {
      if (obj[key] === undefined) return hash;
      return Object.assign(hash, {
        [obj[key]]: (hash[obj[key]] || []).concat(obj),
      });
    }, {});
  }

  findArrayElementByTag(array, tag) {
    return array.find((element) => {
      return element.tag === tag;
    });
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
    let newsOutlet = this.findArrayElementByTag(
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
    await fetch("newsoutletstore")
      .then((data) => data.json())
      .then((data) => this.setState({ outlets: data, loadingOutlets: false }));
  }

  async getArticles(selectedOutlet) {
    document.getElementById("top-logo").src = "";
    const url = "newsstore/?outlet=" + selectedOutlet;
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
          articles: data,
          loadingArticles: false,
          selectedOutlet: selectedOutlet,
        })
      )
      .catch((error) => {
        console.error(error);
      });
  }
}
