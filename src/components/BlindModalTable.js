import React from 'react';
import {Table,Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from 'reactstrap';


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
          <DropdownItem  value='Select1' header >Header</DropdownItem>
          <DropdownItem  disabled>Action</DropdownItem>
          <DropdownItem value='Select2' >Select2</DropdownItem>
          <DropdownItem divider />
          <DropdownItem value='Select3' >Select3</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}


export default class BlindModalTable extends React.Component {

  render(){

    return(

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td><Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" /></td>
            <td>Otto</td>
            <td><ExampleDrop /></td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>


      )
  }

}

