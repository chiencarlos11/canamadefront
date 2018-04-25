import React from 'react';
import { Button, ModalFooter, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SoloDatePicker from './DatePicker.js';
import {CONTROL_SIZE, FRACTIONS} from '../context/Constants'
import Fabric from './CanaMadeFabric.js'
import {Consumer} from '../context/MyContext.js'

export default class CanaMadeForm extends React.Component {
  constructor(props){
    super(props);
    this.handleData = this.handleData.bind(this);

    this.formtype = this.props.formtype

    this.fabric_keys = Object.keys(this.props.constantform)

    this.state = {
      date: new Date(),
      po_number: '',
      original_width: 0,
      original_height: 0,
      original_width_fraction: FRACTIONS[0],
      original_height_fraction: FRACTIONS[0],
      control_size: CONTROL_SIZE[0],
      cassette_orientation: 'Left',
      cassette_extra: 'Court',
      cassette_color: 'White',
      fabric_type: this.fabric_keys[0],
      fabric_color: this.props.constantform[this.fabric_keys[0]][0],
      cassette_size: '',
      tube_tob: '',
      inner: '',
      outer: '',
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
        cassette_size: this.props.initial_state.cassette_size,
        tube_tob: this.props.initial_state.tube_tob,
        height: this.props.initial_state.height,
        inner:this.props.initial_state.inner,
        outer: this.props.initial_state.outer,
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

    if (string_fraction && string_fraction !== '0'){
      var split = string_fraction.split('/');
      result = parseInt(split[0], 10) / parseInt(split[1], 10);
    }

    return result;
    
  }

  handleDataPiece(event){

    var itemMap = new Map();
    itemMap.set(event.target.name, event.target.value)
    this.handleData(itemMap)

    let result = this.props.handleaction(event.target.name, event.target.value, this.state)
    if (result){
      this.setState({cassette_size: result['cassette_size']});
      this.setState({tube_tob: result['tube_tob']});

      if(result['inner']){
        this.setState({inner: result['inner']});
      }
      if(result['outer']){
        this.setState({outer: result['outer']});
      }

    }
  }


  compute_height(){
    let new_height = 0;
    let original_height = this.state['original_height'];
    let original_height_fraction = this.state['original_height_fraction'];
    let fabric_type = this.state['fabric_type'];

    let new_result_height = this.props.calculateheight(original_height, original_height_fraction, fabric_type)

    if (new_result_height){
      this.setState({height: new_result_height});
      new_height = new_result_height
    }
    
    return new_height;
  }

  prepare_order(){

    let new_height = this.compute_height()
    let order_name = this.formtype;
    let curr_order = Object.assign(this.state, { height: new_height});

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

    let FRACTION_OPTIONS = FRACTIONS.map(fa => (  <option key={fa} value={fa} >{fa}</option> ));
    let CONTROL_SIZE_OPTIONS = CONTROL_SIZE.map(fa => (  <option key={fa} value={fa} >{fa}</option> ));

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
            {FRACTION_OPTIONS}
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
            {FRACTION_OPTIONS}
          </Input>
        </Col>
        </Row>
        </Container>
        <FormGroup>
          <Label>Control</Label>
          <Input value={this.state.control_size} type="select" name="control_size" id="control_size" onChange={this.handleDataPiece.bind(this)}>
            {CONTROL_SIZE_OPTIONS}
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
                  <Input checked={this.state.cassette_extra === 'Court'} type="radio" name="cassette_extra" value= 'Cord' onChange={this.handleDataPiece.bind(this)}/>{' '}
                  Cord
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input checked={this.state.cassette_extra === 'Trim'} type="radio" name="cassette_extra" value='Chain' onChange={this.handleDataPiece.bind(this)}/>{' '}
                  Chain
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
          <Fabric fabric_dict={this.props.constantform} fabric_type={this.state.fabric_type} fabric_color={this.state.fabric_color} handlerFromParent={this.handleData} />
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