import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
// import { Home } from './domain/home/Home';
// import { FetchData } from './components/FetchData';
// import { Counter } from './components/Counter';
import { NewsReader } from "./domain/news-reader/NewsReader";

import './App.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={NewsReader} />
        {/* <Route path='/newsreader' component={NewsReader} /> */}
        {/* <Route path='/fetch-data' component={FetchData} /> */}
      </Layout>
    );
  }
}