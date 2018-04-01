import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button,Alert,Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup, Label, Input, Card, CardText, CardBody, CardTitle, CardSubtitle, Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SoloDatePicker from './components/DatePicker.js';
import Fabric from './components/Fabric.js'

class Example extends React.Component {
  render() {
    return (
      <Form>
        <FormGroup>
          <Label >Date</Label>
          <SoloDatePicker />
        </FormGroup>
        <FormGroup>
          <Label>PO Number</Label>
          <Input type="text" name="po_number" id="po_number" placeholder="" />
        </FormGroup>
        <FormGroup>
          <Label>Original Width</Label>
          <Input type="number" name="original_width" id="original_width" placeholder="" />
        </FormGroup>
        <FormGroup>
          <Label>Original Height</Label>
          <Input type="number" name="original_height" id="original_height" placeholder="" />
        </FormGroup>
        <FormGroup>
          <Label>Control</Label>
          <Input type="select" name="control" id="control">
            <option>24</option>
            <option>36</option>
            <option>48</option>
            <option>60</option>
            <option>72</option>
            <option>84</option>
            <option>96</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <legend>Cassette</legend>
          <Container>
            <Row>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="cassette_orientation" />{' '}
                    Left
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="cassette_orientation" />{' '}
                    Right
                  </Label>
                </FormGroup>
                </Col>
                <Col>
                <FormGroup check>
                <Label check>
                  <Input type="radio" name="cassette_extra" />{' '}
                  Court
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="cassette_extra" />{' '}
                  Trim
                </Label>
              </FormGroup>
              </Col>
              <Col>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="cassette_color" />{' '}
                  White
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="cassette_color" />{' '}
                  Silver
                </Label>
              </FormGroup>
              </Col>
            </Row>
          </Container>
          </FormGroup>
          <Fabric />

      </Form>
    );
  }
}


class BlindTypeButton extends React.Component {
  constructor(props){
    super(props);
    this.label = props.label;
    this.blind_type = props.blind_type;
    this.color = props.color;
    this.showForm = false;
  }

  handleClick(blind_type) {
    this.setState({showForm: true});
    console.log("You Clicked " + blind_type)
    this.showForm = true;
  }

  render(){

    if (this.showForm){
      return(
        <Example />
        );
    }

    return(
      <Button outline color={this.color} onClick={(e) => this.handleClick(this.blind_type)}>
        {this.label}
      </Button>

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

            <BlindTypeButton label='Laurent' blind_type='Laurent' color='primary' />

          </ModalBody>
          <ModalFooter>
            {/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}*/}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
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
      
      <Card>
        <CardBody>
          <CardTitle>{this.props.data}</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>

          <Container>
            <Row>
              <Col>
                <Button key='1'>Copy</Button>
              </Col>
              <Col>
                <Button key='2'>Edit</Button>
              </Col>
              <Col>
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
              <Col>
                <BlindPanel data={this.state.data}/>
              </Col>
            <Col>
              <BlindPanel data={this.state.data}/>
            </Col>
              <Col>
                <BlindPanel data={this.state.data}/>
              </Col>
            </Row>
          </Container>
      </div>
    );
  }
}

export default App;
