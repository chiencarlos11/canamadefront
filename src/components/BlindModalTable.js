import React from 'react';
import {Table,Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Button, ModalFooter } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {Consumer} from '../context/MyContext.js'
import {handleCanaMadeDataPiece, handleCanaMadeheight, CANAMADE_ITEMS_FABRIC, ROLLER_SHADE_ITEMS_FABRIC} from '../context/Constants'
import {LAURENT_ITEMS_FABRIC, handleLaurentDataPiece, handleLaurentheight} from '../context/Constants'
import {CONTROL_SIZE, FRACTIONS} from '../context/Constants'
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

    this.toggleCaso = this.toggleCaso.bind(this);
    this.toggleCase = this.toggleCase.bind(this);
    this.toggleCasc = this.toggleCasc.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleColor = this.toggleColor.bind(this);

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

  render() {

    console.log("fabric color = " + JSON.stringify(this.state.color_selection))
    
    let drop_options = this.fabric.map(fa => (  <DropdownItem key={fa} value={fa} >{fa}</DropdownItem> ));

    let color_drop_options = this.state.color_selection.map(fa => (  <DropdownItem key={fa} value={fa} >{fa}</DropdownItem> ));

    return (
      <React.Fragment>
      <td>
      <Dropdown isOpen={this.state.caso_dropdownOpen} toggle={this.toggleCaso}  >
        <DropdownToggle caret>
          {this.state.cassette_orientation}
        </DropdownToggle>
        <DropdownMenu>
            <DropdownItem value='Left' >Left</DropdownItem>
            <DropdownItem value='Right' >Right</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </td>

      <td>
      <Dropdown isOpen={this.state.case_dropdownOpen} toggle={this.toggleCase}  >
        <DropdownToggle caret>
          {this.state.cassette_extra}
        </DropdownToggle>
        <DropdownMenu>
            <DropdownItem value='Cord' >Cord</DropdownItem>
            <DropdownItem value='Chain' >Chain</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </td>

      <td>
      <Dropdown isOpen={this.state.casc_dropdownOpen} toggle={this.toggleCasc}  >
        <DropdownToggle caret>
          {this.state.cassette_color}
        </DropdownToggle>
        <DropdownMenu>
            <DropdownItem value='White' >White</DropdownItem>
            <DropdownItem value='Silver' >Silver</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </td>


      <td>
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}  >
        <DropdownToggle caret>
          {this.state.selected_fabric}
        </DropdownToggle>
        <DropdownMenu>
          {drop_options}
        </DropdownMenu>
      </Dropdown>
      </td>

      <td>
      <Dropdown isOpen={this.state.colordropdownOpen} toggle={this.toggleColor} >
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

    this.state = {
      date: new moment()
    };
  }

  handleDateData(dateData) {
    console.log("Starting HandleData")
  }

  render(){

    let label_id = math.number(this.props.id) + 1

    return(
      <tr>
            <th scope="row">{label_id}</th>
            <th scope="row">{this.props.name}</th>
            <td><Input type="text" name="PO Number" id="id" placeholder={this.props.body['po_number']} /></td>
            <td><Input type="text" name="original_width" id="id" placeholder={this.props.body['original_width']} /></td>
            <td><Input type="text" name="original_height" id="id" placeholder={this.props.body['original_height']} /></td>

            <FabricDrop name={this.props.name} />
            <td><DatePicker selected={this.state.date} onChange={this.handleDateData} /></td>
      </tr>
    )};

}


export default class BlindModalTable extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      value: 'Select'
    };

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

  render(){

    return(
      <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Blind</th>
            <th>PO Number</th>
            <th>Original Width</th>
            <th>Original Height</th>
            <th>Control</th>
            <th>Cas L/R</th>
            <th>Cas Cord/Chain</th>
            <th>Cas Silver/White</th>
            <th>Fabric</th>
            <th>Fabric Color</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <Consumer>
      {context => {
        
        const {state} = context;
        
        return (
          <React.Fragment>
          {state['orders'].map(function(item, i){
            
            return(
                <BlindRow name={item['name']} key={i} id={i} body={item['body']}/>
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
        <Dropdown className="mr-auto" isOpen={this.state.dropdownOpen} toggle={this.toggle} >
          <DropdownToggle color="danger" caret>
            New Order
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem value='Laurent' >Laurent</DropdownItem>
            <DropdownItem value='Roller Shades' >Roller Shades</DropdownItem>
            <DropdownItem value='CanaMade Shades' >CanaMade Shades</DropdownItem>
            <DropdownItem value='Vertical' >Vertical</DropdownItem>
            <DropdownItem value='Cellular' >Cellular</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button color="secondary" onClick={this.props.toggleModal} >Cancel</Button>
      </ModalFooter>
      </div>

      )
  }

}

