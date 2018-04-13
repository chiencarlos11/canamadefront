import React from 'react';
import { FormGroup, Label, Input} from 'reactstrap';

export default class RollerShadeFabric extends React.Component {
	constructor(){
		super();

		this.fabric = ["Maze Screen 5%","Levendale BO","Magna BO","Milan 4%","Paris 3%","Mesh Screen 1%","Cana Screen 1%","Cana Screen 3%","Regent 4%","Cana Vision 3%","Cana Vision 5%","Magna"]

		this.color_dict = {"Maze Screen 5%": ["101","103","107","131"],
						"Levendale BO":["B902","B903","B904","B905","B906"],
						"Magna BO": ["B702","B704","B708","B710","B711"],
						"Milan 4%": ["402","403","405"],
						"Paris 3%": ["102","101","104","121","213"],
						"Mesh Screen 1%": ["101","105","282"],
						"Cana Screen 1%": ["101","102","103","104","106","107"],
						"Cana Screen 3%": ["101","102","103","104","106","107"],
						"Regent 4%": ["201","202","203"],
						"Cana Vision 3%": ["101","102","103","105","107"],
						"Cana Vision 5%": ["101","102","103","105","107"],
						"Magna": ["702","704","708","710","711"],
					};
		this.state = {selected_fabric: 'Maze Screen 5%',
						selected_fabric_color: '101',
						color_selection: [...this.color_dict['Maze Screen 5%']]};
	}


	update_fabric(event){
		this.setState({selected_fabric: event.target.value});
		this.setState({selected_fabric_color: this.color_dict[event.target.value][0]});
		this.setState({color_selection: this.color_dict[event.target.value]});

		//Updating Parents
		var fabricMap = new Map();
		fabricMap.set('fabric_type', event.target.value)
		fabricMap.set('fabric_color', this.color_dict[event.target.value][0])
		this.props.handlerFromParent(fabricMap)
	}

	update_fabric_color(event){
		this.setState({selected_fabric_color: event.target.value});

		//Updating Parents
		var fabricMap = new Map();
		fabricMap.set('fabric_color', event.target.value)
		this.props.handlerFromParent(fabricMap)
	}

	  render() {

	  	let cons_options = this.fabric.map(fa => (  <option key={fa} value={fa} >{fa}</option> ));

	  	return(
	  	<div>
	  	<FormGroup>
	      <Label>Fabric</Label>
	      <Input type="select" name="fabric" id="fabric" onChange={this.update_fabric.bind(this)}>
	        {cons_options}
	      </Input>
	      </FormGroup>
	      <FormGroup>
	      <Label>Fabric Color</Label>
	      <Input type="select" name="fabric_color" id="fabric_color" onChange={this.update_fabric_color.bind(this)}>

	      {this.state.color_selection.map(code => <option key={code} value={code}>{code}</option>)};
	      </Input>
	      </FormGroup>

	     </div>
	  )}
}

