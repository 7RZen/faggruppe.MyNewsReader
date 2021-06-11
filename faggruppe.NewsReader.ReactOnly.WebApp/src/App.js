import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { ListNewsOutlets } from './components/admin/ListNewsOutlets';
import { AddNewsOutlet } from './components/admin/AddNewsOutlet';
import { NewsReader } from "./domain/news-reader/NewsReader";

import './App.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={NewsReader} />
        <Route path='/admin' component={ListNewsOutlets} />
        <Route path='/add' component={AddNewsOutlet} />
      </Layout>
    );
  }
}