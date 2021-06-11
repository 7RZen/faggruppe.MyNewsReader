import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const NewsOutletForm = (props) => {
  const [newsOutlet, setNewsOutlet] = useState({
    name: props.newsOutlet ? props.newsOutlet.name : "",
    icon: props.newsOutlet ? props.newsOutlet.icon : "",
    iconBackground: props.newsOutlet ? props.newsOutlet.iconBackground : "",
    fetchUrl: props.newsOutlet ? props.newsOutlet.fetchUrl : "",
    disabled: props.newsOutlet ? props.newsOutlet.disabled : "",
    take: props.newsOutlet ? props.newsOutlet.take : "",
    skip: props.newsOutlet ? props.newsOutlet.skip : "",
    tag: props.newsOutlet ? props.newsOutlet.tag : "",
    group: props.newsOutlet ? props.newsOutlet.group : "",

    lastCrawledDate: props.newsOutlet ? props.newsOutlet.lastCrawledDate : "",
    nextCrawlDate: props.newsOutlet ? props.newsOutlet.nextCrawlDate : "",
    articlesKeepInHistory: props.newsOutlet
      ? props.newsOutlet.articlesKeepInHistory
      : "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const {
    name,
    icon,
    iconBackground,
    fetchUrl,
    disabled,
    take,
    skip,
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
      disabled,
      take,
      skip,
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
        disabled,
        take,
        skip,
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
      case "take":
      case "skip":
        if (value === "" || parseInt(value) === +value) {
          setNewsOutlet((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
        break;

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
            placeholder="Enter Name"
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
            placeholder="Icon"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="iconBackground">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="iconBackground"
            value={iconBackground}
            placeholder="Icon background color"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="fetchUrl">
          <Form.Label>URL</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="fetchUrl"
            value={fetchUrl}
            placeholder="URL"
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
            placeholder="Tag"
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
            placeholder="Group"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default NewsOutletForm;
