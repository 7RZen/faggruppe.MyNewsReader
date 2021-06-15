import React, { Component } from "react";
import { groupByKey, findArrayElementByTag } from "../../components/Utils";
import { Header } from "./Header";

export class ListNewsOutlets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      outlets: [],
      loadingOutlets: true,
    };

    this.findArrayElementByTag = findArrayElementByTag.bind(this);
    this.groupByKey = groupByKey.bind(this);
    this.selectNewsOutlet = this.selectNewsOutlet.bind(this);

    this.baseUrl = "http://newsapi.oh7.no";
  }

  componentDidMount() {
    this.getNewsOutlets();
  }

  selectNewsOutlet(selectedOutlet) {
    this.context.router.history.push("/edit");
  }

  renderNewsOutlets(outlets) {
    const groupedOutlets = Object.entries(groupByKey(outlets, "group"));

    return (
      <div>
        <Header />
        {groupedOutlets.map((data) => {
          const title = data[0];
          const outlets = data[1];
          return (
            <div key={title}>
              <div>{title}</div>
              <ul>
                {outlets
                  .sort((a, b) => (a.name > b.name ? 1 : -1))
                  .map((outlet) => {
                    let navLink = `/edit/${outlet.tag}`;
                    return (
                      <li key={outlet.tag}>
                        <a href={navLink}>
                          <span>{outlet.name}</span>
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>
          );
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

    return (
      <div>
        <h2>List of news outlets</h2>
        <div>{newsOutletContent}</div>
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
}

export default ListNewsOutlets;
