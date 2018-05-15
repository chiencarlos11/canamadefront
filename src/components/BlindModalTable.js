import React from 'react';
import {Table,Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Button, ModalFooter, Container, Row, Col, Label } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {Consumer} from '../context/MyContext.js'
import {handleCanaMadeDataPiece, handleCanaMadeheight, CANAMADE_ITEMS_FABRIC, ROLLER_SHADE_ITEMS_FABRIC} from '../context/Constants'
import {LAURENT_ITEMS_FABRIC, handleLaurentDataPiece, handleLaurentheight} from '../context/Constants'
import {CONTROL_SIZE, FRACTIONS} from '../context/Constants'
import '../blindtable.css';
import '../date.css'
var math = require('mathjs');

class FabricDrop extends React.Component {
  constructor(props) {
    super(props);

    
    this.fabric = {}
    this.dict = {}
    switch (this.props.name) {

      case 'Laurent':
        this.dict = LAURENT_ITEMS_FABRIC
        this.fabric = Object.keys(LAURENT_ITEMS_FABRIC)
        this.fabric_color= LAURENT_ITEMS_FABRIC[this.fabric[0]]
        break;
      case'Roller Shades':
        this.dict = ROLLER_SHADE_ITEMS_FABRIC
        this.fabric = Object.keys(ROLLER_SHADE_ITEMS_FABRIC)
        this.fabric_color= ROLLER_SHADE_ITEMS_FABRIC[this.fabric[0]]
        break;
      case'CanaMade':
        this.dict = CANAMADE_ITEMS_FABRIC
        this.fabric = Object.keys(CANAMADE_ITEMS_FABRIC)
        this.fabric_color= CANAMADE_ITEMS_FABRIC[this.fabric[0]]
        break;
      default:
        this.fabric = {}
        break;

    }

    this.state = {
      caso_dropdownOpen: false,
      dropdownOpen: false,
      colordropdownOpen: false,
      controldropdownOpen: false,
      date: new Date(),
      po_number: '',
      original_width: 0,
      original_height: 0,
      original_width_fraction: FRACTIONS[0],
      original_height_fraction: FRACTIONS[0],
      control_size: CONTROL_SIZE[0],
      cassette_orientation: 'Left',
      cassette_extra: 'Cord',
      cassette_color: 'White',
      selected_fabric: this.fabric[0],
      selected_fabric_color: this.fabric_color[0],
      cassette_size: '',
      tube_tob: '',
      inner: '',
      outer: '',
      height: '',
      color_selection: [...this.fabric_color],
    };

    this.toggleControl = this.toggleControl.bind(this);
    this.toggleCaso = this.toggleCaso.bind(this);
    this.toggleCase = this.toggleCase.bind(this);
    this.toggleCasc = this.toggleCasc.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleColor = this.toggleColor.bind(this);
    this.update_order = this.update_order.bind(this);

  }

  componentDidMount(){
    
    if (this.props.body){
      this.setState({
        // date: this.props.body.date,
        po_number: this.props.body.po_number,
        original_width: this.props.body.original_width,
        original_height: this.props.body.original_height,
        original_width_fraction: this.props.body.original_width_fraction,
        original_height_fraction: this.props.body.original_height_fraction,
        control_size: this.props.body.control_size,
        cassette_orientation: this.props.body.cassette_orientation,
        cassette_extra: this.props.body.cassette_extra,
        cassette_color: this.props.body.cassette_color,
        fabric_type: this.props.body.fabric_type,
        fabric_color: this.props.body.fabric_color,
        cassette_size: this.props.body.cassette_size,
        tube_tob: this.props.body.tube_tob,
        height: this.props.body.height,
        inner:this.props.body.inner,
        outer: this.props.body.outer,
      });
    }

    if (this.props.body.fabric_type){
      this.setState({
        selected_fabric: this.props.body.fabric_type,
        color_selection: [...this.props.body.color_dict[this.props.body.fabric_type]],
      })
    }

    if (this.props.body.fabric_color){
      this.setState({
        selected_fabric_color: this.props.body.fabric_color,
      })
    }


  }

  toggleCaso(e) {
    console.log("toggleCaso")
    this.setState({
      caso_dropdownOpen: !this.state.caso_dropdownOpen,
    });

    if (e.target.value){
      this.setState({
        cassette_orientation: e.target.value,
    });
    }

  }

  toggleControl(e) {
    console.log("toggleControl")
    this.setState({
      controldropdownOpen: !this.state.controldropdownOpen,
    });

    if (e.target.value){
      this.setState({
        control_size: e.target.value,
    });
    }

  }

  toggleCase(e) {
    console.log("toggleCase")
    this.setState({
      case_dropdownOpen: !this.state.case_dropdownOpen,
    });

    if (e.target.value){
      this.setState({
        cassette_extra: e.target.value,
    });
    }

  }

  toggleCasc(e) {
    console.log("toggleCasc")
    this.setState({
      casc_dropdownOpen: !this.state.casc_dropdownOpen,
    });

    if (e.target.value){
      this.setState({
        cassette_color: e.target.value,
    });
    }

  }

  toggle(e) {
    console.log("toggle")
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });

    if (e.target.value){
      this.setState({
      selected_fabric: e.target.value,
      color_selection: this.dict[e.target.value],
      selected_fabric_color: this.dict[e.target.value][0],
    });

      console.log("Choosing Fabric = " + e.target.value)
      //Updating Parents
      var fabricMap = new Map();
      fabricMap.set('fabric_type', e.target.value)
      fabricMap.set('fabric_color', this.props.body.color_dict[e.target.value][0])
      this.props.handleData(fabricMap)
    }

  }

  toggleColor(e) {
    console.log("toggleColor")
    this.setState({
      colordropdownOpen: !this.state.colordropdownOpen,
    });

    if (e.target.value){
      this.setState({
      selected_fabric_color: e.target.value
    });

    }
  }

  updatelabel(e){
    console.log("Setting new label = " + e.target.value)
    this.setState({
      selected_fabric: e.target.value
    });
  }

  update_order(index, order){

    this.props.update_order(index, order)
  }

  render() {
    
    let control_sizes = CONTROL_SIZE.map(fa => (  <DropdownItem name='control_size' onClick={this.props.updateDataPiece.bind(this)} key={fa} value={fa} >{fa}</DropdownItem> ));

    let drop_options = this.fabric.map(fa => (  <DropdownItem name='fabric_type' key={fa} value={fa} >{fa}</DropdownItem> ));

    let color_drop_options = this.state.color_selection.map(fa => (  <DropdownItem name='fabric_color' onClick={this.props.updateDataPiece.bind(this)} key={fa} value={fa} >{fa}</DropdownItem> ));

    return (
      <React.Fragment>

      <td>
      <Dropdown isOpen={this.state.controldropdownOpen} toggle={this.toggleControl} size="sm" >
        <DropdownToggle caret>
          {this.props.body.control_size}
        </DropdownToggle>
        <DropdownMenu>
          {control_sizes}
        </DropdownMenu>
      </Dropdown>
      </td>

      <td>
      <Dropdown isOpen={this.state.caso_dropdownOpen} toggle={this.toggleCaso} size="sm" >
        <DropdownToggle caret>
          {this.props.body.cassette_orientation}
        </DropdownToggle>
        <DropdownMenu>
            <DropdownItem name='cassette_orientation' onClick={this.props.updateDataPiece.bind(this)} value='Left' >Left</DropdownItem>
            <DropdownItem name='cassette_orientation' onClick={this.props.updateDataPiece.bind(this)} value='Right' >Right</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </td>

      <td>
      <Dropdown isOpen={this.state.case_dropdownOpen} toggle={this.toggleCase} size="sm" >
        <DropdownToggle caret>
          {this.props.body.cassette_extra}
        </DropdownToggle>
        <DropdownMenu>
            <DropdownItem name='cassette_extra' onClick={this.props.updateDataPiece.bind(this)} value='Cord' >Cord</DropdownItem>
            <DropdownItem name='cassette_extra' onClick={this.props.updateDataPiece.bind(this)} value='Chain' >Chain</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </td>

      <td>
      <Dropdown isOpen={this.state.casc_dropdownOpen} toggle={this.toggleCasc} size="sm" >
        <DropdownToggle caret>
          {this.props.body.cassette_color}
        </DropdownToggle>
        <DropdownMenu>
            <DropdownItem name='cassette_color' onClick={this.props.updateDataPiece.bind(this)} value='White' >White</DropdownItem>
            <DropdownItem name='cassette_color' onClick={this.props.updateDataPiece.bind(this)} value='Silver' >Silver</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </td>


      <td>
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} size="sm" >
        <DropdownToggle caret>
          {this.state.selected_fabric}
        </DropdownToggle>
        <DropdownMenu>
          {drop_options}
        </DropdownMenu>
      </Dropdown>
      </td>

      <td>
      <Dropdown isOpen={this.state.colordropdownOpen} toggle={this.toggleColor} size="sm" >
        <DropdownToggle caret>
          {this.state.selected_fabric_color}
        </DropdownToggle>
        <DropdownMenu>
          {color_drop_options}
        </DropdownMenu>
      </Dropdown>
      </td>
      </React.Fragment>
    );
  }
}

class BlindRow extends React.Component{

  constructor(props){
    super(props)

    this.fabric_keys = Object.keys(this.props.body.color_dict)

    this.state = {
      date: new moment(),
      original_width: 0,
      original_height: 0,
      original_width_fraction: FRACTIONS[0],
      original_height_fraction: FRACTIONS[0],
      control_size: CONTROL_SIZE[0],
      cassette_orientation: 'Left',
      cassette_extra: 'Cord',
      cassette_color: 'White',
      fabric_type: this.fabric_keys[0],
      fabric_color: this.props.body.color_dict[this.fabric_keys[0]][0],
      cassette_size: '',
      tube_tob: '',
      inner: '',
      outer: '',
      height: '',
      color_selection: [],
    };

  
  }

  componentDidMount(){
    
    if (this.props.body){
      this.setState({
        // date: this.props.body.date,
        po_number: this.props.body.po_number,
        original_width: this.props.body.original_width,
        original_height: this.props.body.original_height,
        original_width_fraction: this.props.body.original_width_fraction,
        original_height_fraction: this.props.body.original_height_fraction,
        control_size: this.props.body.control_size,
        cassette_orientation: this.props.body.cassette_orientation,
        cassette_extra: this.props.body.cassette_extra,
        cassette_color: this.props.body.cassette_color,
        fabric_type: this.props.body.fabric_type,
        fabric_color: this.props.body.fabric_color,
        cassette_size: this.props.body.cassette_size,
        tube_tob: this.props.body.tube_tob,
        height: this.props.body.height,
        inner:this.props.body.inner,
        outer: this.props.body.outer,
      });
    }
  }



  handleDateData(dateData) {
    console.log("Starting HandleData")
  }


  update_order(){
    console.log("Executing update_order")
    let mod_object = { name: this.props.name, body: this.props.body}
    this.props.actions.update_order_no_modal(this.props.id, mod_object)
  }

  handleData(dateMap) {
    for (const [key, value] of dateMap.entries()) {
      var newState = {};
      newState[key] = value;
      this.setState(newState);
      this.props.body[key] = value;
    }

  }

  handleDataPiece(event){
    console.log("Executing handleDataPiece")
    var itemMap = new Map();
    itemMap.set(event.target.name, event.target.value)
    this.handleData(itemMap)

    let result = this.props.body.handleaction(event.target.name, event.target.value, this.props.body)
    if (result){
      this.setState({cassette_size: result['cassette_size']});
      this.setState({tube_tob: result['tube_tob']});
      this.props.body.cassette_size = result['cassette_size']
      this.props.body.tube_tob = result['tube_tob']

      if(result['inner']){
        this.setState({inner: result['inner']});
        this.props.body.inner = result['inner']
      }
      if(result['outer']){
        this.setState({outer: result['outer']});
        this.props.body.outer = result['outer']
      }

    }

    this.compute_height();

  }


  compute_height(){
    let new_height = 0;
    let original_height = this.state['original_height'];
    let original_height_fraction = this.state['original_height_fraction'];
    let fabric_type = this.state['fabric_type'];


    console.log("current fabric_type = " + fabric_type)

    let new_result_height = this.props.body.calculateheight(original_height, original_height_fraction, fabric_type)

    if (new_result_height){
      this.setState({height: new_result_height});
      new_height = new_result_height
    }
    this.props.body.height = new_height;
    console.log("new_height = " + new_height)
  }


  render(){

    let label_id = math.number(this.props.id) + 1
    let FRACTION_OPTIONS = FRACTIONS.map(fa => (  <option key={fa} value={fa} >{fa}</option> ));

    return(
      <tr>
            <th scope="row"><Input type="checkbox" /></th>

            <th scope="row">{label_id}</th>
            <th scope="row">{this.props.name}</th>
            <td>
              <Container>
              <Row>
              <Col>
              <Input onBlur={this.update_order.bind(this)} onChange={this.handleDataPiece.bind(this)} type="number" name="original_width" placeholder={this.state.original_width} />
              </Col>
              <Col > 
              <Input defaultValue={this.props.body.original_width_fraction} type="select" name="original_width_fraction" onBlur={this.update_order.bind(this)} onChange={this.handleDataPiece.bind(this)} bsSize="sm">
                {FRACTION_OPTIONS}
              </Input>
              </Col>
              </Row>
              </Container>
            </td>
            <td>
            <Container>
              <Row>
              <Col>
                <Input onBlur={this.update_order.bind(this)} onChange={this.handleDataPiece.bind(this)} type="number" name="original_height" placeholder={this.state.original_height} />
                </Col>
                <Col> 
                <Input defaultValue={this.props.body.original_height_fraction} type="select" name="original_height_fraction" id="original_height_fraction" onChange={this.handleDataPiece.bind(this)} onBlur={this.update_order.bind(this)} bsSize="sm">
                {FRACTION_OPTIONS}
              </Input>
            </Col>
            </Row>
            </Container>
            </td>

            <FabricDrop onBlur={this.update_order.bind(this)} handleData={this.handleData.bind(this)} updateDataPiece={this.handleDataPiece.bind(this)} index={this.props.id} body={this.props.body} name={this.props.name} />
      </tr>
    )};

}


export default class BlindModalTable extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      value: 'Select',
    };

    // this.blindTypes = ['Laurent','Roller Shades','CanaMade','Vertical Blinds','Cellular Shades'];
    this.blindTypes = ['Laurent','Roller Shades','CanaMade'];

    this.handleDateChange = this.handleDateChange.bind(this);

  }

  toggle(e) {
    console.log("setting toggle")
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });

    if (e.target.value){
      this.setState({
      value: e.target.value
    });

    }

  }

  handleDateChange(date) {
    this.setState({
      date: date
    });


  }

  add_new_order(name, actions){
    console.log("Adding New Order")
    if (name){

      let blank_order = {
      caso_dropdownOpen: false,
      dropdownOpen: false,
      colordropdownOpen: false,
      date: new Date(),
      po_number: '',
      original_width: 0,
      original_height: 0,
      original_width_fraction: FRACTIONS[0],
      original_height_fraction: FRACTIONS[0],
      control_size: CONTROL_SIZE[0],
      cassette_orientation: 'Left',
      cassette_extra: 'Cord',
      cassette_color: 'White',
      cassette_size: '',
      tube_tob: '',
      inner: '',
      outer: '',
      height: '',
      color_selection: [],
    };

    if (name && name === 'Laurent'){
      blank_order['handleaction'] = handleLaurentDataPiece
      blank_order['calculateheight'] = handleLaurentheight
      blank_order['color_dict'] = LAURENT_ITEMS_FABRIC
    }

    if (name && name === 'Roller Shades'){
      blank_order['handleaction'] = handleCanaMadeDataPiece
      blank_order['calculateheight'] = handleCanaMadeheight
      blank_order['color_dict'] = ROLLER_SHADE_ITEMS_FABRIC
    }

    if (name && name === 'CanaMade'){
      blank_order['handleaction'] = handleCanaMadeDataPiece
      blank_order['calculateheight'] = handleCanaMadeheight
      blank_order['color_dict'] = CANAMADE_ITEMS_FABRIC
    }

    let fabric_keys = Object.keys(blank_order.color_dict)
    blank_order['fabric_type'] = fabric_keys[0];
    blank_order['fabric_color'] = blank_order.color_dict[fabric_keys[0]][0];

    let new_blank_order = Object.assign({}, blank_order)


      let new_order = { name: name, body: new_blank_order, modal:false}
      actions.add_order(new_order)
    }

  }

  handlePONumber(event){
    console.log("e value = " + JSON.stringify(event.target.value));

    // actions.update_ponumber(e.target.value)
  }


  render(){

    return(
      <div>

        <Consumer>
              {context => {

                  const {actions} = context;

                  return (

                  <Container className="blindtable">
                    <Row>
                      <Col xs="3">
                        <Label for="po_number"><b>PO Number</b></Label>
                        <Input placeholder={actions.get_ponumber()} onBlur={actions.update_ponumber.bind(this)} type="text" name="po_number" />
                      </Col>
                      <Col xs="3">
                        <Label for="date"><b>Date</b></Label>
                          <DatePicker className="datepicker"
                            selected={this.state.date}
                            onChange={this.handleDateChange}
                          />
                      </Col>
                    </Row>
                  </Container>

                  )
          }
        }
      </Consumer>

      <br/>


      <Table className="blindtable">
        <thead>
          <tr>
            <th className="text-center" ></th>
            <th className="text-center" >#</th>
            <th className="text-center">Blind</th>
            <th className="text-center" >Original Width</th>
            <th className="text-center" >Original Height</th>
            <th className="text-center">Control</th>
            <th className="text-center">L/R</th>
            <th className="text-center">Cord/Chain</th>
            <th className="text-center">Silver/White</th>
            <th className="text-center">Fabric</th>
            <th className="text-center">Fabric Color</th>
          </tr>
        </thead>
        <tbody>
          <Consumer>
      {context => {
        
        const {state, actions} = context;
        
        return (
          <React.Fragment>
          {state['orders'].map(function(item, i){
            
            return(
                <BlindRow actions={actions} name={item['name']} key={i} id={i} body={item['body']}/>
            )
            
          })}
          
          </React.Fragment>
        )
      }
    }
    </Consumer>
        </tbody>
      </Table>
      <ModalFooter>

      <Consumer>
        {context => {

          const {actions} = context;

          let blinds_options = this.blindTypes.map(fa => (  <DropdownItem onClick={() => {this.add_new_order(fa,actions)}} key={fa} value={fa} >{fa}</DropdownItem> ));

          return (
          <React.Fragment>
 
            <Dropdown className="mr-auto" isOpen={this.state.dropdownOpen} toggle={this.toggle.bind(this)} >
          <DropdownToggle color="danger" caret>
            New Order
          </DropdownToggle>
          <DropdownMenu>
            {blinds_options}
          </DropdownMenu>
        </Dropdown>



          </React.Fragment>
          )
          }
        }
      </Consumer>







        
        <Button color="secondary" onClick={this.props.toggleModal} >Cancel</Button>
      </ModalFooter>
      </div>

      )
  }

}

