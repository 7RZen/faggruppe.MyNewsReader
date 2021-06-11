import React, { Component } from "react";
import { SimpleNewsOutletMenu } from "../simple-news-outlet-menu/SimpleNewsOutletMenu";
import { groupByKey, findArrayElementByTag } from "../../components/Utils";
import "./Admin.css";

export class Admin extends Component {
  static displayName = Admin.name;

  constructor(props) {
    super(props);
    this.state = {
      outlets: [],
      loadingOutlets: true,
      selectedOutlet: "nrk", // Initial news outlet displayed
    };

    this.findArrayElementByTag = findArrayElementByTag.bind(this);
    this.groupByKey = groupByKey.bind(this);
    this.callbackFunction = this.callbackFunction.bind(this);

    this.baseUrl = "http://newsapi.oh7.no";
  }

  callbackFunction(selectedOutlet) {
    this.setState({ selectedOutlet });
  }

  componentDidMount() {
    this.getNewsOutlets();
  }

  renderNewsOutlets(outlets, selectedOutlet) {
    const groupedOutlets = Object.entries(groupByKey(outlets, "group"));

    return (
      <ul>
        {groupedOutlets.map((data) => {
          const title = data[0];
          const outlets = data[1];
          return (
            <SimpleNewsOutletMenu
              data={outlets}
              selectedOutlet={selectedOutlet}
              title={title}
              callbackFunction={this.callbackFunction}
              key={title}
            />
          );
        })}
      </ul>
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
        <div className="admin-container">{newsOutletContent}</div>
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
