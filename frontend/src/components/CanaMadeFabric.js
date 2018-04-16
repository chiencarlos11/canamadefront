import React from 'react';
import { FormGroup, Label, Input} from 'reactstrap';

export default class Fabric extends React.Component {
	constructor(props){
		super(props);

		this.fabric = Object.keys(this.props.fabric_dict)

		this.color_dict = this.props.fabric_dict;

		this.state = {selected_fabric: this.fabric[0],
						selected_fabric_color: this.color_dict[this.fabric[0]][0],
						color_selection: [...this.color_dict[this.fabric[0]]]};
	}

	static getDerivedStateFromProps(props, state){
    if (props.fabric_type !== state.selected_fabric || props.fabric_color !== state.selected_fabric_color){
      return{selected_fabric: props.fabric_type,selected_fabric_color: props.fabric_color, color_selection: [...props.fabric_dict[props.fabric_type]]};
    }
    return null;
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
	      <Input value={this.state.selected_fabric} type="select" name="fabric" id="fabric" onChange={this.update_fabric.bind(this)}>
	        {cons_options}
	      </Input>
	      </FormGroup>
	      <FormGroup>
	      <Label>Fabric Color</Label>
	      <Input value={this.state.selected_fabric_color} type="select" name="fabric_color" id="fabric_color" onChange={this.update_fabric_color.bind(this)}>

	      {this.state.color_selection.map(code => <option key={code} value={code}>{code}</option>)};
	      </Input>
	      </FormGroup>

	     </div>
	  )}
}

