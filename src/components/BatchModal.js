import React from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import BlindModalTable from './BlindModalTable'

export default class BatchModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			showForm: false,
			modalsize: "lg"
		};

		this.toggle = this.toggle.bind(this);
	}
	
	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}
	
	handleClick(blind_type) {
		this.setState({showForm: true});

	}
	
	render() {
		
		return (
			
			<div>
			<Modal size={this.state.modalsize} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
			<ModalHeader toggle={this.toggle}>Choose Blind Type</ModalHeader>
			<ModalBody>
			<BlindModalTable/>
			</ModalBody>
			
			</Modal>
			</div>
			
		);
		
	}
}