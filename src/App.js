import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button,Alert,Modal, ModalHeader, ModalBody, Card, CardText, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LaurentForm from './components/LaurentForm'
import {MyProvider, Consumer} from './context/MyContext'


class ModalContent extends React.Component {
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
		console.log("You Clicked " + e.target.name)
		this.showForm = true;
		this.formtype = e.target.name
	}
	
	render(){
		
		if (this.showForm){
			return(
				<LaurentForm toggleModal={this.props.toggleModal}/>
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
		console.log("You Clicked " + blind_type)
		
	}
	
	render() {

		return (

			<div>
			<Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
			<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
			<ModalHeader toggle={this.toggle}>Choose Blind Type</ModalHeader>
			<ModalBody>
			<ModalContent toggleModal={this.toggle}/>
			</ModalBody>
			
			</Modal>
			</div>

			);

	}
}


function WarningBanner(props) {
	if (!props.warn) {
		return null;
	}
	
	return (
		<Alert color="primary">
		This is a primary alert — check it out!
		</Alert>
		);
}


class LoggingButton extends React.Component {
	
	constructor(){
		super();
		this.state = {showWarning: false};
	}
	
	
	handleClick() {
		this.setState({showWarning: true});
	}
	
	render() {
		// This syntax ensures `this` is bound within handleClick
		return (
			
			<div>
			
			<WarningBanner warn={this.state.showWarning} />
			
			<Button color="primary" onClick={(e) => this.handleClick(e)}>
			Click me
			</Button>
			</div>
			);
	}
}

class BlindPanel extends React.Component {
	
	render(){
		return(
			
			<Card body>
			<CardBody>
			<CardTitle>Laurent</CardTitle>
			<CardText>{this.props.body}</CardText>
			
			<Container>
			<Row>
			<Col sm="4">
			<Button key='1'>Copy</Button>
			</Col>
			<Col sm="4">
			<Button key='2'>Edit</Button>
			</Col>
			<Col sm="4">
			<Button key='3'>Delete</Button>
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
			data: "No Data Available Yet!"
		};    
	};
	
	
	myCallback = (dataFromChild) => {
		this.setState({ data: dataFromChild });
	};
	
	
	render() {
		return (
			<MyProvider>
			<div className="App">
			<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<h1 className="App-title">Welcome to React</h1>
			</header>
			<p className="App-intro">
			To get started, edit <code>src/App.js</code> and save to reload.
			</p>
			<br/>
			<LoggingButton />
			<br/>
			<ModalExample buttonLabel="New Order" callbackFromParent={this.myCallback.bind(this)}/>
			<br/>
			<br/>
			<br/>
			<Container>
			<Row>
			<Consumer>
			{context => {

				const {state} = context;

				return (
					<React.Fragment>
					{state['orders'].map(function(item, i){

						return(
							<Col sm="4" key={i}>
							<BlindPanel id={i} key={i} body={item}/>
							</Col>
							)

					})}
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
