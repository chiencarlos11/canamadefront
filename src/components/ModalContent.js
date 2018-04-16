import React from 'react'
import { Container, Row, Col, Media } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LaurentForm from './LaurentForm'
import RollerShadeForm from './RollerShadeForm'
import CanaMadeForm from './CanaMadeForm'
import HoverImg from '../components/HoverImg'

import Laurent from '../media/Laurent.png'
import RollerShades from '../media/RollerShades.png'
import CanaMade from '../media/CanaMade.png'
import VerticalBlinds from '../media/VerticalBlinds.png'
import CellularShades from '../media/CellularShades.png'

export default class ModalContent extends React.Component {
	constructor(props){
		super(props);
		this.label = props.label;
		this.blind_type = props.blind_type;
		this.color = props.color;
		this.showForm = false;
		this.formtype = '';
	}
	
	handleClick(e, blind_type) {
		this.setState({showForm: true});
		this.showForm = true;
		this.formtype = blind_type
	}
	
	render(){
		console.log("Selected " + this.formtype);
		if (this.showForm || this.props.showForm){
			if (this.formtype === 'Roller Shades' || this.props.blind_type === 'Roller Shades'){

				return(
					<RollerShadeForm index={this.props.index} edit_action={this.props.edit_action} toggleModal={this.props.toggleModal} initial_state={this.props.initial_state} />
					);
			}else if (this.formtype === 'CanaMade' || this.props.blind_type === 'CanaMade'){
				return(
					<CanaMadeForm index={this.props.index} edit_action={this.props.edit_action} toggleModal={this.props.toggleModal} initial_state={this.props.initial_state} />
					);

			}

			return(
				<LaurentForm index={this.props.index} edit_action={this.props.edit_action} toggleModal={this.props.toggleModal} initial_state={this.props.initial_state} />
				);
		}
		
		return(

			<Container>
				<Row>
					<Col>

						<Media name='Laurent' color="primary" onClick={() => this.handleClick(this, 'Laurent')}>
							<HoverImg img={Laurent} name="Laurent" description="A Wooden Dream." />
						</Media>
					</Col>
					<Col>
						<Media name='Roller Shades' color="primary" onClick={() => this.handleClick(this, 'Roller Shades')}>
							<HoverImg img={RollerShades} name="Roller" description="A Roller Shades." />
						</Media>

					</Col>
					<Col>
						<Media name='CanaMade' color="primary" onClick={() => this.handleClick(this, 'CanaMade')}>
							<HoverImg img={CanaMade} name="CanaMade" description="Made in Canada." />
						</Media>

					</Col>
					<Col>
						<Media name='Vertical Blinds' color="primary" onClick={() => this.handleClick(this, 'Vertical Blinds')}>
							<HoverImg img={VerticalBlinds} name="Vertical" description="Vertical Beauty." />
						</Media>

					</Col>
					<Col>
						<Media name='Cellular Shades' color="primary" onClick={() => this.handleClick(this, 'Cellular Shades')}>
							<HoverImg img={CellularShades} name="Cellular" description="Cellar for Everyone." />
						</Media>

					</Col>
				</Row>
			</Container>


			);
	}
}
