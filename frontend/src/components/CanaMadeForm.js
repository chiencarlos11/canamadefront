import React from 'react';
import { Button, ModalFooter, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SoloDatePicker from './DatePicker.js';
import {CANAMADE_ITEMS_FABRIC} from '../context/Constants'
import Fabric from './CanaMadeFabric.js'
import {Consumer} from '../context/MyContext.js'
var math = require('mathjs');
var Fraction = require('fraction.js');


export default class CanaMadeForm extends React.Component {
  constructor(props){
    super(props);
    this.handleData = this.handleData.bind(this);
    this.state = {
      date: new Date(),
      po_number: '',
      original_width: 0,
      original_height: 0,
      original_width_fraction: 0,
      original_height_fraction: 0,
      control_size: '',
      cassette_orientation: '',
      cassette_extra: '',
      cassette_color: '',
      fabric_type: 'Light Filtering',
      fabric_color: '0101',
      cassette_size: '',
      tube_tob: '',
      height: '',
    };

    this.prepare_order = this.prepare_order.bind(this);

  }

  componentDidMount(){
    
    if (this.props.initial_state){
      this.setState({
        date: this.props.initial_state.date,
        po_number: this.props.initial_state.po_number,
        original_width: this.props.initial_state.original_width,
        original_height: this.props.initial_state.original_height,
        original_width_fraction: this.props.initial_state.original_width_fraction,
        original_height_fraction: this.props.initial_state.original_height_fraction,
        control_size: this.props.initial_state.control_size,
        cassette_orientation: this.props.initial_state.cassette_orientation,
        cassette_extra: this.props.initial_state.cassette_extra,
        cassette_color: this.props.initial_state.cassette_color,
        fabric_type: this.props.initial_state.fabric_type,
        fabric_color: this.props.initial_state.fabric_color,
        cassette_size: '',
        tube_tob: '',
        height: '',
      });
    }
  }
  
  handleData(dateMap) {
    for (const [key, value] of dateMap.entries()) {
      var newState = {};
      newState[key] = value;
      this.setState(newState);
    }

  }

  handleDateData(dateData) {
    this.setState({date:dateData});

  }

  parse_fraction(string_fraction){

    let result = 0;

    if (string_fraction){
      var split = string_fraction.split('/');
      result = parseInt(split[0], 10) / parseInt(split[1], 10);
    }

    return result;
    
  }

  handleDataPiece(event){
    var itemMap = new Map();
    itemMap.set(event.target.name, event.target.value)
    this.handleData(itemMap)
    if (event.target.name === 'original_width'){
      let original_width_fraction_fraction = math.fraction(this.state.original_width_fraction)
      let new_cassette_size = math.fraction((event.target.value + original_width_fraction_fraction) - (3/8));
      this.setState({cassette_size: new_cassette_size});
      let new_tube_tob = math.fraction(new_cassette_size - 1);
      this.setState({tube_tob: new_tube_tob});

    } else if(event.target.name === 'original_width_fraction'){
      console.log("Setting original_width_fraction = " + event.target.value)
      let original_width = math.fraction(this.state.original_width)
      let original_width_fraction_fraction = math.fraction(this.parse_fraction(event.target.value))
      let new_cassette_size = math.fraction((original_width + original_width_fraction_fraction) - (3/8));
      this.setState({cassette_size: new_cassette_size});
      let new_tube_tob = math.fraction(new_cassette_size - 1);
      this.setState({tube_tob: new_tube_tob});
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
    let original_height_fraction = this.state['original_height_fraction'];
    console.log("original_height_fraction = " + original_height_fraction)
    console.log("original_height_fraction  math = " + math.number(this.parse_fraction(original_height_fraction)))
    new_height = math.number(original_height) + math.number(this.parse_fraction(original_height_fraction)) + 10; 
    this.setState({height: new_height});
    return new_height;
  }

  prepare_order(){

    let new_height = this.compute_height()
    let order_name = 'CanaMade';
    let curr_order = Object.assign(this.state, { height: this.compute_fraction(new_height)});
    curr_order['cassette_size'] = this.compute_fraction(curr_order['cassette_size'])
    curr_order['tube_tob'] = this.compute_fraction(curr_order['tube_tob'])


    let laurent_object = { name: order_name, body: curr_order, modal:this.props.toggleModal}
    return laurent_object;

  }

  action_order(actions){
    if (this.props.edit_action){
      actions.update_order(this.props.index, this.prepare_order())
    }else{
      actions.add_order(this.prepare_order())
    }
  }

  render() {
    return (
      <div>
      <Form>
        <FormGroup>
          <Label>PO Number</Label>
          <Input type="text" name="po_number" id="po_number" placeholder="" value={this.state.po_number} onChange={this.handleDataPiece.bind(this)}/>
        </FormGroup>
        <Container>
        <Row>
        <Col>
        <Label>Original Width</Label>
        </Col>
        <Col>
          <FormGroup>
            <Input type="number" name="original_width" id="original_width" placeholder="" value={this.state.original_width} onChange={this.handleDataPiece.bind(this)}/>
          </FormGroup>
        </Col>
        <Col>
          <Input value={this.state.original_width_fraction} type="select" name="original_width_fraction" id="original_width_fraction" onChange={this.handleDataPiece.bind(this)}>
            <option value='0'>0"</option>
            <option value='1/8'>1/8"</option>
            <option value='1/4'>1/4"</option>
            <option value='3/8'>3/8"</option>
            <option value='1/2'>1/2"</option>
            <option value='5/8'>5/8"</option>
            <option value='3/4'>3/4"</option>
            <option value='7/8'>7/8"</option>
          </Input>
        </Col>
        </Row>
        </Container>
        <Container>
        <Row>
        <Col>
        <Label>Original Height</Label>
         </Col>
        <Col>
        <FormGroup>
          <Input type="number" name="original_height" id="original_height" placeholder="" value={this.state.original_height} onChange={this.handleDataPiece.bind(this)}/>
        </FormGroup>
        </Col>
        <Col>
          <Input value={this.state.original_height_fraction} type="select" name="original_height_fraction" id="original_height_fraction" onChange={this.handleDataPiece.bind(this)}>
            <option value='0'>0"</option>
            <option value='1/8'>1/8"</option>
            <option value='1/4'>1/4"</option>
            <option value='3/8'>3/8"</option>
            <option value='1/2'>1/2"</option>
            <option value='5/8'>5/8"</option>
            <option value='3/4'>3/4"</option>
            <option value='7/8'>7/8"</option>
          </Input>
        </Col>
        </Row>
        </Container>
        <FormGroup>
          <Label>Control</Label>
          <Input value={this.state.control_size} type="select" name="control_size" id="control_size" onChange={this.handleDataPiece.bind(this)}>
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
                    <Input checked={this.state.cassette_orientation === 'Left'} type="radio" name="cassette_orientation" value = 'Left' onChange={this.handleDataPiece.bind(this)}/>{' '}
                    Left
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input checked={this.state.cassette_orientation === 'Right'} type="radio" name="cassette_orientation" value='Right' onChange={this.handleDataPiece.bind(this)}/>{' '}
                    Right
                  </Label>
                </FormGroup>
                </Col>
                <Col>
                <FormGroup check>
                <Label check>
                  <Input checked={this.state.cassette_extra === 'Court'} type="radio" name="cassette_extra" value= 'Court' onChange={this.handleDataPiece.bind(this)}/>{' '}
                  Court
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input checked={this.state.cassette_extra === 'Trim'} type="radio" name="cassette_extra" value='Trim' onChange={this.handleDataPiece.bind(this)}/>{' '}
                  Trim
                </Label>
              </FormGroup>
              </Col>
              <Col>
              <FormGroup check>
                <Label check>
                  <Input checked={this.state.cassette_color === 'White'} type="radio" name="cassette_color" value='White' onChange={this.handleDataPiece.bind(this)}/>{' '}
                  White
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input checked={this.state.cassette_color === 'Silver'} type="radio" name="cassette_color" value='Silver' onChange={this.handleDataPiece.bind(this)}/>{' '}
                  Silver
                </Label>
              </FormGroup>
              </Col>
            </Row>
          </Container>
          </FormGroup>
          <Fabric fabric_dict={CANAMADE_ITEMS_FABRIC} fabric_type={this.state.fabric_type} fabric_color={this.state.fabric_color} handlerFromParent={this.handleData} />
          <FormGroup>
          <Label >Date</Label>
          <SoloDatePicker date={this.state.date} handlerFromParent={this.handleDateData.bind(this)}/>
        </FormGroup>
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