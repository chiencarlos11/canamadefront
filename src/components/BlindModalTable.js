import React from 'react';
import {Table,Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Button } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {Consumer} from '../context/MyContext.js'

class ExampleDrop extends React.Component {
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

  updatelabel(e){

    console.log("Setting new label = " + e.target.value)
    this.setState({
      value: e.target.value
    });
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} >
        <DropdownToggle caret>
          {this.state.value}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem value='Select2' >Select2</DropdownItem>
          <DropdownItem value='Select3' >Select3</DropdownItem>
        </DropdownMenu>
      </Dropdown>
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
    return(
      <tr>
            <th scope="row">{this.props.id}</th>
            <td><Input type="text" name="PO Number" id="id" placeholder={this.props.body['po_number']} /></td>
            <td><Input type="text" name="original_width" id="id" placeholder={this.props.body['original_width']} /></td>
            <td><Input type="text" name="original_height" id="id" placeholder={this.props.body['original_height']} /></td>
            <td><ExampleDrop /></td>
            <td><ExampleDrop /></td>
            <td><ExampleDrop /></td>
            <td><ExampleDrop /></td>
            <td><ExampleDrop /></td>
            <td><ExampleDrop /></td>
            <td><DatePicker selected={this.state.date} onChange={this.handleDateData} /></td>
          </tr>
    )};

}


export default class BlindModalTable extends React.Component {

  constructor(props){
    super(props)

  }

  render(){

    return(
      <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
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
                <BlindRow key={i} id={i} body={item['body']}/>
            )
            
          })}
          
          </React.Fragment>
        )
      }
    }
    </Consumer>
        </tbody>
      </Table>

      <Button>Add row</Button>
      </div>

      )
  }

}

