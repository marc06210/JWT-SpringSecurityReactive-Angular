import React, { Component, useState } from 'react';
import './Home.css';
import { Carousel, CarouselItem } from 'react-bootstrap';


const CustomItem  = ({content}) => {
    return  (<div><h1>{content}</h1>
    </div>)
}

function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [items] = useState(["AAAA", "CCCC", "GGGG"]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };

  return (
    <Carousel activeIndex={index} direction={direction} onSelect={handleSelect}>
      {items.map(item => <Carousel.Item><CustomItem content={item}/></Carousel.Item>)}
    </Carousel>
  );
}

export default class Home extends Component {

  
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Scratch</h1>
          <p>A simple note taking app</p>
          <hr/>
          <ControlledCarousel />
        </div>
      </div>
    );
  }
}