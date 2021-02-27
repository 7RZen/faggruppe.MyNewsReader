import React, { Component } from "react";
import { NewsOutlet } from "./NewsOutlet";
import { ArticleWithoutImage } from "./ArticleWithoutImage";
import { ArticleWithImageLeft } from "./ArticleWithImageLeft";
import { ArticleWithImageRight } from "./ArticleWithImageRight";

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = {
      outlets: [],
      articles: [],
      loadingArticles: true,
      loadingOutlets: true,
      selectedOutlet: "nrk" // Initial news outlet displayed
    };
    this.findArrayElementByTag = this.findArrayElementByTag.bind(this);
  }

  callbackFunction = (selectedOutlet) => {
    this.setState({ selectedOutlet: selectedOutlet });
    this.getArticles(selectedOutlet);
    window && window.scroll(0,0);
  };

  componentDidMount() {
    this.getNewsOutlets();
    this.getArticles(this.state.selectedOutlet);
  }

  renderNewsOutlets(outlets, selectedOutlet) {
    // const outletsByGroup = outlets.reduce((groupedOutlet, { group, tag }) => {
    //   if (!groupedOutlet[group]) groupedOutlet[group] = [];
    //   groupedOutlet[group].push(this.findArrayElementByTag(outlets, tag));
    //   return groupedOutlet;
    // }, {});
    // console.log(outletsByGroup);

    return (
      <div className="list-group news-outlets">
        <div className="list-group-item list-group-item-secondary">NEWS</div>
        {outlets
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map((outlet) => {
            return (
              <NewsOutlet
                data={outlet}
                selectedOutlet={selectedOutlet}
                key={outlet.tag}
                setActiveNewsOutlet={this.callbackFunction}
              />
            );
          })}
          <a href="#top" className="list-group-item list-group-item-action list-group-item-info">To top</a>
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
          <img id="top-logo"
            src={newsOutletIcon}
            alt={newsOutletName}
            className="newsoutlet-large-icon"
          />
        </h1>
        <div className="outlets-container">{newsOutletContent}</div>
        <div className="articles-container">{articleContent}</div>
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
