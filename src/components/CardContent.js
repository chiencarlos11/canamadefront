import React from 'react'
import {LAURENT_ITEMS, ROLLER_SHADE_ITEMS} from '../context/Constants'

export default class CardContent extends React.Component {

  render() {

      let order_string = "";

    if (this.props.blind_type === 'Laurent'){
        for (let value of LAURENT_ITEMS) {
        order_string = order_string + value + ": " + this.props.body[value] + " "
      }
    }else if (this.props.blind_type === 'Roller Shade'){
          for (let value of ROLLER_SHADE_ITEMS) {
              order_string = order_string + value + ": " + this.props.body[value] + " "
            }
    }

    
    return (
      <div>
            {order_string}
            </div>
    )
  }
}
