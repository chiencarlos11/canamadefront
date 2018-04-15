import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Modal, ModalHeader, ModalBody, Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {MyProvider, Consumer} from './context/MyContext'
import ModalContent from './components/ModalContent'
import LaurentEditForm from './components/LaurentEditForm'
import CardContent from './components/CardContent'



class EditCard extends Component{
	constructor(props){
		super(props);
		this.remove_panel = this.remove_panel.bind(this);
		this.copy_panel = this.copy_panel.bind(this);
		this.edit_panel = this.edit_panel.bind(this);
	}

	remove_panel(){
		this.props.remove_order(this.props.index)
	}
	
	copy_panel(){
		this.props.copy_order(this.props.index)
	}
	
	edit_panel(actions){
		console.log("You clicked toggle edit");
		console.log("this.props.index = " + this.props.index);
		console.log("this.props.name = " + this.props.name);
		actions.toggle(this.props.index, this.props.name);
	}

	render(){


	return(
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

		)
	}
}

class PrintThisComponent extends Component {

  render() {

    return (
      <div>

        <Button onClick={() => window.print()}>PRINT</Button>

      </div>

    )
  }
}

class ModalExample extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			showForm: false,
			modalsize: "lg"
		};
		
		this.blindTypes = ['Laurent','Roller Shades','CanaMade Shade','Vertical Blinds','Cellular Shades'];
		this.toggle = this.toggle.bind(this);
	}
	
	toggle() {
		this.setState({
			modal: !this.state.modal
		});
		this.props.callbackFromParent('');
	}
	
	handleClick(blind_type) {
		this.setState({showForm: true});
		this.setState({modalsize: "md"});
	}
	
	render() {
		
		return (
			
			<div>
			<Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
			<Modal size={this.state.modalsize} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
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
		
		this.state = {
			modal: false,
			flipped: false,
		};
	}
	
	toggle() {
		this.setState({
			modal: !this.state.modal
		});
		this.props.callbackFromParent('');
	}

	mouseOut() {
    	this.setState({flipped: false});
 	}
  
  	mouseOver() {
    	this.setState({flipped: true});
  	}
	
	render(){
		return(
			
			
			<Card>
			
			<CardBody onMouseLeave={() => this.mouseOut()} onMouseEnter={() => this.mouseOver()}>

			<CardTitle>{this.props.name}</CardTitle>
			<CardContent body={this.props.body} blind_type={this.props.name}/>

			{this.state.flipped && <EditCard remove_order={this.props.remove_order} copy_order={this.props.copy_order} name={this.props.name} index={this.props.index} key={this.props.index} body={this.props.body}/>}
			
			

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
			<h1 className="App-title">CanaMade</h1>
			</header>
			<br/>
			<Container>
				<Row>
					<Col >
						<ModalExample buttonLabel="New Order" callbackFromParent={this.myCallback.bind(this)}/>
					</Col>
					<Col >
						<PrintThisComponent  />
					</Col>
				</Row>
			</Container>
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
