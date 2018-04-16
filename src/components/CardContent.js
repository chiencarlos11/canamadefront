import React from 'react'
import {LAURENT_ITEMS, ROLLER_SHADE_ITEMS, CANAMADE_ITEMS} from '../context/Constants'
import moment from 'moment';
import 'moment-timezone';

export default class CardContent extends React.Component {

  render() {

    let order_string = "";
    let myDatetimeFormat= "YYYY-MM-DD";
    var myTimezone = "America/Toronto";

    if (this.props.blind_type === 'Laurent'){
      for (let value of LAURENT_ITEMS) {

        if (value === 'date'){
          let myDatetimeFormat= "YYYY-MM-DD";
    
          let mydatevariable = moment(this.props.body[value]).tz(myTimezone).format(myDatetimeFormat);
          order_string = order_string + value + ": " + mydatevariable + " "
          
        }else{
          order_string = order_string + value + ": " + this.props.body[value] + " "
        }

        
      }
    }else if (this.props.blind_type === 'Roller Shades'){
      for (let value of ROLLER_SHADE_ITEMS) {
        if (value === 'date'){
          let mydatevariable = moment(this.props.body[value]).tz(myTimezone).format(myDatetimeFormat);
          order_string = order_string + value + ": " + mydatevariable + " "
          
        }else{
          order_string = order_string + value + ": " + this.props.body[value] + " "
        }
      }
    }else if (this.props.blind_type === 'CanaMade'){
      for (let value of CANAMADE_ITEMS) {
        if (value === 'date'){
          let mydatevariable = moment(this.props.body[value]).tz(myTimezone).format(myDatetimeFormat);
          order_string = order_string + value + ": " + mydatevariable + " "
          
        }else{
          order_string = order_string + value + ": " + this.props.body[value] + " "
        }
      }
    }

    
    return (
      <div>
      {order_string}
      </div>
      )
  }
}
