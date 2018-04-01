import React from 'react';
import { FormGroup, Label, Input} from 'reactstrap';

export default class Fabric extends React.Component {
	constructor(){
		super();
		this.color_dict = {"Laurent": ["301","302","305","306"],
						"Morgan":["801","802","803","805"],
						"Husky": ["701","702","703","704"],
						"Scotby": ["401","402","404","407"],
						"Galaxy": ["601","603","605"],
						"Richmond": ["B301","B303","B306","B307"],
						"Timber": ["501","502","504","507"]
					};
		this.state = {selected_fabric: 'Laurent',
						selected_fabric_color: '301',
						color_selection: [...this.color_dict['Laurent']]};
	}

	update_fabric(event){
		this.setState({selected_fabric: event.target.value});
		this.setState({selected_fabric_color: this.color_dict[event.target.value][0]});
		this.setState({color_selection: this.color_dict[event.target.value]});
	}

	update_fabric_color(event){
		this.setState({selected_fabric_color: event.target.value});
	}

	  render() {
	  	return(
	  	<div>
	  	<FormGroup>
	      <Label>Fabric</Label>
	      <Input type="select" name="fabric" id="fabric" onChange={this.update_fabric.bind(this)}>
	        <option value= "Laurent" >Laurent</option>
	        <option value= "Morgan">Morgan</option>
	        <option value= "Husky">Husky</option>
	        <option value= "Scotby">Scotby</option>
	        <option value= "Galaxy">Galaxy</option>
	        <option value= "Richmond">Richmond</option>
	        <option value= "Timber">Timber</option>
	      </Input>
	      </FormGroup>
	      <FormGroup>
	      <Label>Fabric Color</Label>
	      <Input type="select" name="fabric_color" id="fabric_color" onChange={this.update_fabric_color.bind(this)}>

	      {this.state.color_selection.map(code => <option key={code} value={code}>{code}</option>)};
	      </Input>
	      </FormGroup>
	      <p>{this.state.selected_fabric}</p>
	      <p>{this.state.selected_fabric_color}</p>
	     </div>
	  )}
}

