import React from 'react';
import { Button, ModalFooter, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SoloDatePicker from './DatePicker.js';
import Fabric from './Fabric.js'
import {Consumer} from '../context/MyContext.js'
var math = require('mathjs');
var Fraction = require('fraction.js');

export default class LaurentForm extends React.Component {
  constructor(props){
    super(props);
    this.handleData = this.handleData.bind(this);
    this.state = {
      date: Date.now(),
      po_number: '',
      original_width: '',
      original_height: '',
      control_size: '',
      cassette_orientation: '',
      cassette_extra: '',
      cassette_color: '',
      fabric_type: '',
      fabric_color: '',
      cassette_size: '',
      tube_tob: '',
      inner: '',
      outer: '',
      height: '',
    };

    this.prepare_order = this.prepare_order.bind(this);

  }

  componentDidMount(){
      
    this.setState({
      date: Date.now(),
      po_number: this.props.initial_state.po_number,
      original_width: this.props.initial_state.original_width,
      original_height: this.props.initial_state.original_height,
      control_size: this.props.initial_state.control_size,
      cassette_orientation: this.props.initial_state.cassette_orientation,
      cassette_extra: '',
      cassette_color: '',
      fabric_type: this.props.initial_state.fabric_type,
      fabric_color: this.props.initial_state.fabric_color,
      cassette_size: '',
      tube_tob: '',
      inner: '',
      outer: '',
      height: '',
    });
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
    if (event.target.name === 'original_width'){
      let new_cassette_size = math.fraction(event.target.value - (3/8));
      this.setState({cassette_size: new_cassette_size});
      let new_tube_tob = math.fraction(new_cassette_size - 1);
      this.setState({tube_tob: new_tube_tob});
      let new_inner = math.fraction(new_tube_tob - (1/4));
      this.setState({inner: new_inner});
      let new_outer = math.fraction(new_tube_tob + (1/8));
      this.setState({outer: new_outer});

    }

  }

  compute_fraction(value){

    let frac = value%1;
    var x = new Fraction(frac);
    var res = x.toFraction(true); 

    return Math.trunc(value) + " " + res
  }

  compute_height(){
    let new_height = 0;
    let original_height = this.state['original_height'];

    let fabric_type = this.state.fabric_type;
    if (fabric_type === 'Laurent' || fabric_type === 'Husky' || fabric_type === 'Galaxy'){
      new_height = math.number(original_height) + (3 + (7/8)); 
      this.setState({height: new_height});
    }
    if (fabric_type === 'Timber' || fabric_type === 'Scotby' || fabric_type === 'Morgan'){
      new_height = original_height + ( 4 + (1/8));
      this.setState({height: new_height});
    }
    if (fabric_type === 'Richmond'){
      new_height = original_height + ( 4 + (1/2));
      this.setState({height: new_height});
    }

    return new_height;
  }

  prepare_order(){

    let new_height = this.compute_height()
    let order_name = 'Laurent';
    let curr_order = Object.assign(this.state, { new_height: new_height});
    let laurent_object = { name: order_name, body: curr_order, modal:this.props.toggleModal}
    return laurent_object;

  }

  action_order(actions){
    let new_height = this.compute_height()
    if (this.props.edit_action){
      let order_name = 'Laurent';
      let curr_order = Object.assign(this.state, { new_height: new_height });
      let laurent_object = { name: order_name, body: curr_order, modal: this.props.toggleModal }
      actions.update_order(this.props.index, laurent_object)
    }else{
      actions.add_order(this.prepare_order())
    }
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

      <ModalFooter>
      <Consumer>
        {context => {

          const {actions} = context;

          return (
          <React.Fragment>
            <Button onClick={ () => {this.action_order(actions)}}>Submit</Button>
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