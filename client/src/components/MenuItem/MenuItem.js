import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MenuItem.css';

class MenuItem extends Component {
  render() {
    return (
      <div className="container">
        <Link className="item" to={this.props.option.url}>{this.props.option.name}</Link>
      </div>
    );
  }
}

export default MenuItem;
