import React from 'react';
import { Button, ModalFooter, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SoloDatePicker from './DatePicker.js';
import Fabric from './Fabric.js'
import {Consumer} from '../context/MyContext.js'

export default class LaurentForm extends React.Component {
  constructor(){
    super();
    this.handleData = this.handleData.bind(this);
    this.state = {
      date: Date.now(),
      po_number: '',
      original_width: '',
      original_height: '',
      control_size: '24',
      cassette_orientation: '',
      cassette_extra: '',
      cassette_color: '',
      fabric_type: 'Laurent',
      fabric_color: '301',
    };

    this.prepare_order = this.prepare_order.bind(this);

  }

  handleData(dateMap) {
    for (const [key, value] of dateMap.entries()) {
      var newState = {};
      newState[key] = value;
      this.setState(newState);
    }

  }

  handleDataPiece(event){
    var itemMap = new Map();
    itemMap.set(event.target.name, event.target.value)
    this.handleData(itemMap)
  }

  prepare_order(){

    var order_string = '';

    order_string = "Po Number: " + this.state.po_number + " OW: " + this.state.original_width + " OH: " + this.state.original_height + " CZ: " + this.state.control_size +
                    " CO: " + this.state.cassette_orientation + " CE: " + this.state.cassette_extra + " CC: " + this.state.cassette_color + " FT: " + this.state.fabric_type + " " + this.state.fabric_color;

    return order_string;

  }


  render() {
    return (
      <div>
      <Form>
        <FormGroup>
          <Label >Date</Label>
          <SoloDatePicker handlerFromParent={this.handleData}/>
        </FormGroup>
        <FormGroup>
          <Label>PO Number</Label>
          <Input type="text" name="po_number" id="po_number" placeholder="" value={this.state.po_number} onChange={this.handleDataPiece.bind(this)}/>
        </FormGroup>
        <FormGroup>
          <Label>Original Width</Label>
          <Input type="number" name="original_width" id="original_width" placeholder="" value={this.state.original_width} onChange={this.handleDataPiece.bind(this)}/>
        </FormGroup>
        <FormGroup>
          <Label>Original Height</Label>
          <Input type="number" name="original_height" id="original_height" placeholder="" value={this.state.original_height} onChange={this.handleDataPiece.bind(this)}/>
        </FormGroup>
        <FormGroup>
          <Label>Control</Label>
          <Input type="select" name="control_size" id="control_size" onChange={this.handleDataPiece.bind(this)}>
            <option value='24'>24</option>
            <option value='36'>36</option>
            <option value='48'>48</option>
            <option value='60'>60</option>
            <option value='72'>72</option>
            <option value='84'>84</option>
            <option value='96'>96</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <legend>Cassette</legend>
          <Container>
            <Row>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="cassette_orientation" value = 'Left' onChange={this.handleDataPiece.bind(this)}/>{' '}
                    Left
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="cassette_orientation" value='Right' onChange={this.handleDataPiece.bind(this)}/>{' '}
                    Right
                  </Label>
                </FormGroup>
                </Col>
                <Col>
                <FormGroup check>
                <Label check>
                  <Input type="radio" name="cassette_extra" value= 'Court' onChange={this.handleDataPiece.bind(this)}/>{' '}
                  Court
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="cassette_extra" value='Trim' onChange={this.handleDataPiece.bind(this)}/>{' '}
                  Trim
                </Label>
              </FormGroup>
              </Col>
              <Col>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="cassette_color" value='White' onChange={this.handleDataPiece.bind(this)}/>{' '}
                  White
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="cassette_color" value='Silver' onChange={this.handleDataPiece.bind(this)}/>{' '}
                  Silver
                </Label>
              </FormGroup>
              </Col>
            </Row>
          </Container>
          </FormGroup>
          <Fabric handlerFromParent={this.handleData} />
      </Form>
      <p>{this.state.date}</p>
      <p>{this.state.po_number}</p>
      <p>{this.state.original_width}</p>
      <p>{this.state.original_height}</p>
      <p>{this.state.control_size}</p>
      <p>{this.state.cassette_orientation}</p>
      <p>{this.state.cassette_extra}</p>
      <p>{this.state.cassette_color}</p>
      <p>{this.state.fabric_type}</p>
      <p>{this.state.fabric_color}</p>

      <ModalFooter>
      <Consumer>
        {context => {

          const {actions } = context;

          return (
          <React.Fragment>
            <Button onClick={ () => {actions.add_order(this.prepare_order())}}>Submit</Button>
          </React.Fragment>
          )
          }
        }
        </Consumer>

        <Button color="secondary" onClick={this.props.toggleModal}>Cancel</Button>
      </ModalFooter>
      
      </div>
    );
  }
}