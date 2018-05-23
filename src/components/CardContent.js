import React from 'react'
import {Container, Row, Col } from 'reactstrap';
import moment from 'moment';
import 'moment-timezone';
var Fraction = require('fraction.js');

export default class CardContent extends React.Component {


  compute_fraction(value){

    let frac = value%1;
    var x = new Fraction(frac);
    var res = x.toFraction(true);
    if ('' + res === '0'){
      return Math.trunc(value)
    }
    else{
      return Math.trunc(value) + " " + res
    }

  }

  render() {
    let myDatetimeFormat= "YYYY-MM-DD";
    var myTimezone = "America/Toronto";
    let date_string = moment(this.props.body['date']).tz(myTimezone).format(myDatetimeFormat);


     var curr_original_width_fraction = ('' + this.props.body['original_width_fraction'] !== "0" ? this.props.body['original_width_fraction'] : "");
     var curr_original_height_fraction = ('' + this.props.body['original_height_fraction'] !== "0" ? this.props.body['original_height_fraction'] : "");

    
    return (
      <div>
        <div className="CardContent">
          <Container fluid>
          <Row>
            <Col sm="12" md={{ size: 8, offset: 4 }}>
              <b>{this.props.blind_type}</b>
            </Col>
          </Row>
          <Row>
              <Col>
                Original: <b>{this.props.body['original_width']} {curr_original_width_fraction} x {this.props.body['original_height']} {curr_original_height_fraction}</b>
              </Col>
          </Row>
            <Row>
                <Col>
                  PO#: <b>{this.props.body['po_number']}</b>  
                </Col>
                <Col>
                  Date: <b>{date_string}</b>  
                </Col>
            </Row>
          <Row>
            <Col xs="auto">
              CAS: <b>{this.compute_fraction(this.props.body['cassette_size'])}</b>
            </Col>
            <Col xs="auto">
              Tube: <b>{this.compute_fraction(this.props.body['tube_tob'])}</b>
            </Col>
            <Col xs="auto">
              Height: <b>{this.compute_fraction(this.props.body['height'])}</b>       
            </Col>
            
            
          </Row>
          <Row>
            <Col xs="auto">
              inner: <b>{this.compute_fraction(this.props.body['inner'])}</b>
            </Col>
            <Col xs="auto">
              outer: <b>{this.compute_fraction(this.props.body['outer'])}</b>
            </Col>
            <Col xs="8">
              Color: <b>{this.props.body['fabric_type']} {this.props.body['fabric_color']} {this.props.body['cassette_color']} </b>
            </Col>
          </Row>
          <Row>
            <Col>
              Control: <b>{this.props.body['cassette_orientation']}</b>
            </Col>
            <Col>
              HH: <b>{this.props.body['control_size']}</b>
            </Col>
            <Col>
              <b>{this.props.body['cassette_extra']}</b>
            </Col>   
          </Row>
          </Container>
        </div>
      </div>
      )
  }
}
