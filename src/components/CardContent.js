import React from 'react'
import {LAURENT_ITEMS} from '../context/Constants'

export default class CardContent extends React.Component {

  render() {

      let order_string = "";
    for (var value of LAURENT_ITEMS) {
      order_string = order_string + value + ": " + this.props.body[value] + " "
    }

    return (
      <div>
            {order_string}
            </div>
    )
  }
}
