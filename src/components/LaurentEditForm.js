import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Consumer } from '../context/MyContext.js'
import ModalContent from './ModalContent'

export default class LaurentEditForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            showForm: false,
        };

        this.blindTypes = ['Laurent', 'Roller Shade', 'CanaMade Shade', 'Vertical Blinds', 'Cellular Shades'];
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.props.toggle_edit();
    }

  render() {
    return (
      <div>
        <Consumer>
            {context => {
                const { state, actions } = context;

                    return (
                        <React.Fragment>
                            <Modal isOpen={this.props.toggle_initial_state} toggle={this.toggle} className={this.props.className}>
                                <ModalHeader index={actions.index} toggle={this.toggle}>Choose Blind Type</ModalHeader>
                                <ModalBody>
                                    <ModalContent index={this.props.index} initial_state={state.curr_order.body} edit_action={actions.update_order} toggleModal={this.toggle} showForm={true} />
                                </ModalBody>
                            </Modal>
                        </React.Fragment>
                    )
            }
            }
        </Consumer>

      </div>
    )
  }
}
