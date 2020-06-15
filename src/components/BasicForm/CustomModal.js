import React, {Component} from "react";

import PropTypes from 'prop-types';
import {Button, Modal} from "react-bootstrap";

const INITIAL_MODAL_STATE = {
    show: false
};

class CustomModal extends Component{
    constructor(props) {
        super();
        this.state = {...INITIAL_MODAL_STATE}
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        let show = this.props.showModal || this.state.show;
        return (
            <Modal
                show={this.props.showModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>

                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.modalTitle}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.modalBody}
                </Modal.Body>
                <Modal.Footer>
                    {this.props.modalFooter ||
                    <Button onClick={this.props.closeButtonHandler}>Close</Button> }
                </Modal.Footer>
            </Modal>
        )
    }
}

CustomModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    modalTitle: PropTypes.string.isRequired,
    modalBody: PropTypes.object.isRequired,
    modalFooter: PropTypes.object,
    closeButtonHandler: PropTypes.func
};

export default CustomModal
