import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Modal, ModalHeader, ModalBody, CardBody, Container, Row, Col} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {MyProvider, Consumer} from './context/MyContext'
import ModalContent from './components/ModalContent'
// import LaurentEditForm from './components/LaurentEditForm'
import CardContent from './components/CardContent'
import BlindModalTable from './components/BlindModalTable'
import './modal.css';

// class EditCard extends Component{
// 	constructor(props){
// 		super(props);
// 		this.remove_panel = this.remove_panel.bind(this);
// 		this.copy_panel = this.copy_panel.bind(this);
// 		this.edit_panel = this.edit_panel.bind(this);
// 	}

// 	remove_panel(){
// 		this.props.remove_order(this.props.index)
// 	}
	
// 	copy_panel(){
// 		this.props.copy_order(this.props.index)
// 	}
	
// 	edit_panel(actions){
// 		actions.toggle(this.props.index, this.props.name);
// 	}

// 	render(){


// 	return(
// 		<Container>
// 			<Row>
// 			<Col>

// 			<Button onClick={this.copy_panel} >Copy</Button>
			
// 			<Consumer>
// 			{context => {
				
// 				const { actions } = context;
				
// 				return (
// 					<React.Fragment>
					
// 					<Button onClick={() => {this.edit_panel(actions)}} >Edit</Button>
// 					</React.Fragment>
// 				)
// 			}
// 		}
// 		</Consumer>
		
		
// 		<Button onClick={this.remove_panel} >Remove</Button>
// 		</Col>
// 		</Row>
// 		</Container>

// 		)
// 	}
// }

class PrintThisComponent extends Component {

  render() {

    return (
      <div>

        <Button id="printPageButton" className="right-align" onClick={() => window.print()}>PRINT</Button>

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
			modalsize: "xl"
		};
		
		// this.blindTypes = ['Laurent','Roller Shades','CanaMade Shade','Vertical Blinds','Cellular Shades'];
		this.blindTypes = ['Laurent','Roller Shades','CanaMade Shade'];
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

		let local_content = (this.props.batchModal) ? (<BlindModalTable toggleModal={this.toggle} />) : (<ModalContent toggleModal={this.toggle}/>)

		
		return (
			
			<div>
			<Button id="printPageButton" className="left-align" color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
			<Modal size={this.state.modalsize} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
			<ModalHeader toggle={this.toggle}>CanaMade</ModalHeader>
			<ModalBody>
			{local_content}
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
			
			
			<div>
			
			<CardBody onMouseLeave={() => this.mouseOut()} onMouseEnter={() => this.mouseOver()}>

			<CardContent body={this.props.body} blind_type={this.props.name}/>

			{/*{(this.state.flipped) ? (<EditCard remove_order={this.props.remove_order} copy_order={this.props.copy_order} name={this.props.name} index={this.props.index} key={this.props.index} body={this.props.body}/>):(<div><br /><br /></div>)}*/}
			

			</CardBody>
		
			</div>
		
		
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

			<div id="printPageButton">
				<header className="App-header">
					<img id="printPageButton" src={logo} className="App-logo" alt="logo" />
					<h1 id="printPageButton" className="App-title">CanaMade</h1>
				</header>
			</div>
			<br/>

					{/*<Col >
						<ModalExample buttonLabel="New Order" callbackFromParent={this.myCallback.bind(this)}/>
						
					</Col>*/}

			<Container>
				<Row>
					<Col sm="6">
						<ModalExample buttonLabel="Edit Orders" batchModal={true} callbackFromParent={this.myCallback.bind(this)}/>
					</Col>
					<Col>
						<PrintThisComponent />
					</Col>
				</Row>
			</Container>


			<br id="printPageIgnore"/>
			<br id="printPageIgnore"/>
			<table className="content-table">
			<tbody>
			<Consumer>
			{context => {
				
				const {state, actions} = context;
				
				return (
					<React.Fragment>

					{state['orders'].map(function(item, i){
						
						return(
							<tr key={i}>
							<td sm="1" key={i}>
							<BlindPanel remove_order={actions.remove_order} copy_order={actions.copy_order} name={item['name']} index={i} key={i} body={item['body']}/>
							</td>
							<td>
							<BlindPanel remove_order={actions.remove_order} copy_order={actions.copy_order} name={item['name']} index={i} key={i} body={item['body']}/>
							</td>
							<td>
							<BlindPanel remove_order={actions.remove_order} copy_order={actions.copy_order} name={item['name']} index={i} key={i} body={item['body']}/>
							</td>
							</tr>
						)
						
					})}

					{/*<LaurentEditForm index={state.current_index} toggle_initial_state={state.toggle} toggle_edit={actions.toggle} />*/}
					</React.Fragment>
				)
			}
		}
		</Consumer>
		</tbody>
		
		
		</table>
		</div>
		
		</MyProvider>
		
		
	);
}
}

export default App;
