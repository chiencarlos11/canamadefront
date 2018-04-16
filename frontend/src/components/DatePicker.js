import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
 
export default class SoloDatePicker extends Component {
  constructor(){
    super();
    this.state = {
      date: new Date(),
    }
  }

  static getDerivedStateFromProps(props, state){
    if (props.date !== state.date){
      return{date: props.date};
    }
    return null;
  }
    
  
  onChange(date){
    this.setState({ date: date })
    //Updating Parents
    this.props.handlerFromParent(date)
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



