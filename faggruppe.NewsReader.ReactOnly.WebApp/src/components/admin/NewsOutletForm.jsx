import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import "./NewsOutletForm.css";

const NewsOutletForm = (props) => {
  const [newsOutlet, setNewsOutlet] = useState({
    // User input fields
    name: props.newsOutlet ? props.newsOutlet.name : "",
    icon: props.newsOutlet ? props.newsOutlet.icon : "",
    iconBackground: props.newsOutlet ? props.newsOutlet.iconBackground : "",
    fetchUrl: props.newsOutlet ? props.newsOutlet.fetchUrl : "",
    tag: props.newsOutlet ? props.newsOutlet.tag : "",
    group: props.newsOutlet ? props.newsOutlet.group : "",

    // System fields
    disabled: props.newsOutlet ? props.newsOutlet.disabled : "",
    take: props.newsOutlet ? props.newsOutlet.take : "",
    skip: props.newsOutlet ? props.newsOutlet.skip : "",
    lastCrawledDate: props.newsOutlet ? props.newsOutlet.lastCrawledDate : "",
    nextCrawlDate: props.newsOutlet ? props.newsOutlet.nextCrawlDate : "",
    articlesKeepInHistory: props.newsOutlet ? props.newsOutlet.articlesKeepInHistory : ""
  });

  const [errorMsg, setErrorMsg] = useState("");
  const {
    name,
    icon,
    iconBackground,
    fetchUrl,
    tag,
    group,
  } = newsOutlet;

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [
      name,
      icon,
      iconBackground,
      fetchUrl,
      tag,
      group,
    ];
    let errorMsg = "";

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== "" && value !== "0";
    });

    if (allFieldsFilled) {
      const newsOutlet = {
        name,
        icon,
        iconBackground,
        fetchUrl,
        tag,
        group,
      };
      props.handleOnSubmit(newsOutlet);
    } else {
      errorMsg = "Please fill out all the fields.";
    }
    setErrorMsg(errorMsg);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      default:
        setNewsOutlet((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    }
  };

  return (
    <div className="main-form">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="name"
            value={name}
            placeholder="News outlet name"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="icon">
          <Form.Label>Icon</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="icon"
            value={icon}
            placeholder="Path to icon (/img/icon.png)"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="iconBackground">
          <Form.Label>Icon background color</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="iconBackground"
            value={iconBackground}
            placeholder="Icon background color (#00ff00)"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="fetchUrl">
          <Form.Label>URL to RSS</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="fetchUrl"
            value={fetchUrl}
            placeholder="URL (https://site.com/rssfeed.xml)"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="fetchUrl">
          <Form.Label>Tag</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="tag"
            value={tag}
            placeholder="Tag (site-in-lower-case)"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="group">
          <Form.Label>Group</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="group"
            value={group}
            placeholder="Group (National or International)"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn">
          Add
        </Button>
        
        <a href="/admin" className="btn btn-primary form-button">Cancel</a>
      </Form>
    </div>
  );
};

export default NewsOutletForm;
