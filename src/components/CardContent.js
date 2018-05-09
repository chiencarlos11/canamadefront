import React from 'react'
import moment from 'moment';
import 'moment-timezone';
var Fraction = require('fraction.js');

export default class CardContent extends React.Component {


  compute_fraction(value){

    let frac = value%1;
    var x = new Fraction(frac);
    var res = x.toFraction(true);
    return Math.trunc(value) + " " + res
  }

  render() {
    let myDatetimeFormat= "YYYY-MM-DD";
    var myTimezone = "America/Toronto";
    let date_string = moment(this.props.body['date']).tz(myTimezone).format(myDatetimeFormat);

    
    return (
      <div className="CardContent">
        <center><b>{this.props.blind_type}</b></center>
        PO Number: <b>{this.props.body['po_number']}</b>  Date: <b>{date_string}</b> <br/>  
        Height: <b>{this.compute_fraction(this.props.body['height'])}</b>   Tube: <b>{this.compute_fraction(this.props.body['tube_tob'])}</b>  inner: <b>{this.compute_fraction(this.props.body['inner'])}</b>  outer: <b>{this.compute_fraction(this.props.body['outer'])}</b> <br/> 
        CAS: <b>{this.compute_fraction(this.props.body['cassette_size'])}</b> Color: <b>{this.props.body['fabric_type']} {this.props.body['fabric_color']} {this.props.body['cassette_color']} </b>  Control: <b>{this.props.body['cassette_orientation']}</b>
      </div>
      )
  }
}
