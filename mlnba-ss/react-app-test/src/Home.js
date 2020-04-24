import React, { Component, useState } from 'react';
import './Home.css';
import { Carousel, CarouselItem } from 'react-bootstrap';


const CustomItem = ({ content }) => {
  return (<div><h1>{content}</h1></div>)
}

export default class Home extends Component {


  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Scratch</h1>
          <p>A simple note taking app</p>
          <hr />
        </div>
      </div>
    );
  }
}