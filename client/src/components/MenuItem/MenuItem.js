import React, { Component } from 'react';
import './MenuItem.css';

class MenuItem extends Component {
  render() {
    return (
      <div className="container">
        <p className="item">{this.props.optionName}</p>
      </div>
    );
  }
}

export default MenuItem;
