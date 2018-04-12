import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Modal, ModalHeader, ModalBody, Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {MyProvider, Consumer} from './context/MyContext'

import ModalContent from './components/ModalContent'
import LaurentEditForm from './components/LaurentEditForm'
import CardContent from './components/CardContent'

class ModalExample extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			showForm: false
		};
		
		this.blindTypes = ['Laurent','Roller Shade','CanaMade Shade','Vertical Blinds','Cellular Shades'];
		this.toggle = this.toggle.bind(this);
	}
	
	toggle() {
		this.setState({
			modal: !this.state.modal
		});
		this.props.callbackFromParent('Laurent');
	}
	
	handleClick(blind_type) {
		this.setState({showForm: true});
		
	}
	
	render() {
		
		let initial_state = {
			date: Date.now(),
			po_number: '',
			original_width: '',
			original_height: '',
			control_size: '24',
			cassette_orientation: '',
			cassette_extra: '',
			cassette_color: '',
			fabric_type: 'Laurent',
			fabric_color: '301',
			cassette_size: '',
			tube_tob: '',
			inner: '',
			outer: '',
			height: '',
		};
		
		return (
			
			<div>
			<Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
			<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
			<ModalHeader toggle={this.toggle}>Choose Blind Type</ModalHeader>
			<ModalBody>
			<ModalContent initial_state={initial_state} toggleModal={this.toggle}/>
			</ModalBody>
			
			</Modal>
			</div>
			
		);
		
	}
}


class BlindPanel extends React.Component {
	
	constructor(props){
		super(props);
		
		this.remove_panel = this.remove_panel.bind(this);
		this.copy_panel = this.copy_panel.bind(this);
		this.edit_panel = this.edit_panel.bind(this);
		
		this.state = {
			modal: false,
		};
	}
	
	toggle() {
		this.setState({
			modal: !this.state.modal
		});
		this.props.callbackFromParent('Laurent');
	}
	
	remove_panel(){
		this.props.remove_order(this.props.index)
	}
	
	copy_panel(){
		this.props.copy_order(this.props.index)
	}
	
	edit_panel(actions){
		console.log("You clicked toggle edit");
		actions.toggle(this.props.index);
	}
	
	render(){
		return(
			
			<Card body>
			<CardBody>
			<CardTitle>{this.props.name}</CardTitle>
					<CardContent body={this.props.body} />
			<Container>
			<Row>
			<Col>
			<Button onClick={this.copy_panel} >Copy</Button>
			
			<Consumer>
			{context => {
				
				const { actions } = context;
				
				return (
					<React.Fragment>
					
					<Button onClick={() => {this.edit_panel(actions)}} >Edit</Button>
					</React.Fragment>
				)
			}
		}
		</Consumer>
		
		
		<Button onClick={this.remove_panel} >Remove</Button>
		</Col>
		</Row>
		</Container>
		
		
		</CardBody>
		</Card>
		
	);
}
}


class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			data: "No Data Available Yet!",
		};    
		
		this.parse_body = this.parse_body.bind(this);
	};
	
	
	myCallback = (dataFromChild) => {
		this.setState({ data: dataFromChild });
	};
	
	parse_body(order){
		
		let order_string  = ''
		if (order){
			order_string = "Po Number: " + order.po_number + " OW: " + order.original_width + " OH: " + order.original_height + " CZ: " + order.control_size +
			" CS: " + this.compute_fraction(order.cassette_size) + " TOB: " + this.compute_fraction(order.tube_tob) + " inner: " + this.compute_fraction(order.inner) +
			" outer: " + this.compute_fraction(order.outer) + " Height: " + this.compute_fraction(order.new_height) +
			" CO: " + order.cassette_orientation + " CE: " + order.cassette_extra + " CC: " + order.cassette_color + " FT: " + order.fabric_type + " " + order.fabric_color;
		}
		return order_string
		
	}
	
	
	render() {
		return (
			<MyProvider>
			<div className="App">
			<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<h1 className="App-title">CanaMade</h1>
			</header>
			<br/>
			<ModalExample buttonLabel="New Order" callbackFromParent={this.myCallback.bind(this)}/>
			<br/>
			<br/>
			<br/>
			<Container>
			<Row>
			<Consumer>
			{context => {
				
				const {state, actions} = context;
				
				return (
					<React.Fragment>
					{state['orders'].map(function(item, i){
						
						return(
							<Col sm="4" key={i}>
							<BlindPanel remove_order={actions.remove_order} copy_order={actions.copy_order} name={item['name']} index={i} key={i} body={item['body']}/>
							</Col>
						)
						
					})}
					
					<LaurentEditForm index={state.current_index} toggle_initial_state={state.toggle} toggle_edit={actions.toggle} />
					</React.Fragment>
				)
			}
		}
		</Consumer>
		</Row>
		
		
		</Container>
		
		
		</div>
		</MyProvider>
		
		
	);
}
}

export default App;
