import React from 'react'
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LaurentForm from './LaurentForm'

export default class ModalContent extends React.Component {
	constructor(props){
		super(props);
		this.label = props.label;
		this.blind_type = props.blind_type;
		this.color = props.color;
		this.showForm = false;
		this.formtype = '';
	}
	
	handleClick(e) {
		this.setState({showForm: true});
		this.showForm = true;
		this.formtype = e.target.name
	}
	
	render(){
		if (this.showForm || this.props.showForm){
			return(
				<LaurentForm index={this.props.index} edit_action={this.props.edit_action} toggleModal={this.props.toggleModal} initial_state={this.props.initial_state} />
				);
		}
		
		return(
			<div>
			<Button outline name='Laurent' color="primary" onClick={this.handleClick.bind(this)}>Laurent</Button>
			<Button outline name='Morgan' color="primary" onClick={this.handleClick.bind(this)}>Morgan</Button>
			</div>
			);
	}
}
