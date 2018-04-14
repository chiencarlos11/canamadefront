import React from 'react';

import '../normalize.css'
import '../set1.css'

export default class HoverImg extends React.Component {

  render() {
    return (
      <div className="content" >
        <div className="grid">
          <figure className="effect-chico">
            <img src={this.props.img} alt=""/>
            <figcaption>
              <div>
                <h2><span>{this.props.name}</span></h2>
                <p>{this.props.description}</p>
              </div>
            </figcaption>     
          </figure>
        </div>
      </div>

    );
  }
}