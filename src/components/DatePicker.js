import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import 'moment-timezone';
 
export default class SoloDatePicker extends Component {
  state = {
    date: new Date(),
  }
 
  onChange(date){
    this.setState({ date })
    //Updating Parents
    var dateMap = new Map();
    var myTimezone = "America/Toronto";
    var myDatetimeFormat= "YYYY-MM-DD";
    var myDatetimeString = moment(date).tz(myTimezone).format(myDatetimeFormat);

    dateMap.set('date', myDatetimeString)
    this.props.handlerFromParent(dateMap)
  }

  render() {
    return (
      <div>
        <DatePicker
          onChange={this.onChange.bind(this)}
          value={this.state.date}
        />
      </div>
    );
  }
}



