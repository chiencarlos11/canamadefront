import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Modal, ModalHeader, ModalBody, Card, CardText, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
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


class BlindPanel extends React.Component {

	constructor(props){
		super(props);

		this.remove_panel = this.remove_panel.bind(this);
		this.copy_panel = this.copy_panel.bind(this);
	}

	remove_panel(){
		this.props.remove_order(this.props.index)
	}

	copy_panel(){
		this.props.copy_order(this.props.index)
	}
	
	render(){
		return(
			
			<Card body>
			<CardBody>
			<CardTitle>{this.props.name}</CardTitle>
			<CardText>{this.props.body}</CardText>
			

					<Container>
					<Row>
					<Col sm="4">
					<Button onClick={this.remove_panel} >Remove</Button>
					</Col>
					<Col sm="4">
					<Button key='2'>Edit</Button>
					</Col>
					<Col sm="4">
					<Button onClick={this.copy_panel} >Copy</Button>
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
			<h1 className="App-title">CanaMade Production</h1>
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
